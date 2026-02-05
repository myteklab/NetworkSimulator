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

// Server Status UI Function
function viewServerStatus(id)
{
    var host = network.getElement(id);
    if (!host || !host.serverResources) {
        alert("This device does not have server resources");
        return;
    }
    
    createBkDiv();
    
    var innerHTML = '<div style="padding:20px;">';
    innerHTML += '<h3 style="color:#667eea; margin-bottom:20px;">📊 Server Resource Monitor</h3>';
    innerHTML += host.serverResources.getResourceHTML();
    innerHTML += '</div>';
    
    var controls = '<button onclick="resetServerResources(' + id + ')" style="background:#ef4444; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Reset Resources</button>';
    controls += '<button onclick="refreshServerStatus(' + id + ')" style="background:#667eea; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Refresh</button>';
    controls += '<button onclick="closeServerStatus()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Close</button>';
    
    var w = new UIWindow('divserverstatus', 'Server Status - ' + host.getName(), 450, 500, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
    
    // Auto-refresh every second while window is open
    window.serverStatusInterval = setInterval(function() {
        var statusWindow = uimanager.getWindow('divserverstatus');
        if (statusWindow && host.serverResources) {
            var content = '<div style="padding:20px;">';
            content += '<h3 style="color:#667eea; margin-bottom:20px;">📊 Server Resource Monitor</h3>';
            content += host.serverResources.getResourceHTML();
            content += '</div>';
            statusWindow.setContent(content);
        } else {
            clearInterval(window.serverStatusInterval);
        }
    }, 1000);
}

function resetServerResources(id)
{
    var host = network.getElement(id);
    if (host && host.serverResources) {
        host.serverResources.reset();
        refreshServerStatus(id);
    }
}

function refreshServerStatus(id)
{
    // Just refresh the display
    var statusWindow = uimanager.getWindow('divserverstatus');
    if (statusWindow) {
        var host = network.getElement(id);
        if (host && host.serverResources) {
            var content = '<div style="padding:20px;">';
            content += '<h3 style="color:#667eea; margin-bottom:20px;">📊 Server Resource Monitor</h3>';
            content += host.serverResources.getResourceHTML();
            content += '</div>';
            statusWindow.setContent(content);
        }
    }
}

function closeServerStatus()
{
    if (window.serverStatusInterval) {
        clearInterval(window.serverStatusInterval);
    }
    var w = uimanager.getWindow('divserverstatus');
    if (w) w.dispose();
    removeBodyDiv('divbk');
}

// ARP Table UI Functions
function viewARPTable(id)
{
    createBkDiv();
    createARPTableDiv(id);
}

function createARPTableDiv(id)
{
    var host = network.getElement(id);
    var arpTable = host.getARPTable();
    
    if (!arpTable) {
        alert("This device does not have an ARP table");
        removeBodyDiv('divbk');
        return;
    }
    
    var innerHTML = '<div style="max-height:300px; overflow-y:auto;">';
    innerHTML += arpTable.getHTMLTable();
    innerHTML += '</div>';
    innerHTML += '<div style="margin-top:20px; padding:15px; background:#16213e; border:1px solid #2a2d3a; border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#667eea;">ARP Cache Information</h4>';
    innerHTML += '<p style="margin:5px 0; font-size:12px; color:#9ca3af;">• Dynamic entries expire after 5 minutes</p>';
    innerHTML += '<p style="margin:5px 0; font-size:12px; color:#9ca3af;">• Static entries never expire</p>';
    innerHTML += '<p style="margin:5px 0; font-size:12px; color:#9ca3af;">• Cache size: ' + arpTable.size() + ' / 100 entries</p>';
    innerHTML += '<p style="margin:5px 0; font-size:12px; color:#9ca3af;">• MAC addresses shown for all interfaces</p>';
    innerHTML += '</div>';
    
    // Add interface MAC addresses display
    innerHTML += '<div style="margin-top:15px; padding:15px; background:#16213e; border:1px solid #2a2d3a; border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#667eea;">This Device\'s MAC Addresses</h4>';
    for (var i = 0; i < host.getConnectable().getConnectorNumber(); i++) {
        var mac = host.getConnectable().getMAC(i);
        var ipInfo = host.getConnectable().getIPInfo(i);
        var ip = ipInfo ? ipInfo.getIPv4() : null;
        innerHTML += '<p style="margin:5px 0; font-size:12px; font-family:monospace; color:#e4e4e7;">';
        innerHTML += 'Interface ' + i + ': ' + (mac || 'No MAC') + ' (' + (ip || 'No IP') + ')';
        innerHTML += '</p>';
    }
    innerHTML += '</div>';
    
    var controls = '<button onclick="showAddStaticARPEntry(' + id + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Add Static Entry</button>';
    controls += '<button onclick="clearARPCache(' + id + ')" style="background:#ef4444; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Clear Dynamic</button>';
    controls += '<button onclick="refreshARPTable(' + id + ')" style="background:#667eea; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Refresh</button>';
    controls += '<button onclick="closeARPTable()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Close</button>';
    
    var w = new UIWindow('divarpttable', 'ARP Cache - ' + host.getName(), 600, 550, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function clearARPCache(id)
{
    var host = network.getElement(id);
    var arpTable = host.getARPTable();
    if (arpTable) {
        if (confirm("Clear all dynamic ARP entries?")) {
            arpTable.clearDynamic();
            // Refresh the display
            uimanager.getWindow("divarpttable").dispose();
            createARPTableDiv(id);
        }
    }
}

function refreshARPTable(id)
{
    // Just refresh the display
    uimanager.getWindow("divarpttable").dispose();
    createARPTableDiv(id);
}

function closeARPTable()
{
    uimanager.getWindow("divarpttable").dispose();
    removeBodyDiv('divbk');
}

function showAddStaticARPEntry(id)
{
    var host = network.getElement(id);
    var arpTable = host.getARPTable();
    
    if (!arpTable) {
        alert("This device does not have an ARP table");
        return;
    }
    
    // Close the ARP table window temporarily
    uimanager.getWindow("divarpttable").dispose();
    
    var innerHTML = '<div style="padding:20px;">';
    innerHTML += '<h4 style="margin:0 0 20px 0; color:#667eea;">Add Static ARP Entry</h4>';
    innerHTML += '<p style="margin:10px 0; font-size:13px; color:#666;">Static entries never expire and must be manually removed.</p>';
    innerHTML += '<div style="margin:20px 0;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:600; color:#333;">IP Address:</label>';
    innerHTML += '<input type="text" id="staticArpIp" placeholder="e.g., 192.168.1.100" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px; font-size:14px;">';
    innerHTML += '</div>';
    innerHTML += '<div style="margin:20px 0;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:600; color:#333;">MAC Address:</label>';
    innerHTML += '<input type="text" id="staticArpMac" placeholder="e.g., AA:BB:CC:DD:EE:FF" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px; font-size:14px; font-family:monospace; text-transform:uppercase;">';
    innerHTML += '</div>';
    innerHTML += '<div style="padding:15px; background:#f0fdf4; border-radius:8px; margin-top:20px;">';
    innerHTML += '<p style="margin:0; font-size:12px; color:#166534;"><strong>Note:</strong> Static entries are useful for critical network devices like gateways or servers that should always be reachable.</p>';
    innerHTML += '</div>';
    innerHTML += '</div>';
    
    var controls = '<button onclick="addStaticARPEntry(' + id + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Add Entry</button>';
    controls += '<button onclick="cancelAddStaticARP(' + id + ')" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Cancel</button>';
    
    var w = new UIWindow('divaddstaticarp', 'Add Static ARP Entry', 450, 400, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function addStaticARPEntry(id)
{
    var host = network.getElement(id);
    var arpTable = host.getARPTable();
    
    var ip = document.getElementById('staticArpIp').value.trim();
    var mac = document.getElementById('staticArpMac').value.trim().toUpperCase();
    
    // Basic validation
    if (!ip || !mac) {
        alert('Please enter both IP and MAC addresses');
        return;
    }
    
    // Validate IP format (basic check)
    var ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) {
        alert('Invalid IP address format');
        return;
    }
    
    // Validate MAC format (basic check)
    var macRegex = /^([0-9A-F]{2}:){5}[0-9A-F]{2}$/;
    if (!macRegex.test(mac)) {
        alert('Invalid MAC address format. Use format: AA:BB:CC:DD:EE:FF');
        return;
    }
    
    // Add the static entry
    arpTable.addEntry(ip, mac, 'static');
    
    // Close the add dialog
    uimanager.getWindow("divaddstaticarp").dispose();
    
    // Reopen the ARP table view
    createARPTableDiv(id);
}

function cancelAddStaticARP(id)
{
    // Close the add dialog
    uimanager.getWindow("divaddstaticarp").dispose();
    
    // Reopen the ARP table view
    createARPTableDiv(id);
}

function editNameGroup(id)
{
    createBkDiv();
    createNameGroupDiv(id);    
}

function configureDHCPRelay(id)
{
    var host = network.getElement(id);
    if (!host) return;

    createBkDiv();

    var isEnabled = host.isDHCPRelayEnabled ? host.isDHCPRelayEnabled() : false;
    var relayIP = host.getDHCPRelayIP ? host.getDHCPRelayIP() : '';

    var html = '<div style="padding:20px; color:#e2e8f0;">';
    html += '<h3 style="color:#667eea; margin-bottom:15px;">📡 DHCP Relay Configuration</h3>';
    html += '<p style="margin-bottom:15px; color:#94a3b8;">DHCP Relay (IP Helper) forwards DHCP broadcasts across VLANs to a centralized DHCP server.</p>';

    html += '<div style="background:rgba(59,130,246,0.1); border-left:3px solid #3b82f6; padding:12px; margin-bottom:15px; border-radius:4px;">';
    html += '<p style="color:#93c5fd; font-size:13px; margin:0;"><strong>🎓 Educational Note:</strong></p>';
    html += '<p style="color:#cbd5e1; font-size:12px; margin:5px 0 0 0;">In enterprise networks, one DHCP server manages multiple VLANs. Routers relay DHCP requests using the GIADDR field to identify which subnet the client is on.</p>';
    html += '</div>';

    // Enable checkbox
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="display:flex; align-items:center; cursor:pointer;">';
    html += '<input type="checkbox" id="dhcpRelayEnabled" ' + (isEnabled ? 'checked' : '') + ' style="margin-right:8px;">';
    html += '<span>Enable DHCP Relay</span>';
    html += '</label>';
    html += '</div>';

    // DHCP Server IP input
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="display:block; margin-bottom:5px; color:#cbd5e1;">DHCP Server IP Address:</label>';
    html += '<input type="text" id="dhcpRelayIP" value="' + (relayIP || '') + '" ';
    html += 'placeholder="e.g., 192.168.99.10" ';
    html += 'style="width:100%; padding:8px; background:#1e293b; border:1px solid #475569; border-radius:4px; color:#e2e8f0;">';
    html += '<p style="color:#94a3b8; font-size:12px; margin:5px 0 0 0;">IP address of the DHCP server to relay requests to</p>';
    html += '</div>';

    html += '<div style="background:rgba(251,191,36,0.1); border-left:3px solid #fbbf24; padding:10px; border-radius:4px; margin-top:15px;">';
    html += '<p style="color:#fcd34d; font-size:12px; margin:0;"><strong>⚠️ Note:</strong> DHCP relay only works for DHCP broadcasts received on router interfaces. The DHCP server must be reachable via routing.</p>';
    html += '</div>';

    html += '</div>';

    var controls = '<button onclick="saveDHCPRelay(' + id + ')" style="background:#667eea; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Save</button>';
    controls += '<button onclick="cancelDHCPRelay()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Cancel</button>';

    var w = new UIWindow('divdhcprelay', 'DHCP Relay Configuration', 550, 450, false, 1.0);
    w.setContent(html);
    w.setControls(controls);
    w.render();
}

function saveDHCPRelay(id)
{
    var host = network.getElement(id);
    if (!host) return;

    var enabled = document.getElementById('dhcpRelayEnabled').checked;
    var relayIP = document.getElementById('dhcpRelayIP').value.trim();

    // Validate IP if enabled
    if (enabled && !relayIP) {
        alert('Please enter a DHCP server IP address');
        return;
    }

    if (enabled && relayIP) {
        // Basic IP validation
        var ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipPattern.test(relayIP)) {
            alert('Invalid IP address format');
            return;
        }
    }

    host.setDHCPRelayEnabled(enabled);
    host.setDHCPRelayIP(enabled ? relayIP : null);

    var w = uimanager.getWindow('divdhcprelay');
    if (w) w.dispose();
    removeBodyDiv('divbk');

    // Show success message
    var message = enabled ?
        'DHCP Relay enabled. Requests will be forwarded to ' + relayIP :
        'DHCP Relay disabled';

    setTimeout(function() {
        alert(message);
    }, 100);
}

function cancelDHCPRelay()
{
    var w = uimanager.getWindow('divdhcprelay');
    if (w) w.dispose();
    removeBodyDiv('divbk');
}

function configureNetworkInterface(id)
{
    createBkDiv();
    createNetworkInterfaceDiv(id);
}

function createNetworkInterfaceDiv(id)
{
    var host = network.getElement(id);
    
    var innerHTML = '<div style="color:#e4e4e7;">';
    innerHTML += '<h3 style="margin-top:0;color:#e4e4e7;">Network Interface Configuration</h3>';
    
    // Device info
    innerHTML += '<div style="margin-bottom:20px;padding:15px;background:#2a2d3e;border:1px solid #3a3d4e;border-radius:8px;">';
    innerHTML += '<p style="margin:5px 0;color:#e4e4e7;"><strong>Device:</strong> ' + host.getName() + '</p>';
    innerHTML += '<p style="margin:5px 0;color:#e4e4e7;"><strong>Type:</strong> ' + host.getDeviceType() + '</p>';
    innerHTML += '</div>';
    
    // Connection type selector
    innerHTML += '<div style="margin-bottom:20px;padding:15px;background:#2a2d3e;border:1px solid #3a3d4e;border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 15px 0;color:#9ca3af;">Select Connection Type</h4>';
    
    var currentConnection = host.getConnectionType();
    var hasWiFi = host.getHasWiFi();
    var hasEthernet = host.getHasEthernet();
    
    if (hasEthernet) {
        innerHTML += '<label style="display:block;margin-bottom:10px;cursor:pointer;color:#e4e4e7;">';
        innerHTML += '<input type="radio" name="conntype" value="ethernet" ' + 
                     (currentConnection === 'ethernet' ? 'checked' : '') + 
                     ' style="margin-right:10px;">';
        innerHTML += '🔌 <strong style="color:#e4e4e7;">Ethernet</strong> <span style="color:#9ca3af;">- Wired connection (faster, more stable)</span>';
        innerHTML += '</label>';
    }
    
    if (hasWiFi) {
        innerHTML += '<label style="display:block;margin-bottom:10px;cursor:pointer;color:#e4e4e7;">';
        innerHTML += '<input type="radio" name="conntype" value="wifi" ' + 
                     (currentConnection === 'wifi' ? 'checked' : '') + 
                     ' style="margin-right:10px;">';
        innerHTML += '📶 <strong style="color:#e4e4e7;">WiFi</strong> <span style="color:#9ca3af;">- Wireless connection (more flexible)</span>';
        innerHTML += '</label>';
    }
    
    innerHTML += '</div>';
    
    // Connection status
    innerHTML += '<div style="padding:15px;background:#16213e;border:1px solid #10b981;border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0;color:#10b981;">Current Status</h4>';
    innerHTML += '<p style="margin:5px 0;font-size:12px;color:#e4e4e7;">Connection Type: <strong>' + 
                 currentConnection.charAt(0).toUpperCase() + currentConnection.slice(1) + '</strong></p>';
    
    // Show IP info if connected
    var ipInfo = host.getConnectable().getIPInfo(0);
    if (ipInfo && ipInfo.getIPv4()) {
        innerHTML += '<p style="margin:5px 0;font-size:12px;color:#e4e4e7;">IP Address: <strong>' + ipInfo.getIPv4() + '</strong></p>';
        innerHTML += '<p style="margin:5px 0;font-size:12px;color:#e4e4e7;">Subnet Mask: <strong>' + (ipInfo.getNetmask() || 'Not set') + '</strong></p>';
    } else {
        innerHTML += '<p style="margin:5px 0;font-size:12px;color:#9ca3af;">No IP address assigned</p>';
    }
    
    innerHTML += '</div>';
    
    // WiFi-specific settings (future expansion)
    if (hasWiFi) {
        innerHTML += '<div style="margin-top:20px;padding:15px;background:#1a1d2e;border:1px solid #0284c7;border-radius:8px;">';
        innerHTML += '<h4 style="margin:0 0 10px 0;color:#0284c7;">WiFi Settings</h4>';
        innerHTML += '<p style="margin:5px 0;font-size:12px;color:#9ca3af;">📡 WiFi access points coming soon!</p>';
        innerHTML += '<p style="margin:5px 0;font-size:12px;color:#9ca3af;">• SSID selection</p>';
        innerHTML += '<p style="margin:5px 0;font-size:12px;color:#9ca3af;">• Signal strength</p>';
        innerHTML += '<p style="margin:5px 0;font-size:12px;color:#9ca3af;">• Security settings</p>';
        innerHTML += '</div>';
    }
    
    innerHTML += '</div>';
    
    var controls = '<button onclick="saveNetworkInterface(' + id + ')" style="background:#10b981;color:white;padding:8px 16px;border:none;border-radius:6px;margin-right:10px;cursor:pointer;">Apply</button>';
    controls += '<button onclick="cancelNetworkInterface()" style="background:#6b7280;color:white;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;">Cancel</button>';
    
    var w = new UIWindow('divnetworkinterface', 'Network Interface - ' + host.getName(), 500, 550, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function saveNetworkInterface(id)
{
    var host = network.getElement(id);
    var selectedType = document.querySelector('input[name="conntype"]:checked');
    
    if (selectedType) {
        host.setConnectionType(selectedType.value);
        
        // Show feedback
        var message = selectedType.value === 'wifi' ? 
                      'Switched to WiFi connection' : 
                      'Switched to Ethernet connection';
        
        // Update the display briefly to show the change
        var statusDiv = document.createElement('div');
        statusDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#10b981;color:white;padding:15px 25px;border-radius:8px;font-weight:bold;z-index:10000;';
        statusDiv.textContent = '✓ ' + message;
        document.body.appendChild(statusDiv);
        
        setTimeout(function() {
            document.body.removeChild(statusDiv);
        }, 2000);
    }
    
    uimanager.getWindow("divnetworkinterface").dispose();
    removeBodyDiv('divbk');
}

function cancelNetworkInterface()
{
    uimanager.getWindow("divnetworkinterface").dispose();
    removeBodyDiv('divbk');
}

function createNameGroupDiv(id)
{
    var host = network.getElement(id);
    /*var div = document.createElement("div");
    var l = window.innerWidth / 2 - 200;
    var t = window.innerHeight / 2 - 200;
    
    div.setAttribute('style', 'position:absolute;top:' + t + 'px;left:' + l + 'px;z-index:110;background-color:white;width:700px;height:400px;border-radius:10px;border:1px solid;padding:10px;text-align:center;');
    div.setAttribute('id', 'divnamegroup');*/
    var innerHTML = '<p>';
    innerHTML += '<label for="nametxt">'+_("Name:")+'</label>';
    innerHTML += '<input type="text" id="nametxt" value="'+ ((host.getName() === null)?"":host.getName()) +'" /><br/>';
    innerHTML += '<label for="grouptxt">'+_("Group:")+'</label>';
    innerHTML += '<input type="text" id="grouptxt" value="'+ ((host.getGroup() === null)?"":host.getGroup()) +'" />';
    innerHTML += '</p>';
    var controls = '<p>\
  <input type="button" id="save" value="'+_("Save")+'" onclick="saveNameGroup('+id+');" />\
  <input type="button" id="cancel" value="'+_("Exit")+'" onclick="cancelNameGroup();" />\
  </p>';
    /*div.innerHTML = innerHTML;
    document.body.appendChild(div);*/
    var w = new UIWindow('divnamegroup', _('Edit name / group'), 400, 280, false, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function cancelNameGroup()
{
    uimanager.getWindow("divnamegroup").dispose();
    removeBodyDiv('divbk');    
}

function saveNameGroup(id)
{
    var host = network.getElement(id);
    var name = document.getElementById("nametxt").value;
    var group = document.getElementById("grouptxt").value;
    group = (group === "")?null:group;
    host.setName(name);
    host.setGroup(group);
    uimanager.getWindow("divnamegroup").dispose();
    removeBodyDiv('divbk');    
}

function networkDiagnostics(id)
{
    createBkDiv();
    createDiagnosticsDiv(id);    
}

function createDiagnosticsDiv(id)
{
    var host = network.getElement(id);
    var div = document.createElement("div");
    /*var l = window.innerWidth / 2 - 200;
    var t = window.innerHeight / 2 - 200;
    
    div.setAttribute('style', 'position:absolute;top:' + t + 'px;left:' + l + 'px;z-index:110;background-color:white;width:700px;height:400px;border-radius:10px;border:1px solid;padding:10px;text-align:center;opacity:0.5;');
    div.setAttribute('id', 'divdiagnostics');*/
    var innerHTML = '<div style="color:#e4e4e7;">';
    innerHTML += '<p style="margin-bottom:15px;">';
    innerHTML += '<label style="color:#9ca3af;margin-right:10px;">Interface:</label>';
    innerHTML += '<select id="ifacepos" style="padding:6px;background:#2a2d3e;color:#e4e4e7;border:1px solid #3a3d4e;border-radius:4px;margin-right:10px;">';
    for (var i = 0; i < host.getConnectable().getConnectorNumber(); i++)
    {
        innerHTML += '<option value="'+ i +'">' + host.getConnectorDesc(i) + "</option>";
    }
    innerHTML += '</select>';
    innerHTML += '<input type="text" id="diagnosticstxt" placeholder="Enter IP address or hostname" style="padding:6px;background:#2a2d3e;color:#e4e4e7;border:1px solid #3a3d4e;border-radius:4px;width:200px;" />';
    innerHTML += '</p>';
    innerHTML += '<p style="margin-bottom:15px;">';
    innerHTML += '<input type="button" id="ping" value="📍 Ping" onclick="diagnosticsPing('+id+')" style="padding:8px 12px;background:#10b981;color:white;border:none;border-radius:4px;margin-right:8px;cursor:pointer;font-weight:500;" />';
    innerHTML += '<input type="button" id="traceroute" value="🗺️ Trace Route" onclick="diagnosticsTraceroute('+id+')" style="padding:8px 12px;background:#3b82f6;color:white;border:none;border-radius:4px;margin-right:8px;cursor:pointer;font-weight:500;" />';
    innerHTML += '<input type="button" id="arp" value="🔗 ARP" onclick="diagnosticsARP('+id+')" style="padding:8px 12px;background:#8b5cf6;color:white;border:none;border-radius:4px;cursor:pointer;font-weight:500;" />';
    innerHTML += '</p>';
    innerHTML += '<div style="width:100%;height:250px;text-align:left;font-size:12px;font-family:monospace;overflow-y:scroll;background:#16213e;border:1px solid #3a3d4e;border-radius:6px;padding:10px;color:#e4e4e7;line-height:1.4;" id="diagnosticsconsole" >';
    innerHTML += host.getConnectable().getTrafficManager().getDiagnosticsInfo();
    innerHTML += '</div>';
    innerHTML += '</div>';
    var controls = '<input type="button" id="cancel" value="'+_("Exit")+'" onclick="cancelDiagnostics();" style="padding:8px 16px;background:#6b7280;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:500;" />';
    /*div.innerHTML = innerHTML;
    document.body.appendChild(div);*/
    var window = new UIWindow('divdiagnostics','Network diagnostics',400,400,false,1.0);
    window.setContent(innerHTML);
    window.setControls(controls);
    window.render();
}

function diagnosticsPing(id)
{
    var host = network.getElement(id);
    var dst = document.getElementById("diagnosticstxt").value;
    var ifacepos = document.getElementById("ifacepos").value;
    host.getConnectable().getTrafficManager().ping(dst, ifacepos);
}

function diagnosticsTraceroute(id)
{
    var host = network.getElement(id);
    var dst = document.getElementById("diagnosticstxt").value;
    var ifacepos = document.getElementById("ifacepos").value;
    host.getConnectable().getTrafficManager().traceroute(dst, ifacepos);
}

function diagnosticsARP(id)
{
    var host = network.getElement(id);
    var param = document.getElementById("diagnosticstxt").value.trim();
    
    // Check if host has ARP table
    if (!host.getARPTable) {
        host.getConnectable().getTrafficManager().addDiagnosticInfo("This device does not support ARP");
        return;
    }
    
    var arpTable = host.getARPTable();
    if (!arpTable) {
        host.getConnectable().getTrafficManager().addDiagnosticInfo("ARP table not available");
        return;
    }
    
    // Handle different ARP command parameters
    if (!param || param === '-a' || param === '-n') {
        // Show all ARP entries (like 'arp -a' or 'arp -n')
        host.getConnectable().getTrafficManager().showARPTable(arpTable);
    } else if (param === '-d' || param === '--delete') {
        // Clear dynamic entries
        host.getConnectable().getTrafficManager().clearARPDynamic(arpTable);
    } else if (param.indexOf('.') > -1) {
        // Assume it's an IP address - look it up
        host.getConnectable().getTrafficManager().lookupARP(arpTable, param);
    } else {
        // Show help
        host.getConnectable().getTrafficManager().showARPHelp();
    }
}

function cancelDiagnostics()
{
    removeBodyDiv('divbk');    
    uimanager.getWindow("divdiagnostics").dispose();
}

function editNATTable(id) 
{
    createBkDiv();
    createNATDiv(id);
}

function createNATDiv(id) 
{
    var host = network.getElement(id);
    var div = document.createElement("div");
    /*var l = window.innerWidth / 2 - 350;
    var t = window.innerHeight / 2 - 200;*/
    
    var headers = [_("Input interface"),_("WAN Port"),_("LAN Port"),_("IP")];
    var data = host.getConnectable().getTrafficManager().getNATData();
    var uinattable = new UITable(headers,data,'nattable');
    
    /*div.setAttribute('style', 'position:absolute;top:' + t + 'px;left:' + l + 'px;z-index:110;background-color:white;width:700px;height:400px;border-radius:10px;border:1px solid;padding:10px;text-align:center;');
    div.setAttribute('id', 'divnatconfig');*/
    var innerHTML = "";
    if (host.getType() === "router")
    {
        var chktxt = (host.getConnectable().getPerformNAT()?"checked='checked'":"");
        innerHTML += "<p>";
        innerHTML += "<input type='checkbox' id='performNAT' "+chktxt+" />";
        innerHTML += "<label for='performNAT'>"+_("Gateway mode (uses NAT).")+"</label>";
        innerHTML += "</p>";
    }
    innerHTML += '<table id="nattable" style="font-size:0.8em;width:100%;"></table>';
    var controls = '<p>\
  <input type="button" id="upload" value="'+_("Save")+'" onclick="saveNATConfig(' + id + ',\''+uinattable.getId()+'\');" />\
  <input type="button" id="cancel" value="'+_("Cancel")+'" onclick="cancelNATConfig(\''+uinattable.getId()+'\');" />\
  </p>';
    /*div.innerHTML = innerHTML;
    document.body.appendChild(div);*/
    var w = new UIWindow('divnatconfig', 'Edit NAT', 700, 400, false, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
    uinattable.render();
}

function cancelNATConfig(uitableid) 
{
    uimanager.getWindow("divnatconfig").dispose();
    removeBodyDiv('divbk');
    uitables[uitableid].dispose();
}

function saveNATConfig(id, uitableid) 
{
    var host = network.getElement(id);
    host.getConnectable().getTrafficManager().removeFixedNATData();
    var data = uitables[uitableid].getData();
    for (var i = 0; i < data.length; i++)
    {
        host.getConnectable().getTrafficManager().addNATEntry(data[i][2],data[i][1],data[i][3],data[i][0],true);
    }
    var performNAT = document.getElementById("performNAT");
    if (performNAT !== null)
    {
        host.getConnectable().setPerformNAT(performNAT.checked);
    };
    uimanager.getWindow("divnatconfig").dispose();
    removeBodyDiv('divbk');
    uitables[uitableid].dispose();
}

function editIpInfo(id, pos) 
{
    createBkDiv();
    createIpDiv(id, pos);
}

function createIpDiv(id, pos) 
{
    var host = network.getElement(id);
    var connectable = host.getConnectable();
    var ipinfo = connectable.getIPInfo(pos);
    var div = document.createElement("div");
    var l = window.innerWidth / 2 - 200;
    var t = window.innerHeight / 2 - 75;
    
    var ip = ipinfo.getIPv4() !== null?ipinfo.getIPv4():"";
    var nm = ipinfo.getNetmask() !== null?ipinfo.getNetmask():"255.255.255.0";
    var dns1 = ipinfo.getDNS1() !== null?ipinfo.getDNS1():"";
    var dns2 = ipinfo.getDNS2() !== null?ipinfo.getDNS2():"";
    
    div.setAttribute('style', 'position:absolute;top:' + t + 'px;left:' + l + 'px;z-index:110;background-color:white;width:400px;height:150px;border-radius:10px;border:1px solid;padding:10px;text-align:center;');
    div.setAttribute('id', 'divipinfo');

    var innerHTML = '<div style="padding:20px;">';

    // Introduction with help icon
    innerHTML += '<div style="margin-bottom:20px; padding:15px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 8px 0; color:white; font-weight:600;">⚙️ IP Configuration <span class="help-icon" onclick="showHelp(\'ip_addressing\')">?</span></h4>';
    innerHTML += '<p style="margin:0; font-size:12px; color:#e4e4f7;">Configure network settings for this interface</p>';
    innerHTML += '</div>';

    innerHTML += '<div style="text-align:left;">';
    innerHTML += '<label for="ip" style="display:block; margin-bottom:5px;">'+_("IP Address:")+'  <span class="help-icon" onclick="showHelp(\'ip_addressing\')">?</span></label>';
    innerHTML += '<input id="ip" type="text" value="'+ ip +'" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-bottom:15px;" />';

    innerHTML += '<label for="nm" style="display:block; margin-bottom:5px;">'+_("Network Mask (Subnet Mask):")+'  <span class="help-icon" onclick="showHelp(\'subnetting\')">?</span></label>';
    innerHTML += '<input id="nm" type="text" value="'+ nm +'" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-bottom:15px;" />';

    innerHTML += '<label for="dns1" style="display:block; margin-bottom:5px;">'+_("DNS Server 1:")+'</label>';
    innerHTML += '<input id="dns1" type="text" value="'+ dns1 +'" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-bottom:15px;" />';

    innerHTML += '<label for="dns2" style="display:block; margin-bottom:5px;">'+_("DNS Server 2:")+'</label>';
    innerHTML += '<input id="dns2" type="text" value="'+ dns2 +'" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;" />';
    innerHTML += '</div>';
    innerHTML += '</div>';

    var controls = '<p>\
  <input type="button" id="upload" value="'+_("Save")+'" onclick="saveIpInfo('+id+','+pos+');" />\
  <input type="button" id="cancel" value="'+_("Cancel")+'" onclick="cancelIpInfo();" />\
  </p>';
    //document.body.appendChild(div);
    var w = new UIWindow('divipinfo', 'Edit IP Info', 450, 520, false, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function saveIpInfo(id, pos) 
{
    var host = network.getElement(id);
    
    var ipv4 = document.getElementById("ip").value;
    var netmask = document.getElementById("nm").value;
    var dns1 = document.getElementById("dns1").value;
    var dns2 = document.getElementById("dns2").value;

    ipv4 = ipv4 === ""?null:ipv4;
    netmask = netmask === ""?null:netmask;
    dns1 = dns1 === ""?null:dns1;
    dns2 = dns2 === ""?null:dns2;
    
    host.getConnectable().getIPInfo(pos).setIPv4(ipv4);
    host.getConnectable().getIPInfo(pos).setNetmask(netmask);
    host.getConnectable().getIPInfo(pos).setDNS1(dns1);
    host.getConnectable().getIPInfo(pos).setDNS2(dns2);
    host.getConnectable().getIPInfo(pos).setStatic(true);

    uimanager.getWindow("divipinfo").dispose();
    removeBodyDiv('divbk');
}

function cancelIpInfo() 
{
    uimanager.getWindow("divipinfo").dispose();
    removeBodyDiv('divbk');
}

var Host = function(type, ports) 
{
    this.id = getNextID();
    var type = type;
    var connectable = null;
    var drawable = null;
    var _self = this;
    var ports = ports;
    var menu = null;
    var name = type + " " + this.id;
    var group = null;
    
    var apps = [];
    var arpTable = null; // ARP cache for this host
    var radiusClient = null; // RADIUS client for switches and routers
    
    // Device type properties
    var deviceType = 'desktop'; // default device type
    var hasWiFi = false;
    var hasEthernet = true;
    var deviceIcon = '🖥️';
    var connectionType = 'ethernet'; // current connection type (ethernet or wifi)
    
    // Rogue router properties
    var isRogueRouter = false;
    var interceptedTraffic = [];
    var maxInterceptedEntries = 100;

    // DHCP Relay properties (for routers and firewalls)
    var dhcpRelayEnabled = false;
    var dhcpRelayIP = null; // IP address of DHCP server to relay to
    
    // Hover state for showing/hiding IP addresses
    var isHovered = false;
    
    // Game Server properties
    var isGameServer = false;
    var gamePort = 25565;
    var gameType = "minecraft";
    var maxPlayers = 10;
    var currentPlayers = 0;
    var serverName = "My Game Server";
    var serverStatus = "offline"; // offline, starting, online, full
    var connectedPlayers = [];
    
    // Game Client connection properties
    var connectedToGameServer = null; // {serverIP: string, serverPort: number, serverName: string, playerName: string}
    var gameConnectionTime = null; // timestamp when connected
    
    // Attack mode properties
    this.isAttacking = false;
    this.attackTarget = null;
    this.attackType = null;

    // 802.1X Supplicant properties (client-side authentication)
    var dot1xEnabled = false;
    var dot1xUsername = "";
    var dot1xPassword = "";
    var dot1xAuthState = "DISCONNECTED"; // DISCONNECTED, AUTHENTICATING, AUTHENTICATED, FAILED
    var dot1xLastAuthTime = null;
    var dot1xAutoConnect = true;

    // VLAN database (Phase 1 - only for switches)
    var vlanDatabase = null;

    // Access Control Lists (ACLs) - for routers only
    var acls = {}; // ACL database: { number: { name, rules: [], stats: {} } }
    var interfaceACLs = {}; // ACL assignments: { interfaceNum: { IN: aclNum, OUT: aclNum } }
    var aclStatistics = {
        permitted: 0,
        denied: 0
    };
    
    this.save = function() 
    {
        var result = {};
        result.version = 1;
        result.id = this.id;
        result.type = type;
        result.drawable = drawable.save();
        result.connectable = connectable.save();
        result.ports = ports;
        result.apps = [];
        result.name = name;
        result.group = group;
        
        // Save device type properties
        result.deviceType = deviceType;
        result.hasWiFi = hasWiFi;
        result.hasEthernet = hasEthernet;
        result.deviceIcon = deviceIcon;
        result.connectionType = connectionType;
        
        // Save rogue router properties if it's a router
        if (type === "router") {
            result.isRogueRouter = isRogueRouter;
            result.dhcpRelayEnabled = dhcpRelayEnabled;
            result.dhcpRelayIP = dhcpRelayIP;
        }

        // Save DHCP relay for firewalls too
        if (type === "firewall") {
            result.dhcpRelayEnabled = dhcpRelayEnabled;
            result.dhcpRelayIP = dhcpRelayIP;
        }
        
        // Save game server properties if it's a game server
        if (isGameServer) {
            result.isGameServer = isGameServer;
            result.gamePort = gamePort;
            result.gameType = gameType;
            result.maxPlayers = maxPlayers;
            result.currentPlayers = currentPlayers;
            result.serverName = serverName;
            result.serverStatus = serverStatus;
            result.connectedPlayers = connectedPlayers;
        }
        
        for (var id in apps) 
        {
            var data = {};
            data.app = apps[id].app.save();
            data.port = apps[id].port;
            data.fixed = apps[id].fixed;
            data.type = id;
            data.ifacepos = apps[id].app.getIfacepos();
            result.apps.push(data);
        }
        
        // Save RADIUS client configuration
        if (radiusClient) {
            result.radiusClient = radiusClient.save();
        }

        // Save 802.1X supplicant configuration
        if (type === "computer" || type === "laptop" || type === "smartphone") {
            result.dot1x = {
                enabled: dot1xEnabled,
                username: dot1xUsername,
                password: dot1xPassword,
                authState: dot1xAuthState,
                autoConnect: dot1xAutoConnect
            };
            console.log('Saving 802.1X config for', name, '- Password:', dot1xPassword ? '****' + dot1xPassword.slice(-2) : 'EMPTY!');
        }

        // Save VLAN database for switches (Phase 1)
        if (type === "switch" && vlanDatabase) {
            result.vlanDatabase = vlanDatabase;
        }

        // Save ACLs for routers
        if (type === "router") {
            result.acls = acls;
            result.interfaceACLs = interfaceACLs;
            result.aclStatistics = aclStatistics;
        }

        return result;
    };
    
    this.load = function(data) 
    {
        this.id = data.id;
        type = data.type;
        drawable.load(data.drawable);
        
        // Load device type properties (with backward compatibility)
        deviceType = data.deviceType || 'desktop';
        hasWiFi = data.hasWiFi !== undefined ? data.hasWiFi : false;
        hasEthernet = data.hasEthernet !== undefined ? data.hasEthernet : true;
        deviceIcon = data.deviceIcon || '🖥️';
        connectionType = data.connectionType || 'ethernet';
        
        // Load rogue router properties if it's a router
        if (type === "router" && data.isRogueRouter !== undefined) {
            isRogueRouter = data.isRogueRouter;
        }

        // Load DHCP relay properties for routers and firewalls
        if ((type === "router" || type === "firewall") && data.dhcpRelayEnabled !== undefined) {
            dhcpRelayEnabled = data.dhcpRelayEnabled;
            dhcpRelayIP = data.dhcpRelayIP || null;
        }
        
        // Load game server properties if present
        if (data.isGameServer) {
            isGameServer = data.isGameServer;
            gamePort = data.gamePort || 25565;
            gameType = data.gameType || "minecraft";
            maxPlayers = data.maxPlayers || 10;
            currentPlayers = data.currentPlayers || 0;
            serverName = data.serverName || "My Game Server";
            serverStatus = data.serverStatus || "offline";
            connectedPlayers = data.connectedPlayers || [];
        }

        // Load VLAN database for switches (Phase 1 - backward compatible)
        if (type === "switch") {
            if (data.vlanDatabase) {
                vlanDatabase = data.vlanDatabase;
            } else {
                // Old project - initialize default VLAN database
                vlanDatabase = {
                    "1": { name: "default", status: "active" }
                };
            }
        }

        // Load ACLs for routers (backward compatible)
        if (type === "router") {
            acls = data.acls || {};
            interfaceACLs = data.interfaceACLs || {};
            aclStatistics = data.aclStatistics || { permitted: 0, denied: 0 };
        }

        switch (type) 
        {
            case "computer":
                // Use device-specific image based on loaded device type
                if (window.deviceImages && window.deviceImages[deviceType]) {
                    drawable.setImage(window.deviceImages[deviceType]);
                } else {
                    drawable.setImage(network.getImages()[IMAGE_COMPUTER]);
                }
                break;
            case "dhcpserver":
                drawable.setImage(network.getImages()[IMAGE_SERVERDHCP]);
                break;
            case "dnsserver":
                drawable.setImage(network.getImages()[IMAGE_SERVERDNS]);
                break;
            case "httpserver":
                drawable.setImage(network.getImages()[IMAGE_SERVERWEB]);
                break;
            case "emailserver":
                drawable.setImage(network.getImages()[IMAGE_SERVERDHCP]); // Use DHCP server image as base, overlay will be added
                break;
            case "gameserver":
                drawable.setImage(network.getImages()[IMAGE_COMPUTER]); // Will use computer image for now
                break;
            case "radiusserver":
                drawable.setImage(network.getImages()[IMAGE_SERVERDHCP]); // Use DHCP server image as base with overlay
                break;
            case "router":
                drawable.setImage(network.getImages()[IMAGE_ROUTER]);
                break;
            case "switch":
                drawable.setImage(network.getImages()[IMAGE_SWITCH]);
                break;
        }
        connectable.load(data.connectable);
        if (data.apps) 
        {
            for (var i = 0; i < data.apps.length; i++) 
            {
                try {
        // console.log('Loading app:', data.apps[i].type, 'for host type:', type);
                    
                    // Check if the constructor exists
                    var constructorName = data.apps[i].type;
                    if (typeof window[constructorName] === 'undefined') {
                        console.error('ERROR: Constructor', constructorName, 'is not defined!');
                        console.error('Available constructors:', Object.keys(window).filter(function(k) {
                            return k.includes('Server') || k.includes('Client');
                        }));
                        continue;
                    }
                    
                    var evalString = 'new ' + data.apps[i].type + '(' + data.apps[i].ifacepos + ')';
        // console.log('Eval string:', evalString);
                    var app = eval(evalString);
                    
                    if (!app) {
                        console.error('ERROR: App creation returned null for', data.apps[i].type);
                        continue;
                    }
                    
                    app.load(data.apps[i].app);
                    this.addApp(app, data.apps[i].port, data.apps[i].fixed);
        // console.log('Successfully loaded app:', data.apps[i].type);
                } catch (e) {
                    console.error('Failed to load app:', data.apps[i].type, 'Error:', e);
                    console.error('Full error stack:', e.stack);
                    console.error('App data:', JSON.stringify(data.apps[i], null, 2));
                    // Continue loading other apps even if one fails
                }
            }
        }

        if (data.name)
        {
            this.setName(data.name);
        }
        if (data.group)
        {
            group = data.group;
        }
        
        // Load RADIUS client configuration
        if (data.radiusClient && radiusClient) {
            radiusClient.load(data.radiusClient);
        }

        // Load 802.1X supplicant configuration
        if (data.dot1x) {
            dot1xEnabled = data.dot1x.enabled || false;
            dot1xUsername = data.dot1x.username || "";
            dot1xPassword = data.dot1x.password || "";
            dot1xAuthState = data.dot1x.authState || "DISCONNECTED";
            dot1xAutoConnect = data.dot1x.autoConnect !== undefined ? data.dot1x.autoConnect : true;
            console.log('Loading 802.1X config - Password from data:', data.dot1x.password ? '****' + data.dot1x.password.slice(-2) : 'EMPTY!');
            console.log('  Set to dot1xPassword:', dot1xPassword ? '****' + dot1xPassword.slice(-2) : 'EMPTY!');
        }

        redoMenu();
    };
    
    function init() 
    {
        switch (type) 
        {
            case "router":
                connectable = new Connectable(_self, MACMODE_UNIQUE, IPMODE_UNIQUE, true, true);
                arpTable = new ARPTable(); // Routers have ARP tables
                radiusClient = new RADIUSClient(_self); // RADIUS client for admin authentication
                break;
            case "switch":
                connectable = new Connectable(_self, MACMODE_SHARED, IPMODE_NOIP, false, false);
                // Switches don't need ARP tables (they work at Layer 2)
                // But they can have RADIUS client for 802.1X
                radiusClient = new RADIUSClient(_self);
                // Initialize VLAN database with default VLAN 1 (Phase 1)
                vlanDatabase = {
                    "1": { name: "default", status: "active" }
                };
                break;
            default:
                connectable = new Connectable(_self, MACMODE_UNIQUE, IPMODE_UNIQUE, true, false);
                arpTable = new ARPTable(); // Computers and servers have ARP tables
                break;
        }
        for (var i = 0; i < ports; i++) 
        {
            var connector = new Connector(connectable);
        }
        drawable = new Drawable(_self);
        drawable.addObserver(_self);
        menu = new UIMenu(name, 0, 0, false);
        addStaticMenu();
        uimanager.addMenu(menu);
    }

    this.setName = function(n)
    {
        name = n;
        redoMenu();
    };
    
    this.setGroup = function(g)
    {
        group = g;
    };

    this.getName = function()
    {
        return name;
    };
    
    this.getGroup = function()
    {
        return group;
    };
    
    this.getConnectorDesc = function(i) 
    {
        var result = _("Interface ") + i;
        if (type === "router") 
        {
            result = (i === ROUTER_WAN) ? "WAN" : "LAN";
        }
        
        return result;
    }
    
    function addStaticMenu() 
    {
        // Special case for routers - use submenus to organize many items
        if (type === "router") {
            // Basic submenu
            menu.addSubmenu("emoji:🔧", "Basic", [
                {img: "img/64/edit.png", text: "Edit Name / Group", js: "editNameGroup(" + _self.id + ");"}
            ]);
            
            // Network Config submenu
            var networkItems = [
                {img: "img/64/inspect.png", text: "Network Diagnostics", js: "networkDiagnostics(" + _self.id + ");"},
                {img: "img/64/edit.png", text: "Edit Gateways", js: "editGateways(" + _self.id + ");"},
                {img: "img/64/inspect.png", text: "View ARP Cache", js: "viewARPTable(" + _self.id + ");"},
                {img: "emoji:📡", text: "Configure DHCP Relay", js: "configureDHCPRelay(" + _self.id + ");"}
            ];

            // Add RADIUS authentication for routers
            if (radiusClient) {
                networkItems.push({img: "img/64/inspect.png", text: "RADIUS Authentication", js: "configureRADIUSAuth(" + _self.id + ");"});
            }
            
            // Add IP Info entries for each interface
            for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                networkItems.push({
                    img: "img/64/edit.png", 
                    text: "Edit IP Info - " + _self.getConnectorDesc(i), 
                    js: "editIpInfo(" + _self.id + "," + i + ");"
                });
            }
            
            menu.addSubmenu("emoji:🌐", "Network Config", networkItems);
            
            // Security submenu
            var securityItems = [
                {img: "emoji:🛡️", text: "Access Control Lists (ACLs)", js: "showACLConfig(" + _self.id + ");"},
                {img: "img/64/edit.png", text: "Edit NAT Table", js: "editNATTable(" + _self.id + ");"},
                {img: "img/64/edit.png", text: "Configure Rogue Mode", js: "configureRogueRouter(" + _self.id + ");"}
            ];

            // Add rogue-specific items if in rogue mode
            if (isRogueRouter) {
                securityItems.push({img: 'emoji:🔴', text: "View Intercepted Traffic", js: "viewRouterInterceptedTraffic(" + _self.id + ");"});
                securityItems.push({img: 'emoji:🧹', text: "Clear Intercepted Traffic", js: "clearRouterInterceptedTraffic(" + _self.id + ");"});
            }

            menu.addSubmenu("emoji:🔐", "Security", securityItems);
            
            // Add separator before destructive actions
            menu.addSeparator();
            
            // Quick actions always visible
            menu.addEntry("img/64/delete.png", "Delete Element", "deleteSelected();");
            menu.addEntry("img/64/link.png", "Create Link", "createLinkAction();");
        }
        // Special case for computers with many menu items - use submenus
        else if (type === "computer" || isGameServer) {
            // Count how many menu items we'll have to decide if we need submenus
            var itemCount = 3; // Delete, Edit Name, Create Link always present
            if (hasWiFi && hasEthernet) itemCount++;
            if (!isGameServer) itemCount++; // Connect to Game Server
            if (isGameServer) itemCount += 3; // Configure, Status, Start/Stop
            if (connectable.getIpMode() !== IPMODE_NOIP) itemCount += 3; // Network diagnostics, Gateways, ARP
            if (connectable.getIpMode() === IPMODE_UNIQUE) itemCount += connectable.getConnectorNumber(); // IP Info entries
            
            // Use submenus if we have 8 or more items (including app items which get added later)
            var useSubmenus = itemCount >= 8;
            
            if (useSubmenus) {
                // Basic submenu
                menu.addSubmenu("emoji:🔧", "Basic", [
                    {img: "img/64/edit.png", text: "Edit Name / Group", js: "editNameGroup(" + _self.id + ");"}
                ]);
                
                // Network submenu
                var networkItems = [];
                if (connectable.getIpMode() !== IPMODE_NOIP) {
                    networkItems.push({img: "img/64/inspect.png", text: "Network Diagnostics", js: "networkDiagnostics(" + _self.id + ");"});
                    networkItems.push({img: "img/64/edit.png", text: "Edit Gateways", js: "editGateways(" + _self.id + ");"});
                    networkItems.push({img: "img/64/inspect.png", text: "View ARP Cache", js: "viewARPTable(" + _self.id + ");"});
                }
                
                if (connectable.getIpMode() === IPMODE_UNIQUE) {
                    for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                        networkItems.push({
                            img: "img/64/edit.png",
                            text: "Edit IP Info - " + _self.getConnectorDesc(i),
                            js: "editIpInfo(" + _self.id + "," + i + ");"
                        });
                    }
                }
                
                if (hasWiFi && hasEthernet) {
                    networkItems.push({img: "img/64/edit.png", text: "Network Interface", js: "configureNetworkInterface(" + _self.id + ");"});
                }

                // Add 802.1X configuration for computers (client authentication)
                networkItems.push({img: "emoji:🔐", text: "802.1X Authentication", js: "configure802_1XSupplicant(" + _self.id + ");"});

                if (networkItems.length > 0) {
                    menu.addSubmenu("emoji:🌐", "Network", networkItems);
                }
                
                // Applications submenu (for game server features and game client)
                var appItems = [];
                if (type === "computer" && !isGameServer) {
                    if (_self.isConnectedToGameServer()) {
                        var conn = _self.getGameServerConnection();
                        appItems.push({img: "emoji:🔌", text: "Disconnect from " + conn.serverName, js: "disconnectFromGameServer(" + _self.id + ");"});
                        appItems.push({img: "emoji:📊", text: "Game Connection Info", js: "showGameConnectionInfo(" + _self.id + ");"});
                    } else {
                        appItems.push({img: "emoji:🎮", text: "Connect to Game Server", js: "connectToGameServer(" + _self.id + ");"});
                    }
                    appItems.push({img: "emoji:⚔️", text: "Attack Mode", js: "attackManager.showAttackConfiguration(" + _self.id + ");"});
                }
                
                if (isGameServer) {
                    appItems.push({img: "emoji:🎮", text: "Configure Game Server", js: "configureGameServer(" + _self.id + ");"});
                    appItems.push({img: "emoji:📊", text: "Server Status", js: "viewGameServerStatus(" + _self.id + ");"});
                    if (serverStatus === "offline") {
                        appItems.push({img: "emoji:▶️", text: "Start Server", js: "startGameServer(" + _self.id + ");"});
                    } else {
                        appItems.push({img: "emoji:⏹️", text: "Stop Server", js: "stopGameServer(" + _self.id + ");"});
                    }
                }
                
                if (appItems.length > 0) {
                    menu.addSubmenu("emoji:🎮", isGameServer ? "Server Control" : "Applications", appItems);
                }
                
                // Services submenu will be populated by apps (DHCP, DNS, HTTP, Email)
                // This is handled in redoMenu() function
                
                // Add separator before destructive actions
                menu.addSeparator();
                
                // Quick actions always visible
                menu.addEntry("img/64/delete.png", "Delete Element", "deleteSelected();");
                menu.addEntry("img/64/link.png", "Create Link", "createLinkAction();");
            } else {
                // Use flat menu for simpler computers
                menu.addEntry("img/64/delete.png", "Delete element", "deleteSelected();");
                menu.addEntry("img/64/edit.png", "Edit Name / Group", "editNameGroup(" + _self.id + ");");            
                menu.addEntry("img/64/link.png", "Create Link", "createLinkAction();");
                
                if (hasWiFi && hasEthernet) {
                    menu.addEntry("img/64/edit.png", "Network Interface", "configureNetworkInterface(" + _self.id + ");");
                }

                // Add 802.1X configuration for computers (client authentication)
                if (type === "computer") {
                    menu.addEntry("emoji:🔐", "802.1X Authentication", "configure802_1XSupplicant(" + _self.id + ");");
                }

                if (type === "computer" && !isGameServer) {
                    if (_self.isConnectedToGameServer()) {
                        var conn = _self.getGameServerConnection();
                        menu.addEntry("emoji:🔌", "Disconnect from " + conn.serverName, "disconnectFromGameServer(" + _self.id + ");");
                        menu.addEntry("emoji:📊", "Game Connection Info", "showGameConnectionInfo(" + _self.id + ");");
                    } else {
                        menu.addEntry("emoji:🎮", "Connect to Game Server", "connectToGameServer(" + _self.id + ");");
                    }
                    menu.addEntry("emoji:⚔️", "Attack Mode", "attackManager.showAttackConfiguration(" + _self.id + ");");
                }
                
                // Add server status option for servers and network infrastructure
                if (type === 'router' || type === 'dhcpserver' || type === 'dnsserver' || 
                     type === 'webserver' || type === 'firewall' || type === 'emailserver') {
                    menu.addEntry("emoji:📊", "View Resource Status", "network.getElement(" + _self.id + ").viewServerStatus();");
                }
                
                if (isGameServer) {
                    menu.addEntry("emoji:🎮", "Configure Game Server", "configureGameServer(" + _self.id + ");");
                    menu.addEntry("emoji:📊", "Server Status", "viewGameServerStatus(" + _self.id + ");");
                    if (serverStatus === "offline") {
                        menu.addEntry("emoji:▶️", "Start Server", "startGameServer(" + _self.id + ");");
                    } else {
                        menu.addEntry("emoji:⏹️", "Stop Server", "stopGameServer(" + _self.id + ");");
                    }
                }
                
                if (connectable.getIpMode() !== IPMODE_NOIP) {
                    menu.addEntry("img/64/inspect.png", "Network diagnostics", "networkDiagnostics(" + _self.id + ");");
                    menu.addEntry("img/64/edit.png", "Edit Gateways", "editGateways(" + _self.id + ");");
                    menu.addEntry("img/64/inspect.png", "View ARP Cache", "viewARPTable(" + _self.id + ");");
                }
                
                if (connectable.getIpMode() === IPMODE_UNIQUE) {
                    for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                        menu.addEntry("img/64/edit.png", "Edit IP Info - " + _self.getConnectorDesc(i), "editIpInfo(" + _self.id + "," + i + ");");
                    }
                }
            }
        }
        // Special case for server devices (DHCP, DNS, Web, Email servers) with many menu items
        else if (type === "dhcpserver" || type === "dnsserver" || type === "webserver" || type === "emailserver") {
            // Server devices menu is fully handled in redoMenu() to avoid duplication
            // Don't add anything here - redoMenu will rebuild the entire menu
        }
        // All other simple devices use flat menus (switches, etc.)
        else {
            menu.addEntry("img/64/delete.png", "Delete element", "deleteSelected();");
            menu.addEntry("img/64/edit.png", "Edit Name / Group", "editNameGroup(" + _self.id + ");");            
            menu.addEntry("img/64/link.png", "Create Link", "createLinkAction();");
            
            // Add 802.1X configuration for switches
            if (type === "switch" && radiusClient) {
                menu.addEntry("img/64/inspect.png", "802.1X Port Security", "configure802_1X(" + _self.id + ");");
            }

            // Add VLAN configuration for switches (Phase 1)
            if (type === "switch") {
                menu.addEntry("emoji:🏷️", "VLAN Configuration", "openVlanConfig(" + _self.id + ");");
            }

            if (connectable.getIpMode() !== IPMODE_NOIP) 
            {
                menu.addEntry("img/64/inspect.png", "Network diagnostics", "networkDiagnostics(" + _self.id + ");");
                menu.addEntry("img/64/edit.png", "Edit Gateways", "editGateways(" + _self.id + ");");
                
                // Add ARP table menu entry for hosts with IP capability (not switches)
                if (type !== "switch") {
                    menu.addEntry("img/64/inspect.png", "View ARP Cache", "viewARPTable(" + _self.id + ");");
                }
            }
            
            if (connectable.getIpMode() === IPMODE_UNIQUE) 
            {
                for (var i = 0; i < connectable.getConnectorNumber(); i++) 
                {
                    menu.addEntry("img/64/edit.png", "Edit IP Info - " + _self.getConnectorDesc(i), "editIpInfo(" + _self.id + "," + i + ");");
                }
            }
        }
    }
    
    this.drawableChanged = function() 
    {
        var rect = drawable.getRect();
        
        menu.setPos(rect.x + rect.width, rect.y);
    };
    
    function redoMenu() 
    {
        // Remove all entries from the menu
        menu.purge();
        menu.setDescription(name);
        
        // Rebuild the menu
        addStaticMenu();
        
        // Check if we're using submenus for this device
        var useSubmenus = false;
        if (type === "router") {
            useSubmenus = true;
        } else if (type === "dhcpserver" || type === "dnsserver" || type === "webserver" || type === "emailserver") {
            // Server devices always use submenus
            useSubmenus = true;
        } else if (type === "computer" || isGameServer) {
            // Same logic as in addStaticMenu to determine if we use submenus
            var itemCount = 3;
            if (hasWiFi && hasEthernet) itemCount++;
            if (!isGameServer) itemCount++;
            if (isGameServer) itemCount += 3;
            if (connectable.getIpMode() !== IPMODE_NOIP) itemCount += 3;
            if (connectable.getIpMode() === IPMODE_UNIQUE) itemCount += connectable.getConnectorNumber();
            useSubmenus = itemCount >= 8;
        }
        
        // Collect app menu entries
        var serviceItems = [];
        for (var id in apps) 
        {
            var app = apps[id];
        // console.log('Processing app for menu:', id, app);
            var entries = app.app.getMenuEntries();
        // console.log('Menu entries for', id, ':', entries);
            for (var i = 0; i < entries.length; i++) 
            {
                if (useSubmenus) {
                    // Collect service items for submenu
                    if (entries[i].emoji) {
                        serviceItems.push({img: 'emoji:' + entries[i].emoji, text: entries[i].text, js: entries[i].js});
                    } else {
                        serviceItems.push({img: entries[i].img, text: entries[i].text, js: entries[i].js});
                    }
                } else {
                    // Add directly to menu for simple devices
                    if (entries[i].emoji) {
                        menu.addEntry('emoji:' + entries[i].emoji, entries[i].text, entries[i].js);
                    } else {
                        menu.addEntry(entries[i].img, entries[i].text, entries[i].js);
                    }
                }
            }
        }
        
        // If we have service items and are using submenus, add them as a Services submenu
        // Insert before the separator and quick actions
        if (useSubmenus && serviceItems.length > 0) {
            // We need to insert the Services submenu before the separator
            // Since we can't insert at a specific position, we need to rebuild the menu
            menu.purge();
            menu.setDescription(name);
            
            // Rebuild the menu with Services submenu in the right place
            if (type === "router") {
                // Router menu structure
                menu.addSubmenu("emoji:🔧", "Basic", [
                    {img: "img/64/edit.png", text: "Edit Name / Group", js: "editNameGroup(" + _self.id + ");"}
                ]);
                
                var networkItems = [
                    {img: "img/64/inspect.png", text: "Network Diagnostics", js: "networkDiagnostics(" + _self.id + ");"},
                    {img: "img/64/edit.png", text: "Edit Gateways", js: "editGateways(" + _self.id + ");"},
                    {img: "img/64/inspect.png", text: "View ARP Cache", js: "viewARPTable(" + _self.id + ");"}
                ];
                for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                    networkItems.push({
                        img: "img/64/edit.png", 
                        text: "Edit IP Info - " + _self.getConnectorDesc(i), 
                        js: "editIpInfo(" + _self.id + "," + i + ");"
                    });
                }
                menu.addSubmenu("emoji:🌐", "Network Config", networkItems);
                
                var securityItems = [
                    {img: "img/64/edit.png", text: "Edit NAT Table", js: "editNATTable(" + _self.id + ");"},
                    {img: "img/64/edit.png", text: "Configure Rogue Mode", js: "configureRogueRouter(" + _self.id + ");"}
                ];
                if (isRogueRouter) {
                    securityItems.push({img: 'emoji:🔴', text: "View Intercepted Traffic", js: "viewRouterInterceptedTraffic(" + _self.id + ");"});
                    securityItems.push({img: 'emoji:🧹', text: "Clear Intercepted Traffic", js: "clearRouterInterceptedTraffic(" + _self.id + ");"});
                }
                menu.addSubmenu("emoji:🔐", "Security", securityItems);
                
                // Add Services submenu if there are any app services
                if (serviceItems.length > 0) {
                    menu.addSubmenu("emoji:📡", "Services", serviceItems);
                }
            } else if (type === "dhcpserver" || type === "dnsserver" || type === "webserver" || type === "emailserver") {
                // Server device menu structure
                menu.addSubmenu("emoji:🔧", "Basic", [
                    {img: "img/64/edit.png", text: "Edit Name / Group", js: "editNameGroup(" + _self.id + ");"}
                ]);
                
                var networkItems = [];
                if (connectable.getIpMode() !== IPMODE_NOIP) {
                    networkItems.push({img: "img/64/inspect.png", text: "Network Diagnostics", js: "networkDiagnostics(" + _self.id + ");"});
                    networkItems.push({img: "img/64/edit.png", text: "Edit Gateways", js: "editGateways(" + _self.id + ");"});
                    networkItems.push({img: "img/64/inspect.png", text: "View ARP Cache", js: "viewARPTable(" + _self.id + ");"});
                }
                if (connectable.getIpMode() === IPMODE_UNIQUE) {
                    for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                        networkItems.push({
                            img: "img/64/edit.png",
                            text: "Edit IP Info - " + _self.getConnectorDesc(i),
                            js: "editIpInfo(" + _self.id + "," + i + ");"
                        });
                    }
                }
                if (networkItems.length > 0) {
                    menu.addSubmenu("emoji:🌐", "Network", networkItems);
                }
                
                // Add Service Config submenu if there are any service-specific items
                if (serviceItems.length > 0) {
                    // Use appropriate icon based on server type
                    var serviceIcon = "emoji:📡"; // Default
                    if (type === "dhcpserver") serviceIcon = "emoji:📡";
                    else if (type === "dnsserver") serviceIcon = "emoji:🔍";
                    else if (type === "webserver") serviceIcon = "emoji:🌍";
                    else if (type === "emailserver") serviceIcon = "emoji:📧";
                    
                    menu.addSubmenu(serviceIcon, "Service Config", serviceItems);
                }
                
                // Add separator and quick actions for server devices
                menu.addSeparator();
                menu.addEntry("img/64/delete.png", "Delete Element", "deleteSelected();");
                menu.addEntry("img/64/link.png", "Create Link", "createLinkAction();");
            } else {
                // Computer menu structure
                menu.addSubmenu("emoji:🔧", "Basic", [
                    {img: "img/64/edit.png", text: "Edit Name / Group", js: "editNameGroup(" + _self.id + ");"}
                ]);
                
                var networkItems = [];
                if (connectable.getIpMode() !== IPMODE_NOIP) {
                    networkItems.push({img: "img/64/inspect.png", text: "Network Diagnostics", js: "networkDiagnostics(" + _self.id + ");"});
                    networkItems.push({img: "img/64/edit.png", text: "Edit Gateways", js: "editGateways(" + _self.id + ");"});
                    networkItems.push({img: "img/64/inspect.png", text: "View ARP Cache", js: "viewARPTable(" + _self.id + ");"});
                }
                if (connectable.getIpMode() === IPMODE_UNIQUE) {
                    for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                        networkItems.push({
                            img: "img/64/edit.png",
                            text: "Edit IP Info - " + _self.getConnectorDesc(i),
                            js: "editIpInfo(" + _self.id + "," + i + ");"
                        });
                    }
                }
                if (hasWiFi && hasEthernet) {
                    networkItems.push({img: "img/64/edit.png", text: "Network Interface", js: "configureNetworkInterface(" + _self.id + ");"});
                }
                // Add 802.1X configuration for computers (client authentication)
                if (type === "computer") {
                    networkItems.push({img: "emoji:🔐", text: "802.1X Authentication", js: "configure802_1XSupplicant(" + _self.id + ");"});
                }
                if (networkItems.length > 0) {
                    menu.addSubmenu("emoji:🌐", "Network", networkItems);
                }
                
                var appItems = [];
                if (type === "computer" && !isGameServer) {
                    appItems.push({img: "emoji:🎮", text: "Connect to Game Server", js: "connectToGameServer(" + _self.id + ");"});
                    appItems.push({img: "emoji:⚔️", text: "Attack Mode", js: "attackManager.showAttackConfiguration(" + _self.id + ");"});
                }
                // Add resource status option for servers and network infrastructure
                if (type === 'router' || type === 'dhcpserver' || type === 'dnsserver' || 
                     type === 'webserver' || type === 'firewall' || type === 'emailserver') {
                    appItems.push({img: "emoji:📊", text: "View Resource Status", js: "network.getElement(" + _self.id + ").viewServerStatus();"});
                }
                if (isGameServer) {
                    appItems.push({img: "emoji:🎮", text: "Configure Game Server", js: "configureGameServer(" + _self.id + ");"});
                    appItems.push({img: "emoji:📊", text: "Server Status", js: "viewGameServerStatus(" + _self.id + ");"});
                    if (serverStatus === "offline") {
                        appItems.push({img: "emoji:▶️", text: "Start Server", js: "startGameServer(" + _self.id + ");"});
                    } else {
                        appItems.push({img: "emoji:⏹️", text: "Stop Server", js: "stopGameServer(" + _self.id + ");"});
                    }
                }
                if (appItems.length > 0) {
                    menu.addSubmenu("emoji:🎮", isGameServer ? "Server Control" : "Applications", appItems);
                }
                
                // Add Services submenu if there are any app services
                if (serviceItems.length > 0) {
                    menu.addSubmenu("emoji:📡", "Services", serviceItems);
                }
            }
            
            // Add separator and quick actions
            // Note: Servers already have these in their section above (lines 1272-1274)
            // Routers and computers need them added here
            if (type === "router" || type === "computer" || isGameServer) {
                menu.addSeparator();
                menu.addEntry("img/64/delete.png", "Delete Element", "deleteSelected();");
                menu.addEntry("img/64/link.png", "Create Link", "createLinkAction();");
            }
        }
    }
    
    this.addApp = function(app, port, fixed) 
    {
        apps[app.getId()] = {};
        apps[app.getId()].app = app;
        apps[app.getId()].port = port;
        apps[app.getId()].fixed = fixed;
        app.setOwner(_self);
        if (fixed) 
        {
            connectable.getTrafficManager().registerApplication(app, port, true);
        }
        
        redoMenu();
    };
    
    this.getAppNames = function(id) 
    {
        return Object.keys(apps);
    };
    
    this.getApp = function(id) 
    {
        var result = null;
        
        if (id in apps) 
        {
            result = apps[id].app;
        }
        
        return result;
    };
    
    // Method to update the port of an app (needed for HTTPServer port changes)
    this.updateAppPort = function(appId, newPort) 
    {
        if (appId in apps) 
        {
            var oldPort = apps[appId].port;
            apps[appId].port = newPort;
            
            // If it's a fixed app (auto-registered), update TrafficManager
            if (apps[appId].fixed) 
            {
                var trafficManager = connectable.getTrafficManager();
                if (trafficManager) 
                {
                    // Unregister from old port
                    trafficManager.unregisterApplication(oldPort);
                    // Register on new port
                    trafficManager.registerApplication(apps[appId].app, newPort, true);
        // console.log("Host.updateAppPort: Moved " + appId + " from port " + oldPort + " to " + newPort);
                }
            }
            
            return true;
        }
        return false;
    };
    
    this.getConnectable = function() 
    {
        return connectable;
    }
    
    this.getDrawable = function() 
    {
        return drawable;
    };
    
    this.getType = function() 
    {
        return type;
    };
    
    // Process incoming attack packet (for targets)
    this.processAttackPacket = function(attackType, intensity) {
        // Store the current attack type for display purposes
        this.attackType = attackType;
        
        // Initialize ServerResources if not already done
        if (!this.serverResources) {
            // Check if this device can be attacked
            // All devices except switches can be attacked and have resources
            var hasWebServer = this.getApp && this.getApp("HTTPServer");
            var hasDNSServer = this.getApp && this.getApp("DNSServer");
            var hasDHCPServer = this.getApp && this.getApp("DHCPServer");
            var hasEmailServer = this.getApp && this.getApp("EmailServer");
            
            // Any device that's not a switch can be attacked
            if (type === 'router' || type === 'dhcpserver' || type === 'dnsserver' || 
                type === 'webserver' || type === 'firewall' || type === 'emailserver' || 
                type === 'computer' || isGameServer || hasWebServer || hasDNSServer || 
                hasDHCPServer || hasEmailServer) {
                this.serverResources = new ServerResources();
                
                // Force a redraw to show the resource overlay immediately
                if (window.network && window.network.needRedraw) {
                    window.network.needRedraw();
                }
                
                // Start recovery timer
                setInterval(function() {
                    if (_self.serverResources) {
                        _self.serverResources.recover();
                    }
                }, 1000); // Recover every second
            } else {
                // Only switches can't be attacked
                return false;
            }
        }
        
        // Process the packet with resource modeling
        if (this.serverResources) {
            var result = this.serverResources.processPacket(attackType, intensity || 100);
            return result;
        }
        
        return false;
    };
    
    // View server resource status
    this.viewServerStatus = function() {
        if (!this.serverResources) {
            alert("No server resources to display. This device is not under attack.");
            return;
        }
        
        // Create modal to show resource status
        createBkDiv();
        
        var w = new UIWindow('divserverstatus', 'Server Resource Status - ' + name, 400, 450, false, 1.0);
        w.setContent(this.serverResources.getResourceHTML());
        
        var controls = '<p><input type="button" value="' + _("Close") + '" onclick="uimanager.getWindow(\'divserverstatus\').dispose(); removeBodyDiv(\'divbk\');" /></p>';
        w.setControls(controls);
        w.render();
        
        // Update every second while window is open
        var updateInterval = setInterval(function() {
            var window = uimanager.getWindow('divserverstatus');
            if (window && _self.serverResources) {
                window.setContent(_self.serverResources.getResourceHTML());
            } else {
                clearInterval(updateInterval);
            }
        }, 1000);
    };
    
    this.getVerboseStr = function(connectable,i)
    {
        result = "";
        
        result += "Network Mask: " + ((connectable.getIPInfo(i).getNetmask() === null)?"-":connectable.getIPInfo(i).getNetmask());
        result += "\n";
        result += "DNS 1: " + ((connectable.getIPInfo(i).getDNS1() === null)?"-":connectable.getIPInfo(i).getDNS1());
        result += "\n";
        result += "DNS 2: " + ((connectable.getIPInfo(i).getDNS2() === null)?"-":connectable.getIPInfo(i).getDNS2());
        if (connectable.getGatewayManager() !== null)
        {
            result += "\n";
            result += connectable.getGatewayManager().getGatewayDescription();
        }
        if (apps !== null)
        {
            var names = this.getAppNames();
            for (var i=0;i<names.length;i++)
            {
                var app = this.getApp(names[i]);
                result += app.getAppDescription();
            }
        }

        return result;
    };
    
    this.setHovered = function(hovered) {
        if (isHovered !== hovered) {
            isHovered = hovered;
            // Force a redraw when hover state changes
            if (drawable) {
                drawable.notifyObservers();
            }
        }
    };
    
    this.getHovered = function() {
        return isHovered;
    };
    
    this.getStrInfo = function() 
    {
        var result = name;
        
        // Add warning if this is a rogue router
        if (type === "router" && isRogueRouter) {
            result += "\n⚠️ [ROGUE ROUTER - MITM]";
        }
        
        // Add game server info if this is a game server
        if (isGameServer) {
            // Show game type with appropriate emoji
            var gameEmojis = {
                'minecraft': '⛏️',
                'csgo': '🔫',
                'terraria': '🌳',
                'rust': '🔨',
                'valheim': '⚔️',
                'ark': '🦕',
                'custom': '🎮'
            };
            var emoji = gameEmojis[gameType] || '🎮';
            result += "\n" + emoji + " " + gameType.toUpperCase();
            result += "\nPort: " + gamePort;
            result += "\n" + currentPlayers + "/" + maxPlayers + " players";
            if (serverStatus === "online") {
                result += "\n🟢 Online";
            } else if (serverStatus === "starting") {
                result += "\n🟡 Starting...";
            } else {
                result += "\n🔴 Offline";
            }
        }
        
        // Show IP addresses when hovering OR when device labels are enabled
        var shouldShowIPs = isHovered || (typeof showDeviceLabels !== 'undefined' && showDeviceLabels);
        if (!shouldShowIPs) {
            return result;
        }
        
        if (connectable.getIpMode() === IPMODE_UNIQUE)
        {
            for (var i = 0; i < connectable.getConnectorNumber();i++)
            {
                result += "\n";
                result += this.getConnectorDesc(i);
                result += ": ";
                var ipInfo = connectable.getIPInfo(i);
                result += (ipInfo === null || ipInfo.getIPv4() === null)?"-":ipInfo.getIPv4();
                if (NetworkSimulator.verbose == true)
                {
                    result += "\n";
                    result += this.getVerboseStr(connectable,i);
                }
            }
        }
        else if (connectable.getIpMode() === IPMODE_SHARED)
        {
            result += "\n";
            result += _("IP: ");
            result += ": ";
            var ipInfo = connectable.getIPInfo(0);
            result += (ipInfo === null || ipInfo.getIPv4() === null)?"-":ipInfo.getIPv4();
            if (NetworkSimulator.verbose == true)
            {
                result += "\n";
                result += this.getVerboseStr(connectable,0);
            }
        }
        
        return result;
    };
    
    this.getMenu = function() 
    {
        return menu;
    };
    
    this.dispose = function() 
    {
        if (menu.getVisible()) 
        {
            menu.hide();
        }
        uimanager.deleteMenu(menu);
        drawable.dispose();
    };
    
    this.getARPTable = function() 
    {
        return arpTable;
    };
    
    this.getRADIUSClient = function()
    {
        return radiusClient;
    };
    
    // Device type getters and setters
    this.getDeviceType = function() 
    {
        return deviceType;
    };
    
    this.setDeviceType = function(type) 
    {
        deviceType = type;
    };
    
    // Rogue router methods
    this.isRogue = function() 
    {
        return isRogueRouter;
    };
    
    this.setRogueMode = function(rogue) 
    {
        if (type === "router") {
            isRogueRouter = rogue;
            redoMenu(); // Refresh menu to show rogue options
        }
    };
    
    this.interceptTraffic = function(message) 
    {
        if (isRogueRouter && message.getData && message.getData()) {
            var data = message.getData();
            // Check for various HTTP-related data fields
            if (data.url || data.request || data.content || data.contents || 
                data.domain || data.filename || data.description) {
                // Check if this is encrypted HTTPS traffic
                var isEncrypted = data.isEncrypted || (data.protocol === 'https');
                
                // Build URL from available data
                var url = data.url || '';
                if (!url && data.domain && data.filename) {
                    url = (data.protocol || 'http') + '://' + data.domain + '/' + data.filename;
                } else if (!url && data.description) {
                    url = data.description;
                }
                
                // Determine if this is a request or response
                var isResponse = data.code !== undefined;
                
                var trafficEntry = {
                    timestamp: new Date().toISOString(),
                    sourceIP: message.getOriginIP(),
                    destIP: message.getDestinationIP(),
                    type: isEncrypted ? 'HTTPS' : 'HTTP',
                    protocol: data.protocol || 'http',
                    port: message.getDstPort ? message.getDstPort() : (isEncrypted ? 443 : 80),
                    isEncrypted: isEncrypted,
                    url: url,
                    method: data.method || (data.description && data.description.startsWith('GET') ? 'GET' : 'GET'),
                    isResponse: isResponse,
                    statusCode: data.code,
                    statusDescription: data.description
                };
                
                if (isEncrypted) {
                    // HTTPS traffic - cannot see actual content
                    trafficEntry.encryptedData = true;
                    trafficEntry.headers = data.headers || { Note: 'HTTPS headers are encrypted' };
                    // Use the encryptedView from the server if available
                    trafficEntry.body = data.encryptedView || '[ENCRYPTED HTTPS DATA]';
                    trafficEntry.credentials = null;
                    trafficEntry.warning = '🔒 HTTPS encryption prevents content inspection - MITM sees only encrypted bytes';
                } else {
                    // HTTP traffic - can see everything
                    trafficEntry.headers = data.headers || {};
                    trafficEntry.body = data.body || data.contents || '';
                    trafficEntry.credentials = extractCredentialsFromData(data);
                }
                
                interceptedTraffic.push(trafficEntry);
        // console.log('[ROGUE ROUTER] Traffic intercepted and stored. Total entries: ' + interceptedTraffic.length);
        // console.log('[ROGUE ROUTER] Entry:', trafficEntry);
                
                // Keep only last maxInterceptedEntries
                if (interceptedTraffic.length > maxInterceptedEntries) {
                    interceptedTraffic.shift();
                }
            }
        }
    };
    
    this.getInterceptedTraffic = function() 
    {
        return interceptedTraffic;
    };
    
    this.clearInterceptedTraffic = function()
    {
        interceptedTraffic = [];
    };

    // DHCP Relay getter/setter methods
    this.isDHCPRelayEnabled = function() {
        return dhcpRelayEnabled;
    };

    this.setDHCPRelayEnabled = function(enabled) {
        dhcpRelayEnabled = enabled;
    };

    this.getDHCPRelayIP = function() {
        return dhcpRelayIP;
    };

    this.setDHCPRelayIP = function(ip) {
        dhcpRelayIP = ip;
    };
    
    // Helper function to extract credentials
    function extractCredentialsFromData(data) 
    {
        var creds = null;
        
        // Check for basic auth header
        if (data.headers && data.headers['Authorization']) {
            var auth = data.headers['Authorization'];
            if (auth.indexOf('Basic ') === 0) {
                try {
                    var decoded = atob(auth.substring(6));
                    var parts = decoded.split(':');
                    creds = {
                        type: 'Basic Auth',
                        username: parts[0],
                        password: parts[1] || ''
                    };
                } catch (e) {}
            }
        }
        
        // Check for form data
        if (data.body && typeof data.body === 'string') {
            var usernameMatch = data.body.match(/(?:username|user|login)=([^&]+)/i);
            var passwordMatch = data.body.match(/(?:password|pass|pwd)=([^&]+)/i);
            
            if (usernameMatch || passwordMatch) {
                creds = {
                    type: 'Form Data',
                    username: usernameMatch ? decodeURIComponent(usernameMatch[1]) : 'unknown',
                    password: passwordMatch ? decodeURIComponent(passwordMatch[1]) : ''
                };
            }
        }
        
        return creds;
    }
    
    this.refreshMenu = function() 
    {
        redoMenu();
    };
    
    this.getHasWiFi = function() 
    {
        return hasWiFi;
    };
    
    this.setHasWiFi = function(wifi) 
    {
        hasWiFi = wifi;
        // Notify drawable to trigger redraw of connected links
        if (drawable) {
            drawable.notifyObservers();
        }
    };
    
    this.getHasEthernet = function() 
    {
        return hasEthernet;
    };
    
    this.setHasEthernet = function(ethernet) 
    {
        hasEthernet = ethernet;
    };
    
    this.getDeviceIcon = function() 
    {
        return deviceIcon;
    };
    
    this.setDeviceIcon = function(icon) 
    {
        deviceIcon = icon;
    };
    
    this.getConnectionType = function() 
    {
        return connectionType;
    };
    
    this.setConnectionType = function(type) 
    {
        connectionType = type;
        // Notify drawable to trigger redraw of connected links
        if (drawable) {
            drawable.notifyObservers();
        }
    };
    
    // Game Server methods
    this.getIsGameServer = function() {
        return isGameServer;
    };
    
    this.setIsGameServer = function(value) {
        isGameServer = value;
        if (drawable) {
            drawable.notifyObservers();
        }
        // Refresh the menu to show game server options
        if (menu) {
            redoMenu();
        }
    };
    
    this.getGamePort = function() {
        return gamePort;
    };
    
    this.setGamePort = function(port) {
        gamePort = port;
    };
    
    this.getGameType = function() {
        return gameType;
    };
    
    this.setGameType = function(type) {
        gameType = type;
    };
    
    this.getMaxPlayers = function() {
        return maxPlayers;
    };
    
    this.setMaxPlayers = function(max) {
        maxPlayers = max;
    };
    
    this.getCurrentPlayers = function() {
        return currentPlayers;
    };
    
    this.setServerName = function(name) {
        serverName = name;
    };
    
    this.getServerName = function() {
        return serverName;
    };
    
    this.getServerStatus = function() {
        return serverStatus;
    };
    
    this.setServerStatus = function(status) {
        serverStatus = status;
        if (drawable) {
            drawable.notifyObservers();
        }
        // Refresh the menu to update start/stop options
        if (menu && isGameServer) {
            redoMenu();
        }
    };
    
    this.addPlayer = function(playerName) {
        if (currentPlayers < maxPlayers) {
            connectedPlayers.push({
                name: playerName,
                connectTime: Date.now()
            });
            currentPlayers++;
            return true;
        }
        return false;
    };
    
    this.removePlayer = function(playerName) {
        var index = connectedPlayers.findIndex(function(p) { return p.name === playerName; });
        if (index !== -1) {
            connectedPlayers.splice(index, 1);
            currentPlayers--;
            return true;
        }
        return false;
    };
    
    // Game Client connection methods
    this.connectToGameServer = function(serverIP, serverPort, serverName, playerName) {
        connectedToGameServer = {
            serverIP: serverIP,
            serverPort: serverPort,
            serverName: serverName,
            playerName: playerName
        };
        gameConnectionTime = Date.now();
        
        if (drawable) {
            drawable.notifyObservers();
        }
        
        // Force complete menu recreation to ensure disconnect option appears
        if (menu) {
            var wasVisible = menu.getVisible();
            
            // Delete the old menu completely
            if (wasVisible) {
                menu.hide();
            }
            uimanager.deleteMenu(menu);
            
            // Create a brand new menu with position from drawable
            var rect = drawable.getRect();
            menu = new UIMenu(name, rect.x + rect.width, rect.y, false);
            addStaticMenu();
            uimanager.addMenu(menu);
            
            // Restore visibility if it was open
            if (wasVisible) {
                menu.show();
            }
        }
    };
    
    this.disconnectFromGameServer = function() {
        connectedToGameServer = null;
        gameConnectionTime = null;
        
        if (drawable) {
            drawable.notifyObservers();
        }
        
        // Force complete menu recreation to ensure disconnect option is removed
        if (menu) {
            var wasVisible = menu.getVisible();
            
            // Delete the old menu completely
            if (wasVisible) {
                menu.hide();
            }
            uimanager.deleteMenu(menu);
            
            // Create a brand new menu with position from drawable
            var rect = drawable.getRect();
            menu = new UIMenu(name, rect.x + rect.width, rect.y, false);
            addStaticMenu();
            uimanager.addMenu(menu);
            
            // Restore visibility if it was open
            if (wasVisible) {
                menu.show();
            }
        }
    };
    
    this.isConnectedToGameServer = function() {
        return connectedToGameServer !== null;
    };
    
    this.getGameServerConnection = function() {
        return connectedToGameServer;
    };
    
    this.getGameConnectionDuration = function() {
        if (gameConnectionTime) {
            var duration = Date.now() - gameConnectionTime;
            var minutes = Math.floor(duration / 60000);
            var seconds = Math.floor((duration % 60000) / 1000);
            return minutes + 'm ' + seconds + 's';
        }
        return null;
    };
    
    this.getConnectedPlayers = function() {
        return connectedPlayers;
    };

    // 802.1X Supplicant methods
    this.get802_1XEnabled = function() {
        return dot1xEnabled;
    };

    this.set802_1XEnabled = function(enabled) {
        dot1xEnabled = enabled;
        if (!enabled) {
            dot1xAuthState = "DISCONNECTED";
        }
    };

    this.get802_1XUsername = function() {
        return dot1xUsername;
    };

    this.set802_1XUsername = function(username) {
        dot1xUsername = username;
    };

    this.get802_1XPassword = function() {
        return dot1xPassword;
    };

    this.set802_1XPassword = function(password) {
        console.log('Setting 802.1X password for', name, ':', password ? '****' + password.slice(-2) : 'empty');
        dot1xPassword = password;
    };

    this.get802_1XAuthState = function() {
        return dot1xAuthState;
    };

    this.set802_1XAuthState = function(state) {
        dot1xAuthState = state;
        dot1xLastAuthTime = Date.now();
    };

    this.get802_1XAutoConnect = function() {
        return dot1xAutoConnect;
    };

    this.set802_1XAutoConnect = function(autoConnect) {
        dot1xAutoConnect = autoConnect;
    };

    // Attempt 802.1X authentication
    this.authenticate802_1X = function(switchId, portNum) {
        if (!dot1xEnabled || !dot1xUsername || !dot1xPassword) {
            console.log("802.1X not configured on host", name);
            return;
        }

        // Set state to authenticating
        dot1xAuthState = "AUTHENTICATING";

        // Get the switch
        var switchHost = network.getElement(switchId);
        if (!switchHost) {
            console.log("Switch not found");
            dot1xAuthState = "FAILED";
            return;
        }

        // Get switch's RADIUS client
        var switchRadiusClient = switchHost.getRADIUSClient();
        if (!switchRadiusClient || !switchRadiusClient.isEnabled()) {
            console.log("Switch does not have RADIUS configured");
            dot1xAuthState = "FAILED";
            return;
        }

        // Set network reference on the RADIUS client (critical for finding RADIUS server)
        if (switchRadiusClient.setNetwork && typeof network !== 'undefined') {
            switchRadiusClient.setNetwork(network);
        }

        // Get host's IP for logging
        var hostIP = "0.0.0.0";
        if (connectable) {
            var ipInfo = connectable.getIPInfo(0);
            if (ipInfo && ipInfo.getIPv4) {
                hostIP = ipInfo.getIPv4() || "0.0.0.0";
            }
        }

        // Authenticate via switch
        var self = this;
        switchRadiusClient.authenticateUser(
            dot1xUsername,
            dot1xPassword,
            portNum,
            hostIP,
            function(success, message) {
                if (success) {
                    self.set802_1XAuthState("AUTHENTICATED");
                    console.log("802.1X authentication succeeded for", name);
                    showToast("🔐 " + name + " authenticated successfully", "success");
                } else {
                    self.set802_1XAuthState("FAILED");
                    console.log("802.1X authentication failed for", name, ":", message);
                    showToast("🔒 " + name + " authentication failed: " + message, "error");
                }
            }
        );
    };

    // VLAN management methods (Phase 1)
    this.getVlanDatabase = function() {
        return vlanDatabase;
    };

    this.createVlan = function(vlanId, vlanName) {
        if (type !== "switch") return false;
        if (vlanId < 1 || vlanId > 4094) return false;
        if (vlanDatabase[vlanId]) return false; // Already exists

        vlanDatabase[vlanId] = {
            name: vlanName || ("VLAN" + vlanId),
            status: "active"
        };
        return true;
    };

    this.deleteVlan = function(vlanId) {
        if (type !== "switch") return false;
        if (vlanId === 1 || vlanId === "1") return false; // Cannot delete VLAN 1
        if (!vlanDatabase[vlanId]) return false; // Doesn't exist

        delete vlanDatabase[vlanId];
        return true;
    };

    this.renameVlan = function(vlanId, newName) {
        if (type !== "switch") return false;
        if (!vlanDatabase[vlanId]) return false;

        vlanDatabase[vlanId].name = newName;
        return true;
    };

    // ==================== ACL Methods ====================

    // Create a new ACL
    // Standard ACLs: 1-99 (source IP only)
    // Extended ACLs: 100-199 (source/dest IP, protocol, ports)
    this.createACL = function(aclNumber, aclName) {
        if (type !== "router") return false;
        // Allow both standard (1-99) and extended (100-199) ACLs
        if (aclNumber < 1 || aclNumber > 199) return false;

        acls[aclNumber] = {
            number: aclNumber,
            name: aclName || '',
            type: (aclNumber >= 100) ? 'extended' : 'standard',
            rules: []
        };
        return true;
    };

    // Check if an ACL is extended (100-199)
    this.isExtendedACL = function(aclNumber) {
        return aclNumber >= 100 && aclNumber <= 199;
    };

    // Get an ACL by number
    this.getACL = function(aclNumber) {
        return acls[aclNumber] || null;
    };

    // Get all ACLs
    this.getACLs = function() {
        return acls;
    };

    // Delete an ACL
    this.deleteACL = function(aclNumber) {
        if (type !== "router") return false;
        if (!acls[aclNumber]) return false;

        // Remove from any interfaces using this ACL
        for (var iface in interfaceACLs) {
            if (interfaceACLs[iface].IN === aclNumber) {
                interfaceACLs[iface].IN = null;
            }
            if (interfaceACLs[iface].OUT === aclNumber) {
                interfaceACLs[iface].OUT = null;
            }
        }

        delete acls[aclNumber];
        return true;
    };

    // Add a rule to an ACL
    this.addACLRule = function(aclNumber, rule) {
        if (type !== "router") return false;
        if (!acls[aclNumber]) return false;

        // Rule structure: { action: "PERMIT"|"DENY", source: "IP", wildcard: "wildcard" }
        acls[aclNumber].rules.push(rule);
        return true;
    };

    // Delete a rule from an ACL
    this.deleteACLRule = function(aclNumber, ruleIndex) {
        if (type !== "router") return false;
        if (!acls[aclNumber]) return false;
        if (ruleIndex < 0 || ruleIndex >= acls[aclNumber].rules.length) return false;

        acls[aclNumber].rules.splice(ruleIndex, 1);
        return true;
    };

    // Apply ACL to an interface
    this.applyACLToInterface = function(interfaceNum, direction, aclNumber) {
        if (type !== "router") return false;
        if (!acls[aclNumber]) return false;
        if (direction !== "IN" && direction !== "OUT") return false;

        if (!interfaceACLs[interfaceNum]) {
            interfaceACLs[interfaceNum] = { IN: null, OUT: null };
        }

        interfaceACLs[interfaceNum][direction] = aclNumber;
        return true;
    };

    // Remove ACL from an interface
    this.removeACLFromInterface = function(interfaceNum, direction) {
        if (type !== "router") return false;
        if (!interfaceACLs[interfaceNum]) return true;
        if (direction !== "IN" && direction !== "OUT") return false;

        interfaceACLs[interfaceNum][direction] = null;
        return true;
    };

    // Helper function to match IP against rule with wildcard
    function matchesIPWithWildcard(packetIP, ruleIP, wildcard) {
        // Handle "any" keyword
        if (ruleIP === 'any' || ruleIP === 'ANY' || wildcard === '255.255.255.255') {
            return true;
        }

        if (!packetIP || !ruleIP) return false;

        // Convert IPs to integers for wildcard matching
        var packetParts = packetIP.split('.').map(function(p) { return parseInt(p); });
        var ruleParts = ruleIP.split('.').map(function(p) { return parseInt(p); });
        var wildcardParts = (wildcard || '0.0.0.0').split('.').map(function(p) { return parseInt(p); });

        // Wildcard matching: 0 = must match, 255 = don't care
        for (var i = 0; i < 4; i++) {
            if (wildcardParts[i] === 0) {
                // Bit must match exactly
                if (packetParts[i] !== ruleParts[i]) {
                    return false;
                }
            } else if (wildcardParts[i] !== 255) {
                // Partial wildcard matching (more complex)
                var mask = 255 - wildcardParts[i];
                if ((packetParts[i] & mask) !== (ruleParts[i] & mask)) {
                    return false;
                }
            }
            // If wildcard is 255, we don't care about this octet
        }

        return true;
    }

    // Check if a packet matches a standard ACL rule (source IP only)
    function matchesACLRule(sourceIP, rule) {
        return matchesIPWithWildcard(sourceIP, rule.source, rule.wildcard);
    }

    // Check if a packet matches an extended ACL rule
    // Extended ACLs can filter on: protocol, source IP, dest IP, source port, dest port
    function matchesExtendedACLRule(packet, rule) {
        // Check protocol first (if specified)
        if (rule.protocol && rule.protocol !== 'ip' && rule.protocol !== 'IP' && rule.protocol !== 'any' && rule.protocol !== 'ANY') {
            var ruleProtocol = rule.protocol.toUpperCase();
            var packetProtocol = (packet.protocol || '').toUpperCase();

            // Handle protocol matching
            if (ruleProtocol !== packetProtocol) {
                // Special case: TCP/UDP both match for some protocols
                if (!(ruleProtocol === 'TCP' && packetProtocol === 'HTTP') &&
                    !(ruleProtocol === 'TCP' && packetProtocol === 'HTTPS') &&
                    !(ruleProtocol === 'UDP' && packetProtocol === 'DNS') &&
                    !(ruleProtocol === 'UDP' && packetProtocol === 'DHCP')) {
                    return false;
                }
            }
        }

        // Check source IP with wildcard
        if (!matchesIPWithWildcard(packet.sourceIP, rule.source, rule.wildcard)) {
            return false;
        }

        // Check destination IP with wildcard (extended ACL feature)
        if (rule.destIP && rule.destIP !== 'any' && rule.destIP !== 'ANY') {
            if (!matchesIPWithWildcard(packet.destIP, rule.destIP, rule.destWildcard || '0.0.0.0')) {
                return false;
            }
        }

        // Check source port (if specified)
        if (rule.srcPort && rule.srcPort !== 'any' && rule.srcPort !== 'ANY') {
            var ruleSrcPort = parseInt(rule.srcPort);
            var packetSrcPort = parseInt(packet.sourcePort);
            if (!isNaN(ruleSrcPort) && !isNaN(packetSrcPort) && ruleSrcPort !== packetSrcPort) {
                return false;
            }
        }

        // Check destination port (if specified)
        if (rule.dstPort && rule.dstPort !== 'any' && rule.dstPort !== 'ANY') {
            var ruleDstPort = parseInt(rule.dstPort);
            var packetDstPort = parseInt(packet.destPort);
            if (!isNaN(ruleDstPort) && !isNaN(packetDstPort) && ruleDstPort !== packetDstPort) {
                return false;
            }
        }

        // Check port operator for destination port (eq, gt, lt, range)
        if (rule.portOperator && rule.dstPort && rule.dstPort !== 'any') {
            var rPort = parseInt(rule.dstPort);
            var pPort = parseInt(packet.destPort);

            if (!isNaN(rPort) && !isNaN(pPort)) {
                switch (rule.portOperator) {
                    case 'eq': // Equal
                        if (pPort !== rPort) return false;
                        break;
                    case 'gt': // Greater than
                        if (pPort <= rPort) return false;
                        break;
                    case 'lt': // Less than
                        if (pPort >= rPort) return false;
                        break;
                    case 'neq': // Not equal
                        if (pPort === rPort) return false;
                        break;
                    case 'range': // Range (requires dstPortEnd)
                        var rPortEnd = parseInt(rule.dstPortEnd);
                        if (!isNaN(rPortEnd) && (pPort < rPort || pPort > rPortEnd)) return false;
                        break;
                }
            }
        }

        return true;
    }

    // Check packet against ACL
    // For standard ACLs: pass sourceIP as string
    // For extended ACLs: pass packet object { sourceIP, destIP, protocol, sourcePort, destPort }
    this.checkACL = function(interfaceNum, direction, packetOrSourceIP) {
        if (type !== "router") return { action: "PERMIT", reason: "Not a router" };
        if (!interfaceACLs[interfaceNum]) return { action: "PERMIT", reason: "No ACL on interface" };

        var aclNumber = interfaceACLs[interfaceNum][direction];
        if (!aclNumber) return { action: "PERMIT", reason: "No ACL in direction" };

        var acl = acls[aclNumber];
        if (!acl) return { action: "PERMIT", reason: "ACL not found" };

        // Determine if we're dealing with an extended ACL
        var isExtended = (aclNumber >= 100 && aclNumber <= 199);

        // Normalize packet data
        var packet;
        if (typeof packetOrSourceIP === 'string') {
            // Legacy call with just sourceIP
            packet = { sourceIP: packetOrSourceIP };
        } else {
            packet = packetOrSourceIP || {};
        }

        // Check each rule in order
        for (var i = 0; i < acl.rules.length; i++) {
            var rule = acl.rules[i];
            var matched = false;

            if (isExtended) {
                // Extended ACL - check all fields
                matched = matchesExtendedACLRule(packet, rule);
            } else {
                // Standard ACL - check source IP only
                matched = matchesACLRule(packet.sourceIP, rule);
            }

            if (matched) {
                // Rule matched!
                if (rule.action === "PERMIT") {
                    aclStatistics.permitted++;
                } else {
                    aclStatistics.denied++;
                }
                return {
                    action: rule.action,
                    rule: i + 1,
                    acl: aclNumber,
                    aclType: isExtended ? 'extended' : 'standard',
                    reason: "Matched ACL " + aclNumber + " rule " + (i + 1)
                };
            }
        }

        // No rule matched - implicit deny
        aclStatistics.denied++;
        return {
            action: "DENY",
            acl: aclNumber,
            aclType: isExtended ? 'extended' : 'standard',
            reason: "Implicit deny (end of ACL " + aclNumber + ")"
        };
    };

    // Get ACL statistics
    this.getACLStatistics = function() {
        if (type !== "router") return { permitted: 0, denied: 0, aclCount: 0, activeInterfaces: 0 };

        var activeInterfaces = 0;
        for (var iface in interfaceACLs) {
            if (interfaceACLs[iface].IN || interfaceACLs[iface].OUT) {
                activeInterfaces++;
            }
        }

        return {
            permitted: aclStatistics.permitted,
            denied: aclStatistics.denied,
            aclCount: Object.keys(acls).length,
            activeInterfaces: activeInterfaces
        };
    };

    // Reset ACL statistics
    this.resetACLStatistics = function() {
        aclStatistics.permitted = 0;
        aclStatistics.denied = 0;
    };

    // Get HTML for ACL list
    this.getACLListHTML = function() {
        if (Object.keys(acls).length === 0) {
            return '<p style="color:#9ca3af; font-style:italic; padding:20px; text-align:center;">No ACLs configured</p>';
        }

        var html = '<table style="width:100%; border-collapse:collapse; font-size:11px; color:#e4e4e7 !important; background:transparent !important;">';
        html += '<thead><tr style="background:#2a2d3e !important; border-bottom:1px solid #3a3d4e;">';
        html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">Number</th>';
        html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">Type</th>';
        html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">Name</th>';
        html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">Rules</th>';
        html += '<th style="padding:6px; text-align:center; color:#9ca3af !important; background:#2a2d3e !important;">Actions</th>';
        html += '</tr></thead><tbody style="background:transparent !important;">';

        for (var num in acls) {
            var acl = acls[num];
            var aclNum = parseInt(num);
            var isExtended = aclNum >= 100 && aclNum <= 199;
            var typeLabel = isExtended ? 'Extended' : 'Standard';
            var typeColor = isExtended ? '#f59e0b' : '#10b981';
            var typeBg = isExtended ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)';

            html += '<tr style="border-bottom:1px solid #2a2d3e; background:transparent !important;">';
            html += '<td style="padding:6px; color:#10b981 !important; font-weight:bold; background:transparent !important;">' + num + '</td>';
            html += '<td style="padding:6px; background:transparent !important;"><span style="color:' + typeColor + '; background:' + typeBg + '; padding:2px 6px; border-radius:3px; font-size:10px; font-weight:500;">' + typeLabel + '</span></td>';
            html += '<td style="padding:6px; color:#e4e4e7 !important; background:transparent !important;">' + (acl.name || '-') + '</td>';
            html += '<td style="padding:6px; color:#e4e4e7 !important; background:transparent !important;">' + acl.rules.length + ' rules</td>';
            html += '<td style="padding:6px; text-align:center; background:transparent !important;">';
            html += '<button onclick="showEditACL(' + this.id + ', ' + num + ')" style="background:#667eea !important; color:white !important; padding:2px 8px; border:none; border-radius:3px; cursor:pointer; margin-right:5px;">Edit</button>';
            html += '<button onclick="deleteACL(' + this.id + ', ' + num + ')" style="background:#ef4444 !important; color:white !important; padding:2px 8px; border:none; border-radius:3px; cursor:pointer;">Delete</button>';
            html += '</td></tr>';
        }

        html += '</tbody></table>';
        return html;
    };

    // Get HTML for ACL rules
    this.getACLRulesHTML = function(aclNumber) {
        var acl = acls[aclNumber];
        if (!acl || acl.rules.length === 0) {
            return '<p style="color:#9ca3af; font-style:italic; padding:20px; text-align:center;">No rules configured</p>';
        }

        var aclNum = parseInt(aclNumber);
        var isExtended = aclNum >= 100 && aclNum <= 199;

        var html = '<table style="width:100%; border-collapse:collapse; font-size:11px; color:#e4e4e7 !important; background:transparent !important;">';
        html += '<thead><tr style="background:#2a2d3e !important; border-bottom:1px solid #3a3d4e;">';
        html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">#</th>';
        html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">Action</th>';

        if (isExtended) {
            // Extended ACL headers
            html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">Protocol</th>';
            html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">Source</th>';
            html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">Destination</th>';
            html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">Port</th>';
        } else {
            // Standard ACL headers
            html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">Source</th>';
            html += '<th style="padding:6px; text-align:left; color:#9ca3af !important; background:#2a2d3e !important;">Wildcard</th>';
        }

        html += '<th style="padding:6px; text-align:center; color:#9ca3af !important; background:#2a2d3e !important;">Del</th>';
        html += '</tr></thead><tbody style="background:transparent !important;">';

        for (var i = 0; i < acl.rules.length; i++) {
            var rule = acl.rules[i];
            var actionColor = rule.action === 'PERMIT' ? '#10b981' : '#ef4444';

            html += '<tr style="border-bottom:1px solid #2a2d3e; background:transparent !important;">';
            html += '<td style="padding:6px; color:#e4e4e7 !important; background:transparent !important;">' + (i + 1) + '</td>';
            html += '<td style="padding:6px; color:' + actionColor + ' !important; font-weight:bold; background:transparent !important;">' + rule.action + '</td>';

            if (isExtended) {
                // Extended ACL fields
                var protocol = rule.protocol || 'ip';
                var protocolColor = '#667eea';
                if (protocol.toUpperCase() === 'TCP') protocolColor = '#10b981';
                else if (protocol.toUpperCase() === 'UDP') protocolColor = '#f59e0b';
                else if (protocol.toUpperCase() === 'ICMP') protocolColor = '#ef4444';

                // Source display
                var srcDisplay = rule.source || 'any';
                if (rule.wildcard && rule.wildcard !== '0.0.0.0') {
                    srcDisplay += ' ' + rule.wildcard;
                }

                // Destination display
                var dstDisplay = rule.destIP || 'any';
                if (rule.destWildcard && rule.destWildcard !== '0.0.0.0') {
                    dstDisplay += ' ' + rule.destWildcard;
                }

                // Port display
                var portDisplay = '-';
                if (rule.dstPort && rule.dstPort !== 'any') {
                    var operator = rule.portOperator || 'eq';
                    portDisplay = operator + ' ' + rule.dstPort;
                    if (rule.portOperator === 'range' && rule.dstPortEnd) {
                        portDisplay += '-' + rule.dstPortEnd;
                    }
                }

                html += '<td style="padding:6px; color:' + protocolColor + ' !important; font-weight:500; background:transparent !important;">' + protocol.toUpperCase() + '</td>';
                html += '<td style="padding:6px; font-family:monospace; font-size:10px; color:#e4e4e7 !important; background:transparent !important;">' + srcDisplay + '</td>';
                html += '<td style="padding:6px; font-family:monospace; font-size:10px; color:#e4e4e7 !important; background:transparent !important;">' + dstDisplay + '</td>';
                html += '<td style="padding:6px; font-family:monospace; font-size:10px; color:#e4e4e7 !important; background:transparent !important;">' + portDisplay + '</td>';
            } else {
                // Standard ACL fields
                html += '<td style="padding:6px; font-family:monospace; color:#e4e4e7 !important; background:transparent !important;">' + rule.source + '</td>';
                html += '<td style="padding:6px; font-family:monospace; color:#e4e4e7 !important; background:transparent !important;">' + rule.wildcard + '</td>';
            }

            html += '<td style="padding:6px; text-align:center; background:transparent !important;">';
            html += '<button onclick="deleteACLRule(' + this.id + ', ' + aclNumber + ', ' + i + ')" style="background:#ef4444 !important; color:white !important; padding:2px 6px; border:none; border-radius:3px; cursor:pointer;">×</button>';
            html += '</td></tr>';
        }

        // Show implicit deny
        html += '<tr style="background:#2a1a1a !important;">';
        html += '<td style="padding:6px; color:#6b7280 !important; font-style:italic; background:#2a1a1a !important;">*</td>';
        html += '<td style="padding:6px; color:#ef4444 !important; font-weight:bold; font-style:italic; background:#2a1a1a !important;">DENY</td>';

        if (isExtended) {
            html += '<td style="padding:6px; color:#6b7280 !important; font-style:italic; background:#2a1a1a !important;">ip</td>';
            html += '<td style="padding:6px; color:#6b7280 !important; font-style:italic; background:#2a1a1a !important;">any</td>';
            html += '<td style="padding:6px; color:#6b7280 !important; font-style:italic; background:#2a1a1a !important;">any</td>';
            html += '<td style="padding:6px; color:#6b7280 !important; font-style:italic; background:#2a1a1a !important;">-</td>';
        } else {
            html += '<td style="padding:6px; font-family:monospace; color:#6b7280 !important; font-style:italic; background:#2a1a1a !important;">any</td>';
            html += '<td style="padding:6px; font-family:monospace; color:#6b7280 !important; font-style:italic; background:#2a1a1a !important;">255.255.255.255</td>';
        }

        html += '<td style="padding:6px; text-align:center; color:#6b7280 !important; font-style:italic; background:#2a1a1a !important;">(implicit)</td>';
        html += '</tr>';

        html += '</tbody></table>';
        return html;
    };

    // Get HTML for interface ACL assignments
    this.getInterfaceACLHTML = function() {
        var hasAssignments = false;
        for (var iface in interfaceACLs) {
            if (interfaceACLs[iface].IN || interfaceACLs[iface].OUT) {
                hasAssignments = true;
                break;
            }
        }

        if (!hasAssignments) {
            return '<p style="color:#9ca3af; font-style:italic; padding:20px; text-align:center;">No ACLs applied to interfaces</p>';
        }

        var html = '<table style="width:100%; border-collapse:collapse; font-size:11px;color:#e4e4e7 !important;">';
        html += '<thead><tr style="background:#2a2d3e;border-bottom:1px solid #3a3d4e;">';
        html += '<th style="padding:6px; text-align:left;color:#9ca3af !important;">Interface</th>';
        html += '<th style="padding:6px; text-align:left;color:#9ca3af !important;">IP Address</th>';
        html += '<th style="padding:6px; text-align:left;color:#9ca3af !important;">Inbound ACL</th>';
        html += '<th style="padding:6px; text-align:left;color:#9ca3af !important;">Outbound ACL</th>';
        html += '</tr></thead><tbody>';

        for (var i = 0; i < connectable.getConnectorNumber(); i++) {
            var ipInfo = connectable.getIPInfo(i);
            var ip = ipInfo ? ipInfo.getIPv4() : 'No IP';
            var inACL = interfaceACLs[i] ? interfaceACLs[i].IN : null;
            var outACL = interfaceACLs[i] ? interfaceACLs[i].OUT : null;

            if (inACL || outACL) {
                html += '<tr style="border-bottom:1px solid #2a2d3e;">';
                html += '<td style="padding:6px;color:#e4e4e7 !important;">Interface ' + i + '</td>';
                html += '<td style="padding:6px;font-family:monospace;color:#e4e4e7 !important;">' + ip + '</td>';
                html += '<td style="padding:6px;color:' + (inACL ? '#10b981' : '#6b7280') + ' !important;">' + (inACL || '-') + '</td>';
                html += '<td style="padding:6px;color:' + (outACL ? '#667eea' : '#6b7280') + ' !important;">' + (outACL || '-') + '</td>';
                html += '</tr>';
            }
        }

        html += '</tbody></table>';
        return html;
    };

    init();
};
