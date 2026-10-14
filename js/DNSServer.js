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

function setupDNSServerConfig(id) 
{
    createBkDiv();
    createDNSServerConfigDiv(id);
}

function createDNSServerConfigDiv(id) 
{
    var host = network.getElement(id);
    var app = host.getApp("DNSServer");
    
    var headers = [_("Domain"), _("Type"), _("Value")];
    var data = app.getAppControllerData();
    var uidnstable = new UITable(headers, data, 'dnstable');
    uidnstable.setColumnOptions(1, DNS_RECORD_TYPES);
    uidnstable.setValidator(validateDNSRecordRow);
    
    var controls = '<input type="button" id="upload" value="'+_("Save")+'" onclick="saveDNSServerConfig(' + id + ',\'' + uidnstable.getId() + '\');" />\
  <input type="button" id="cancel" value="'+_("Cancel")+'" onclick="cancelDNSServerConfig(\'' + uidnstable.getId() + '\');" />';
    var w = new UIWindow('divdnsserverconfig', 'DNS Server', 560, 550, false, 1.0);
    w.setContent(app.getAppController());
    w.setControls(controls);
    w.render();
    uidnstable.render();
}

var DNS_RECORD_TYPES = ["A", "CNAME"];

// Names are case-insensitive in DNS, and "easton.com." is the same name as "easton.com"
function normalizeDNSName(name)
{
    if (name === null || name === undefined)
    {
        return "";
    }
    return String(name).trim().toLowerCase().replace(/\.$/, "");
}

function isIPv4Text(text)
{
    var parts = String(text).trim().split(".");
    if (parts.length !== 4)
    {
        return false;
    }
    for (var i = 0; i < parts.length; i++)
    {
        if (!/^\d{1,3}$/.test(parts[i]) || parseInt(parts[i], 10) > 255)
        {
            return false;
        }
    }
    return true;
}

function validateDNSRecordRow(row, data)
{
    var domain = normalizeDNSName(row[0]);
    var type = row[1];
    var value = String(row[2]).trim();
    
    if (domain === "" || /\s/.test(domain))
    {
        return _("Type a domain name with no spaces, like www.example.com.");
    }
    if (type === "A" && !isIPv4Text(value))
    {
        return _("An A record needs an IP address, like 192.168.1.10.");
    }
    if (type === "CNAME")
    {
        var target = normalizeDNSName(value);
        if (target === "" || /\s/.test(target) || isIPv4Text(target))
        {
            return _("A CNAME record points to another name, like easton.com, not to an IP address.");
        }
        if (target === domain)
        {
            return _("A CNAME record cannot point to itself.");
        }
    }
    
    for (var i = 0; i < data.length; i++)
    {
        if (normalizeDNSName(data[i][0]) !== domain)
        {
            continue;
        }
        // The real rule: a name that is an alias holds nothing else
        if (type === "CNAME" || data[i][1] === "CNAME")
        {
            return domain + _(" already has a record. A name with a CNAME can have no other record, so delete the old one first.");
        }
        if (data[i][1] === type)
        {
            return domain + _(" already has an A record. Delete it first to change the address.");
        }
    }
    return null;
}

function saveDNSServerConfig(id, uitableid) 
{
    var data = uitables[uitableid].getData();
    var host = network.getElement(id);
    var app = host.getApp("DNSServer");
    app.resetDNSTable();
    for (var i = 0; i < data.length; i++) 
    {
        app.addRecord(data[i][0], data[i][1], data[i][2]);
    }
    
    var fwderval = document.getElementById('forwarder').value;
    app.setForwarder(fwderval);
    
    uimanager.getWindow("divdnsserverconfig").dispose();
    removeBodyDiv('divbk');
    uitables[uitableid].dispose();
}

function cancelDNSServerConfig(uitableid) 
{
    uimanager.getWindow("divdnsserverconfig").dispose();
    removeBodyDiv('divbk');
    uitables[uitableid].dispose();
}

