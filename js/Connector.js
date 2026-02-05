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

var Connector = function(connectable)
{
    this.id = getNextID();
    var connectable = connectable;
    var link = null;
    var _self = this;

    // VLAN configuration (Phase 1 & 2)
    var vlanId = 1;           // Default VLAN (for access ports)
    var portMode = "access";  // "access" or "trunk"
    var nativeVlan = 1;       // Native VLAN for trunk ports (Phase 2)
    var allowedVlans = new Set([1]); // Set of allowed VLANs on trunk port (Phase 2)
    
    this.save = function()
    {
        var result = {};
        result.version = 1;
        result.id = this.id;
        result.vlanId = vlanId;        // VLAN assignment (access ports)
        result.portMode = portMode;    // "access" or "trunk"
        result.nativeVlan = nativeVlan;           // Native VLAN (Phase 2)
        result.allowedVlans = Array.from(allowedVlans); // Convert Set to Array (Phase 2)

        return result;
    };
    
    this.load = function(data)
    {
        this.id = data.id;
        // Backward compatibility: default to VLAN 1 if not present
        vlanId = data.vlanId || 1;
        portMode = data.portMode || "access";
        nativeVlan = data.nativeVlan || 1;
        allowedVlans = data.allowedVlans ? new Set(data.allowedVlans) : new Set([1]);
    };
    
    function init() {
        connectable.addConnector(_self);
    }
    
    this.setLink = function(l) {
        link = l;

        // Trigger 802.1X authentication when link is established
        if (link !== null) {
            trigger802_1XAuthentication();
        }
    };

    // Trigger automatic 802.1X authentication when connected
    function trigger802_1XAuthentication() {
        // Check if we just connected to a switch
        var connectedDevice = _self.getConnectedConnector();
        if (!connectedDevice) return;

        var connectedOwner = connectedDevice.getConnectable().getOwner();
        if (!connectedOwner || connectedOwner.getType() !== 'switch') return;

        // Check if the switch has 802.1X enabled
        var switchRadiusClient = connectedOwner.getRADIUSClient ? connectedOwner.getRADIUSClient() : null;
        if (!switchRadiusClient || !switchRadiusClient.isEnabled()) return;

        var switchPortNum = connectedOwner.getConnectable().getConnectorPos(connectedDevice);
        if (!switchRadiusClient.isPort802_1XEnabled(switchPortNum)) return;

        // Check if this connector's owner (host) has 802.1X configured
        var owner = connectable.getOwner();
        if (!owner || !owner.get802_1XEnabled || !owner.get802_1XEnabled()) return;

        // Trigger authentication after a short delay (simulate link negotiation)
        setTimeout(function() {
            owner.authenticate802_1X(connectedOwner.id, switchPortNum);
        }, 1000);
    }
    
    this.getLink = function() 
    {
        return link;
    };
    
    this.send = function(message)
    {
        if ((link != null) && (message.canSend()))
        {
            // Check 802.1X authorization for switches
            var owner = connectable.getOwner();
            if (owner && owner.getType && owner.getType() === 'switch') {
                var radiusClient = owner.getRADIUSClient ? owner.getRADIUSClient() : null;

                if (radiusClient && radiusClient.isEnabled && radiusClient.isEnabled()) {
                    // Get the port number for this connector
                    var portNum = connectable.getConnectorPos(_self);

                    // Check if 802.1X is enabled on this port
                    if (radiusClient.isPort802_1XEnabled && radiusClient.isPort802_1XEnabled(portNum)) {
                        // Get port state
                        var portState = radiusClient.getPortState(portNum);

                        // Get the connected device to check traffic direction
                        var connectedDevice = _self.getConnectedConnector();
                        var connectedHost = connectedDevice ? connectedDevice.getConnectable().getOwner() : null;

                        // Determine if this packet is FROM the connected host (going into network)
                        // We check the source MAC to see if it matches the connected device
                        var isFromHost = false;
                        if (connectedHost && message.getOriginMAC) {
                            var hostMAC = connectedHost.getConnectable ? connectedHost.getConnectable().getMAC(0) : null;
                            var packetMAC = message.getOriginMAC();
                            isFromHost = (hostMAC === packetMAC);
                        }

                        // Only block traffic ORIGINATING from unauthorized hosts
                        // Allow traffic TO the host (like DHCP responses) even if unauthorized
                        if (portState.state !== 'authorized' && isFromHost) {
                            // EXCEPTION: Always allow EAPOL (802.1X authentication) packets through
                            // Port 1812 is RADIUS authentication - must pass for auth to work
                            var isEAPOL = message.getDstPort && (message.getDstPort() === 1812 || message.getOrigPort && message.getOrigPort() === 1812);

                            if (!isEAPOL) {
                                // Drop the packet - do not forward
                                return;
                            }
                        }
                    }
                }
            }

            link.addMessage(_self, message);
        }
    };
    
    this.receive = function(message)
    {
        // Check 802.1X authorization when receiving packets FROM connected host
        var owner = connectable.getOwner();
        if (owner && owner.getType && owner.getType() === 'switch') {
            var radiusClient = owner.getRADIUSClient ? owner.getRADIUSClient() : null;

            if (radiusClient && radiusClient.isEnabled && radiusClient.isEnabled()) {
                var portNum = connectable.getConnectorPos(_self);

                // Check if 802.1X is enabled on this port
                if (radiusClient.isPort802_1XEnabled && radiusClient.isPort802_1XEnabled(portNum)) {
                    var portState = radiusClient.getPortState(portNum);

                    // Block packets RECEIVED from unauthorized ports (going into switch)
                    // EXCEPTION: Always allow RADIUS authentication packets
                    var isEAPOL = message.getDstPort && (message.getDstPort() === 1812 ||
                                  message.getOrigPort && message.getOrigPort() === 1812);

                    if (portState.state !== 'authorized' && !isEAPOL) {
                        // Drop the packet - do not process
                        return;
                    }
                }
            }
        }

        connectable.getTrafficManager().proccess(this, message);
    };
    
    this.getConnectable = function() 
    {
        return connectable;
    };
    
    this.isConnected = function() 
    {
        return link !== null;
    };
    
    this.getConnectedConnector = function() 
    {
        var result = null;
        if (this.isConnected()) 
        {
            result = (link.getConnector1() !== this) ? link.getConnector1() : link.getConnector2();
        }
        return result;
    };
    
    this.getDescription = function() 
    {
        var result = "";
        var cpos = connectable.getConnectorPos(this);
        
        if (connectable.getOwner().getType() === "router") 
        {
            result += (cpos === ROUTER_LAN) ? "LAN" : "WAN";
            result += ": ";
        }
        
        var ipinfo = connectable.getIPInfo(cpos);
        if ((ipinfo !== null) && (ipinfo.getIPv4() !== null)) 
        {
            result += ipinfo.getIPv4();
        }
        
        return result;
    };
    
    this.whoHas = function(ip) 
    {
        var result = null;
        var pos = connectable.getConnectorPos(this);
        var ipinfo = connectable.getIPInfo(pos);
        
        // Check if this device has the requested IP
        if ((ipinfo !== null) && (ipinfo.getIPv4() === ip)) 
        {
            result = connectable.getMAC(pos);
        } 
        else 
        {
            // Forward the ARP request through this device
            // For switches (no IP), this will broadcast to all other ports
            result = connectable.findMACforIP(ip, this);
        }
        
        return result;
    };
    
    this.getIPInfo = function()
    {
        var result = null;
        switch (connectable.getIpMode())
        {
            case IPMODE_NOIP:
                result = null;
                break;
            case IPMODE_UNIQUE:
                var pos = connectable.getConnectorPos(this);
                result = connectable.getIPInfo(pos);
                break;
            case IPMODE_SHARED:
                result = connectable.getIPInfo(0);
                break;
        }

        return result;
    };

    // VLAN getter/setter methods (Phase 1 & 2)
    this.getVlanId = function() {
        return vlanId;
    };

    this.setVlanId = function(id) {
        if (id >= 1 && id <= 4094) {
            vlanId = id;
        }
    };

    this.getPortMode = function() {
        return portMode;
    };

    this.setPortMode = function(mode) {
        if (mode === "access" || mode === "trunk") {
            portMode = mode;
        }
    };

    // Trunk port methods (Phase 2)
    this.getNativeVlan = function() {
        return nativeVlan;
    };

    this.setNativeVlan = function(vlan) {
        if (vlan >= 1 && vlan <= 4094) {
            nativeVlan = vlan;
        }
    };

    this.getAllowedVlans = function() {
        return Array.from(allowedVlans);
    };

    this.setAllowedVlans = function(vlans) {
        allowedVlans = new Set(vlans);
    };

    this.addAllowedVlan = function(vlanId) {
        allowedVlans.add(vlanId);
    };

    this.removeAllowedVlan = function(vlanId) {
        allowedVlans.delete(vlanId);
    };

    this.isVlanAllowed = function(incomingVlanId) {
        if (portMode === "access") {
            return incomingVlanId === vlanId; // Only port's assigned VLAN
        } else if (portMode === "trunk") {
            return allowedVlans.has(incomingVlanId); // O(1) lookup with Set
        }
        return false;
    };

    init();
};
