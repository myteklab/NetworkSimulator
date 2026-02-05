/*
 * This file is part of the Education Network Simulator project and covered 
 * by GPLv3 license. See full terms in the LICENSE file at the root folder
 * or at http://www.gnu.org/licenses/gpl-3.0.html.
 * 
 * RADIUS Server Implementation
 * Phase 1: Basic RADIUS with PAP Authentication
 * 
 */

// UI Functions for RADIUS Server Configuration
function editRADIUSServerInfo(id) {
    createBkDiv();
    createRADIUSServerInfoDiv(id);
}

function createRADIUSServerInfoDiv(id) {
    var host = network.getElement(id);
    var app = host.getApp("RADIUSServer");
    
    var controls = '<input type="button" id="upload" value="' + _("Save") + '" onclick="saveRADIUSServerData(' + id + ');" />';
    controls += '<input type="button" id="cancel" value="' + _("Cancel") + '" onclick="cancelRADIUSServerData();" />';
    
    var w = new UIWindow('divradiusserverinfo', 'RADIUS Server Configuration', 500, 600, false, 1.0);
    w.setContent(app.getAppController());
    w.setControls(controls);
    w.render();
}

function saveRADIUSServerData(id) {
    var elem = network.getElement(id);
    var app = elem.getApp("RADIUSServer");
    
    // Save server settings
    var authPort = document.getElementById('radiusAuthPort').value;
    var acctPort = document.getElementById('radiusAcctPort').value;
    var sessionTimeout = document.getElementById('radiusSessionTimeout').value;
    
    app.setServerConfig({
        authPort: parseInt(authPort) || 1812,
        acctPort: parseInt(acctPort) || 1813,
        sessionTimeout: parseInt(sessionTimeout) || 3600
    });
    
    removeBodyDiv('divbk');
    uimanager.getWindow("divradiusserverinfo").dispose();
}

function cancelRADIUSServerData() {
    removeBodyDiv('divbk');
    uimanager.getWindow("divradiusserverinfo").dispose();
}

// Additional UI functions for user management
function addRADIUSUser(serverId) {
    // Create dark-themed modal for user creation
    var modalHtml = '<div id="radiusAddUserModal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:10000;display:flex;align-items:center;justify-content:center;">';
    modalHtml += '<div style="background:#2a2d3e;border-radius:8px;padding:0;width:400px;box-shadow:0 4px 20px rgba(0,0,0,0.5);">';
    
    // Modal header
    modalHtml += '<div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;padding:15px 20px;border-radius:8px 8px 0 0;">';
    modalHtml += '<h3 style="margin:0;font-size:16px;font-weight:600;">Add RADIUS User</h3>';
    modalHtml += '</div>';
    
    // Modal content
    modalHtml += '<div style="padding:20px;">';
    
    // Username field
    modalHtml += '<div style="margin-bottom:15px;">';
    modalHtml += '<label style="display:block;color:#e4e4e7;margin-bottom:5px;font-size:13px;">Username <span style="color:#ef4444;">*</span></label>';
    modalHtml += '<input type="text" id="radiusNewUsername" style="width:100%;padding:8px 12px;background:#1a1d2e;border:1px solid #4a5568;border-radius:4px;color:white;font-size:13px;box-sizing:border-box;" placeholder="Enter username" autofocus>';
    modalHtml += '</div>';
    
    // Password field
    modalHtml += '<div style="margin-bottom:15px;">';
    modalHtml += '<label style="display:block;color:#e4e4e7;margin-bottom:5px;font-size:13px;">Password <span style="color:#ef4444;">*</span></label>';
    modalHtml += '<input type="password" id="radiusNewPassword" style="width:100%;padding:8px 12px;background:#1a1d2e;border:1px solid #4a5568;border-radius:4px;color:white;font-size:13px;box-sizing:border-box;" placeholder="Enter password">';
    modalHtml += '</div>';
    
    // Group field
    modalHtml += '<div style="margin-bottom:20px;">';
    modalHtml += '<label style="display:block;color:#e4e4e7;margin-bottom:5px;font-size:13px;">User Group</label>';
    modalHtml += '<select id="radiusNewGroup" style="width:100%;padding:8px 12px;background:#1a1d2e;border:1px solid #4a5568;border-radius:4px;color:white;font-size:13px;box-sizing:border-box;">';
    modalHtml += '<option value="users">Users</option>';
    modalHtml += '<option value="administrators">Administrators</option>';
    modalHtml += '<option value="guests">Guests</option>';
    modalHtml += '<option value="wireless">Wireless Users</option>';
    modalHtml += '<option value="vpn">VPN Users</option>';
    modalHtml += '</select>';
    modalHtml += '</div>';
    
    // Error message area
    modalHtml += '<div id="radiusUserError" style="color:#ef4444;font-size:12px;margin-bottom:15px;display:none;"></div>';
    
    // Buttons
    modalHtml += '<div style="display:flex;justify-content:flex-end;gap:10px;">';
    modalHtml += '<button onclick="cancelAddRADIUSUser()" style="background:#4a5568;color:white;border:none;padding:8px 20px;border-radius:4px;cursor:pointer;font-size:13px;">Cancel</button>';
    modalHtml += '<button onclick="confirmAddRADIUSUser(' + serverId + ')" style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;border:none;padding:8px 20px;border-radius:4px;cursor:pointer;font-size:13px;">Add User</button>';
    modalHtml += '</div>';
    
    modalHtml += '</div>';
    modalHtml += '</div>';
    modalHtml += '</div>';
    
    // Add modal to page
    var modalDiv = document.createElement('div');
    modalDiv.innerHTML = modalHtml;
    document.body.appendChild(modalDiv.firstChild);
    
    // Focus username field
    setTimeout(function() {
        var usernameField = document.getElementById('radiusNewUsername');
        if (usernameField) usernameField.focus();
    }, 100);
    
    // Add enter key handler
    var handleEnter = function(e) {
        if (e.key === 'Enter') {
            confirmAddRADIUSUser(serverId);
        } else if (e.key === 'Escape') {
            cancelAddRADIUSUser();
        }
    };
    document.getElementById('radiusNewUsername').addEventListener('keydown', handleEnter);
    document.getElementById('radiusNewPassword').addEventListener('keydown', handleEnter);
}

