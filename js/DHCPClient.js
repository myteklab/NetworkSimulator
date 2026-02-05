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

function requestDHCPInfoCommand(id) 
{
    var elem = network.getElement(id);
    elem.getApp("DHCPClient").requestInfo();
}

function releaseDHCPCommand(id) 
{
    var elem = network.getElement(id);
    elem.getApp("DHCPClient").releaseIP();
}

var DHCPClient = function(ifacepos) 
{
    var owner = null;
    var ifacepos = ifacepos;
    var menu = null;
    
    this.save = function() 
    {
        var result = {};
        result.version = 1;
        result.id = this.getId();
        result.ifacepos = ifacepos;

        return result;
    };

    this.load = function(data)
    {
    };

    this.getId = function() 
    {
        return "DHCPClient";
    };
    
    this.requestInfo = function()
    {
        var data = {};
        data.type = "request";
        data.description = "DHCP: request";
        var message = new Message(
        null,  // UDP protocol (DHCP uses UDP, not TCP)
        owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
        "255.255.255.255",
        owner.getConnectable().getMAC(ifacepos),
        "FF:FF:FF:FF:FF:FF",
         getDinamycPort(),
         67,
         data,
         images[IMAGE_ENVELOPEDHCP]);

        // Track packet creation
        message.addPathHop({
            deviceType: 'source',
            deviceName: owner.getName(),
            deviceId: owner.id,
            action: 'created',
            changes: {
                description: 'DHCP Request packet created (broadcast)'
            }
        });

        owner.getConnectable().getTrafficManager().registerApplication(this, message.getOrigPort(), false);
        owner.getConnectable().getConnector(ifacepos).send(message);
    };
    
    this.releaseIP = function() 
    {
        // Check if we have an IP to release
        var currentIP = owner.getConnectable().getIPInfo(ifacepos).getIPv4();
        if (!currentIP || currentIP === null) {
	// console.log('[DHCP CLIENT] No IP to release');
            return;
        }
        
        // Send DHCP release message
        var data = {};
        data.type = "release";
        data.description = "DHCP: release";
        data.releasedIP = currentIP;
        data.clientMAC = owner.getConnectable().getMAC(ifacepos);
        
        var message = new Message(
        null,  // UDP protocol (DHCP uses UDP, not TCP)
        currentIP,
        "255.255.255.255",
        owner.getConnectable().getMAC(ifacepos),
        "FF:FF:FF:FF:FF:FF",
         getDinamycPort(),
         67,
         data,
         images[IMAGE_ENVELOPEDHCP]);

        // Track packet creation
        message.addPathHop({
            deviceType: 'source',
            deviceName: owner.getName(),
            deviceId: owner.id,
            action: 'created',
            changes: {
                description: 'DHCP Release packet created'
            }
        });

        owner.getConnectable().getConnector(ifacepos).send(message);
        
        // Clear the IP configuration
        owner.getConnectable().getIPInfo(ifacepos).setIPv4(null);
        owner.getConnectable().getIPInfo(ifacepos).setDNS1(null);
        owner.getConnectable().getIPInfo(ifacepos).setDNS2(null);
        owner.getConnectable().getIPInfo(ifacepos).setNetmask(null);
        owner.getConnectable().getGatewayManager().purgeGatewayInfo();
        owner.getConnectable().getIPInfo(ifacepos).setStatic(false);
        
        // Reset DHCP state
        hasReceivedOffer = false;
        rejectedOffers = [];
        
        // Clear compromised state if it exists
        if (owner.compromisedByRogue) {
            owner.compromisedByRogue = false;
            owner.rogueServerIP = null;
            owner.rogueGateway = null;
            
            // Force a redraw to remove the compromised visual
            if (owner.getDrawable && owner.getDrawable()) {
                owner.getDrawable().needsRedraw = true;
            }
        }
        
	// console.log('[DHCP CLIENT] Released IP: ' + currentIP);
        
        // Refresh the menu to remove the release option
        if (owner.refreshMenu) {
            owner.refreshMenu();
        }
        
        // Show notification
        if (typeof window !== 'undefined' && window.showNotification) {
            window.showNotification('DHCP lease released. IP: ' + currentIP, 'success');
        }
    };
    
    var hasReceivedOffer = false;  // Track if we've already accepted an offer
    var rejectedOffers = [];  // Track servers we rejected
    
    this.receiveMessage = function(message) 
    {
        var data = message.getData();
        
        // If we've already accepted an offer, log that we're rejecting this one
        if (hasReceivedOffer) {
            rejectedOffers.push({
                serverIP: data.dhcpServerIP,
                serverName: data.dhcpServerName,
                isRogue: data.isRogueResponse
            });
	// console.log('[DHCP CLIENT] Ignoring late offer from ' + data.dhcpServerName + 
	//                    ' (' + data.dhcpServerIP + ')' + 
	//                    (data.isRogueResponse ? ' [ROGUE]' : ' [LEGITIMATE]'));
            return;
        }
        
        // First offer wins!
        hasReceivedOffer = true;
        
        // Log which server won the race
        var winnerType = data.isRogueResponse ? 'ROGUE' : 'LEGITIMATE';
	// console.log('[DHCP CLIENT] *** ACCEPTING OFFER from ' + data.dhcpServerName + 
	//               ' (' + data.dhcpServerIP + ') [' + winnerType + '] ***');
        
        // Trigger visual notification of the race winner
        if (typeof window !== 'undefined' && window.onDHCPRaceWinner) {
            window.onDHCPRaceWinner({
                isRogue: data.isRogueResponse,
                serverIP: data.dhcpServerIP,
                serverName: data.dhcpServerName,
                clientName: owner.getName ? owner.getName() : 'Host',
                gateway: data.gateway
            });
        }
        
        // If this was a rogue response, add visual warning
        if (data.isRogueResponse) {
            console.warn('[SECURITY WARNING] This host accepted configuration from a ROGUE DHCP server!');
            // Store that this host was compromised
            owner.compromisedByRogue = true;
            owner.rogueServerIP = data.dhcpServerIP;
            owner.rogueGateway = data.gateway;
            
            // Force a redraw to show the compromised visual immediately
            if (owner.getDrawable && owner.getDrawable()) {
                owner.getDrawable().needsRedraw = true;
            }
        }
        
        owner.getConnectable().getIPInfo(ifacepos).setIPv4(data.ipv4);
        owner.getConnectable().getIPInfo(ifacepos).setDNS1(data.dns1);
        owner.getConnectable().getIPInfo(ifacepos).setDNS2(data.dns2);
        //owner.getConnectable().getIPInfo(ifacepos).setGateway(data.gateway);
        owner.getConnectable().getGatewayManager().addGatewayInfo("0.0.0.0","0.0.0.0",data.gateway);
        owner.getConnectable().getIPInfo(ifacepos).setNetmask(data.netmask);
        owner.getConnectable().getIPInfo(ifacepos).setStatic(false);
        
        // Refresh the menu to show the release option
        if (owner.refreshMenu) {
            owner.refreshMenu();
        }
        
        // Reset for next DHCP request
        setTimeout(function() {
            hasReceivedOffer = false;
            rejectedOffers = [];
        }, 5000);  // Reset after 5 seconds
    };
    
    this.setOwner = function(o) 
    {
        owner = o;
    };

    this.getIfacepos = function()
    {
        return ifacepos;
    };
    
    /*this.getAppController = function() 
    {
        var id = network.getPosForElement(owner);
        var result = "<input type='button' value='Request Info' onclick='requestDHCPInfoCommand(" + id + ");' />";
        return result;
    };*/

    this.getMenuEntries = function()
    {
        var data = [];
        data[0] = {};
        data[0].img = 'img/64/envelope-DHCP.png';
        data[0].text = 'Request DHCP info';
        data[0].js = 'requestDHCPInfoCommand('+owner.id+');';
        
        // Add release option if we have an IP
        var currentIP = owner.getConnectable().getIPInfo(ifacepos).getIPv4();
        if (currentIP && currentIP !== null) {
            data[1] = {};
            data[1].img = null;
            data[1].emoji = '🔓';
            data[1].text = 'Release DHCP lease';
            data[1].js = 'releaseDHCPCommand('+owner.id+');';
        }

        return data;
    };

        
    this.getAppDescription = function()
    {
        return "";
    };
    
};
