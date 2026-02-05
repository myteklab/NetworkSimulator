/*
 * AttackManager.js - DoS Attack Simulation Module
 * Part of the NetworkSimulator Educational Project
 * 
 * This module provides DoS attack simulation capabilities for educational purposes.
 * It demonstrates various attack types, their impacts, and defense mechanisms.
 * 
 * WARNING: This is for educational purposes only. DoS attacks are illegal 
 * when performed on real networks without authorization.
 */

var AttackManager = function(network) {
    var _self = this;
    var _network = network;
    var activeAttacks = [];
    var statistics = {};
    var attackCounter = 0;
    var attackInterval = null;
    
    // Attack configuration defaults
    var attackDefaults = {
        SYN_FLOOD: {
            packetsPerSecond: 100,
            packetSize: 64,
            halfOpenMax: 500
        },
        HTTP_FLOOD: {
            requestsPerSecond: 50,
            requestSize: 1024,
            method: 'GET'
        },
        ICMP_FLOOD: {
            packetsPerSecond: 200,
            packetSize: 64
        },
        SLOWLORIS: {
            connections: 100,
            dataRate: 10, // bytes per second per connection
            keepAliveInterval: 30000 // ms
        }
    };
    
    // Attack configuration interface
    this.showAttackConfiguration = function(attackerId) {
        var attacker = _network.getElement(attackerId);
        if (!attacker) {
            console.error("AttackManager: Invalid attacker ID");
            return;
        }
        
        createBkDiv();
        
        var innerHTML = '<div style="padding:20px; background:#0f172a; border-radius:8px;">';
        innerHTML += '<h3 style="color:#f87171; margin-bottom:20px;">⚠️ Configure DoS Attack (Educational)</h3>';
        
        innerHTML += '<div style="background:#7f1d1d; padding:15px; border-radius:8px; margin-bottom:20px;">';
        innerHTML += '<p style="color:#fca5a5; margin:0; font-size:14px;">';
        innerHTML += '<strong>WARNING:</strong> This is a simulation for educational purposes only. ';
        innerHTML += 'Real DoS attacks are illegal and unethical. This tool demonstrates attack patterns ';
        innerHTML += 'and defense mechanisms in a safe, simulated environment.';
        innerHTML += '</p>';
        innerHTML += '</div>';
        
        // Attack type selection
        innerHTML += '<div style="margin-bottom:20px;">';
        innerHTML += '<label style="color:#e4e4e7; display:block; margin-bottom:8px;">Attack Type:</label>';
        innerHTML += '<select id="attackType" onchange="updateAttackOptions()" style="width:100%; padding:8px; background:#374151; color:#e4e4e7; border:1px solid #4b5563; border-radius:6px;">';
        innerHTML += '<option value="SYN_FLOOD">SYN Flood (TCP)</option>';
        innerHTML += '<option value="HTTP_FLOOD">HTTP Flood</option>';
        innerHTML += '<option value="ICMP_FLOOD">ICMP Flood (Ping)</option>';
        innerHTML += '<option value="SLOWLORIS">Slowloris</option>';
        innerHTML += '</select>';
        innerHTML += '</div>';
        
        // Target selection
        innerHTML += '<div style="margin-bottom:20px;">';
        innerHTML += '<label style="color:#e4e4e7; display:block; margin-bottom:8px;">Target:</label>';
        innerHTML += '<select id="attackTarget" style="width:100%; padding:8px; background:#374151; color:#e4e4e7; border:1px solid #4b5563; border-radius:6px;">';
        
        // List all potential targets (any device except the attacker and switches)
        var elements = _network.getAllElements();
        var attackerElement = _network.getElement(attackerId);
        var attackerConnectable = attackerElement ? attackerElement.getConnectable() : null;
        var attackerIP = null;
        if (attackerConnectable) {
            var attackerIPInfo = attackerConnectable.getIPInfo(0);
            if (attackerIPInfo) {
                attackerIP = attackerIPInfo.getIPv4();
            }
        }
        
        for (var id in elements) {
            var elem = elements[id];
            var type = elem.getType();
            // Include all devices except switches and the attacker itself
            // This allows attacking any computer, server, router, firewall, etc.
            if (id != attackerId && type !== 'switch') {
                var connectable = elem.getConnectable ? elem.getConnectable() : null;
                
                // For routers, show both WAN and LAN IPs if available
                if (type === 'router' && connectable) {
                    var addedRouter = false;
                    for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                        var ipInfo = connectable.getIPInfo(i);
                        if (ipInfo && ipInfo.getIPv4()) {
                            var ip = ipInfo.getIPv4();
                            var interfaceLabel = i === 0 ? 'WAN' : 'LAN' + (i > 1 ? i : '');
                            
                            // Check if this IP is on the same subnet as attacker (for LAN attacks)
                            var isLocal = false;
                            if (attackerIP && ip) {
                                var attackerSubnet = attackerIP.substring(0, attackerIP.lastIndexOf('.'));
                                var targetSubnet = ip.substring(0, ip.lastIndexOf('.'));
                                isLocal = (attackerSubnet === targetSubnet);
                            }
                            
                            // Only show LAN IPs for local routers, or all IPs if we can't determine
                            if (isLocal || i > 0 || !attackerIP) {
                                innerHTML += '<option value="' + id + ':' + i + '">' + elem.getName() + ' [router-' + interfaceLabel + '] (' + ip + ')</option>';
                                addedRouter = true;
                            }
                        }
                    }
                    // If no suitable interfaces found, add with default
                    if (!addedRouter) {
                        innerHTML += '<option value="' + id + '">' + elem.getName() + ' [router] (No IP)</option>';
                    }
                } else {
                    // For non-routers, show single IP
                    var ipInfo = connectable && connectable.getIPInfo ? connectable.getIPInfo(0) : null;
                    var ip = ipInfo && ipInfo.getIPv4 ? ipInfo.getIPv4() : 'No IP';
                    
                    // Add type indicator for clarity
                    var typeLabel = type;
                    if (type === 'computer' && elem.isGameServer) typeLabel = 'gameserver';
                    else if (type === 'computer') typeLabel = 'host';
                    
                    innerHTML += '<option value="' + id + '">' + elem.getName() + ' [' + typeLabel + '] (' + ip + ')</option>';
                }
            }
        }
        innerHTML += '</select>';
        innerHTML += '</div>';
        
        // Intensity slider
        innerHTML += '<div style="margin-bottom:20px;">';
        innerHTML += '<label style="color:#e4e4e7; display:block; margin-bottom:8px;">Intensity: <span id="intensityValue">25%</span></label>';
        innerHTML += '<input type="range" id="attackIntensity" min="10" max="100" value="25" step="10" ';
        innerHTML += 'oninput="document.getElementById(\'intensityValue\').textContent = this.value + \'%\'" ';
        innerHTML += 'style="width:100%;">';
        innerHTML += '<div style="display:flex; justify-content:space-between; color:#9ca3af; font-size:12px; margin-top:5px;">';
        innerHTML += '<span>Low</span><span>Medium</span><span>High</span>';
        innerHTML += '</div>';
        innerHTML += '</div>';
        
        // Duration options
        innerHTML += '<div style="margin-bottom:20px;">';
        innerHTML += '<label style="color:#e4e4e7; display:block; margin-bottom:8px;">Duration:</label>';
        innerHTML += '<div>';
        innerHTML += '<label style="color:#9ca3af; margin-right:20px;">';
        innerHTML += '<input type="radio" name="duration" value="continuous" checked> Continuous';
        innerHTML += '</label>';
        innerHTML += '<label style="color:#9ca3af;">';
        innerHTML += '<input type="radio" name="duration" value="timed"> Timed: ';
        innerHTML += '<input type="number" id="attackDuration" value="30" min="5" max="300" style="width:60px; padding:4px; background:#374151; color:#e4e4e7; border:1px solid #4b5563; border-radius:4px;"> seconds';
        innerHTML += '</label>';
        innerHTML += '</div>';
        innerHTML += '</div>';
        
        // Attack details (dynamic based on type)
        innerHTML += '<div id="attackDetails" style="margin-bottom:20px; padding:15px; background:#1f2937; border-radius:8px;">';
        innerHTML += _self.getAttackDetails('SYN_FLOOD');
        innerHTML += '</div>';
        
        innerHTML += '</div>';
        
        var controls = '<button onclick="attackManager.startAttack(' + attackerId + ')" style="background:#ef4444; color:white; padding:10px 20px; border:none; border-radius:6px; margin-right:10px; cursor:pointer; font-weight:bold;">▶ Start Attack</button>';
        controls += '<button onclick="closeAttackConfig()" style="background:#6b7280; color:white; padding:10px 20px; border:none; border-radius:6px; cursor:pointer;">Cancel</button>';
        
        var w = new UIWindow('divattackconfig', 'DoS Attack Configuration - ' + attacker.getName(), 500, 600, true, 1.0);
        w.setContent(innerHTML);
        w.setControls(controls);
        w.render();
        
        // Make updateAttackOptions global
        window.updateAttackOptions = function() {
            var type = document.getElementById('attackType').value;
            document.getElementById('attackDetails').innerHTML = _self.getAttackDetails(type);
        };
    };
    
    // Get attack type specific details
    this.getAttackDetails = function(type) {
        var html = '<h4 style="color:#667eea; margin-top:0;">Attack Details</h4>';
        
        switch(type) {
            case 'SYN_FLOOD':
                html += '<p style="color:#9ca3af; font-size:14px;">Sends TCP SYN packets without completing the handshake.</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Exhausts server connection pool</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Packets/sec at 25%: ~250</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Target port: 80 (HTTP)</p>';
                break;
                
            case 'HTTP_FLOOD':
                html += '<p style="color:#9ca3af; font-size:14px;">Floods server with HTTP requests.</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Overwhelms application layer</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Requests/sec at 25%: ~125</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Method: GET /</p>';
                break;
                
            case 'ICMP_FLOOD':
                html += '<p style="color:#9ca3af; font-size:14px;">Sends ICMP echo requests (ping flood).</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Consumes bandwidth</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Packets/sec at 25%: ~500</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Packet size: 64 bytes</p>';
                break;
                
            case 'SLOWLORIS':
                html += '<p style="color:#9ca3af; font-size:14px;">Opens many slow connections.</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Ties up server threads</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Connections at 25%: ~25</p>';
                html += '<p style="color:#9ca3af; font-size:14px;">• Keep-alive: 30 seconds</p>';
                break;
        }
        
        return html;
    };
    
    // Start an attack
    this.startAttack = function(attackerId) {
        var type = document.getElementById('attackType').value;
        var targetValue = document.getElementById('attackTarget').value;
        
        // Handle router interface targeting
        var targetId = targetValue;
        var targetInterface = 0;
        if (targetValue.indexOf(':') !== -1) {
            var parts = targetValue.split(':');
            targetId = parseInt(parts[0]);
            targetInterface = parseInt(parts[1]) || 0;
        } else {
            targetId = parseInt(targetValue);
        }
        
        var intensity = parseInt(document.getElementById('attackIntensity').value);
        var durationMode = document.querySelector('input[name="duration"]:checked').value;
        var duration = durationMode === 'timed' ? parseInt(document.getElementById('attackDuration').value) : 0;
        
        var attacker = _network.getElement(attackerId);
        var target = _network.getElement(targetId);
        
        if (!attacker || !target) {
            alert("Invalid attacker or target");
            return;
        }
        
        // Validate that attacker has an IP address
        var attackerConnectable = attacker.getConnectable ? attacker.getConnectable() : null;
        var attackerIPInfo = attackerConnectable && attackerConnectable.getIPInfo ? attackerConnectable.getIPInfo(0) : null;
        var attackerIP = attackerIPInfo && attackerIPInfo.getIPv4 ? attackerIPInfo.getIPv4() : null;
        
        if (!attackerIP) {
            // Close attack config window
            uimanager.getWindow('divattackconfig').dispose();
            removeBodyDiv('divbk');
            
            // Show error modal
            createBkDiv();
            var errorHtml = '<div style="padding:20px; background:#1f2937; border-radius:8px;">';
            errorHtml += '<h3 style="color:#ef4444; margin-bottom:20px;">⚠️ Cannot Launch Attack</h3>';
            errorHtml += '<div style="background:#7f1d1d; padding:15px; border-radius:8px; margin-bottom:20px;">';
            errorHtml += '<p style="color:#fca5a5; margin:0; font-size:14px;">';
            errorHtml += 'The attacking device <strong>' + attacker.getName() + '</strong> does not have an IP address configured.';
            errorHtml += '</p>';
            errorHtml += '</div>';
            errorHtml += '<p style="color:#e4e4e7; margin-bottom:20px;">';
            errorHtml += 'To launch an attack, the device must be properly configured on the network with:';
            errorHtml += '</p>';
            errorHtml += '<ul style="color:#9ca3af; text-align:left; margin-bottom:20px;">';
            errorHtml += '<li>An IP address</li>';
            errorHtml += '<li>A subnet mask</li>';
            errorHtml += '<li>A network connection</li>';
            errorHtml += '</ul>';
            errorHtml += '<p style="color:#e4e4e7;">';
            errorHtml += 'Please configure the network settings for this device first.';
            errorHtml += '</p>';
            errorHtml += '</div>';
            
            var w = new UIWindow('divattackerror', 'Network Configuration Required', 400, 320, false, 1.0);
            w.setContent(errorHtml);
            w.setControls('<p><input type="button" value="OK" onclick="uimanager.getWindow(\'divattackerror\').dispose(); removeBodyDiv(\'divbk\');" style="padding:8px 20px; background:#374151; color:#e4e4e7; border:1px solid #4b5563; border-radius:6px; cursor:pointer;" /></p>');
            w.render();
            
            return;
        }
        
        // Create attack configuration
        var attack = {
            id: ++attackCounter,
            attackerId: attackerId,
            targetId: targetId,
            targetInterface: targetInterface, // Store interface for routers
            targetValue: targetValue, // Store original value with interface info
            type: type,
            intensity: intensity,
            duration: duration * 1000, // Convert to ms
            startTime: Date.now(),
            packetsCount: 0,
            droppedCount: 0,
            active: true,
            blockedByFirewall: false,
            blockingFirewall: null,
            cachedPath: null // Cache the path to avoid recalculating
        };
        
        // Check if there's a firewall in the path that would block this attack
        var path = this.findNetworkPath(attackerId, targetId);
        if (!path || path.length < 2) {
            path = this.findCompleteNetworkPath(attackerId, targetId);
        }
        if (!path || path.length < 2) {
            path = this.findFullTopologyPath(attackerId, targetId);
        }
        
        // Cache the path for reuse
        attack.cachedPath = path;
        
        if (path && path.length > 0) {
            for (var i = 0; i < path.length; i++) {
                if (path[i].element && path[i].element.getType && path[i].element.getType() === 'firewall') {
                    var firewall = path[i].element;
                    if (firewall.getDoSDetection) {
                        var dosConfig = firewall.getDoSDetection();
                        if (dosConfig.enabled) {
                            // This attack will be blocked by the firewall
                            attack.blockedByFirewall = true;
                            attack.blockingFirewall = firewall;
                            // Attack will be blocked by firewall
                            break;
                        }
                    }
                }
            }
        }
        
        // Mark attacker as in attack mode
        attacker.isAttacking = true;
        attacker.attackTarget = targetId;
        attacker.attackType = type;
        
        // Also mark the target as being attacked with the attack type (only if not blocked)
        if (!attack.blockedByFirewall) {
            target.attackType = type;
        }
        
        activeAttacks.push(attack);
        
        // Close configuration window
        closeAttackConfig();
        
        // Show attack indicator
        _self.showAttackIndicator(attack);
        
        // Start attack processing
        if (!attackInterval) {
            attackInterval = setInterval(function() {
                _self.processAttacks();
            }, 100); // Process every 100ms
        }
        
        // Set timeout for timed attacks
        if (duration > 0) {
            setTimeout(function() {
                _self.stopAttack(attack.id);
            }, duration);
        }
        
        // Attack started
    };
    
    // Stop an attack
    this.stopAttack = function(attackId) {
        for (var i = 0; i < activeAttacks.length; i++) {
            if (activeAttacks[i].id === attackId) {
                var attack = activeAttacks[i];
                attack.active = false;
                
                // Clear attacker state
                var attacker = _network.getElement(attack.attackerId);
                if (attacker) {
                    attacker.isAttacking = false;
                    attacker.attackTarget = null;
                    attacker.attackType = null;
                }
                
                // Clear target state (only if attack wasn't blocked)
                if (!attack.blockedByFirewall) {
                    var target = _network.getElement(attack.targetId);
                    if (target) {
                        target.attackType = null;
                        // Clear server resources if no other attacks are targeting this host
                        var otherAttacks = false;
                        for (var j = 0; j < activeAttacks.length; j++) {
                            if (activeAttacks[j].targetId === attack.targetId && 
                                activeAttacks[j].id !== attackId && 
                                activeAttacks[j].active && 
                                !activeAttacks[j].blockedByFirewall) {
                                otherAttacks = true;
                                break;
                            }
                        }
                        if (!otherAttacks && target.serverResources) {
                            target.serverResources = null;
                        }
                    }
                }
                
                // Remove the attack indicator for this specific attack
                var indicator = document.getElementById('attackIndicator_' + attackId);
                if (indicator) {
                    indicator.remove();
                }
                
                // Show final statistics
                _self.showAttackStatistics(attack);
                
                // Remove from active attacks
                activeAttacks.splice(i, 1);
                
                // Update the Stop All button
                _self.updateStopAllButton();
                break;
            }
        }
        
        // Stop processing if no active attacks
        if (activeAttacks.length === 0) {
            if (attackInterval) {
                clearInterval(attackInterval);
                attackInterval = null;
            }
            // Clear any remaining packets
            if (_self.activePackets) {
                _self.activePackets = [];
            }
        }
    };
    
    // Process all active attacks
    this.processAttacks = function() {
        for (var i = 0; i < activeAttacks.length; i++) {
            var attack = activeAttacks[i];
            if (attack.active) {
                _self.processAttackTick(attack);
            }
        }
    };
    
    // Process a single attack tick
    this.processAttackTick = function(attack) {
        var packetsThisTick = Math.floor((attack.intensity / 100) * 10); // Scale packets per tick
        
        for (var i = 0; i < packetsThisTick; i++) {
            attack.packetsCount++;
            
            // Create visual packet animation - more aggressive limits to prevent lag
            // Dynamically adjust animation rate based on current packet count
            var maxPackets = 10; // Much lower max for better performance
            var animationChance = 0.08; // Base 8% chance (lower than before)
            
            // More aggressive reduction based on active packets
            if (_self.activePackets && _self.activePackets.length > 5) {
                animationChance = 0.04; // Drop to 4% if more than 5 packets
            }
            if (_self.activePackets && _self.activePackets.length > 8) {
                animationChance = 0.02; // Drop to 2% if more than 8 packets
            }
            
            // Also consider path length to reduce animations for long paths
            if (attack.cachedPath && attack.cachedPath.length > 10) {
                animationChance *= 0.5; // Halve the chance for long paths
            }
            
            // Only animate if under the limit and random chance succeeds
            if ((!_self.activePackets || _self.activePackets.length < maxPackets) && Math.random() < animationChance) {
                _self.animateAttackPacket(attack);
            }
            
            // Check if target can handle the packet - but only if not blocked by firewall
            var target = _network.getElement(attack.targetId);
            if (target && target.processAttackPacket && !attack.blockedByFirewall) {
                var handled = target.processAttackPacket(attack.type, attack.intensity);
                if (!handled) {
                    attack.droppedCount++;
                }
            } else if (attack.blockedByFirewall) {
                // Count as dropped since it was blocked
                attack.droppedCount++;
            }
        }
        
        // Update attack indicator
        _self.updateAttackIndicator(attack);
    };
    
    // Show attack indicator overlay - unique for each attack
    this.showAttackIndicator = function(attack) {
        // Show the global "Stop All Attacks" button if this is the first attack
        _self.updateStopAllButton();
        
        // Use unique ID for each attack indicator
        var indicatorId = 'attackIndicator_' + attack.id;
        var indicator = document.getElementById(indicatorId);
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = indicatorId;
            
            // Calculate position based on number of existing indicators
            var existingIndicators = document.querySelectorAll('[id^="attackIndicator_"]');
            var topOffset = 140 + (existingIndicators.length * 170); // Stack indicators vertically (moved down for Stop All button)
            
            // Style based on whether attack is blocked
            var bgColor = attack.blockedByFirewall ? 
                'linear-gradient(135deg, #065f46 0%, #059669 100%)' : 
                'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)';
            var borderColor = attack.blockedByFirewall ? '#10b981' : '#ef4444';
            
            indicator.style.cssText = 'position:fixed; top:' + topOffset + 'px; right:20px; width:250px; background:' + bgColor + '; border:2px solid ' + borderColor + '; border-radius:12px; padding:15px; color:white; z-index:1000; box-shadow:0 4px 6px rgba(0,0,0,0.3);';
            document.body.appendChild(indicator);
        }
        
        // Get attacker name for display
        var attacker = _network.getElement(attack.attackerId);
        var attackerName = attacker ? attacker.getName() : 'Unknown';
        
        var html = '';
        if (attack.blockedByFirewall) {
            html = '<h4 style="margin:0 0 10px 0; color:#fbbf24;">🛡️ ATTACK BLOCKED</h4>';
            html += '<div style="font-size:14px;">';
            html += '<p style="margin:5px 0;">Attacker: ' + attackerName + '</p>';
            html += '<p style="margin:5px 0;">Type: ' + attack.type.replace('_', ' ') + '</p>';
            html += '<p style="margin:5px 0;">Intensity: ' + attack.intensity + '%</p>';
            html += '<p style="margin:5px 0; color:#10b981;">Status: Blocked by Firewall</p>';
            var firewallName = attack.blockingFirewall ? attack.blockingFirewall.getName() : 'Firewall';
            html += '<p style="margin:5px 0; color:#10b981;">Firewall: ' + firewallName + '</p>';
            html += '<p style="margin:5px 0;">Packets: <span id="attackPackets_' + attack.id + '">0</span></p>';
            html += '<p style="margin:5px 0;">Blocked: <span id="attackDropped_' + attack.id + '">0</span></p>';
        } else {
            html = '<h4 style="margin:0 0 10px 0; color:#fca5a5;">🚨 ATTACK IN PROGRESS</h4>';
            html += '<div style="font-size:14px;">';
            html += '<p style="margin:5px 0;">Attacker: ' + attackerName + '</p>';
            html += '<p style="margin:5px 0;">Type: ' + attack.type.replace('_', ' ') + '</p>';
            html += '<p style="margin:5px 0;">Intensity: ' + attack.intensity + '%</p>';
            html += '<p style="margin:5px 0;">Packets: <span id="attackPackets_' + attack.id + '">0</span></p>';
            html += '<p style="margin:5px 0;">Dropped: <span id="attackDropped_' + attack.id + '">0</span></p>';
        }
        html += '</div>';
        html += '<button onclick="attackManager.stopAttack(' + attack.id + ')" style="margin-top:10px; width:100%; background:#ef4444; color:white; padding:8px; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">⏹ Stop Attack</button>';
        
        indicator.innerHTML = html;
        indicator.style.display = 'block';
    };
    
    // Update attack indicator
    this.updateAttackIndicator = function(attack) {
        var packets = document.getElementById('attackPackets_' + attack.id);
        var dropped = document.getElementById('attackDropped_' + attack.id);
        if (packets) packets.textContent = attack.packetsCount;
        if (dropped) dropped.textContent = attack.droppedCount;
    };
    
    // Simple path tracing that follows actual network connections
    this.traceNetworkPath = function(sourceId, targetId) {
        var source = _network.getElement(sourceId);
        var target = _network.getElement(targetId);
        
        if (!source || !target) return null;
        
        // Use BFS to find path through the network
        var visited = {};
        var queue = [];
        var parentMap = {};
        
        queue.push({id: sourceId, element: source});
        visited[sourceId] = true;
        parentMap[sourceId] = null;
        
        var found = false;
        
        // BFS to find path
        while (queue.length > 0 && !found) {
            var current = queue.shift();
            
            if (current.id === targetId) {
                found = true;
                break;
            }
            
            var currentElem = current.element;
            if (!currentElem) continue;
            
            // Get all connected devices
            var neighbors = this.getConnectedDevices(currentElem);
            
            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];
                if (!visited[neighbor.id]) {
                    visited[neighbor.id] = true;
                    parentMap[neighbor.id] = current.id;
                    queue.push({id: neighbor.id, element: neighbor});
                }
            }
        }
        
        if (!found) {
            // No path found - return direct line
            return this.getDirectLine(source, target);
        }
        
        // Reconstruct path
        var path = [];
        var currentId = targetId;
        
        while (currentId !== null) {
            var elem = _network.getElement(currentId);
            if (elem) {
                path.unshift(this.getElementPosition(elem));
            }
            currentId = parentMap[currentId];
        }
        
        return path.length > 1 ? path : null;
    };
    
    // Get all devices connected to the given element
    this.getConnectedDevices = function(element) {
        var devices = [];
        
        if (!element || !element.getConnectable) return devices;
        
        var connectable = element.getConnectable();
        if (!connectable) return devices;
        
        // Check each connector
        for (var i = 0; i < connectable.getConnectorNumber(); i++) {
            var connector = connectable.getConnector(i);
            if (!connector) continue;
            
            // Get the link
            var link = null;
            if (typeof connector.getLink === 'function') {
                link = connector.getLink();
            } else if (connector.link) {
                link = connector.link;
            }
            
            if (!link) continue;
            
            // Get the other end of the link
            var otherConnector = connector.getConnectedConnector();
            if (!otherConnector) continue;
            
            var otherConnectable = otherConnector.getConnectable();
            if (!otherConnectable || !otherConnectable.getOwner) continue;
            
            var otherDevice = otherConnectable.getOwner();
            if (otherDevice) {
                devices.push(otherDevice);
            }
        }
        
        return devices;
    };
    
    // Helper: Get element position for path
    this.getElementPosition = function(elem) {
        var rect = elem.getDrawable().getRect();
        return {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
            element: elem,
            id: elem.id
        };
    };
    
    // Helper: Get direct line between two elements
    this.getDirectLine = function(source, target) {
        return [
            this.getElementPosition(source),
            this.getElementPosition(target)
        ];
    };
    
    // Find a better path using gateway routing
    this.findGatewayPath = function(sourceId, targetId) {
        var source = _network.getElement(sourceId);
        var target = _network.getElement(targetId);
        
        if (!source || !target) return null;
        
        var path = [];
        
        // Add source
        path.push(this.getElementPosition(source));
        
        // Check if we need gateway routing
        var sourceConn = source.getConnectable ? source.getConnectable() : null;
        var targetConn = target.getConnectable ? target.getConnectable() : null;
        
        if (!sourceConn || !targetConn) {
            path.push(this.getElementPosition(target));
            return path;
        }
        
        // Get IPs
        var sourceIPInfo = sourceConn.getIPInfo(0);
        var targetIPInfo = targetConn.getIPInfo(0);
        
        if (!sourceIPInfo || !targetIPInfo) {
            // No IP info - use simple path
            return this.traceNetworkPath(sourceId, targetId);
        }
        
        var sourceIP = sourceIPInfo.getIPv4();
        var targetIP = targetIPInfo.getIPv4();
        
        if (!sourceIP || !targetIP) {
            return this.traceNetworkPath(sourceId, targetId);
        }
        
        // Check if same network using IPInfo's sameNetwork method
        if (sourceIPInfo.sameNetwork && sourceIPInfo.sameNetwork(targetIP)) {
            // Same network - find direct path through switches
            return this.traceNetworkPath(sourceId, targetId);
        }
        
        // Different network - need gateway
        var gwManager = sourceConn.getGatewayManager ? sourceConn.getGatewayManager() : null;
        if (!gwManager) {
            return this.traceNetworkPath(sourceId, targetId);
        }
        
        // Get gateway IP
        var gatewayIP = gwManager.getGatewayForIP(targetIP);
        if (!gatewayIP) {
            // Try default gateway
            var gwData = gwManager.getControllerData();
            if (gwData && gwData.length > 0) {
                for (var i = 0; i < gwData.length; i++) {
                    if (gwData[i][0] === '0.0.0.0' || gwData[i][0] === '') {
                        gatewayIP = gwData[i][2];
                        break;
                    }
                }
            }
        }
        
        if (!gatewayIP) {
            return this.traceNetworkPath(sourceId, targetId);
        }
        
        // Find gateway device
        var gatewayDevice = this.findDeviceByIP(gatewayIP);
        if (!gatewayDevice) {
            return this.traceNetworkPath(sourceId, targetId);
        }
        
        // Path to gateway
        var pathToGateway = this.traceNetworkPath(sourceId, gatewayDevice.id);
        if (!pathToGateway || pathToGateway.length < 2) {
            return this.traceNetworkPath(sourceId, targetId);
        }
        
        // Path from gateway to target
        var pathFromGateway = this.traceNetworkPath(gatewayDevice.id, targetId);
        if (!pathFromGateway || pathFromGateway.length < 2) {
            // If can't find path from gateway, add target directly
            pathToGateway.push(this.getElementPosition(target));
            return pathToGateway;
        }
        
        // Combine paths (remove duplicate gateway node)
        for (var j = 1; j < pathFromGateway.length; j++) {
            pathToGateway.push(pathFromGateway[j]);
        }
        
        return pathToGateway;
    };
    
    // Find device by IP address
    this.findDeviceByIP = function(ip) {
        var elements = _network.getAllElements();
        for (var id in elements) {
            var elem = elements[id];
            if (elem && elem.getConnectable) {
                var conn = elem.getConnectable();
                for (var i = 0; i < conn.getConnectorNumber(); i++) {
                    var ipInfo = conn.getIPInfo(i);
                    if (ipInfo && ipInfo.getIPv4 && ipInfo.getIPv4() === ip) {
                        return elem;
                    }
                }
            }
        }
        return null;
    };
    
    // Check if firewall would block this attack
    this.checkFirewallWouldBlock = function(firewall, attack, sourceIP) {
        // Check if firewall would block this attack from sourceIP
        
        // Check if DoS protection is enabled
        if (!firewall.getDoSDetection || !firewall.getDoSDetection().enabled) {
            return false;
        }
        
        var dosConfig = firewall.getDoSDetection();
        // Get DoS configuration
        
        // Track attack rates per source IP
        if (!this.firewallTracking) {
            this.firewallTracking = {};
        }
        
        var firewallId = firewall.id;
        if (!this.firewallTracking[firewallId]) {
            this.firewallTracking[firewallId] = {
                connectionTracking: {},
                blockedIPs: {}
            };
        }
        
        var tracking = this.firewallTracking[firewallId];
        
        // Check if IP is already blocked
        if (tracking.blockedIPs[sourceIP]) {
            return true;
        }
        
        // Initialize tracking for this IP if needed
        if (!tracking.connectionTracking[sourceIP]) {
            tracking.connectionTracking[sourceIP] = {
                synCount: 0,
                httpCount: 0,
                icmpCount: 0,
                connectionCount: 0,
                lastReset: Date.now()
            };
        }
        
        var ipTracking = tracking.connectionTracking[sourceIP];
        var now = Date.now();
        
        // Reset counters every second
        if (now - ipTracking.lastReset > 1000) {
            ipTracking.synCount = 0;
            ipTracking.httpCount = 0;
            ipTracking.icmpCount = 0;
            ipTracking.lastReset = now;
        }
        
        // Increment counters based on attack type
        var thresholds = dosConfig.thresholds;
        var shouldBlock = false;
        var reason = "";
        
        // Check thresholds based on attack type
        
        switch(attack.type) {
            case 'SYN_FLOOD':
                ipTracking.synCount++;
                // Check SYN flood threshold
                if (ipTracking.synCount > thresholds.synFloodRate) {
                    shouldBlock = true;
                    reason = "SYN flood detected: " + ipTracking.synCount + " packets/sec";
                }
                break;
                
            case 'HTTP_FLOOD':
                ipTracking.httpCount++;
                if (ipTracking.httpCount > thresholds.httpFloodRate) {
                    shouldBlock = true;
                    reason = "HTTP flood detected: " + ipTracking.httpCount + " requests/sec";
                }
                break;
                
            case 'ICMP_FLOOD':
                ipTracking.icmpCount++;
                if (ipTracking.icmpCount > thresholds.icmpFloodRate) {
                    shouldBlock = true;
                    reason = "ICMP flood detected: " + ipTracking.icmpCount + " packets/sec";
                }
                break;
                
            case 'SLOWLORIS':
                ipTracking.connectionCount++;
                if (ipTracking.connectionCount > thresholds.connectionLimit) {
                    shouldBlock = true;
                    reason = "Connection limit exceeded: " + ipTracking.connectionCount + " connections";
                }
                break;
        }
        
        // Block the IP if threshold exceeded
        if (shouldBlock) {
            tracking.blockedIPs[sourceIP] = {
                timestamp: now,
                reason: reason,
                attackType: attack.type
            };
            
            // Show visual indicator on firewall
            if (firewall.showDoSBlockedIndicator) {
                firewall.showDoSBlockedIndicator({sourceIP: sourceIP}, attack.type);
            }
            
            // Auto-unblock after 60 seconds
            setTimeout(function() {
                delete tracking.blockedIPs[sourceIP];
            }, 60000);
        }
        
        return shouldBlock;
    };
    
    // Main function to find network path
    this.findNetworkPath = function(sourceId, targetId) {
        // Try gateway path first (most accurate for cross-network)
        var path = this.findGatewayPath(sourceId, targetId);
        
        // If that fails, use simple network tracing
        if (!path || path.length < 2) {
            path = this.traceNetworkPath(sourceId, targetId);
        }
        
        // Last resort - direct line
        if (!path || path.length < 2) {
            var source = _network.getElement(sourceId);
            var target = _network.getElement(targetId);
            if (source && target) {
                path = this.getDirectLine(source, target);
            }
        }
        
        return path;
    };
    
    // Find full topology path - traces through ALL physical connections
    this.findFullTopologyPath = function(sourceId, targetId) {
        // This aggressive pathfinding traces through every physical connection
        // It will find paths through routers, firewalls, and any other connected device
        
        var visited = {};
        var queue = [];
        var parentMap = {};
        
        queue.push(sourceId);
        visited[sourceId] = true;
        parentMap[sourceId] = null;
        
        var found = false;
        var elements = _network.getAllElements();
        
        while (queue.length > 0 && !found) {
            var currentId = queue.shift();
            var currentElem = _network.getElement(currentId);
            
            if (!currentElem) continue;
            
            if (currentId === targetId) {
                found = true;
                break;
            }
            
            // Multiple methods to find connections
            
            // Method 1: Through connectable interfaces
            var connectable = currentElem.getConnectable ? currentElem.getConnectable() : null;
            if (connectable) {
                for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                    var connector = connectable.getConnector(i);
                    if (!connector) continue;
                    
                    // Get the link - handle both function and property
                    var link = null;
                    if (typeof connector.getLink === 'function') {
                        link = connector.getLink();
                    } else if (connector.link) {
                        link = connector.link;
                    }
                    if (!link) continue;
                    
                    var otherConnector = connector.getConnectedConnector();
                    if (!otherConnector) continue;
                    
                    var otherConnectable = otherConnector.getConnectable();
                    if (!otherConnectable) continue;
                    
                    var neighbor = otherConnectable.getOwner();
                    if (!neighbor) continue;
                    
                    var neighborId = neighbor.id;
                    
                    if (!visited[neighborId]) {
                        visited[neighborId] = true;
                        parentMap[neighborId] = currentId;
                        queue.push(neighborId);
                    }
                }
            }
            
            // Method 2: Check all elements to see if any are connected to current
            // This catches connections that might not be properly registered in connectors
            for (var elemId in elements) {
                if (visited[elemId]) continue;
                
                var elem = elements[elemId];
                if (!elem || !elem.getConnectable) continue;
                
                var elemConnectable = elem.getConnectable();
                if (!elemConnectable) continue;
                
                // Check if this element is connected to our current element
                for (var j = 0; j < elemConnectable.getConnectorNumber(); j++) {
                    var conn = elemConnectable.getConnector(j);
                    if (!conn) continue;
                    
                    // Check if there's a link
                    var hasLink = false;
                    if (typeof conn.getLink === 'function' && conn.getLink()) {
                        hasLink = true;
                    } else if (conn.link) {
                        hasLink = true;
                    }
                    
                    if (!hasLink) continue;
                    
                    var linkedConn = conn.getConnectedConnector();
                    if (!linkedConn) continue;
                    
                    var linkedConnectable = linkedConn.getConnectable();
                    if (!linkedConnectable) continue;
                    
                    var linkedOwner = linkedConnectable.getOwner();
                    if (!linkedOwner) continue;
                    
                    // If this element is connected to our current element
                    if (linkedOwner.id === currentId && !visited[elemId]) {
                        visited[elemId] = true;
                        parentMap[elemId] = currentId;
                        queue.push(parseInt(elemId)); // Ensure ID is numeric
                    }
                }
            }
        }
        
        if (!found) {
            // No path exists through physical connections
            return null;
        }
        
        // Reconstruct the path
        var pathIds = [];
        var currentId = targetId;
        while (currentId !== null) {
            pathIds.unshift(currentId);
            currentId = parentMap[currentId];
        }
        
        // Convert IDs to coordinates for animation
        var path = [];
        for (var i = 0; i < pathIds.length; i++) {
            var elem = _network.getElement(pathIds[i]);
            if (elem && elem.getDrawable) {
                var rect = elem.getDrawable().getRect();
                path.push({
                    x: rect.x + rect.width / 2,
                    y: rect.y + rect.height / 2,
                    element: elem,
                    id: pathIds[i]
                });
            }
        }
        
        return path.length > 1 ? path : null;
    };
    
    // Find complete network path including through routers and firewalls
    this.findCompleteNetworkPath = function(sourceId, targetId) {
        // This function tries to find a path through the entire network topology,
        // including routing through firewalls and routers that connect different networks
        
        var visited = {};
        var queue = [];
        var parentMap = {};
        
        queue.push({id: sourceId, via: null});
        visited[sourceId] = true;
        parentMap[sourceId] = null;
        
        var found = false;
        var elements = _network.getAllElements();
        
        while (queue.length > 0 && !found) {
            var current = queue.shift();
            var currentId = current.id;
            var currentElem = _network.getElement(currentId);
            
            if (!currentElem) continue;
            
            if (currentId === targetId) {
                found = true;
                break;
            }
            
            // Get all connected devices through physical links
            var connectable = currentElem.getConnectable();
            if (connectable) {
                for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                    var connector = connectable.getConnector(i);
                    if (connector && connector.getLink) {
                        var otherConnector = connector.getConnectedConnector();
                        if (otherConnector) {
                            var neighbor = otherConnector.getConnectable().getOwner();
                            var neighborId = neighbor.id;
                            
                            if (!visited[neighborId]) {
                                visited[neighborId] = true;
                                parentMap[neighborId] = currentId;
                                queue.push({id: neighborId, via: 'direct'});
                            }
                        }
                    }
                }
            }
            
            // Special handling for routers and firewalls - they can route between interfaces
            var type = currentElem.getType ? currentElem.getType() : '';
            if (type === 'router' || type === 'firewall') {
                // Check if this device can route to networks we haven't visited
                // by looking at all its interfaces
                if (connectable) {
                    var connectedNetworks = [];
                    
                    // Collect all networks this router/firewall is connected to
                    for (var j = 0; j < connectable.getConnectorNumber(); j++) {
                        var conn = connectable.getConnector(j);
                        if (conn && conn.getLink) {
                            var otherConn = conn.getConnectedConnector();
                            if (otherConn) {
                                var otherDevice = otherConn.getConnectable().getOwner();
                                
                                // If connected to a switch, find all devices on that switch
                                if (otherDevice.getType && otherDevice.getType() === 'switch') {
                                    var switchConnectable = otherDevice.getConnectable();
                                    if (switchConnectable) {
                                        for (var k = 0; k < switchConnectable.getConnectorNumber(); k++) {
                                            var switchConn = switchConnectable.getConnector(k);
                                            if (switchConn && switchConn.getLink) {
                                                var deviceConn = switchConn.getConnectedConnector();
                                                if (deviceConn) {
                                                    var device = deviceConn.getConnectable().getOwner();
                                                    if (device.id !== currentId && !visited[device.id]) {
                                                        visited[device.id] = true;
                                                        parentMap[device.id] = currentId;
                                                        queue.push({id: device.id, via: 'routed'});
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        if (!found) return null;
        
        // Reconstruct path
        var pathIds = [];
        var currentId = targetId;
        while (currentId !== null) {
            pathIds.unshift(currentId);
            currentId = parentMap[currentId];
        }
        
        // Convert to position coordinates
        var path = [];
        for (var i = 0; i < pathIds.length; i++) {
            var elem = _network.getElement(pathIds[i]);
            if (elem) {
                var rect = elem.getDrawable().getRect();
                path.push({
                    x: rect.x + rect.width / 2,
                    y: rect.y + rect.height / 2,
                    element: elem
                });
            }
        }
        
        return path;
    };
    
    // Helper function to find direct path between two elements using BFS
    this.findDirectPath = function(sourceId, targetId) {
        var visited = {};
        var queue = [];
        var parentMap = {};
        
        queue.push(sourceId);
        visited[sourceId] = true;
        parentMap[sourceId] = null;
        
        var found = false;
        
        while (queue.length > 0 && !found) {
            var currentId = queue.shift();
            var current = _network.getElement(currentId);
            
            if (!current) continue;
            
            if (currentId === targetId) {
                found = true;
                break;
            }
            
            var connectable = current.getConnectable();
            if (connectable) {
                for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                    var connector = connectable.getConnector(i);
                    if (connector && connector.getLink) {
                        var otherConnector = connector.getConnectedConnector();
                        if (otherConnector) {
                            var neighbor = otherConnector.getConnectable().getOwner();
                            var neighborId = neighbor.id;
                            
                            if (!visited[neighborId]) {
                                visited[neighborId] = true;
                                parentMap[neighborId] = currentId;
                                queue.push(neighborId);
                            }
                        }
                    }
                }
            }
        }
        
        if (!found) return null;
        
        // Reconstruct path
        var pathIds = [];
        var currentId = targetId;
        while (currentId !== null) {
            pathIds.unshift(currentId);
            currentId = parentMap[currentId];
        }
        
        // Convert to position coordinates
        var path = [];
        for (var i = 0; i < pathIds.length; i++) {
            var elem = _network.getElement(pathIds[i]);
            if (elem) {
                var rect = elem.getDrawable().getRect();
                path.push({
                    x: rect.x + rect.width / 2,
                    y: rect.y + rect.height / 2,
                    element: elem
                });
            }
        }
        
        return path;
    };
    
    // Simulate legitimate traffic to show attack impact
    this.simulateLegitimateTraffic = function() {
        // Only simulate during active attacks
        if (activeAttacks.length === 0) return;
        
        // Simulate legitimate traffic every few animation frames
        if (Math.random() > 0.05) return; // Only run 5% of the time
        
        // Find servers that are under attack
        for (var i = 0; i < activeAttacks.length; i++) {
            var attack = activeAttacks[i];
            var target = _network.getElement(attack.targetId);
            
            if (target && target.serverResources) {
                // Simulate legitimate packets trying to reach the server
                var legitimateLoad = 10; // Low load from legitimate traffic
                var isLegitimate = true;
                
                // Process legitimate packet through server resources
                target.serverResources.processPacket('LEGITIMATE', legitimateLoad, isLegitimate);
                
            }
        }
    };
    
    // Animate attack packet
    this.animateAttackPacket = function(attack) {
        // Create visual packet animation on canvas
        var attacker = _network.getElement(attack.attackerId);
        var target = _network.getElement(attack.targetId);
        
        if (!attacker || !target) return;
        
        // Use cached path if available, otherwise calculate it once
        var path = attack.cachedPath;
        
        if (!path || path.length < 2) {
            // Calculate path only if not cached
            path = this.findNetworkPath(attack.attackerId, attack.targetId);
            
            // If no path found, try the complete network path
            if (!path || path.length < 2) {
                path = this.findCompleteNetworkPath(attack.attackerId, attack.targetId);
            }
            
            // If still no path, try the full topology path
            if (!path || path.length < 2) {
                path = this.findFullTopologyPath(attack.attackerId, attack.targetId);
            }
            
            // Last resort: fallback to direct line if no path found
            if (!path || path.length < 2) {
                var attackerRect = attacker.getDrawable().getRect();
                var targetRect = target.getDrawable().getRect();
                path = [
                    {x: attackerRect.x + attackerRect.width / 2, y: attackerRect.y + attackerRect.height / 2},
                    {x: targetRect.x + targetRect.width / 2, y: targetRect.y + targetRect.height / 2}
                ];
            }
            
            // Cache the path for next time
            attack.cachedPath = path;
        }
        
        // Check for firewalls in the path
        var firewallInPath = null;
        var firewallIndex = -1;
        for (var i = 0; i < path.length; i++) {
            if (path[i].element && path[i].element.getType && path[i].element.getType() === 'firewall') {
                firewallInPath = path[i].element;
                firewallIndex = i;
                break;
            }
        }
        
        // If there's a firewall, check if it would block this attack
        if (firewallInPath && firewallInPath.getDoSDetection) {
            var dosConfig = firewallInPath.getDoSDetection();
            
            // Debug: Log firewall detection
            // Firewall found in path with DoS protection
            
            if (dosConfig.enabled) {
                // Simulate the attack packet for the firewall
                var attackerIP = null;
                if (attacker.getConnectable) {
                    var attackerConn = attacker.getConnectable();
                    var attackerIPInfo = attackerConn.getIPInfo(0);
                    if (attackerIPInfo) attackerIP = attackerIPInfo.getIPv4();
                }
                
                // Check if this IP would be blocked
                
                // Check if this firewall would block the attack
                var isBlocked = this.checkFirewallWouldBlock(firewallInPath, attack, attackerIP);
                
                // Determine if attack should be blocked
                
                if (isBlocked) {
                    // Truncate path at firewall - packet won't go further
                    path = path.slice(0, firewallIndex + 1);
                    attack.blockedByFirewall = true;
                    attack.blockingFirewall = firewallInPath;
                    
                    // Log to firewall using its actual logging method
                    if (firewallInPath.addLog) {
                        var attackTypeStr = attack.type.replace(/_/g, ' ');
                        firewallInPath.addLog("DOS_BLOCK", "Attack blocked: " + attackTypeStr + " from " + (attackerIP || "unknown"));
                    }
                    
                    // Update firewall statistics properly
                    var stats = firewallInPath.getStatistics ? firewallInPath.getStatistics() : null;
                    if (stats) {
                        stats.blocked++;
                        if (!stats.dosAttacksDetected) stats.dosAttacksDetected = 0;
                        if (!stats.dosPacketsDropped) stats.dosPacketsDropped = 0;
                        stats.dosAttacksDetected++;
                        stats.dosPacketsDropped++;
                    }
                }
            }
        }
        
        // Create packet object that follows the path
        // Calculate optimal speed based on total path distance
        var baseSpeed = 0.04; // Much faster base speed to reduce lag
        var pathDistance = 0;
        
        // Calculate total path distance
        for (var p = 0; p < path.length - 1; p++) {
            var dx = path[p + 1].x - path[p].x;
            var dy = path[p + 1].y - path[p].y;
            pathDistance += Math.sqrt(dx * dx + dy * dy);
        }
        
        // Store path info for optimization
        attack.lastPath = path;
        attack.lastPathLength = pathDistance;
        
        // More aggressive speed scaling for long paths
        var speedMultiplier = 1;
        if (pathDistance > 300) {
            // Scale speed up more aggressively for long distances
            speedMultiplier = Math.min(6, pathDistance / 150); // Increased multiplier
        }
        
        // Determine packet color based on whether it's blocked
        var packetColor = '#ef4444'; // Default red for attacks
        if (attack.blockedByFirewall) {
            packetColor = '#ff6600'; // Orange for blocked packets
        }
        
        var packet = {
            path: path,
            currentSegment: 0, // Which segment of the path we're on
            segmentProgress: 0, // Progress within current segment (0-1)
            color: packetColor,
            size: 4 + Math.random() * 2, // Smaller size variation to reduce visual noise
            speed: baseSpeed * speedMultiplier + Math.random() * 0.005,
            type: attack.type,
            blockedByFirewall: attack.blockedByFirewall || false
        };
        
        // Calculate current position from path
        if (path.length >= 2) {
            packet.x = path[0].x;
            packet.y = path[0].y;
        }
        
        // Add to active packets array
        if (!this.activePackets) this.activePackets = [];
        this.activePackets.push(packet);
        
        // Start animation loop if not already running
        if (!this.animationRunning) {
            this.startPacketAnimation();
        }
    };
    
    // Start the packet animation loop
    this.startPacketAnimation = function() {
        this.animationRunning = true;
        var canvas = document.getElementById('simcanvas');
        if (!canvas) return;
        
        var animate = function() {
            // Only continue if there are active attacks or packets
            if (_self.activePackets && _self.activePackets.length > 0) {
                _self.updatePackets();
                requestAnimationFrame(animate);
            } else {
                _self.animationRunning = false;
            }
        };
        
        requestAnimationFrame(animate);
    };
    
    // Update and draw packets
    this.updatePackets = function() {
        if (!this.activePackets) return;
        
        // Simulate legitimate traffic during attacks
        this.simulateLegitimateTraffic();
        
        var canvas = document.getElementById('simcanvas');
        if (!canvas) return;
        
        // Get the network context to draw on
        var ctx = canvas.getContext('2d');
        
        // Clean up old packets periodically to prevent memory leaks
        if (!this.cleanupCounter) this.cleanupCounter = 0;
        this.cleanupCounter++;
        
        if (this.cleanupCounter > 30) { // Every ~0.5 seconds at 60fps (more frequent cleanup)
            this.cleanupCounter = 0;
            // Remove any packets that might be stuck or orphaned
            var maxAge = 2500; // Reduced to 2.5 seconds max lifetime
            var now = Date.now();
            for (var j = this.activePackets.length - 1; j >= 0; j--) {
                if (!this.activePackets[j].birthTime) {
                    this.activePackets[j].birthTime = now;
                } else if (now - this.activePackets[j].birthTime > maxAge) {
                    this.activePackets.splice(j, 1);
                }
            }
        }
        
        // Update each packet
        for (var i = this.activePackets.length - 1; i >= 0; i--) {
            var packet = this.activePackets[i];
            
            // Set birth time if not set
            if (!packet.birthTime) {
                packet.birthTime = Date.now();
            }
            
            // Handle path-following packets
            if (packet.path && packet.path.length >= 2) {
                // Update progress along current segment
                packet.segmentProgress += packet.speed;
                
                // Check if we've completed current segment
                if (packet.segmentProgress >= 1) {
                    // Move to next segment
                    packet.currentSegment++;
                    packet.segmentProgress = 0;
                    
                    // Check if we've reached the end of the path
                    if (packet.currentSegment >= packet.path.length - 1) {
                        // Packet reached target, remove it
                        this.activePackets.splice(i, 1);
                        continue;
                    }
                }
                
                // Calculate current position along path
                var fromPoint = packet.path[packet.currentSegment];
                var toPoint = packet.path[packet.currentSegment + 1];
                
                if (fromPoint && toPoint) {
                    packet.x = fromPoint.x + (toPoint.x - fromPoint.x) * packet.segmentProgress;
                    packet.y = fromPoint.y + (toPoint.y - fromPoint.y) * packet.segmentProgress;
                }
            } else {
                // Fallback: Simple linear movement (for backwards compatibility)
                packet.progress += packet.speed;
                
                if (packet.progress >= 1) {
                    // Packet reached target, remove it
                    this.activePackets.splice(i, 1);
                    continue;
                }
                
                // Calculate current position
                packet.x = packet.x + (packet.targetX - packet.x) * packet.progress;
                packet.y = packet.y + (packet.targetY - packet.y) * packet.progress;
            }
            
            // Draw packet
            ctx.save();
            
            // Apply zoom and pan if available
            if (typeof canvasViewport !== 'undefined') {
                ctx.setTransform(
                    canvasViewport.zoom, 0, 0, canvasViewport.zoom,
                    canvasViewport.offsetX, canvasViewport.offsetY
                );
            }
            
            // Draw glowing packet
            ctx.globalAlpha = 0.8;
            ctx.shadowBlur = 10;
            ctx.shadowColor = packet.color;
            
            // Draw packet circle
            ctx.fillStyle = packet.color;
            ctx.beginPath();
            ctx.arc(packet.x, packet.y, packet.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw inner bright core
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(packet.x, packet.y, packet.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
            
            // Optional: Draw a faint trail
            if (packet.path && packet.currentSegment > 0) {
                ctx.globalAlpha = 0.2;
                ctx.strokeStyle = packet.color;
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                for (var j = 0; j <= packet.currentSegment && j < packet.path.length - 1; j++) {
                    if (j === 0) {
                        ctx.moveTo(packet.path[j].x, packet.path[j].y);
                    }
                    ctx.lineTo(packet.path[j + 1].x, packet.path[j + 1].y);
                }
                // Draw partial line for current segment
                ctx.lineTo(packet.x, packet.y);
                ctx.stroke();
                ctx.setLineDash([]);
            }
            
            ctx.restore();
        }
    };
    
    // Show attack statistics
    this.showAttackStatistics = function(attack) {
        var duration = (Date.now() - attack.startTime) / 1000;
        var successRate = ((attack.packetsCount - attack.droppedCount) / attack.packetsCount * 100).toFixed(1);
        
        // Use the unique indicator ID for this attack
        var indicatorId = 'attackIndicator_' + attack.id;
        var indicator = document.getElementById(indicatorId);
        if (indicator) {
            // Get attacker name for display
            var attacker = _network.getElement(attack.attackerId);
            var attackerName = attacker ? attacker.getName() : 'Unknown';
            
            var html = '<h4 style="margin:0 0 10px 0; color:#10b981;">✓ Attack Completed</h4>';
            html += '<div style="font-size:14px;">';
            html += '<p style="margin:5px 0;">Attacker: ' + attackerName + '</p>';
            html += '<p style="margin:5px 0;">Duration: ' + duration.toFixed(1) + ' seconds</p>';
            html += '<p style="margin:5px 0;">Total Packets: ' + attack.packetsCount + '</p>';
            html += '<p style="margin:5px 0;">Packets Dropped: ' + attack.droppedCount + '</p>';
            html += '<p style="margin:5px 0;">Success Rate: ' + successRate + '%</p>';
            html += '</div>';
            html += '<button onclick="document.getElementById(\'' + indicatorId + '\').remove()" style="margin-top:10px; width:100%; background:#6b7280; color:white; padding:8px; border:none; border-radius:6px; cursor:pointer;">Close</button>';
            
            indicator.style.background = 'linear-gradient(135deg, #064e3b 0%, #047857 100%)';
            indicator.style.borderColor = '#10b981';
            indicator.innerHTML = html;
            
            // Auto-hide after 10 seconds
            setTimeout(function() {
                var elem = document.getElementById(indicatorId);
                if (elem) elem.remove();
            }, 10000);
        }
    };
    
    // Stop all attacks from a specific host
    this.stopHostAttacks = function(hostId) {
        var attacksToStop = [];
        for (var i = 0; i < activeAttacks.length; i++) {
            if (activeAttacks[i].attackerId === hostId && activeAttacks[i].active) {
                attacksToStop.push(activeAttacks[i].id);
            }
        }
        
        // Stop each attack
        for (var j = 0; j < attacksToStop.length; j++) {
            this.stopAttack(attacksToStop[j]);
        }
    };
    
    // Stop all active attacks
    this.stopAllAttacks = function() {
        var attacksToStop = [];
        for (var i = 0; i < activeAttacks.length; i++) {
            if (activeAttacks[i].active) {
                attacksToStop.push(activeAttacks[i].id);
            }
        }
        
        // Stop each attack
        for (var j = 0; j < attacksToStop.length; j++) {
            this.stopAttack(attacksToStop[j]);
        }
    };
    
    // Get active attacks for a host
    this.getHostAttacks = function(hostId) {
        var attacks = [];
        for (var i = 0; i < activeAttacks.length; i++) {
            if (activeAttacks[i].attackerId === hostId && activeAttacks[i].active) {
                attacks.push(activeAttacks[i]);
            }
        }
        return attacks;
    };
    
    // Check if a host is currently attacking
    this.isAttacking = function(hostId) {
        for (var i = 0; i < activeAttacks.length; i++) {
            if (activeAttacks[i].attackerId === hostId && activeAttacks[i].active) {
                return true;
            }
        }
        return false;
    };
    
    // Update the "Stop All Attacks" button visibility
    this.updateStopAllButton = function() {
        var button = document.getElementById('stopAllAttacksBtn');
        var activeCount = this.getActiveAttacks().length;
        
        if (activeCount > 0 && !button) {
            // Create the button
            button = document.createElement('div');
            button.id = 'stopAllAttacksBtn';
            button.style.cssText = 'position:fixed; top:80px; right:20px; width:250px; background:linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border:2px solid #f87171; border-radius:12px; padding:12px; color:white; z-index:1001; box-shadow:0 6px 12px rgba(0,0,0,0.4); cursor:pointer; text-align:center; font-weight:bold; font-size:16px; transition:all 0.3s;';
            button.innerHTML = '⚠️ STOP ALL ATTACKS (' + activeCount + ')';
            button.onclick = function() {
                _self.showStopAllConfirmation();
            };
            button.onmouseover = function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.5)';
            };
            button.onmouseout = function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
            };
            document.body.appendChild(button);
        } else if (button) {
            if (activeCount > 0) {
                // Update count
                button.innerHTML = '⚠️ STOP ALL ATTACKS (' + activeCount + ')';
            } else {
                // Remove button when no active attacks
                button.remove();
            }
        }
    };
    
    // Show confirmation modal for stopping all attacks
    this.showStopAllConfirmation = function() {
        var activeCount = this.getActiveAttacks().length;
        
        // Create modal backdrop
        var backdrop = document.createElement('div');
        backdrop.id = 'stopAllConfirmBackdrop';
        backdrop.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.7); z-index:10000; display:flex; align-items:center; justify-content:center; animation:fadeIn 0.2s ease;';
        
        // Create modal dialog
        var modal = document.createElement('div');
        modal.style.cssText = 'background:#1a1d2e; border:2px solid #ef4444; border-radius:12px; padding:30px; max-width:450px; animation:slideDown 0.3s ease; box-shadow:0 10px 25px rgba(0,0,0,0.5);';
        
        var html = '<h3 style="color:#ef4444; margin-bottom:20px; font-size:24px;">⚠️ Stop All Attacks?</h3>';
        html += '<p style="color:#e4e4e7; margin-bottom:20px; font-size:16px;">';
        html += 'You are about to stop <strong style="color:#ef4444;">' + activeCount + '</strong> active attack' + (activeCount > 1 ? 's' : '') + '. ';
        html += 'This will immediately halt all ongoing attack simulations.';
        html += '</p>';
        
        // List active attacks
        if (activeCount > 0) {
            html += '<div style="background:#0f172a; border:1px solid #374151; border-radius:8px; padding:15px; margin-bottom:20px;">';
            html += '<p style="color:#9ca3af; margin:0 0 10px 0; font-size:14px; font-weight:bold;">Active Attacks:</p>';
            var attacks = this.getActiveAttacks();
            for (var i = 0; i < attacks.length && i < 5; i++) {
                var attack = attacks[i];
                var attacker = _network.getElement(attack.attackerId);
                var target = _network.getElement(attack.targetId);
                var attackerName = attacker ? attacker.getName() : 'Unknown';
                var targetName = target ? target.getName() : 'Unknown';
                html += '<p style="color:#e4e4e7; margin:5px 0; font-size:13px;">• ' + attackerName + ' → ' + targetName + ' (' + attack.type.replace('_', ' ') + ')</p>';
            }
            if (activeCount > 5) {
                html += '<p style="color:#9ca3af; margin:5px 0; font-size:13px;">... and ' + (activeCount - 5) + ' more</p>';
            }
            html += '</div>';
        }
        
        html += '<div style="display:flex; gap:10px; justify-content:flex-end;">';
        html += '<button id="stopAllCancel" style="background:#374151; color:#9ca3af; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-weight:500; font-size:14px;">Cancel</button>';
        html += '<button id="stopAllConfirm" style="background:#ef4444; color:white; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-weight:500; font-size:14px;">Stop All Attacks</button>';
        html += '</div>';
        
        modal.innerHTML = html;
        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);
        
        // Add CSS animation keyframes if not already present
        if (!document.getElementById('attackModalAnimations')) {
            var style = document.createElement('style');
            style.id = 'attackModalAnimations';
            style.innerHTML = '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }';
            document.head.appendChild(style);
        }
        
        // Bind events
        document.getElementById('stopAllCancel').onclick = function() {
            backdrop.remove();
        };
        
        document.getElementById('stopAllConfirm').onclick = function() {
            _self.stopAllAttacks();
            backdrop.remove();
        };
        
        // Close on backdrop click
        backdrop.onclick = function(e) {
            if (e.target === backdrop) {
                backdrop.remove();
            }
        };
        
        // Close on Escape key
        var escapeHandler = function(e) {
            if (e.key === 'Escape') {
                backdrop.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    };
    
    // Get all active attacks
    this.getActiveAttacks = function() {
        return activeAttacks.filter(function(attack) {
            return attack.active;
        });
    };
};

// Global close function
function closeAttackConfig() {
    var w = uimanager.getWindow('divattackconfig');
    if (w) w.dispose();
    removeBodyDiv('divbk');
}