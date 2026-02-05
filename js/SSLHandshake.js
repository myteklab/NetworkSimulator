/*
 * SSL/TLS Handshake Visualization for NetworkSimulator
 * This module provides visual animation of the SSL/TLS handshake process
 * for educational purposes, showing each step of the protocol.
 *
 * (c) 2025 - Part of MyTekOS NetworkSimulator
 */

var SSLHandshake = function() {
    var _self = this;
    var handshakeSteps = [];
    var currentStep = 0;
    var animationInProgress = false;
    var handshakePackets = [];
    var handshakeCallback = null;
    var isPaused = false;
    var stepByStepMode = false;
    var clientId = null;
    var serverId = null;
    var networkPath = null;
    var autoAdvanceTimeout = null;

    // Define the handshake steps with educational descriptions (simplified 6-step version)
    var HANDSHAKE_STEPS = [
        {
            id: 'client_hello',
            name: 'Step 1: Browser says hello',
            direction: 'client_to_server',
            color: '#667eea',
            icon: '👋',
            description: 'Browser initiates secure connection',
            details: 'Your browser reaches out and says, "Hi, I want to talk securely. Here are the encryption methods I support."',
            packet: {
                type: 'CLIENT HELLO',
                size: '320 bytes',
                content: [
                    'Message: "Hi, I want to talk securely"',
                    'Supported encryption methods:',
                    '• AES-256 (very strong)',
                    '• AES-128 (strong)',
                    '• ChaCha20 (modern)',
                    'TLS Version: 1.3 (latest)',
                    'Purpose: Starting secure conversation'
                ]
            }
        },
        {
            id: 'server_certificate',
            name: 'Step 2: Server replies with certificate',
            direction: 'server_to_client',
            color: '#10b981',
            icon: '📜',
            description: 'Server sends its digital certificate',
            details: 'The server answers with its digital certificate containing the public key, signed by a trusted Certificate Authority.',
            packet: {
                type: 'SERVER HELLO + CERTIFICATE',
                size: '2048 bytes',
                content: [
                    'Message: "Here\'s my certificate"',
                    'Certificate contains:',
                    '• Server\'s public key (RSA 2048-bit)',
                    '• Website name (domain)',
                    '• Issuer: Certificate Authority (CA)',
                    '• Valid until: 1 year from now',
                    '• Digital signature from CA',
                    'Purpose: Proving server identity'
                ]
            }
        },
        {
            id: 'browser_verify',
            name: 'Step 3: Browser verifies identity',
            direction: 'client_to_server',
            color: '#f59e0b',
            icon: '✔️',
            description: 'Browser checks the certificate',
            details: 'Your browser verifies: Is it valid? Is it signed by a trusted CA? Does the domain match?',
            packet: {
                type: 'CERTIFICATE VERIFICATION',
                size: '64 bytes',
                content: [
                    'Checking certificate:',
                    '✓ Not expired',
                    '✓ Signed by trusted CA',
                    '✓ Domain name matches',
                    '✓ Certificate chain valid',
                    '',
                    'Result: Server identity confirmed!',
                    'Trust established successfully'
                ]
            }
        },
        {
            id: 'key_exchange',
            name: 'Step 4: Asymmetric key exchange',
            direction: 'client_to_server',
            color: '#06b6d4',
            icon: '🔐',
            description: 'Browser sends encrypted session key',
            details: 'Browser generates a random session key and encrypts it with the server\'s public key. Only the server can decrypt it.',
            packet: {
                type: 'KEY EXCHANGE',
                size: '256 bytes',
                content: [
                    'Creating session key:',
                    '• Random session key generated',
                    '• Encrypting with server\'s public key',
                    '• Only server can decrypt this',
                    '',
                    'Encrypted payload: [256 bytes]',
                    'Contains: Secret session key',
                    'Purpose: Sharing the symmetric key'
                ]
            }
        },
        {
            id: 'server_decrypt',
            name: 'Step 5: Server unlocks the secret',
            direction: 'server_to_client',
            color: '#8b5cf6',
            icon: '🔓',
            description: 'Server decrypts session key',
            details: 'The server uses its private key to decrypt and recover the session key. Now both sides share the same secret.',
            packet: {
                type: 'KEY RECEIVED',
                size: '48 bytes',
                content: [
                    'Server actions:',
                    '• Using private key to decrypt',
                    '• Session key recovered!',
                    '• Shared secret established',
                    '',
                    'Both sides now have:',
                    '• Same session key',
                    '• No one else knows it'
                ]
            }
        },
        {
            id: 'symmetric_mode',
            name: 'Step 6: Switch to symmetric mode',
            direction: 'both',
            color: '#22c55e',
            icon: '🔒',
            description: 'Secure tunnel established',
            details: 'Both sides switch to fast symmetric encryption (AES) with the shared session key. All data is now encrypted.',
            packet: {
                type: 'SECURE CONNECTION READY',
                size: '40 bytes',
                content: [
                    '🔒 Encryption activated!',
                    '',
                    'Now using:',
                    '• AES-256 symmetric encryption',
                    '• Shared session key',
                    '• SHA-256 for integrity checks',
                    '',
                    'All data (login, passwords, etc.)',
                    'is now fully encrypted'
                ]
            }
        }
    ];

    // Create visual packet for animation
    this.createHandshakePacket = function(step, sourceId, destId, path) {
        var packet = {
            id: 'ssl_' + step.id + '_' + Date.now(),
            step: step,
            source: sourceId,
            dest: destId,
            path: path || [],
            position: 0,
            speed: 0.03,
            visible: true,
            startTime: Date.now()
        };
        return packet;
    };

    // Start the SSL handshake animation
    this.startHandshake = function(clientIdParam, serverIdParam, callback) {
        if (animationInProgress) {
            console.log("SSL Handshake already in progress");
            return;
        }

        console.log("Starting SSL/TLS Handshake visualization between client " + clientIdParam + " and server " + serverIdParam);
        animationInProgress = true;
        currentStep = 0;
        handshakePackets = [];
        handshakeCallback = callback;
        isPaused = false;
        stepByStepMode = false;
        clientId = clientIdParam;
        serverId = serverIdParam;

        // If serverId is null, try to find any server element
        if (!serverId) {
            console.log("No specific server ID provided, looking for any HTTP server...");
            var elements = network.getAllElements();
            for (var i = 0; i < elements.length; i++) {
                var elem = elements[i];
                if (elem && elem.getApp && elem.getApp("HTTPServer")) {
                    serverId = elem.id;
                    console.log("Found HTTP server: " + serverId);
                    break;
                }
            }
        }

        // Find the network path between client and server
        var client = network.getElement(clientId);
        var server = serverId ? network.getElement(serverId) : null;

        if (!client) {
            console.error("Client not found");
            animationInProgress = false;
            if (callback) callback(false);
            return;
        }

        // If still no server, use a dummy position
        if (!server) {
            console.log("Warning: Server not found, using client position for demo");
            // Create a virtual server position
            server = {
                id: 'virtual_server',
                getPos: function() {
                    var clientPos = client.getPos();
                    return {
                        x: clientPos.x + 200,
                        y: clientPos.y
                    };
                }
            };
            serverId = 'virtual_server';
        }

        // Get the path between client and server
        networkPath = _self.findNetworkPath(clientId, serverId);
        if (!networkPath || networkPath.length < 2) {
            // Direct connection or no path found - use straight line
            networkPath = [clientId, serverId];
        }

        // Show handshake dialog with controls
        _self.showHandshakeDialog();

        // Start processing handshake steps
        _self.processNextStep(clientId, serverId, networkPath);
    };

    // Process the next handshake step
    this.processNextStep = function(clientId, serverId, path) {
        if (currentStep >= HANDSHAKE_STEPS.length) {
            // Handshake complete
            _self.completeHandshake();
            return;
        }

        var step = HANDSHAKE_STEPS[currentStep];
        _self.updateHandshakeDialog(step);

        // Determine source and destination based on direction
        var sourceId, destId, animPath;
        if (step.direction === 'client_to_server') {
            sourceId = clientId;
            destId = serverId;
            animPath = path.slice(); // Client to server path
        } else if (step.direction === 'server_to_client') {
            sourceId = serverId;
            destId = clientId;
            animPath = path.slice().reverse(); // Reverse path for server to client
        } else if (step.direction === 'both') {
            // For bidirectional, show both packets
            _self.createAndAnimatePacket(step, clientId, serverId, path.slice());
            _self.createAndAnimatePacket(step, serverId, clientId, path.slice().reverse());
            currentStep++;

            // Check if we should auto-advance or wait
            if (!isPaused && !stepByStepMode) {
                // Clear any existing timeout before setting a new one
                if (autoAdvanceTimeout) {
                    clearTimeout(autoAdvanceTimeout);
                }
                autoAdvanceTimeout = setTimeout(function() {
                    _self.processNextStep(clientId, serverId, path);
                }, 2000);
            }
            return;
        }

        // Create and animate the packet
        _self.createAndAnimatePacket(step, sourceId, destId, animPath);

        // Move to next step after delay (if not paused or in step mode)
        currentStep++;

        if (!isPaused && !stepByStepMode) {
            // Clear any existing timeout before setting a new one
            if (autoAdvanceTimeout) {
                clearTimeout(autoAdvanceTimeout);
            }
            // Store timeout reference so it can be cleared if needed
            autoAdvanceTimeout = setTimeout(function() {
                _self.processNextStep(clientId, serverId, path);
            }, 2500);
        }
    };

    // Create and animate a handshake packet
    this.createAndAnimatePacket = function(step, sourceId, destId, path) {
        var packet = _self.createHandshakePacket(step, sourceId, destId, path);
        handshakePackets.push(packet);

        // Start animation if not already running
        if (!_self.animationRunning) {
            _self.animatePackets();
        }
    };

    // Animate all handshake packets
    this.animatePackets = function() {
        _self.animationRunning = true;

        var canvas = document.getElementById('simcanvas');
        if (!canvas) {
            _self.animationRunning = false;
            return;
        }

        var animate = function() {
            // Update packet positions
            var activePackets = false;
            for (var i = handshakePackets.length - 1; i >= 0; i--) {
                var packet = handshakePackets[i];
                if (packet.visible) {
                    activePackets = true;
                    packet.position += packet.speed;

                    // Remove packet when it reaches destination
                    if (packet.position >= 1) {
                        packet.visible = false;
                        handshakePackets.splice(i, 1);
                    }
                }
            }

            // Trigger network redraw to clear old packet positions
            if (window.network && network.render) {
                network.render();
            }

            // Draw our packets on top
            if (canvas && canvas.getContext) {
                var ctx = canvas.getContext('2d');

                // Save the current context state
                ctx.save();

                // Apply viewport transformation if it exists
                if (window.canvasViewport) {
                    ctx.translate(canvasViewport.offsetX, canvasViewport.offsetY);
                    ctx.scale(canvasViewport.zoom, canvasViewport.zoom);
                }

                // Draw our SSL packets on top
                _self.drawPackets(ctx);

                // Restore the context state
                ctx.restore();
            }

            // Continue animation if packets remain
            if (activePackets) {
                requestAnimationFrame(animate);
            } else {
                _self.animationRunning = false;
            }
        };

        requestAnimationFrame(animate);
    };

    // Draw handshake packets on canvas
    this.drawPackets = function(ctx) {
        for (var i = 0; i < handshakePackets.length; i++) {
            var packet = handshakePackets[i];
            if (!packet.visible) continue;

            // Calculate position along path
            var coords = _self.getPacketPosition(packet);
            if (!coords) continue;

            ctx.save();

            // Draw packet circle with glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = packet.step.color;
            ctx.fillStyle = packet.step.color;
            ctx.beginPath();
            ctx.arc(coords.x, coords.y, 8, 0, 2 * Math.PI);
            ctx.fill();

            // Draw packet icon
            ctx.shadowBlur = 0;
            ctx.font = '14px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(packet.step.icon, coords.x, coords.y);

            // Draw packet label
            ctx.font = 'bold 11px Arial';
            ctx.fillStyle = packet.step.color;
            ctx.textAlign = 'left';
            ctx.fillText(packet.step.name, coords.x + 15, coords.y - 5);

            // Draw packet details
            ctx.font = '9px Arial';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(packet.step.packet.size, coords.x + 15, coords.y + 5);

            ctx.restore();
        }
    };

    // Get packet position along path
    this.getPacketPosition = function(packet) {
        if (!packet.path || packet.path.length < 2) {
            return null;
        }

        // Handle virtual server case
        var source, dest;

        if (packet.source === 'virtual_server') {
            var realDest = network.getElement(packet.dest);
            if (!realDest) return null;
            var destPos = realDest.getPos();
            source = {
                getPos: function() {
                    return {
                        x: destPos.x + 200,
                        y: destPos.y
                    };
                }
            };
            dest = realDest;
        } else if (packet.dest === 'virtual_server') {
            var realSource = network.getElement(packet.source);
            if (!realSource) return null;
            var sourcePos = realSource.getPos();
            dest = {
                getPos: function() {
                    return {
                        x: sourcePos.x + 200,
                        y: sourcePos.y
                    };
                }
            };
            source = realSource;
        } else {
            // Normal case
            source = network.getElement(packet.source);
            dest = network.getElement(packet.dest);
            if (!source || !dest) return null;
        }

        // Get drawable from elements to access position
        var sourceDrawable = source.getDrawable ? source.getDrawable() : null;
        var destDrawable = dest.getDrawable ? dest.getDrawable() : null;

        if (!sourceDrawable || !destDrawable) return null;

        var sourceX = sourceDrawable.getX();
        var sourceY = sourceDrawable.getY();
        var destX = destDrawable.getX();
        var destY = destDrawable.getY();

        return {
            x: sourceX + (destX - sourceX) * packet.position,
            y: sourceY + (destY - sourceY) * packet.position
        };
    };

    // Find network path between two elements
    this.findNetworkPath = function(sourceId, destId) {
        var source = network.getElement(sourceId);
        var dest = network.getElement(destId);

        if (!source || !dest) {
            return [sourceId, destId];
        }

        // Try to find path through network topology
        var visited = {};
        var queue = [{id: sourceId, path: [sourceId]}];

        while (queue.length > 0) {
            var current = queue.shift();

            if (current.id === destId) {
                return current.path;
            }

            if (visited[current.id]) {
                continue;
            }
            visited[current.id] = true;

            var elem = network.getElement(current.id);
            if (!elem || !elem.getConnectable) continue;

            var connectable = elem.getConnectable();
            if (!connectable) continue;

            // Check all connectors for links
            for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                var connector = connectable.getConnector(i);
                if (connector && connector.isConnected()) {
                    var link = connector.getLink();
                    if (link) {
                        // Get the other end of the link
                        // Link has getConnector1() and getConnector2(), not getOtherConnector
                        var connector1 = link.getConnector1();
                        var connector2 = link.getConnector2();
                        var otherConnector = (connector === connector1) ? connector2 : connector1;

                        if (otherConnector) {
                            // Get the connectable from the connector
                            var otherConnectable = otherConnector.getConnectable();
                            if (otherConnectable) {
                                // Get the owner (Host) from the connectable
                                var otherElement = otherConnectable.getOwner();
                                if (otherElement && otherElement.id && !visited[otherElement.id]) {
                                    var newPath = current.path.slice();
                                    newPath.push(otherElement.id);
                                    queue.push({id: otherElement.id, path: newPath});
                                }
                            }
                        }
                    }
                }
            }
        }

        // No path found, return direct connection
        return [sourceId, destId];
    };

    // Show SSL handshake dialog
    this.showHandshakeDialog = function() {
        // Remove existing dialog if present
        var existing = document.getElementById('sslHandshakeDialog');
        if (existing) {
            existing.remove();
        }

        var dialog = document.createElement('div');
        dialog.id = 'sslHandshakeDialog';
        dialog.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 380px;
            max-height: 600px;
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border: 2px solid #334155;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            z-index: 150;
            color: #e2e8f0;
            font-family: 'Segoe UI', Arial, sans-serif;
            animation: slideInLeft 0.3s ease-out;
            opacity: 0.95;
        `;

        dialog.innerHTML = `
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 12px 16px; border-radius: 10px 10px 0 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 16px; color: white; font-weight: 600;">
                        🔐 SSL/TLS Handshake in Progress
                    </h3>
                    <button onclick="SSLHandshake.minimizeDialog()" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">−</button>
                </div>
            </div>
            <div id="sslHandshakeContent" style="padding: 16px; max-height: 400px; overflow-y: auto;">
                <!-- Playback Controls -->
                <div id="sslControls" style="margin-bottom: 16px; padding: 10px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border: 1px solid rgba(99, 102, 241, 0.2);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <div style="display: flex; gap: 8px;">
                            <!-- Play/Pause Button -->
                            <button id="sslPlayBtn" onclick="SSLHandshake.togglePause()" style="display: none; padding: 6px 10px; background: #10b981; border: none; border-radius: 6px; color: white; cursor: pointer; font-size: 12px; transition: all 0.2s;" title="Resume">
                                ▶ Play
                            </button>
                            <button id="sslPauseBtn" onclick="SSLHandshake.togglePause()" style="padding: 6px 10px; background: #f59e0b; border: none; border-radius: 6px; color: white; cursor: pointer; font-size: 12px; transition: all 0.2s;" title="Pause">
                                ⏸ Pause
                            </button>

                            <!-- Step Mode Button -->
                            <button id="sslStepBtn" onclick="SSLHandshake.enableStepMode()" style="padding: 6px 10px; background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 6px; color: #a5b4fc; cursor: pointer; font-size: 12px; transition: all 0.2s;" title="Step-by-step mode">
                                📋 Step Mode
                            </button>

                            <!-- Restart Button -->
                            <button onclick="SSLHandshake.restartHandshake()" style="padding: 6px 10px; background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; color: #fca5a5; cursor: pointer; font-size: 12px; transition: all 0.2s;" title="Restart from beginning">
                                🔄 Restart
                            </button>
                        </div>

                        <!-- Status Indicator -->
                        <div id="sslStatusText" style="font-size: 11px; color: #34d399; font-weight: 600;">
                            ▶ Playing
                        </div>
                    </div>

                    <!-- Step Navigation (for step mode) -->
                    <div style="display: flex; justify-content: center; gap: 8px; align-items: center;">
                        <button id="sslPrevBtn" onclick="SSLHandshake.previousStep()" style="padding: 4px 8px; background: rgba(148, 163, 184, 0.2); border: 1px solid rgba(148, 163, 184, 0.3); border-radius: 4px; color: #cbd5e1; cursor: pointer; font-size: 11px; transition: all 0.2s;" disabled>
                            ◀ Previous
                        </button>

                        <span style="font-size: 11px; color: #94a3b8; padding: 0 8px;">
                            Use step controls to navigate
                        </span>

                        <button id="sslNextBtn" onclick="SSLHandshake.nextStep()" style="padding: 4px 8px; background: rgba(148, 163, 184, 0.2); border: 1px solid rgba(148, 163, 184, 0.3); border-radius: 4px; color: #cbd5e1; cursor: pointer; font-size: 11px; transition: all 0.2s;">
                            Next ▶
                        </button>
                    </div>

                    <div style="margin-top: 8px; padding: 8px; background: rgba(0, 0, 0, 0.2); border-radius: 4px;">
                        <p style="margin: 0; font-size: 10px; color: #94a3b8; text-align: center;">
                            💡 <strong>Tip:</strong> Use Pause to read details, or Step Mode to go through each step manually
                        </p>
                    </div>
                </div>

                <div id="sslStepInfo" style="margin-bottom: 12px;">
                    <p style="margin: 0; color: #94a3b8; font-size: 13px;">Establishing secure connection...</p>
                </div>
                <div id="sslStepDetails" style="background: #1e293b; padding: 12px; border-radius: 8px; border: 1px solid #334155;">
                    <p style="margin: 0; font-size: 12px; color: #cbd5e1;">Initializing handshake protocol...</p>
                </div>
                <div id="sslPacketInfo" style="margin-top: 12px; padding: 10px; background: #0f172a; border-radius: 6px; border: 1px solid #1e293b; font-family: 'Courier New', monospace; font-size: 11px; color: #64748b; display: none;">
                </div>
                <div id="sslProgress" style="margin-top: 16px;">
                    <div style="background: #334155; height: 4px; border-radius: 2px; overflow: hidden;">
                        <div id="sslProgressBar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); transition: width 0.5s ease;"></div>
                    </div>
                    <p style="text-align: center; margin-top: 8px; font-size: 11px; color: #64748b;">
                        Step <span id="currentStepNum">0</span> of <span id="totalSteps">6</span>
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        // Add animation keyframes if not already present
        if (!document.getElementById('sslHandshakeStyles')) {
            var style = document.createElement('style');
            style.id = 'sslHandshakeStyles';
            style.innerHTML = `
                @keyframes slideInLeft {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.6; }
                    100% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        // Update total steps
        document.getElementById('totalSteps').textContent = HANDSHAKE_STEPS.length;

        // Initialize control buttons state
        _self.updateControlButtons();
    };

    // Update handshake dialog with current step
    this.updateHandshakeDialog = function(step) {
        var stepInfo = document.getElementById('sslStepInfo');
        var stepDetails = document.getElementById('sslStepDetails');
        var packetInfo = document.getElementById('sslPacketInfo');
        var progressBar = document.getElementById('sslProgressBar');
        var currentStepNum = document.getElementById('currentStepNum');

        if (!stepInfo || !stepDetails) return;

        // Update step information
        stepInfo.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 24px;">${step.icon}</span>
                <div>
                    <h4 style="margin: 0; color: ${step.color}; font-size: 15px; font-weight: 600;">${step.name}</h4>
                    <p style="margin: 2px 0 0 0; color: #cbd5e1; font-size: 13px;">${step.description}</p>
                </div>
            </div>
        `;

        // Update step details
        stepDetails.innerHTML = `
            <p style="margin: 0 0 8px 0; color: #e2e8f0; font-size: 12px; font-weight: 500;">📦 ${step.packet.type}</p>
            <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">${step.details}</p>
        `;

        // Show packet content
        if (packetInfo) {
            packetInfo.style.display = 'block';
            packetInfo.innerHTML = step.packet.content.map(line =>
                `<div style="color: ${line.startsWith('•') ? '#667eea' : '#64748b'};">${line}</div>`
            ).join('');
        }

        // Update progress
        if (progressBar) {
            var progress = ((currentStep + 1) / HANDSHAKE_STEPS.length) * 100;
            progressBar.style.width = progress + '%';
        }

        if (currentStepNum) {
            currentStepNum.textContent = currentStep + 1;
        }

        // Add direction indicator
        var directionArrow = '';
        if (step.direction === 'client_to_server') {
            directionArrow = '→ Server';
        } else if (step.direction === 'server_to_client') {
            directionArrow = '← Client';
        } else if (step.direction === 'both') {
            directionArrow = '↔ Both';
        }

        if (directionArrow) {
            stepInfo.innerHTML += `<p style="margin: 8px 0 0 34px; color: #64748b; font-size: 11px;">Direction: ${directionArrow}</p>`;
        }
    };

    // Complete the handshake
    this.completeHandshake = function() {
        console.log("SSL/TLS Handshake complete");

        // Clear any pending timeouts
        if (autoAdvanceTimeout) {
            clearTimeout(autoAdvanceTimeout);
            autoAdvanceTimeout = null;
        }

        animationInProgress = false;
        isPaused = false;
        stepByStepMode = false;

        var dialog = document.getElementById('sslHandshakeDialog');
        if (dialog) {
            var content = document.getElementById('sslHandshakeContent');
            if (content) {
                content.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">🔒</div>
                        <h3 style="color: #10b981; margin: 0 0 8px 0; font-size: 18px;">Secure Connection Established!</h3>
                        <p style="color: #cbd5e1; margin: 0 0 16px 0; font-size: 13px;">
                            The SSL/TLS handshake has completed successfully.
                        </p>
                        <div style="background: #1e293b; padding: 12px; border-radius: 8px; text-align: left; font-size: 12px; color: #94a3b8; margin-bottom: 16px;">
                            <div style="margin-bottom: 6px;">✅ <strong>Identity Verified:</strong> Server is who it claims to be</div>
                            <div style="margin-bottom: 6px;">✅ <strong>Session Key Shared:</strong> Using asymmetric encryption</div>
                            <div style="margin-bottom: 6px;">✅ <strong>Fast Encryption Active:</strong> Switched to AES symmetric mode</div>
                            <div>✅ <strong>Data Protected:</strong> All traffic now encrypted</div>
                        </div>
                        <div style="background: linear-gradient(135deg, #065f46, #064e3b); padding: 10px; border-radius: 6px; border: 1px solid #10b981;">
                            <p style="margin: 0; color: #6ee7b7; font-size: 11px; text-align: center;">
                                <strong>🎯 Remember:</strong> Asymmetric encryption shared the key, now symmetric encryption protects your data!
                            </p>
                        </div>
                    </div>
                `;
            }

            // Auto-close after 5 seconds
            setTimeout(function() {
                if (dialog && dialog.parentNode) {
                    dialog.style.animation = 'slideInRight 0.3s ease-out reverse';
                    setTimeout(function() {
                        if (dialog.parentNode) {
                            dialog.parentNode.removeChild(dialog);
                        }
                    }, 300);
                }
            }, 5000);
        }

        // Call the callback if provided
        if (handshakeCallback) {
            handshakeCallback(true);
        }
    };

    // Control functions for pause/resume and navigation
    this.pauseHandshake = function() {
        isPaused = true;
        // Clear any pending auto-advance timeout
        if (autoAdvanceTimeout) {
            clearTimeout(autoAdvanceTimeout);
            autoAdvanceTimeout = null;
        }
        _self.updateControlButtons();
    };

    this.resumeHandshake = function() {
        isPaused = false;
        stepByStepMode = false;
        _self.updateControlButtons();

        // Continue from current step if not at the end
        if (animationInProgress && currentStep < HANDSHAKE_STEPS.length) {
            // Clear any existing timeout
            if (autoAdvanceTimeout) {
                clearTimeout(autoAdvanceTimeout);
            }

            // Set a new timeout to continue
            autoAdvanceTimeout = setTimeout(function() {
                _self.processNextStep(clientId, serverId, networkPath);
            }, 1000);
        }
    };

    this.togglePause = function() {
        if (isPaused) {
            _self.resumeHandshake();
        } else {
            _self.pauseHandshake();
        }
    };

    this.enableStepMode = function() {
        stepByStepMode = true;
        isPaused = true;  // In step mode, we're essentially paused
        // Clear any pending auto-advance timeout
        if (autoAdvanceTimeout) {
            clearTimeout(autoAdvanceTimeout);
            autoAdvanceTimeout = null;
        }
        _self.updateControlButtons();
    };

    this.nextStep = function() {
        if (!animationInProgress || currentStep >= HANDSHAKE_STEPS.length) {
            return;
        }

        // Clear any pending auto-advance timeout
        if (autoAdvanceTimeout) {
            clearTimeout(autoAdvanceTimeout);
            autoAdvanceTimeout = null;
        }

        // Remember if we're in step mode
        var wasStepMode = stepByStepMode;

        // Temporarily disable pause/step mode to allow processing
        isPaused = false;
        stepByStepMode = false;

        // Process the step
        _self.processNextStep(clientId, serverId, networkPath);

        // Restore step mode if it was enabled
        if (wasStepMode) {
            stepByStepMode = true;
            isPaused = true;
        }
    };

    this.previousStep = function() {
        if (!animationInProgress || currentStep <= 1) {
            return;
        }

        // Clear any pending auto-advance timeout
        if (autoAdvanceTimeout) {
            clearTimeout(autoAdvanceTimeout);
            autoAdvanceTimeout = null;
        }

        // Remember if we're in step mode or paused
        var wasStepMode = stepByStepMode;
        var wasPaused = isPaused;

        // Go back to previous step
        currentStep = Math.max(0, currentStep - 2); // Go back 2 because processNextStep increments

        // Clear any existing packets when going back
        handshakePackets = [];

        // Temporarily disable pause/step mode to allow processing
        isPaused = false;
        stepByStepMode = false;

        // Process the step
        _self.processNextStep(clientId, serverId, networkPath);

        // Restore pause/step mode if it was enabled
        if (wasStepMode || wasPaused) {
            stepByStepMode = wasStepMode;
            isPaused = true;
        }
    };

    this.restartHandshake = function() {
        if (!animationInProgress) {
            return;
        }
        // Clear any pending auto-advance timeout
        if (autoAdvanceTimeout) {
            clearTimeout(autoAdvanceTimeout);
            autoAdvanceTimeout = null;
        }
        currentStep = 0;
        handshakePackets = [];
        isPaused = false;
        stepByStepMode = false;
        _self.updateControlButtons();
        _self.processNextStep(clientId, serverId, networkPath);
    };

    this.updateControlButtons = function() {
        var playBtn = document.getElementById('sslPlayBtn');
        var pauseBtn = document.getElementById('sslPauseBtn');
        var stepBtn = document.getElementById('sslStepBtn');
        var nextBtn = document.getElementById('sslNextBtn');
        var prevBtn = document.getElementById('sslPrevBtn');
        var statusText = document.getElementById('sslStatusText');

        if (playBtn && pauseBtn) {
            if (isPaused || stepByStepMode) {
                playBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
            } else {
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
            }
        }

        if (stepBtn) {
            stepBtn.style.backgroundColor = stepByStepMode ? '#667eea' : 'rgba(99, 102, 241, 0.2)';
        }

        if (nextBtn) {
            nextBtn.disabled = currentStep >= HANDSHAKE_STEPS.length;
        }

        if (prevBtn) {
            prevBtn.disabled = currentStep <= 0;
        }

        if (statusText) {
            if (isPaused) {
                statusText.textContent = '⏸ Paused';
                statusText.style.color = '#fbbf24';
            } else if (stepByStepMode) {
                statusText.textContent = '📋 Step Mode';
                statusText.style.color = '#a78bfa';
            } else {
                statusText.textContent = '▶ Playing';
                statusText.style.color = '#34d399';
            }
        }
    };

    // Minimize dialog (static method for onclick)
    window.SSLHandshake = window.SSLHandshake || {};
    window.SSLHandshake.minimizeDialog = function() {
        var dialog = document.getElementById('sslHandshakeDialog');
        if (dialog) {
            dialog.style.display = 'none';
        }
    };

    window.SSLHandshake.togglePause = function() {
        if (window.sslHandshake) {
            window.sslHandshake.togglePause();
        }
    };

    window.SSLHandshake.enableStepMode = function() {
        if (window.sslHandshake) {
            window.sslHandshake.enableStepMode();
        }
    };

    window.SSLHandshake.nextStep = function() {
        if (window.sslHandshake) {
            window.sslHandshake.nextStep();
        }
    };

    window.SSLHandshake.previousStep = function() {
        if (window.sslHandshake) {
            window.sslHandshake.previousStep();
        }
    };

    window.SSLHandshake.restartHandshake = function() {
        if (window.sslHandshake) {
            window.sslHandshake.restartHandshake();
        }
    };

    // Clean up
    this.cleanup = function() {
        // Clear any pending timeouts
        if (autoAdvanceTimeout) {
            clearTimeout(autoAdvanceTimeout);
            autoAdvanceTimeout = null;
        }

        animationInProgress = false;
        handshakePackets = [];
        currentStep = 0;
        isPaused = false;
        stepByStepMode = false;
        clientId = null;
        serverId = null;
        networkPath = null;
        handshakeCallback = null;

        var dialog = document.getElementById('sslHandshakeDialog');
        if (dialog && dialog.parentNode) {
            dialog.parentNode.removeChild(dialog);
        }
    };
};

// Create global instance
window.sslHandshake = new SSLHandshake();
console.log("SSL Handshake module loaded and initialized");

// Hook into the network drawing system
// We'll integrate with the main animation loop
(function() {
    // Store reference to original network draw if exists
    var checkForNetwork = function() {
        if (typeof network !== 'undefined' && network) {
            // Hook into the network's draw cycle
            var originalDraw = network.draw;
            if (originalDraw && !network._sslHandshakeHooked) {
                network.draw = function() {
                    // Call original draw
                    if (originalDraw) {
                        originalDraw.call(this);
                    }
                    // Draw SSL handshake packets on top
                    if (window.sslHandshake && this.ctx) {
                        window.sslHandshake.drawPackets(this.ctx);
                    }
                };
                network._sslHandshakeHooked = true;
                console.log("SSL Handshake visualization hooked into network drawing");
            }
        }
    };

    // Check immediately and periodically until network is ready
    checkForNetwork();
    var hookInterval = setInterval(function() {
        if (typeof network !== 'undefined' && network && network._sslHandshakeHooked) {
            clearInterval(hookInterval);
        } else {
            checkForNetwork();
        }
    }, 500);

    // Also hook into any canvas redraw if available
    if (typeof canvasViewport !== 'undefined') {
        var originalRedraw = canvasViewport.redraw;
        if (originalRedraw) {
            canvasViewport.redraw = function() {
                if (originalRedraw) {
                    originalRedraw.call(this);
                }
                // Trigger network redraw which will include our packets
                if (network && network.draw) {
                    network.draw();
                }
            };
        }
    }
})();