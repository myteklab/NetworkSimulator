/*
 * This file is part of the Education Network Simulator project and covered 
 * by GPLv3 license. See full terms in the LICENSE file at the root folder
 * or at http://www.gnu.org/licenses/gpl-3.0.html.
 * 
 * (c) 2015 Jorge García Ochoa de Aspuru
 * bardok@gmail.com
 * 
 * Images are copyrighted by their respective authors and have been 
 * downloaded from http://pixabay.com/
 * 
 */

// Polyfill for roundRect if not available
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        this.beginPath();
        this.moveTo(x + radius, y);
        this.arcTo(x + width, y, x + width, y + height, radius);
        this.arcTo(x + width, y + height, x, y + height, radius);
        this.arcTo(x, y + height, x, y, radius);
        this.arcTo(x, y, x + width, y, radius);
        this.closePath();
        return this;
    };
}

var Drawable = function(c_owner) 
{
    this.id = getNextID();
    var X = 0;
    var Y = 0;
    var image = null;
    var owner = c_owner;
    var rect = new UIRectangle(null, null, this, 0, 0, 0, 0, 0, false);
    uimanager.addClickable(rect);
    var observers = [];
    
    this.save = function() 
    {
        var result = {};
        result.version = 1;
        result.id = this.id;
        result.X = X;
        result.Y = Y;
        
        return result;
    };
    
    this.load = function(data) 
    {
        X = data.X;
        Y = data.Y;
        this.id = data.id;
        notifyObservers();
    };
    
    this.setPosition = function(x, y) 
    {
        X = x;
        Y = y;
        if (image !== null) 
        {
            rect.setCoords(X, Y, image.width, image.height, 0);
        }
        notifyObservers();
    };
    
    this.getX = function() 
    {
        return X;
    };
    
    this.getY = function() 
    {
        return Y;
    };
    
    this.getCenterX = function() 
    {
        return X + image.width / 2;
    };
    
    this.getCenterY = function() 
    {
        return Y + image.height / 2;
    };
    
    this.setImage = function(img) 
    {
        image = img;
        if (image !== null) 
        {
            rect.setCoords(X, Y, image.width, image.height, 0);
        }
        notifyObservers();
    };
    
    function drawInfo(ctx) 
    {
        // Check if device labels should be shown
        if (typeof showDeviceLabels !== 'undefined' && !showDeviceLabels) {
            return; // Don't draw any device info when labels are hidden
        }
        
        var pos = 10;
        var parts = owner.getStrInfo().split("\n");
        
        // Draw semi-transparent background for text
        if (parts.length > 0) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            var maxWidth = 0;
            ctx.font = 'bold 10pt sans-serif';
            for (var i = 0; i < parts.length; i++) {
                var width = ctx.measureText(parts[i]).width;
                if (width > maxWidth) maxWidth = width;
            }
            ctx.fillRect(-4, image.height, maxWidth + 8, parts.length * 10 + 8);
        }
        
        // Draw white text
        ctx.font = 'bold 10pt sans-serif';
        ctx.fillStyle = "#ffffff";
        for (var i = 0; i < parts.length; i++) 
        {
            ctx.fillText(parts[i], 0, image.height + pos);
            pos += 10;
        }
        if (DEBUG)
        {
            ctx.fillText("X: " + X + " - Y: " + Y, 0, image.height + pos);
        }
    }
    
    this.draw = function(ctx) 
    {
        ctx.save();
        ctx.translate(X, Y);
        
        // Check if this host has a rogue DHCP server or is a rogue router
        var isRogue = false;
        var rogueType = null;
        
        // Check for rogue DHCP server
        if (owner && owner.getApp) {
            var dhcpApp = owner.getApp("DHCPServer");
            if (dhcpApp && dhcpApp.isRogue && dhcpApp.isRogue()) {
                isRogue = true;
                rogueType = 'DHCP';
            }
        }
        
        // Check for rogue router
        if (!isRogue && owner && owner.getType && owner.getType() === 'router' && owner.isRogue && owner.isRogue()) {
            isRogue = true;
            rogueType = 'ROUTER';
        }
        
        // Check if this host is attacking
        var isAttacking = false;
        if (owner && owner.isAttacking) {
            isAttacking = true;
        }
        
        // Check if this host is under attack (has server resources with high load)
        var isUnderAttack = false;
        var attackSeverity = 'normal';
        if (owner && owner.serverResources) {
            var status = owner.serverResources.status;
            if (status === 'offline' || status === 'critical') {
                isUnderAttack = true;
                attackSeverity = status;
            } else if (status === 'degraded') {
                isUnderAttack = true;
                attackSeverity = 'degraded';
            }
            
        }
        
        // Draw attack visual effects
        if (isAttacking) {
            // Draw attacking host with red aggressive glow
            ctx.save();
            var pulseAmount = Math.sin(Date.now() * 0.005) * 0.4 + 0.6;
            ctx.shadowColor = 'rgba(239, 68, 68, ' + pulseAmount + ')';
            ctx.shadowBlur = 25;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.drawImage(image, 0, 0);
            ctx.restore();
            
            // Draw attack indicator
            ctx.save();
            ctx.font = 'bold 14px sans-serif';
            ctx.fillStyle = '#ef4444';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeText('⚔️', 5, 20);
            ctx.fillText('⚔️', 5, 20);
            ctx.font = 'bold 10px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.strokeText('ATTACKING', (image.width - 55) / 2, image.height - 5);
            ctx.fillText('ATTACKING', (image.width - 55) / 2, image.height - 5);
            ctx.restore();
        } else if (isUnderAttack) {
            // Draw target under attack with appropriate effects
            ctx.save();
            
            if (attackSeverity === 'offline') {
                // Offline - dark red with strong shake
                var shakeX = (Math.random() - 0.5) * 4;
                var shakeY = (Math.random() - 0.5) * 4;
                ctx.translate(shakeX, shakeY);
                ctx.globalAlpha = 0.7;
                ctx.drawImage(image, 0, 0);
                ctx.globalAlpha = 1.0;
                
                // Red overlay
                ctx.globalCompositeOperation = 'multiply';
                ctx.fillStyle = 'rgba(139, 0, 0, 0.5)';
                ctx.fillRect(0, 0, image.width, image.height);
                
                // Offline text
                ctx.globalCompositeOperation = 'source-over';
                ctx.font = 'bold 12px sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#8b0000';
                ctx.lineWidth = 2;
                ctx.strokeText('OFFLINE', (image.width - 45) / 2, image.height / 2);
                ctx.fillText('OFFLINE', (image.width - 45) / 2, image.height / 2);
            } else if (attackSeverity === 'critical') {
                // Critical - red pulsing
                var pulseAmount = Math.sin(Date.now() * 0.008) * 0.5 + 0.5;
                ctx.shadowColor = 'rgba(239, 68, 68, ' + pulseAmount + ')';
                ctx.shadowBlur = 30;
                ctx.drawImage(image, 0, 0);
                
                // Warning icon
                ctx.font = 'bold 16px sans-serif';
                ctx.fillStyle = '#ef4444';
                ctx.fillText('⚠️', image.width - 25, 20);
            } else if (attackSeverity === 'degraded') {
                // Degraded - orange glow
                var pulseAmount = Math.sin(Date.now() * 0.004) * 0.3 + 0.7;
                ctx.shadowColor = 'rgba(245, 158, 11, ' + pulseAmount + ')';
                ctx.shadowBlur = 15;
                ctx.drawImage(image, 0, 0);
            }
            
            ctx.restore();
        } else if (isRogue) {
            // Draw red glow effect for rogue devices (existing code)
            ctx.save();
            // Create pulsing effect
            var pulseAmount = Math.sin(Date.now() * 0.003) * 0.3 + 0.7;
            
            // Draw red glow
            ctx.shadowColor = 'rgba(255, 0, 0, ' + pulseAmount + ')';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            // Draw red tinted overlay
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(image, 0, 0);
            
            // Add red tint
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = 'rgba(255, 100, 100, 0.3)';
            ctx.fillRect(0, 0, image.width, image.height);
            
            ctx.restore();
            
            // Draw warning indicator
            ctx.save();
            ctx.font = 'bold 16px sans-serif';
            ctx.fillStyle = '#ff0000';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeText('⚠️', image.width - 25, 20);
            ctx.fillText('⚠️', image.width - 25, 20);
            
            // Draw "ROGUE" label with type
            ctx.font = 'bold 10px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 2;
            var text = rogueType === 'ROUTER' ? 'ROGUE ROUTER' : 'ROGUE';
            var textWidth = ctx.measureText(text).width;
            ctx.strokeText(text, (image.width - textWidth) / 2, image.height - 5);
            ctx.fillText(text, (image.width - textWidth) / 2, image.height - 5);
            ctx.restore();
        } else {
            // Draw the normal image
            ctx.drawImage(image, 0, 0);
        }
        
        // Check if this host is compromised (received poisoned DHCP)
        var isCompromised = false;
        
        // Simple check: was this host marked as compromised by rogue DHCP?
        if (owner && owner.compromisedByRogue) {
            isCompromised = true;
        }
        
        // Also check gateway-based detection
        if (!isCompromised && owner && owner.getConnectable) {
            // Check if any interface has a poisoned gateway pointing to a rogue device
            var connectable = owner.getConnectable();
            for (var i = 0; i < connectable.getConnectorNumber(); i++) {
                var ipInfo = connectable.getIPInfo(i);
                if (ipInfo && ipInfo.getGateway) {
                    var gateway = ipInfo.getGateway();
                    // Check if this gateway belongs to a rogue DHCP server or rogue router
                    if (gateway && network) {
                        var elements = network.getElements();
                        for (var j = 0; j < elements.length; j++) {
                            var elem = elements[j];
                            
                            // Check for rogue DHCP server
                            if (elem && elem.getApp) {
                                var dhcpApp = elem.getApp("DHCPServer");
                                if (dhcpApp && dhcpApp.isRogue && dhcpApp.isRogue()) {
                                    // Check if this rogue server's IP matches our gateway
                                    var elemConnectable = elem.getConnectable();
                                    if (elemConnectable) {
                                        for (var k = 0; k < elemConnectable.getConnectorNumber(); k++) {
                                            var serverIP = elemConnectable.getIPInfo(k).getIPv4();
                                            if (serverIP === gateway) {
                                                isCompromised = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            
                            // Check for rogue router
                            if (!isCompromised && elem && elem.getType && elem.getType() === 'router' && 
                                elem.isRogue && elem.isRogue()) {
                                // Check if this rogue router's IP matches our gateway
                                var elemConnectable = elem.getConnectable();
                                if (elemConnectable) {
                                    for (var k = 0; k < elemConnectable.getConnectorNumber(); k++) {
                                        var routerIP = elemConnectable.getIPInfo(k).getIPv4();
                                        if (routerIP === gateway) {
                                            isCompromised = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            
                            if (isCompromised) break;
                        }
                    }
                }
                if (isCompromised) break;
            }
        }
        
        // Draw orange border and warning for compromised hosts
        if (isCompromised) {
            ctx.save();
            ctx.strokeStyle = '#ff5722';
            ctx.lineWidth = 3;
            ctx.shadowColor = 'rgba(255, 87, 34, 0.5)';
            ctx.shadowBlur = 10;
            ctx.strokeRect(-2, -2, image.width + 4, image.height + 4);
            ctx.restore();
            
            // Draw compromised indicator
            ctx.save();
            ctx.font = 'bold 10px sans-serif';
            ctx.fillStyle = '#ff5722';
            ctx.fillText('COMPROMISED', 2, -5);
            ctx.restore();
        }
        
        // Check if this host is connected to a game server
        var isConnectedToGame = false;
        var gameConnectionInfo = null;
        if (owner && owner.isConnectedToGameServer && owner.isConnectedToGameServer()) {
            isConnectedToGame = true;
            gameConnectionInfo = owner.getGameServerConnection();
        }
        
        // Draw game connection indicator
        if (isConnectedToGame && gameConnectionInfo) {
            // Draw green glow border for game connection
            ctx.save();
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.shadowColor = 'rgba(16, 185, 129, 0.5)';
            ctx.shadowBlur = 8;
            ctx.strokeRect(-1, -1, image.width + 2, image.height + 2);
            ctx.restore();
            
            // Draw game controller icon in top-right corner
            ctx.save();
            ctx.font = '14px sans-serif';
            ctx.fillStyle = '#10b981';
            ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
            ctx.shadowBlur = 4;
            ctx.fillText('🎮', image.width - 18, 15);
            ctx.restore();
            
            // Draw "CONNECTED" label at the top
            ctx.save();
            ctx.font = 'bold 9px sans-serif';
            ctx.fillStyle = '#10b981';
            ctx.fillText('GAME: ' + gameConnectionInfo.serverName, 2, -5);
            ctx.restore();
        }
        
        // Draw firewall indicator overlay
        if (owner && owner.getType && owner.getType() === 'firewall') {
            // Draw shield/fire icon in the corner to distinguish from router
            ctx.save();
            ctx.font = '20px sans-serif';
            ctx.fillStyle = 'rgba(255, 87, 34, 0.9)'; // Orange-red for fire
            ctx.shadowColor = 'rgba(255, 87, 34, 0.5)';
            ctx.shadowBlur = 8;
            ctx.fillText('🔥', image.width - 25, 20);
            ctx.restore();
            
            // Add small "FW" text label
            ctx.save();
            ctx.font = 'bold 10px sans-serif';
            ctx.fillStyle = '#ff5722';
            ctx.fillText('FW', 2, image.height - 5);
            ctx.restore();
        }
        
        // Draw email server indicator overlay
        if (owner && owner.getType && owner.getType() === 'emailserver') {
            // Draw extra large envelope icon to clearly identify email server
            ctx.save();
            ctx.font = '32px sans-serif';  // Extra large envelope for clear identification
            ctx.fillStyle = 'rgba(33, 150, 243, 1)'; // Solid blue for email
            ctx.shadowColor = 'rgba(33, 150, 243, 0.7)';
            ctx.shadowBlur = 12;
            ctx.fillText('✉️', image.width - 38, 28);
            ctx.restore();
        }
        
        // Draw RADIUS server indicator overlay
        if (owner && owner.getType && owner.getType() === 'radiusserver') {
            // Draw lock icon to identify RADIUS authentication server
            ctx.save();
            ctx.font = '28px sans-serif';  // Large lock for clear identification
            ctx.fillStyle = 'rgba(102, 126, 234, 1)'; // Purple for security/auth
            ctx.shadowColor = 'rgba(102, 126, 234, 0.8)';
            ctx.shadowBlur = 10;
            ctx.fillText('🔐', image.width - 36, 26);
            ctx.restore();
        }

        // Draw VLAN indicators for switches (Phase 1)
        if (owner && owner.getType && owner.getType() === 'switch' && owner.getVlanDatabase) {
            var vlanDb = owner.getVlanDatabase();
            if (vlanDb) {
                ctx.save();

                // VLAN color mapping
                var vlanColors = {
                    1: "#808080",   // Gray (default)
                    10: "#3498db",  // Blue
                    20: "#e74c3c",  // Red
                    30: "#2ecc71",  // Green
                    40: "#f39c12",  // Orange
                    50: "#9b59b6",  // Purple
                    60: "#1abc9c"   // Teal
                };

                // Function to get VLAN color
                var getVlanColor = function(vlanId) {
                    if (vlanColors[vlanId]) {
                        return vlanColors[vlanId];
                    }
                    // Generate color from VLAN ID hash (golden angle)
                    var hue = (vlanId * 137.5) % 360;
                    return 'hsl(' + hue + ', 70%, 50%)';
                };

                // Draw VLAN badges
                var badgeX = image.width + 10;
                var badgeY = 5;
                var badgeSize = 10;
                var badgeSpacing = 14;
                var count = 0;

                for (var vlanId in vlanDb) {
                    if (count >= 5) break; // Limit to 5 VLANs shown

                    var color = getVlanColor(parseInt(vlanId));

                    // Draw colored circle
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.arc(badgeX, badgeY + (count * badgeSpacing), badgeSize / 2, 0, Math.PI * 2);
                    ctx.fill();

                    // Draw VLAN ID text
                    ctx.font = 'bold 8px sans-serif';
                    ctx.fillStyle = '#ffffff';
                    ctx.textAlign = 'center';
                    ctx.fillText(vlanId, badgeX, badgeY + (count * badgeSpacing) + 3);

                    count++;
                }

                // If more than 5 VLANs, show "..."
                if (Object.keys(vlanDb).length > 5) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText('...', badgeX, badgeY + (count * badgeSpacing));
                }

                ctx.restore();
            }
        }

        // Draw connectivity indicators for hosts (computers and other devices with network capabilities)
        if (owner && owner.getType && (owner.getType() === 'computer' || owner.getType() === 'host')) {
            var hasWiFi = owner.getHasWiFi && owner.getHasWiFi();
            var hasEthernet = owner.getHasEthernet && owner.getHasEthernet();
            var connectionType = owner.getConnectionType && owner.getConnectionType();
            
            // Draw connection type indicator
            if (connectionType === 'wifi' && hasWiFi) {
                // WiFi connection active - show WiFi symbol
                ctx.font = '14px sans-serif';
                ctx.fillStyle = 'rgba(100, 200, 255, 1)';
                ctx.fillText('📶', image.width - 20, 15);
                
                // Small indicator text (only for devices with dual connectivity)
                if (hasWiFi && hasEthernet) {
                    ctx.font = '8px sans-serif';
                    ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
                    ctx.fillText('WiFi', image.width - 22, 25);
                }
            } else if (connectionType === 'ethernet' && hasEthernet) {
                // Ethernet connection active - show plug symbol
                ctx.font = '14px sans-serif';
                ctx.fillStyle = 'rgba(150, 150, 150, 1)';
                ctx.fillText('🔌', image.width - 20, 15);
                
                // Small indicator text (only for devices with dual connectivity)
                if (hasWiFi && hasEthernet) {
                    ctx.font = '8px sans-serif';
                    ctx.fillStyle = 'rgba(150, 150, 150, 0.8)';
                    ctx.fillText('LAN', image.width - 22, 25);
                }
            }
            
            // Show available connections in bottom corner (smaller, faded) - only for dual connectivity
            if (hasWiFi && hasEthernet) {
                ctx.font = '10px sans-serif';
                ctx.fillStyle = 'rgba(100, 100, 100, 0.4)';
                var availableText = connectionType === 'wifi' ? '🔌' : '📶';
                ctx.fillText(availableText, 5, image.height - 5);
            }
        }
        
        drawInfo(ctx);
        
        // Draw resource monitor overlay AFTER labels so it appears on top
        // This was moved here from the isUnderAttack block to fix z-index issue
        if (isUnderAttack && owner && owner.serverResources) {
            ctx.save();
            
            // Position overlay to the right of the device
            var overlayX = image.width + 15;  // Position relative to device
            var overlayY = 0;
            var overlayWidth = 200;  // Slightly wider for better visibility
            var overlayHeight = 140;  // Slightly taller for all content
            
            // Background with gradient based on severity
            var bgGradient = ctx.createLinearGradient(overlayX, overlayY, overlayX + overlayWidth, overlayY);
            var currentStatus = owner.serverResources.status;
            if (currentStatus === 'offline') {
                bgGradient.addColorStop(0, 'rgba(127, 29, 29, 0.95)');
                bgGradient.addColorStop(1, 'rgba(153, 27, 27, 0.95)');
            } else if (currentStatus === 'critical') {
                bgGradient.addColorStop(0, 'rgba(220, 38, 38, 0.95)');
                bgGradient.addColorStop(1, 'rgba(239, 68, 68, 0.95)');
            } else if (currentStatus === 'degraded') {
                bgGradient.addColorStop(0, 'rgba(217, 119, 6, 0.95)');
                bgGradient.addColorStop(1, 'rgba(245, 158, 11, 0.95)');
            } else {
                // Normal status - green gradient
                bgGradient.addColorStop(0, 'rgba(31, 41, 55, 0.95)');  // Dark background
                bgGradient.addColorStop(1, 'rgba(55, 65, 81, 0.95)');  // Slightly lighter
            }
            
            // Draw rounded rectangle background
            ctx.fillStyle = bgGradient;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            
            // Use roundRect if available, otherwise draw a regular rectangle
            if (ctx.roundRect) {
                ctx.roundRect(overlayX, overlayY, overlayWidth, overlayHeight, 8);
            } else {
                // Fallback to regular rectangle for older browsers
                ctx.rect(overlayX, overlayY, overlayWidth, overlayHeight);
            }
            ctx.fill();
            ctx.stroke();
            
            // Title
            ctx.font = 'bold 11px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('⚠️ UNDER ATTACK', overlayX + 10, overlayY + 15);
            
            // Get resource usage
            var usage = owner.serverResources.getUsagePercentages();
            
            // Determine which metrics to show based on attack type
            var metrics = [];
            if (owner.attackType === 'SYN_FLOOD') {
                // SYN flood affects connections
                metrics.push({label: 'Connections', value: usage.connections, critical: usage.connections > 80});
                metrics.push({label: 'CPU', value: usage.cpu, critical: usage.cpu > 80});
            } else if (owner.attackType === 'HTTP_FLOOD') {
                // HTTP flood affects CPU and memory
                metrics.push({label: 'CPU', value: usage.cpu, critical: usage.cpu > 80});
                metrics.push({label: 'Memory', value: usage.memory, critical: usage.memory > 80});
            } else if (owner.attackType === 'ICMP_FLOOD') {
                // ICMP flood affects bandwidth
                metrics.push({label: 'Bandwidth', value: usage.bandwidth, critical: usage.bandwidth > 80});
                metrics.push({label: 'CPU', value: usage.cpu, critical: usage.cpu > 80});
            } else if (owner.attackType === 'SLOWLORIS') {
                // Slowloris affects connections
                metrics.push({label: 'Connections', value: usage.connections, critical: usage.connections > 80});
                metrics.push({label: 'Memory', value: usage.memory, critical: usage.memory > 80});
            } else {
                // Default metrics
                metrics.push({label: 'CPU', value: usage.cpu, critical: usage.cpu > 80});
                metrics.push({label: 'Network', value: usage.bandwidth, critical: usage.bandwidth > 80});
            }
            
            // Draw metrics bars
            var barY = overlayY + 30;
            ctx.font = '10px sans-serif';
            
            for (var i = 0; i < metrics.length; i++) {
                var metric = metrics[i];
                
                // Label
                ctx.fillStyle = '#ffffff';
                ctx.fillText(metric.label + ': ' + metric.value + '%', overlayX + 10, barY);
                
                // Bar background
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fillRect(overlayX + 10, barY + 2, overlayWidth - 20, 8);
                
                // Bar fill
                var barColor = metric.critical ? '#ef4444' : (metric.value > 60 ? '#f59e0b' : '#10b981');
                ctx.fillStyle = barColor;
                ctx.fillRect(overlayX + 10, barY + 2, (overlayWidth - 20) * metric.value / 100, 8);
                
                barY += 20;
            }
            
            // Show drop rate based on current status
            var dropRate = 0;
            if (currentStatus === 'offline') dropRate = 100;
            else if (currentStatus === 'critical') dropRate = 70;
            else if (currentStatus === 'degraded') dropRate = 30;
            
            ctx.fillStyle = '#fca5a5';
            ctx.font = 'bold 10px sans-serif';
            ctx.fillText('Dropping ' + dropRate + '% packets', overlayX + 10, barY + 5);
            
            // Show attack type
            if (owner.attackType) {
                ctx.fillStyle = '#ffffff';
                ctx.font = '9px sans-serif';
                var attackName = owner.attackType.replace(/_/g, ' ');
                ctx.fillText('Attack: ' + attackName, overlayX + 10, overlayHeight - 5);
            }
            
            ctx.restore();
        }
        
        ctx.restore();
    };
    
    this.getOwner = function() 
    {
        return owner;
    };
    
    this.getRect = function() 
    {
        var data = {};
        data.x = X;
        data.y = Y;
        data.width = image.width;
        data.height = image.height;
        
        return data;
    };
    
    this.addObserver = function(obs) 
    {
        observers.push(obs);
    };
    
    this.deleteObserver = function(obs) 
    {
        var pos = observers.indexOf(obs);
        observers.splice(pos, 1);
    };
    
    function notifyObservers() 
    {
        if (image !== null) 
        {
            for (var i = 0; i < observers.length; i++) 
            {
                observers[i].drawableChanged();
            }
        }
    }
    
    // Public method to trigger redraw
    this.notifyObservers = function() {
        notifyObservers();
    };

    this.dispose = function()
    {
        uimanager.removeClickable(rect);
    };
    
    this.hasCoords = function(x, y)
    {
        // Check if the given coordinates are within this drawable's bounds
        return rect.isInCoords(x, y);
    };
    
    this.removeObserver = function(obs)
    {
        // Alias for deleteObserver to match expected method name
        this.deleteObserver(obs);
    };
};
