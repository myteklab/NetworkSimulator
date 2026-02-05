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

function createDNSLookup(id)
{
    createBkDiv();
    createDNSLookupDiv(id);
}

function createDNSLookupDiv(id)
{
    var host = network.getElement(id);
    var app = host.getApp("DNSClient");
    /*var div = document.createElement("div");
    var l = window.innerWidth / 2 - 200;
    var t = window.innerHeight / 2 - 75;

    div.setAttribute('style', 'position:absolute;top:' + t + 'px;left:' + l + 'px;z-index:110;background-color:white;width:400px;height:150px;border-radius:10px;border:1px solid;padding:10px;text-align:center;');
    div.setAttribute('id', 'divdnslookup');
    div.innerHTML = app.getAppController();*/
    var controls = '<input type="button" id="upload" value="'+_("Lookup")+'" onclick="requestDNSLookup(' + id + ');" />\
  <input type="button" id="cancel" value="'+_("Cancel")+'" onclick="cancelDNSLookup();" />';
    var w = new UIWindow('divdnslookup', 'DNS lookup', 450, 400, false, 1.0);
    w.setContent(app.getAppController());
    w.setControls(controls);
    w.render();
}

function cancelDNSLookup()
{
    // Stop any refresh timer
    if (dnsRefreshInterval) {
        clearInterval(dnsRefreshInterval);
        dnsRefreshInterval = null;
    }
    uimanager.getWindow("divdnslookup").dispose();
    removeBodyDiv('divbk');
}

var dnsRefreshInterval = null;

function requestDNSLookup(id)
{
    var elem = network.getElement(id);
    var domain = document.getElementById("dnsclientdomain").value;
    if (domain && domain.trim() !== '') {
        elem.getApp("DNSClient").DNSLookup(domain);
        // Immediately refresh to show pending status
        refreshDNSLookupModal(id);
        
        // Start periodic refresh to update when response arrives
        startDNSRefreshTimer(id);
    }
}

function startDNSRefreshTimer(id) {
    // Clear any existing interval
    if (dnsRefreshInterval) {
        clearInterval(dnsRefreshInterval);
    }
    
    // Refresh every 500ms for up to 30 seconds to catch DNS responses
    var refreshCount = 0;
    dnsRefreshInterval = setInterval(function() {
        refreshCount++;
        refreshDNSLookupModal(id);
        
        // Check if all pending lookups are resolved
        var elem = network.getElement(id);
        var app = elem.getApp("DNSClient");
        var hasPending = false;
        if (app && app.getDNSCache) {
            var cache = app.getDNSCache();
            for (var domain in cache) {
                if (cache[domain].status === 'pending') {
                    hasPending = true;
                    break;
                }
            }
        }
        
        // Stop refreshing after 60 attempts (30 seconds) or when no pending lookups
        if (refreshCount >= 60 || !hasPending) {
            clearInterval(dnsRefreshInterval);
            dnsRefreshInterval = null;
        }
    }, 500);
}

function clearDNSCache(id)
{
    var elem = network.getElement(id);
    var dnsClient = elem.getApp("DNSClient");
    if (dnsClient) {
        dnsClient.clearDNSCache();
        refreshDNSLookupModal(id);
    }
}

function refreshDNSLookupModal(id)
{
    var elem = network.getElement(id);
    var app = elem.getApp("DNSClient");
    if (app) {
        var window = uimanager.getWindow("divdnslookup");
        if (window) {
            // Save the current input value and scroll position
            var currentValue = document.getElementById("dnsclientdomain") ? document.getElementById("dnsclientdomain").value : '';
            var windowContent = document.getElementById("divdnslookup_content");
            var scrollTop = windowContent ? windowContent.scrollTop : 0;
            
            window.setContent(app.getAppController());
            window.render();
            
            // Restore the input value
            if (currentValue && document.getElementById("dnsclientdomain")) {
                document.getElementById("dnsclientdomain").value = currentValue;
            }
            
            // Restore scroll position
            windowContent = document.getElementById("divdnslookup_content");
            if (windowContent && scrollTop > 0) {
                windowContent.scrollTop = scrollTop;
            }
        }
    }
}

