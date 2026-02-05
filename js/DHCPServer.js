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

function editDHCPServerInfo(id) 
{
    createBkDiv();
    createDHCPServerInfoDiv(id);
}

function createDHCPServerInfoDiv(id) 
{
    var host = network.getElement(id);
    var app = host.getApp("DHCPServer");
    var div = document.createElement("div");
    /*var l = innerWidth / 2 - 200;
    var t = innerHeight / 2 - 75;
    
    div.setAttribute('style', 'position:absolute;top:' + t + 'px;left:' + l + 'px;z-index:110;background-color:white;width:400px;height:150px;border-radius:10px;border:1px solid;padding:10px;text-align:center;');
    div.setAttribute('id', 'divdhcpserverinfo');
    div.innerHTML = app.getAppController();
    div.innerHTML += '<p>\
  <input type="button" id="upload" value="Save" onclick="saveDHCPServerData('+id+');" />\
  <input type="button" id="cancel" value="Cancel" onclick="cancelDHCPServerData();" />\
  </p>';
    document.body.appendChild(div);*/
    
    var controls = '<input type="button" id="upload" value="'+_("Save")+'" onclick="saveDHCPServerData(' + id + ');" />';
    controls += '<input type="button" id="cancel" value="'+_("Cancel")+'" onclick="cancelDHCPServerData();" />';
    
    var w = new UIWindow('divdhcpserverinfo', 'DHCP Server', 450, 520, false, 1.0);
    w.setContent(app.getAppController());
    w.setControls(controls);
    w.render();
}

function saveDHCPServerData(id) 
{
    var elem = network.getElement(id);
    var initial = document.getElementById('dhcpinitial').value;
    var final = document.getElementById('dhcpend').value;
    var gateway = document.getElementById('dhcpgw').value;
    var dns1 = document.getElementById('dhcpdns1').value;
    var dns2 = document.getElementById('dhcpdns2').value;
    var isRogue = document.getElementById('dhcprogue') ? document.getElementById('dhcprogue').checked : false;
    elem.getApp("DHCPServer").setData(initial, final, gateway, dns1, dns2, isRogue);
    
    removeBodyDiv('divbk');
    uimanager.getWindow("divdhcpserverinfo").dispose();
}

function cancelDHCPServerData() 
{
    removeBodyDiv('divbk');
    uimanager.getWindow("divdhcpserverinfo").dispose();
}

