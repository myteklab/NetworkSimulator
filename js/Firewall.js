/*
 * This file is part of the Education Network Simulator project and covered
 * by GPLv3 license. See full terms in the LICENSE file at the root folder
 * or at http://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Firewall Component - Phase 1 Core Implementation
 * Provides packet filtering and network security simulation
 * 
 * (c) 2025 - NetworkSimulator Firewall Module
 */

// UI Functions for Firewall Configuration
function showFirewallConfig(id)
{
    createBkDiv();
    createFirewallConfigDiv(id);
}

function createFirewallConfigDiv(id)
{
    var firewall = network.getElement(id);
    
    var innerHTML = '<div style="padding:20px;background:#1a1d2e;color:#e4e4e7;">';
    
    // Mode selector
    innerHTML += '<div style="margin-bottom:20px; padding:15px; background:#2a2d3e; border:1px solid #3a3d4e; border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#9ca3af; font-weight:600;">Firewall Mode</h4>';
    innerHTML += '<label style="margin-right:20px;color:#e4e4e7;cursor:pointer;"><input type="radio" name="fwmode" value="MONITOR" ' + 
                 (firewall.getMode() === 'MONITOR' ? 'checked' : '') + 
                 ' onchange="updateFirewallMode(' + id + ', this.value)" style="margin-right:5px;"> Monitor (Log Only)</label>';
    innerHTML += '<label style="color:#e4e4e7;cursor:pointer;"><input type="radio" name="fwmode" value="ENFORCE" ' + 
                 (firewall.getMode() === 'ENFORCE' ? 'checked' : '') + 
                 ' onchange="updateFirewallMode(' + id + ', this.value)" style="margin-right:5px;"> Enforce (Block Traffic)</label>';
    innerHTML += '<p style="margin:10px 0 0 0; font-size:12px; color:#9ca3af;">';
    innerHTML += firewall.getMode() === 'MONITOR' ? 
                 '⚠️ Monitor mode: All traffic is allowed but logged' : 
                 '🔒 Enforce mode: Traffic is filtered according to rules';
    innerHTML += '</p>';
    innerHTML += '</div>';
    
    // Default policy
    innerHTML += '<div style="margin-bottom:20px; padding:15px; background:#2a2d3e; border:1px solid #3a3d4e; border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#9ca3af; font-weight:600;">Default Policy</h4>';
    innerHTML += '<label style="margin-right:20px;color:#e4e4e7;cursor:pointer;"><input type="radio" name="fwpolicy" value="ALLOW" ' + 
                 (firewall.getDefaultPolicy() === 'ALLOW' ? 'checked' : '') + 
                 ' onchange="updateFirewallPolicy(' + id + ', this.value)" style="margin-right:5px;"> Allow All</label>';
    innerHTML += '<label style="color:#e4e4e7;cursor:pointer;"><input type="radio" name="fwpolicy" value="DENY" ' + 
                 (firewall.getDefaultPolicy() === 'DENY' ? 'checked' : '') + 
                 ' onchange="updateFirewallPolicy(' + id + ', this.value)" style="margin-right:5px;"> Deny All</label>';
    innerHTML += '<p style="margin:10px 0 0 0; font-size:12px; color:#9ca3af;">Default action for traffic that doesn\'t match any rule</p>';
    innerHTML += '</div>';
    
    // Rules table
    innerHTML += '<div style="margin-bottom:20px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#9ca3af; font-weight:600;">Firewall Rules</h4>';
    innerHTML += '<div style="max-height:250px; overflow-y:auto; background:#16213e; border:1px solid #2a2d3e; border-radius:6px; padding:10px;">';
    innerHTML += firewall.getRulesHTML();
    innerHTML += '</div>';
    innerHTML += '</div>';
    
    // DoS Protection Settings
    innerHTML += '<div style="margin-bottom:20px; padding:15px; background:#2a2d3e; border:1px solid #ef4444; border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#ef4444; font-weight:600;">🛡️ DoS Protection</h4>';
    innerHTML += '<label style="color:#e4e4e7;cursor:pointer;">';
    innerHTML += '<input type="checkbox" id="dosEnabled" ' + (firewall.getDoSDetection().enabled ? 'checked' : '') + 
                 ' onchange="updateDoSProtection(' + id + ', this.checked)" style="margin-right:5px;"> Enable DoS Attack Detection</label>';
    innerHTML += '<div style="margin-top:10px; padding:10px; background:#1a1d2e; border-radius:6px;">';
    innerHTML += '<p style="margin:3px 0; font-size:11px; color:#9ca3af;">SYN Flood Threshold: <strong>' + firewall.getDoSDetection().thresholds.synFloodRate + '</strong> packets/sec</p>';
    innerHTML += '<p style="margin:3px 0; font-size:11px; color:#9ca3af;">HTTP Flood Threshold: <strong>' + firewall.getDoSDetection().thresholds.httpFloodRate + '</strong> requests/sec</p>';
    innerHTML += '<p style="margin:3px 0; font-size:11px; color:#9ca3af;">ICMP Flood Threshold: <strong>' + firewall.getDoSDetection().thresholds.icmpFloodRate + '</strong> packets/sec</p>';
    innerHTML += '<p style="margin:3px 0; font-size:11px; color:#9ca3af;">Connection Limit: <strong>' + firewall.getDoSDetection().thresholds.connectionLimit + '</strong> per IP</p>';
    innerHTML += '</div>';
    innerHTML += '</div>';
    
    // Statistics
    innerHTML += '<div style="padding:15px; background:#16213e; border:1px solid #10b981; border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#10b981; font-weight:600;">Statistics</h4>';
    var stats = firewall.getStatistics();
    innerHTML += '<p style="margin:5px 0; font-size:12px; color:#e4e4e7;">✅ Allowed: ' + stats.allowed + ' packets</p>';
    innerHTML += '<p style="margin:5px 0; font-size:12px; color:#e4e4e7;">🚫 Blocked: ' + stats.blocked + ' packets</p>';
    if (stats.dosAttacksDetected > 0) {
        innerHTML += '<p style="margin:5px 0; font-size:12px; color:#ef4444;">⚠️ DoS Attacks Detected: ' + stats.dosAttacksDetected + '</p>';
        innerHTML += '<p style="margin:5px 0; font-size:12px; color:#ef4444;">🛡️ DoS Packets Dropped: ' + stats.dosPacketsDropped + '</p>';
    }
    innerHTML += '<p style="margin:5px 0; font-size:12px; color:#e4e4e7;">📋 Total Rules: ' + stats.ruleCount + '</p>';
    innerHTML += '</div>';
    
    innerHTML += '</div>';
    
    var controls = '<button onclick="showAddFirewallRule(' + id + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;font-weight:500;">Add Rule</button>';
    controls += '<button onclick="viewFirewallLogs(' + id + ')" style="background:#667eea; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;font-weight:500;">View Logs</button>';
    controls += '<button onclick="resetFirewallStats(' + id + ')" style="background:#ef4444; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;font-weight:500;">Reset Stats</button>';
    controls += '<button onclick="closeFirewallConfig()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;font-weight:500;">Close</button>';
    
    var w = new UIWindow('divfirewallconfig', 'Firewall Configuration - ' + firewall.getName(), 700, 600, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function updateFirewallMode(id, mode)
{
    var firewall = network.getElement(id);
    firewall.setMode(mode);
    // Refresh the display
    uimanager.getWindow("divfirewallconfig").dispose();
    createFirewallConfigDiv(id);
}

function updateFirewallPolicy(id, policy)
{
    var firewall = network.getElement(id);
    firewall.setDefaultPolicy(policy);
}

function closeFirewallConfig()
{
    uimanager.getWindow("divfirewallconfig").dispose();
    removeBodyDiv('divbk');
}

function updateDoSProtection(id, enabled)
{
    var firewall = network.getElement(id);
    firewall.setDoSProtection(enabled);
}

function showAddFirewallRule(id)
{
    var firewall = network.getElement(id);
    createBkDiv();
    
    var innerHTML = '<div style="padding:20px;background:#1a1d2e;color:#e4e4e7;">';
    innerHTML += '<h4 style="margin:0 0 15px 0; color:#9ca3af;font-weight:600;">Add Firewall Rule</h4>';
    
    // Action selector
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Action:</label>';
    innerHTML += '<select id="rule_action" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
    innerHTML += '<option value="ALLOW">ALLOW</option>';
    innerHTML += '<option value="DENY">DENY</option>';
    innerHTML += '</select>';
    innerHTML += '</div>';
    
    // Direction selector
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Direction:</label>';
    innerHTML += '<select id="rule_direction" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
    innerHTML += '<option value="ANY">ANY</option>';
    innerHTML += '<option value="INBOUND">INBOUND</option>';
    innerHTML += '<option value="OUTBOUND">OUTBOUND</option>';
    innerHTML += '</select>';
    innerHTML += '</div>';
    
    // Protocol selector
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Protocol:</label>';
    innerHTML += '<select id="rule_protocol" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
    innerHTML += '<option value="ANY">ANY</option>';
    innerHTML += '<option value="TCP">TCP</option>';
    innerHTML += '<option value="UDP">UDP</option>';
    innerHTML += '<option value="ICMP">ICMP</option>';
    innerHTML += '</select>';
    innerHTML += '</div>';
    
    // Source IP
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Source IP:</label>';
    innerHTML += '<input type="text" id="rule_source_ip" value="ANY" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;" placeholder="IP address or ANY">';
    innerHTML += '</div>';
    
    // Destination IP
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Destination IP:</label>';
    innerHTML += '<input type="text" id="rule_dest_ip" value="ANY" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;" placeholder="IP address or ANY">';
    innerHTML += '</div>';
    
    // Source Port
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Source Port:</label>';
    innerHTML += '<input type="text" id="rule_source_port" value="ANY" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;" placeholder="Port number or ANY">';
    innerHTML += '</div>';
    
    // Destination Port
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Destination Port:</label>';
    innerHTML += '<input type="text" id="rule_dest_port" value="ANY" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;" placeholder="Port number or ANY">';
    innerHTML += '</div>';
    
    // Description
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Description:</label>';
    innerHTML += '<input type="text" id="rule_description" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;" placeholder="Rule description">';
    innerHTML += '</div>';
    
    innerHTML += '</div>';
    
    var controls = '<button onclick="saveFirewallRule(' + id + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;font-weight:500;">Add Rule</button>';
    controls += '<button onclick="cancelAddFirewallRule()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;font-weight:500;">Cancel</button>';
    
    var w = new UIWindow('divaddfirewallrule', 'Add Firewall Rule', 500, 600, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function saveFirewallRule(id)
{
    var firewall = network.getElement(id);
    
    var rule = {
        action: document.getElementById('rule_action').value,
        direction: document.getElementById('rule_direction').value,
        protocol: document.getElementById('rule_protocol').value,
        sourceIP: document.getElementById('rule_source_ip').value || "ANY",
        destIP: document.getElementById('rule_dest_ip').value || "ANY",
        sourcePort: document.getElementById('rule_source_port').value || "ANY",
        destPort: document.getElementById('rule_dest_port').value || "ANY",
        enabled: true,
        description: document.getElementById('rule_description').value || ""
    };
    
    firewall.addRule(rule);
    
    // Close the add rule dialog
    uimanager.getWindow("divaddfirewallrule").dispose();
    removeBodyDiv('divbk');
    
    // Refresh the firewall config dialog to show the new rule
    uimanager.getWindow("divfirewallconfig").dispose();
    createFirewallConfigDiv(id);
}

function cancelAddFirewallRule()
{
    uimanager.getWindow("divaddfirewallrule").dispose();
    removeBodyDiv('divbk');
}

function deleteFirewallRule(firewallId, ruleIndex)
{
    var firewall = network.getElement(firewallId);
    if (confirm("Are you sure you want to delete this rule?")) {
        firewall.deleteRule(ruleIndex);
        // Refresh the firewall config dialog to reflect the deletion
        uimanager.getWindow("divfirewallconfig").dispose();
        createFirewallConfigDiv(firewallId);
    }
}

function viewFirewallLogs(id)
{
    var firewall = network.getElement(id);
    var logs = firewall.getLogs();
    
    createBkDiv();
    
    var innerHTML = '<div style="padding:20px;">';
    innerHTML += '<h4 style="margin:0 0 15px 0; color:#667eea;">Firewall Logs (Last ' + logs.length + ' entries)</h4>';
    
    if (logs.length === 0) {
        innerHTML += '<p style="color:#666; font-style:italic;">No log entries yet.</p>';
    } else {
        innerHTML += '<div style="max-height:400px; overflow-y:auto; background:#f8f9fa; border-radius:8px; padding:10px;">';
        innerHTML += '<table style="width:100%; font-size:11px; font-family:monospace;">';
        innerHTML += '<thead><tr style="background:#e5e7eb;">';
        innerHTML += '<th style="padding:5px; text-align:left;">Time</th>';
        innerHTML += '<th style="padding:5px; text-align:left;">Type</th>';
        innerHTML += '<th style="padding:5px; text-align:left;">Message</th>';
        innerHTML += '</tr></thead>';
        innerHTML += '<tbody>';
        
        for (var i = 0; i < logs.length; i++) {
            var log = logs[i];
            var typeColor = '#333';
            if (log.type === 'ALLOW') typeColor = '#10b981';
            else if (log.type === 'BLOCK') typeColor = '#ef4444';
            else if (log.type === 'MONITOR') typeColor = '#f59e0b';
            
            var time = new Date(log.timestamp).toLocaleTimeString();
            
            innerHTML += '<tr style="border-bottom:1px solid #e5e7eb;">';
            innerHTML += '<td style="padding:5px;">' + time + '</td>';
            innerHTML += '<td style="padding:5px; color:' + typeColor + '; font-weight:bold;">' + log.type + '</td>';
            innerHTML += '<td style="padding:5px;">' + log.message + '</td>';
            innerHTML += '</tr>';
        }
        
        innerHTML += '</tbody></table>';
        innerHTML += '</div>';
    }
    
    innerHTML += '</div>';
    
    var controls = '<button onclick="clearFirewallLogs(' + id + ')" style="background:#ef4444; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Clear Logs</button>';
    controls += '<button onclick="closeFirewallLogs()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Close</button>';
    
    var w = new UIWindow('divfirewalllogs', 'Firewall Logs - ' + firewall.getName(), 700, 500, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function clearFirewallLogs(id)
{
    var firewall = network.getElement(id);
    if (confirm("Clear all firewall logs?")) {
        firewall.clearLogs();
        // Refresh the display
        uimanager.getWindow("divfirewalllogs").dispose();
        viewFirewallLogs(id);
    }
}

function closeFirewallLogs()
{
    uimanager.getWindow("divfirewalllogs").dispose();
    removeBodyDiv('divbk');
}

function resetFirewallStats(id)
{
    var firewall = network.getElement(id);
    if (confirm("Reset all firewall statistics?")) {
        firewall.resetStatistics();
        // Refresh the display
        uimanager.getWindow("divfirewallconfig").dispose();
        createFirewallConfigDiv(id);
    }
}

// Port Forwarding UI Functions
function showPortForwarding(id)
{
    createBkDiv();
    createPortForwardingDiv(id);
}

function createPortForwardingDiv(id)
{
    var firewall = network.getElement(id);
    
    var innerHTML = '<div style="padding:20px;background:#1a1d2e;color:#e4e4e7;">';
    
    // Introduction
    innerHTML += '<div style="margin-bottom:20px; padding:15px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 8px 0; color:white; font-weight:600;">🌐 Port Forwarding Configuration</h4>';
    innerHTML += '<p style="margin:0; font-size:12px; color:#e4e4f7;">Forward external ports to internal game servers and services</p>';
    innerHTML += '</div>';
    
    // Quick Setup for Game Servers
    innerHTML += '<div style="margin-bottom:20px; padding:15px; background:#2a2d3e; border:1px solid #3a3d4e; border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#9ca3af; font-weight:600;">Quick Setup - Detect Game Servers</h4>';
    innerHTML += '<button onclick="detectGameServers(' + id + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer; font-weight:500; margin-right:10px;">🔍 Scan Network</button>';
    innerHTML += '<span style="font-size:12px; color:#6b7280;">Automatically find game servers on your network</span>';
    innerHTML += '</div>';
    
    // Current Port Forwarding Rules
    innerHTML += '<div style="margin-bottom:20px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#9ca3af; font-weight:600;">Active Port Forwarding Rules</h4>';
    innerHTML += '<div style="max-height:250px; overflow-y:auto; background:#16213e; border:1px solid #2a2d3e; border-radius:6px; padding:10px;">';
    innerHTML += firewall.getPortForwardHTML();
    innerHTML += '</div>';
    innerHTML += '</div>';
    
    // NAT Table Preview (visual representation)
    innerHTML += '<div style="padding:15px; background:#16213e; border:1px solid #10b981; border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#10b981; font-weight:600;">How Port Forwarding Works</h4>';
    innerHTML += '<div style="font-size:11px; color:#9ca3af; line-height:1.6;">';
    innerHTML += '<p style="margin:5px 0;">1. 🌍 External client connects to your public IP on forwarded port</p>';
    innerHTML += '<p style="margin:5px 0;">2. 🔄 Firewall/Router translates the destination to internal IP:Port</p>';
    innerHTML += '<p style="margin:5px 0;">3. 🎮 Game server receives the connection on its local port</p>';
    innerHTML += '<p style="margin:5px 0;">4. ↩️ Response packets are automatically translated back</p>';
    innerHTML += '</div>';
    innerHTML += '</div>';
    
    innerHTML += '</div>';
    
    var controls = '<button onclick="showAddPortForward(' + id + ')" style="background:#667eea; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer; font-weight:500;">➕ Add Rule</button>';
    controls += '<button onclick="testPortForward(' + id + ')" style="background:#f59e0b; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer; font-weight:500;">🧪 Test Connection</button>';
    controls += '<button onclick="closePortForwarding()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer; font-weight:500;">Close</button>';
    
    var w = new UIWindow('divportforwarding', '🔀 Port Forwarding - ' + firewall.getName(), 700, 600, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function showAddPortForward(id)
{
    var firewall = network.getElement(id);
    createBkDiv();
    
    var innerHTML = '<div style="padding:20px;background:#1a1d2e;color:#e4e4e7;">';
    innerHTML += '<h4 style="margin:0 0 15px 0; color:#9ca3af;font-weight:600;">➕ Add Port Forwarding Rule</h4>';
    
    // External Port
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">External Port:</label>';
    innerHTML += '<input type="number" id="pf_external_port" min="1" max="65535" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;" placeholder="25565">';
    innerHTML += '<small style="color:#6b7280; font-size:11px;">Port that external clients will connect to</small>';
    innerHTML += '</div>';
    
    // Internal IP
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Internal IP Address:</label>';
    innerHTML += '<input type="text" id="pf_internal_ip" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;" placeholder="192.168.1.100">';
    innerHTML += '<small style="color:#6b7280; font-size:11px;">IP address of the internal server</small>';
    innerHTML += '</div>';
    
    // Internal Port
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Internal Port:</label>';
    innerHTML += '<input type="number" id="pf_internal_port" min="1" max="65535" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;" placeholder="25565">';
    innerHTML += '<small style="color:#6b7280; font-size:11px;">Port on the internal server (often same as external)</small>';
    innerHTML += '</div>';
    
    // Protocol
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Protocol:</label>';
    innerHTML += '<select id="pf_protocol" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
    innerHTML += '<option value="TCP/UDP">TCP/UDP (Both)</option>';
    innerHTML += '<option value="TCP">TCP Only</option>';
    innerHTML += '<option value="UDP">UDP Only</option>';
    innerHTML += '</select>';
    innerHTML += '</div>';
    
    // Description
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Description:</label>';
    innerHTML += '<input type="text" id="pf_description" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;" placeholder="Minecraft Server">';
    innerHTML += '</div>';
    
    // Common Presets
    innerHTML += '<div style="margin-top:20px; padding:15px; background:#2a2d3e; border:1px solid #3a3d4e; border-radius:8px;">';
    innerHTML += '<h5 style="margin:0 0 10px 0; color:#9ca3af;">Quick Presets:</h5>';
    innerHTML += '<div style="display:flex; flex-wrap:wrap; gap:8px;">';
    innerHTML += '<button onclick="setPortForwardPreset(\'minecraft\')" style="background:#16213e; color:#10b981; padding:6px 12px; border:1px solid #3a3d4e; border-radius:4px; cursor:pointer; font-size:11px;">🎮 Minecraft</button>';
    innerHTML += '<button onclick="setPortForwardPreset(\'csgo\')" style="background:#16213e; color:#10b981; padding:6px 12px; border:1px solid #3a3d4e; border-radius:4px; cursor:pointer; font-size:11px;">🔫 CS:GO</button>';
    innerHTML += '<button onclick="setPortForwardPreset(\'terraria\')" style="background:#16213e; color:#10b981; padding:6px 12px; border:1px solid #3a3d4e; border-radius:4px; cursor:pointer; font-size:11px;">🌳 Terraria</button>';
    innerHTML += '<button onclick="setPortForwardPreset(\'web\')" style="background:#16213e; color:#10b981; padding:6px 12px; border:1px solid #3a3d4e; border-radius:4px; cursor:pointer; font-size:11px;">🌐 Web Server</button>';
    innerHTML += '</div>';
    innerHTML += '</div>';
    
    innerHTML += '</div>';
    
    var controls = '<button onclick="savePortForwardRule(' + id + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer; font-weight:500;">💾 Save Rule</button>';
    controls += '<button onclick="cancelAddPortForward()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer; font-weight:500;">Cancel</button>';
    
    var w = new UIWindow('divaddportforward', 'Add Port Forwarding Rule', 500, 550, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function setPortForwardPreset(type)
{
    var presets = {
        'minecraft': { port: 25565, protocol: 'TCP/UDP', desc: 'Minecraft Server' },
        'csgo': { port: 27015, protocol: 'TCP/UDP', desc: 'CS:GO Server' },
        'terraria': { port: 7777, protocol: 'TCP', desc: 'Terraria Server' },
        'web': { port: 80, protocol: 'TCP', desc: 'Web Server (HTTP)' }
    };
    
    if (presets[type]) {
        document.getElementById('pf_external_port').value = presets[type].port;
        document.getElementById('pf_internal_port').value = presets[type].port;
        document.getElementById('pf_protocol').value = presets[type].protocol;
        document.getElementById('pf_description').value = presets[type].desc;
    }
}

function savePortForwardRule(id)
{
    var firewall = network.getElement(id);
    
    var rule = {
        externalPort: parseInt(document.getElementById('pf_external_port').value),
        internalIP: document.getElementById('pf_internal_ip').value,
        internalPort: parseInt(document.getElementById('pf_internal_port').value),
        protocol: document.getElementById('pf_protocol').value,
        description: document.getElementById('pf_description').value || "",
        enabled: true
    };
    
    // Validate
    if (!rule.externalPort || rule.externalPort < 1 || rule.externalPort > 65535) {
        alert('Please enter a valid external port (1-65535)');
        return;
    }
    
    if (!rule.internalIP || !rule.internalIP.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
        alert('Please enter a valid internal IP address');
        return;
    }
    
    if (!rule.internalPort || rule.internalPort < 1 || rule.internalPort > 65535) {
        alert('Please enter a valid internal port (1-65535)');
        return;
    }
    
    firewall.addPortForwardRule(rule);
    
    // Close the add dialog
    uimanager.getWindow("divaddportforward").dispose();
    removeBodyDiv('divbk');
    
    // Refresh the port forwarding display
    uimanager.getWindow("divportforwarding").dispose();
    createPortForwardingDiv(id);
}

function cancelAddPortForward()
{
    uimanager.getWindow("divaddportforward").dispose();
    removeBodyDiv('divbk');
}

function closePortForwarding()
{
    uimanager.getWindow("divportforwarding").dispose();
    removeBodyDiv('divbk');
}

function deletePortForwardRule(firewallId, ruleIndex)
{
    var firewall = network.getElement(firewallId);
    if (confirm("Are you sure you want to delete this port forwarding rule?")) {
        firewall.deletePortForwardRule(ruleIndex);
        // Refresh the display
        uimanager.getWindow("divportforwarding").dispose();
        createPortForwardingDiv(firewallId);
    }
}

function detectGameServers(firewallId)
{
    // Find all game servers in the network
    var gameServers = [];
    var elements = network.getAllElements();
    
    for (var id in elements) {
        var element = elements[id];
        if (element && element.getIsGameServer && element.getIsGameServer()) {
            gameServers.push(element);
        }
    }
    
    if (gameServers.length === 0) {
        alert('No game servers found in the network. Add a game server first!');
        return;
    }
    
    // Show selection dialog
    var html = '<div style="padding:20px;background:#1a1d2e;color:#e4e4e7;">';
    html += '<h4 style="margin:0 0 15px 0; color:#9ca3af;">🎮 Game Servers Found</h4>';
    html += '<p style="margin-bottom:15px; font-size:12px; color:#6b7280;">Select a server to create port forwarding rule:</p>';
    
    for (var i = 0; i < gameServers.length; i++) {
        var server = gameServers[i];
        var serverIP = null;
        
        // Get the server's IP address
        if (server.getConnectable) {
            var connectable = server.getConnectable();
            if (connectable && connectable.getIPInfo) {
                var ipInfo = connectable.getIPInfo(0);
                if (ipInfo && ipInfo.getIPv4) {
                    serverIP = ipInfo.getIPv4();
                }
            }
        }
        
        if (serverIP) {
            html += '<div style="padding:10px; margin-bottom:10px; background:#2a2d3e; border:1px solid #3a3d4e; border-radius:6px; cursor:pointer;" ';
            html += 'onclick="createPortForwardForServer(' + firewallId + ', \'' + serverIP + '\', ' + server.getGamePort() + ', \'' + server.getGameType() + '\', \'' + server.getServerName().replace(/'/g, "\\'") + '\')">';
            html += '<strong style="color:#10b981;">🎮 ' + server.getServerName() + '</strong><br>';
            html += '<small style="color:#9ca3af;">Type: ' + server.getGameType() + ' | IP: ' + serverIP + ' | Port: ' + server.getGamePort() + '</small>';
            html += '</div>';
        }
    }
    
    html += '</div>';
    
    var w = new UIWindow('divgameserverselect', 'Select Game Server', 450, 400, true, 1.0);
    w.setContent(html);
    w.setControls('<button onclick="closeGameServerSelect()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Cancel</button>');
    w.render();
}

function createPortForwardForServer(firewallId, serverIP, serverPort, gameType, serverName)
{
    var firewall = network.getElement(firewallId);
    
    var rule = {
        externalPort: serverPort,
        internalIP: serverIP,
        internalPort: serverPort,
        protocol: 'TCP/UDP',
        description: serverName + ' (' + gameType + ')',
        enabled: true
    };
    
    firewall.addPortForwardRule(rule);
    
    // Close selection dialog
    if (uimanager.getWindow("divgameserverselect")) {
        uimanager.getWindow("divgameserverselect").dispose();
    }
    
    // Refresh the port forwarding display
    uimanager.getWindow("divportforwarding").dispose();
    createPortForwardingDiv(firewallId);
    
    // Show success message
    var notification = document.createElement('div');
    notification.style.cssText = 'position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg, #10b981, #059669);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 20px rgba(16,185,129,0.3);font-family:Inter,sans-serif;font-size:13px;z-index:9999;animation:slideIn 0.3s ease;';
    notification.innerHTML = '✅ Port forwarding rule created for ' + serverName;
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function closeGameServerSelect()
{
    uimanager.getWindow("divgameserverselect").dispose();
}

function testPortForward(firewallId)
{
    // Find game servers with port forwarding rules
    var firewall = network.getElement(firewallId);
    var rules = firewall.getPortForwardRules();
    
    if (rules.length === 0) {
        alert('No port forwarding rules configured. Add a rule first!');
        return;
    }
    
    // Find game servers that match the port forwarding rules
    var gameServers = [];
    var elements = network.getElements();
    
    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        if (rule.enabled) {
            // Find game server with matching IP and port
            for (var id in elements) {
                var element = elements[id];
                if (element && element.getIsGameServer && element.getIsGameServer()) {
                    var serverIP = null;
                    if (element.getConnectable) {
                        var connectable = element.getConnectable();
                        if (connectable && connectable.getIPInfo) {
                            var ipInfo = connectable.getIPInfo(0);
                            if (ipInfo && ipInfo.getIPv4) {
                                serverIP = ipInfo.getIPv4();
                            }
                        }
                    }
                    
                    if (serverIP === rule.internalIP && element.getGamePort() == rule.internalPort) {
                        gameServers.push({
                            server: element,
                            rule: rule,
                            serverId: id
                        });
                    }
                }
            }
        }
    }
    
    if (gameServers.length === 0) {
        alert('No game servers found matching the port forwarding rules.\n\nMake sure:\n1. Game server is added to the network\n2. Server IP matches the rule\n3. Server port matches the rule');
        return;
    }
    
    // Show selection dialog
    var html = '<div style="padding:20px;background:#1a1d2e;color:#e4e4e7;">';
    html += '<h4 style="margin:0 0 15px 0; color:#9ca3af;">🧪 Test Port Forwarding</h4>';
    html += '<p style="margin-bottom:15px; font-size:12px; color:#6b7280;">Select a server to test external connection:</p>';
    
    for (var i = 0; i < gameServers.length; i++) {
        var item = gameServers[i];
        var statusColor = item.server.getServerStatus() === 'online' ? '#10b981' : '#ef4444';
        var statusText = item.server.getServerStatus() === 'online' ? '🟢 Online' : '🔴 Offline';
        
        html += '<div style="padding:10px; margin-bottom:10px; background:#2a2d3e; border:1px solid #3a3d4e; border-radius:6px; cursor:pointer;" ';
        html += 'onclick="simulateExternalConnection(' + item.serverId + '); closeTestDialog();">';
        html += '<strong style="color:#667eea;">📡 Port ' + item.rule.externalPort + ' → ' + item.rule.internalIP + ':' + item.rule.internalPort + '</strong><br>';
        html += '<small style="color:#9ca3af;">Server: ' + item.server.getServerName() + ' (' + item.server.getGameType() + ')</small><br>';
        html += '<small style="color:' + statusColor + ';">' + statusText + '</small>';
        html += '</div>';
    }
    
    html += '<p style="margin-top:15px; padding:10px; background:#16213e; border:1px solid #10b981; border-radius:6px; font-size:11px; color:#9ca3af;">';
    html += '💡 <strong>Tip:</strong> Make sure the game server is online before testing!';
    html += '</p>';
    
    html += '</div>';
    
    var w = new UIWindow('divtestportforward', 'Test Port Forwarding', 450, 400, true, 1.0);
    w.setContent(html);
    w.setControls('<button onclick="closeTestDialog()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Close</button>');
    w.render();
}

function closeTestDialog()
{
    if (uimanager.getWindow("divtestportforward")) {
        uimanager.getWindow("divtestportforward").dispose();
    }
}

// Main Firewall Class
var Firewall = function()
{
    this.id = getNextID();
    var name = "Firewall " + this.id;
    var group = null;
    var connectable = null;
    this.drawable = null;  // Make drawable a public property
    var _self = this;
    
    // Firewall-specific properties
    var rules = [];
    var defaultPolicy = "ALLOW"; // Start permissive to not break existing networks
    var mode = "MONITOR"; // MONITOR or ENFORCE
    var logs = [];
    var maxLogs = 100; // Keep last 100 log entries
    var statistics = {
        allowed: 0,
        blocked: 0,
        monitored: 0,
        dosAttacksDetected: 0,
        dosPacketsDropped: 0
    };
    
    // DoS detection properties
    var dosDetection = {
        enabled: true,
        // Track connection attempts per IP
        connectionTracking: {},
        // Thresholds for detection (lowered for realistic simulation)
        thresholds: {
            synFloodRate: 5,       // SYN packets per second per IP (lowered from 20)
            httpFloodRate: 10,     // HTTP requests per second per IP (lowered from 30)
            icmpFloodRate: 15,     // ICMP packets per second per IP (lowered from 50)
            connectionLimit: 20    // Max concurrent connections per IP (lowered from 50)
        },
        // Blocked IPs (temporary blacklist)
        blockedIPs: {},
        blockDuration: 60000  // Block for 60 seconds
    };
    var menu = null;  // Menu for right-click context
    var isHovered = false;  // Hover state for showing/hiding details
    
    // Zone configuration (simplified for Phase 1)
    var zones = {
        0: "OUTSIDE", // Interface 0 - External/Internet
        1: "INSIDE",  // Interface 1 - Internal/LAN
        2: "DMZ"      // Interface 2 - DMZ (optional)
    };
    
    // Port forwarding rules
    var portForwardRules = [];
    
    // Initialize function to set up the firewall properly
    function init() {
        // Initialize connectable with proper parameters
        // Parameters: owner, macmode, ipmode, limitbroadcast, performNAT
        // Using same params as a router since firewall acts as a gateway
        connectable = new Connectable(_self, MACMODE_UNIQUE, IPMODE_UNIQUE, true, false);
        
        // Add 3 connectors for the firewall interfaces
        for (var i = 0; i < 3; i++) {
            var connector = new Connector(connectable);
        }
        
        // Create and register the menu
        menu = new UIMenu(name, 0, 0, false);
        addStaticMenu();
        uimanager.addMenu(menu);
        
        // Setup packet interception after connectable is initialized
        _self.setupPacketInterception();
    }
    
    // Setup packet interception after connectable is fully initialized
    this.setupPacketInterception = function() {
        var originalTrafficManager = connectable.getTrafficManager();
        if (originalTrafficManager) {
            var originalProccess = originalTrafficManager.proccess;
            
            // Replace the proccess method with our firewall-aware version
            originalTrafficManager.proccess = function(connector, message) {
                // First, let the firewall inspect the message
                var allowed = _self.inspectPacket(connector, message);
                
                if (allowed) {
                    // If allowed, continue with normal processing
                    originalProccess.call(this, connector, message);
                } else {
                    // Packet blocked - show visual indicator
                    _self.showBlockedNotification(message);
                    _self.flashBlockedIndicator();
                }
            };
        }
    };
    
    this.save = function()
    {
        var result = {};
        result.version = 1;
        result.id = this.id;
        result.type = "firewall";  // Important for loading
        result.name = name;
        result.group = group;
        result.drawable = this.drawable ? this.drawable.save() : null;
        
        // Debug: Check if connectable and its trafficManager exist
        if (connectable) {
            try {
                result.connectable = connectable.save();
            } catch (e) {
                console.error("Error saving firewall connectable:", e);
                // Create minimal connectable data
                result.connectable = {
                    version: 1,
                    id: connectable.id,
                    macmode: 1,
                    ipmode: 1,
                    performNAT: false,
                    connectors: [],
                    macaddresses: [],
                    ipinfos: [],
                    trafficManager: { version: 1, id: 1, limitbroadcast: true, performNAT: false, NATtable: [] },
                    gateways: { version: 1, id: 1, gateways: [] }
                };
            }
        } else {
            result.connectable = null;
        }
        
        result.rules = rules;
        result.defaultPolicy = defaultPolicy;
        result.mode = mode;
        result.statistics = statistics;
        result.zones = zones;
        result.portForwardRules = portForwardRules;
        // Don't save logs - they're temporary
        
        return result;
    };
    
    this.load = function(data)
    {
        this.id = data.id;
        name = data.name || ("Firewall " + this.id);
        group = data.group;
        
        // Create drawable if it doesn't exist yet
        if (!this.drawable) {
            this.drawable = new Drawable(this);
        }
        
        if (data.drawable) {
            this.drawable.load(data.drawable);
            // Set the firewall image after loading
            this.drawable.setImage(network.getImages()[IMAGE_FIREWALL] || network.getImages()[IMAGE_ROUTER]);
        }
        
        // Connectable should already be created by init(), but check just in case
        if (!connectable) {
            console.error("Warning: connectable not initialized, creating new one");
            connectable = new Connectable(_self, MACMODE_UNIQUE, IPMODE_UNIQUE, true, false);
            for (var i = 0; i < 3; i++) {
                var connector = new Connector(connectable);
            }
        }
        
        if (data.connectable) {
            connectable.load(data.connectable);
        }
        
        rules = data.rules || [];
        defaultPolicy = data.defaultPolicy || "ALLOW";
        mode = data.mode || "MONITOR";
        statistics = data.statistics || {allowed: 0, blocked: 0, monitored: 0};
        zones = data.zones || {0: "OUTSIDE", 1: "INSIDE", 2: "DMZ"};
        portForwardRules = data.portForwardRules || [];
        
        // Recreate menu with correct name
        if (menu) {
            menu.purge();
        } else {
            menu = new UIMenu(name, 0, 0, false);
            uimanager.addMenu(menu);
        }
        addStaticMenu();
        
        // Re-setup packet interception after loading
        this.setupPacketInterception();
    };
    
    this.getType = function()
    {
        return "firewall";
    };
    
    this.getName = function()
    {
        return name;
    };
    
    this.setName = function(n)
    {
        name = n;
        if (menu) {
            menu.setDescription(name);
            addStaticMenu();
        }
    };
    
    this.getGroup = function()
    {
        return group;
    };
    
    this.setGroup = function(g)
    {
        group = g;
    };
    
    this.getConnectable = function()
    {
        return connectable;
    };
    
    this.setDrawable = function(d)
    {
        this.drawable = d;
        // drawable.setOwner(this); // Not needed, owner set in constructor
    };
    
    this.getDrawable = function()
    {
        return this.drawable;
    };
    
    // Hover state methods
    this.setHovered = function(hovered) {
        if (isHovered !== hovered) {
            isHovered = hovered;
            // Force a redraw when hover state changes
            if (_self.drawable) {
                _self.drawable.notifyObservers();
            }
        }
    };
    
    this.getHovered = function() {
        return isHovered;
    };
    
    // Method required by Drawable for displaying info
    this.getStrInfo = function()
    {
        var result = name;
        
        // Show details when hovering OR when device labels are enabled
        var shouldShowDetails = isHovered || (typeof showDeviceLabels !== 'undefined' && showDeviceLabels);
        if (!shouldShowDetails) {
            return result;
        }
        
        // Show interface information
        for (var i = 0; i < connectable.getConnectorNumber(); i++) {
            result += "\n";
            result += zones[i] || ("IF" + i);
            result += ": ";
            var ipInfo = connectable.getIPInfo(i);
            result += (ipInfo && ipInfo.getIPv4()) ? ipInfo.getIPv4() : "-";
        }
        
        // Show mode and stats
        result += "\nMode: " + mode;
        result += "\nAllowed: " + statistics.allowed + " | Blocked: " + statistics.blocked;
        
        return result;
    };
    
    // Get connector description for interface
    this.getConnectorDesc = function(ifacepos)
    {
        return zones[ifacepos] || ("Interface " + ifacepos);
    };
    
    // Add static menu entries
    function addStaticMenu()
    {
        menu.purge();
        menu.addEntry("img/64/link.png", "Create Link", "createLinkAction();");
        menu.addEntry("img/64/edit.png", "Configure Firewall", "showFirewallConfig(" + _self.id + ");");
        menu.addEntry("img/64/network.png", "Port Forwarding", "showPortForwarding(" + _self.id + ");");
        menu.addEntry("img/64/inspect.png", "View Logs", "viewFirewallLogs(" + _self.id + ");");
        menu.addEntry("img/64/minus.png", "Reset Statistics", "resetFirewallStats(" + _self.id + ");");
        menu.addEntry("img/64/edit.png", "Edit name/group", "editNameGroup(" + _self.id + ");");
        menu.addEntry("img/64/delete.png", "Delete", "deleteSelected();");
    }
    
    // Menu management
    this.getMenu = function()
    {
        return menu;
    };
    
    this.dispose = function()
    {
        if (menu && menu.getVisible()) {
            menu.hide();
        }
        // Properly clean up the menu from the UI manager
        if (menu) {
            uimanager.deleteMenu(menu);
        }
        // Dispose the drawable if it exists
        if (this.drawable) {
            this.drawable.dispose();
        }
    };
    
    // Firewall-specific methods
    this.getMode = function()
    {
        return mode;
    };
    
    this.setMode = function(m)
    {
        if (m === "MONITOR" || m === "ENFORCE") {
            mode = m;
            this.addLog("INFO", "Firewall mode changed to " + m);
        }
    };
    
    this.getDefaultPolicy = function()
    {
        return defaultPolicy;
    };
    
    this.setDefaultPolicy = function(p)
    {
        if (p === "ALLOW" || p === "DENY") {
            defaultPolicy = p;
            this.addLog("INFO", "Default policy changed to " + p);
        }
    };
    
    this.addRule = function(rule)
    {
        // Rule structure:
        // {
        //     id: unique_id,
        //     action: "ALLOW" | "DENY",
        //     direction: "INBOUND" | "OUTBOUND" | "ANY",
        //     protocol: "TCP" | "UDP" | "ICMP" | "ANY",
        //     sourceIP: IP or "ANY",
        //     destIP: IP or "ANY",
        //     sourcePort: port or "ANY",
        //     destPort: port or "ANY",
        //     enabled: true | false,
        //     description: "Rule description"
        // }
        rule.id = rules.length + 1;
        rules.push(rule);
        this.addLog("INFO", "Rule added: " + rule.description);
    };
    
    this.removeRule = function(ruleId)
    {
        rules = rules.filter(function(r) { return r.id !== ruleId; });
        this.addLog("INFO", "Rule " + ruleId + " removed");
    };
    
    this.getRules = function()
    {
        return rules;
    };
    
    this.getRulesHTML = function()
    {
        if (rules.length === 0) {
            return '<p style="color:#9ca3af; font-style:italic; padding:20px; text-align:center;">No rules configured. Using default policy: ' + defaultPolicy + '</p>';
        }
        
        var html = '<table style="width:100%; border-collapse:collapse; font-size:11px;color:#e4e4e7;background:#1a1d2e !important;table-layout:fixed;">';
        html += '<thead><tr style="background:#2a2d3e !important;border-bottom:1px solid #3a3d4e;">';
        html += '<th style="padding:6px 6px; text-align:left;color:#9ca3af !important;background:#2a2d3e !important;width:25px;">#</th>';
        html += '<th style="padding:6px 6px; text-align:left;color:#9ca3af !important;background:#2a2d3e !important;width:55px;">Action</th>';
        html += '<th style="padding:6px 6px; text-align:left;color:#9ca3af !important;background:#2a2d3e !important;width:45px;">Dir</th>';
        html += '<th style="padding:6px 6px; text-align:left;color:#9ca3af !important;background:#2a2d3e !important;width:65px;">Protocol</th>';
        html += '<th style="padding:6px 6px; text-align:left;color:#9ca3af !important;background:#2a2d3e !important;width:65px;">Source</th>';
        html += '<th style="padding:6px 6px; text-align:left;color:#9ca3af !important;background:#2a2d3e !important;width:65px;">Dest</th>';
        html += '<th style="padding:6px 6px; text-align:left;color:#9ca3af !important;background:#2a2d3e !important;width:40px;">Port</th>';
        html += '<th style="padding:6px 6px; text-align:left;color:#9ca3af !important;background:#2a2d3e !important;">Desc</th>';
        html += '<th style="padding:6px 6px; text-align:center;color:#9ca3af !important;background:#2a2d3e !important;width:35px;">Del</th>';
        html += '</tr></thead>';
        html += '<tbody style="background:#1a1d2e !important;">';
        
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            var bgColor = rule.action === 'ALLOW' ? '#16213e' : '#2a1a1a';
            var textColor = rule.action === 'ALLOW' ? '#10b981' : '#ef4444';
            
            // Shorten direction labels
            var direction = rule.direction || 'ANY';
            if (direction === 'INBOUND') direction = 'IN';
            if (direction === 'OUTBOUND') direction = 'OUT';
            
            // Truncate description for display
            var desc = rule.description || '';
            if (desc.length > 30) {
                desc = desc.substring(0, 27) + '...';
            }
            
            html += '<tr style="background:' + bgColor + ' !important; border-bottom:1px solid #2a2d3e;">';
            html += '<td style="padding:6px 6px;color:#e4e4e7 !important;background:' + bgColor + ' !important;font-size:10px;">' + (i + 1) + '</td>';
            html += '<td style="padding:6px 6px; color:' + textColor + ' !important; font-weight:bold;background:' + bgColor + ' !important;font-size:10px;">' + rule.action + '</td>';
            html += '<td style="padding:6px 6px;color:#e4e4e7 !important;background:' + bgColor + ' !important;font-size:10px;">' + direction + '</td>';
            html += '<td style="padding:6px 6px;color:#e4e4e7 !important;background:' + bgColor + ' !important;font-size:10px;">' + rule.protocol + '</td>';
            html += '<td style="padding:6px 6px; font-family:monospace; font-size:10px;color:#e4e4e7 !important;background:' + bgColor + ' !important;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + rule.sourceIP + '</td>';
            html += '<td style="padding:6px 6px; font-family:monospace; font-size:10px;color:#e4e4e7 !important;background:' + bgColor + ' !important;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + rule.destIP + '</td>';
            html += '<td style="padding:6px 6px;color:#e4e4e7 !important;background:' + bgColor + ' !important;font-size:10px;">' + rule.destPort + '</td>';
            html += '<td style="padding:6px 6px; font-size:10px;color:#e4e4e7 !important;background:' + bgColor + ' !important;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="' + (rule.description || '') + '">' + desc + '</td>';
            html += '<td style="padding:6px 6px; text-align:center;background:' + bgColor + ' !important;">';
            html += '<button onclick="deleteFirewallRule(' + this.id + ', ' + i + ')" style="background:#ef4444; color:white; padding:2px 6px; border:none; border-radius:3px; cursor:pointer; font-size:10px;">×</button>';
            html += '</td>';
            html += '</tr>';
        }
        
        html += '</tbody></table>';
        return html;
    };
    
    this.deleteRule = function(index)
    {
        if (index >= 0 && index < rules.length) {
            var rule = rules[index];
            rules.splice(index, 1);
            this.addLog("CONFIG", "Deleted rule: " + (rule.description || rule.action + " " + rule.protocol));
            return true;
        }
        return false;
    };
    
    // Main packet inspection method called by TrafficManager
    this.inspectPacket = function(connector, message)
    {
        // Determine packet direction based on interface
        var connectorPos = connectable.getConnectorPos(connector);
        var direction = "ANY";
        if (zones[connectorPos] === "OUTSIDE") {
            direction = "INBOUND";
        } else if (zones[connectorPos] === "INSIDE") {
            direction = "OUTBOUND";
        }
        
        // Extract packet information
        var packet = {
            sourceIP: message.getOriginIP(),
            destIP: message.getDestinationIP(),
            sourcePort: message.getOrigPort(),
            destPort: message.getDstPort(),
            protocol: this.detectProtocol(message),
            direction: direction,
            data: message.getData(),
            timestamp: Date.now()
        };
        
        // Check for DoS attacks first (only for inbound traffic)
        if (dosDetection.enabled && direction === "INBOUND") {
            var dosCheck = this.checkForDoSAttack(packet);
            if (dosCheck.isAttack) {
                // DoS attack detected!
                statistics.dosPacketsDropped++;
                
                if (mode === "ENFORCE") {
                    // Block the packet
                    this.addLog("DOS_BLOCK", "DoS Attack blocked from " + packet.sourceIP + 
                               " (" + dosCheck.attackType + ") - " + dosCheck.reason);
                    this.showDoSBlockedIndicator(packet, dosCheck.attackType);
                    return false;
                } else {
                    // Monitor mode - just log
                    this.addLog("DOS_DETECT", "DoS Attack detected from " + packet.sourceIP + 
                               " (" + dosCheck.attackType + ") - " + dosCheck.reason);
                }
            }
        }
        
        var decision = this.evaluateRules(packet);
        
        if (mode === "MONITOR") {
            // In monitor mode, log but don't block
            if (decision.action === "DENY") {
                this.addLog("MONITOR", "Would block: " + packet.sourceIP + ":" + packet.sourcePort + 
                           " → " + packet.destIP + ":" + packet.destPort + " (" + packet.protocol + ", " + direction + ")");
                statistics.monitored++;
            } else {
                this.addLog("MONITOR", "Would allow: " + packet.sourceIP + " → " + packet.destIP + " (" + packet.protocol + ", " + direction + ")");
            }
            // Always allow in monitor mode
            statistics.allowed++;
            return true;
        } else if (mode === "ENFORCE") {
            // In enforce mode, actually block traffic
            if (decision.action === "ALLOW") {
                this.addLog("ALLOW", packet.sourceIP + " → " + packet.destIP + " (" + packet.protocol + ", " + direction + ")");
                statistics.allowed++;
                return true;
            } else {
                this.addLog("BLOCK", packet.sourceIP + " → " + packet.destIP + " (" + packet.protocol + ", " + direction + ") - " + decision.reason);
                statistics.blocked++;
                // Show blocked packet notification
                this.showBlockedNotification(message);
                return false;
            }
        }
        
        return true; // Default allow if something goes wrong
    };
    
    this.evaluateRules = function(packet)
    {
        // Check each rule in order (first match wins)
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            if (!rule.enabled) continue;
            
            if (this.matchesRule(packet, rule)) {
                return {
                    action: rule.action,
                    rule: rule,
                    reason: "Matched rule #" + rule.id + ": " + rule.description
                };
            }
        }
        
        // No rule matched, use default policy
        return {
            action: defaultPolicy,
            rule: null,
            reason: "Default policy: " + defaultPolicy
        };
    };
    
    this.matchesRule = function(packet, rule)
    {
        // Check direction
        if (rule.direction !== "ANY" && rule.direction !== packet.direction) {
            return false;
        }
        
        // Check protocol
        if (rule.protocol !== "ANY" && rule.protocol !== packet.protocol) {
            return false;
        }
        
        // Check source IP
        if (rule.sourceIP !== "ANY" && !this.matchesIP(packet.sourceIP, rule.sourceIP)) {
            return false;
        }
        
        // Check destination IP
        if (rule.destIP !== "ANY" && !this.matchesIP(packet.destIP, rule.destIP)) {
            return false;
        }
        
        // Check source port
        if (rule.sourcePort !== "ANY" && rule.sourcePort != packet.sourcePort) {
            return false;
        }
        
        // Check destination port
        if (rule.destPort !== "ANY" && rule.destPort != packet.destPort) {
            return false;
        }
        
        return true;
    };
    
    this.matchesIP = function(packetIP, ruleIP)
    {
        // TODO: In future, support CIDR notation (e.g., 192.168.1.0/24)
        // For now, just do exact match
        return packetIP === ruleIP;
    };
    
    this.detectProtocol = function(message)
    {
        // Detect protocol based on message data and ports
        var data = message.getData();
        var destPort = message.getDstPort();
        
        if (data && data.type) {
            if (data.type === "ping" || data.type === "pong") {
                return "ICMP";
            }
            if (data.type === "dhcp") {
                return "UDP";
            }
            if (data.type === "dns" || destPort === 53) {
                return "UDP";
            }
        }
        
        // Check common ports
        if (destPort === 80 || destPort === 443 || destPort === 8080) {
            return "TCP";
        }
        if (destPort === 22) { // SSH
            return "TCP";
        }
        if (destPort === 53 || destPort === 67 || destPort === 68) { // DNS, DHCP
            return "UDP";
        }
        
        // Default to TCP for now
        return "TCP";
    };
    
    this.addLog = function(type, message)
    {
        var entry = {
            timestamp: new Date().toISOString(),
            type: type,
            message: message
        };
        
        logs.unshift(entry); // Add to beginning
        
        // Keep only last maxLogs entries
        if (logs.length > maxLogs) {
            logs = logs.slice(0, maxLogs);
        }
    };
    
    this.getLogs = function()
    {
        return logs;
    };
    
    this.clearLogs = function()
    {
        logs = [];
        this.addLog("INFO", "Logs cleared");
    };
    
    this.getStatistics = function()
    {
        return {
            allowed: statistics.allowed,
            blocked: statistics.blocked,
            monitored: statistics.monitored,
            dosAttacksDetected: statistics.dosAttacksDetected,
            dosPacketsDropped: statistics.dosPacketsDropped,
            ruleCount: rules.length
        };
    };
    
    this.resetStatistics = function()
    {
        statistics = {
            allowed: 0,
            blocked: 0,
            monitored: 0
        };
        this.addLog("INFO", "Statistics reset");
    };
    
    // Menu entries for right-click context menu
    
    // Show visual notification when packet is blocked
    // Check for DoS attack patterns
    this.checkForDoSAttack = function(packet) {
        var sourceIP = packet.sourceIP;
        var now = packet.timestamp;
        
        // Check if IP is already blocked
        if (dosDetection.blockedIPs[sourceIP]) {
            if (now - dosDetection.blockedIPs[sourceIP] < dosDetection.blockDuration) {
                return {
                    isAttack: true,
                    attackType: "BLOCKED_IP",
                    reason: "IP temporarily blocked due to previous attack"
                };
            } else {
                // Unblock after duration
                delete dosDetection.blockedIPs[sourceIP];
            }
        }
        
        // Initialize tracking for this IP if needed
        if (!dosDetection.connectionTracking[sourceIP]) {
            dosDetection.connectionTracking[sourceIP] = {
                synCount: 0,
                httpCount: 0,
                icmpCount: 0,
                lastReset: now,
                connections: []
            };
        }
        
        var tracker = dosDetection.connectionTracking[sourceIP];
        
        // Reset counters every second
        if (now - tracker.lastReset > 1000) {
            tracker.synCount = 0;
            tracker.httpCount = 0;
            tracker.icmpCount = 0;
            tracker.lastReset = now;
            // Clean old connections
            tracker.connections = tracker.connections.filter(function(conn) {
                return now - conn < 60000; // Keep connections from last minute
            });
        }
        
        // Check for different attack types
        
        // SYN Flood detection (TCP SYN packets to various ports)
        if (packet.protocol === "TCP" && packet.destPort && packet.sourcePort) {
            tracker.synCount++;
            tracker.connections.push(now);
            
            if (tracker.synCount > dosDetection.thresholds.synFloodRate) {
                dosDetection.blockedIPs[sourceIP] = now;
                statistics.dosAttacksDetected++;
                return {
                    isAttack: true,
                    attackType: "SYN_FLOOD",
                    reason: tracker.synCount + " SYN packets/sec exceeds threshold"
                };
            }
        }
        
        // HTTP Flood detection
        if (packet.protocol === "HTTP" || packet.destPort === 80 || packet.destPort === 443) {
            tracker.httpCount++;
            
            if (tracker.httpCount > dosDetection.thresholds.httpFloodRate) {
                dosDetection.blockedIPs[sourceIP] = now;
                statistics.dosAttacksDetected++;
                return {
                    isAttack: true,
                    attackType: "HTTP_FLOOD",
                    reason: tracker.httpCount + " HTTP requests/sec exceeds threshold"
                };
            }
        }
        
        // ICMP Flood detection (Ping flood)
        if (packet.protocol === "ICMP") {
            tracker.icmpCount++;
            
            if (tracker.icmpCount > dosDetection.thresholds.icmpFloodRate) {
                dosDetection.blockedIPs[sourceIP] = now;
                statistics.dosAttacksDetected++;
                return {
                    isAttack: true,
                    attackType: "ICMP_FLOOD",
                    reason: tracker.icmpCount + " ICMP packets/sec exceeds threshold"
                };
            }
        }
        
        // Connection limit check
        if (tracker.connections.length > dosDetection.thresholds.connectionLimit) {
            dosDetection.blockedIPs[sourceIP] = now;
            statistics.dosAttacksDetected++;
            return {
                isAttack: true,
                attackType: "CONNECTION_FLOOD",
                reason: tracker.connections.length + " connections exceeds limit"
            };
        }
        
        return { isAttack: false };
    };
    
    // Show visual indicator when DoS attack is blocked
    this.showDoSBlockedIndicator = function(packet, attackType) {
        // Flash the firewall red
        this.flashBlockedIndicator();
        
        // Create floating notification near firewall
        if (this.drawable) {
            var rect = this.drawable.getRect();
            var canvas = document.getElementById('simcanvas');
            if (canvas) {
                var notification = document.createElement('div');
                notification.style.position = 'absolute';
                notification.style.left = (rect.x + rect.width + 10) + 'px';
                notification.style.top = rect.y + 'px';
                notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                notification.style.color = 'white';
                notification.style.padding = '8px 12px';
                notification.style.borderRadius = '6px';
                notification.style.fontSize = '12px';
                notification.style.fontWeight = 'bold';
                notification.style.zIndex = '1000';
                notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
                notification.style.animation = 'slideInFade 0.3s ease-out';
                notification.innerHTML = '🛡️ DoS BLOCKED<br>' + 
                                       '<span style="font-size:10px;font-weight:normal;">' + 
                                       attackType.replace('_', ' ') + ' from ' + packet.sourceIP + '</span>';
                
                canvas.parentElement.appendChild(notification);
                
                // Remove after 3 seconds
                setTimeout(function() {
                    notification.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(function() {
                        notification.remove();
                    }, 300);
                }, 3000);
            }
        }
        
        // Log to console for debugging
        console.log('[FIREWALL] DoS Attack Blocked:', attackType, 'from', packet.sourceIP);
    };
    
    this.showBlockedNotification = function(message)
    {
        // Only show notifications in ENFORCE mode
        if (mode !== 'ENFORCE') return;
        
        // Create a temporary notification div
        var notification = document.createElement('div');
        notification.style.cssText = 'position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg, #ef4444, #dc2626);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 20px rgba(239,68,68,0.3);font-family:Inter,sans-serif;font-size:13px;z-index:9999;animation:slideIn 0.3s ease;';
        
        // Get protocol and port info safely
        var srcIP = message.getOriginIP ? message.getOriginIP() : 'Unknown';
        var dstIP = message.getDestinationIP ? message.getDestinationIP() : 'Unknown';
        var port = message.getDstPort ? message.getDstPort() : 'N/A';
        var protocol = message.type || 'Unknown';
        
        notification.innerHTML = '🚫 <strong>Firewall Blocked:</strong> ' + 
                                srcIP + ' → ' + dstIP + 
                                ' (' + protocol + ', Port ' + port + ')';
        
        // Add animation style if not already added
        if (!document.getElementById('firewall-animations')) {
            var style = document.createElement('style');
            style.id = 'firewall-animations';
            style.textContent = '@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }' +
                              '@keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }';
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(function() {
            notification.style.animation = 'slideOut 0.3s ease';
            notification.style.animationFillMode = 'forwards';
            setTimeout(function() {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    };
    
    // Flash the firewall visual indicator when blocking packets
    this.flashBlockedIndicator = function()
    {
        // Only flash in ENFORCE mode
        if (mode !== 'ENFORCE') return;
        
        // Store original state
        this.blockedFlashActive = true;
        
        // Reset after a short time
        setTimeout(function() {
            _self.blockedFlashActive = false;
        }, 500);
    };
    
    // Override the render method to show blocking indicator
    this.customRender = function(ctx)
    {
        // If we're actively blocking, draw a red border/glow
        if (this.blockedFlashActive && this.drawable) {
            var rect = this.drawable.getRect();
            ctx.save();
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
            ctx.lineWidth = 4;
            ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
            ctx.shadowBlur = 10;
            ctx.strokeRect(rect.x - 2, rect.y - 2, rect.width + 4, rect.height + 4);
            ctx.restore();
        }
    };
    
    // Port Forwarding Methods
    this.addPortForwardRule = function(rule)
    {
        // Port forward rule structure:
        // {
        //     id: unique_id,
        //     externalPort: 25565,
        //     internalIP: "192.168.1.100",
        //     internalPort: 25565,
        //     protocol: "TCP/UDP",
        //     description: "Minecraft Server",
        //     enabled: true
        // }
        rule.id = portForwardRules.length + 1;
        portForwardRules.push(rule);
        this.addLog("INFO", "Port forward rule added: " + rule.description);
        return rule.id;
    };
    
    this.removePortForwardRule = function(ruleId)
    {
        portForwardRules = portForwardRules.filter(function(r) { return r.id !== ruleId; });
        this.addLog("INFO", "Port forward rule " + ruleId + " removed");
    };
    
    this.getPortForwardRules = function()
    {
        return portForwardRules;
    };
    
    this.deletePortForwardRule = function(index)
    {
        if (index >= 0 && index < portForwardRules.length) {
            var rule = portForwardRules[index];
            portForwardRules.splice(index, 1);
            this.addLog("CONFIG", "Deleted port forward: " + (rule.description || "Port " + rule.externalPort));
            return true;
        }
        return false;
    };
    
    // Check if a packet matches any port forwarding rule
    this.checkPortForward = function(message)
    {
        var destPort = message.getDstPort();
        var destIP = message.getDestinationIP();
        
        // Check if this is an incoming packet from outside
        // (This would need to be determined by interface in real implementation)
        
        for (var i = 0; i < portForwardRules.length; i++) {
            var rule = portForwardRules[i];
            if (!rule.enabled) continue;
            
            if (rule.externalPort == destPort) {
                // This packet matches a port forward rule
                return {
                    match: true,
                    rule: rule,
                    newDestIP: rule.internalIP,
                    newDestPort: rule.internalPort
                };
            }
        }
        
        return { match: false };
    };
    
    this.getPortForwardHTML = function()
    {
        if (portForwardRules.length === 0) {
            return '<p style="color:#9ca3af; font-style:italic; padding:20px; text-align:center;">No port forwarding rules configured</p>';
        }
        
        // Add style to override global hover effect
        var html = '<style>.port-forward-table tr:hover td { background: inherit !important; }</style>';
        html += '<table class="port-forward-table" style="width:100%; border-collapse:collapse; font-size:11px;color:#e4e4e7;background:#1a1d2e !important;">';
        html += '<thead><tr style="background:#2a2d3e !important;border-bottom:1px solid #3a3d4e;">';
        html += '<th style="padding:8px; text-align:left;color:#9ca3af;">#</th>';
        html += '<th style="padding:8px; text-align:left;color:#9ca3af;">External Port</th>';
        html += '<th style="padding:8px; text-align:left;color:#9ca3af;">Internal IP</th>';
        html += '<th style="padding:8px; text-align:left;color:#9ca3af;">Internal Port</th>';
        html += '<th style="padding:8px; text-align:left;color:#9ca3af;">Protocol</th>';
        html += '<th style="padding:8px; text-align:left;color:#9ca3af;">Description</th>';
        html += '<th style="padding:8px; text-align:center;color:#9ca3af;">Delete</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        
        for (var i = 0; i < portForwardRules.length; i++) {
            var rule = portForwardRules[i];
            var bgColor = rule.enabled ? '#16213e' : '#2a1a1a';
            
            html += '<tr style="background:' + bgColor + ' !important; border-bottom:1px solid #2a2d3e;">';
            html += '<td style="padding:8px;color:#e4e4e7;">' + (i + 1) + '</td>';
            html += '<td style="padding:8px;color:#10b981;font-weight:bold;">' + rule.externalPort + '</td>';
            html += '<td style="padding:8px;font-family:monospace;color:#e4e4e7;">' + rule.internalIP + '</td>';
            html += '<td style="padding:8px;color:#667eea;">' + rule.internalPort + '</td>';
            html += '<td style="padding:8px;color:#e4e4e7;">' + rule.protocol + '</td>';
            html += '<td style="padding:8px;color:#e4e4e7;">' + (rule.description || '') + '</td>';
            html += '<td style="padding:8px; text-align:center;">';
            html += '<button onclick="deletePortForwardRule(' + this.id + ', ' + i + ')" style="background:#ef4444; color:white; padding:2px 8px; border:none; border-radius:3px; cursor:pointer;">×</button>';
            html += '</td>';
            html += '</tr>';
        }
        
        html += '</tbody></table>';
        return html;
    };
    
    // Add some default rules for common scenarios
    this.addDefaultRules = function()
    {
        // Allow established connections (simplified - would need stateful inspection for real implementation)
        this.addRule({
            action: "ALLOW",
            direction: "INBOUND",
            protocol: "TCP",
            sourceIP: "ANY",
            destIP: "ANY",
            sourcePort: "ANY",
            destPort: "ANY",
            enabled: true,
            description: "Allow established TCP connections"
        });
        
        // Allow DNS
        this.addRule({
            action: "ALLOW",
            direction: "ANY",
            protocol: "UDP",
            sourceIP: "ANY",
            destIP: "ANY",
            sourcePort: "ANY",
            destPort: "53",
            enabled: true,
            description: "Allow DNS queries"
        });
        
        // Allow HTTP/HTTPS outbound
        this.addRule({
            action: "ALLOW",
            direction: "OUTBOUND",
            protocol: "TCP",
            sourceIP: "ANY",
            destIP: "ANY",
            sourcePort: "ANY",
            destPort: "80",
            enabled: true,
            description: "Allow HTTP outbound"
        });
        
        this.addRule({
            action: "ALLOW",
            direction: "OUTBOUND",
            protocol: "TCP",
            sourceIP: "ANY",
            destIP: "ANY",
            sourcePort: "ANY",
            destPort: "443",
            enabled: true,
            description: "Allow HTTPS outbound"
        });
    };
    
    // Get DoS detection configuration
    this.getDoSDetection = function() {
        return dosDetection;
    };
    
    // Set DoS protection status
    this.setDoSProtection = function(enabled) {
        dosDetection.enabled = enabled;
        if (!enabled) {
            // Clear blocked IPs when disabling
            dosDetection.blockedIPs = {};
            dosDetection.connectionTracking = {};
        }
    };
    
    // Call init at the end of constructor
    init();
};