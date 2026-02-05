/*
 * RADIUSClient.js - RADIUS Client (NAS) functionality for network devices
 * Implements 802.1X authenticator for switches and RADIUS client for routers
 */

var RADIUSClient = function(device) {
    var self = this;
    var device = device; // The network device (switch/router) using this client
    var networkRef = null; // Reference to the network object
    
    // RADIUS server configuration
    var config = {
        serverIP: null,
        serverPort: 1812,
        sharedSecret: 'radius123',
        timeout: 3000,
        retries: 3,
        nasIdentifier: device ? device.name : 'NAS-01',
        enabled: false
    };
    
    // 802.1X port states for switches
    var portStates = {}; // port -> {state: 'unauthorized'|'authorizing'|'authorized', host: null}
    
    // Active authentication sessions
    var sessions = {};
    
    // Authentication cache (to avoid repeated auth for same credentials)
    var authCache = {};
    var CACHE_TIMEOUT = 300000; // 5 minutes
    
    // Set network reference
    this.setNetwork = function(net) {
        networkRef = net;
    };
    
    this.getConfig = function() {
        return config;
    };
    
    this.setConfig = function(newConfig) {
        for (var key in newConfig) {
            if (config.hasOwnProperty(key)) {
                config[key] = newConfig[key];
            }
        }
    };
    
    this.isEnabled = function() {
        return config.enabled;
    };
    
    this.setEnabled = function(enabled) {
        config.enabled = enabled;
        if (!enabled) {
            // Clear all port states if disabling
            for (var port in portStates) {
                updatePortState(port, {state: 'unauthorized', host: null});
            }
        }
    };
    
    // Set RADIUS server details
    this.setRadiusServer = function(serverIP, serverPort, sharedSecret) {
        config.serverIP = serverIP;
        config.serverPort = serverPort || 1812;
        config.sharedSecret = sharedSecret;
    };
    
    // Helper function to update port state while preserving enabled flag
    function updatePortState(portNum, newState) {
        var wasEnabled = portStates[portNum] ? portStates[portNum].enabled : false;
        portStates[portNum] = Object.assign({}, newState);
        portStates[portNum].enabled = wasEnabled;
    }

    // Get port state for 802.1X
    this.getPortState = function(portNum) {
        if (!portStates[portNum]) {
            portStates[portNum] = {state: 'unauthorized', host: null, enabled: false};
        }
        return portStates[portNum];
    };
    
    // Set 802.1X enabled/disabled per port
    this.setPort802_1X = function(portNum, enabled) {
        if (!portStates[portNum]) {
            portStates[portNum] = {state: 'unauthorized', host: null, enabled: false};
        }
        portStates[portNum].enabled = enabled;
        if (!enabled) {
            portStates[portNum].state = 'authorized'; // Force authorized if 802.1X disabled
        } else {
            portStates[portNum].state = 'unauthorized'; // Force unauthorized if 802.1X enabled
        }
    };
    
    // Check if port has 802.1X enabled
    this.isPort802_1XEnabled = function(portNum) {
        if (!portStates[portNum]) {
            return false;
        }
        return portStates[portNum].enabled === true;
    };
    
    // Authenticate a user (called when host tries to connect through switch)
    this.authenticateUser = function(username, password, portNum, hostIP, callback) {
        if (!config.enabled || !config.serverIP) {
            if (callback) callback(false, 'RADIUS client not configured');
            return;
        }

        // Check cache first
        var cacheKey = username + ':' + password;
        if (authCache[cacheKey] && authCache[cacheKey].timestamp > Date.now() - CACHE_TIMEOUT) {
            if (callback) callback(authCache[cacheKey].success, authCache[cacheKey].message);
            if (authCache[cacheKey].success && portNum !== undefined) {
                updatePortState(portNum, {state: 'authorized', host: hostIP, username: username});
            }
            return;
        }

        // Update port state to authorizing
        if (portNum !== undefined) {
            updatePortState(portNum, {state: 'authorizing', host: hostIP});
        }

        // Find RADIUS server in network
        var radiusServer = findRadiusServer(config.serverIP);
        if (!radiusServer) {
            if (portNum !== undefined) {
                updatePortState(portNum, {state: 'unauthorized', host: hostIP});
            }
            if (callback) callback(false, 'RADIUS server not reachable');
            return;
        }
        
        // Simulate RADIUS authentication request
        setTimeout(function() {
            // Call RADIUS server's authenticate method
            // Use app ID "RADIUSServer" instead of port number
            var app = radiusServer.getApp("RADIUSServer");

            if (app && app.authenticateUser) {
                // Get the NAS IP (this device's IP)
                var nasIP = '0.0.0.0';
                if (device && device.getConnectable) {
                    var ipInfo = device.getConnectable().getIPInfo(0);
                    if (ipInfo && ipInfo.getIPv4) {
                        nasIP = ipInfo.getIPv4() || '0.0.0.0';
                    }
                }

                var result = app.authenticateUser(
                    username,
                    password,
                    nasIP,
                    config.sharedSecret
                );

                // Cache the result
                authCache[cacheKey] = {
                    success: result.success,
                    message: result.message,
                    timestamp: Date.now()
                };

                // Update port state based on result
                if (portNum !== undefined) {
                    if (result.success) {
                        updatePortState(portNum, {
                            state: 'authorized',
                            host: hostIP,
                            username: username,
                            sessionId: generateSessionId(),
                            startTime: Date.now()
                        });

                        // Show visual feedback
                        showAuthenticationAnimation(true, portNum);
                    } else {
                        updatePortState(portNum, {
                            state: 'unauthorized',
                            host: hostIP
                        });
                        showAuthenticationAnimation(false, portNum);
                    }
                }

                if (callback) callback(result.success, result.message);
            } else {
                if (portNum !== undefined) {
                    updatePortState(portNum, {state: 'unauthorized', host: hostIP});
                }
                if (callback) callback(false, 'RADIUS server error');
            }
        }, 500); // Simulate network delay
    };
    
    // Disconnect a port (logout)
    this.disconnectPort = function(portNum) {
        if (portStates[portNum] && portStates[portNum].state === 'authorized') {
            // Send accounting stop if needed (Phase 5)
            updatePortState(portNum, {state: 'unauthorized', host: null});
        }
    };
    
    // Admin authentication for routers/firewalls
    this.authenticateAdmin = function(username, password, callback) {
        // Get the device's first IP address
        var deviceIP = '0.0.0.0';
        if (device && device.getConnectable) {
            var ipInfo = device.getConnectable().getIPInfo(0);
            if (ipInfo && ipInfo.getIPv4) {
                deviceIP = ipInfo.getIPv4() || '0.0.0.0';
            }
        }
        // Use same authentication but without port number
        this.authenticateUser(username, password, undefined, deviceIP, callback);
    };
    
    // Find RADIUS server in network
    function findRadiusServer(serverIP) {
        // Use the network reference that was set via setNetwork()
        if (!networkRef || !networkRef.getAllElements) {
            return null;
        }

        var elements = networkRef.getAllElements();

        for (var id in elements) {
            var element = elements[id];
            if (!element) continue;

            // Check all interfaces of this element for the IP
            if (element.getConnectable) {
                var connectable = element.getConnectable();
                if (connectable && connectable.getConnectorNumber) {
                    for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                        var ipInfo = connectable.getIPInfo(i);
                        if (ipInfo && ipInfo.getIPv4) {
                            var elementIP = ipInfo.getIPv4();
                            if (elementIP === serverIP) {
                                // Check if it has RADIUS server app
                                if (element.getApp) {
                                    var app = element.getApp("RADIUSServer");
                                    if (app) {
                                        return element;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return null;
    }
    
    // Generate unique session ID
    function generateSessionId() {
        return 'SID-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }
    
    // Show visual authentication animation
    function showAuthenticationAnimation(success, portNum) {
        // TODO: Visual animation disabled - drawable.getImage() method doesn't exist
        // This would need to be implemented using a different approach
    }
    
    // Get all port states (for UI display)
    this.getPortStates = function() {
        return portStates;
    };
    
    // Clear authentication cache
    this.clearCache = function() {
        authCache = {};
    };
    
    // Get statistics
    this.getStats = function() {
        var stats = {
            enabled: config.enabled,
            serverConfigured: config.serverIP ? true : false,
            totalPorts: Object.keys(portStates).length,
            authorizedPorts: 0,
            unauthorizedPorts: 0,
            authorizingPorts: 0
        };
        
        for (var port in portStates) {
            switch(portStates[port].state) {
                case 'authorized':
                    stats.authorizedPorts++;
                    break;
                case 'unauthorized':
                    stats.unauthorizedPorts++;
                    break;
                case 'authorizing':
                    stats.authorizingPorts++;
                    break;
            }
        }
        
        return stats;
    };
    
    // Save configuration
    this.save = function() {
        return {
            config: config,
            portStates: portStates
        };
    };

    // Load configuration
    this.load = function(data) {
        if (data.config) {
            config = data.config;
        }
        if (data.portStates) {
            portStates = data.portStates;

            // Reset authentication state for all ports (keep enabled flag but clear sessions)
            // Ports should start as unauthorized after reload - hosts must re-authenticate
            for (var portNum in portStates) {
                if (portStates[portNum].enabled === true) {
                    // Port has 802.1X enabled - force unauthorized state
                    portStates[portNum].state = 'unauthorized';
                    portStates[portNum].host = null;
                    portStates[portNum].username = null;
                    portStates[portNum].sessionId = null;
                    portStates[portNum].startTime = null;
                } else {
                    // Port has 802.1X disabled - should be authorized (allows all traffic)
                    portStates[portNum].state = 'authorized';
                }
            }
        }
    };
};