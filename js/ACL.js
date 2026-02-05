/*
 * This file is part of the Education Network Simulator project and covered
 * by GPLv3 license. See full terms in the LICENSE file at the root folder
 * or at http://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Access Control List (ACL) Implementation
 * Simple Standard ACLs for educational purposes
 *
 * (c) 2025 - NetworkSimulator ACL Module
 */

// UI Functions for ACL Configuration
function showACLConfig(id)
{
    createBkDiv();
    createACLConfigDiv(id);
}

function createACLConfigDiv(id)
{
    var host = network.getElement(id);

    if (host.getType() !== 'router') {
        alert('ACLs can only be configured on routers');
        removeBodyDiv('divbk');
        return;
    }

    var innerHTML = '<div class="acl-dark-content" style="padding:20px;background:#1a1a2e;color:#e4e4e7 !important;">';

    // Introduction
    innerHTML += '<div style="margin-bottom:20px; padding:15px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 8px 0; color:white !important; font-weight:600;">🛡️ Access Control Lists (ACLs) <span class="help-icon" onclick="showHelp(\'acl_overview\')">?</span></h4>';
    innerHTML += '<p style="margin:0; font-size:12px; color:#e4e4f7 !important;">Control traffic flow between networks using standard ACLs</p>';
    innerHTML += '</div>';

    // ACL List
    innerHTML += '<div style="margin-bottom:20px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#9ca3af !important; font-weight:600;">Configured ACLs</h4>';
    innerHTML += '<div style="max-height:200px; overflow-y:auto; background:#16213e; border:1px solid #2a2d3e; border-radius:6px; padding:10px;">';
    innerHTML += host.getACLListHTML();
    innerHTML += '</div>';
    innerHTML += '</div>';

    // Interface ACL Assignments
    innerHTML += '<div style="margin-bottom:20px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#9ca3af !important; font-weight:600;">Interface ACL Assignments</h4>';
    innerHTML += '<div style="max-height:150px; overflow-y:auto; background:#16213e; border:1px solid #2a2d3e; border-radius:6px; padding:10px;">';
    innerHTML += host.getInterfaceACLHTML();
    innerHTML += '</div>';
    innerHTML += '</div>';

    // Statistics
    innerHTML += '<div style="padding:15px; background:#16213e; border:1px solid #10b981; border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0; color:#10b981 !important; font-weight:600;">Statistics</h4>';
    var stats = host.getACLStatistics();
    innerHTML += '<p style="margin:5px 0; font-size:12px; color:#e4e4e7 !important;">✅ Permitted: ' + stats.permitted + ' packets</p>';
    innerHTML += '<p style="margin:5px 0; font-size:12px; color:#e4e4e7 !important;">🚫 Denied: ' + stats.denied + ' packets</p>';
    innerHTML += '<p style="margin:5px 0; font-size:12px; color:#e4e4e7 !important;">📋 Total ACLs: ' + stats.aclCount + '</p>';
    innerHTML += '<p style="margin:5px 0; font-size:12px; color:#e4e4e7 !important;">🔗 Active Interfaces: ' + stats.activeInterfaces + '</p>';
    innerHTML += '</div>';

    innerHTML += '</div>';

    var controls = '<button onclick="showCreateACL(' + id + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;font-weight:500;">Create ACL</button>';
    controls += '<button onclick="showApplyACL(' + id + ')" style="background:#667eea; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;font-weight:500;">Apply to Interface</button>';
    controls += '<button onclick="resetACLStats(' + id + ')" style="background:#ef4444; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;font-weight:500;">Reset Stats</button>';
    controls += '<button onclick="closeACLConfig()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;font-weight:500;">Close</button>';

    var w = new UIWindow('divaclconfig', 'ACL Configuration - ' + host.getName(), 700, 600, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function closeACLConfig()
{
    uimanager.getWindow("divaclconfig").dispose();
    removeBodyDiv('divbk');
}

function resetACLStats(id)
{
    var host = network.getElement(id);
    if (confirm("Reset all ACL statistics?")) {
        host.resetACLStatistics();
        // Refresh the display
        uimanager.getWindow("divaclconfig").dispose();
        createACLConfigDiv(id);
    }
}

function showCreateACL(id)
{
    var host = network.getElement(id);
    createBkDiv();

    var innerHTML = '<div style="padding:20px;background:#1a1a2e;color:#e4e4e7;" class="help-content">';
    innerHTML += '<h4 style="margin:0 0 15px 0; color:#9ca3af;font-weight:600;">Create ACL <span class="help-icon" onclick="showHelp(\'acl_overview\')">?</span></h4>';

    // ACL Type selection
    innerHTML += '<div style="margin-bottom:15px; padding:12px; background:#2a2d3e; border-radius:6px;">';
    innerHTML += '<label style="display:block; margin-bottom:8px; font-weight:500;color:#e4e4e7;">ACL Type:</label>';
    innerHTML += '<div style="display:flex; gap:10px;">';
    innerHTML += '<label style="flex:1; padding:10px; background:#16213e; border:2px solid #10b981; border-radius:6px; cursor:pointer; text-align:center;" id="acl_type_standard_label">';
    innerHTML += '<input type="radio" name="acl_type" value="standard" checked onchange="updateACLTypeUI()" style="display:none;">';
    innerHTML += '<div style="color:#10b981; font-weight:600;">Standard</div>';
    innerHTML += '<div style="font-size:10px; color:#9ca3af;">1-99</div>';
    innerHTML += '<div style="font-size:9px; color:#6b7280; margin-top:4px;">Source IP only</div>';
    innerHTML += '</label>';
    innerHTML += '<label style="flex:1; padding:10px; background:#16213e; border:2px solid #3a3d4e; border-radius:6px; cursor:pointer; text-align:center;" id="acl_type_extended_label">';
    innerHTML += '<input type="radio" name="acl_type" value="extended" onchange="updateACLTypeUI()" style="display:none;">';
    innerHTML += '<div style="color:#f59e0b; font-weight:600;">Extended</div>';
    innerHTML += '<div style="font-size:10px; color:#9ca3af;">100-199</div>';
    innerHTML += '<div style="font-size:9px; color:#6b7280; margin-top:4px;">Protocol, IPs, Ports</div>';
    innerHTML += '</label>';
    innerHTML += '</div>';
    innerHTML += '</div>';

    // ACL Number
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">ACL Number:</label>';
    innerHTML += '<input type="number" id="acl_number" min="1" max="199" value="10" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
    innerHTML += '<small id="acl_number_hint" style="color:#6b7280; font-size:11px;">Standard ACLs use numbers 1-99</small>';
    innerHTML += '</div>';

    // ACL Name (optional)
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Name (optional):</label>';
    innerHTML += '<input type="text" id="acl_name" placeholder="e.g., BLOCK_TELNET" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
    innerHTML += '</div>';

    innerHTML += '</div>';

    var controls = '<button onclick="createACL(' + id + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;font-weight:500;">Create</button>';
    controls += '<button onclick="cancelCreateACL()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;font-weight:500;">Cancel</button>';

    var w = new UIWindow('divcreateacl', 'Create ACL', 450, 380, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

// Update UI when ACL type changes
function updateACLTypeUI()
{
    var standardLabel = document.getElementById('acl_type_standard_label');
    var extendedLabel = document.getElementById('acl_type_extended_label');
    var aclNumberInput = document.getElementById('acl_number');
    var aclNumberHint = document.getElementById('acl_number_hint');

    var isExtended = document.querySelector('input[name="acl_type"]:checked').value === 'extended';

    if (isExtended) {
        standardLabel.style.borderColor = '#3a3d4e';
        extendedLabel.style.borderColor = '#f59e0b';
        aclNumberInput.min = 100;
        aclNumberInput.max = 199;
        aclNumberInput.value = 100;
        aclNumberHint.textContent = 'Extended ACLs use numbers 100-199';
    } else {
        standardLabel.style.borderColor = '#10b981';
        extendedLabel.style.borderColor = '#3a3d4e';
        aclNumberInput.min = 1;
        aclNumberInput.max = 99;
        aclNumberInput.value = 10;
        aclNumberHint.textContent = 'Standard ACLs use numbers 1-99';
    }
}

function createACL(id)
{
    var host = network.getElement(id);

    var aclNumber = parseInt(document.getElementById('acl_number').value);
    var aclName = document.getElementById('acl_name').value.trim();

    // Validation - allow both standard (1-99) and extended (100-199)
    if (!aclNumber || aclNumber < 1 || aclNumber > 199) {
        alert('Please enter a valid ACL number (1-99 for Standard, 100-199 for Extended)');
        return;
    }

    // Validate number matches selected type
    var isExtendedType = document.querySelector('input[name="acl_type"]:checked');
    if (isExtendedType) {
        var selectedExtended = isExtendedType.value === 'extended';
        var numberIsExtended = aclNumber >= 100;

        if (selectedExtended && !numberIsExtended) {
            alert('Extended ACLs must use numbers 100-199');
            return;
        }
        if (!selectedExtended && numberIsExtended) {
            alert('Standard ACLs must use numbers 1-99');
            return;
        }
    }

    // Check if ACL already exists
    if (host.getACL(aclNumber)) {
        if (!confirm('ACL ' + aclNumber + ' already exists. Overwrite?')) {
            return;
        }
    }

    host.createACL(aclNumber, aclName);

    // Close create dialog
    uimanager.getWindow("divcreateacl").dispose();
    removeBodyDiv('divbk');

    // Show the ACL editor
    showEditACL(id, aclNumber);
}

function cancelCreateACL()
{
    uimanager.getWindow("divcreateacl").dispose();
    removeBodyDiv('divbk');
}

function showEditACL(id, aclNumber)
{
    var host = network.getElement(id);
    var acl = host.getACL(aclNumber);

    if (!acl) {
        alert('ACL ' + aclNumber + ' not found');
        return;
    }

    var isExtended = aclNumber >= 100 && aclNumber <= 199;

    createBkDiv();

    var innerHTML = '<div style="padding:20px;background:#1a1a2e;color:#e4e4e7;" class="help-content">';

    // Header with type indicator
    var typeLabel = isExtended ? '<span style="color:#f59e0b; background:rgba(245,158,11,0.15); padding:2px 6px; border-radius:3px; font-size:10px; margin-left:8px;">Extended</span>' : '<span style="color:#10b981; background:rgba(16,185,129,0.15); padding:2px 6px; border-radius:3px; font-size:10px; margin-left:8px;">Standard</span>';
    innerHTML += '<h4 style="margin:0 0 15px 0; color:#9ca3af;font-weight:600;">Edit ACL ' + aclNumber + (acl.name ? ' (' + acl.name + ')' : '') + typeLabel + '</h4>';

    // Rules list
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<h5 style="margin:0 0 10px 0; color:#9ca3af;">Rules (processed top to bottom):</h5>';
    innerHTML += '<div style="max-height:200px; overflow-y:auto; background:#16213e; border:1px solid #2a2d3e; border-radius:6px; padding:10px;">';
    innerHTML += host.getACLRulesHTML(aclNumber);
    innerHTML += '</div>';
    innerHTML += '</div>';

    // Add rule form
    innerHTML += '<div style="padding:15px; background:#2a2d3e; border:1px solid #3a3d4e; border-radius:8px;">';
    innerHTML += '<h5 style="margin:0 0 10px 0; color:#9ca3af;">Add New Rule:</h5>';

    // Action
    innerHTML += '<div style="margin-bottom:10px;">';
    innerHTML += '<label style="display:inline-block; width:80px; font-weight:500;color:#e4e4e7;">Action:</label>';
    innerHTML += '<select id="rule_action" style="padding:6px; background:#16213e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
    innerHTML += '<option value="PERMIT">PERMIT</option>';
    innerHTML += '<option value="DENY">DENY</option>';
    innerHTML += '</select>';
    innerHTML += '</div>';

    if (isExtended) {
        // Protocol (Extended ACL only)
        innerHTML += '<div style="margin-bottom:10px;">';
        innerHTML += '<label style="display:inline-block; width:80px; font-weight:500;color:#e4e4e7;">Protocol:</label>';
        innerHTML += '<select id="rule_protocol" style="padding:6px; background:#16213e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
        innerHTML += '<option value="ip">IP (any protocol)</option>';
        innerHTML += '<option value="tcp">TCP</option>';
        innerHTML += '<option value="udp">UDP</option>';
        innerHTML += '<option value="icmp">ICMP</option>';
        innerHTML += '</select>';
        innerHTML += '</div>';
    }

    // Source IP
    innerHTML += '<div style="margin-bottom:10px;">';
    innerHTML += '<label style="display:inline-block; width:80px; font-weight:500;color:#e4e4e7;">Source:</label>';
    innerHTML += '<input type="text" id="rule_source" placeholder="IP or subnet" value="any" style="width:120px; padding:6px; background:#16213e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
    innerHTML += '<input type="text" id="rule_wildcard" placeholder="wildcard" value="255.255.255.255" style="width:110px; margin-left:5px; padding:6px; background:#16213e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
    innerHTML += '</div>';

    if (isExtended) {
        // Destination IP (Extended ACL only)
        innerHTML += '<div style="margin-bottom:10px;">';
        innerHTML += '<label style="display:inline-block; width:80px; font-weight:500;color:#e4e4e7;">Dest:</label>';
        innerHTML += '<input type="text" id="rule_dest" placeholder="IP or subnet" value="any" style="width:120px; padding:6px; background:#16213e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
        innerHTML += '<input type="text" id="rule_dest_wildcard" placeholder="wildcard" value="255.255.255.255" style="width:110px; margin-left:5px; padding:6px; background:#16213e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
        innerHTML += '</div>';

        // Destination Port (Extended ACL only)
        innerHTML += '<div style="margin-bottom:10px;">';
        innerHTML += '<label style="display:inline-block; width:80px; font-weight:500;color:#e4e4e7;">Dst Port:</label>';
        innerHTML += '<select id="rule_port_op" style="padding:6px; background:#16213e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
        innerHTML += '<option value="">any</option>';
        innerHTML += '<option value="eq">eq (equal)</option>';
        innerHTML += '<option value="gt">gt (greater)</option>';
        innerHTML += '<option value="lt">lt (less)</option>';
        innerHTML += '<option value="neq">neq (not equal)</option>';
        innerHTML += '<option value="range">range</option>';
        innerHTML += '</select>';
        innerHTML += '<input type="text" id="rule_port" placeholder="port" value="" style="width:60px; margin-left:5px; padding:6px; background:#16213e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
        innerHTML += '<input type="text" id="rule_port_end" placeholder="end" value="" style="width:60px; margin-left:5px; padding:6px; background:#16213e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px; display:none;" title="End port for range">';
        innerHTML += '</div>';

        // Common port presets
        innerHTML += '<div style="margin-bottom:10px;">';
        innerHTML += '<label style="display:inline-block; width:80px; font-weight:500;color:#e4e4e7;">Presets:</label>';
        innerHTML += '<button onclick="setExtendedACLPreset(\'http\')" style="background:#16213e; color:#10b981; padding:4px 8px; border:1px solid #3a3d4e; border-radius:3px; cursor:pointer; font-size:10px; margin-right:4px;">HTTP (80)</button>';
        innerHTML += '<button onclick="setExtendedACLPreset(\'https\')" style="background:#16213e; color:#10b981; padding:4px 8px; border:1px solid #3a3d4e; border-radius:3px; cursor:pointer; font-size:10px; margin-right:4px;">HTTPS (443)</button>';
        innerHTML += '<button onclick="setExtendedACLPreset(\'ssh\')" style="background:#16213e; color:#10b981; padding:4px 8px; border:1px solid #3a3d4e; border-radius:3px; cursor:pointer; font-size:10px; margin-right:4px;">SSH (22)</button>';
        innerHTML += '<button onclick="setExtendedACLPreset(\'telnet\')" style="background:#16213e; color:#ef4444; padding:4px 8px; border:1px solid #3a3d4e; border-radius:3px; cursor:pointer; font-size:10px; margin-right:4px;">Telnet (23)</button>';
        innerHTML += '<button onclick="setExtendedACLPreset(\'dns\')" style="background:#16213e; color:#f59e0b; padding:4px 8px; border:1px solid #3a3d4e; border-radius:3px; cursor:pointer; font-size:10px; margin-right:4px;">DNS (53)</button>';
        innerHTML += '<button onclick="setExtendedACLPreset(\'ftp\')" style="background:#16213e; color:#667eea; padding:4px 8px; border:1px solid #3a3d4e; border-radius:3px; cursor:pointer; font-size:10px;">FTP (21)</button>';
        innerHTML += '</div>';
    }

    innerHTML += '<button onclick="addACLRule(' + id + ', ' + aclNumber + ')" style="background:#10b981; color:white; padding:6px 12px; border:none; border-radius:4px; cursor:pointer;font-weight:500;">Add Rule</button>';
    innerHTML += '</div>';

    // Info box
    innerHTML += '<div style="margin-top:15px; padding:10px; background:#16213e; border:1px solid #667eea; border-radius:6px; font-size:11px; color:#9ca3af;">';
    if (isExtended) {
        innerHTML += '<p style="margin:3px 0;"><strong style="color:#f59e0b;">📋 Extended ACL:</strong> Can filter by protocol, source, destination, and ports</p>';
        innerHTML += '<p style="margin:3px 0;">• Use "any" for source/dest to match all IPs</p>';
        innerHTML += '<p style="margin:3px 0;">• Leave port blank to match all ports</p>';
        innerHTML += '<p style="margin:3px 0;">• Common: <code style="background:#2a2d3e;padding:1px 4px;border-radius:2px;">permit tcp any any eq 80</code> = allow HTTP</p>';
    } else {
        innerHTML += '<p style="margin:3px 0;"><strong style="color:#10b981;">📋 Standard ACL:</strong> Filters by source IP address only</p>';
        innerHTML += '<p style="margin:3px 0;">• Use "any" or "0.0.0.0 255.255.255.255" to match all sources</p>';
        innerHTML += '<p style="margin:3px 0;">• Wildcard 0.0.0.0 = exact host match</p>';
        innerHTML += '<p style="margin:3px 0;">• Wildcard 0.0.0.255 = /24 subnet (class C)</p>';
    }
    innerHTML += '<p style="margin:3px 0;">• Rules are processed top to bottom, first match wins</p>';
    innerHTML += '<p style="margin:3px 0;">• Implicit "deny any" at the end of every ACL</p>';
    innerHTML += '</div>';

    innerHTML += '</div>';

    var controls = '<button onclick="deleteACL(' + id + ', ' + aclNumber + ')" style="background:#ef4444; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;font-weight:500;">Delete ACL</button>';
    controls += '<button onclick="closeEditACL(' + id + ')" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;font-weight:500;">Done</button>';

    var windowHeight = isExtended ? 680 : 550;
    var w = new UIWindow('diveditacl', 'Edit ACL ' + aclNumber, 620, windowHeight, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();

    // Add event listener for range port operator
    if (isExtended) {
        setTimeout(function() {
            var portOpSelect = document.getElementById('rule_port_op');
            if (portOpSelect) {
                portOpSelect.addEventListener('change', function() {
                    var portEndInput = document.getElementById('rule_port_end');
                    if (portEndInput) {
                        portEndInput.style.display = this.value === 'range' ? 'inline-block' : 'none';
                    }
                });
            }
        }, 100);
    }
}

// Preset helper for extended ACL common rules
function setExtendedACLPreset(preset)
{
    var presets = {
        'http': { protocol: 'tcp', port: '80', action: 'PERMIT' },
        'https': { protocol: 'tcp', port: '443', action: 'PERMIT' },
        'ssh': { protocol: 'tcp', port: '22', action: 'PERMIT' },
        'telnet': { protocol: 'tcp', port: '23', action: 'DENY' },
        'dns': { protocol: 'udp', port: '53', action: 'PERMIT' },
        'ftp': { protocol: 'tcp', port: '21', action: 'PERMIT' }
    };

    var p = presets[preset];
    if (p) {
        var protocolEl = document.getElementById('rule_protocol');
        var portOpEl = document.getElementById('rule_port_op');
        var portEl = document.getElementById('rule_port');
        var actionEl = document.getElementById('rule_action');

        if (protocolEl) protocolEl.value = p.protocol;
        if (portOpEl) portOpEl.value = 'eq';
        if (portEl) portEl.value = p.port;
        if (actionEl) actionEl.value = p.action;
    }
}

function addACLRule(id, aclNumber)
{
    var host = network.getElement(id);
    var isExtended = aclNumber >= 100 && aclNumber <= 199;

    var action = document.getElementById('rule_action').value;
    var source = document.getElementById('rule_source').value.trim();
    var wildcard = document.getElementById('rule_wildcard').value.trim();

    // Convert "any" to wildcard notation for source
    if (source.toLowerCase() === 'any') {
        source = '0.0.0.0';
        wildcard = '255.255.255.255';
    }

    // Validation
    if (!source) {
        alert('Please enter a source IP or "any"');
        return;
    }

    var rule = {
        action: action,
        source: source,
        wildcard: wildcard || '0.0.0.0'
    };

    // Extended ACL fields
    if (isExtended) {
        var protocol = document.getElementById('rule_protocol');
        var destIP = document.getElementById('rule_dest');
        var destWildcard = document.getElementById('rule_dest_wildcard');
        var portOp = document.getElementById('rule_port_op');
        var port = document.getElementById('rule_port');
        var portEnd = document.getElementById('rule_port_end');

        rule.protocol = protocol ? protocol.value : 'ip';

        // Destination IP
        var dest = destIP ? destIP.value.trim() : 'any';
        var destWild = destWildcard ? destWildcard.value.trim() : '255.255.255.255';

        if (dest.toLowerCase() === 'any') {
            dest = '0.0.0.0';
            destWild = '255.255.255.255';
        }

        rule.destIP = dest;
        rule.destWildcard = destWild;

        // Port configuration
        var portOperator = portOp ? portOp.value : '';
        var portValue = port ? port.value.trim() : '';

        if (portOperator && portValue) {
            rule.portOperator = portOperator;
            rule.dstPort = portValue;

            // Handle range
            if (portOperator === 'range' && portEnd) {
                rule.dstPortEnd = portEnd.value.trim();
            }
        } else {
            rule.dstPort = 'any';
        }
    }

    host.addACLRule(aclNumber, rule);

    // Refresh the display
    uimanager.getWindow("diveditacl").dispose();
    showEditACL(id, aclNumber);
}

function deleteACLRule(id, aclNumber, ruleIndex)
{
    var host = network.getElement(id);
    if (confirm("Delete this rule?")) {
        host.deleteACLRule(aclNumber, ruleIndex);
        // Refresh the display
        uimanager.getWindow("diveditacl").dispose();
        showEditACL(id, aclNumber);
    }
}

function deleteACL(id, aclNumber)
{
    var host = network.getElement(id);
    if (confirm("Delete ACL " + aclNumber + " and all its rules?")) {
        host.deleteACL(aclNumber);
        // Close editor
        uimanager.getWindow("diveditacl").dispose();
        removeBodyDiv('divbk');
        // Refresh main config
        uimanager.getWindow("divaclconfig").dispose();
        createACLConfigDiv(id);
    }
}

function closeEditACL(id)
{
    uimanager.getWindow("diveditacl").dispose();
    removeBodyDiv('divbk');
    // Refresh main config
    uimanager.getWindow("divaclconfig").dispose();
    createACLConfigDiv(id);
}

function showApplyACL(id)
{
    var host = network.getElement(id);
    createBkDiv();

    var innerHTML = '<div style="padding:20px;background:#1a1a2e;color:#e4e4e7;" class="help-content">';
    innerHTML += '<h4 style="margin:0 0 15px 0; color:#9ca3af;font-weight:600;">Apply ACL to Interface <span class="help-icon" onclick="showHelp(\'acl_direction\')">?</span></h4>';

    // Interface selector
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Interface:</label>';
    innerHTML += '<select id="acl_interface" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';

    var connectable = host.getConnectable();
    for (var i = 0; i < connectable.getConnectorNumber(); i++) {
        var ipInfo = connectable.getIPInfo(i);
        var ip = ipInfo ? ipInfo.getIPv4() : 'No IP';
        innerHTML += '<option value="' + i + '">Interface ' + i + ' (' + ip + ')</option>';
    }
    innerHTML += '</select>';
    innerHTML += '</div>';

    // Direction
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">Direction:</label>';
    innerHTML += '<select id="acl_direction" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
    innerHTML += '<option value="IN">INBOUND (filter traffic coming into the interface)</option>';
    innerHTML += '<option value="OUT">OUTBOUND (filter traffic leaving the interface)</option>';
    innerHTML += '</select>';
    innerHTML += '</div>';

    // ACL selector
    innerHTML += '<div style="margin-bottom:15px;">';
    innerHTML += '<label style="display:block; margin-bottom:5px; font-weight:500;color:#e4e4e7;">ACL:</label>';
    innerHTML += '<select id="acl_select" style="width:100%; padding:8px; background:#2a2d3e; color:#e4e4e7; border:1px solid #3a3d4e; border-radius:4px;">';
    innerHTML += '<option value="">-- Remove ACL --</option>';

    var acls = host.getACLs();
    for (var num in acls) {
        var acl = acls[num];
        innerHTML += '<option value="' + num + '">ACL ' + num + (acl.name ? ' (' + acl.name + ')' : '') + ' - ' + acl.rules.length + ' rules</option>';
    }
    innerHTML += '</select>';
    innerHTML += '</div>';

    innerHTML += '</div>';

    var controls = '<button onclick="applyACLToInterface(' + id + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;font-weight:500;">Apply</button>';
    controls += '<button onclick="cancelApplyACL()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;font-weight:500;">Cancel</button>';

    var w = new UIWindow('divapplyacl', 'Apply ACL to Interface', 500, 350, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function applyACLToInterface(id)
{
    var host = network.getElement(id);

    var interfaceNum = parseInt(document.getElementById('acl_interface').value);
    var direction = document.getElementById('acl_direction').value;
    var aclNumber = document.getElementById('acl_select').value;

    if (aclNumber === '') {
        // Remove ACL from interface
        host.removeACLFromInterface(interfaceNum, direction);
    } else {
        aclNumber = parseInt(aclNumber);
        host.applyACLToInterface(interfaceNum, direction, aclNumber);
    }

    // Close dialog
    uimanager.getWindow("divapplyacl").dispose();
    removeBodyDiv('divbk');

    // Refresh main config
    uimanager.getWindow("divaclconfig").dispose();
    createACLConfigDiv(id);
}

function cancelApplyACL()
{
    uimanager.getWindow("divapplyacl").dispose();
    removeBodyDiv('divbk');
}