function confirmAddRADIUSUser(serverId) {
    var username = document.getElementById('radiusNewUsername').value.trim();
    var password = document.getElementById('radiusNewPassword').value;
    var group = document.getElementById('radiusNewGroup').value;
    var errorDiv = document.getElementById('radiusUserError');
    
    // Validation
    if (!username) {
        errorDiv.textContent = 'Username is required';
        errorDiv.style.display = 'block';
        document.getElementById('radiusNewUsername').focus();
        return;
    }
    
    if (!password) {
        errorDiv.textContent = 'Password is required';
        errorDiv.style.display = 'block';
        document.getElementById('radiusNewPassword').focus();
        return;
    }
    
    if (password.length < 4) {
        errorDiv.textContent = 'Password must be at least 4 characters';
        errorDiv.style.display = 'block';
        document.getElementById('radiusNewPassword').focus();
        return;
    }
    
    // Add the user
    var elem = network.getElement(serverId);
    var app = elem.getApp("RADIUSServer");
    app.addUser(username, password, group);
    
    // Close modal
    cancelAddRADIUSUser();
    
    // Refresh the UI
    updateRADIUSUserList(serverId);
}

function cancelAddRADIUSUser() {
    var modal = document.getElementById('radiusAddUserModal');
    if (modal) {
        modal.remove();
    }
}

