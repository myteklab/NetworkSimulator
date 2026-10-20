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
    var typeSelect = document.getElementById("dnsclienttype");
    var qtype = typeSelect ? typeSelect.value : "A";
    if (domain && domain.trim() !== '') {
        elem.getApp("DNSClient").DNSLookup(domain, qtype);
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
            var currentType = document.getElementById("dnsclienttype") ? document.getElementById("dnsclienttype").value : '';
            var windowContent = document.getElementById("divdnslookup_content");
            var scrollTop = windowContent ? windowContent.scrollTop : 0;
            
            window.setContent(app.getAppController());
            window.render();
            
            // Restore the input value
            if (currentValue && document.getElementById("dnsclientdomain")) {
                document.getElementById("dnsclientdomain").value = currentValue;
            }
            if (currentType && document.getElementById("dnsclienttype")) {
                document.getElementById("dnsclienttype").value = currentType;
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
    // domain -> {domain, qtype, ip, answer, chain, timestamp, status}. A lookups keep the
    // bare domain as their key, so caches saved before record types load unchanged.
    var dnsCache = {};

    function cacheKey(domain, qtype)
    {
        return (qtype === "A") ? domain : domain + "|" + qtype;
    }

    this.save = function()
    {
        var result = {};
        result.version = 3;
        result.id = this.getId();
        result.ifacepos = ifacepos;
        
        // Only resolved entries, so a reload never shows a lookup stuck on pending
        result.dnsCache = {};
        for (var key in dnsCache) {
            var entry = dnsCache[key];
            if (entry.status === 'resolved') {
                result.dnsCache[key] = {
                    domain: entry.domain,
                    qtype: entry.qtype,
                    ip: entry.ip,
                    answer: entry.answer,
                    chain: entry.chain,
                    status: 'resolved',
                    timestamp: entry.timestamp.toISOString()
                };
            }
        }

        return result;
    };

    this.load = function(data)
    {
        if (data.version >= 2 && data.dnsCache) {
            for (var key in data.dnsCache) {
                var saved = data.dnsCache[key];
                var domain = normalizeDNSName(saved.domain || key);
                var qtype = saved.qtype || "A";
                dnsCache[cacheKey(domain, qtype)] = {
                    domain: domain,
                    qtype: qtype,
                    ip: saved.ip || null,
                    answer: saved.answer || null,
                    chain: saved.chain || [],
                    status: saved.status,
                    timestamp: new Date(saved.timestamp),
                    attempts: 1
                };
                if (qtype === "A" && saved.ip) {
                    localtable[domain] = saved.ip;
                }
            }
        }
    };

    this.getId = function()
    {
        return "DNSClient";
    };

    this.DNSLookup = function(domain, qtype)
    {
      domain = normalizeDNSName(domain);
      qtype = qtype || "A";
      var key = cacheKey(domain, qtype);
      dnsCache[key] = {
          domain: domain,
          qtype: qtype,
          ip: null,
          answer: null,
          chain: [],
          status: 'pending',
          timestamp: new Date(),
          attempts: (dnsCache[key] ? dnsCache[key].attempts + 1 : 1)
      };
      
      if (owner.getConnectable().getIPInfo(ifacepos).getIPv4() !== null)
      {
        var MAC = owner.getConnectable().getDstMAC(owner.getConnectable().getIPInfo(ifacepos).getDNS1());
        if (MAC !== null)
        {
            var data = {};
            data.domain = domain;
            data.qtype = qtype;
            data.type = "lookup";
            data.description = "Lookup: " + domain + (qtype === "A" ? "" : " (" + qtype + ")");
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
            dnsCache[key].status = 'failed';
            dnsCache[key].error = 'DNS server unreachable';
            var dnsIP = owner.getConnectable().getIPInfo(ifacepos).getDNS1();
            if (!dnsIP || dnsIP === 'null') {
                dnsCache[key].error = 'No DNS server configured';
            }
        }
      }
      else 
      {
          dnsCache[key].status = 'failed';
          dnsCache[key].error = 'No IP address configured';
      }
    };

    this.receiveMessage = function(message)
    {
        var data = message.getData();
        if (!data.domain) {
            return;
        }
        var domain = normalizeDNSName(data.domain);
        var qtype = data.qtype || "A";
        var key = cacheKey(domain, qtype);
        var attempts = dnsCache[key] ? dnsCache[key].attempts : 1;
        var ip = (data.ip !== undefined && data.ip !== null) ? data.ip : null;
        var answer = data.answer || null;

        if (ip !== null || answer !== null)
        {
            if (qtype === "A") {
                localtable[domain] = ip;
            }
            dnsCache[key] = {
                domain: domain,
                qtype: qtype,
                ip: ip,
                answer: answer,
                chain: data.chain || [],
                status: 'resolved',
                timestamp: new Date(),
                attempts: attempts
            };
        } else {
            dnsCache[key] = {
                domain: domain,
                qtype: qtype,
                ip: null,
                answer: null,
                chain: data.chain || [],
                status: 'failed',
                error: data.error || 'not found',
                timestamp: new Date(),
                attempts: attempts
            };
        }
        
        if (owner && owner.getId) {
            try {
                refreshDNSLookupModal(owner.getId());
            } catch(e) {
                // The lookup window is usually closed by the time a browse answer lands
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
        domain = normalizeDNSName(domain);
        return (domain in localtable) ? localtable[domain] : null;
    };

    this.getAppController = function()
    {
        var id = network.getPosForElement(owner);
        var result = "<div style='padding:10px;'>";
        
        // DNS Lookup input
        result += "<div style='margin-bottom:20px;'> \
        <label for='dnsclientdomain' style='display:block;margin-bottom:5px;color:#a0a0a0;'>"+_("Domain:")+"</label> \
        <div style='display:flex;gap:8px;'> \
        <input type='text' id='dnsclientdomain' style='flex:1 1 auto;width:auto;min-width:0;padding:8px;background:#2a2d3e;border:1px solid #667eea;border-radius:4px;color:#e4e4e7;' placeholder='example.com' /> \
        <select id='dnsclienttype' title='"+_("Record type")+"' style='flex:0 0 auto;width:auto;padding:8px;background:#2a2d3e;border:1px solid #667eea;border-radius:4px;color:#e4e4e7;'> \
        <option value='A'>A</option><option value='CNAME'>CNAME</option> \
        </select> \
        </div> \
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
            result += "<th style='text-align:left;padding:5px;'>Type</th>";
            result += "<th style='text-align:left;padding:5px;'>Answer</th>";
            result += "<th style='text-align:left;padding:5px;'>Status</th>";
            result += "<th style='text-align:left;padding:5px;'>Age</th>";
            result += "</tr></thead>";
            result += "<tbody>";
            
            for (var i = 0; i < cacheEntries.length; i++) {
                var entry = dnsCache[cacheEntries[i]];
                var domain = entry.domain || cacheEntries[i];
                // An alias answer shows the way it went: www.easton.com → easton.com → 67.12.241.4
                var shown = entry.answer || entry.ip || '-';
                if (entry.chain && entry.chain.length > 0 && entry.ip) {
                    shown = entry.chain.concat([entry.ip]).join(' \u2192 ');
                }
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
                result += "<td style='padding:5px;color:#a0a0a0;'>" + (entry.qtype || 'A') + "</td>";
                result += "<td style='padding:5px;color:#e0e0e0;'>" + shown + "</td>";
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