var DNSClient = function(ifacepos)
{
    var owner = null;
    var ifacepos = ifacepos;
    var localtable = [];
    var dnsCache = {}; // DNS cache: domain -> {ip, timestamp, status}

    this.save = function()
    {
        var result = {};
        result.version = 2; // Updated version for cache support
        result.id = this.getId();
        result.ifacepos = ifacepos;
        
        // Save DNS cache (but only resolved entries to avoid stale pending states)
        result.dnsCache = {};
        for (var domain in dnsCache) {
            if (dnsCache[domain].status === 'resolved') {
                result.dnsCache[domain] = {
                    ip: dnsCache[domain].ip,
                    status: 'resolved',
                    timestamp: dnsCache[domain].timestamp.toISOString()
                };
            }
        }

        return result;
    };

    this.load = function(data)
    {
        // Load DNS cache if available (version 2+)
        if (data.version >= 2 && data.dnsCache) {
            for (var domain in data.dnsCache) {
                dnsCache[domain] = {
                    ip: data.dnsCache[domain].ip,
                    status: data.dnsCache[domain].status,
                    timestamp: new Date(data.dnsCache[domain].timestamp),
                    attempts: 1
                };
                // Also populate localtable for backward compatibility
                if (data.dnsCache[domain].ip) {
                    localtable[domain] = data.dnsCache[domain].ip;
                }
            }
        }
    };

    this.getId = function()
    {
        return "DNSClient";
    };

    this.DNSLookup = function(domain)
    {
      // Add to cache as pending
      dnsCache[domain] = {
          ip: null,
          status: 'pending',
          timestamp: new Date(),
          attempts: (dnsCache[domain] ? dnsCache[domain].attempts + 1 : 1)
      };
      
      // Tenemos IP?
      if (owner.getConnectable().getIPInfo(ifacepos).getIPv4() !== null)
      {
        //var MAC = owner.getConnectable().getDstMAC(ifacepos, owner.getConnectable().getIPInfo(ifacepos).getDNS1());
        var MAC = owner.getConnectable().getDstMAC(owner.getConnectable().getIPInfo(ifacepos).getDNS1());
        if (MAC !== null)
        {
            var data = {};
            data.domain = domain;
            data.type = "lookup";
            data.description = "Lookup: " + domain;
            var message = new Message(
            "tcp",
            owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
            owner.getConnectable().getIPInfo(ifacepos).getDNS1(),
            owner.getConnectable().getMAC(ifacepos),
            MAC,
            getDinamycPort(),
            53,
            data, images[IMAGE_ENVELOPEDNS]
            );
            owner.getConnectable().getTrafficManager().registerApplication(this, message.getOrigPort(), false);
            owner.getConnectable().getConnector(ifacepos).send(message);
        }
        else 
        {
            // Can't reach DNS server - mark as failed
            dnsCache[domain].status = 'failed';
            dnsCache[domain].error = 'DNS server unreachable';
            // Add diagnostic info
            var dnsIP = owner.getConnectable().getIPInfo(ifacepos).getDNS1();
            if (!dnsIP || dnsIP === 'null') {
                dnsCache[domain].error = 'No DNS server configured';
            }
        }
      }
      else 
      {
          // No IP configured on this interface
          dnsCache[domain].status = 'failed';
          dnsCache[domain].error = 'No IP address configured';
      }
    };

    this.receiveMessage = function(message)
    {
        if (message.getData().domain) {
            if (message.getData().ip !== null)
            {
                localtable[message.getData().domain] = message.getData().ip;
                // Update DNS cache with successful result
                dnsCache[message.getData().domain] = {
                    ip: message.getData().ip,
                    status: 'resolved',
                    timestamp: new Date(),
                    attempts: dnsCache[message.getData().domain] ? dnsCache[message.getData().domain].attempts : 1
                };
            } else {
                // Update DNS cache with failed result
                if (dnsCache[message.getData().domain]) {
                    dnsCache[message.getData().domain].status = 'failed';
                    dnsCache[message.getData().domain].timestamp = new Date();
                }
            }
            
            // Try to refresh the modal if it's open
            if (owner && owner.getId) {
                try {
                    refreshDNSLookupModal(owner.getId());
                } catch(e) {
                    // Modal might not be open, that's ok
                }
            }
        }
    };

    this.setOwner = function(o)
    {
        owner = o;
    };

    this.getIfacepos = function()
    {
        return ifacepos;
    };

    this.getIp = function(domain)
    {
        var result = null;

        if (domain in localtable)
        {
            result = localtable[domain];
        }

        return result;
    };

    this.getAppController = function()
    {
        var id = network.getPosForElement(owner);
        var result = "<div style='padding:10px;'>";
        
        // DNS Lookup input
        result += "<div style='margin-bottom:20px;'> \
        <label for='dnsclientdomain' style='display:block;margin-bottom:5px;color:#a0a0a0;'>"+_("Domain:")+"</label> \
        <input type='text' id='dnsclientdomain' style='width:100%;padding:8px;background:#2a2d3e;border:1px solid #667eea;border-radius:4px;color:#e4e4e7;' placeholder='example.com' /> \
        </div>";
        
        // DNS Cache display
        result += "<div style='margin-top:20px;'>";
        result += "<h4 style='color:#667eea;margin-bottom:10px;border-bottom:1px solid #3a3d4a;padding-bottom:5px;'>DNS Cache</h4>";
        
        var cacheEntries = Object.keys(dnsCache);
        if (cacheEntries.length > 0) {
            result += "<div style='max-height:180px;overflow-y:auto;border:1px solid #3a3d4a;border-radius:4px;padding:5px;background:#1a1d2e;'>";
            result += "<table style='width:100%;font-size:12px;'>";
            result += "<thead><tr style='color:#a0a0a0;'>";
            result += "<th style='text-align:left;padding:5px;'>Domain</th>";
            result += "<th style='text-align:left;padding:5px;'>IP Address</th>";
            result += "<th style='text-align:left;padding:5px;'>Status</th>";
            result += "<th style='text-align:left;padding:5px;'>Age</th>";
            result += "</tr></thead>";
            result += "<tbody>";
            
            for (var i = 0; i < cacheEntries.length; i++) {
                var domain = cacheEntries[i];
                var entry = dnsCache[domain];
                var age = Math.floor((new Date() - entry.timestamp) / 1000);
                var ageText = age < 60 ? age + 's' : Math.floor(age/60) + 'm';
                
                var statusColor = entry.status === 'resolved' ? '#68d391' : 
                                 entry.status === 'pending' ? '#fbbf24' : '#ff6b6b';
                var statusIcon = entry.status === 'resolved' ? '✓' : 
                                entry.status === 'pending' ? '⏳' : '✗';
                
                var statusText = entry.status;
                if (entry.error) {
                    statusText = entry.error;
                }
                
                result += "<tr style='border-top:1px solid #2a2d3a;'>";
                result += "<td style='padding:5px;color:#e0e0e0;'>" + domain + "</td>";
                result += "<td style='padding:5px;color:#e0e0e0;'>" + (entry.ip || '-') + "</td>";
                result += "<td style='padding:5px;color:" + statusColor + ";'>" + statusIcon + " " + statusText + "</td>";
                result += "<td style='padding:5px;color:#a0a0a0;'>" + ageText + "</td>";
                result += "</tr>";
            }
            
            result += "</tbody></table>";
            result += "</div>";
            
            // Clear cache button
            result += "<div style='margin-top:10px;'>";
            result += "<button onclick='clearDNSCache(" + id + ")' style='padding:6px 12px;background:#ff6b6b;color:white;border:none;border-radius:4px;cursor:pointer;font-size:11px;'>Clear Cache</button>";
            result += "</div>";
        } else {
            result += "<p style='color:#6b7280;font-style:italic;font-size:12px;'>No DNS lookups performed yet</p>";
        }
        
        result += "</div>";
        result += "</div>";
        
        return result;
    };

    this.getMenuEntries = function()
    {
        var data = [];
        data[0] = {};
        data[0].img = 'img/64/envelope-DNS.png';
        data[0].text = 'DNS lookup';
        data[0].js = 'createDNSLookup(' + owner.id + ');';

        return data;
    };
    
    // Add method to get DNS cache for external access
    this.getDNSCache = function() {
        return dnsCache;
    };
    
    // Add method to clear DNS cache
    this.clearDNSCache = function() {
        dnsCache = {};
        localtable = [];
    };
    
    this.getAppDescription = function()
    {
        return "";
    };
    
};