function deleteRADIUSUser(serverId, username) {
    // Create dark-themed confirmation modal
    var modalHtml = '<div id="radiusDeleteModal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:10000;display:flex;align-items:center;justify-content:center;">';
    modalHtml += '<div style="background:#2a2d3e;border-radius:8px;padding:0;width:380px;box-shadow:0 4px 20px rgba(0,0,0,0.5);">';
    
    // Modal header with warning color
    modalHtml += '<div style="background:linear-gradient(135deg, #ef4444 0%, #dc2626 100%);color:white;padding:15px 20px;border-radius:8px 8px 0 0;">';
    modalHtml += '<h3 style="margin:0;font-size:16px;font-weight:600;">⚠️ Delete User</h3>';
    modalHtml += '</div>';
    
    // Modal content
    modalHtml += '<div style="padding:20px;">';
    modalHtml += '<p style="color:#e4e4e7;margin:0 0 20px 0;font-size:14px;">Are you sure you want to delete user <strong style="color:#ef4444;">' + username + '</strong>?</p>';
    modalHtml += '<p style="color:#9ca3af;margin:0 0 20px 0;font-size:12px;">This action cannot be undone.</p>';
    
    // Buttons
    modalHtml += '<div style="display:flex;justify-content:flex-end;gap:10px;">';
    modalHtml += '<button onclick="cancelDeleteRADIUSUser()" style="background:#4a5568;color:white;border:none;padding:8px 20px;border-radius:4px;cursor:pointer;font-size:13px;">Cancel</button>';
    modalHtml += '<button onclick="confirmDeleteRADIUSUser(' + serverId + ', \'' + username.replace(/'/g, "\\'") + '\')" style="background:linear-gradient(135deg, #ef4444 0%, #dc2626 100%);color:white;border:none;padding:8px 20px;border-radius:4px;cursor:pointer;font-size:13px;">Delete User</button>';
    modalHtml += '</div>';
    
    modalHtml += '</div>';
    modalHtml += '</div>';
    modalHtml += '</div>';
    
    // Add modal to page
    var modalDiv = document.createElement('div');
    modalDiv.innerHTML = modalHtml;
    document.body.appendChild(modalDiv.firstChild);
    
    // Add escape key handler
    var handleEscape = function(e) {
        if (e.key === 'Escape') {
            cancelDeleteRADIUSUser();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function confirmDeleteRADIUSUser(serverId, username) {
    var elem = network.getElement(serverId);
    var app = elem.getApp("RADIUSServer");
    app.deleteUser(username);
    
    // Close modal
    cancelDeleteRADIUSUser();
    
    // Refresh the UI
    updateRADIUSUserList(serverId);
}

function cancelDeleteRADIUSUser() {
    var modal = document.getElementById('radiusDeleteModal');
    if (modal) {
        modal.remove();
    }
}

function updateRADIUSUserList(serverId) {
    var elem = network.getElement(serverId);
    var app = elem.getApp("RADIUSServer");
    var userListDiv = document.getElementById('radiusUserList');
    if (userListDiv) {
        userListDiv.innerHTML = app.getUserListHTML();
    }
}

// View authentication logs
function viewRADIUSLogs(id) {
    var host = network.getElement(id);
    var app = host.getApp("RADIUSServer");
    
    var controls = '<input type="button" value="' + _("Clear Logs") + '" onclick="clearRADIUSLogs(' + id + ');" />';
    controls += '<input type="button" value="' + _("Close") + '" onclick="closeRADIUSLogs();" />';
    
    var w = new UIWindow('divradiuslogs', 'RADIUS Authentication Logs', 600, 400, false, 1.0);
    w.setContent(app.getLogsHTML());
    w.setControls(controls);
    w.render();
}

function clearRADIUSLogs(id) {
    var host = network.getElement(id);
    var app = host.getApp("RADIUSServer");
    app.clearLogs();
    
    // Refresh the logs display
    var w = uimanager.getWindow("divradiuslogs");
    if (w) {
        w.setContent(app.getLogsHTML());
    }
}

function closeRADIUSLogs() {
    uimanager.getWindow("divradiuslogs").dispose();
}

// Main RADIUS Server class
var RADIUSServer = function(ifacepos) {
    var owner = null;
    var ifacepos = ifacepos;
    
    // Server configuration
    var config = {
        authPort: 1812,        // Authentication port
        acctPort: 1813,        // Accounting port
        sessionTimeout: 3600,  // Default session timeout in seconds
        defaultAuth: 'PAP',    // Default authentication method
        serverStatus: 'running' // 'running' or 'stopped'
    };
    
    // User database
    var users = [];  // Array of {username, password, group, attributes}
    
    // NAS (Network Access Server) clients
    var nasClients = [];  // Array of {ip, secret, name}
    
    // Authentication logs
    var authLogs = [];  // Array of {timestamp, username, nasIP, result, message}
    var maxLogs = 100;  // Keep last 100 log entries
    
    // Active sessions
    var sessions = new Map();  // Map of sessionId -> session data
    
    // Statistics
    var stats = {
        totalRequests: 0,
        successfulAuths: 0,
        failedAuths: 0,
        activeSessionCount: 0
    };
    
    this.save = function() {
        var result = {};
        result.version = 1;
        result.id = this.getId();
        result.ifacepos = ifacepos;
        result.config = config;
        result.users = users;
        result.nasClients = nasClients;
        result.stats = stats;
        
        return result;
    };
    
    this.load = function(data) {
        if (data.config) config = data.config;
        if (data.users) users = data.users;
        if (data.nasClients) nasClients = data.nasClients;
        if (data.stats) stats = data.stats;
    };
    
    this.setOwner = function(o) {
        owner = o;
    };
    
    this.getId = function() {
        return "RADIUSServer";
    };
    
    this.getPort = function() {
        return config.authPort;
    };
    
    this.getIfacepos = function() {
        return ifacepos;
    };
    
    // Server configuration methods
    this.setServerConfig = function(newConfig) {
        if (newConfig.authPort) config.authPort = newConfig.authPort;
        if (newConfig.acctPort) config.acctPort = newConfig.acctPort;
        if (newConfig.sessionTimeout) config.sessionTimeout = newConfig.sessionTimeout;
        
        // Update port registration with host
        if (owner && owner.updateAppPort) {
            owner.updateAppPort("RADIUSServer", config.authPort);
        }
    };
    
    // User management methods
    this.addUser = function(username, password, group) {
        // Check if user already exists
        var existingUser = users.find(function(u) { return u.username === username; });
        if (existingUser) {
            existingUser.password = password;
            existingUser.group = group || 'users';
        } else {
            users.push({
                username: username,
                password: password,  // In production, this would be hashed
                group: group || 'users',
                attributes: {},
                enabled: true
            });
        }
    };
    
    this.deleteUser = function(username) {
        users = users.filter(function(u) { return u.username !== username; });
    };
    
    this.getUsers = function() {
        return users;
    };
    
    // NAS client management
    this.addNASClient = function(ip, secret, name) {
        nasClients.push({
            ip: ip,
            secret: secret,
            name: name || ip
        });
    };
    
    this.deleteNASClient = function(ip) {
        nasClients = nasClients.filter(function(n) { return n.ip !== ip; });
    };
    
    this.getNASClients = function() {
        return nasClients;
    };
    
    // Authentication methods

    // Main authentication entry point - called by RADIUS clients (switches/routers)
    this.authenticateUser = function(username, password, nasIP, sharedSecret) {
        // For educational purposes, we simplify NAS client validation
        // In production RADIUS, the shared secret would be validated and used for encryption

        // Log the authentication attempt
        console.log('RADIUS Server: Authenticating user:', username, 'from NAS:', nasIP);

        // Call the PAP authentication method
        var result = this.authenticatePAP(username, password, nasIP);

        // Convert the result to a format expected by the client
        return {
            success: result.code === 'Access-Accept',
            message: result.message,
            sessionId: result.sessionId,
            attributes: result.attributes
        };
    };

    this.authenticatePAP = function(username, password, nasIP) {
        stats.totalRequests++;

        console.log('RADIUS authenticatePAP called:');
        console.log('  Username:', username);
        console.log('  Password:', password);
        console.log('  NAS IP:', nasIP);
        console.log('  Total users in database:', users.length);
        console.log('  Users:', users);

        // Find the user
        var user = users.find(function(u) {
            return u.username === username && u.enabled;
        });

        console.log('  Found user:', user);

        if (!user) {
            stats.failedAuths++;
            this.addLog(username, nasIP, 'REJECT', 'User not found');
            console.log('  REJECT: User not found');
            return {
                code: 'Access-Reject',
                message: 'Invalid username or password'
            };
        }

        // Check password (simplified - no hashing for educational purposes)
        console.log('  Comparing passwords:', user.password, '===', password, '?', user.password === password);
        if (user.password !== password) {
            stats.failedAuths++;
            this.addLog(username, nasIP, 'REJECT', 'Invalid password');
            console.log('  REJECT: Invalid password');
            return {
                code: 'Access-Reject',
                message: 'Invalid username or password'
            };
        }

        // Authentication successful
        stats.successfulAuths++;
        this.addLog(username, nasIP, 'ACCEPT', 'PAP authentication successful');

        // Create session
        var sessionId = this.generateSessionId();
        sessions.set(sessionId, {
            username: username,
            nasIP: nasIP,
            startTime: Date.now(),
            timeout: config.sessionTimeout
        });
        stats.activeSessionCount = sessions.size;

        return {
            code: 'Access-Accept',
            message: 'Authentication successful',
            sessionId: sessionId,
            attributes: user.attributes || {}
        };
    };
    
    // Process incoming RADIUS packet
    this.processPacket = function(packet, sourceIP) {
        // Check if source is an authorized NAS
        var nas = nasClients.find(function(n) { return n.ip === sourceIP; });
        if (!nas) {
            this.addLog('unknown', sourceIP, 'REJECT', 'Unknown NAS client');
            return null;
        }
        
        // Process based on packet type
        switch(packet.code) {
            case 'Access-Request':
                return this.handleAccessRequest(packet, nas);
            case 'Accounting-Request':
                return this.handleAccountingRequest(packet, nas);
            default:
                return null;
        }
    };
    
    this.handleAccessRequest = function(packet, nas) {
        var username = packet.attributes['User-Name'];
        var password = packet.attributes['User-Password'];
        
        if (!username || !password) {
            return {
                code: 'Access-Reject',
                message: 'Missing credentials'
            };
        }
        
        // For now, only PAP is supported
        return this.authenticatePAP(username, password, nas.ip);
    };
    
    this.handleAccountingRequest = function(packet, nas) {
        // Basic accounting - just acknowledge
        return {
            code: 'Accounting-Response'
        };
    };
    
    // Logging methods
    this.addLog = function(username, nasIP, result, message) {
        var logEntry = {
            timestamp: new Date().toISOString(),
            username: username,
            nasIP: nasIP,
            result: result,
            message: message
        };

        authLogs.unshift(logEntry);  // Add to beginning

        console.log('📝 RADIUS Log Added:', logEntry);
        console.log('   Total logs now:', authLogs.length);

        // Keep only last maxLogs entries
        if (authLogs.length > maxLogs) {
            authLogs = authLogs.slice(0, maxLogs);
        }
    };
    
    this.getLogs = function() {
        return authLogs;
    };
    
    this.clearLogs = function() {
        authLogs = [];
    };
    
    // Utility methods
    this.generateSessionId = function() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    };
    
    // UI Controller methods
    this.getAppController = function() {
        var html = '<div style="padding: 10px; background: #2a2d3e; color: white; border-radius: 8px;">';
        
        // Server Settings section
        html += '<h3 style="color: #667eea; margin-bottom: 15px;">▼ Server Settings</h3>';
        html += '<div style="margin-bottom: 20px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 4px;">';
        html += '<label style="display: inline-block; width: 150px;">Auth Port:</label>';
        html += '<input type="number" id="radiusAuthPort" value="' + config.authPort + '" style="width: 80px; background: #1a1d2e; color: white; border: 1px solid #667eea; padding: 4px; border-radius: 4px;"><br><br>';
        html += '<label style="display: inline-block; width: 150px;">Accounting Port:</label>';
        html += '<input type="number" id="radiusAcctPort" value="' + config.acctPort + '" style="width: 80px; background: #1a1d2e; color: white; border: 1px solid #667eea; padding: 4px; border-radius: 4px;"><br><br>';
        html += '<label style="display: inline-block; width: 150px;">Session Timeout (sec):</label>';
        html += '<input type="number" id="radiusSessionTimeout" value="' + config.sessionTimeout + '" style="width: 80px; background: #1a1d2e; color: white; border: 1px solid #667eea; padding: 4px; border-radius: 4px;">';
        html += '</div>';
        
        // Users section
        html += '<h3 style="color: #667eea; margin-bottom: 15px;">▼ Users</h3>';
        html += '<div id="radiusUserList" style="margin-bottom: 20px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 4px;">';
        html += this.getUserListHTML();
        html += '</div>';
        html += '<button onclick="addRADIUSUser(' + (owner ? owner.id : 0) + ')" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">+ Add User</button>';
        
        // Statistics section
        html += '<h3 style="color: #667eea; margin: 20px 0 15px 0;">▼ Statistics</h3>';
        html += '<div style="padding: 10px; background: rgba(255,255,255,0.05); border-radius: 4px;">';
        html += '<div>Total Requests: ' + stats.totalRequests + '</div>';
        html += '<div>Successful Auths: ' + stats.successfulAuths + '</div>';
        html += '<div>Failed Auths: ' + stats.failedAuths + '</div>';
        html += '<div>Active Sessions: ' + stats.activeSessionCount + '</div>';
        html += '</div>';
        
        // View logs button
        html += '<div style="margin-top: 20px;">';
        html += '<button onclick="viewRADIUSLogs(' + (owner ? owner.id : 0) + ')" style="background: #667eea; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-right: 10px;">View Logs</button>';
        html += '</div>';
        
        html += '</div>';
        return html;
    };
    
    this.getUserListHTML = function() {
        if (users.length === 0) {
            return '<div style="color: #999;">No users configured</div>';
        }
        
        var html = '<table style="width: 100%; border-collapse: collapse;">';
        html += '<tr style="border-bottom: 1px solid #667eea;">';
        html += '<th style="text-align: left; padding: 5px;">Username</th>';
        html += '<th style="text-align: left; padding: 5px;">Group</th>';
        html += '<th style="text-align: left; padding: 5px;">Status</th>';
        html += '<th style="text-align: left; padding: 5px;">Action</th>';
        html += '</tr>';
        
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            html += '<tr>';
            html += '<td style="padding: 5px;">' + user.username + '</td>';
            html += '<td style="padding: 5px;">' + (user.group || 'users') + '</td>';
            html += '<td style="padding: 5px;">' + (user.enabled ? '🟢 Active' : '🔴 Disabled') + '</td>';
            html += '<td style="padding: 5px;">';
            html += '<span onclick="deleteRADIUSUser(' + (owner ? owner.id : 0) + ', \'' + user.username + '\')" style="cursor: pointer; color: #ff6b6b;">🗑️</span>';
            html += '</td>';
            html += '</tr>';
        }
        
        html += '</table>';
        return html;
    };
    
    this.getLogsHTML = function() {
        var html = '<div style="padding: 10px; background: #2a2d3e; color: white; height: 100%; overflow-y: auto;">';
        
        if (authLogs.length === 0) {
            html += '<div style="text-align: center; color: #999; padding: 20px;">No authentication attempts yet</div>';
        } else {
            html += '<table style="width: 100%; border-collapse: collapse; font-size: 12px;">';
            html += '<tr style="border-bottom: 1px solid #667eea;">';
            html += '<th style="text-align: left; padding: 5px;">Timestamp</th>';
            html += '<th style="text-align: left; padding: 5px;">Username</th>';
            html += '<th style="text-align: left; padding: 5px;">NAS IP</th>';
            html += '<th style="text-align: left; padding: 5px;">Result</th>';
            html += '<th style="text-align: left; padding: 5px;">Message</th>';
            html += '</tr>';
            
            for (var i = 0; i < authLogs.length; i++) {
                var log = authLogs[i];
                var rowColor = log.result === 'ACCEPT' ? 'rgba(76, 175, 80, 0.1)' : 
                              log.result === 'REJECT' ? 'rgba(244, 67, 54, 0.1)' : 'transparent';
                html += '<tr style="background: ' + rowColor + ';">';
                html += '<td style="padding: 5px; font-size: 11px;">' + log.timestamp + '</td>';
                html += '<td style="padding: 5px;">' + log.username + '</td>';
                html += '<td style="padding: 5px;">' + log.nasIP + '</td>';
                html += '<td style="padding: 5px;">' + 
                       (log.result === 'ACCEPT' ? '✅ ' : log.result === 'REJECT' ? '❌ ' : '') + 
                       log.result + '</td>';
                html += '<td style="padding: 5px;">' + log.message + '</td>';
                html += '</tr>';
            }
            
            html += '</table>';
        }
        
        html += '</div>';
        return html;
    };
    
    // Visual indicator for RADIUS server status
    this.getStatusIndicator = function() {
        if (config.serverStatus === 'running') {
            if (stats.activeSessionCount > 0) {
                return '🟢';  // Active with sessions
            }
            return '🔵';  // Running but idle
        }
        return '🔴';  // Stopped
    };
    
    // Menu entries for the context menu
    this.getMenuEntries = function() {
        var data = [];
        
        data[0] = {};
        data[0].img = 'img/64/envelope-DHCP.png';  // Using DHCP icon temporarily
        data[0].text = 'Edit RADIUS server info';
        data[0].js = 'editRADIUSServerInfo(' + (owner ? owner.id : 0) + ');';
        
        data[1] = {};
        data[1].img = null;  // Use emoji instead
        data[1].emoji = '📋';
        data[1].text = 'View Authentication Logs';
        data[1].js = 'viewRADIUSLogs(' + (owner ? owner.id : 0) + ');';
        
        return data;
    };
};