/*
 * This file is part of the Education Network Simulator project and covered
 * by GPLv3 license. See full terms in the LICENSE file at the root folder
 * or at http://www.gnu.org/licenses/gpl-3.0.html.
 *
 * (c) 2015 Jorge García Ochoa de Aspuru
 * bardok@gmail.com
 *
 * Images are copyrighted by their respective authors and have been
 * downloaded from http://pixabay.com/
 *
 */

var TrafficManager = function(connectable, limitbroadcast, performNAT)
{
    this.id = getNextID();
    var connectable = connectable;
    var apptable = [];
    var limitbroadcast = limitbroadcast;
    var performNAT = performNAT;
    var NATtable = [];
    var _self = this;
    var diagnosticsLog = [];
    var icmpResponses = [];

    // Reverse route table - learns routes from passing traffic
    // Maps source IP -> { connector: incoming connector, mac: source MAC, timestamp: when learned }
    var reverseRoutes = {};

    // Learn a reverse route from incoming traffic
    function learnReverseRoute(sourceIP, sourceMAC, incomingConnector) {
        if (sourceIP && sourceIP !== '0.0.0.0' && sourceIP !== '255.255.255.255') {
            reverseRoutes[sourceIP] = {
                connector: incomingConnector,
                mac: sourceMAC,
                timestamp: Date.now()
            };
        }
    }

    // Look up a reverse route for a destination IP
    function getReverseRoute(destIP) {
        if (destIP in reverseRoutes) {
            return reverseRoutes[destIP];
        }
        return null;
    }

    // Get MAC for destination using reverse routes as fallback
    function getDstMACWithReverseRoute(destIP, incomingConnector) {
        // First try the normal method
        var mac = connectable.getDstMAC(destIP);
        if (mac !== null) {
            return { mac: mac, connector: null }; // connector will be found normally
        }

        // Fallback to reverse route table
        var reverseRoute = getReverseRoute(destIP);
        if (reverseRoute && reverseRoute.connector !== incomingConnector) {
            // Found a learned route - return the MAC and connector
            return {
                mac: reverseRoute.mac,
                connector: reverseRoute.connector
            };
        }

        return null;
    }

    this.save = function()
    {
        var result = {};
        result.version = 1;
        result.id = this.id;
        result.limitbroadcast = limitbroadcast;
        result.performNAT = performNAT;
        result.NATtable = [];

        for (var port in NATtable)
        {
            if (NATtable[port].fixed)
            {
                result.NATtable.push(NATtable[port]);
            }
        }

        return result;
    };

    this.load = function(data)
    {
        this.id = data.id;
        limitbroadcast = data.limitbroadcast;
        performNAT = data.performNAT;
        for (var i = 0; i < data.NATtable.length; i++)
        {
            this.addNATEntry(data.NATtable[i].newport, data.NATtable[i].port, data.NATtable[i].ip, data.NATtable[i].originIface ? data.NATtable[i].originIface : ROUTER_WAN, data.NATtable[i].fixed);
        }
    };

    this.registerApplication = function(app, port, fixed)
    {
        var data = {};
        data.app = app;
        data.port = port;
        data.fixed = fixed;

        apptable[port] = data;
    };
    
    // Method to update an application's port registration
    this.updateApplicationPort = function(app, oldPort, newPort)
    {
        // Remove from old port(s) - check common HTTP/HTTPS ports
        [80, 443, oldPort].forEach(function(p) {
            if (p && apptable[p] && apptable[p].app === app) {
                delete apptable[p];
            }
        });
        
        // Register on new port
        this.registerApplication(app, newPort, true);
    };
    
    // Method to unregister an application from a port
    this.unregisterApplication = function(port)
    {
        if (apptable[port]) {
            delete apptable[port];
        }
    };

    // Helper: Clone message for trunk ports (Phase 2)
    function cloneMessage(message) {
        var clone = new Message(
            message.getType(),
            message.getOriginIP(),
            message.getDestinationIP(),
            message.getOriginMAC(),
            message.getDestinationMAC(),
            message.getOrigPort(),
            message.getDstPort(),
            message.getData(),
            message.getImage()
        );
        // Copy VLAN tagging
        clone.setVlanId(message.getVlanId());
        clone.setIs802_1Q(message.is802_1Q());
        // Copy NAT flag to prevent double NAT on cloned messages
        if (message.hasBeenNATted && clone.setNATted) {
            clone.setNATted(message.hasBeenNATted());
        }
        return clone;
    }

    // Helper: Apply VLAN tagging based on port mode (Phase 2)
    function applyVlanTagging(message, connector, vlanId) {
        if (connector.getPortMode && connector.getPortMode() === "trunk") {
            // Trunk port: tag the frame (unless it's native VLAN)
            var nativeVlan = connector.getNativeVlan ? connector.getNativeVlan() : 1;
            if (vlanId === nativeVlan) {
                // Native VLAN traffic is untagged
                message.setVlanId(null);
                message.setIs802_1Q(false);
            } else {
                // Non-native VLAN traffic is tagged
                message.setVlanId(vlanId);
                message.setIs802_1Q(true);
            }
        } else {
            // Access port: remove tag
            message.setVlanId(null);
            message.setIs802_1Q(false);
        }
    }

    this.sendMessage = function(connector, message)
    {
        // Get source port VLAN (Phase 1 & 2 - VLAN filtering)
        var sourceVlan = message.getVlanId ? message.getVlanId() : null;
        if (sourceVlan === null) {
            // Untagged frame - use port's VLAN
            sourceVlan = connector.getVlanId ? connector.getVlanId() : 1;
        }

        // DHCP Relay: Check if this is a DHCP request broadcast that should be relayed
        var owner = connectable.getOwner();
        if (limitbroadcast && // Only routers/firewalls limit broadcast
            owner.isDHCPRelayEnabled && owner.isDHCPRelayEnabled() &&
            connectable.compatibleBroadcastMAC(message.getDestinationMAC()) &&
            message.getDstPort && message.getDstPort() === 67) // DHCP server port
        {
            var relayIP = owner.getDHCPRelayIP();
            if (relayIP) {
                // This is a DHCP request that should be relayed
                console.log('📡 DHCP Relay: Intercepting DHCP broadcast from ' + message.getOriginIP());

                // Add GIADDR (Gateway Interface Address) - the router's interface IP that received the request
                var connectorPos = connectable.getConnectorPos(connector);
                var routerIP = connectable.getIPInfo(connectorPos).getIPv4();

                if (routerIP) {
                    // Clone the message for relay
                    var relayMsg = cloneMessage(message);

                    // Add GIADDR to the message data
                    if (relayMsg.getData()) {
                        relayMsg.getData().giaddr = routerIP;
                        relayMsg.getData().relayed = true;
                    }

                    // Convert broadcast to unicast destined for DHCP server
                    relayMsg.setDestinationIP(relayIP);

                    // Find MAC address of DHCP server
                    var serverMAC = connectable.findMACforIP(relayIP);
                    if (serverMAC) {
                        relayMsg.setDestinationMAC(serverMAC);

                        // Find connector to send to DHCP server
                        var targetConnector = connectable.getSenderConnectorForMAC(serverMAC);
                        if (targetConnector && targetConnector !== connector) {
                            console.log('📡 DHCP Relay: Forwarding to ' + relayIP + ' with GIADDR=' + routerIP);

                            // Send relayed request
                            targetConnector.send(relayMsg);
                            return; // Don't flood broadcast
                        }
                    }

                    console.log('⚠️ DHCP Relay: Cannot find route to DHCP server ' + relayIP);
                }
            }
        }

        //- si es broadcast y no limitamos, se manda por todos, menos por el que ha venido.
        if (!limitbroadcast && (connectable.compatibleBroadcastMAC(message.getDestinationMAC())))
        {
            // Optional debug logging for VLAN broadcast filtering
            var debugVlan = false; // Set to true to see VLAN filtering in console
            if (debugVlan) {
                console.log('🔄 Broadcast from VLAN ' + sourceVlan + ' on switch');
            }

            for (var i = 0; i < connectable.getConnectorNumber(); i++)
            {
                var c = connectable.getConnector(i);
                if (c !== connector)
                {
                    // Phase 2: Check VLAN membership (trunk or access)
                    var allowed = false;
                    if (c.isVlanAllowed) {
                        allowed = c.isVlanAllowed(sourceVlan);
                    } else {
                        // Fallback for old connectors
                        var destVlan = c.getVlanId ? c.getVlanId() : 1;
                        allowed = (destVlan === sourceVlan);
                    }

                    if (debugVlan) {
                        var portVlan = c.getVlanId ? c.getVlanId() : 1;
                        var portMode = c.getPortMode ? c.getPortMode() : 'access';
                        console.log('  Port ' + i + ' (VLAN ' + portVlan + ', ' + portMode + '): ' +
                                   (allowed ? '✅ ALLOWED' : '🚫 BLOCKED'));
                    }

                    if (allowed)
                    {
                        // Phase 2: Clone message for each port (needed for trunk tagging)
                        var msg = cloneMessage(message);
                        applyVlanTagging(msg, c, sourceVlan);
                        c.send(msg);
                    }
                }
            }
        }
        //- si no, pregunta el conector por el que lo tiene que mandar
        else
        {
            //var c = network.findNextConnectorInPath(connectable, message.getDestinationIP(), message.getDestinationMAC());
            var c = connectable.getSenderConnectorForMAC(message.getDestinationMAC());
            if ((c !== connector) && (c !== null))
            {
                // Phase 2: Check VLAN membership (trunk or access)
                var allowed = false;
                if (c.isVlanAllowed) {
                    allowed = c.isVlanAllowed(sourceVlan);
                } else {
                    // Fallback for old connectors
                    var destVlan = c.getVlanId ? c.getVlanId() : 1;
                    allowed = (destVlan === sourceVlan);
                }

                if (allowed)
                {
                    // Phase 2: Clone and apply tagging
                    var msg = cloneMessage(message);
                    applyVlanTagging(msg, c, sourceVlan);
                    c.send(msg);
                }
            }
        //- si es el mismo, o no hay camino, lo descarta
        }
    }

    this.addNATEntry = function(newport, port, ip, originIface, fixed)
    {
        // Ensure ports are integers (JSON may store them as strings)
        var newportInt = parseInt(newport, 10);
        var portInt = parseInt(port, 10);

        NATtable[newportInt] = {};
        NATtable[newportInt].ip = ip;
        NATtable[newportInt].newport = newportInt;
        NATtable[newportInt].port = portInt;
        NATtable[newportInt].originIface = originIface;
        NATtable[newportInt].fixed = fixed;
    };

    this.getNATData = function()
    {
        var result = [];
        for (port in NATtable)
        {
            if (NATtable[port].fixed)
            {
                var data = [];
                data[0] = NATtable[port].originIface;
                data[1] = NATtable[port].port;
                data[2] = NATtable[port].newport;
                data[3] = NATtable[port].ip;
                result.push(data);
            }
        }
        return result;
    };

    this.removeFixedNATData = function()
    {
        for (port in NATtable)
        {
            if (NATtable[port].fixed)
            {
                this.deleteNATEntry(port);
            }
        }
    };

    this.deleteNATEntry = function(port)
    {
        if (port in NATtable)
        {
            delete NATtable[port];
        }
    };
    
    // Check if a message matches any port forwarding rules from connected firewall
    function checkPortForwarding(message)
    {
        // Only check if this is incoming traffic from outside (WAN interface)
        if (!connectable || !connectable.getOwner) return null;
        
        var owner = connectable.getOwner();
        
        // Check if there's a connected firewall with port forwarding rules
        var elements = network.getElements ? network.getElements() : {};
        for (var id in elements) {
            var element = elements[id];
            if (element && element.getType && element.getType() === 'firewall') {
                // Check if this firewall is connected to this router
                if (element.getConnectable) {
                    var firewallConnectable = element.getConnectable();
                    // Check connections between firewall and this device
                    for (var i = 0; i < firewallConnectable.getConnectorNumber(); i++) {
                        var conn = firewallConnectable.getConnector(i);
                        if (conn && conn.getLink) {
                            var link = conn.getLink();
                            if (link) {
                                // Check if link connects to our device
                                var otherEnd = link.getOtherEnd(conn);
                                if (otherEnd && otherEnd.getOwner && otherEnd.getOwner() === connectable) {
                                    // This firewall is connected to us, check its port forwarding rules
                                    if (element.getPortForwardRules) {
                                        var rules = element.getPortForwardRules();
                                        for (var j = 0; j < rules.length; j++) {
                                            var rule = rules[j];
                                            if (rule.enabled && rule.externalPort == message.getDstPort()) {
	// console.log('[PORT FORWARD] Match found: Port ' + rule.externalPort + ' -> ' + rule.internalIP + ':' + rule.internalPort);
                                                return {
                                                    internalIP: rule.internalIP,
                                                    internalPort: rule.internalPort,
                                                    description: rule.description
                                                };
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        // Also check if this device itself is a firewall with port forwarding
        if (owner && owner.getType && owner.getType() === 'firewall' && owner.getPortForwardRules) {
            var rules = owner.getPortForwardRules();
            for (var j = 0; j < rules.length; j++) {
                var rule = rules[j];
                if (rule.enabled && rule.externalPort == message.getDstPort()) {
	// console.log('[PORT FORWARD] Match found on local firewall: Port ' + rule.externalPort + ' -> ' + rule.internalIP + ':' + rule.internalPort);
                    return {
                        internalIP: rule.internalIP,
                        internalPort: rule.internalPort,
                        description: rule.description
                    };
                }
            }
        }
        
        return null;
    }

    function proccessTCP(connector, message)
    {
        // Si es para mi MAC o es broadcast MAC, es para mí
        // Si no es para mí, o es broadcast y no limito, hay que enviar
        // Si es para mí, y tengo app, lo mando
        // Si es para mí, y tengo routing, busco la nueva MAC y reenvío
        var forme = false;
        var mustsend = false;

        forme = connectable.compatibleMAC(message.getDestinationMAC(), true);

        mustsend = !forme || (connectable.compatibleBroadcastMAC(message.getDestinationMAC()) && !limitbroadcast);
        if (forme)
        {
            message.decreaseTTL();

            // ACL CHECK: Check inbound ACL when packet arrives at router interface
            var owner = connectable.getOwner ? connectable.getOwner() : null;
            if (owner && owner.getType && owner.getType() === 'router' && owner.checkACL) {
                var inboundInterface = connectable.getConnectorPos(connector);
                var sourceIP = message.getOriginIP();
                var aclResult = owner.checkACL(inboundInterface, 'IN', sourceIP);

                if (aclResult.action === 'DENY') {
                    // Packet denied by inbound ACL
                    console.log('[ACL] Denied inbound on interface ' + inboundInterface + ': ' + aclResult.reason);
                    return; // Drop packet
                }
                // Packet permitted, continue processing
            }

            // DHCP Relay: Handle DHCP responses coming back from server
            var owner = connectable.getOwner();
            if (owner && owner.isDHCPRelayEnabled && owner.isDHCPRelayEnabled() &&
                message.getOrigPort && message.getOrigPort() === 67) // DHCP server response
            {
                var data = message.getData();
                // Check if this response is for a client on one of our networks
                if (data && data.ipv4) {
                    var clientIP = data.ipv4;
                    var clientMAC = message.getDestinationMAC(); // This should be router's MAC initially

                    console.log('📡 DHCP Relay: Received response from server for client ' + clientIP);

                    // Find which interface the client is on by checking which subnet the IP belongs to
                    for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                        var ifaceIP = connectable.getIPInfo(i);
                        if (ifaceIP && ifaceIP.getIPv4() && ifaceIP.sameNetwork(clientIP)) {
                            // This is the interface where the client is
                            console.log('📡 DHCP Relay: Forwarding response to client on interface ' + i);

                            // Find client's MAC from ARP table or use broadcast
                            var arpTable = owner.getARPTable ? owner.getARPTable() : null;
                            var actualClientMAC = null;

                            if (arpTable) {
                                var arpEntry = arpTable.getMAC(clientIP);
                                if (arpEntry) {
                                    actualClientMAC = arpEntry;
                                }
                            }

                            // If we don't have the client's MAC, broadcast on that interface
                            if (!actualClientMAC) {
                                actualClientMAC = "FF:FF:FF:FF:FF:FF";
                                console.log('📡 DHCP Relay: Broadcasting response on interface (client MAC unknown)');
                            }

                            // Update message destination to client
                            message.setDestinationIP(clientIP);
                            message.setDestinationMAC(actualClientMAC);

                            // Send to the appropriate interface
                            var clientConnector = connectable.getConnector(i);
                            if (clientConnector) {
                                clientConnector.send(message);
                                return; // Done relaying
                            }
                        }
                    }
                }
            }

            // Check for port forwarding rules first
            var portForwardMatch = checkPortForwarding(message);
            if (portForwardMatch) {
                // Apply port forwarding translation
                message.setDestinationIP(portForwardMatch.internalIP);
                message.setDstPort(portForwardMatch.internalPort);
                var mac = connectable.getDstMAC(message.getDestinationIP());
                if (mac !== null) {
                    var c = connectable.getSenderConnectorForMAC(mac);
                    if (c !== null) {
                        message.setDestinationMAC(mac);
                        c.send(message);
                        
                        // Add dynamic NAT entry for return traffic
                        var newport = message.getDstPort();
                        _self.addNATEntry(newport, message.getOrigPort(), message.getOriginIP(), connectable.getConnectorPos(connector), false);
                    }
                }
                return; // Port forwarding handled, exit early
            }
            
            if (message.getDstPort() in apptable)
            {
                // Track packet delivery to destination
                if (message.addPathHop) {
                    message.addPathHop({
                        deviceType: 'destination',
                        deviceName: connectable.getOwner() ? connectable.getOwner().getName() : 'Unknown',
                        deviceId: connectable.getOwner() ? connectable.getOwner().id : null,
                        action: 'delivered',
                        changes: {
                            description: 'Packet delivered to application (port ' + message.getDstPort() + ')'
                        }
                    });
                }

                apptable[message.getDstPort()].app.receiveMessage(message);
                if (!apptable[message.getDstPort()].fixed)
                {
                    delete apptable[message.getDstPort()];
                }
            }
            // Determine if we should use NAT processing for this packet
            // Response packets (dest port is ephemeral) should use normal routing UNLESS
            // they match an entry in THIS router's NAT table (meaning this is the original NAT router)
            var msgDstPort = message.getDstPort();
            var isResponsePacket = msgDstPort >= 49152 && msgDstPort <= 65535;
            var hasNATTableEntry = (msgDstPort in NATtable) && (NATtable[msgDstPort].originIface == connectable.getConnectorPos(connector));
            var alreadyNATted = message.hasBeenNATted && message.hasBeenNATted();

            // Use NAT path only if:
            // 1. NAT is enabled AND not broadcast AND
            // 2. Either we have a NAT table entry (reverse NAT) OR it's a new request (not response, not already NATted)
            var shouldUseNATPath = performNAT &&
                                   !connectable.compatibleBroadcastMAC(message.getDestinationMAC()) &&
                                   (hasNATTableEntry || (!isResponsePacket && !alreadyNATted));

            if (shouldUseNATPath)
            {
                // Si existe el puerto destino en la tabla NAT y coincide con el conector
                // This handles REVERSE NAT - response packets coming back to the router
                if (hasNATTableEntry)
                {
                    var dstport = message.getDstPort();

                    // Store values for PAT tracking before translation
                    var publicIP = message.getDestinationIP();
                    var publicPort = dstport;
                    var internalIP = NATtable[dstport].ip;
                    var internalPort = NATtable[dstport].port;

                    message.setDestinationIP(internalIP);
                    message.setDstPort(internalPort);

                    // Mark this hop as reverse PAT translation for visualization
                    if (message.markReversePATTranslation) {
                        message.markReversePATTranslation({
                            publicIP: publicIP,
                            publicPort: publicPort,
                            internalIP: internalIP,
                            internalPort: internalPort
                        });
                    }

                    var mac = connectable.getDstMAC(message.getDestinationIP());
                    /*var mac = connectable.getMACforIP(message.getDestinationIP(), connector);
                    if ((mac === null) && connectable.getOwner().getType() === "router")
                    {
                        mac = connectable.getDstMAC(ROUTER_WAN, message.getDestinationIP());
                    }*/
                    if (mac !== null)
                    {
                        var c = connectable.getSenderConnectorForMAC(mac);
                        if (c !== null)
                        {
                            message.setDestinationMAC(mac);
                            c.send(message);
                        }
                    }
                    if (!NATtable[dstport].fixed)
                    {
                        delete NATtable[dstport];
                    }
                }
                // Si no existe - perform forward NAT for new outbound requests
                else
                {
                    // Try to reuse the original port if available (more realistic PAT behavior)
                    // Only generate a new port if there's a collision
                    var newport = message.getOrigPort();
                    if (newport in NATtable) {
                        // Port collision - another connection already using this port, pick a new one
                        newport = getDinamycPort();
                    }
                    var mac = connectable.getDstMAC(message.getDestinationIP());
                    /*var mac = connectable.getMACforIP(message.getDestinationIP(), connector);
                    // A revisar: si mac es null, y es un router, lo intento enviar por el GW de WAN
                    if ((mac === null) && connectable.getOwner().getType() === "router")
                    {
                        mac = connectable.getDstMAC(ROUTER_WAN, message.getDestinationIP());
                    }*/

                    if (mac !== null)
                    {
                        var c = connectable.getSenderConnectorForMAC(mac);
                        if (c !== null)
                        {
                            var pos = connectable.getConnectorPos(c);

                            // Si hay que enviar por otro conector, hago NAT
                            if (c !== connector)
                            {
                                // Store original values for PAT tracking
                                var originalIP = message.getOriginIP();
                                var originalPort = message.getOrigPort();
                                var translatedIP = connectable.getIPInfo(pos).getIPv4();
                                var translatedPort = newport;

                                // Añadimos una entrada dinámica para recibir la respuesta (desde la interfaz de salida)
                                _self.addNATEntry(newport, message.getOrigPort(), message.getOriginIP(), pos, false);

                                message.setOriginIP(translatedIP);
                                message.setOriginMAC(connectable.getMAC(pos));
                                message.setOrigPort(translatedPort);

                                // Mark this hop as PAT translation for visualization
                                if (message.markPATTranslation) {
                                    message.markPATTranslation({
                                        originalIP: originalIP,
                                        originalPort: originalPort,
                                        translatedIP: translatedIP,
                                        translatedPort: translatedPort,
                                        routerInterface: pos === ROUTER_WAN ? 'WAN' : 'LAN'
                                    });
                                }

                                // Mark packet as NATted to prevent double/triple NAT
                                if (message.setNATted) {
                                    message.setNATted(true);
                                }
                            }
                            message.setDestinationMAC(mac);
                            c.send(message);
                        }

                    }
                }
            }
            else if (!connectable.compatibleBroadcastMAC(message.getDestinationMAC()))
            {
                // Check if this is a router or a device that should forward packets
                var owner = connectable.getOwner ? connectable.getOwner() : null;
                var deviceType = owner && owner.getType ? owner.getType() : '';

                // Prevent regular computers from forwarding to avoid routing loops
                // But allow all other device types (routers, servers, etc.) to forward
                if (deviceType !== 'computer') {
                    var mac = connectable.getDstMAC(message.getDestinationIP());
                    var c = null;

                    if (mac !== null) {
                        c = connectable.getSenderConnectorForMAC(mac);
                    }

                    // Fallback to reverse route if normal routing failed
                    if ((mac === null || c === null) && deviceType === 'router') {
                        var reverseRoute = getReverseRoute(message.getDestinationIP());
                        if (reverseRoute) {
                            mac = reverseRoute.mac;
                            c = reverseRoute.connector;
                            // console.log('[REVERSE ROUTE] Using learned route for ' + message.getDestinationIP());
                        }
                    }

                    if (mac !== null && c !== null)
                    {
                        // ACL CHECK: Check outbound ACL before forwarding (for routers)
                        if (deviceType === 'router' && owner.checkACL) {
                            var outboundInterface = connectable.getConnectorPos(c);
                            var sourceIP = message.getOriginIP();
                            var aclResult = owner.checkACL(outboundInterface, 'OUT', sourceIP);

                            if (aclResult.action === 'DENY') {
                                // Packet denied by outbound ACL
                                console.log('[ACL] Denied outbound on interface ' + outboundInterface + ': ' + aclResult.reason);
                                return; // Drop packet
                            }
                            // Packet permitted, continue forwarding
                        }

                        message.setDestinationMAC(mac);
                        c.send(message);
                    }
                }
                // Regular hosts should drop TCP packets not meant for their IP
            }
        }

        if (mustsend)
        {
            _self.sendMessage(connector, message);
        }
    }

    function proccessICMP(connector, message)
    {
        var forme = connectable.compatibleMAC(message.getDestinationMAC(), false);
        var myip = (connector.getIPInfo() !== null) && (message.getDestinationIP() === connector.getIPInfo().getIPv4());

        if (forme)
        {
            message.decreaseTTL();
        }
        switch (message.getData().command)
        {
            case "ping":

                // Si es para mí, genero el ping response
                if (forme && myip)
                {
                    var dst = message.getOriginIP();
                    var ifacepos = connectable.getConnectorPos(connector);
                    // Use the originalMessageId from the ping data (preserved through all hops)
                    var origmsgid = message.getData().originalMessageId || message.getId();
                    _self.pingResponse(dst, ifacepos, origmsgid);
                }
                // Si es para mí, pero no es mi IP, y hago NAT, cambio el origen y añado el id y la ip de origen a la tabla de espera
                else if (forme && !myip && performNAT)
                {
                    var mac = connectable.getDstMAC(message.getDestinationIP());
                    /*var mac = connectable.getMACforIP(message.getDestinationIP(), connector);
                    if ((mac === null) && connectable.getOwner().getType() === "router")
                    {
                        mac = connectable.getDstMAC(ROUTER_WAN, message.getDestinationIP());
                    }*/

                    if (mac !== null)
                    {
                        var c = connectable.getSenderConnectorForMAC(mac);

                        // If addressing table doesn't have the MAC, find interface based on IP routing
                        if (c === null) {
                            // Check if destination is on any directly connected network
                            for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                                var iface = connectable.getConnector(i);
                                if (iface && iface.getLink()) {
                                    var ipinfo = connectable.getIPInfo(i);
                                    if (ipinfo && ipinfo.getIPv4() !== null && ipinfo.sameNetwork(message.getDestinationIP())) {
                                        c = iface;
                                        break;
                                    }
                                }
                            }
                            // If not on a directly connected network, use default gateway route
                            if (c === null && connectable.getGatewayManager) {
                                var gateways = connectable.getGatewayManager();
                                var gatewayIP = gateways.getGatewayForIP(message.getDestinationIP(), null);
                                if (gatewayIP) {
                                    // Find which interface leads to the gateway
                                    for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                                        var ipinfo = connectable.getIPInfo(i);
                                        if (ipinfo && ipinfo.getIPv4() !== null && ipinfo.sameNetwork(gatewayIP)) {
                                            c = connectable.getConnector(i);
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        if (c !== null)
                        {
                            // Si el conector de destino y el de origen son diferentes, hago NAT
                            if (c !== connector)
                            {
                                var pos = connectable.getConnectorPos(c);
                                var data = {};
                                data.ip = message.getOriginIP();
                                data.mac = message.getOriginMAC();

                                // Use originalMessageId from ping data, or fall back to current message ID
                                var trackingId = message.getData().originalMessageId || message.getId();
                                icmpResponses[trackingId] = data;

                                message.setOriginIP(connectable.getIPInfo(pos).getIPv4());
                                message.setOriginMAC(connectable.getMAC(pos));
                            }
                            message.setDestinationMAC(mac);
                            c.send(message);
                        }

                    }
                }
                // Si es para mí, pero no es mi IP, y no hago NAT, busco la siguiente mac y envío
                // BUT only if we're a router - regular hosts shouldn't forward packets
                else if (forme && !myip && !performNAT)
                {
                    // Check if this is a router or a device that should forward packets
                    var owner = connectable.getOwner ? connectable.getOwner() : null;
                    var deviceType = owner && owner.getType ? owner.getType() : '';
                    
                    // Prevent regular computers from forwarding to avoid routing loops
                    // But allow all other device types (routers, servers, etc.) to forward
                    if (deviceType !== 'computer') {
                        var mac = connectable.getDstMAC(message.getDestinationIP());
                        if (mac !== null)
                        {
                            var c = connectable.getSenderConnectorForMAC(mac);
                            if (c !== null)
                            {
                                message.setDestinationMAC(mac);
                                c.send(message);
                            }
                        }
                    }
                    // Regular hosts (computers) should drop packets not meant for them
                    // This prevents routing loops when a rogue DHCP makes a host think another host is its gateway
                }
                // Si no es para mí intento enviar por la siguiente interfaz
                else if (!forme)
                {
                    _self.sendMessage(connector, message);
                }
                break;
            case "traceroute":
                // Si es para mí, genero el traceroute response (+1 seq)
                if (forme && myip)
                {
                    var dst = message.getOriginIP();
                    var ifacepos = connectable.getConnectorPos(connector);
                    // Use the originalMessageId from the traceroute data (preserved through all hops)
                    var origmsgid = message.getData().originalMessageId || message.getId();
                    _self.tracerouteResponse(dst, ifacepos, origmsgid, true, message.getData().seq + 1, message.getDestinationIP());
                }
                // Si es para mí, pero no es mi IP, cambio el origen y añado el id y la ip de origen a la tabla de espera y genero un traceroute response (+1 seq)
                else if (forme && !myip && performNAT)
                {
                    var mac = connectable.getDstMAC(message.getDestinationIP());
                    /*var mac = connectable.getMACforIP(message.getDestinationIP(), connector);
                    if ((mac === null) && connectable.getOwner().getType() === "router")
                    {
                        mac = connectable.getDstMAC(ROUTER_WAN, message.getDestinationIP());
                    }*/

                    if (mac !== null)
                    {
                        var c = connectable.getSenderConnectorForMAC(mac);

                        // If addressing table doesn't have the MAC, find interface based on IP routing
                        if (c === null) {
                            // Check if destination is on any directly connected network
                            for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                                var iface = connectable.getConnector(i);
                                if (iface && iface.getLink()) {
                                    var ipinfo = connectable.getIPInfo(i);
                                    if (ipinfo && ipinfo.getIPv4() !== null && ipinfo.sameNetwork(message.getDestinationIP())) {
                                        c = iface;
                                        break;
                                    }
                                }
                            }
                            // If not on a directly connected network, use default gateway route
                            if (c === null && connectable.getGatewayManager) {
                                var gateways = connectable.getGatewayManager();
                                var gatewayIP = gateways.getGatewayForIP(message.getDestinationIP(), null);
                                if (gatewayIP) {
                                    // Find which interface leads to the gateway
                                    for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                                        var ipinfo = connectable.getIPInfo(i);
                                        if (ipinfo && ipinfo.getIPv4() !== null && ipinfo.sameNetwork(gatewayIP)) {
                                            c = connectable.getConnector(i);
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        if (c !== null)
                        {
                            var dst = message.getOriginIP();
                            var ifacepos = connectable.getConnectorPos(connector);
                            // Use the originalMessageId from the traceroute data (preserved through all hops)
                            var origmsgid = message.getData().originalMessageId || message.getId();
                            var seq = message.getData().seq + 1;
                            _self.tracerouteResponse(dst, ifacepos, origmsgid, false, seq, message.getDestinationIP());

                            // Si el conector de destino y el de origen son diferentes, hago NAT
                            if (c !== connector)
                            {
                                var pos = connectable.getConnectorPos(c);
                                var data = {};
                                data.ip = message.getOriginIP();
                                data.mac = message.getOriginMAC();

                                // Use originalMessageId from traceroute data for tracking
                                var trackingId = message.getData().originalMessageId || message.getId();
                                icmpResponses[trackingId] = data;

                                message.setOriginIP(connectable.getIPInfo(pos).getIPv4());
                                message.setOriginMAC(connectable.getMAC(pos));
                            }
                            message.getData().seq = seq;
                            message.setDestinationMAC(mac);
                            c.send(message);
                        }

                    }
                }
                // Si es para mí, pero no es mi IP, y no hago NAT, busco la siguiente mac y envío, y respondo
                // BUT only if we're a router - regular hosts shouldn't forward packets
                else if (forme && !myip && !performNAT)
                {
                    // Check if this is a router or a device that should forward packets
                    var owner = connectable.getOwner ? connectable.getOwner() : null;
                    var deviceType = owner && owner.getType ? owner.getType() : '';
                    
                    // Prevent regular computers from forwarding to avoid routing loops
                    // But allow all other device types (routers, servers, etc.) to forward
                    if (deviceType !== 'computer') {
                        var mac = connectable.getDstMAC(message.getDestinationIP());
                        if (mac !== null)
                        {
                            var c = connectable.getSenderConnectorForMAC(mac);
                            if (c !== null)
                            {
                                var dst = message.getOriginIP();
                                var ifacepos = connectable.getConnectorPos(connector);
                                var origmsgid = message.getId();
                                var seq = message.getData().seq + 1;
                                _self.tracerouteResponse(dst, ifacepos, origmsgid, false, seq, message.getDestinationIP());

                                var pos = connectable.getConnectorPos(c);
                                message.getData().seq = seq;
                                message.setOriginMAC(connectable.getMAC(pos));
                                message.setDestinationMAC(mac);
                                c.send(message);
                            }
                        }
                    }
                    // Regular hosts should drop packets not meant for them
                }
                // Si no es para mí intento enviar por la siguiente interfaz
                else if (!forme)
                {
                    _self.sendMessage(connector, message);
                }
                break;
            case "pingresponse":
                // Si es para mí, y es una respuesta a un id en la tabla, reenvío y borro de la tabla
                if (forme && (message.getData().originMessageId in icmpResponses))
                {
                    message.setDestinationIP(icmpResponses[message.getData().originMessageId].ip);
                    message.setDestinationMAC(icmpResponses[message.getData().originMessageId].mac);
                    _self.sendMessage(connector, message);
                    delete icmpResponses[message.getData().originMessageId];
                }
                // Si es para mí, y es mi IP, y no es una respuesta a un id en la tabla, hago log
                else if (forme && myip && !(message.getData().originMessageId in icmpResponses))
                {
                    addDiagnosticInfo(_("Ping response recieved from ") + message.getOriginIP());
                }
                // Si es para mí, y no es mi IP, y no es una respuesta a un id en la tabla, busco MAC y envio
                // BUT only if we're a router - regular hosts shouldn't forward packets
                else if (forme && !myip && !(message.getData().originMessageId in icmpResponses))
                {
                    // Check if this is a router or a device that should forward packets
                    var owner = connectable.getOwner ? connectable.getOwner() : null;
                    var deviceType = owner && owner.getType ? owner.getType() : '';

                    // Prevent regular computers from forwarding to avoid routing loops
                    // But allow all other device types (routers, servers, etc.) to forward
                    if (deviceType !== 'computer') {
                        var mac = connectable.getDstMAC(message.getDestinationIP());
                        if (mac !== null)
                        {
                            var c = connectable.getSenderConnectorForMAC(mac);

                            // If addressing table doesn't have the MAC, find interface based on IP routing
                            if (c === null) {
                                // Find which interface the destination IP belongs to
                                for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                                    var iface = connectable.getConnector(i);
                                    if (iface && iface.getLink()) {
                                        var ipinfo = connectable.getIPInfo(i);
                                        if (ipinfo && ipinfo.getIPv4() !== null && ipinfo.sameNetwork(message.getDestinationIP())) {
                                            c = iface;
                                            break;
                                        }
                                    }
                                }
                            }

                            if (c !== null)
                            {
                                message.setDestinationMAC(mac);
                                c.send(message);
                            }
                        }
                    }
                }
                // Si no intento enviar por la siguiente interfaz
                else if (!forme)
                {
                    _self.sendMessage(connector, message);
                }
                break;
            case "tracerouteresponse":
                // Si es para mí, y es una respuesta a un id en la tabla, reenvío y si es el final, borro de la tabla
                if (forme && (message.getData().originMessageId in icmpResponses))
                {
                    message.setDestinationIP(icmpResponses[message.getData().originMessageId].ip);
                    message.setDestinationMAC(icmpResponses[message.getData().originMessageId].mac);
                    _self.sendMessage(connector, message);
                    if (message.getData().final)
                    {
                        delete icmpResponses[message.getData().originMessageId];
                    }
                }
                // Si es para mí, y es mi IP, y no es una respuesta a un id en la tabla, hago log
                else if (forme && myip && !(message.getData().originMessageId in icmpResponses))
                {
                    addDiagnosticInfo(message.getData().seq + _(" - Traceroute to ") + message.getData().dstIp + ": " + message.getOriginIP());
                }
                // Si es para mí, y no es mi IP, y no es una respuesta a un id en la tabla, busco MAC y envio
                // BUT only if we're a router - regular hosts shouldn't forward packets
                else if (forme && !myip && !(message.getData().originMessageId in icmpResponses))
                {
                    // Check if this is a router or a device that should forward packets
                    var owner = connectable.getOwner ? connectable.getOwner() : null;
                    var deviceType = owner && owner.getType ? owner.getType() : '';

                    // Prevent regular computers from forwarding to avoid routing loops
                    // But allow all other device types (routers, servers, etc.) to forward
                    if (deviceType !== 'computer') {
                        var mac = connectable.getDstMAC(message.getDestinationIP());
                        if (mac !== null)
                        {
                            var c = connectable.getSenderConnectorForMAC(mac);

                            // If addressing table doesn't have the MAC, find interface based on IP routing
                            if (c === null) {
                                // Find which interface the destination IP belongs to
                                for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                                    var iface = connectable.getConnector(i);
                                    if (iface && iface.getLink()) {
                                        var ipinfo = connectable.getIPInfo(i);
                                        if (ipinfo && ipinfo.getIPv4() !== null && ipinfo.sameNetwork(message.getDestinationIP())) {
                                            c = iface;
                                            break;
                                        }
                                    }
                                }
                            }

                            if (c !== null)
                            {
                                message.setDestinationMAC(mac);
                                c.send(message);
                            }
                        }
                    }
                }
                // Si no es para mí, intento enviar por la siguiente interfaz
                else if (!forme)
                {
                    _self.sendMessage(connector, message);
                }
                break;
        }
    }

    this.proccess = function(connector, message)
    {
        // Check if server is under attack and might drop packets
        if (connectable && connectable.getOwner && connectable.getOwner()) {
            var owner = connectable.getOwner();
            
            // Check if this device has server resources (is under attack tracking)
            if (owner.serverResources) {
                var status = owner.serverResources.status;
                var dropChance = 0;
                
                // Calculate drop chance based on server status
                if (status === 'offline') {
                    dropChance = 1.0; // 100% drop when offline
                } else if (status === 'critical') {
                    dropChance = 0.7; // 70% drop when critical
                } else if (status === 'degraded') {
                    dropChance = 0.3; // 30% drop when degraded
                }
                
                // Randomly drop packet based on server load
                if (dropChance > 0 && Math.random() < dropChance) {
                    // Track dropped legitimate packet
                    if (!owner.serverResources.legitimateDropped) {
                        owner.serverResources.legitimateDropped = 0;
                    }
                    owner.serverResources.legitimateDropped++;
                    
	// console.log('[ATTACK IMPACT] Dropping legitimate packet due to server overload - Status: ' + status);
                    return; // Drop the packet - don't process it
                } else if (owner.serverResources) {
                    // Track processed legitimate packet
                    if (!owner.serverResources.legitimateProcessed) {
                        owner.serverResources.legitimateProcessed = 0;
                    }
                    owner.serverResources.legitimateProcessed++;
                }
            }
        }
        
        // Check if this host has a rogue DHCP server and intercept HTTP traffic
        if (apptable && apptable[67] && apptable[67].app && apptable[67].app.isRogue) {
            var dhcpApp = apptable[67].app;
            if (dhcpApp.isRogue() && message.getType && message.getType() === 'tcp' && 
                message.getDstPort && (message.getDstPort() === 80 || message.getDstPort() === 443)) {
                // Intercept HTTP/HTTPS traffic
                dhcpApp.interceptHTTPData(message);
            }
        }
        
        // Check if this is a rogue router and intercept HTTP/HTTPS traffic
        if (connectable && connectable.getOwner && connectable.getOwner()) {
            var owner = connectable.getOwner();
            if (owner.getType && owner.getType() === 'router' && owner.isRogue && owner.isRogue()) {
                // Check if this is TCP traffic on HTTP/HTTPS ports (both requests and responses)
                if (message.getType && message.getType() === 'tcp') {
                    var dstPort = message.getDstPort ? message.getDstPort() : 0;
                    var srcPort = message.getOrigPort ? message.getOrigPort() : 0;
                    
                    // Intercept if it's going TO port 80/443 (request) or coming FROM port 80/443 (response)
                    if ((dstPort === 80 || dstPort === 443) || (srcPort === 80 || srcPort === 443)) {
                        // Rogue router intercepts all HTTP/HTTPS traffic passing through it
                        // console.log('[ROGUE ROUTER] Intercepting traffic - DstPort: ' + dstPort + ', SrcPort: ' + srcPort);
                        owner.interceptTraffic(message);
                    }
                }
            }
        }
        
        this.originalProccess(connector, message);
    };
    
    this.originalProccess = function(connector, message)
    {
        // Learn reverse route from incoming traffic (for routing responses back)
        // This allows routers to remember "to reach IP X, use the interface it came from"
        var sourceIP = message.getOriginIP ? message.getOriginIP() : null;
        var sourceMAC = message.getOriginMAC ? message.getOriginMAC() : null;
        if (sourceIP && sourceMAC) {
            learnReverseRoute(sourceIP, sourceMAC, connector);
        }

        // Track that this device is processing the packet (BEFORE any changes)
        if (message.addPathHop) {
            var deviceType = 'unknown';
            var deviceName = 'Unknown';

            // Determine device type
            if (connectable.getOwner) {
                var owner = connectable.getOwner();
                if (owner.getType) {
                    deviceType = owner.getType();
                }
                if (owner.getName) {
                    deviceName = owner.getName();
                }
            }

            // Add hop - MAC changes will be tracked automatically by Message setters
            message.addPathHop({
                deviceType: deviceType,
                deviceName: deviceName,
                deviceId: connectable.getOwner() ? connectable.getOwner().id : null,
                action: deviceType === 'router' ? 'routing' : 'processing',
                changes: {
                    description: deviceType === 'router' ?
                        'Router processing packet' :
                        (deviceType === 'switch' ? 'Switch forwarding packet' : 'Device processing packet')
                }
            });
        }

        connectable.updateAddressing(message.getOriginMAC(), connectable.getConnectorPos(connector));
        switch (message.getType())
        {
            case "tcp":
                proccessTCP(connector, message);
                break;
            case "icmp":
                proccessICMP(connector, message);
                break;
            default:
                // UDP and other protocols (DHCP, DNS, etc.) - use TCP processing path
                proccessTCP(connector, message);
                break;
        }
    };

    this.getFixedNATtable = function()
    {
        var result = [];

        for (var port in NATtable)
        {
            if (NATtable[port].fixed)
            {
                result[port] = {};
                result[port].port = NATtable[port].port;
                result[port].ip = NATtable[port].ip;
            }
        }

        return result;
    };

    this.getDiagnosticsInfo = function()
    {
        var result = "";

        // Show messages in chronological order (oldest first)
        for (var i = 0; i < diagnosticsLog.length; i++)
        {
            result += (diagnosticsLog[i] + ((i === diagnosticsLog.length - 1) ? "" : "<br/>"));
        }

        return result;
    };

    function addDiagnosticInfo(msg)
    {
        diagnosticsLog.push(msg);
        var div = document.getElementById("diagnosticsconsole");
        if (div !== null)
        {
            div.innerHTML = _self.getDiagnosticsInfo();
        }
    }

    this.ping = function(dst, ifacepos)
    {
        // Tenemos IP?
        if (connectable.getIPInfo(ifacepos).getIPv4() !== null)
        {
          // Si no es una IP
          var dstip = null;
          if (!isValidIPv4(dst))
          {
              dstip = connectable.getOwner().getApp("DNSClient").getIp(dst);
          }
          else
          {
              dstip = dst;
          }
          if (dstip === null)
          {
              addDiagnosticInfo("Unknown domain: " + dst);
          }
          else
          {
              // Check ARP cache first (if host has ARP table)
              var host = connectable.getOwner();
              var arpTable = host.getARPTable ? host.getARPTable() : null;
              var MAC = null;
              
              if (arpTable) {
                  // Try to get MAC from ARP cache
                  MAC = arpTable.lookup(dstip);
                  if (MAC) {
                      addDiagnosticInfo(_("ARP cache hit: ") + dstip + " -> " + MAC);
                  } else {
                      addDiagnosticInfo(_("ARP cache miss for: ") + dstip);
                  }
              }
              
              // If not in ARP cache, try normal MAC resolution
              if (!MAC) {
                  MAC = connectable.getDstMAC(dstip);
                  
                  // If we found a MAC, simulate ARP request/reply and add to cache
                  if (MAC && arpTable) {
                      // Simulate ARP request animation
                      addDiagnosticInfo(_("Sending ARP request: Who has ") + dstip + "?");
                      
                      // ARP resolution happens behind the scenes - no need to show separate visual message
                      // The ping message will show the full communication
                      
                      // Simulate ARP reply
                      addDiagnosticInfo(_("ARP reply received: ") + dstip + " is at " + MAC);
                      
                      // Add to ARP cache
                      arpTable.addEntry(dstip, MAC, 'dynamic');
                      addDiagnosticInfo(_("Added to ARP cache: ") + dstip + " -> " + MAC);
                  }
              }
              
              // Now proceed with ping if we have MAC
              if (MAC !== null)
              {
                  var data = {};
                  data.command = "ping";
                  data.description = "PING Request\nEcho to: " + dstip;
                  var message = new Message(
                  "icmp",
                  connectable.getIPInfo(ifacepos).getIPv4(),
                  dstip,
                  connectable.getMAC(ifacepos),
                  MAC,
                  -1,
                  -1,
                  data,
                  images[IMAGE_ENVELOPEICMP]
                  );
                  // Store the original message ID in the data so it's preserved through all hops
                  data.originalMessageId = message.getId();
                  addDiagnosticInfo(_("Sending ping to: ") + message.getDestinationIP());
                  connectable.getConnector(ifacepos).send(message);
              }
              else {
                addDiagnosticInfo(_("Network unreachable: ") + dstip);
              }
          }
        }
        else {
          addDiagnosticInfo(_("Network not configured for interface: ") + ifacepos)
        }
    };

    this.traceroute = function(dst, ifacepos)
    {
      // Tenemos IP?
      if (connectable.getIPInfo(ifacepos).getIPv4() !== null)
      {
        // Si no es una IP
        var dstip = null;
        if (!isValidIPv4(dst))
        {
            dstip = connectable.getOwner().getApp("DNSClient").getIp(dst);
        }
        else
        {
            dstip = dst;
        }
        if (dstip === null)
        {
            addDiagnosticInfo("Unknown domain: " + dst);
        }
        else
        {
            // Crear un mensaje de tipo ICMP
            var MAC = connectable.getDstMAC(dstip);
            if (MAC !== null)
            {
                var data = {};
                data.command = "traceroute";
                data.description = "Traceroute: " + dstip;
                data.seq = 0;
                var message = new Message(
                "icmp",
                connectable.getIPInfo(ifacepos).getIPv4(),
                dstip,
                connectable.getMAC(ifacepos),
                MAC,
                -1,
                -1,
                data,
                images[IMAGE_ENVELOPEICMP]
                );
                // Store the original message ID in the data so it's preserved through all hops
                data.originalMessageId = message.getId();
                addDiagnosticInfo(_("Sending traceroute to: ") + message.getDestinationIP());
                connectable.getConnector(ifacepos).send(message);
            }
            else {
              addDiagnosticInfo(_("Network unreachable: ") + dstip);
            }
        }
      }
      else {
        addDiagnosticInfo(_("Network not configured for interface: ") + ifacepos)
      }
    };

    this.pingResponse = function(dst, ifacepos, origmsgid)
    {
        // Si no es una IP
        var dstip = null;
        if (!isValidIPv4(dst))
        {
            dstip = connectable.getOwner().getApp("DNSClient").getIp(dst);
        }
        else
        {
            dstip = dst;
        }
        if (dstip === null)
        {
            addDiagnosticInfo("Unknown domain: " + dst);
        }
        else
        {
            // Crear un mensaje de tipo ICMP
            var MAC = connectable.getDstMAC(dstip);
            if (MAC !== null)
            {
                var data = {};
                data.command = "pingresponse";
                data.description = "PING Reply\nEcho reply from: " + connectable.getIPInfo(ifacepos).getIPv4();
                data.originMessageId = origmsgid;
                var message = new Message(
                "icmp",
                connectable.getIPInfo(ifacepos).getIPv4(),
                dstip,
                connectable.getMAC(ifacepos),
                MAC,
                -1,
                -1,
                data,
                images[IMAGE_ENVELOPEICMP]
                );
                connectable.getConnector(ifacepos).send(message);
            }
        }
    };

    this.tracerouteResponse = function(dst, ifacepos, origmsgid, final, seq, originMessageIP)
    {
        // Si no es una IP
        var dstip = null;
        if (!isValidIPv4(dst))
        {
            dstip = connectable.getOwner().getApp("DNSClient").getIp(dst);
        }
        else
        {
            dstip = dst;
        }
        if (dstip === null)
        {
            addDiagnosticInfo("Unknown domain: " + dst);
        }
        else
        {
            // Crear un mensaje de tipo ICMP
            var MAC = connectable.getDstMAC(dstip);
            if (MAC !== null)
            {
                var data = {};
                data.command = "tracerouteresponse";
                data.originMessageId = origmsgid;
                data.final = final;
                data.seq = seq;
                data.dstIp = originMessageIP;
                data.description = "Traceroute Response";
                var message = new Message(
                "icmp",
                connectable.getIPInfo(ifacepos).getIPv4(),
                dstip,
                connectable.getMAC(ifacepos),
                MAC,
                -1,
                -1,
                data,
                images[IMAGE_ENVELOPEICMP]
                );
                connectable.getConnector(ifacepos).send(message);
            }
        }
    };

    this.setPerformNAT = function(pnat)
    {
        performNAT = pnat;
    };
    
    // ARP command functions for network diagnostics
    this.showARPTable = function(arpTable)
    {
        addDiagnosticInfo("ARP Table for " + connectable.getOwner().getName());
        addDiagnosticInfo("----------------------------------------");
        
        var entries = arpTable.getEntries();
        if (entries.length === 0) {
            addDiagnosticInfo("ARP cache is empty");
        } else {
            addDiagnosticInfo("Internet Address      Physical Address      Type");
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                var ip = entry.ip;
                var mac = entry.mac;
                var type = entry.type;
                
                // Pad IP to 20 chars, MAC to 20 chars
                while (ip.length < 20) ip += " ";
                while (mac.length < 20) mac += " ";
                
                addDiagnosticInfo(ip + mac + type);
            }
            addDiagnosticInfo("");
            addDiagnosticInfo("Total entries: " + entries.length);
        }
    };
    
    this.lookupARP = function(arpTable, ip)
    {
        var mac = arpTable.lookup(ip);
        if (mac) {
            addDiagnosticInfo("ARP entry found:");
            addDiagnosticInfo(ip + " is at " + mac);
        } else {
            addDiagnosticInfo("No ARP entry for " + ip);
            addDiagnosticInfo("Try pinging " + ip + " first to populate ARP cache");
        }
    };
    
    this.clearARPDynamic = function(arpTable)
    {
        arpTable.clearDynamic();
        addDiagnosticInfo("Cleared all dynamic ARP entries");
        addDiagnosticInfo("Static entries remain unchanged");
    };
    
    this.showARPHelp = function()
    {
        addDiagnosticInfo("ARP Command Usage:");
        addDiagnosticInfo("----------------------------------------");
        addDiagnosticInfo("arp -a        Show all ARP entries");
        addDiagnosticInfo("arp -n        Show all ARP entries (same as -a)");
        addDiagnosticInfo("arp [IP]      Lookup specific IP address");
        addDiagnosticInfo("arp -d        Clear all dynamic entries");
        addDiagnosticInfo("");
        addDiagnosticInfo("Examples:");
        addDiagnosticInfo("  Click ARP with empty field to show all");
        addDiagnosticInfo("  Enter '192.168.1.1' then click ARP to lookup");
        addDiagnosticInfo("  Enter '-d' then click ARP to clear cache");
    };
    
    // Make addDiagnosticInfo accessible for external calls
    this.addDiagnosticInfo = function(msg)
    {
        addDiagnosticInfo(msg);
    };

};
