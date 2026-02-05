/*
 * Game Client UI Functions for NetworkSimulator
 * Handles UI for computers connecting to game servers
 */

// Main function to connect to game server
function connectToGameServer(id) {
    createBkDiv();
    createGameConnectionDiv(id);
}

function createGameConnectionDiv(id) {
    var computer = network.getElement(id);
    
    // Find all game servers in the network
    var gameServers = findGameServers();
    
    var innerHTML = '<div style="color:#e4e4e7;">';
    
    // Player name configuration
    innerHTML += '<div style="margin-bottom:20px;">';
    innerHTML += '<label style="display:block;margin-bottom:8px;color:#9ca3af;font-weight:500;">Player Name:</label>';
    innerHTML += '<input type="text" id="playerName" value="Player' + Math.floor(Math.random() * 9999) + '" ';
    innerHTML += 'style="width:100%;padding:8px;background:#2a2d3e;color:#e4e4e7;border:1px solid #3a3d4e;border-radius:4px;" />';
    innerHTML += '</div>';
    
    // Server selection
    innerHTML += '<div style="margin-bottom:20px;">';
    innerHTML += '<label style="display:block;margin-bottom:8px;color:#9ca3af;font-weight:500;">Select Game Server:</label>';
    
    if (gameServers.length > 0) {
        innerHTML += '<div style="max-height:200px;overflow-y:auto;background:#16213e;border:1px solid #3a3d4e;border-radius:8px;padding:10px;">';
        
        for (var i = 0; i < gameServers.length; i++) {
            var server = gameServers[i];
            var serverIP = server.ip || 'No IP';
            var statusColor = server.status === 'online' ? '#10b981' : 
                             server.status === 'starting' ? '#f59e0b' : '#ef4444';
            var gameIcon = getGameIcon(server.gameType);
            
            innerHTML += '<div style="padding:10px;background:#1a1d2e;border:1px solid #3a3d4e;border-radius:6px;margin-bottom:8px;cursor:pointer;" ';
            innerHTML += 'onclick="selectGameServer(\'' + serverIP + '\', ' + server.port + ', \'' + server.name + '\')" ';
            innerHTML += 'onmouseover="this.style.background=\'#2a2d3e\'" onmouseout="this.style.background=\'#1a1d2e\'">';
            
            innerHTML += '<div style="display:flex;justify-content:space-between;align-items:center;">';
            innerHTML += '<div>';
            innerHTML += '<div style="font-weight:500;color:#e4e4e7;">' + gameIcon + ' ' + server.name + '</div>';
            innerHTML += '<div style="font-size:12px;color:#9ca3af;margin-top:4px;">IP: ' + serverIP + ':' + server.port + '</div>';
            innerHTML += '<div style="font-size:12px;color:#9ca3af;">Type: ' + server.gameType + '</div>';
            innerHTML += '<div style="font-size:12px;color:#9ca3af;">Players: ' + server.currentPlayers + '/' + server.maxPlayers + '</div>';
            innerHTML += '</div>';
            innerHTML += '<div style="display:flex;align-items:center;">';
            innerHTML += '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + statusColor + ';"></span>';
            innerHTML += '<span style="margin-left:6px;color:#9ca3af;font-size:12px;">' + server.status + '</span>';
            innerHTML += '</div>';
            innerHTML += '</div>';
            
            innerHTML += '</div>';
        }
        
        innerHTML += '</div>';
    } else {
        innerHTML += '<div style="padding:20px;background:#16213e;border:1px solid #3a3d4e;border-radius:8px;text-align:center;color:#9ca3af;">';
        innerHTML += '⚠️ No game servers found in the network<br>';
        innerHTML += '<small>Add a game server and ensure it is online</small>';
        innerHTML += '</div>';
    }
    innerHTML += '</div>';
    
    // Manual connection
    innerHTML += '<div style="margin-top:20px;padding:15px;background:#16213e;border:1px solid #3a3d4e;border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 10px 0;color:#9ca3af;">Manual Connection</h4>';
    innerHTML += '<div style="display:flex;gap:10px;">';
    innerHTML += '<input type="text" id="manualIP" placeholder="Server IP" ';
    innerHTML += 'style="flex:1;padding:8px;background:#2a2d3e;color:#e4e4e7;border:1px solid #3a3d4e;border-radius:4px;" />';
    innerHTML += '<input type="number" id="manualPort" placeholder="Port" min="1" max="65535" ';
    innerHTML += 'style="width:100px;padding:8px;background:#2a2d3e;color:#e4e4e7;border:1px solid #3a3d4e;border-radius:4px;" />';
    innerHTML += '</div>';
    innerHTML += '</div>';
    
    innerHTML += '</div>';
    
    // Control buttons
    var controls = '<button onclick="doConnectToGameServer(' + id + ')" style="background:#10b981;color:white;padding:8px 16px;border:none;border-radius:6px;margin-right:10px;cursor:pointer;font-weight:500;">🎮 Connect</button>';
    controls += '<button onclick="testGameConnection(' + id + ')" style="background:#3b82f6;color:white;padding:8px 16px;border:none;border-radius:6px;margin-right:10px;cursor:pointer;font-weight:500;">🧪 Test Connection</button>';
    controls += '<button onclick="cancelGameConnection()" style="background:#6b7280;color:white;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;font-weight:500;">Cancel</button>';
    
    // Store the computer ID for later use
    window.currentComputerId = id;
    
    var w = new UIWindow('divgameconnection', '🎮 Connect to Game Server', 550, 600, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

// Find all game servers in the network
function findGameServers() {
    var servers = [];
    var elements = network.getAllElements();
    
    for (var id in elements) {
        var element = elements[id];
        if (element && element.getIsGameServer && element.getIsGameServer()) {
            // Get the server's IP
            var connectable = element.getConnectable();
            var serverIP = null;
            if (connectable) {
                var ipInfo = connectable.getIPInfo(0);
                if (ipInfo) {
                    serverIP = ipInfo.getIPv4();
                }
            }
            
            servers.push({
                id: element.id,
                name: element.getServerName(),
                ip: serverIP,
                port: element.getGamePort(),
                gameType: element.getGameType(),
                status: element.getServerStatus(),
                currentPlayers: element.getCurrentPlayers(),
                maxPlayers: element.getMaxPlayers()
            });
        }
    }
    
    return servers;
}

// Select a game server from the list
function selectGameServer(ip, port, name) {
    document.getElementById('manualIP').value = ip;
    document.getElementById('manualPort').value = port;
    
    // Visual feedback
    var elem = event.currentTarget;
    elem.style.background = '#364152';
    setTimeout(function() {
        elem.style.background = '#2a2d3e';
    }, 200);
}

// Get game icon based on type
function getGameIcon(gameType) {
    var icons = {
        'minecraft': '⛏️',
        'csgo': '🔫',
        'terraria': '🌳',
        'rust': '🔨',
        'valheim': '⚔️',
        'ark': '🦕',
        'custom': '🎮'
    };
    return icons[gameType] || '🎮';
}

// Actually connect to the game server
function doConnectToGameServer(computerId) {
    var computer = network.getElement(computerId);
    var playerName = document.getElementById('playerName').value;
    var serverIP = document.getElementById('manualIP').value;
    var serverPort = parseInt(document.getElementById('manualPort').value) || 25565;
    
    if (!serverIP) {
        alert('Please select a server or enter a server IP');
        return;
    }
    
    // Find the game server to get its name
    var serverName = "Unknown Server";
    var elements = network.getAllElements();
    for (var id in elements) {
        var element = elements[id];
        if (element && element.getIsGameServer && element.getIsGameServer()) {
            var connectable = element.getConnectable();
            if (connectable) {
                var ipInfo = connectable.getIPInfo(0);
                if (ipInfo && ipInfo.getIPv4() === serverIP && element.getGamePort() === serverPort) {
                    serverName = element.getServerName();
                    break;
                }
            }
        }
    }
    
    // Connect the host to the game server
    computer.connectToGameServer(serverIP, serverPort, serverName, playerName);
    
    // Create game connection message
    sendGameConnectionRequest(computer, playerName, serverIP, serverPort);
    
    // Close modal
    uimanager.getWindow("divgameconnection").dispose();
    removeBodyDiv('divbk');
    
    // Show connection status
    showConnectionStatus(computerId, serverIP, serverPort);
}

// Send game connection request
function sendGameConnectionRequest(computer, playerName, serverIP, serverPort) {
    var connectable = computer.getConnectable();
    if (!connectable) return;
    
    var srcIP = connectable.getIPInfo(0);
    if (!srcIP || !srcIP.getIPv4()) return;
    
    var srcMAC = connectable.getMAC(0);
    
    var data = {
        type: 'GAME_CONNECT',
        playerName: playerName,
        clientVersion: '1.20.1',
        timestamp: Date.now()
    };
    
    var message = new Message(
        'TCP',
        srcIP.getIPv4(),
        serverIP,
        srcMAC,
        null, // Will be resolved by ARP
        getDinamycPort(),
        serverPort,
        data,
        images[IMAGE_ENVELOPEGAMECONNECT] || images[IMAGE_ENVELOPEHTTP]
    );
    
    // Add visual description
    message.getData().description = '🎮 Connecting: ' + playerName;
    
    // Send through traffic manager
    var trafficManager = connectable.getTrafficManager();
    if (trafficManager) {
        trafficManager.sendMessage(0, message);
    }
    
    // Simulate connection response after a delay
    setTimeout(function() {
        simulateGameServerResponse(serverIP, serverPort, srcIP.getIPv4(), playerName);
    }, 1500);
}

// Simulate server response
function simulateGameServerResponse(serverIP, serverPort, clientIP, playerName) {
    // Find the game server
    var gameServer = null;
    var elements = network.getAllElements();
    
    for (var id in elements) {
        var element = elements[id];
        if (element && element.getIsGameServer && element.getIsGameServer()) {
            var connectable = element.getConnectable();
            if (connectable) {
                var ipInfo = connectable.getIPInfo(0);
                if (ipInfo && ipInfo.getIPv4() === serverIP) {
                    gameServer = element;
                    break;
                }
            }
        }
    }
    
    if (!gameServer || gameServer.getServerStatus() !== 'online') {
	// console.log('Server not found or offline');
        return;
    }
    
    // Check if server is full
    if (gameServer.getCurrentPlayers() >= gameServer.getMaxPlayers()) {
        // Send rejection
        sendGameRejection(gameServer, clientIP, 'Server is full');
    } else {
        // Add player to server
        gameServer.addPlayer(playerName);
        // Send acceptance
        sendGameAcceptance(gameServer, clientIP, playerName);
    }
}

// Send game acceptance message
function sendGameAcceptance(gameServer, clientIP, playerName) {
    var connectable = gameServer.getConnectable();
    if (!connectable) return;
    
    var srcIP = connectable.getIPInfo(0);
    if (!srcIP || !srcIP.getIPv4()) return;
    
    var srcMAC = connectable.getMAC(0);
    
    var data = {
        type: 'GAME_ACCEPT',
        serverName: gameServer.getServerName(),
        gameType: gameServer.getGameType(),
        playerName: playerName,
        message: 'Welcome to the server!'
    };
    
    var message = new Message(
        'TCP',
        srcIP.getIPv4(),
        clientIP,
        srcMAC,
        null,
        gameServer.getGamePort(),
        getDinamycPort(),
        data,
        images[IMAGE_ENVELOPEGAME] || images[IMAGE_ENVELOPEHTTP]
    );
    
    message.getData().description = '✅ Connection Accepted';
    
    var trafficManager = connectable.getTrafficManager();
    if (trafficManager) {
        trafficManager.sendMessage(0, message);
    }
}

// Send game rejection message
function sendGameRejection(gameServer, clientIP, reason) {
    var connectable = gameServer.getConnectable();
    if (!connectable) return;
    
    var srcIP = connectable.getIPInfo(0);
    if (!srcIP || !srcIP.getIPv4()) return;
    
    var srcMAC = connectable.getMAC(0);
    
    var data = {
        type: 'GAME_REJECT',
        reason: reason
    };
    
    var message = new Message(
        'TCP',
        srcIP.getIPv4(),
        clientIP,
        srcMAC,
        null,
        gameServer.getGamePort(),
        getDinamycPort(),
        data,
        images[IMAGE_ENVELOPEGAME] || images[IMAGE_ENVELOPEHTTP]
    );
    
    message.getData().description = '❌ Connection Rejected: ' + reason;
    
    var trafficManager = connectable.getTrafficManager();
    if (trafficManager) {
        trafficManager.sendMessage(0, message);
    }
}

// Show connection status
function showConnectionStatus(computerId, serverIP, serverPort) {
    var computer = network.getElement(computerId);
    
    // Show a temporary status message
    var statusDiv = document.createElement('div');
    statusDiv.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#16213e;border:1px solid #3a3d4e;border-radius:8px;padding:15px;color:#e4e4e7;z-index:1000;min-width:250px;box-shadow:0 4px 6px rgba(0,0,0,0.3);';
    statusDiv.innerHTML = '<div style="display:flex;align-items:center;">';
    statusDiv.innerHTML += '<div style="margin-right:10px;">🎮</div>';
    statusDiv.innerHTML += '<div>';
    statusDiv.innerHTML += '<div style="font-weight:500;">Connecting to Server</div>';
    statusDiv.innerHTML += '<div style="font-size:12px;color:#9ca3af;margin-top:4px;">' + serverIP + ':' + serverPort + '</div>';
    statusDiv.innerHTML += '</div>';
    statusDiv.innerHTML += '</div>';
    document.body.appendChild(statusDiv);
    
    // After a short delay, show success
    setTimeout(function() {
        // Check if we're actually connected
        if (computer && computer.isConnectedToGameServer()) {
            var conn = computer.getGameServerConnection();
            statusDiv.style.background = '#14532d';
            statusDiv.style.borderColor = '#10b981';
            statusDiv.innerHTML = '<div style="display:flex;align-items:center;">';
            statusDiv.innerHTML += '<div style="margin-right:10px;">✅</div>';
            statusDiv.innerHTML += '<div>';
            statusDiv.innerHTML += '<div style="font-weight:500;color:#10b981;">Connected Successfully!</div>';
            statusDiv.innerHTML += '<div style="font-size:12px;color:#86efac;margin-top:4px;">Connected to ' + conn.serverName + '</div>';
            statusDiv.innerHTML += '</div>';
            statusDiv.innerHTML += '</div>';
        }
    }, 1000);
    
    // Remove after 4 seconds total
    setTimeout(function() {
        if (statusDiv && statusDiv.parentNode) {
            statusDiv.parentNode.removeChild(statusDiv);
        }
    }, 4000);
}

// Test game connection
function testGameConnection(computerId) {
    var serverIP = document.getElementById('manualIP').value;
    var serverPort = parseInt(document.getElementById('manualPort').value) || 25565;
    
    if (!serverIP) {
        alert('Please select a server or enter a server IP');
        return;
    }
    
    // Send a ping/test packet
    var computer = network.getElement(computerId);
    var pingSuccess = sendGamePing(computer, serverIP, serverPort);
    
    // Show test status
    var testDiv = document.createElement('div');
    testDiv.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#16213e;border:1px solid #3a3d4e;border-radius:8px;padding:15px;color:#e4e4e7;z-index:1000;min-width:250px;box-shadow:0 4px 6px rgba(0,0,0,0.3);';
    testDiv.innerHTML = '🧪 Testing connection to ' + serverIP + ':' + serverPort + '...';
    document.body.appendChild(testDiv);
    
    // Check if a game server exists at that IP and port
    setTimeout(function() {
        var serverFound = false;
        var serverOnline = false;
        
        // Check all elements for a game server at the target IP
        var elements = network.getAllElements();
        for (var id in elements) {
            var element = elements[id];
            if (element && element.getIsGameServer && element.getIsGameServer()) {
                // Check if this server has the target IP
                var connectable = element.getConnectable();
                if (connectable && connectable.getIPInfo) {
                    var ipInfo = connectable.getIPInfo(0);
                    if (ipInfo && ipInfo.getIPv4 && ipInfo.getIPv4() === serverIP) {
                        // Check if port matches
                        if (element.getGamePort && element.getGamePort() === serverPort) {
                            serverFound = true;
                            // Check if server is online
                            if (element.getServerStatus && element.getServerStatus() === 'online') {
                                serverOnline = true;
                            }
                            break;
                        }
                    }
                }
            }
        }
        
        // Update the test result
        if (!pingSuccess) {
            testDiv.style.background = '#7f1d1d';
            testDiv.innerHTML = '❌ Connection test failed<br><small>Unable to send test packet (no network route)</small>';
        } else if (!serverFound) {
            testDiv.style.background = '#7f1d1d';
            testDiv.innerHTML = '❌ Connection test failed<br><small>No game server found at ' + serverIP + ':' + serverPort + '</small>';
        } else if (!serverOnline) {
            testDiv.style.background = '#713f12';
            testDiv.innerHTML = '⚠️ Server found but offline<br><small>Start the server to accept connections</small>';
        } else {
            testDiv.style.background = '#14532d';
            testDiv.innerHTML = '✅ Connection successful!<br><small>Server is online and reachable at ' + serverIP + ':' + serverPort + '</small>';
        }
        
        // Remove the notification after 3 more seconds
        setTimeout(function() {
            if (testDiv && testDiv.parentNode) {
                testDiv.parentNode.removeChild(testDiv);
            }
        }, 3000);
    }, 1500);
}

// Send game ping
function sendGamePing(computer, serverIP, serverPort) {
    var connectable = computer.getConnectable();
    if (!connectable) return false;
    
    var srcIP = connectable.getIPInfo(0);
    if (!srcIP || !srcIP.getIPv4()) return false;
    
    var srcMAC = connectable.getMAC(0);
    var srcPort = getDinamycPort();
    
    var data = {
        type: 'GAME_PING',
        timestamp: Date.now()
    };
    
    var message = new Message(
        'UDP',
        srcIP.getIPv4(),
        serverIP,
        srcMAC,
        null,
        srcPort,
        serverPort,
        data,
        images[IMAGE_ENVELOPEGAMEHB] || images[IMAGE_ENVELOPEICMP]
    );
    
    message.getData().description = '📍 Game Server Ping';
    
    var trafficManager = connectable.getTrafficManager();
    if (trafficManager) {
        trafficManager.sendMessage(0, message);
        
        // Simulate server sending a pong response after a delay
        setTimeout(function() {
            sendGamePongResponse(serverIP, serverPort, srcIP.getIPv4(), srcPort);
        }, 800);
        
        return true;
    }
    return false;
}

// Send game pong response from server
function sendGamePongResponse(serverIP, serverPort, clientIP, clientPort) {
    // Find the game server
    var gameServer = null;
    var elements = network.getAllElements();
    
    for (var id in elements) {
        var element = elements[id];
        if (element && element.getIsGameServer && element.getIsGameServer()) {
            var connectable = element.getConnectable();
            if (connectable) {
                var ipInfo = connectable.getIPInfo(0);
                if (ipInfo && ipInfo.getIPv4() === serverIP && element.getGamePort() === serverPort) {
                    gameServer = element;
                    break;
                }
            }
        }
    }
    
    if (!gameServer || gameServer.getServerStatus() !== 'online') {
        return;
    }
    
    var connectable = gameServer.getConnectable();
    if (!connectable) return;
    
    var srcIP = connectable.getIPInfo(0);
    if (!srcIP || !srcIP.getIPv4()) return;
    
    var srcMAC = connectable.getMAC(0);
    
    var data = {
        type: 'GAME_PONG',
        serverName: gameServer.getServerName(),
        players: gameServer.getCurrentPlayers() + '/' + gameServer.getMaxPlayers(),
        status: 'online',
        timestamp: Date.now()
    };
    
    var message = new Message(
        'UDP',
        srcIP.getIPv4(),
        clientIP,
        srcMAC,
        null,
        serverPort,
        clientPort,
        data,
        images[IMAGE_ENVELOPEGAME] || images[IMAGE_ENVELOPEHTTP]
    );
    
    message.getData().description = '✅ Game Server Pong';
    
    var trafficManager = connectable.getTrafficManager();
    if (trafficManager) {
        trafficManager.sendMessage(0, message);
    }
}

// Cancel connection
function cancelGameConnection() {
    uimanager.getWindow("divgameconnection").dispose();
    removeBodyDiv('divbk');
}

// Disconnect from game server
function disconnectFromGameServer(computerId) {
    var computer = network.getElement(computerId);
    var conn = computer.getGameServerConnection();
    
    if (conn) {
        // Find the game server and remove the player
        var elements = network.getAllElements();
        for (var id in elements) {
            var element = elements[id];
            if (element && element.getIsGameServer && element.getIsGameServer()) {
                // Check if this is the server we're connected to
                var connectable = element.getConnectable();
                if (connectable && connectable.getIPInfo) {
                    var ipInfo = connectable.getIPInfo(0);
                    if (ipInfo && ipInfo.getIPv4 && ipInfo.getIPv4() === conn.serverIP) {
                        // Check if port matches
                        if (element.getGamePort && element.getGamePort() === conn.serverPort) {
                            // Remove the player from the server
                            element.removePlayer(conn.playerName);
                            console.log('Removed player ' + conn.playerName + ' from server');
                            break;
                        }
                    }
                }
            }
        }
        
        // Send disconnect message to server (for visual feedback)
        var connectable = computer.getConnectable();
        if (connectable) {
            var srcIP = connectable.getIPInfo(0);
            if (srcIP && srcIP.getIPv4()) {
                var srcMAC = connectable.getMAC(0);
                
                var data = {
                    type: 'GAME_DISCONNECT',
                    playerName: conn.playerName,
                    timestamp: Date.now()
                };
                
                var message = new Message(
                    'TCP',
                    srcIP.getIPv4(),
                    conn.serverIP,
                    srcMAC,
                    null,
                    getDinamycPort(),
                    conn.serverPort,
                    data,
                    images[IMAGE_ENVELOPEGAME] || images[IMAGE_ENVELOPEHTTP]
                );
                
                message.getData().description = '🔌 Disconnect from Server';
                
                var trafficManager = connectable.getTrafficManager();
                if (trafficManager) {
                    trafficManager.sendMessage(0, message);
                }
            }
        }
        
        // Disconnect the computer
        computer.disconnectFromGameServer();
        
        // Show notification
        var notif = document.createElement('div');
        notif.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#7f1d1d;border:1px solid #dc2626;border-radius:8px;padding:15px;color:#e4e4e7;z-index:1000;min-width:250px;box-shadow:0 4px 6px rgba(0,0,0,0.3);';
        notif.innerHTML = '🔌 Disconnected from ' + conn.serverName;
        document.body.appendChild(notif);
        
        setTimeout(function() {
            if (notif && notif.parentNode) {
                notif.parentNode.removeChild(notif);
            }
        }, 2000);
    }
}

// Show game connection info
function showGameConnectionInfo(computerId) {
    var computer = network.getElement(computerId);
    var conn = computer.getGameServerConnection();
    
    if (!conn) {
        alert('Not connected to any game server');
        return;
    }
    
    createBkDiv();
    
    var innerHTML = '<div style="padding:20px;background:#1a1d2e;color:#e4e4e7;">';
    
    // Connection header
    innerHTML += '<div style="margin-bottom:20px; padding:15px; background:linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius:8px;">';
    innerHTML += '<h4 style="margin:0 0 8px 0; color:white; font-weight:600;">🎮 Active Game Connection</h4>';
    innerHTML += '<p style="margin:0; font-size:12px; color:#e4f4f7;">Currently connected to game server</p>';
    innerHTML += '</div>';
    
    // Connection details
    innerHTML += '<div style="padding:15px; background:#16213e; border:1px solid #2a2d3e; border-radius:8px; margin-bottom:15px;">';
    innerHTML += '<h5 style="color:#667eea; margin:0 0 10px 0;">Connection Details</h5>';
    innerHTML += '<table style="width:100%; font-size:12px; color:#e4e4e7;">';
    innerHTML += '<tr><td style="padding:5px; color:#9ca3af;">Server Name:</td><td style="padding:5px; font-weight:500;">' + conn.serverName + '</td></tr>';
    innerHTML += '<tr><td style="padding:5px; color:#9ca3af;">Server IP:</td><td style="padding:5px; font-family:monospace;">' + conn.serverIP + ':' + conn.serverPort + '</td></tr>';
    innerHTML += '<tr><td style="padding:5px; color:#9ca3af;">Player Name:</td><td style="padding:5px;">' + conn.playerName + '</td></tr>';
    innerHTML += '<tr><td style="padding:5px; color:#9ca3af;">Connection Time:</td><td style="padding:5px;">' + computer.getGameConnectionDuration() + '</td></tr>';
    innerHTML += '</table>';
    innerHTML += '</div>';
    
    // Connection status
    innerHTML += '<div style="padding:15px; background:#14532d; border:1px solid #10b981; border-radius:8px;">';
    innerHTML += '<div style="display:flex; align-items:center;">';
    innerHTML += '<div style="width:10px; height:10px; background:#10b981; border-radius:50%; margin-right:10px; animation: pulse 2s infinite;"></div>';
    innerHTML += '<span style="color:#10b981; font-weight:500;">Connection Active</span>';
    innerHTML += '</div>';
    innerHTML += '</div>';
    
    innerHTML += '<style>@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }</style>';
    innerHTML += '</div>';
    
    var controls = '<button onclick="disconnectFromGameServer(' + computerId + '); closeGameConnectionInfo();" style="background:#ef4444; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer; font-weight:500;">🔌 Disconnect</button>';
    controls += '<button onclick="closeGameConnectionInfo()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer; font-weight:500;">Close</button>';
    
    var w = new UIWindow('divgameconninfo', '🎮 Game Connection - ' + computer.getName(), 450, 400, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

// Close game connection info
function closeGameConnectionInfo() {
    var w = uimanager.getWindow("divgameconninfo");
    if (w) {
        w.dispose();
    }
    removeBodyDiv('divbk');
}