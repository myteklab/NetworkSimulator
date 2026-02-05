/*
 * Game Server UI Functions for NetworkSimulator
 * Handles configuration modals and UI interactions for game servers
 */

// Main configuration modal for game server
function configureGameServer(id) {
    createBkDiv();
    createGameServerConfigDiv(id);
}

function createGameServerConfigDiv(id) {
    var gameServer = network.getElement(id);
    
    if (!gameServer || !gameServer.getIsGameServer()) {
        console.error('Element is not a game server');
        return;
    }
    
    var innerHTML = '<div style="color:#e4e4e7;">';
    
    // Server Name
    innerHTML += '<div style="margin-bottom:20px;">';
    innerHTML += '<label style="display:block;margin-bottom:8px;color:#9ca3af;font-weight:500;">Server Name:</label>';
    innerHTML += '<input type="text" id="serverName" value="' + gameServer.getServerName() + '" ';
    innerHTML += 'style="width:100%;padding:8px;background:#2a2d3e;color:#e4e4e7;border:1px solid #3a3d4e;border-radius:4px;" />';
    innerHTML += '</div>';
    
    // Game Type Selection
    innerHTML += '<div style="margin-bottom:20px;">';
    innerHTML += '<label style="display:block;margin-bottom:8px;color:#9ca3af;font-weight:500;">Game Type:</label>';
    innerHTML += '<select id="gameType" onchange="updatePortForGame()" style="width:100%;padding:8px;background:#2a2d3e;color:#e4e4e7;border:1px solid #3a3d4e;border-radius:4px;">';
    innerHTML += '<option value="minecraft"' + (gameServer.getGameType() === 'minecraft' ? ' selected' : '') + '>🎮 Minecraft (Default: 25565)</option>';
    innerHTML += '<option value="csgo"' + (gameServer.getGameType() === 'csgo' ? ' selected' : '') + '>🔫 CS:GO / CS2 (Default: 27015)</option>';
    innerHTML += '<option value="terraria"' + (gameServer.getGameType() === 'terraria' ? ' selected' : '') + '>🌳 Terraria (Default: 7777)</option>';
    innerHTML += '<option value="rust"' + (gameServer.getGameType() === 'rust' ? ' selected' : '') + '>🔨 Rust (Default: 28015)</option>';
    innerHTML += '<option value="valheim"' + (gameServer.getGameType() === 'valheim' ? ' selected' : '') + '>⚔️ Valheim (Default: 2456)</option>';
    innerHTML += '<option value="ark"' + (gameServer.getGameType() === 'ark' ? ' selected' : '') + '>🦕 ARK (Default: 7777)</option>';
    innerHTML += '<option value="custom"' + (gameServer.getGameType() === 'custom' ? ' selected' : '') + '>⚙️ Custom</option>';
    innerHTML += '</select>';
    innerHTML += '</div>';
    
    // Port Configuration
    innerHTML += '<div style="margin-bottom:20px;">';
    innerHTML += '<label style="display:block;margin-bottom:8px;color:#9ca3af;font-weight:500;">Server Port:</label>';
    innerHTML += '<input type="number" id="gamePort" value="' + gameServer.getGamePort() + '" min="1" max="65535" ';
    innerHTML += 'style="width:100%;padding:8px;background:#2a2d3e;color:#e4e4e7;border:1px solid #3a3d4e;border-radius:4px;" />';
    innerHTML += '<small style="color:#6b7280;font-size:11px;">Port number for clients to connect (1-65535)</small>';
    innerHTML += '</div>';
    
    // Max Players
    innerHTML += '<div style="margin-bottom:20px;">';
    innerHTML += '<label style="display:block;margin-bottom:8px;color:#9ca3af;font-weight:500;">Max Players:</label>';
    innerHTML += '<input type="number" id="maxPlayers" value="' + gameServer.getMaxPlayers() + '" min="1" max="1000" ';
    innerHTML += 'style="width:100%;padding:8px;background:#2a2d3e;color:#e4e4e7;border:1px solid #3a3d4e;border-radius:4px;" />';
    innerHTML += '</div>';
    
    // Server Status Display
    innerHTML += '<div style="padding:15px;background:#16213e;border:1px solid #3a3d4e;border-radius:8px;margin-top:20px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0;color:#9ca3af;">Current Status</h4>';
    
    var statusColor = gameServer.getServerStatus() === 'online' ? '#10b981' : 
                     gameServer.getServerStatus() === 'starting' ? '#f59e0b' : '#ef4444';
    var statusText = gameServer.getServerStatus().charAt(0).toUpperCase() + gameServer.getServerStatus().slice(1);
    
    innerHTML += '<div style="display:flex;align-items:center;margin-bottom:8px;">';
    innerHTML += '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:' + statusColor + ';margin-right:8px;"></span>';
    innerHTML += '<span style="color:#e4e4e7;">Status: <strong>' + statusText + '</strong></span>';
    innerHTML += '</div>';
    
    innerHTML += '<div style="color:#e4e4e7;margin-bottom:8px;">Players Online: ' + gameServer.getCurrentPlayers() + ' / ' + gameServer.getMaxPlayers() + '</div>';
    innerHTML += '<div style="color:#e4e4e7;">Port: ' + gameServer.getGamePort() + '</div>';
    innerHTML += '</div>';
    
    innerHTML += '</div>';
    
    // Control buttons
    var controls = '<button onclick="saveGameServerConfig(' + id + ')" style="background:#10b981;color:white;padding:8px 16px;border:none;border-radius:6px;margin-right:10px;cursor:pointer;font-weight:500;">💾 Save</button>';
    controls += '<button onclick="cancelGameServerConfig()" style="background:#6b7280;color:white;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;font-weight:500;">Cancel</button>';
    
    var w = new UIWindow('divgameserverconfig', '🎮 Game Server Configuration', 500, 550, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

// Update port when game type changes
function updatePortForGame() {
    var gameType = document.getElementById('gameType').value;
    var portInput = document.getElementById('gamePort');
    
    var defaultPorts = {
        'minecraft': 25565,
        'csgo': 27015,
        'terraria': 7777,
        'rust': 28015,
        'valheim': 2456,
        'ark': 7777,
        'custom': 25565
    };
    
    if (defaultPorts[gameType]) {
        portInput.value = defaultPorts[gameType];
    }
}

// Save game server configuration
function saveGameServerConfig(id) {
    var gameServer = network.getElement(id);
    
    var serverName = document.getElementById('serverName').value;
    var gameType = document.getElementById('gameType').value;
    var gamePort = parseInt(document.getElementById('gamePort').value);
    var maxPlayers = parseInt(document.getElementById('maxPlayers').value);
    
    // Validate inputs
    if (gamePort < 1 || gamePort > 65535) {
        alert('Port must be between 1 and 65535');
        return;
    }
    
    if (maxPlayers < 1 || maxPlayers > 1000) {
        alert('Max players must be between 1 and 1000');
        return;
    }
    
    // Apply settings
    gameServer.setServerName(serverName);
    gameServer.setGameType(gameType);
    gameServer.setGamePort(gamePort);
    gameServer.setMaxPlayers(maxPlayers);
    
    // Close modal
    uimanager.getWindow("divgameserverconfig").dispose();
    removeBodyDiv('divbk');
    
    // Redraw to show updates
    if (network && network.render) {
        network.render();
    }
}

// Cancel configuration
function cancelGameServerConfig() {
    uimanager.getWindow("divgameserverconfig").dispose();
    removeBodyDiv('divbk');
}

// View server status modal
function viewGameServerStatus(id) {
    createBkDiv();
    createGameServerStatusDiv(id);
}

function createGameServerStatusDiv(id) {
    var gameServer = network.getElement(id);
    
    var innerHTML = '<div style="color:#e4e4e7;">';
    
    // Header with server name
    innerHTML += '<h3 style="margin:0 0 20px 0;color:#e4e4e7;">🎮 ' + gameServer.getServerName() + '</h3>';
    
    // Status section
    innerHTML += '<div style="padding:15px;background:#2a2d3e;border:1px solid #3a3d4e;border-radius:8px;margin-bottom:15px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0;color:#9ca3af;">Server Information</h4>';
    
    var statusColor = gameServer.getServerStatus() === 'online' ? '#10b981' : 
                     gameServer.getServerStatus() === 'starting' ? '#f59e0b' : '#ef4444';
    var statusIcon = gameServer.getServerStatus() === 'online' ? '🟢' : 
                    gameServer.getServerStatus() === 'starting' ? '🟡' : '🔴';
    
    innerHTML += '<table style="width:100%;color:#e4e4e7;background:#1a1d2e;border-collapse:collapse;border-radius:6px;overflow:hidden;">';
    innerHTML += '<tr style="border-bottom:1px solid #2a2d3e;"><td style="padding:8px 10px;color:#9ca3af;background:#16213e;">Status:</td><td style="padding:8px 10px;background:#1a1d2e;">' + statusIcon + ' ' + gameServer.getServerStatus().toUpperCase() + '</td></tr>';
    innerHTML += '<tr style="border-bottom:1px solid #2a2d3e;"><td style="padding:8px 10px;color:#9ca3af;background:#16213e;">Game Type:</td><td style="padding:8px 10px;background:#1a1d2e;">' + gameServer.getGameType().toUpperCase() + '</td></tr>';
    innerHTML += '<tr style="border-bottom:1px solid #2a2d3e;"><td style="padding:8px 10px;color:#9ca3af;background:#16213e;">Port:</td><td style="padding:8px 10px;background:#1a1d2e;">' + gameServer.getGamePort() + '</td></tr>';
    innerHTML += '<tr><td style="padding:8px 10px;color:#9ca3af;background:#16213e;">Players:</td><td style="padding:8px 10px;background:#1a1d2e;">' + gameServer.getCurrentPlayers() + ' / ' + gameServer.getMaxPlayers() + '</td></tr>';
    innerHTML += '</table>';
    innerHTML += '</div>';
    
    // Connected Players section
    innerHTML += '<div style="padding:15px;background:#2a2d3e;border:1px solid #3a3d4e;border-radius:8px;margin-bottom:15px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0;color:#9ca3af;">Connected Players</h4>';
    
    var players = gameServer.getConnectedPlayers();
    if (players.length > 0) {
        innerHTML += '<ul style="list-style:none;padding:0;margin:0;">';
        for (var i = 0; i < players.length; i++) {
            var connectTime = new Date(players[i].connectTime);
            var timeStr = connectTime.toLocaleTimeString();
            innerHTML += '<li style="padding:5px 0;color:#e4e4e7;">👤 ' + players[i].name + ' <small style="color:#6b7280;">(joined ' + timeStr + ')</small></li>';
        }
        innerHTML += '</ul>';
    } else {
        innerHTML += '<p style="color:#6b7280;font-style:italic;margin:0;">No players connected</p>';
    }
    innerHTML += '</div>';
    
    // Connection Info (for port forwarding setup)
    innerHTML += '<div style="padding:15px;background:#16213e;border:1px solid #10b981;border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0;color:#10b981;">Connection Information</h4>';
    innerHTML += '<p style="margin:5px 0;color:#e4e4e7;font-size:12px;">To allow external connections, configure port forwarding:</p>';
    innerHTML += '<p style="margin:5px 0;color:#9ca3af;font-size:11px;">• Forward external port <strong>' + gameServer.getGamePort() + '</strong> to this server\'s IP</p>';
    innerHTML += '<p style="margin:5px 0;color:#9ca3af;font-size:11px;">• Protocol: TCP/UDP (depending on game)</p>';
    innerHTML += '<p style="margin:5px 0;color:#9ca3af;font-size:11px;">• Ensure firewall allows traffic on this port</p>';
    innerHTML += '</div>';
    
    innerHTML += '</div>';
    
    // Control buttons
    var controls = '';
    if (gameServer.getServerStatus() === 'offline') {
        controls += '<button onclick="startGameServer(' + id + ')" style="background:#10b981;color:white;padding:8px 16px;border:none;border-radius:6px;margin-right:10px;cursor:pointer;font-weight:500;">▶️ Start Server</button>';
    } else {
        controls += '<button onclick="stopGameServer(' + id + ')" style="background:#ef4444;color:white;padding:8px 16px;border:none;border-radius:6px;margin-right:10px;cursor:pointer;font-weight:500;">⏹️ Stop Server</button>';
    }
    controls += '<button onclick="closeGameServerStatus()" style="background:#6b7280;color:white;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;font-weight:500;">Close</button>';
    
    var w = new UIWindow('divgameserverstatus', '📊 Game Server Status', 500, 550, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function closeGameServerStatus() {
    uimanager.getWindow("divgameserverstatus").dispose();
    removeBodyDiv('divbk');
}

// Start game server
function startGameServer(id) {
    var gameServer = network.getElement(id);
    
    // Set status to starting
    gameServer.setServerStatus('starting');
    
    // Refresh status window immediately to show starting state
    if (uimanager.getWindow("divgameserverstatus")) {
        uimanager.getWindow("divgameserverstatus").dispose();
        createGameServerStatusDiv(id);
    }
    
    // Simulate server startup time
    setTimeout(function() {
        gameServer.setServerStatus('online');
        // Refresh any open status windows
        if (uimanager.getWindow("divgameserverstatus")) {
            uimanager.getWindow("divgameserverstatus").dispose();
            createGameServerStatusDiv(id);
        }
        // Redraw network to show status change
        if (network && network.render) {
            network.render();
        }
    }, 2000);
    
    // Redraw network
    if (network && network.render) {
        network.render();
    }
}

// Stop game server
function stopGameServer(id) {
    var gameServer = network.getElement(id);
    
    // Clear all connected players
    var players = gameServer.getConnectedPlayers();
    for (var i = players.length - 1; i >= 0; i--) {
        gameServer.removePlayer(players[i].name);
    }
    
    // Set status to offline
    gameServer.setServerStatus('offline');
    
    // Refresh any open status windows
    if (uimanager.getWindow("divgameserverstatus")) {
        uimanager.getWindow("divgameserverstatus").dispose();
        createGameServerStatusDiv(id);
    }
    
    // Redraw network
    if (network && network.render) {
        network.render();
    }
}

// Test function to simulate player connections
function simulatePlayerConnection(id, playerName) {
    var gameServer = network.getElement(id);
    
    if (gameServer.getServerStatus() !== 'online') {
	// console.log('Server must be online to accept connections');
        return false;
    }
    
    if (gameServer.addPlayer(playerName || 'Player' + (gameServer.getCurrentPlayers() + 1))) {
	// console.log('Player connected successfully');
        if (network && network.render) {
            network.render();
        }
        return true;
    } else {
	// console.log('Server is full');
        return false;
    }
}

// Test function to simulate external connection through port forwarding
function simulateExternalConnection(gameServerId) {
    var gameServer = network.getElement(gameServerId);
    if (!gameServer || !gameServer.getIsGameServer()) {
        alert('Invalid game server');
        return;
    }
    
    if (gameServer.getServerStatus() !== 'online') {
        alert('Server must be online to test connections');
        return;
    }
    
    // Find if there's a firewall with port forwarding rules for this server
    var serverIP = null;
    if (gameServer.getConnectable) {
        var connectable = gameServer.getConnectable();
        if (connectable && connectable.getIPInfo) {
            var ipInfo = connectable.getIPInfo(0);
            if (ipInfo && ipInfo.getIPv4) {
                serverIP = ipInfo.getIPv4();
            }
        }
    }
    
    if (!serverIP) {
        alert('Game server has no IP address configured');
        return;
    }
    
    // Check for port forwarding rules
    var portForwardFound = false;
    var elements = network.getElements();
    for (var id in elements) {
        var element = elements[id];
        if (element && element.getType && element.getType() === 'firewall') {
            if (element.getPortForwardRules) {
                var rules = element.getPortForwardRules();
                for (var i = 0; i < rules.length; i++) {
                    var rule = rules[i];
                    if (rule.enabled && rule.internalIP === serverIP && rule.internalPort == gameServer.getGamePort()) {
                        portForwardFound = true;
                        
                        // Simulate external connection message
	// console.log('[TEST] Simulating external connection to port ' + rule.externalPort);
	// console.log('[TEST] Port forwarding rule found: External:' + rule.externalPort + ' -> ' + rule.internalIP + ':' + rule.internalPort);
                        
                        // Add a test player to show the connection worked
                        var testPlayerName = 'External_Player_' + (gameServer.getCurrentPlayers() + 1);
                        if (gameServer.addPlayer(testPlayerName)) {
                            // Show success notification
                            var notification = document.createElement('div');
                            notification.style.cssText = 'position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg, #10b981, #059669);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 20px rgba(16,185,129,0.3);font-family:Inter,sans-serif;font-size:13px;z-index:9999;animation:slideIn 0.3s ease;';
                            notification.innerHTML = '✅ External connection successful!<br>' + 
                                                    '🌍 External port ' + rule.externalPort + ' → 🎮 ' + serverIP + ':' + rule.internalPort + '<br>' +
                                                    '👤 ' + testPlayerName + ' connected';
                            document.body.appendChild(notification);
                            
                            setTimeout(function() {
                                notification.style.animation = 'slideOut 0.3s ease';
                                setTimeout(function() {
                                    if (notification.parentNode) {
                                        document.body.removeChild(notification);
                                    }
                                }, 300);
                            }, 5000);
                            
                            // Refresh any open status windows
                            if (uimanager.getWindow("divgameserverstatus")) {
                                uimanager.getWindow("divgameserverstatus").dispose();
                                createGameServerStatusDiv(gameServerId);
                            }
                            
                            // Redraw network
                            if (network && network.render) {
                                network.render();
                            }
                        } else {
                            alert('Server is full');
                        }
                        
                        return;
                    }
                }
            }
        }
    }
    
    if (!portForwardFound) {
        alert('No port forwarding rule found for this game server!\n\n' +
              'Server IP: ' + serverIP + '\n' +
              'Server Port: ' + gameServer.getGamePort() + '\n\n' +
              'Please configure port forwarding in the firewall first.');
    }
}