var DNSServer = function(ifacepos) 
{
    var owner = null;
    var ifacepos = ifacepos;
    var records = [];
    var forwarder = null;
    var forwarderQueue = [];
    var _self = this;
    var MAX_CNAME_HOPS = 8;
    
    this.save = function() 
    {
        var result = {};
        result.version = 2;
        result.id = this.getId();
        result.ifacepos = ifacepos;
        result.dnstable = [];
        result.forwarder = forwarder;
        for (var i = 0; i < records.length; i++) 
        {
            var data = {};
            data.domain = records[i].domain;
            data.type = records[i].type;
            data.value = records[i].value;
            // Version 1 readers only know domain + ip
            if (records[i].type === "A")
            {
                data.ip = records[i].value;
            }
            result.dnstable.push(data);
        }
        
        return result;
    };
    
    this.load = function(data) 
    {
        this.setForwarder(data.forwarder);
        
        for (var i = 0; i < data.dnstable.length; i++) 
        {
            var entry = data.dnstable[i];
            var value = (entry.value !== undefined) ? entry.value : entry.ip;
            this.addRecord(entry.domain, entry.type || "A", value);
        }
    };
    
    this.getId = function() 
    {
        return "DNSServer";
    };
    
    this.getPort = function() 
    {
        return port;
    };
    
    this.resetDNSTable = function() 
    {
        records = [];
    };
    
    this.addRecord = function(domain, type, value)
    {
        domain = normalizeDNSName(domain);
        value = (type === "CNAME") ? normalizeDNSName(value) : String(value).trim();
        if (domain === "" || value === "")
        {
            return;
        }
        // One A record per name, as before: a second one replaces the first
        for (var i = 0; i < records.length; i++)
        {
            if (records[i].domain === domain && records[i].type === type)
            {
                records[i].value = value;
                return;
            }
        }
        records.push({domain: domain, type: type, value: value});
    };
    
    this.setEntry = function(domain, ip) 
    {
        this.addRecord(domain, "A", ip);
    };
    
    this.deleteDNSEntry = function(domain) 
    {
        domain = normalizeDNSName(domain);
        records = records.filter(function(r) { return r.domain !== domain; });
    };
    
    function findRecord(domain, type)
    {
        for (var i = 0; i < records.length; i++)
        {
            if (records[i].domain === domain && records[i].type === type)
            {
                return records[i];
            }
        }
        return null;
    }
    
    function hasName(domain)
    {
        for (var i = 0; i < records.length; i++)
        {
            if (records[i].domain === domain)
            {
                return true;
            }
        }
        return false;
    }
    
    // Follows CNAMEs on this server only. Returns status answer, nodata, unknown (ask
    // the forwarder about result.name) or loop, with every name passed on the way in chain.
    function resolve(domain, qtype, chain)
    {
        var current = normalizeDNSName(domain);
        chain = chain ? chain.slice() : [];
        
        if (qtype === "CNAME")
        {
            var alias = findRecord(current, "CNAME");
            if (alias !== null)
            {
                return {status: "answer", answer: alias.value, chain: chain};
            }
            return {status: hasName(current) ? "nodata" : "unknown", name: current, chain: chain};
        }
        
        for (var hops = 0; hops <= MAX_CNAME_HOPS; hops++)
        {
            var a = findRecord(current, "A");
            if (a !== null)
            {
                return {status: "answer", ip: a.value, chain: chain};
            }
            var c = findRecord(current, "CNAME");
            if (c === null)
            {
                return {status: hasName(current) ? "nodata" : "unknown", name: current, chain: chain};
            }
            if (c.value === normalizeDNSName(domain) || chain.indexOf(c.value) !== -1)
            {
                return {status: "loop", chain: chain.concat([c.value])};
            }
            chain.push(c.value);
            current = c.value;
        }
        return {status: "loop", chain: chain};
    }
    
    // "Response: 67.12.241.4", or with aliases "Response: www.easton.com → easton.com → 67.12.241.4"
    function describe(prefix, data)
    {
        if (data.error)
        {
            return prefix + data.error;
        }
        if (data.answer)
        {
            return prefix + "CNAME " + data.answer;
        }
        if (data.chain && data.chain.length > 0)
        {
            return prefix + [data.domain].concat(data.chain, [data.ip]).join(" → ");
        }
        return prefix + data.ip;
    }
    
    function fillAnswer(data, result)
    {
        data.chain = result.chain;
        data.ip = null;
        data.answer = null;
        if (result.status === "answer")
        {
            data.ip = result.ip || null;
            data.answer = result.answer || null;
        }
        else if (result.status === "loop")
        {
            data.error = "CNAME loop";
        }
        else if (result.status === "nodata")
        {
            data.error = "no " + data.qtype + " record";
        }
        else
        {
            data.error = "not found";
        }
    }
    
    function sendAnswer(dstIP, dstPort, data)
    {
        var response = new Message(
        "tcp", 
        owner.getConnectable().getIPInfo(ifacepos).getIPv4(), 
        dstIP, 
        owner.getConnectable().getMAC(ifacepos), 
        owner.getConnectable().getDstMAC(dstIP), 
        53, 
        dstPort, 
        data, 
        images[IMAGE_ENVELOPEDNS]
        );
        owner.getConnectable().getConnector(ifacepos).send(response);
    }
    
    // Asks the forwarder about name; the answer comes back through proccessResponseForward
    function forwardLookup(message, name, qtype, chain, replyType) 
    {
        var MAC = owner.getConnectable().getDstMAC(forwarder);
        if (MAC === null) 
        {
            return false;
        }
        var data = {};
        data.domain = name;
        data.qtype = qtype;
        data.type = "lookup_forward";
        data.description = "Lookup Fwd: " + name + (qtype === "A" ? "" : " (" + qtype + ")");
        data.originId = message.getId();

        var request = new Message(
        "tcp", 
        owner.getConnectable().getIPInfo(ifacepos).getIPv4(), 
        forwarder, 
        owner.getConnectable().getMAC(ifacepos), 
        MAC, 
        getDinamycPort(), 
        53, 
        data, images[IMAGE_ENVELOPEDNS]
        );

        forwarderQueue[request.getId()] = {
            domain: message.getData().domain,
            qtype: qtype,
            chain: chain,
            replyType: replyType,
            ip: message.getOriginIP(),
            port: message.getOrigPort(),
            originId: message.getId()
        };
        
        owner.getConnectable().getTrafficManager().registerApplication(_self, request.getOrigPort(), false);
        owner.getConnectable().getConnector(ifacepos).send(request);
        return true;
    }
    
    function proccessLookup(message, replyType) 
    {
        var qtype = message.getData().qtype || "A";
        var result = resolve(message.getData().domain, qtype);
        
        if (result.status === "unknown" && forwarder !== null) 
        {
            if (forwardLookup(message, result.name, qtype, result.chain, replyType))
            {
                return;
            }
            result.status = "unreachable";
        }
        
        var data = {};
        data.domain = message.getData().domain;
        data.qtype = qtype;
        data.type = replyType;
        if (replyType === "response_forward")
        {
            data.originId = message.getId();
        }
        fillAnswer(data, result);
        if (result.status === "unreachable")
        {
            data.error = "forwarder unreachable";
        }
        data.description = describe(replyType === "response" ? "Response: " : "Response Fwd: ", data);
        sendAnswer(message.getOriginIP(), message.getOrigPort(), data);
    }
    
    function proccessResponseForward(message) 
    {
        var pending = forwarderQueue[message.getData().originId];
        if (!pending) 
        {
            return;
        }
        delete forwarderQueue[message.getData().originId];
        
        var upstream = message.getData();
        var data = {};
        data.domain = pending.domain;
        data.qtype = pending.qtype;
        data.type = pending.replyType;
        if (pending.replyType === "response_forward")
        {
            data.originId = pending.originId;
        }
        data.chain = pending.chain.concat(upstream.chain || []);
        data.ip = upstream.ip || null;
        data.answer = upstream.answer || null;
        if (data.ip === null && data.answer === null)
        {
            data.error = upstream.error || "not found";
        }
        data.description = describe(pending.replyType === "response" ? "Response: " : "Response Fwd: ", data);
        sendAnswer(pending.ip, pending.port, data);
    }
    
    this.receiveMessage = function(message) 
    {
        if ((message.getData().type === "lookup") && (message.getData().domain)) 
        {
            proccessLookup(message, "response");
        } 
        else if ((message.getData().type === "lookup_forward") && (message.getData().domain)) 
        {
            proccessLookup(message, "response_forward");
        } 
        else if ((message.getData().type === "response_forward")) 
        {
            proccessResponseForward(message);
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
    
    this.getAppController = function()
    {
        var id = network.getPosForElement(owner);
        result = "<div style='padding:20px;'>";

        // Help header
        result += "<div style='margin-bottom:20px; padding:15px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:8px;'>";
        result += "<h4 style='margin:0 0 8px 0; color:white; font-weight:600;'>🌐 DNS Server Configuration <span class='help-icon' onclick=\"showHelp('dns_overview')\">?</span></h4>";
        result += "<p style='margin:0; font-size:12px; color:#e4e4f7;'>Map domain names to IP addresses</p>";
        result += "</div>";

        result += "<div style='margin-bottom:15px; padding:12px; background:#16213e; border-left:3px solid #667eea; border-radius:4px;'>";
        result += "<p style='margin:0; font-size:12px; color:#9ca3af;'><strong>DNS Records:</strong> " + _("A maps a name to an IP address. CNAME makes a name an alias of another name.") + "</p>";
        result += "<p style='margin:5px 0 0 0; font-size:11px; color:#6b7280;'>" + _("Example: easton.com A 67.12.241.4, then www.easton.com CNAME easton.com") + "</p>";
        result += "</div>";

        result += "<table id='dnstable' style='font-size:0.8em;'></table>";

        result += "<div style='margin-top:20px;'>";
        result += "<label for='forwarder' style='display:block; margin-bottom:5px;'>"+_("DNS Forwarder:")+"</label>";
        var fwderval = (forwarder === null) ? "" : forwarder;
        result += "<input type='text' id='forwarder' value='" + fwderval + "' style='width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;' />";
        result += "<p style='font-size:11px; color:#6b7280; margin:5px 0 0 0;'>Forward unknown domains to this DNS server</p>";
        result += "</div>";
        result += "</div>";

        return result;
    };
    
    this.getMenuEntries = function() 
    {
        var data = [];
        data[0] = {};
        data[0].img = 'img/64/envelope-DNS.png';
        data[0].text = 'DNS server config';
        data[0].js = 'setupDNSServerConfig(' + owner.id + ');';
        
        return data;
    };
    
    this.getAppControllerData = function() 
    {
        var result = [];
        
        for (var i = 0; i < records.length; i++) 
        {
            result.push([records[i].domain, records[i].type, records[i].value]);
        }
        
        return result;
    };
    
    // An empty box means no forwarder; "" used to count as one and left lookups pending forever
    this.setForwarder = function(fwder) 
    {
        if (fwder === null || fwder === undefined || String(fwder).trim() === "")
        {
            forwarder = null;
            return;
        }
        forwarder = String(fwder).trim();
    };
    
    this.getAppDescription = function()
    {
        return "DNS Server";
    };};