var DHCPServer = function(ifacepos) 
{
    var owner = null;
    var ifacepos = ifacepos;
    var initial = 100;
    var end = 200;
    var gateway = null;
    var dns1 = null;
    var dns2 = null;
    var leases = [];
    var leasesbymac = [];
    var isRogueMode = false;  // Rogue DHCP mode for MITM attacks
    var interceptedTraffic = [];  // Store intercepted data
    var compromisedHosts = [];  // Track hosts that received poisoned config
    
    this.save = function() 
    {
        var result = {};
        result.version = 1;
        result.id = this.getId();
        result.ifacepos = ifacepos;
        result.initial = initial;
        result.end = end;
        result.gateway = gateway;
        result.dns1 = dns1;
        result.dns2 = dns2;
        result.isRogueMode = isRogueMode;
        
        return result;
    };
    
    this.load = function(data) 
    {
        initial = data.initial;
        end = data.end;
        gateway = data.gateway;
        dns1 = data.dns1;
        dns2 = data.dns2;
        isRogueMode = data.isRogueMode || false;
    };
    
    this.getId = function() 
    {
        return "DHCPServer";
    };
    
    this.setData = function(initial_p, end_p, gateway_p, dns1_p, dns2_p, rogue_p) 
    {
        initial = initial_p;
        end = end_p;
        gateway = gateway_p;
        dns1 = dns1_p;
        dns2 = dns2_p;
        isRogueMode = rogue_p || false;
    };
    
    this.isRogue = function() {
        return isRogueMode;
    };
    
    this.getInterceptedTraffic = function() {
        return interceptedTraffic;
    };
    
    this.getCompromisedHosts = function() {
        return compromisedHosts;
    };
    
    this.interceptHTTPData = function(message) {
        if (isRogueMode && message.getData && message.getData()) {
            var data = message.getData();
            if (data.url || data.request || data.content || data.contents) {
                // Check if this is encrypted HTTPS traffic
                var isEncrypted = data.isEncrypted || (data.protocol === 'https');
                
                var trafficEntry = {
                    timestamp: new Date().toISOString(),
                    sourceIP: message.getOriginIP(),
                    destIP: message.getDestinationIP(),
                    type: isEncrypted ? 'HTTPS' : 'HTTP',
                    protocol: data.protocol || 'http',
                    port: data.port || (isEncrypted ? 443 : 80),
                    isEncrypted: isEncrypted,
                    url: data.url || '',
                    method: data.method || 'GET'
                };
                
                if (isEncrypted) {
                    // HTTPS traffic - cannot see actual content
                    trafficEntry.encryptedData = true;
                    trafficEntry.headers = { Note: 'HTTPS headers are encrypted' };
                    trafficEntry.body = '[ENCRYPTED - Cannot decrypt HTTPS traffic]';
                    trafficEntry.credentials = null;
                    trafficEntry.warning = '🔒 HTTPS encryption prevents content inspection';
                } else {
                    // HTTP traffic - can see everything
                    trafficEntry.headers = data.headers || {};
                    trafficEntry.body = data.body || data.contents || '';
                    trafficEntry.credentials = extractCredentials(data);
                }
                
                interceptedTraffic.push(trafficEntry);
                
                // Keep only last 100 entries
                if (interceptedTraffic.length > 100) {
                    interceptedTraffic.shift();
                }
            }
        }
    };
    
    function extractCredentials(data) {
        var creds = {};
        // Check for basic auth header
        if (data.headers && data.headers['Authorization']) {
            var auth = data.headers['Authorization'];
            if (auth.startsWith('Basic ')) {
                try {
                    var decoded = atob(auth.substring(6));
                    var parts = decoded.split(':');
                    creds.username = parts[0];
                    creds.password = parts[1];
                    creds.type = 'Basic Auth';
                } catch(e) {}
            }
        }
        // Check for form data
        if (data.body) {
            var params = new URLSearchParams(data.body);
            if (params.has('username') || params.has('user') || params.has('email')) {
                creds.username = params.get('username') || params.get('user') || params.get('email');
                creds.password = params.get('password') || params.get('pass') || '';
                creds.type = 'Form Data';
            }
        }
        return Object.keys(creds).length > 0 ? creds : null;
    }
    
    
    function newLease(mac) 
    {
        var result = initial;
        var free = false;
        while (!free) 
        {
            if (result in leases) 
            {
                result++;
            } 
            else 
            {
                free = true;
            }
        }
        
        var ipdata = owner.getConnectable().getIPInfo(ifacepos).getIPv4().split(".");
        var ipbase = ipdata[0] + "." + ipdata[1] + "." + ipdata[2] + ".";
        var data = {};
        data.mac = mac;
        data.ipv4 = ipbase + result
        leases[result] = data;
        leasesbymac[mac] = data;
        return result;
    }
    
    function getExistingLease(mac) 
    {
        var result = null;
        if (mac in leasesbymac) 
        {
            result = leases.indexOf(leasesbymac[mac]);
        }
        
        return result;
    }
    
    this.receiveMessage = function(message) 
    {
        // Handle DHCP release messages
        if (message.getData().type === "release") {
            var releasedIP = message.getData().releasedIP;
            var clientMAC = message.getData().clientMAC;
            
	// console.log('[DHCP SERVER] Received release for IP: ' + releasedIP + ' from MAC: ' + clientMAC);
            
            // Find and remove the lease
            for (var ip in leases) {
                if (leases[ip].ipv4 === releasedIP && leases[ip].mac === clientMAC) {
                    delete leases[ip];
                    delete leasesbymac[clientMAC];
	// console.log('[DHCP SERVER] Lease released: ' + releasedIP);
                    
                    // Remove from compromised hosts if this was a rogue server
                    if (isRogueMode && compromisedHosts) {
                        for (var i = compromisedHosts.length - 1; i >= 0; i--) {
                            if (compromisedHosts[i].mac === clientMAC) {
                                compromisedHosts.splice(i, 1);
	// console.log('[ROGUE DHCP] Removed ' + clientMAC + ' from compromised hosts');
                                break;
                            }
                        }
                    }
                    break;
                }
            }
            return;
        }
        
        // Handle normal DHCP request
        if ((message.getData().type === "request") &&
        (owner.getConnectable().getIPInfo(ifacepos).getIPv4() !== null))
        {
            // Check if this is a relayed request (has GIADDR)
            var isRelayed = message.getData().relayed || message.getData().giaddr;
            var giaddr = message.getData().giaddr;

            if (isRelayed && giaddr) {
                console.log('📡 DHCP Server: Received relayed request from ' + message.getOriginMAC() + ' via relay ' + giaddr);
            }

            var newip = getExistingLease(message.getOriginMAC());
            if (newip === null)
            {
                newip = newLease(message.getOriginMAC());
            }
            var data = {};
            data.ipv4 = leases[newip].ipv4;
            
            // Add server identification for race condition visibility
            data.dhcpServerIP = owner.getConnectable().getIPInfo(ifacepos).getIPv4();
            data.dhcpServerName = owner.getName() || 'DHCP Server';
            data.isRogueResponse = isRogueMode;
            
            // Rogue DHCP servers give out exactly what they're configured to give
            // Just like normal DHCP servers - the "rogue" part is that they're unauthorized
            if (isRogueMode) {
                var myIP = owner.getConnectable().getIPInfo(ifacepos).getIPv4();
                
                // Use the exact same configuration as a normal DHCP server would
                data.dns1 = dns1;
                data.dns2 = dns2;
                data.gateway = gateway;
                data.description = "DHCP: rogue offer (MITM)";
                
	// console.log('[ROGUE DHCP] Offering - Gateway: ' + (gateway || 'null') + 
	//                        ', DNS1: ' + (dns1 || 'null') + ', DNS2: ' + (dns2 || 'null'));
                
                // Mark this host as compromised and track it
                if (leases[newip]) {
                    leases[newip].compromised = true;
                    leases[newip].rogueServer = myIP;
                    
                    // Add to compromised hosts list
                    var hostEntry = {
                        ip: leases[newip].ipv4,
                        mac: message.getOriginMAC(),
                        timestamp: new Date().toISOString(),
                        poisonedGateway: data.gateway,  // Use the actual gateway we're assigning
                        poisonedDNS: data.dns1,
                        status: 'Active',
                        isUsingRogueRouter: (data.gateway !== myIP)  // Track if using separate rogue router
                    };
                    
                    // Check if host already exists in list
                    var existingIndex = -1;
                    for (var i = 0; i < compromisedHosts.length; i++) {
                        if (compromisedHosts[i].mac === hostEntry.mac) {
                            existingIndex = i;
                            break;
                        }
                    }
                    
                    if (existingIndex >= 0) {
                        // Update existing entry
                        compromisedHosts[existingIndex] = hostEntry;
                    } else {
                        // Add new entry
                        compromisedHosts.push(hostEntry);
                    }
                }
            } else {
                data.dns1 = dns1;
                data.dns2 = dns2;
                data.gateway = gateway;
                data.description = "DHCP: offer";
            }
            
            data.netmask = owner.getConnectable().getIPInfo(ifacepos).getNetmask();

            // For relayed requests, we need to send the response back to the relay router (GIADDR)
            // The router will then forward it to the client
            var destinationIP = leases[newip].ipv4;  // Default: send directly to client
            var destinationMAC = message.getOriginMAC();  // Default: client's MAC

            if (isRelayed && giaddr) {
                // Relayed request: send response to the relay router
                destinationIP = giaddr;
                var relayMAC = owner.getConnectable().findMACforIP(giaddr);
                if (relayMAC) {
                    destinationMAC = relayMAC;
                    console.log('📡 DHCP Server: Sending response to relay router ' + giaddr);
                }
            }

            var response = new Message(
            null,  // UDP protocol (DHCP uses UDP, not TCP)
            owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
            destinationIP,
            owner.getConnectable().getMAC(ifacepos),
            destinationMAC,
            67,
            message.getOrigPort(),
            data,
            images[IMAGE_ENVELOPEDHCP]
            );

            // Track response packet creation
            if (response.addPathHop) {
                response.addPathHop({
                    deviceType: 'source',
                    deviceName: owner.getName(),
                    deviceId: owner.id,
                    action: 'created',
                    changes: {
                        description: 'DHCP ' + (data.type === 'offer' ? 'Offer' : 'ACK') + ' packet created'
                    }
                });
            }

            // Simulate DHCP race condition - rogue servers respond faster!
            if (isRogueMode) {
                // Rogue servers respond immediately (0-50ms delay)
                var delay = Math.random() * 50;
                setTimeout(function() {
                    owner.getConnectable().getConnector(ifacepos).send(response);
	// console.log('[ROGUE DHCP] Fast response sent from ' + data.dhcpServerName + ' (delay: ' + delay.toFixed(0) + 'ms)');
                }, delay);
            } else {
                // Legitimate servers have normal processing delay (100-300ms)
                var delay = 100 + Math.random() * 200;
                setTimeout(function() {
                    owner.getConnectable().getConnector(ifacepos).send(response);
	// console.log('[DHCP] Normal response sent from ' + data.dhcpServerName + ' (delay: ' + delay.toFixed(0) + 'ms)');
                }, delay);
            }
        }
    };

    /*this.proccessCommand = function(name, args)
  {
    switch (name)
    {
      case "setData":
	this.setData(args[0], args[1], args[2], args[3], args[4]);
	break;
    };
  };*/
    
    this.setOwner = function(o) 
    {
        owner = o;
    };

    /*this.getCommands = function()
  {
    var data = [];
    
    data["setData"] = {};
    data["setData"].name = "setData";
    data["setData"].args = [
    {name: "initial", type: "int"},
    {name: "end", type: "int"},
    {name: "gateway", type: "ip"},
    {name: "dns1", type: "ip"},
    {name: "dns2", type: "ip"}
    ];
    
    return data;
  };*/
    
    this.getIfacepos = function() 
    {
        return ifacepos;
    };
    
    this.getAppController = function()
    {
        var id = network.getPosForElement(owner);
        result = "<div style='padding:20px;'>";

        // Help header
        result += "<div style='margin-bottom:20px; padding:15px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:8px;'>";
        result += "<h4 style='margin:0 0 8px 0; color:white; font-weight:600;'>📡 DHCP Server Configuration <span class='help-icon' onclick=\"showHelp('dhcp_overview')\">?</span></h4>";
        result += "<p style='margin:0; font-size:12px; color:#e4e4f7;'>Automatically assign IP addresses to clients</p>";
        result += "</div>";

        result += "<div style='text-align:left;'>";
        result += "<label for='dhcpinitial' style='display:block; margin-bottom:5px;'>"+_("Initial IP Address:")+"</label>";
        result += "<input type='text' id='dhcpinitial' value='" + initial + "' style='width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-bottom:15px;' />";

        result += "<label for='dhcpend' style='display:block; margin-bottom:5px;'>"+_("Final IP Address:")+"</label>";
        result += "<input type='text' id='dhcpend' value='" + end + "' style='width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-bottom:15px;' />";

        result += "<label for='dhcpgw' style='display:block; margin-bottom:5px;'>"+_("Gateway:")+" <span class='help-icon' onclick=\"showHelp('default_gateway')\">?</span></label>";
        result += "<input type='text' id='dhcpgw' value='" + ((gateway === null) ? "" : gateway) + "' style='width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-bottom:15px;' />";

        result += "<label for='dhcpdns1' style='display:block; margin-bottom:5px;'>"+_("DNS Server 1:")+"</label>";
        result += "<input type='text' id='dhcpdns1' value='" + ((dns1 === null) ? "" : dns1) + "' style='width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-bottom:15px;' />";

        result += "<label for='dhcpdns2' style='display:block; margin-bottom:5px;'>"+_("DNS Server 2:")+"</label>";
        result += "<input type='text' id='dhcpdns2' value='" + ((dns2 === null) ? "" : dns2) + "' style='width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-bottom:15px;' />";

        result += "<div style='margin-top:15px;padding:10px;background:#ffebee;border:1px solid #ef5350;border-radius:4px;'>";
        result += "<label style='color:#c62828;font-weight:bold;'>";
        result += "<input type='checkbox' id='dhcprogue' " + (isRogueMode ? "checked" : "") + " />";
        result += " Enable Rogue Mode (MITM Attack)</label>";
        result += "<div style='font-size:11px;color:#d32f2f;margin-top:5px;'>⚠️ Educational Only: Simulates man-in-the-middle attack by poisoning gateway/DNS</div>";
        result += "</div>";
        result += "</div></div>";

        return result;
    };
    
    this.getMenuEntries = function() 
    {
        var data = [];
        
        data[0] = {};
        data[0].img = 'img/64/envelope-DHCP.png';
        data[0].text = 'Edit DHCP server info';
        data[0].js = 'editDHCPServerInfo(' + owner.id + ');';
        
        if (isRogueMode) {
            data[1] = {};
            data[1].img = null;  // Use emoji instead
            data[1].emoji = '🔴';
            data[1].text = 'View Intercepted Traffic';
            data[1].js = 'viewInterceptedTraffic(' + owner.id + ');';
            
            data[2] = {};
            data[2].img = null;  // Use emoji instead
            data[2].emoji = '🎯';
            data[2].text = 'View Compromised Hosts';
            data[2].js = 'viewCompromisedHosts(' + owner.id + ');';
        }
        
        return data;
    };
    
    this.getAppDescription = function()
    {
        var result = "DNS Server\n";
        result += "Ini: " + initial + "/End: " + end;
        result += "/Gateway: " + ((gateway === null)?"- ":gateway);
        result += " /DNS 1: " + ((dns1 === null)?"- ":dns1);
        result += " /DNS 2: " + ((dns2 === null)?"- ":dns2);
        return result;
    };
    
};
