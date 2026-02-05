/*
 * PacketInspector.js - Layer-by-Layer Packet Visualization
 * Supports both OSI 7-layer and TCP/IP 4-layer models
 * Educational tool for understanding network encapsulation
 */

var PacketInspector = function() {
    var currentMessage = null;
    var inspectorPanel = null;
    var currentModel = 'OSI'; // 'OSI' or 'TCPIP'
    var isEnabled = true;
    var isDragging = false;
    var dragOffset = {x: 0, y: 0};
    var liveUpdateEnabled = true; // Auto-update as packet travels
    var lastHopCount = 0; // Track how many hops we've displayed
    var _self = this;

    /**
     * Main entry point - inspect a packet
     */
    this.inspectMessage = function(message) {
        if (!isEnabled || !message) return;

        // Store message AFTER showing inspector (since showInspector calls closeInspector which clears it)
        this.showInspector(message);
        currentMessage = message;
        lastHopCount = message.hasPathHistory ? message.getPathHistory().length : 0;
        console.log('currentMessage set to:', !!currentMessage);

        // Enable live updates for this message
        if (liveUpdateEnabled) {
            this.startLiveUpdates(message);
        }
    };

    /**
     * Start live updates for a message
     */
    this.startLiveUpdates = function(message) {
        // Set up a polling interval to check for new hops
        if (this.liveUpdateInterval) {
            clearInterval(this.liveUpdateInterval);
        }

        this.liveUpdateInterval = setInterval(function() {
            if (!currentMessage || !inspectorPanel) {
                clearInterval(_self.liveUpdateInterval);
                return;
            }

            // Check if new hops were added
            var currentHops = currentMessage.hasPathHistory ? currentMessage.getPathHistory().length : 0;
            if (currentHops > lastHopCount) {
                console.log('New hop detected! Updating journey...', lastHopCount, '->', currentHops);
                lastHopCount = currentHops;
                _self.updateJourneyOnly();
            }
        }, 100); // Check every 100ms
    };

    /**
     * Update only the journey section (more efficient than full refresh)
     */
    this.updateJourneyOnly = function() {
        if (!currentMessage || !inspectorPanel) return;

        var journeyContainer = document.getElementById('journey-container');
        if (journeyContainer) {
            var newJourneyHTML = this.buildActualJourney(currentMessage);
            journeyContainer.innerHTML = newJourneyHTML;

            // Scroll to bottom to show new hop
            var contentArea = document.getElementById('inspector-content-area');
            if (contentArea) {
                // Smooth scroll to show the new hop
                setTimeout(function() {
                    var newHop = journeyContainer.querySelector('.hop-step:last-child');
                    if (newHop) {
                        newHop.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        // Flash animation on new hop
                        newHop.style.animation = 'hopFlash 0.5s ease-in-out';
                    }
                }, 50);
            }
        }
    };

    /**
     * Toggle between OSI and TCP/IP models
     */
    this.toggleModel = function(model) {
        console.log('toggleModel called with:', model, 'current:', currentModel);

        if (currentModel === model) {
            console.log('Already on this model, skipping');
            return; // Already on this model
        }

        currentModel = model;
        console.log('Model changed to:', currentModel);

        console.log('Checking preconditions - currentMessage:', !!currentMessage, 'inspectorPanel:', !!inspectorPanel);

        if (currentMessage && inspectorPanel) {
            console.log('Refreshing inspector with new model');
            this.refreshInspector();
        } else {
            console.error('Cannot refresh - missing currentMessage or inspectorPanel!');
        }
    };


    /**
     * Build and show the inspector panel
     */
    this.showInspector = function(message) {
        // Remove existing panel if any
        this.closeInspector();

        // Create panel
        inspectorPanel = document.createElement('div');
        inspectorPanel.id = 'packet-inspector-panel';
        inspectorPanel.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            width: 450px;
            max-height: 80vh;
            background: linear-gradient(145deg, #1a1d2e 0%, #252941 100%);
            border: 2px solid #9333ea;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(147, 51, 234, 0.3);
            z-index: 10000;
            font-family: 'Consolas', 'Monaco', monospace;
            color: #e2e8f0;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        `;

        // Add CSS animation for hop flash
        if (!document.getElementById('hop-flash-style')) {
            var style = document.createElement('style');
            style.id = 'hop-flash-style';
            style.textContent = `
                @keyframes hopFlash {
                    0% {
                        background: rgba(59, 130, 246, 0.3);
                        transform: scale(1);
                    }
                    50% {
                        background: rgba(59, 130, 246, 0.5);
                        transform: scale(1.02);
                    }
                    100% {
                        background: transparent;
                        transform: scale(1);
                    }
                }
                .hop-step {
                    transition: all 0.3s ease;
                    border-radius: 6px;
                    padding: 8px;
                }
            `;
            document.head.appendChild(style);
        }

        // Build content
        var html = this.buildInspectorHTML(message);
        inspectorPanel.innerHTML = html;

        document.body.appendChild(inspectorPanel);

        // Add event listeners
        this.attachEventListeners();
    };

    /**
     * Build the HTML content for the inspector
     */
    this.buildInspectorHTML = function(message) {
        var layers = currentModel === 'OSI' ?
            this.buildOSILayers(message) :
            this.buildTCPIPLayers(message);

        var html = `
            <div id="inspector-header" style="
                padding: 12px 16px;
                background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%);
                cursor: move;
                display: flex;
                justify-content: space-between;
                align-items: center;
                user-select: none;
            ">
                <div style="font-weight: 600; font-size: 14px;">
                    📦 Packet Inspector
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button id="inspector-close" style="
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: white;
                        width: 24px;
                        height: 24px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">✕</button>
                </div>
            </div>

            <div style="padding: 12px 16px; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(147,51,234,0.3);">
                <div style="display: flex; gap: 12px; font-size: 12px; margin-bottom: 8px;">
                    <button id="model-osi" class="model-toggle ${currentModel === 'OSI' ? 'active' : ''}"
                        style="flex: 1; padding: 6px 12px; border-radius: 6px; border: 1px solid; cursor: pointer; transition: all 0.2s;
                        ${currentModel === 'OSI' ?
                            'background: #9333ea; color: white; border-color: #9333ea;' :
                            'background: transparent; color: #94a3b8; border-color: #475569;'}">
                        OSI (7-Layer)
                    </button>
                    <button id="model-tcpip" class="model-toggle ${currentModel === 'TCPIP' ? 'active' : ''}"
                        style="flex: 1; padding: 6px 12px; border-radius: 6px; border: 1px solid; cursor: pointer; transition: all 0.2s;
                        ${currentModel === 'TCPIP' ?
                            'background: #9333ea; color: white; border-color: #9333ea;' :
                            'background: transparent; color: #94a3b8; border-color: #475569;'}">
                        TCP/IP (4-Layer)
                    </button>
                </div>
                <div style="font-size: 10px; color: #94a3b8; text-align: center; padding: 4px;">
                    <span style="color: #10b981;">●</span> Live tracking enabled - journey updates as packet travels
                </div>
            </div>

            <div id="inspector-content-area" style="
                flex: 1;
                overflow-y: auto;
                padding: 16px;
            ">
                ${this.buildPacketSummary(message)}
                <div id="journey-container">
                    ${this.buildActualJourney(message)}
                </div>
                ${layers.join('\n')}
                ${this.buildEducationalNotes(message)}
            </div>

            <div style="
                padding: 12px 16px;
                background: rgba(0,0,0,0.2);
                border-top: 1px solid rgba(147,51,234,0.3);
                font-size: 11px;
                color: #94a3b8;
                text-align: center;
            ">
                💡 Click on a layer to copy its contents
            </div>
        `;

        return html;
    };

    /**
     * Build packet summary header
     */
    this.buildPacketSummary = function(message) {
        var type = message.getType();
        var srcIP = message.getOriginIP();
        var dstIP = message.getDestinationIP();
        var srcPort = message.getOrigPort();
        var dstPort = message.getDstPort();
        var data = message.getData();

        // Determine protocol name
        var protocolName = 'Unknown';
        var protocolColor = '#94a3b8';
        var isResponsePacket = data && data.isAPIResponse;

        if (type === 'icmp') {
            protocolName = 'ICMP';
            protocolColor = '#3b82f6';
        } else if (dstPort === 67 || dstPort === 68 || srcPort === 67 || srcPort === 68) {
            protocolName = 'DHCP';
            protocolColor = '#f59e0b';
        } else if (dstPort === 53 || srcPort === 53) {
            protocolName = 'DNS';
            protocolColor = '#8b5cf6';
        } else if (dstPort === 80 || srcPort === 80) {
            protocolName = isResponsePacket ? 'HTTP Response' : 'HTTP';
            protocolColor = '#10b981';
        } else if (dstPort === 443 || srcPort === 443) {
            protocolName = isResponsePacket ? 'HTTPS Response' : 'HTTPS';
            protocolColor = '#ef4444';
        } else if (dstPort === 25 || dstPort === 110 || dstPort === 143) {
            protocolName = 'Email';
            protocolColor = '#ec4899';
        } else if (type === 'tcp') {
            protocolName = 'TCP';
            protocolColor = '#6366f1';
        } else {
            protocolName = 'UDP';
            protocolColor = '#a855f7';
        }

        // Check for broadcast
        var dstMAC = message.getDestinationMAC();
        var isBroadcast = (dstMAC === 'ff:ff:ff:ff:ff:ff' || dstIP === '255.255.255.255');

        return `
            <div style="
                background: linear-gradient(135deg, rgba(147,51,234,0.2) 0%, rgba(147,51,234,0.05) 100%);
                padding: 12px;
                border-radius: 8px;
                border: 1px solid rgba(147,51,234,0.3);
                margin-bottom: 16px;
            ">
                <div style="
                    font-size: 13px;
                    font-weight: 600;
                    color: ${protocolColor};
                    margin-bottom: 8px;
                ">
                    📦 ${protocolName} Packet
                </div>
                <div style="
                    font-size: 11px;
                    color: #cbd5e1;
                    line-height: 1.6;
                    font-family: 'Consolas', monospace;
                ">
                    <div>${srcIP || '0.0.0.0'}:${srcPort || '?'} → ${dstIP || '255.255.255.255'}:${dstPort}</div>
                    ${isBroadcast ? '<div style="color: #f59e0b; margin-top: 4px;">🔊 BROADCAST - Sent to all devices on network</div>' : ''}
                </div>
            </div>
        `;
    };

    /**
     * Build actual packet journey from path history
     */
    this.buildActualJourney = function(message) {
        if (!message.hasPathHistory || !message.hasPathHistory()) {
            return '';
        }

        var history = message.getPathHistory();
        if (history.length === 0) {
            return '';
        }

        // Check if this packet has a related packet (request/response pair)
        var relatedPacketId = message.getRelatedPacketId ? message.getRelatedPacketId() : null;
        var relatedPacketHTML = '';

        if (relatedPacketId) {
            // Responses have isAPIResponse field, requests don't
            var isResponse = message.getData && message.getData().isAPIResponse ? true : false;
            var packetType = isResponse ? 'RESPONSE' : 'REQUEST';
            var relatedType = isResponse ? 'REQUEST' : 'RESPONSE';

            relatedPacketHTML = `
                <div style="
                    background: rgba(16,185,129,0.1);
                    padding: 8px 12px;
                    border-radius: 6px;
                    border-left: 3px solid #10b981;
                    margin-bottom: 12px;
                    font-size: 9px;
                    color: #cbd5e1;
                ">
                    <div style="color: #10b981; font-weight: 600; margin-bottom: 4px;">
                        🔄 Request/Response Pair Detected
                    </div>
                    <div>
                        This is the <strong style="color: #10b981;">${packetType}</strong> journey (Packet ID: ${message.getId()}).<br>
                        The corresponding <strong>${relatedType}</strong> (Packet ID: ${relatedPacketId}) has its own journey.<br>
                        <span style="color: #94a3b8; font-size: 8px;">💡 Click on the ${relatedType.toLowerCase()} packet in the network to see the return path</span>
                    </div>
                </div>
            `;
        }

        var html = relatedPacketHTML + `
            <div style="
                background: rgba(59,130,246,0.1);
                padding: 12px;
                border-radius: 8px;
                border-left: 3px solid #3b82f6;
                margin-top: 16px;
                margin-bottom: 16px;
            ">
                <div style="
                    font-size: 11px;
                    font-weight: 600;
                    color: #3b82f6;
                    margin-bottom: 12px;
                ">
                    🛤️ Packet Journey & Encapsulation (${history.length} hop${history.length > 1 ? 's' : ''})
                </div>
                <div style="font-size: 10px; color: #cbd5e1; line-height: 1.8;">
        `;

        history.forEach(function(hop, index) {
            var deviceColor = '#94a3b8';
            var deviceIcon = '📦';

            // Determine transport protocol (used throughout all hop types)
            var msgType = message.getType();
            var transportProto = msgType === 'tcp' ? 'TCP' : (msgType === 'icmp' ? 'ICMP' : 'UDP');

            // Set colors and icons based on device type
            if (hop.deviceType === 'source') {
                deviceColor = '#10b981';
                deviceIcon = '📤';
            } else if (hop.deviceType === 'switch') {
                deviceColor = '#f59e0b';
                deviceIcon = '🔀';
            } else if (hop.deviceType === 'router') {
                deviceColor = '#ef4444';
                deviceIcon = '🌐';
            } else if (hop.deviceType === 'firewall') {
                deviceColor = '#ec4899';
                deviceIcon = '🔥';
            } else if (hop.deviceType === 'destination') {
                deviceColor = '#3b82f6';
                deviceIcon = '📥';
            }

            html += `
                <div class="hop-step" style="margin-bottom: 16px; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                    <div style="color: ${deviceColor}; font-weight: 600; margin-bottom: 8px; font-size: 11px;">
                        ${deviceIcon} ${index + 1}. ${hop.deviceName} <span style="color: #64748b;">(${hop.deviceType})</span>
                    </div>
            `;

            // SOURCE: Show full encapsulation process (adding headers)
            if (hop.deviceType === 'source' || index === 0) {
                // Determine protocol based on port and type
                var dstPort = message.getDstPort();
                var srcPort = message.getOrigPort();
                var protocol = 'Unknown';
                var appData = message.getData();
                var isResponsePacket = appData && appData.isAPIResponse;

                if (dstPort === 67 || dstPort === 68 || srcPort === 67 || srcPort === 68) {
                    protocol = 'DHCP ' + (dstPort === 67 ? 'Discover/Request' : 'Offer/ACK');
                } else if (dstPort === 53 || srcPort === 53) {
                    protocol = 'DNS Query';
                } else if (dstPort === 80 || srcPort === 80) {
                    protocol = isResponsePacket ? 'HTTP Response' : ('HTTP Request to ' + (appData.host || appData.domain || 'server'));
                } else if (dstPort === 443 || srcPort === 443) {
                    protocol = isResponsePacket ? 'HTTPS Response' : ('HTTPS Request to ' + (appData.host || appData.domain || 'server'));
                } else if (msgType === 'icmp') {
                    protocol = 'ICMP ' + (appData.command || 'Echo Request');
                } else {
                    protocol = 'Application Data (Port ' + dstPort + ')';
                }

                html += `
                    <div style="margin-left: 12px; font-size: 9px;">
                        <div style="color: #3b82f6; font-weight: 600; margin-bottom: 6px;">📤 Encapsulation Process (Going Down the Stack)</div>

                        <div style="margin-bottom: 6px; padding: 6px; background: rgba(147,51,234,0.1); border-left: 2px solid #9333ea; border-radius: 3px;">
                            <div style="color: #9333ea; font-weight: 600;">Layer 7: Application</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 2px;">
                                📄 Data: ${protocol}<br>
                                <span style="color: #64748b;">Raw application data ready to send</span>
                            </div>
                        </div>

                        <div style="text-align: center; color: #64748b; margin: 4px 0;">⬇️ Add Transport Header</div>

                        <div style="margin-bottom: 6px; padding: 6px; background: rgba(236,72,153,0.1); border-left: 2px solid #ec4899; border-radius: 3px;">
                            <div style="color: #ec4899; font-weight: 600;">Layer 4: Transport</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 2px; font-family: monospace;">
                                [${transportProto} Header: ${hop.state.srcPort} → ${hop.state.dstPort}]<br>
                                <span style="color: #64748b;">+ Application Data</span>
                            </div>
                        </div>

                        <div style="text-align: center; color: #64748b; margin: 4px 0;">⬇️ Add Network Header</div>

                        <div style="margin-bottom: 6px; padding: 6px; background: rgba(245,158,11,0.1); border-left: 2px solid #f59e0b; border-radius: 3px;">
                            <div style="color: #f59e0b; font-weight: 600;">Layer 3: Network</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 2px; font-family: monospace;">
                                [IP Header: ${hop.state.srcIP || '0.0.0.0'} → ${hop.state.dstIP}]<br>
                                <span style="color: #64748b;">+ ${transportProto} Header + Application Data</span>
                            </div>
                        </div>

                        <div style="text-align: center; color: #64748b; margin: 4px 0;">⬇️ Add Data Link Header</div>

                        <div style="margin-bottom: 6px; padding: 6px; background: rgba(16,185,129,0.1); border-left: 2px solid #10b981; border-radius: 3px;">
                            <div style="color: #10b981; font-weight: 600;">Layer 2: Data Link</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 2px; font-family: monospace;">
                                [Ethernet: ${hop.state.srcMAC.substring(0,17)} → ${hop.state.dstMAC.substring(0,17)}]<br>
                                <span style="color: #64748b;">+ IP Header + ${transportProto} Header + Data</span>
                            </div>
                        </div>

                        <div style="text-align: center; color: #64748b; margin: 4px 0;">⬇️ Transmit as Bits</div>

                        <div style="padding: 6px; background: rgba(99,102,241,0.1); border-left: 2px solid #6366f1; border-radius: 3px;">
                            <div style="color: #6366f1; font-weight: 600;">Layer 1: Physical</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 2px;">
                                ⚡ Electrical signals on wire<br>
                                <span style="color: #64748b; font-family: monospace;">Frame + IP + ${transportProto} + Data → 010110...</span>
                            </div>
                        </div>

                        <div style="margin-top: 8px; padding: 6px; background: rgba(59,130,246,0.1); border-radius: 4px; color: #3b82f6; font-size: 8px;">
                            ✅ Packet fully encapsulated and sent onto network
                        </div>
                    </div>
                `;
            }
            // SWITCH: Forward without changes (check deviceType first, ignore spurious MAC changes)
            else if (hop.deviceType === 'switch') {
                // Check for VLAN information (Phase 2)
                var vlanId = message.getVlanId ? message.getVlanId() : null;
                var is802_1Q = message.is802_1Q ? message.is802_1Q() : false;
                var vlanInfo = '';

                if (is802_1Q && vlanId !== null) {
                    vlanInfo = ' <span style="color: #3b82f6;">[802.1Q: VLAN ' + vlanId + ']</span>';
                } else if (vlanId !== null) {
                    vlanInfo = ' <span style="color: #94a3b8;">[Untagged VLAN ' + vlanId + ']</span>';
                }

                html += `
                    <div style="margin-left: 12px; font-size: 9px;">
                        <div style="color: #f59e0b; font-weight: 600; margin-bottom: 6px;">🔀 Layer 2 Switching</div>

                        <div style="padding: 6px; background: rgba(16,185,129,0.1); border-left: 2px solid #10b981; border-radius: 3px;">
                            <div style="color: #10b981; font-weight: 600;">Reads Layer 2 Header Only</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 4px; font-family: monospace; font-size: 8px;">
                                [Eth: ${hop.state.srcMAC.substring(0,17)} → ${hop.state.dstMAC.substring(0,17)}]${vlanInfo}
                            </div>
                            <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(16,185,129,0.2); color: #94a3b8; font-size: 8px;">
                                ✓ Destination MAC found in table<br>
                                ${vlanId !== null ? '✓ VLAN membership verified<br>' : ''}
                                ✓ Forward out correct port<br>
                                ✓ ALL layers unchanged - packet passed through as-is
                            </div>
                        </div>
                    </div>
                `;
            }
            // ROUTER: De-encapsulate Layer 2, route, re-encapsulate Layer 2
            else if (hop.deviceType === 'router' || hop.macChanges) {
                // Check if PAT (Port Address Translation) occurred at this hop
                var patHTML = '';
                if (hop.patTranslation && hop.patTranslation.isPAT) {
                    var pat = hop.patTranslation;
                    if (pat.direction === 'outbound') {
                        // Outbound PAT - translating source IP:port for internet access
                        patHTML = `
                            <div style="padding: 8px; background: linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.05) 100%); border: 1px solid #a855f7; border-radius: 6px; margin-bottom: 8px;">
                                <div style="color: #a855f7; font-weight: 600; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                    <span style="font-size: 14px;">🔄</span>
                                    <span>PAT Translation (Port Address Translation)</span>
                                </div>
                                <div style="margin-left: 8px; color: #cbd5e1; font-size: 9px; line-height: 1.8;">
                                    <div style="margin-bottom: 4px;">
                                        <span style="color: #94a3b8;">Before:</span>
                                        <span style="color: #ef4444; font-family: monospace;">${pat.originalIP}:${pat.originalPort}</span>
                                        <span style="color: #64748b;">(private LAN address)</span>
                                    </div>
                                    <div style="text-align: center; color: #a855f7; margin: 4px 0;">⬇️ NAT Translation ⬇️</div>
                                    <div>
                                        <span style="color: #94a3b8;">After:</span>
                                        <span style="color: #10b981; font-family: monospace;">${pat.translatedIP}:${pat.translatedPort}</span>
                                        <span style="color: #64748b;">(public WAN address)</span>
                                    </div>
                                </div>
                                <div style="margin-top: 8px; padding: 6px; background: rgba(168,85,247,0.1); border-radius: 4px;">
                                    <div style="color: #a855f7; font-size: 8px; font-weight: 600; margin-bottom: 4px;">💡 How PAT Works:</div>
                                    <div style="color: #94a3b8; font-size: 8px; line-height: 1.6;">
                                        • Router assigns ephemeral port <strong style="color: #10b981;">${pat.translatedPort}</strong> (range: 49152-65535)<br>
                                        • Maps internal ${pat.originalIP}:${pat.originalPort} ↔ external ${pat.translatedIP}:${pat.translatedPort}<br>
                                        • Multiple internal devices can share ONE public IP!<br>
                                        • Router remembers mapping to route responses back correctly
                                    </div>
                                </div>
                            </div>
                        `;
                    } else if (pat.direction === 'inbound') {
                        // Inbound PAT - translating destination back to internal host
                        patHTML = `
                            <div style="padding: 8px; background: linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%); border: 1px solid #10b981; border-radius: 6px; margin-bottom: 8px;">
                                <div style="color: #10b981; font-weight: 600; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                    <span style="font-size: 14px;">🔄</span>
                                    <span>Reverse PAT (Response Translation)</span>
                                </div>
                                <div style="margin-left: 8px; color: #cbd5e1; font-size: 9px; line-height: 1.8;">
                                    <div style="margin-bottom: 4px;">
                                        <span style="color: #94a3b8;">Destination before:</span>
                                        <span style="color: #ef4444; font-family: monospace;">${pat.publicIP}:${pat.publicPort}</span>
                                        <span style="color: #64748b;">(router's public address)</span>
                                    </div>
                                    <div style="text-align: center; color: #10b981; margin: 4px 0;">⬇️ Reverse NAT ⬇️</div>
                                    <div>
                                        <span style="color: #94a3b8;">Destination after:</span>
                                        <span style="color: #10b981; font-family: monospace;">${pat.internalIP}:${pat.internalPort}</span>
                                        <span style="color: #64748b;">(original internal host)</span>
                                    </div>
                                </div>
                                <div style="margin-top: 8px; padding: 6px; background: rgba(16,185,129,0.1); border-radius: 4px;">
                                    <div style="color: #10b981; font-size: 8px; font-weight: 600; margin-bottom: 4px;">💡 How Reverse PAT Works:</div>
                                    <div style="color: #94a3b8; font-size: 8px; line-height: 1.6;">
                                        • Response arrives at router's public IP on port <strong style="color: #ef4444;">${pat.publicPort}</strong><br>
                                        • Router looks up NAT table: port ${pat.publicPort} → ${pat.internalIP}:${pat.internalPort}<br>
                                        • Translates destination back to original internal host<br>
                                        • Response delivered to correct device on private network!
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                }

                html += `
                    <div style="margin-left: 12px; font-size: 9px;">
                        <div style="color: #f59e0b; font-weight: 600; margin-bottom: 6px;">🌐 Layer 3 Routing (De-encap & Re-encap)</div>

                        ${patHTML}

                        <div style="padding: 6px; background: rgba(239,68,68,0.1); border-left: 2px solid #ef4444; border-radius: 3px; margin-bottom: 6px;">
                            <div style="color: #ef4444; font-weight: 600;">Step 1: Strip Layer 2</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 4px; font-family: monospace; font-size: 8px;">
                                <span style="text-decoration: line-through; color: #ef4444;">[OLD Eth: ${hop.macChanges && hop.macChanges.oldSrcMAC ? hop.macChanges.oldSrcMAC.substring(0,17) : 'unknown'} → ${hop.macChanges && hop.macChanges.oldDstMAC ? hop.macChanges.oldDstMAC.substring(0,17) : 'unknown'}]</span><br>
                                <span style="color: #10b981;">[IP: ${hop.state.srcIP || '0.0.0.0'} → ${hop.state.dstIP}] + ${transportProto} + Data</span>
                            </div>
                            <div style="margin-top: 4px; color: #94a3b8; font-size: 8px;">
                                🗑️ Old Ethernet frame discarded
                            </div>
                        </div>

                        <div style="padding: 6px; background: rgba(245,158,11,0.1); border-left: 2px solid #f59e0b; border-radius: 3px; margin-bottom: 6px;">
                            <div style="color: #f59e0b; font-weight: 600;">Step 2: Read Layer 3, Make Routing Decision</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 4px;">
                                🔍 Check routing table for ${hop.state.dstIP}<br>
                                <span style="color: #94a3b8; font-size: 8px;">→ Next hop determined</span>
                            </div>
                        </div>

                        <div style="padding: 6px; background: rgba(16,185,129,0.1); border-left: 2px solid #10b981; border-radius: 3px;">
                            <div style="color: #10b981; font-weight: 600;">Step 3: Add NEW Layer 2</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 4px; font-family: monospace; font-size: 8px;">
                                <span style="color: #10b981;">[NEW Eth: ${hop.macChanges && hop.macChanges.newSrcMAC ? hop.macChanges.newSrcMAC.substring(0,17) : 'router-mac'} → ${hop.macChanges && hop.macChanges.newDstMAC ? hop.macChanges.newDstMAC.substring(0,17) : 'next-hop'}]</span><br>
                                + [IP: ${hop.state.srcIP || '0.0.0.0'} → ${hop.state.dstIP}] + ${transportProto} + Data
                            </div>
                            <div style="margin-top: 4px; color: #94a3b8; font-size: 8px;">
                                ✅ New frame for next network segment
                            </div>
                        </div>

                        <div style="margin-top: 6px; padding: 6px; background: rgba(59,130,246,0.1); border-radius: 4px; color: #3b82f6; font-size: 8px;">
                            💡 ${hop.patTranslation && hop.patTranslation.isPAT ? 'NAT/PAT also translated IP:port (see above). ' : ''}Layer 3-7 ${hop.patTranslation && hop.patTranslation.isPAT ? 'modified by NAT' : 'completely untouched'}! Only Layer 2 changed.
                        </div>
                    </div>
                `;
            }
            // DESTINATION: De-encapsulate everything (only for explicitly marked destination)
            else if (hop.deviceType === 'destination') {
                // Determine what type of packet is being delivered
                var dstPort = message.getDstPort();
                var srcPort = message.getOrigPort();
                var msgType = message.getType();
                var appData = message.getData();
                var isResponsePacket = appData && appData.isAPIResponse;
                var deliveryMsg = 'Application processes data';
                var transportType = msgType === 'tcp' ? 'TCP' : (msgType === 'icmp' ? 'ICMP' : 'UDP');

                if (dstPort === 67 || dstPort === 68 || srcPort === 67 || srcPort === 68) {
                    deliveryMsg = 'DHCP ' + (dstPort === 67 ? 'server receives request' : 'client receives offer/ACK');
                } else if (dstPort === 53 || srcPort === 53) {
                    deliveryMsg = 'DNS server resolves query';
                } else if (dstPort === 80 || srcPort === 80) {
                    deliveryMsg = isResponsePacket ? 'HTTP client receives response' : 'HTTP server processes request';
                } else if (dstPort === 443 || srcPort === 443) {
                    deliveryMsg = isResponsePacket ? 'HTTPS client receives response' : 'HTTPS server processes request';
                } else if (msgType === 'icmp') {
                    deliveryMsg = 'ICMP message processed';
                }

                html += `
                    <div style="margin-left: 12px; font-size: 9px;">
                        <div style="color: #3b82f6; font-weight: 600; margin-bottom: 6px;">📥 De-encapsulation Process (Going Up the Stack)</div>

                        <div style="padding: 6px; background: rgba(99,102,241,0.1); border-left: 2px solid #6366f1; border-radius: 3px; margin-bottom: 4px;">
                            <div style="color: #6366f1; font-weight: 600;">Layer 1: Physical</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 2px;">
                                ⚡ Receive electrical signals<br>
                                <span style="color: #64748b; font-size: 8px;">Convert bits back to frame</span>
                            </div>
                        </div>

                        <div style="text-align: center; color: #64748b; margin: 4px 0;">⬆️ Strip & Check Layer 2</div>

                        <div style="padding: 6px; background: rgba(16,185,129,0.1); border-left: 2px solid #10b981; border-radius: 3px; margin-bottom: 4px;">
                            <div style="color: #10b981; font-weight: 600;">Layer 2: Data Link</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 2px; font-family: monospace; font-size: 8px;">
                                <span style="text-decoration: line-through;">[Eth: ... → ${hop.state.dstMAC.substring(0,17)}]</span><br>
                                <span style="color: #94a3b8;">✓ MAC matches! Strip header, pass up</span>
                            </div>
                        </div>

                        <div style="text-align: center; color: #64748b; margin: 4px 0;">⬆️ Strip & Check Layer 3</div>

                        <div style="padding: 6px; background: rgba(245,158,11,0.1); border-left: 2px solid #f59e0b; border-radius: 3px; margin-bottom: 4px;">
                            <div style="color: #f59e0b; font-weight: 600;">Layer 3: Network</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 2px; font-family: monospace; font-size: 8px;">
                                <span style="text-decoration: line-through;">[IP: ... → ${hop.state.dstIP}]</span><br>
                                <span style="color: #94a3b8;">✓ IP matches! Strip header, pass up</span>
                            </div>
                        </div>

                        <div style="text-align: center; color: #64748b; margin: 4px 0;">⬆️ Strip & Check Layer 4</div>

                        <div style="padding: 6px; background: rgba(236,72,153,0.1); border-left: 2px solid #ec4899; border-radius: 3px; margin-bottom: 4px;">
                            <div style="color: #ec4899; font-weight: 600;">Layer 4: Transport</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 2px; font-family: monospace; font-size: 8px;">
                                <span style="text-decoration: line-through;">[${transportType}: ... → Port ${hop.state.dstPort}]</span><br>
                                <span style="color: #94a3b8;">✓ Port ${hop.state.dstPort} open! Strip header, pass up</span>
                            </div>
                        </div>

                        <div style="text-align: center; color: #64748b; margin: 4px 0;">⬆️ Deliver to Application</div>

                        <div style="padding: 6px; background: rgba(147,51,234,0.1); border-left: 2px solid #9333ea; border-radius: 3px;">
                            <div style="color: #9333ea; font-weight: 600;">Layer 7: Application</div>
                            <div style="color: #cbd5e1; margin-left: 8px; margin-top: 2px;">
                                📄 Pure application data delivered!<br>
                                <span style="color: #64748b; font-size: 8px;">${deliveryMsg}</span>
                            </div>
                        </div>

                        <div style="margin-top: 8px; padding: 6px; background: rgba(59,130,246,0.1); border-radius: 4px; color: #3b82f6; font-size: 8px;">
                            ✅ All headers stripped, data delivered to application
                        </div>
                    </div>
                `;
            }

            html += `</div>`;

            // Add arrow between hops (except for last one)
            if (index < history.length - 1) {
                html += '<div style="text-align: center; color: #64748b; margin: 4px 0;">⬇️</div>';
            }
        });

        html += `
                </div>
            </div>
        `;

        return html;
    };

    /**
     * Build educational notes about how layers change in networks
     */
    this.buildEducationalNotes = function(message) {
        var type = message.getType();
        var dstPort = message.getDstPort();

        // Different notes based on packet type
        var notes = [];

        // Check if this packet has VLAN information (Phase 2)
        var vlanId = message.getVlanId ? message.getVlanId() : null;
        var is802_1Q = message.is802_1Q ? message.is802_1Q() : false;

        // VLAN-specific notes (Phase 2)
        if (vlanId !== null || is802_1Q) {
            notes.push(`
                <strong style="color: #3b82f6;">🏷️ VLANs (Virtual LANs)</strong><br>
                • VLANs segment networks at Layer 2 (switches)<br>
                • Each VLAN is a separate broadcast domain<br>
                • Devices in VLAN ${vlanId || 'X'} can only talk to other devices in VLAN ${vlanId || 'X'}<br>
                ${is802_1Q ? '• This packet is <strong>802.1Q tagged</strong> (traveling on trunk port)<br>' : ''}
                ${!is802_1Q && vlanId !== null ? '• This packet is <strong>untagged</strong> (on access port or native VLAN)<br>' : ''}
                • To communicate between VLANs, you need a router!
            `);
        }

        // General switching/routing notes
        notes.push(`
            <strong style="color: #10b981;">🔀 Layer 2: Switches</strong><br>
            • Switches forward based on MAC address (Layer 2)<br>
            • They DO NOT modify the packet contents<br>
            • MAC addresses stay the same through a switch${vlanId !== null ? '<br>• Switches enforce VLAN isolation' : ''}
        `);

        notes.push(`
            <strong style="color: #f59e0b;">🌐 Layer 3: Routers</strong><br>
            • Routers route based on IP address (Layer 3)<br>
            • They strip the old Ethernet frame and create a new one<br>
            • MAC addresses CHANGE, but IP addresses stay the same<br>
            • This is called "de-encapsulation and re-encapsulation"
        `);

        // Check if this packet went through PAT
        var wentThroughPAT = false;
        if (message.hasPathHistory && message.hasPathHistory()) {
            var history = message.getPathHistory();
            for (var h = 0; h < history.length; h++) {
                if (history[h].patTranslation && history[h].patTranslation.isPAT) {
                    wentThroughPAT = true;
                    break;
                }
            }
        }

        if (wentThroughPAT) {
            notes.push(`
                <strong style="color: #a855f7;">🔄 PAT (Port Address Translation)</strong><br>
                • PAT lets multiple devices share ONE public IP address<br>
                • Each connection gets a unique ephemeral port (49152-65535)<br>
                • Router maintains a translation table to track connections<br>
                • Without PAT, you'd need a public IP for every device!<br>
                • Also called "NAT Overload" - the most common type of NAT
            `);
        }

        // Protocol-specific notes
        if (dstPort === 67 || dstPort === 68) {
            notes.push(`
                <strong style="color: #f59e0b;">💡 DHCP Broadcast Behavior</strong><br>
                • DHCP requests are broadcast (sent to all devices)<br>
                • Switches flood broadcasts out all ports<br>
                • Routers typically DON'T forward broadcasts<br>
                • That's why DHCP usually works only on your local network
            `);
        }

        if (dstPort === 80 || dstPort === 443) {
            notes.push(`
                <strong style="color: #3b82f6;">🌍 HTTP/HTTPS Routing</strong><br>
                • These packets often cross multiple routers<br>
                • Each router changes Layer 2 (MAC addresses)<br>
                • But Layers 3-7 (IP, TCP, HTTP) stay intact!<br>
                • This is the beauty of layer encapsulation
            `);
        }

        return `
            <div style="
                background: rgba(16,185,129,0.1);
                padding: 12px;
                border-radius: 8px;
                border-left: 3px solid #10b981;
                margin-top: 16px;
            ">
                <div style="
                    font-size: 11px;
                    font-weight: 600;
                    color: #10b981;
                    margin-bottom: 8px;
                ">
                    📚 How Packets Travel Through Networks
                </div>
                <div style="
                    font-size: 10px;
                    color: #cbd5e1;
                    line-height: 1.7;
                ">
                    ${notes.join('<br><br>')}
                </div>
            </div>
        `;
    };

    /**
     * OLD TIMELINE VIEW - REMOVED FOR BEING MISLEADING
     */
    this.buildTimelineView_DEPRECATED = function(message) {
        var type = message.getType();
        var srcIP = message.getOriginIP();
        var dstIP = message.getDestinationIP();
        var srcMAC = message.getOriginMAC();
        var dstMAC = message.getDestinationMAC();
        var srcPort = message.getOrigPort();
        var dstPort = message.getDstPort();
        var data = message.getData();

        // Determine protocol name and highlight
        var protocolName = 'Unknown';
        var protocolHighlight = '';

        if (type === 'icmp') {
            protocolName = 'ICMP';
            protocolHighlight = data.command || 'Echo Request';
        } else if (dstPort === 67 || dstPort === 68) {
            protocolName = 'DHCP Request';
            protocolHighlight = 'Requesting IP configuration';
        } else if (dstPort === 53) {
            protocolName = 'DNS Query';
            protocolHighlight = data.domain || 'Domain lookup';
        } else if (dstPort === 80) {
            protocolName = 'HTTP Request';
            protocolHighlight = data.url || '/';
        } else if (dstPort === 443) {
            protocolName = 'HTTPS Request';
            protocolHighlight = data.host || 'Encrypted connection';
        } else if (dstPort === 25 || dstPort === 110) {
            protocolName = 'Email';
            protocolHighlight = 'SMTP/POP3';
        } else if (type === 'tcp') {
            protocolName = 'TCP';
            protocolHighlight = 'Port ' + dstPort;
        } else {
            protocolName = 'UDP';
            protocolHighlight = 'Port ' + dstPort;
        }

        // Format protocol-specific info
        var protocolInfo = '';
        if (dstPort === 67 || dstPort === 68) {
            // DHCP
            if (!srcIP || srcIP === 'null' || srcIP === '0.0.0.0') {
                protocolInfo = '<span style="color: #f59e0b;">⚠️ No IP assigned yet - requesting via DHCP</span>';
            }
        } else if (dstPort === 53 && data.domain) {
            protocolInfo = 'Querying: <span style="color: #3b82f6;">' + data.domain + '</span>';
        } else if (dstPort === 80 && data.url) {
            protocolInfo = 'GET <span style="color: #3b82f6;">' + data.url + '</span>';
        }

        // Detect broadcast
        var isBroadcast = (dstMAC === 'ff:ff:ff:ff:ff:ff' || dstIP === '255.255.255.255');
        var broadcastNote = isBroadcast ? '<span style="color: #ec4899;">🔊 BROADCAST - Sent to all devices</span>' : '';

        var html = `
            <div style="color: #cbd5e1; line-height: 1.6;">
                <h3 style="color: #9333ea; margin: 0 0 8px 0; font-size: 14px;">
                    🔄 Packet Journey: <span style="color: #3b82f6;">${protocolName}</span>
                </h3>
                ${protocolHighlight ? '<div style="font-size: 11px; color: #94a3b8; margin-bottom: 12px;">' + protocolHighlight + '</div>' : ''}
                ${protocolInfo ? '<div style="font-size: 11px; color: #cbd5e1; margin-bottom: 12px;">' + protocolInfo + '</div>' : ''}
                ${broadcastNote ? '<div style="margin-bottom: 12px; font-size: 11px;">' + broadcastNote + '</div>' : ''}

                <!-- STEP 1: AT SOURCE -->
                <div style="background: rgba(59, 130, 246, 0.1); padding: 8px 10px; border-radius: 6px; border-left: 3px solid #3b82f6; margin-bottom: 8px;">
                    <strong style="color: #3b82f6; font-size: 11px;">📤 STEP 1: At Source</strong>
                </div>

                <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 6px; margin-bottom: 10px; font-size: 10px; font-family: 'Consolas', monospace;">
                    <div style="color: #94a3b8; margin-bottom: 4px;"><strong>Packet State:</strong></div>
                    <div style="margin-left: 8px; line-height: 1.5;">
                        <div style="color: #ec4899;">Layer 4:</div>
                        <div style="margin-left: 12px; color: #cbd5e1; margin-bottom: 4px;">
                            ${type.toUpperCase()} ${srcPort || '?'} → ${dstPort}
                        </div>

                        <div style="color: #f59e0b;">Layer 3:</div>
                        <div style="margin-left: 12px; color: #cbd5e1; margin-bottom: 4px;">
                            IP ${srcIP || '0.0.0.0'} → ${dstIP || '255.255.255.255'}
                        </div>

                        <div style="color: #10b981;">Layer 2:</div>
                        <div style="margin-left: 12px; color: #cbd5e1;">
                            MAC ${srcMAC || 'unknown'} → ${dstMAC === 'ff:ff:ff:ff:ff:ff' ? '<span style="color: #ec4899;">ff:ff:ff:ff:ff:ff</span>' : dstMAC}
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 12px 0; color: #64748b; font-size: 18px;">⬇️</div>

                <!-- STEP 2: THROUGH SWITCH -->
                <div style="background: rgba(255, 159, 64, 0.1); padding: 8px 10px; border-radius: 6px; border-left: 3px solid #ff9f40; margin-bottom: 8px;">
                    <strong style="color: #ff9f40; font-size: 11px;">🔀 STEP 2: Through Switch</strong>
                </div>

                <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 6px; margin-bottom: 10px; font-size: 10px;">
                    <div style="color: #94a3b8; margin-bottom: 4px;"><strong>What Changes:</strong></div>
                    <div style="margin-left: 8px; line-height: 1.5;">
                        <div style="color: #10b981; margin-bottom: 2px;">✓ Layer 4: <span style="color: #94a3b8;">UNCHANGED</span></div>
                        <div style="color: #10b981; margin-bottom: 2px;">✓ Layer 3: <span style="color: #94a3b8;">UNCHANGED</span></div>
                        <div style="color: #10b981;">✓ Layer 2: <span style="color: #94a3b8;">UNCHANGED</span></div>
                    </div>
                    <div style="margin-top: 6px; padding: 6px; background: rgba(255,159,64,0.1); border-radius: 4px; color: #cbd5e1; font-size: 9px;">
                        ℹ️ Switch forwards based on MAC address - doesn't modify packet
                    </div>
                </div>

                <div style="text-align: center; margin: 12px 0; color: #64748b; font-size: 18px;">⬇️</div>

                <!-- STEP 3: THROUGH ROUTER -->
                <div style="background: rgba(251, 146, 60, 0.1); padding: 8px 10px; border-radius: 6px; border-left: 3px solid #fb923c; margin-bottom: 8px;">
                    <strong style="color: #fb923c; font-size: 11px;">🌐 STEP 3: Through Router</strong>
                </div>

                <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 6px; margin-bottom: 10px; font-size: 10px;">
                    <div style="color: #94a3b8; margin-bottom: 4px;"><strong>What Changes:</strong></div>
                    <div style="margin-left: 8px; line-height: 1.5; font-family: 'Consolas', monospace;">
                        <div style="color: #ef4444; margin-bottom: 3px;">❌ Layer 2: <span style="color: #94a3b8;">CHANGED</span></div>
                        <div style="margin-left: 16px; margin-bottom: 4px; color: #cbd5e1; font-size: 9px;">
                            OLD: ${srcMAC} → ${dstMAC}<br>
                            NEW: [router MAC] → [next-hop MAC]<br>
                            <span style="color: #64748b;">Why: Router strips old frame, adds new one for next link</span>
                        </div>

                        <div style="color: #10b981; margin-bottom: 3px;">✓ Layer 3: <span style="color: #94a3b8;">UNCHANGED (IP stays same!)</span></div>
                        <div style="margin-left: 16px; margin-bottom: 4px; color: #cbd5e1; font-size: 9px;">
                            IP: ${srcIP} → ${dstIP}
                        </div>

                        <div style="color: #10b981;">✓ Layer 4: <span style="color: #94a3b8;">UNCHANGED</span></div>
                        <div style="margin-left: 16px; color: #cbd5e1; font-size: 9px;">
                            Port: ${srcPort} → ${dstPort}
                        </div>
                    </div>
                    <div style="margin-top: 6px; padding: 6px; background: rgba(251,146,60,0.1); border-radius: 4px; color: #cbd5e1; font-size: 9px;">
                        ℹ️ Router changes Layer 2, keeps Layers 3-7 intact
                    </div>
                </div>

                <div style="text-align: center; margin: 12px 0; color: #64748b; font-size: 18px;">⬇️</div>

                <!-- STEP 4: AT DESTINATION -->
                <div style="background: rgba(59, 130, 246, 0.1); padding: 8px 10px; border-radius: 6px; border-left: 3px solid #3b82f6; margin-bottom: 8px;">
                    <strong style="color: #3b82f6; font-size: 11px;">📥 STEP 4: At Destination</strong>
                </div>

                <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 6px; margin-bottom: 10px; font-size: 10px;">
                    <div style="color: #94a3b8; margin-bottom: 4px;"><strong>Headers Stripped:</strong></div>
                    <div style="margin-left: 8px; line-height: 1.6; color: #cbd5e1;">
                        <div style="margin-bottom: 2px;"><span style="color: #10b981;">Layer 2:</span> Check MAC (${dstMAC}) ✓ Strip frame</div>
                        <div style="margin-bottom: 2px;"><span style="color: #f59e0b;">Layer 3:</span> Check IP (${dstIP}) ✓ Strip IP header</div>
                        <div style="margin-bottom: 2px;"><span style="color: #ec4899;">Layer 4:</span> Deliver to port ${dstPort} ✓ Strip ${type.toUpperCase()} header</div>
                        <div style="color: #3b82f6;">✓ Application receives pure data!</div>
                    </div>
                </div>

                <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 6px; border-left: 3px solid #10b981; margin-top: 16px;">
                    <strong style="color: #10b981; font-size: 11px;">📌 KEY INSIGHTS</strong>
                    <div style="margin-top: 6px; font-size: 10px; line-height: 1.6; color: #cbd5e1;">
                        • <strong>Switches:</strong> Forward based on Layer 2 (MAC), don't modify packet<br>
                        • <strong>Routers:</strong> Route based on Layer 3 (IP), change Layer 2 (new MACs)<br>
                        • <strong>End-to-End:</strong> IP addresses & ports stay the same source to destination!
                    </div>
                </div>
            </div>
        `;

        return html;
    };

    /**
     * Build OSI 7-layer model view
     */
    this.buildOSILayers = function(message) {
        var layers = [];

        // Layer 7 - Application
        layers.push(this.buildLayer(
            7,
            'Application',
            '🌐',
            '#3b82f6',
            this.getApplicationLayerContent(message)
        ));

        // Layer 6 - Presentation
        layers.push(this.buildLayer(
            6,
            'Presentation',
            '🎨',
            '#8b5cf6',
            this.getPresentationLayerContent(message)
        ));

        // Layer 5 - Session
        layers.push(this.buildLayer(
            5,
            'Session',
            '💬',
            '#a855f7',
            this.getSessionLayerContent(message)
        ));

        // Layer 4 - Transport
        layers.push(this.buildLayer(
            4,
            'Transport',
            '🚚',
            '#ec4899',
            this.getTransportLayerContent(message)
        ));

        // Layer 3 - Network
        layers.push(this.buildLayer(
            3,
            'Network',
            '📍',
            '#f59e0b',
            this.getNetworkLayerContent(message)
        ));

        // Layer 2 - Data Link
        layers.push(this.buildLayer(
            2,
            'Data Link',
            '🔗',
            '#10b981',
            this.getDataLinkLayerContent(message)
        ));

        // Layer 1 - Physical
        layers.push(this.buildLayer(
            1,
            'Physical',
            '⚡',
            '#6366f1',
            this.getPhysicalLayerContent(message)
        ));

        return layers;
    };

    /**
     * Build TCP/IP 4-layer model view
     */
    this.buildTCPIPLayers = function(message) {
        var layers = [];

        // Application Layer (OSI 5-7 combined)
        layers.push(this.buildLayer(
            'App',
            'Application',
            '🌐',
            '#3b82f6',
            this.getCombinedApplicationLayerContent(message),
            'OSI Layers 5-7 Combined'
        ));

        // Transport Layer (OSI 4)
        layers.push(this.buildLayer(
            'Trans',
            'Transport',
            '🚚',
            '#ec4899',
            this.getTransportLayerContent(message),
            'Maps to OSI Layer 4'
        ));

        // Internet Layer (OSI 3)
        layers.push(this.buildLayer(
            'Net',
            'Internet',
            '📍',
            '#f59e0b',
            this.getNetworkLayerContent(message),
            'Maps to OSI Layer 3'
        ));

        // Network Access Layer (OSI 1-2 combined)
        layers.push(this.buildLayer(
            'Access',
            'Network Access',
            '🔗',
            '#10b981',
            this.getCombinedNetworkAccessLayerContent(message),
            'OSI Layers 1-2 Combined'
        ));

        return layers;
    };

    /**
     * Build a single layer section
     */
    this.buildLayer = function(number, name, icon, color, content, mappingNote) {
        var layerId = 'layer-' + number;
        var mapping = mappingNote ? `
            <div style="
                margin-top: 8px;
                padding: 6px 8px;
                background: rgba(147, 51, 234, 0.1);
                border-left: 2px solid ${color};
                font-size: 10px;
                color: #94a3b8;
                border-radius: 4px;
            ">
                ℹ️ ${mappingNote}
            </div>
        ` : '';

        // Determine label based on whether it's OSI (numeric) or TCP/IP (text)
        var layerLabel = typeof number === 'number' ?
            'Layer ' + number + ' - ' + name :  // OSI: "Layer 7 - Application"
            name;  // TCP/IP: "Application" (no "Layer" prefix)

        return `
            <div class="layer-section" data-layer="${number}" style="
                margin-bottom: 12px;
                border-radius: 8px;
                background: rgba(0,0,0,0.2);
                border: 1px solid rgba(147,51,234,0.2);
                overflow: hidden;
                transition: all 0.2s;
            " onmouseenter="this.style.borderColor='${color}'"
               onmouseleave="this.style.borderColor='rgba(147,51,234,0.2)'">
                <div style="
                    padding: 10px 12px;
                    background: linear-gradient(135deg, ${color}22 0%, ${color}11 100%);
                    border-bottom: 1px solid ${color}33;
                    font-weight: 600;
                    font-size: 12px;
                    color: ${color};
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                " onclick="packetInspector.copyLayerContent('${layerId}')">
                    <span style="font-size: 16px;">${icon}</span>
                    <span>${layerLabel}</span>
                </div>
                <div id="${layerId}" style="
                    padding: 12px;
                    font-size: 11px;
                    line-height: 1.6;
                    color: #cbd5e1;
                    font-family: 'Consolas', 'Monaco', monospace;
                ">
                    ${content}
                    ${mapping}
                </div>
            </div>
        `;
    };

    /**
     * Get Layer 7 - Application content
     */
    this.getApplicationLayerContent = function(message) {
        var data = message.getData();
        var type = message.getType();
        var dstPort = message.getDstPort();
        var srcPort = message.getOrigPort();

        // Determine protocol
        var protocol = 'Unknown';
        var details = [];

        if (type === 'tcp') {
            if (dstPort === 80 || srcPort === 80) {
                protocol = 'HTTP';
                details = this.formatHTTPDetails(data, message);
            } else if (dstPort === 443 || srcPort === 443) {
                protocol = 'HTTPS';
                details = this.formatHTTPSDetails(data, message);
            } else if (dstPort === 25 || dstPort === 110 || dstPort === 587) {
                protocol = 'Email (SMTP/POP3)';
                details = this.formatEmailDetails(data);
            } else if (dstPort >= 25000 && dstPort <= 28000) {
                protocol = 'Game Protocol';
                details = this.formatGameDetails(data);
            } else {
                protocol = 'TCP Application';
                details = ['Port: ' + dstPort];
            }
        } else if (type === 'icmp') {
            protocol = 'ICMP';
            details = this.formatICMPDetails(data);
        }

        var html = `<div><strong>Protocol:</strong> ${protocol}</div>`;
        if (details.length > 0) {
            html += '<div style="margin-top: 8px;">' + details.join('<br>') + '</div>';
        }

        return html;
    };

    /**
     * Get Layer 6 - Presentation content
     */
    this.getPresentationLayerContent = function(message) {
        var data = message.getData();
        var details = [];

        // Extract presentation layer info from data
        if (data.contentType) {
            details.push('<strong>Content-Type:</strong> ' + data.contentType);
        }
        if (data.contentEncoding) {
            details.push('<strong>Content-Encoding:</strong> ' + data.contentEncoding);
        }
        if (data.charset) {
            details.push('<strong>Character Set:</strong> ' + data.charset);
        }

        // Default values if not present
        if (details.length === 0) {
            details.push('<strong>Encoding:</strong> Raw binary / ASCII');
            details.push('<strong>Compression:</strong> None');
            details.push('<strong>Encryption:</strong> ' + (message.getDstPort() === 443 ? 'TLS/SSL' : 'None'));
        }

        return details.join('<br>');
    };

    /**
     * Get Layer 5 - Session content
     */
    this.getSessionLayerContent = function(message) {
        var data = message.getData();
        var details = [];

        if (data.sessionId) {
            details.push('<strong>Session ID:</strong> ' + data.sessionId);
        }
        if (data.keepAlive) {
            details.push('<strong>Keep-Alive:</strong> ' + data.keepAlive);
        }

        // Default session info
        if (details.length === 0) {
            var msgId = message.getId();
            details.push('<strong>Session ID:</strong> sim-' + msgId.toString(16));
            details.push('<strong>Connection State:</strong> Established');
            details.push('<strong>Timeout:</strong> 300 seconds');
        }

        return details.join('<br>');
    };

    /**
     * Get Layer 4 - Transport content
     */
    this.getTransportLayerContent = function(message) {
        var type = message.getType();
        var details = [];

        if (type === 'tcp') {
            details.push('<strong>Protocol:</strong> TCP (Transmission Control Protocol)');
            details.push('<strong>Source Port:</strong> ' + (message.getOrigPort() || 'Dynamic'));
            details.push('<strong>Destination Port:</strong> ' + message.getDstPort());

            var data = message.getData();
            if (data.flags) {
                details.push('<strong>Flags:</strong> ' + data.flags);
            } else {
                details.push('<strong>Flags:</strong> [ACK]');
            }

            details.push('<strong>Sequence Number:</strong> ' + (data.seq || Math.floor(Math.random() * 10000)));
            details.push('<strong>Acknowledgment:</strong> ' + (data.ack || Math.floor(Math.random() * 10000)));
            details.push('<strong>Window Size:</strong> 65535 bytes');
            details.push('<strong>Checksum:</strong> 0x' + Math.floor(Math.random() * 65535).toString(16).toUpperCase());
        } else if (type === 'icmp') {
            details.push('<strong>Protocol:</strong> ICMP (Internet Control Message Protocol)');
            details.push('<strong>Type:</strong> ' + (message.getData().command || 'Echo Request'));
            details.push('<strong>Code:</strong> 0');
            details.push('<strong>Checksum:</strong> 0x' + Math.floor(Math.random() * 65535).toString(16).toUpperCase());
        } else {
            details.push('<strong>Protocol:</strong> UDP (User Datagram Protocol)');
            details.push('<strong>Source Port:</strong> ' + (message.getOrigPort() || 'Dynamic'));
            details.push('<strong>Destination Port:</strong> ' + message.getDstPort());
            details.push('<strong>Length:</strong> Variable');
            details.push('<strong>Checksum:</strong> 0x' + Math.floor(Math.random() * 65535).toString(16).toUpperCase());
        }

        return details.join('<br>');
    };

    /**
     * Get Layer 3 - Network content
     */
    this.getNetworkLayerContent = function(message) {
        var details = [];

        details.push('<strong>Protocol:</strong> IPv4 (Internet Protocol version 4)');
        details.push('<strong>Source IP:</strong> ' + (message.getOriginIP() || 'Unknown'));
        details.push('<strong>Destination IP:</strong> ' + (message.getDestinationIP() || 'Unknown'));
        details.push('<strong>Protocol Type:</strong> ' + (message.getType() === 'tcp' ? 'TCP (6)' : 'ICMP (1)'));
        details.push('<strong>TTL:</strong> ' + (message.canSend() ? '32 hops remaining ⏱️' : '0 (expired)'));
        details.push('<strong>Header Length:</strong> 20 bytes');
        details.push('<strong>Total Length:</strong> ' + (Math.floor(Math.random() * 500) + 100) + ' bytes');

        return details.join('<br>');
    };

    /**
     * Get Layer 2 - Data Link content
     */
    this.getDataLinkLayerContent = function(message) {
        var details = [];

        // Check for VLAN tagging (Phase 2)
        var vlanId = message.getVlanId ? message.getVlanId() : null;
        var is802_1Q = message.is802_1Q ? message.is802_1Q() : false;

        details.push('<strong>Protocol:</strong> Ethernet II' + (is802_1Q ? ' (802.1Q Tagged)' : ''));
        details.push('<strong>Source MAC:</strong> ' + (message.getOriginMAC() || 'Unknown'));
        details.push('<strong>Destination MAC:</strong> ' + (message.getDestinationMAC() || 'Unknown'));

        // VLAN tagging information (Phase 2)
        if (is802_1Q && vlanId !== null) {
            details.push('<strong style="color: #3b82f6;">🏷️ VLAN Tag:</strong> <span style="color: #10b981;">VLAN ' + vlanId + '</span>');
            details.push('<strong>TPID:</strong> 0x8100 (802.1Q)');
            details.push('<strong>TCI:</strong> Priority=0, DEI=0, VID=' + vlanId);
        } else if (vlanId !== null) {
            details.push('<strong style="color: #94a3b8;">🏷️ VLAN:</strong> <span style="color: #64748b;">Untagged (Native VLAN ' + vlanId + ')</span>');
        } else {
            details.push('<strong style="color: #94a3b8;">🏷️ VLAN:</strong> <span style="color: #64748b;">Untagged (No VLAN)</span>');
        }

        details.push('<strong>EtherType:</strong> IPv4 (0x0800)');
        details.push('<strong>FCS:</strong> 0x' + Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase());

        return details.join('<br>');
    };

    /**
     * Get Layer 1 - Physical content
     */
    this.getPhysicalLayerContent = function(message) {
        var details = [];

        details.push('<strong>Medium:</strong> Ethernet Cable (Cat 5e/6)');
        details.push('<strong>Speed:</strong> 1000BASE-T (1 Gbps)');
        details.push('<strong>Encoding:</strong> Manchester Encoding');
        details.push('<strong>Signal Type:</strong> Digital (Voltage Pulses)');
        details.push('<strong>Frame Size:</strong> ' + (Math.floor(Math.random() * 500) + 64) + ' bytes');
        details.push('<strong>Duplex:</strong> Full-Duplex');

        return details.join('<br>');
    };

    /**
     * Get combined Application layer for TCP/IP model (OSI 5-7)
     */
    this.getCombinedApplicationLayerContent = function(message) {
        var content = [];

        // Layer 7 content
        content.push('<div style="margin-bottom: 12px;"><strong style="color: #3b82f6;">Application Data:</strong></div>');
        content.push(this.getApplicationLayerContent(message));

        // Layer 6 content
        content.push('<div style="margin-top: 12px; margin-bottom: 12px;"><strong style="color: #8b5cf6;">Presentation:</strong></div>');
        content.push(this.getPresentationLayerContent(message));

        // Layer 5 content
        content.push('<div style="margin-top: 12px; margin-bottom: 12px;"><strong style="color: #a855f7;">Session:</strong></div>');
        content.push(this.getSessionLayerContent(message));

        return content.join('');
    };

    /**
     * Get combined Network Access layer for TCP/IP model (OSI 1-2)
     */
    this.getCombinedNetworkAccessLayerContent = function(message) {
        var content = [];

        // Layer 2 content
        content.push('<div style="margin-bottom: 12px;"><strong style="color: #10b981;">Data Link:</strong></div>');
        content.push(this.getDataLinkLayerContent(message));

        // Layer 1 content
        content.push('<div style="margin-top: 12px; margin-bottom: 12px;"><strong style="color: #6366f1;">Physical:</strong></div>');
        content.push(this.getPhysicalLayerContent(message));

        return content.join('');
    };

    /**
     * Format HTTP details
     */
    this.formatHTTPDetails = function(data, message) {
        var details = [];

        if (data.method) {
            details.push('<strong>Method:</strong> ' + data.method);
        }
        if (data.url) {
            details.push('<strong>URL:</strong> ' + data.url);
        }
        if (data.host) {
            details.push('<strong>Host:</strong> ' + data.host);
        }
        if (data.userAgent) {
            details.push('<strong>User-Agent:</strong> ' + data.userAgent);
        }

        return details;
    };

    /**
     * Format HTTPS details
     */
    this.formatHTTPSDetails = function(data, message) {
        var details = [];
        details.push('<strong>🔒 Encrypted Connection</strong>');
        details.push('TLS/SSL Protocol');
        details.push('Application data is encrypted');
        return details;
    };

    /**
     * Format Email details
     */
    this.formatEmailDetails = function(data) {
        var details = [];
        if (data.from) details.push('<strong>From:</strong> ' + data.from);
        if (data.to) details.push('<strong>To:</strong> ' + data.to);
        if (data.subject) details.push('<strong>Subject:</strong> ' + data.subject);
        return details;
    };

    /**
     * Format Game details
     */
    this.formatGameDetails = function(data) {
        var details = [];
        if (data.playerName) details.push('<strong>Player:</strong> ' + data.playerName);
        if (data.gameType) details.push('<strong>Game:</strong> ' + data.gameType);
        if (data.action) details.push('<strong>Action:</strong> ' + data.action);
        return details;
    };

    /**
     * Format ICMP details
     */
    this.formatICMPDetails = function(data) {
        var details = [];
        if (data.command) {
            details.push('<strong>Command:</strong> ' + data.command.toUpperCase());
        }
        if (data.description) {
            details.push('<strong>Description:</strong> ' + data.description);
        }
        return details;
    };

    /**
     * Refresh inspector with current message
     */
    this.refreshInspector = function() {
        if (!currentMessage || !inspectorPanel) return;

        console.log('Refreshing inspector content...');

        // Update just the content area and button states
        var contentArea = document.getElementById('inspector-content-area');
        var osiBtn = document.getElementById('model-osi');
        var tcpipBtn = document.getElementById('model-tcpip');

        console.log('Found elements:', {
            contentArea: !!contentArea,
            osiBtn: !!osiBtn,
            tcpipBtn: !!tcpipBtn
        });

        if (contentArea) {
            // Rebuild content
            console.log('Building layer view for model:', currentModel);
            var layers = currentModel === 'OSI' ?
                this.buildOSILayers(currentMessage) :
                this.buildTCPIPLayers(currentMessage);

            var content = this.buildPacketSummary(currentMessage) +
                         '<div id="journey-container">' +
                         this.buildActualJourney(currentMessage) +
                         '</div>' +
                         layers.join('\n') +
                         this.buildEducationalNotes(currentMessage);

            console.log('Setting content, length:', content.length);
            contentArea.innerHTML = content;
            console.log('Content updated to:', currentModel + ' model');
        } else {
            console.error('Content area not found! Cannot update.');
        }

        // Update model button states
        if (osiBtn && tcpipBtn) {
            if (currentModel === 'OSI') {
                osiBtn.style.background = '#9333ea';
                osiBtn.style.color = 'white';
                osiBtn.style.borderColor = '#9333ea';
                tcpipBtn.style.background = 'transparent';
                tcpipBtn.style.color = '#94a3b8';
                tcpipBtn.style.borderColor = '#475569';
            } else {
                tcpipBtn.style.background = '#9333ea';
                tcpipBtn.style.color = 'white';
                tcpipBtn.style.borderColor = '#9333ea';
                osiBtn.style.background = 'transparent';
                osiBtn.style.color = '#94a3b8';
                osiBtn.style.borderColor = '#475569';
            }
        }

        console.log('Button states updated');

        // Reattach event listeners to the buttons (since they may have lost them)
        this.attachModelButtonListeners();
    };

    /**
     * Attach model button listeners (separate function for reattaching during refresh)
     */
    this.attachModelButtonListeners = function() {
        var osiBtn = document.getElementById('model-osi');
        var tcpipBtn = document.getElementById('model-tcpip');

        console.log('Attaching model button listeners:', {
            osiBtn: !!osiBtn,
            tcpipBtn: !!tcpipBtn
        });

        if (osiBtn) {
            // Remove any existing listeners by cloning
            var newOsiBtn = osiBtn.cloneNode(true);
            osiBtn.parentNode.replaceChild(newOsiBtn, osiBtn);

            newOsiBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('OSI button clicked');
                _self.toggleModel('OSI');
            });
        }

        if (tcpipBtn) {
            // Remove any existing listeners by cloning
            var newTcpipBtn = tcpipBtn.cloneNode(true);
            tcpipBtn.parentNode.replaceChild(newTcpipBtn, tcpipBtn);

            newTcpipBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('TCP/IP button clicked');
                _self.toggleModel('TCPIP');
            });
        }
    };

    /**
     * Attach event listeners
     */
    this.attachEventListeners = function() {
        // Close button
        var closeBtn = document.getElementById('inspector-close');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                _self.closeInspector();
            };
        }

        // Attach model button listeners
        this.attachModelButtonListeners();


        // Draggable header
        var header = document.getElementById('inspector-header');
        if (header) {
            header.onmousedown = function(e) {
                isDragging = true;
                dragOffset.x = e.clientX - inspectorPanel.offsetLeft;
                dragOffset.y = e.clientY - inspectorPanel.offsetTop;
                e.preventDefault();
            };
        }

        document.onmousemove = function(e) {
            if (isDragging && inspectorPanel) {
                inspectorPanel.style.left = (e.clientX - dragOffset.x) + 'px';
                inspectorPanel.style.top = (e.clientY - dragOffset.y) + 'px';
                inspectorPanel.style.right = 'auto'; // Remove right positioning when dragging
            }
        };

        document.onmouseup = function() {
            isDragging = false;
        };
    };

    /**
     * Copy layer content to clipboard
     */
    this.copyLayerContent = function(layerId) {
        var layer = document.getElementById(layerId);
        if (layer) {
            var text = layer.innerText;

            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function() {
                    _self.showCopyNotification();
                });
            }
        }
    };

    /**
     * Show brief copy notification
     */
    this.showCopyNotification = function() {
        var notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            z-index: 10001;
            font-size: 12px;
            font-weight: 600;
        `;
        notification.textContent = '✓ Copied to clipboard';
        document.body.appendChild(notification);

        setTimeout(function() {
            document.body.removeChild(notification);
        }, 2000);
    };

    /**
     * Close inspector panel
     */
    this.closeInspector = function() {
        // Stop live updates
        if (this.liveUpdateInterval) {
            clearInterval(this.liveUpdateInterval);
            this.liveUpdateInterval = null;
        }

        if (inspectorPanel && inspectorPanel.parentNode) {
            inspectorPanel.parentNode.removeChild(inspectorPanel);
            inspectorPanel = null;
        }
        currentMessage = null;
        lastHopCount = 0;
    };

    /**
     * Enable/disable inspector
     */
    this.setEnabled = function(enabled) {
        isEnabled = enabled;
        if (!enabled) {
            this.closeInspector();
        }
    };

    /**
     * Check if inspector is currently shown
     */
    this.isShowing = function() {
        return inspectorPanel !== null;
    };
};

// Create global instance
var packetInspector = new PacketInspector();
