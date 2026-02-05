/*
 * Game Client component for NetworkSimulator
 * Handles game client functionality for computers connecting to game servers
 */

var GameClient = function(o)
{
    var owner = o;
    var connectedServer = null;
    var connectionState = 'disconnected'; // disconnected, connecting, connected, disconnecting
    var playerName = 'Player' + Math.floor(Math.random() * 9999);
    var pingLatency = 0;
    var lastHeartbeat = Date.now();
    var serverIP = null;
    var serverPort = null;
    
    // Connection states
    var STATE_DISCONNECTED = 'disconnected';
    var STATE_CONNECTING = 'connecting';
    var STATE_CONNECTED = 'connected';
    var STATE_DISCONNECTING = 'disconnecting';
    
    // Game message types
    var GAME_MSG_CONNECT = 'GAME_CONNECT';
    var GAME_MSG_ACCEPT = 'GAME_ACCEPT';
    var GAME_MSG_REJECT = 'GAME_REJECT';
    var GAME_MSG_DATA = 'GAME_DATA';
    var GAME_MSG_HEARTBEAT = 'GAME_HEARTBEAT';
    var GAME_MSG_DISCONNECT = 'GAME_DISCONNECT';
    var GAME_MSG_SERVER_INFO = 'GAME_SERVER_INFO';
    
    this.save = function() {
        return {
            connectedServer: connectedServer,
            connectionState: connectionState,
            playerName: playerName,
            serverIP: serverIP,
            serverPort: serverPort
        };
    };
    
    this.load = function(data) {
        connectedServer = data.connectedServer || null;
        connectionState = data.connectionState || STATE_DISCONNECTED;
        playerName = data.playerName || ('Player' + Math.floor(Math.random() * 9999));
        serverIP = data.serverIP || null;
        serverPort = data.serverPort || null;
    };
    
    // Connect to a game server
    this.connectToServer = function(targetIP, targetPort) {
        if (connectionState !== STATE_DISCONNECTED) {
	// console.log('Already connected or connecting to a server');
            return false;
        }
        
        serverIP = targetIP;
        serverPort = targetPort || 25565; // Default to Minecraft port
        connectionState = STATE_CONNECTING;
        
        // Send connection request message
        sendConnectionRequest();
        
        // Simulate connection delay
        setTimeout(function() {
            if (connectionState === STATE_CONNECTING) {
                // Check if we received an accept message
	// console.log('Connection attempt timed out');
                connectionState = STATE_DISCONNECTED;
                serverIP = null;
                serverPort = null;
            }
        }, 5000);
        
        return true;
    };
    
    // Disconnect from current server
    this.disconnect = function() {
        if (connectionState === STATE_CONNECTED) {
            sendDisconnectMessage();
            connectionState = STATE_DISCONNECTED;
            connectedServer = null;
            serverIP = null;
            serverPort = null;
        }
    };
    
    // Send connection request
    function sendConnectionRequest() {
        var connectable = owner.getConnectable();
        if (!connectable) return;
        
        var srcIP = connectable.getIPInfo(0);
        if (!srcIP || !srcIP.getIPv4()) return;
        
        var srcMAC = connectable.getMAC(0);
        
        var data = {
            type: GAME_MSG_CONNECT,
            playerName: playerName,
            clientVersion: '1.20.1',
            gameType: 'minecraft' // Get from server detection
        };
        
        var message = new Message(
            'TCP',
            srcIP.getIPv4(),
            serverIP,
            srcMAC,
            null, // Will be resolved by ARP
            getDinamycPort(), // Dynamic source port
            serverPort,
            data,
            images[IMAGE_ENVELOPEGAMECONNECT] || images[IMAGE_ENVELOPEHTTP]
        );
        
        // Add visual description
        message.getData().description = '🎮 Game Connection Request';
        
        // Send through traffic manager
        var trafficManager = connectable.getTrafficManager();
        if (trafficManager) {
            trafficManager.sendMessage(0, message);
        }
    }
    
    // Send disconnect message
    function sendDisconnectMessage() {
        var connectable = owner.getConnectable();
        if (!connectable) return;
        
        var srcIP = connectable.getIPInfo(0);
        if (!srcIP || !srcIP.getIPv4()) return;
        
        var srcMAC = connectable.getMAC(0);
        
        var data = {
            type: GAME_MSG_DISCONNECT,
            playerName: playerName,
            reason: 'Player disconnected'
        };
        
        var message = new Message(
            'TCP',
            srcIP.getIPv4(),
            serverIP,
            srcMAC,
            null,
            getDinamycPort(),
            serverPort,
            data,
            images[IMAGE_ENVELOPEGAME] || images[IMAGE_ENVELOPEHTTP]
        );
        
        message.getData().description = '🎮 Game Disconnect';
        
        var trafficManager = connectable.getTrafficManager();
        if (trafficManager) {
            trafficManager.sendMessage(0, message);
        }
    }
    
    // Send game data (position updates, actions, etc.)
    this.sendGameData = function(dataType, gameData) {
        if (connectionState !== STATE_CONNECTED) {
	// console.log('Not connected to a game server');
            return false;
        }
        
        var connectable = owner.getConnectable();
        if (!connectable) return false;
        
        var srcIP = connectable.getIPInfo(0);
        if (!srcIP || !srcIP.getIPv4()) return false;
        
        var srcMAC = connectable.getMAC(0);
        
        var data = {
            type: GAME_MSG_DATA,
            dataType: dataType,
            playerName: playerName,
            gameData: gameData,
            timestamp: Date.now()
        };
        
        var message = new Message(
            'UDP', // Game data often uses UDP for speed
            srcIP.getIPv4(),
            serverIP,
            srcMAC,
            null,
            getDinamycPort(),
            serverPort,
            data,
            images[IMAGE_ENVELOPEGAMEDATA] || images[IMAGE_ENVELOPEHTTP]
        );
        
        message.getData().description = '📦 Game Data: ' + dataType;
        
        var trafficManager = connectable.getTrafficManager();
        if (trafficManager) {
            trafficManager.sendMessage(0, message);
        }
        
        return true;
    };
    
    // Send heartbeat/keepalive
    this.sendHeartbeat = function() {
        if (connectionState !== STATE_CONNECTED) return;
        
        var connectable = owner.getConnectable();
        if (!connectable) return;
        
        var srcIP = connectable.getIPInfo(0);
        if (!srcIP || !srcIP.getIPv4()) return;
        
        var srcMAC = connectable.getMAC(0);
        
        var data = {
            type: GAME_MSG_HEARTBEAT,
            playerName: playerName,
            timestamp: Date.now()
        };
        
        var message = new Message(
            'UDP',
            srcIP.getIPv4(),
            serverIP,
            srcMAC,
            null,
            getDinamycPort(),
            serverPort,
            data,
            images[IMAGE_ENVELOPEGAMEHB] || images[IMAGE_ENVELOPEICMP]
        );
        
        message.getData().description = '💓 Heartbeat';
        
        var trafficManager = connectable.getTrafficManager();
        if (trafficManager) {
            trafficManager.sendMessage(0, message);
        }
        
        lastHeartbeat = Date.now();
    };
    
    // Receive message from server
    this.receiveMessage = function(message) {
        if (!message || !message.getData) return;
        
        var data = message.getData();
        
        switch(data.type) {
            case GAME_MSG_ACCEPT:
                if (connectionState === STATE_CONNECTING) {
                    connectionState = STATE_CONNECTED;
                    connectedServer = message.getOriginIP();
	// console.log('Connected to game server at ' + connectedServer);
                    
                    // Start sending heartbeats
                    startHeartbeat();
                }
                break;
                
            case GAME_MSG_REJECT:
                if (connectionState === STATE_CONNECTING) {
                    connectionState = STATE_DISCONNECTED;
                    serverIP = null;
                    serverPort = null;
	// console.log('Connection rejected: ' + (data.reason || 'Unknown reason'));
                }
                break;
                
            case GAME_MSG_DATA:
                if (connectionState === STATE_CONNECTED) {
                    // Handle incoming game data
                    handleGameData(data);
                }
                break;
                
            case GAME_MSG_SERVER_INFO:
                // Update server information
                if (data.ping) {
                    pingLatency = data.ping;
                }
                break;
                
            case GAME_MSG_DISCONNECT:
                // Server disconnected us
                connectionState = STATE_DISCONNECTED;
                connectedServer = null;
                serverIP = null;
                serverPort = null;
	// console.log('Disconnected from server: ' + (data.reason || 'Unknown reason'));
                break;
        }
    };
    
    // Handle incoming game data
    function handleGameData(data) {
        // Process game-specific data
	// console.log('Received game data:', data.dataType);
        // This would handle things like:
        // - Other player positions
        // - World updates
        // - Chat messages
        // - Server events
    }
    
    // Start heartbeat timer
    function startHeartbeat() {
        // Send heartbeat every 30 seconds
        setInterval(function() {
            if (connectionState === STATE_CONNECTED) {
                owner.sendHeartbeat();
            }
        }, 30000);
    }
    
    // Get connection status
    this.getConnectionState = function() {
        return connectionState;
    };
    
    this.getConnectedServer = function() {
        return connectedServer;
    };
    
    this.getPlayerName = function() {
        return playerName;
    };
    
    this.setPlayerName = function(name) {
        playerName = name;
    };
    
    this.getPingLatency = function() {
        return pingLatency;
    };
    
    // Check if can receive game traffic
    this.canReceiveGameTraffic = function(port) {
        // Client can receive responses on the port it sent from
        return connectionState !== STATE_DISCONNECTED;
    };
};