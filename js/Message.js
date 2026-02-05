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

var lastMessageId = 0;
var globalPacketRegistry = {}; // Store all packets by ID for request/response lookups

function getNextMessageId()
{
    return ++lastMessageId;
}

var Message = function(type, origIP, dstIP, origMAC, dstMAC, origPort, dstPort, dat, img)
{
    var originIP = origIP;
    var destinationIP = dstIP;
    var originMAC = origMAC;
    var destinationMAC = dstMAC;
    var origPort = origPort;
    var dstPort = dstPort;
    var data = dat;
    var image = img;
    var id = getNextMessageId();
    var type = type;
    var TTL = 32;
    var pathHistory = []; // Track every hop this packet takes
    var relatedPacketId = null; // For request/response pairs
    var _self = this;

    // VLAN tagging fields (Phase 2)
    var vlanId = null;      // null = untagged, number = VLAN ID
    var is802_1Q = false;   // True if 802.1Q tagged

    // NAT tracking - prevent double/triple NAT
    var hasBeenNATted = false;  // True once packet has been through NAT

    // Register this packet in global registry
    globalPacketRegistry[id] = this;
    
    this.decreaseTTL = function()
    {
        TTL--;
    };

    this.canSend = function()
    {
        return TTL !== 0;
    };

    this.getId = function() {
        return id;
    };
    
    this.getImage = function() {
        return image;
    };
    
    this.getOriginIP = function() {
        return originIP;
    };
    
    this.setOriginIP = function(ip) {
        var oldIP = originIP;
        originIP = ip;

        // Track IP change if path tracking is enabled (NAT/PAT)
        if (pathHistory.length > 0 && oldIP !== ip) {
            var lastHop = pathHistory[pathHistory.length - 1];
            if (!lastHop.ipChanges) {
                lastHop.ipChanges = {};
            }
            lastHop.ipChanges.oldSrcIP = oldIP;
            lastHop.ipChanges.newSrcIP = ip;
        }
    };
    
    this.getOriginMAC = function() {
        return originMAC;
    };
    
    this.setOriginMAC = function(mac) {
        var oldMAC = originMAC;
        originMAC = mac;

        // Track MAC change if path tracking is enabled
        if (pathHistory.length > 0 && oldMAC !== mac) {
            // Update the last hop to note the change
            var lastHop = pathHistory[pathHistory.length - 1];
            if (!lastHop.macChanges) {
                lastHop.macChanges = {};
            }
            lastHop.macChanges.oldSrcMAC = oldMAC;
            lastHop.macChanges.newSrcMAC = mac;
        }
    };

    this.getDestinationIP = function() {
        return destinationIP;
    };

    this.setDestinationIP = function(ip) {
        var oldIP = destinationIP;
        destinationIP = ip;

        // Track IP change if path tracking is enabled (NAT)
        if (pathHistory.length > 0 && oldIP !== ip) {
            var lastHop = pathHistory[pathHistory.length - 1];
            if (!lastHop.ipChanges) {
                lastHop.ipChanges = {};
            }
            lastHop.ipChanges.oldDstIP = oldIP;
            lastHop.ipChanges.newDstIP = ip;
        }
    };

    this.getDestinationMAC = function() {
        return destinationMAC;
    };

    this.setDestinationMAC = function(mac) {
        var oldMAC = destinationMAC;
        destinationMAC = mac;

        // Track MAC change if path tracking is enabled
        if (pathHistory.length > 0 && oldMAC !== mac) {
            var lastHop = pathHistory[pathHistory.length - 1];
            if (!lastHop.macChanges) {
                lastHop.macChanges = {};
            }
            lastHop.macChanges.oldDstMAC = oldMAC;
            lastHop.macChanges.newDstMAC = mac;
        }
    };
    
    this.getOrigPort = function() {
        return origPort;
    };

    this.setOrigPort = function(port) {
        var oldPort = origPort;
        origPort = port;

        // Track port change if path tracking is enabled (PAT - Port Address Translation)
        if (pathHistory.length > 0 && oldPort !== port) {
            var lastHop = pathHistory[pathHistory.length - 1];
            if (!lastHop.portChanges) {
                lastHop.portChanges = {};
            }
            lastHop.portChanges.oldSrcPort = oldPort;
            lastHop.portChanges.newSrcPort = port;
        }
    };
    
    this.getDstPort = function() {
        return dstPort;
    };
    
    this.setDstPort = function(port) {
        dstPort = port;
    };
    
    this.getData = function() {
        return data;
    };
    
    this.getType = function() 
    {
        return type;
    };

    this.getStrInfo = function()
    {
        // Build source address with port (if applicable)
        var srcAddr = (this.getOriginIP() === null) ? "-" : this.getOriginIP();
        if (origPort && origPort > 0) {
            srcAddr += ":" + origPort;
        }

        // Build destination address with port (if applicable)
        var dstAddr = (this.getDestinationIP() === null) ? "-" : this.getDestinationIP();
        if (dstPort && dstPort > 0) {
            dstAddr += ":" + dstPort;
        }

        var result = "Src: " + srcAddr + "\n";
        result += "Dst: " + dstAddr;

        if (data.description)
        {
            result += "\n";
            result += data.description;
        }

        return result;
    };

    /**
     * Mark the current hop as involving PAT (Port Address Translation) - OUTBOUND
     * Called when NAT translates source IP and port for outbound traffic
     * @param {Object} patInfo - PAT translation details
     *   - originalIP: Original source IP before translation
     *   - originalPort: Original source port before translation
     *   - translatedIP: New source IP (router's public IP)
     *   - translatedPort: New source port (ephemeral port)
     *   - routerInterface: Which router interface performed the translation
     */
    this.markPATTranslation = function(patInfo) {
        if (pathHistory.length > 0) {
            var lastHop = pathHistory[pathHistory.length - 1];
            lastHop.patTranslation = {
                direction: 'outbound',
                originalIP: patInfo.originalIP,
                originalPort: patInfo.originalPort,
                translatedIP: patInfo.translatedIP,
                translatedPort: patInfo.translatedPort,
                routerInterface: patInfo.routerInterface || 'WAN',
                isPAT: true
            };
        }
    };

    /**
     * Mark the current hop as involving PAT (Port Address Translation) - INBOUND (response)
     * Called when router translates destination IP and port back to internal host
     * @param {Object} patInfo - PAT reverse translation details
     *   - publicIP: Router's public IP (before translation)
     *   - publicPort: Ephemeral port (before translation)
     *   - internalIP: Original internal host IP (after translation)
     *   - internalPort: Original internal port (after translation)
     */
    this.markReversePATTranslation = function(patInfo) {
        if (pathHistory.length > 0) {
            var lastHop = pathHistory[pathHistory.length - 1];
            lastHop.patTranslation = {
                direction: 'inbound',
                publicIP: patInfo.publicIP,
                publicPort: patInfo.publicPort,
                internalIP: patInfo.internalIP,
                internalPort: patInfo.internalPort,
                isPAT: true
            };
        }
    };

    /**
     * Add a hop to the packet's journey history
     * @param {Object} hopData - Information about this hop
     *   - deviceType: 'source', 'switch', 'router', 'firewall', 'destination'
     *   - deviceName: Name of the device
     *   - deviceId: ID of the device element
     *   - action: What happened (e.g., 'created', 'forwarded', 'routed', 'delivered')
     *   - changes: Object describing what changed (Layer 2, Layer 3, etc.)
     */
    this.addPathHop = function(hopData) {
        // Capture current state at this hop
        var snapshot = {
            timestamp: Date.now(),
            deviceType: hopData.deviceType || 'unknown',
            deviceName: hopData.deviceName || 'Unknown Device',
            deviceId: hopData.deviceId || null,
            action: hopData.action || 'processed',
            changes: hopData.changes || {},
            state: {
                srcMAC: originMAC,
                dstMAC: destinationMAC,
                srcIP: originIP,
                dstIP: destinationIP,
                srcPort: origPort,
                dstPort: dstPort,
                ttl: TTL
            }
        };
        pathHistory.push(snapshot);
    };

    /**
     * Get the complete path history for this packet
     */
    this.getPathHistory = function() {
        return pathHistory;
    };

    /**
     * Check if this packet has path history
     */
    this.hasPathHistory = function() {
        return pathHistory.length > 0;
    };

    /**
     * Set related packet ID (for request/response pairs)
     */
    this.setRelatedPacketId = function(packetId) {
        relatedPacketId = packetId;
    };

    /**
     * Get related packet ID
     */
    this.getRelatedPacketId = function() {
        return relatedPacketId;
    };

    // VLAN tagging getter/setter methods (Phase 2)
    this.getVlanId = function() {
        return vlanId;
    };

    this.setVlanId = function(id) {
        vlanId = id;
    };

    this.is802_1Q = function() {
        return is802_1Q;
    };

    this.setIs802_1Q = function(tagged) {
        is802_1Q = tagged;
    };

    // NAT tracking methods - prevent double/triple NAT
    this.hasBeenNATted = function() {
        return hasBeenNATted;
    };

    this.setNATted = function(natted) {
        hasBeenNATted = natted;
    };
};
