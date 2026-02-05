// NetworkSimulator App
// Platform-adapted: removed old save/load, added serializeProjectData/loadProjectData

var currentProjectId = null;
var applicationId = null;
var previewMode = false;
var hasUnsavedChanges = false;
var initialElementCount = 0;
var lastSaveTime = 0;

    // Separate visibility states for device labels and link labels
    var showDeviceLabels = localStorage.getItem('networkSimShowDeviceLabels') !== 'false';
    var showLinkLabels = localStorage.getItem('networkSimShowLinkLabels') !== 'false';

    function init()
    {
        // Check if email scripts loaded
        // // console.log('Checking email scripts:');
        // // console.log('EmailClient available:', typeof window.EmailClient);
        // // console.log('EmailServer available:', typeof window.EmailServer);

        // Set up responsive canvas
        setupResponsiveCanvas();

        // Show packet inspector hint on first load (not in preview mode)
        if (!previewMode && !localStorage.getItem('packetInspectorHintShown')) {
            setTimeout(function() {
                showToast('💡 Tip: Click on any packet to inspect its layers!', 'info', 5000);
                localStorage.setItem('packetInspectorHintShown', 'true');
            }, 3000);
        }
        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl+S for save (disabled in preview mode)
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if (!previewMode) {
                    // Use the existing save function
                    if (typeof downloadClick === 'function') {
                        downloadClick();
                    }
                } else {
                    showToast('⚠️ Saving is disabled in preview mode', 'info', 2000);
                }
            }
            // L key for toggling link labels (when not typing in an input)
            else if (e.key === 'l' || e.key === 'L') {
                // Don't toggle if user is typing in an input field
                if (document.activeElement.tagName !== 'INPUT' && 
                    document.activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    toggleLinkLabels();
                }
            }
        });
        
        // Show save indicator function
        window.showSaveIndicator = function(message, type, duration) {
            // Remove any existing indicator
            var existing = document.getElementById('save-indicator');
            if (existing) {
                document.body.removeChild(existing);
            }
            
            // Create new indicator
            var indicator = document.createElement('div');
            indicator.id = 'save-indicator';
            indicator.style.cssText = 'position:fixed;bottom:20px;right:20px;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:500;z-index:10000;animation:slideIn 0.3s ease;';
            
            // Style based on type
            if (type === 'success') {
                indicator.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                indicator.style.color = 'white';
                indicator.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            } else if (type === 'info') {
                indicator.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
                indicator.style.color = 'white';
                indicator.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }
            
            indicator.innerHTML = message + ' <span style="opacity:0.7;font-size:11px;">(' + new Date().toLocaleTimeString() + ')</span>';
            
            // Add animation styles
            var style = document.createElement('style');
            style.textContent = '@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
            if (!document.querySelector('style[data-save-indicator]')) {
                style.setAttribute('data-save-indicator', 'true');
                document.head.appendChild(style);
            }
            
            document.body.appendChild(indicator);
            
            // Auto-remove after duration
            if (duration) {
                setTimeout(function() {
                    if (document.getElementById('save-indicator')) {
                        document.body.removeChild(document.getElementById('save-indicator'));
                    }
                }, duration);
            }
        };
	// Create device type images dynamically
	function createDeviceImage(emoji) {
	    var canvas = document.createElement('canvas');
	    canvas.width = 64;
	    canvas.height = 64;
	    var ctx = canvas.getContext('2d');
	    
	    // Clear background (transparent)
	    ctx.clearRect(0, 0, 64, 64);
	    
	    // Draw emoji larger and centered
	    ctx.font = '48px sans-serif';
	    ctx.textAlign = 'center';
	    ctx.textBaseline = 'middle';
	    ctx.fillStyle = '#000';
	    ctx.fillText(emoji, 32, 32);
	    
	    // Convert to image
	    var img = new Image();
	    img.src = canvas.toDataURL();
	    return img;
	}
	
	// Create images for each device type
	var deviceImages = {
	    desktop: createDeviceImage('🖥️'),
	    laptop: createDeviceImage('💻'),
	    smartphone: createDeviceImage('📱'),
	    gaming: createDeviceImage('🎮'),
	    smarttv: createDeviceImage('📺'),
	    iot: createDeviceImage('💡')
	};
	
	var loader = new ImageLoader(
	["img/64/switch.png", 
	    "img/64/router2.png", 
	    "img/64/computer.png", 
	    "img/64/server_web.png", 
	    "img/64/server_dns.png", 
	    "img/64/server_dhcp.png", 
	    "img/64/envelope-DHCP.png", 
	    "img/64/envelope-DNS.png", 
	    "img/64/envelope-HTTP.png",
	    "img/64/envelope-ICMP.png",
	    "img/64/envelope-ICMP.png",  // Using ICMP envelope as placeholder for ARP at position 10
	    "img/64/firewall.png",       // Now at correct position 11
	    "img/64/server_email.png",
	    "img/64/envelope-EMAIL.png"], 
	function(loadedImages) {
	    // Add device images to the loaded images array
	    window.deviceImages = deviceImages;
	    simulator(loadedImages);
	    
	    // Set initial state of labels button and checkboxes based on saved preferences
	    updateLabelsButtonAppearance();
	    updateLabelCheckboxes();
	}
	);
	loader.load();
    }
    
    // Canvas viewport management
    var canvasViewport = {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        isDragging: false,
        lastX: 0,
        lastY: 0,
        minZoom: 0.25,
        maxZoom: 4
    };
    
    function setupResponsiveCanvas() {
        var container = document.getElementById("simcontainer");
        var canvas = document.getElementById("simcanvas");
        
        // Set canvas size to match container
        function resizeCanvas() {
            var rect = container.getBoundingClientRect();
            var newWidth = rect.width * window.devicePixelRatio;
            var newHeight = rect.height * window.devicePixelRatio;
            
            // Only resize if dimensions actually changed
            if (canvas.width !== newWidth || canvas.height !== newHeight) {
                canvas.width = newWidth;
                canvas.height = newHeight;
                canvas.style.width = rect.width + 'px';
                canvas.style.height = rect.height + 'px';
                
                // Notify the network that canvas was resized
                if (typeof network !== 'undefined' && network) {
                    network.setDimensions(newWidth, newHeight);
                    network.render();
                }
            }
        }
        
        // Initial sizing
        resizeCanvas();
        
        // Resize on window change with debouncing
        var resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 100);
        });
        
        // Setup pan and zoom controls
        setupCanvasControls(canvas);
        
        return resizeCanvas;
    }
    
    function setupCanvasControls(canvas) {
        // Mouse wheel zoom
        canvas.addEventListener('wheel', function(e) {
            e.preventDefault();
            
            var rect = canvas.getBoundingClientRect();
            var mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
            var mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
            
            var zoomDelta = e.deltaY < 0 ? 1.1 : 0.9;
            var newZoom = canvasViewport.zoom * zoomDelta;
            
            // Clamp zoom
            newZoom = Math.max(canvasViewport.minZoom, Math.min(canvasViewport.maxZoom, newZoom));
            
            // Zoom towards mouse position
            var zoomRatio = newZoom / canvasViewport.zoom;
            canvasViewport.offsetX = mouseX - (mouseX - canvasViewport.offsetX) * zoomRatio;
            canvasViewport.offsetY = mouseY - (mouseY - canvasViewport.offsetY) * zoomRatio;
            
            canvasViewport.zoom = newZoom;
            updateZoomIndicator();
            
            if (network) {
                network.render();
            }
        });
        
        // Middle mouse button or space+drag for panning
        var spacePressed = false;
        
        window.addEventListener('keydown', function(e) {
            if (e.code === 'Space' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                spacePressed = true;
                canvas.style.cursor = 'grab';
            }
        });
        
        window.addEventListener('keyup', function(e) {
            if (e.code === 'Space') {
                spacePressed = false;
                canvas.style.cursor = 'default';
                canvasViewport.isDragging = false;
            }
        });
        
        canvas.addEventListener('mousedown', function(e) {
            if (e.button === 1 || (e.button === 0 && spacePressed)) { // Middle button or space+left
                e.preventDefault();
                canvasViewport.isDragging = true;
                canvasViewport.lastX = e.clientX;
                canvasViewport.lastY = e.clientY;
                canvas.style.cursor = 'grabbing';
            }
        });
        
        window.addEventListener('mousemove', function(e) {
            if (canvasViewport.isDragging) {
                var deltaX = e.clientX - canvasViewport.lastX;
                var deltaY = e.clientY - canvasViewport.lastY;
                
                canvasViewport.offsetX += deltaX;
                canvasViewport.offsetY += deltaY;
                
                canvasViewport.lastX = e.clientX;
                canvasViewport.lastY = e.clientY;
                
                if (network) {
                    network.render();
                }
            }
        });
        
        window.addEventListener('mouseup', function(e) {
            if (e.button === 1 || e.button === 0) {
                canvasViewport.isDragging = false;
                if (spacePressed) {
                    canvas.style.cursor = 'grab';
                } else {
                    canvas.style.cursor = 'default';
                }
            }
        });

        // Add hover detection to show pointer cursor over packets
        canvas.addEventListener('mousemove', function(e) {
            if (!network || !network.getLinks) return;

            var rect = canvas.getBoundingClientRect();
            var scaleX = canvas.width / rect.width;
            var scaleY = canvas.height / rect.height;
            var x = (e.clientX - rect.left) * scaleX;
            var y = (e.clientY - rect.top) * scaleY;
            var networkX = (x - canvasViewport.offsetX) / canvasViewport.zoom;
            var networkY = (y - canvasViewport.offsetY) / canvasViewport.zoom;

            var overPacket = false;
            var links = network.getLinks();

            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                var messageCount = link.getMessageCount();
                for (var j = 0; j < messageCount; j++) {
                    if (link.messageHasCoords(j, networkX, networkY)) {
                        overPacket = true;
                        break;
                    }
                }
                if (overPacket) break;
            }

            canvas.style.cursor = overPacket ? 'pointer' : (spacePressed ? 'grab' : 'default');
        });

        // Add click handler for packet inspection with larger click area
        canvas.addEventListener('click', function(e) {
            // Don't handle clicks if we were panning
            if (canvasViewport.isDragging) return;

            // Don't handle if space is pressed (pan mode)
            if (spacePressed) return;

            // Get canvas coordinates accounting for viewport
            var rect = canvas.getBoundingClientRect();
            var scaleX = canvas.width / rect.width;
            var scaleY = canvas.height / rect.height;
            var x = (e.clientX - rect.left) * scaleX;
            var y = (e.clientY - rect.top) * scaleY;

            // Transform to network coordinates (accounting for zoom/pan)
            var networkX = (x - canvasViewport.offsetX) / canvasViewport.zoom;
            var networkY = (y - canvasViewport.offsetY) / canvasViewport.zoom;

            // Check if click was on a packet (with larger hit area)
            if (network && packetInspector) {
                var links = network.getLinks();
                var clickRadius = 20; // Larger click area for easier targeting

                for (var i = 0; i < links.length; i++) {
                    var link = links[i];
                    var messageCount = link.getMessageCount();

                    for (var j = 0; j < messageCount; j++) {
                        // Get message position
                        var message = link.getMessage(j);
                        var img = message.getImage();

                        // Check with expanded bounds for easier clicking
                        // Original bounds check
                        if (link.messageHasCoords(j, networkX, networkY)) {
                            packetInspector.inspectMessage(message);
                            e.stopPropagation();
                            return;
                        }

                        // Also check with expanded hit area (20px radius around packet)
                        for (var dx = -clickRadius; dx <= clickRadius; dx += 5) {
                            for (var dy = -clickRadius; dy <= clickRadius; dy += 5) {
                                if (Math.sqrt(dx*dx + dy*dy) <= clickRadius) {
                                    if (link.messageHasCoords(j, networkX + dx, networkY + dy)) {
                                        packetInspector.inspectMessage(message);
                                        e.stopPropagation();
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    function updateZoomIndicator() {
        var indicator = document.getElementById('zoomLevel');
        if (indicator) {
            indicator.textContent = Math.round(canvasViewport.zoom * 100) + '%';
        }
    }
    
    function zoomIn() {
        canvasViewport.zoom = Math.min(canvasViewport.zoom * 1.2, canvasViewport.maxZoom);
        updateZoomIndicator();
        if (network) network.render();
    }
    
    // Toggle labels dropdown menu
    function toggleLabelsMenu(event) {
        if (event) event.stopPropagation();
        var dropdown = document.getElementById('labelsDropdown');
        if (dropdown.style.display === 'none') {
            // Update checkboxes before showing
            updateLabelCheckboxes();
            dropdown.style.display = 'block';
            
            // Close when clicking outside
            setTimeout(function() {
                document.addEventListener('click', closeLabelsMenu);
            }, 100);
        } else {
            closeLabelsMenu();
        }
    }
    
    function closeLabelsMenu() {
        var dropdown = document.getElementById('labelsDropdown');
        dropdown.style.display = 'none';
        document.removeEventListener('click', closeLabelsMenu);
    }
    
    // Update checkbox states
    function updateLabelCheckboxes() {
        var deviceCheck = document.getElementById('deviceLabelsCheck');
        var linkCheck = document.getElementById('linkLabelsCheck');
        if (deviceCheck) deviceCheck.checked = showDeviceLabels;
        if (linkCheck) linkCheck.checked = showLinkLabels;
    }
    
    // Toggle device labels (names and IPs)
    function toggleDeviceLabels() {
        showDeviceLabels = !showDeviceLabels;
        localStorage.setItem('networkSimShowDeviceLabels', showDeviceLabels);
        updateLabelCheckboxes();
        updateLabelsButtonAppearance();
        if (network) network.render();
    }
    
    // Toggle link interface labels
    function toggleLinkLabels() {
        showLinkLabels = !showLinkLabels;
        localStorage.setItem('networkSimShowLinkLabels', showLinkLabels);
        updateLabelCheckboxes();
        updateLabelsButtonAppearance();
        if (network) network.render();
    }
    
    // Toggle all labels at once
    function toggleAllLabels(show) {
        showDeviceLabels = show;
        showLinkLabels = show;
        localStorage.setItem('networkSimShowDeviceLabels', showDeviceLabels);
        localStorage.setItem('networkSimShowLinkLabels', showLinkLabels);
        updateLabelCheckboxes();
        updateLabelsButtonAppearance();
        if (network) network.render();
    }
    
    // Update button appearance based on label states
    function updateLabelsButtonAppearance() {
        var btn = document.getElementById('labelsMenuButton');
        if (btn) {
            if (showDeviceLabels || showLinkLabels) {
                // At least one type of label is shown - use blue background
                btn.style.background = 'rgba(102,126,234,0.3)';
                btn.onmouseout = function() { this.style.background='rgba(102,126,234,0.3)'; };
            } else {
                // No labels shown - use gray background
                btn.style.background = 'rgba(255,255,255,0.1)';
                btn.onmouseout = function() { this.style.background='rgba(255,255,255,0.1)'; };
            }
        }
    }
    
    function zoomOut() {
        canvasViewport.zoom = Math.max(canvasViewport.zoom / 1.2, canvasViewport.minZoom);
        updateZoomIndicator();
        if (network) network.render();
    }
    
    function resetView() {
        canvasViewport.zoom = 1;
        canvasViewport.offsetX = 0;
        canvasViewport.offsetY = 0;
        updateZoomIndicator();
        if (network) network.render();
    }
    
    function fitToScreen() {
        if (!network) return;
        
        // Get bounds of all network elements
        var bounds = network.getBounds();
        if (!bounds) {
            resetView();
            return;
        }
        
        var canvas = document.getElementById("simcanvas");
        var padding = 50;
        
        var scaleX = (canvas.width - padding * 2) / bounds.width;
        var scaleY = (canvas.height - padding * 2) / bounds.height;
        canvasViewport.zoom = Math.min(scaleX, scaleY, 1);
        
        canvasViewport.offsetX = (canvas.width - bounds.width * canvasViewport.zoom) / 2 - bounds.minX * canvasViewport.zoom;
        canvasViewport.offsetY = (canvas.height - bounds.height * canvasViewport.zoom) / 2 - bounds.minY * canvasViewport.zoom;
        
        updateZoomIndicator();
        network.render();
    }

    // Firewall-specific functions
    // Firewall functions are now properly implemented in Firewall.js
    // The UI dialogs provide a better experience than alerts
    
    // Submenu toggle function for expandable menus with viewport awareness
    function toggleSubmenu(submenuId) {
        var itemsDiv = document.getElementById(submenuId + '_items');
        var arrowSpan = document.getElementById(submenuId + '_arrow');
        
        if (itemsDiv && arrowSpan) {
            if (itemsDiv.style.display === 'none') {
                itemsDiv.style.display = 'block';
                arrowSpan.innerHTML = '▼';
                
                // After expanding, check if menu goes off screen
                var menuDiv = itemsDiv.closest('[id^="uimenu_"]');
                if (menuDiv) {
                    var rect = menuDiv.getBoundingClientRect();
                    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                    
                    // If menu bottom goes below viewport, adjust position
                    if (rect.bottom > viewportHeight - 10) {
                        var currentTop = parseInt(menuDiv.style.top) || 0;
                        var overflow = rect.bottom - (viewportHeight - 10);
                        var newTop = Math.max(10, currentTop - overflow);
                        menuDiv.style.top = newTop + 'px';
                        
                        // If still doesn't fit, add scrolling
                        if (rect.height > viewportHeight - 20) {
                            menuDiv.style.maxHeight = (viewportHeight - 20) + 'px';
                            menuDiv.style.overflowY = 'auto';
                            menuDiv.style.overflowX = 'hidden';
                        }
                    }
                }
            } else {
                itemsDiv.style.display = 'none';
                arrowSpan.innerHTML = '▶';
            }
        }
    }
    
    function toggleServerMenu() {
        var menu = document.getElementById('serverMenu');
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
    
    function toggleDeviceMenu() {
        var menu = document.getElementById('deviceMenu');
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
    
    function toggleFileMenu() {
        var menu = document.getElementById('fileMenu');
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
    
    // Close dropdown menus when clicking outside
    document.addEventListener('click', function(event) {
        // Check if click is outside all dropdown menus
        var fileMenu = document.getElementById('fileMenu');
        var serverMenu = document.getElementById('serverMenu');
        var deviceMenu = document.getElementById('deviceMenu');
        
        // Close file menu if clicking outside
        if (fileMenu && fileMenu.style.display === 'block') {
            var fileButton = event.target.closest('[onclick*="toggleFileMenu"]');
            var fileDropdown = event.target.closest('#fileMenu');
            if (!fileButton && !fileDropdown) {
                fileMenu.style.display = 'none';
            }
        }
        
        // Close server menu if clicking outside
        if (serverMenu && serverMenu.style.display === 'block') {
            var serverButton = event.target.closest('[onclick*="toggleServerMenu"]');
            var serverDropdown = event.target.closest('#serverMenu');
            if (!serverButton && !serverDropdown) {
                serverMenu.style.display = 'none';
            }
        }
        
        // Close device menu if clicking outside
        if (deviceMenu && deviceMenu.style.display === 'block') {
            var deviceButton = event.target.closest('[onclick*="toggleDeviceMenu"]');
            var deviceDropdown = event.target.closest('#deviceMenu');
            if (!deviceButton && !deviceDropdown) {
                deviceMenu.style.display = 'none';
            }
        }
    });
    
    // Function to create a new device with specific type
    function newDeviceElement(deviceType) {
        // Calculate position accounting for viewport
        var x = 100;
        var y = 100;
        
        if (typeof canvasViewport !== 'undefined') {
            // Place new elements at center of current view
            var canvas = document.getElementById("simcanvas");
            if (canvas) {
                x = (canvas.width / 2 - canvasViewport.offsetX) / canvasViewport.zoom;
                y = (canvas.height / 2 - canvasViewport.offsetY) / canvasViewport.zoom;
            }
        }
        
        // Create computer with device type
        network.createComputerWithType(x, y, deviceType);
        
        // Mark network as changed for auto-save
        if (typeof markAsChanged === 'function') {
            markAsChanged();
        }
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#serverMenu') && !e.target.closest('[onclick*="toggleServerMenu"]')) {
            document.getElementById('serverMenu').style.display = 'none';
        }
        if (!e.target.closest('#deviceMenu') && !e.target.closest('[onclick*="toggleDeviceMenu"]')) {
            document.getElementById('deviceMenu').style.display = 'none';
        }
    });

    // Track changes to the network
    function markAsChanged() {
        hasUnsavedChanges = true;
        // // console.log('Network changed - will auto-save in next cycle');
    }
    
    // Hook into network events to detect changes
    // Override the original network functions to track changes
    if (typeof window.newElement !== 'undefined') {
        var originalNewElement = window.newElement;
        window.newElement = function() {
            var result = originalNewElement.apply(this, arguments);
            markAsChanged();
            return result;
        };
    }
    
    // More targeted change detection
    var isDragging = false;
    document.addEventListener('mousedown', function() {
        isDragging = true;
    });
    
    document.addEventListener('mouseup', function() {
        // Only mark as changed if we were dragging (likely moved something)
        if (isDragging && network && currentProjectId) {
            setTimeout(function() {
                // Small delay to let the network update
                markAsChanged();
            }, 100);
        }
        isDragging = false;
    });

    // Function to view intercepted traffic from rogue DHCP server
    function viewInterceptedTraffic(hostId) {
        var host = network.getElement(hostId);
        if (!host) return;
        
        var dhcpServer = host.getApp("DHCPServer");
        if (!dhcpServer || !dhcpServer.isRogue()) {
            alert("This DHCP server is not in rogue mode");
            return;
        }
        
        var traffic = dhcpServer.getInterceptedTraffic();
        var content = '<div style="max-height:400px;overflow-y:auto;">';
        
        if (traffic.length === 0) {
            content += '<p style="text-align:center;color:#999;">No intercepted traffic yet.<br/>Traffic will appear here when compromised hosts make HTTP/HTTPS requests.</p>';
        } else {
            content += '<h3 style="color:#f44336;">🔴 Intercepted Network Traffic</h3>';
            content += '<div style="font-size:11px;">';
            
            traffic.forEach(function(entry, index) {
                // Different styling for encrypted vs unencrypted traffic
                var bgColor = entry.isEncrypted ? '#e8f5e9' : '#fff3e0';
                var borderColor = entry.isEncrypted ? '#4caf50' : '#ff9800';
                var titleColor = entry.isEncrypted ? '#2e7d32' : '#e65100';
                
                content += '<div style="margin-bottom:15px;padding:10px;background:' + bgColor + ';border:1px solid ' + borderColor + ';border-radius:4px;">';
                content += '<div style="color:' + titleColor + ';font-weight:bold;">';
                content += 'Entry #' + (index + 1) + ' - ' + entry.timestamp;
                if (entry.isEncrypted) {
                    content += ' <span style="background:#4caf50;color:white;padding:2px 6px;border-radius:3px;margin-left:10px;">🔒 HTTPS</span>';
                } else {
                    content += ' <span style="background:#ff9800;color:white;padding:2px 6px;border-radius:3px;margin-left:10px;">⚠️ HTTP</span>';
                }
                content += '</div>';
                content += '<div>Source: ' + entry.sourceIP + ' → Dest: ' + entry.destIP + ' (Port ' + (entry.port || 80) + ')</div>';
                content += '<div>URL: <span style="color:#1976d2;">' + (entry.url || 'N/A') + '</span></div>';
                content += '<div>Method: ' + entry.method + '</div>';
                
                if (entry.isEncrypted) {
                    // HTTPS traffic - show encryption notice
                    content += '<div style="margin-top:8px;padding:8px;background:#c8e6c9;border:1px solid #81c784;border-radius:3px;">';
                    content += '<strong style="color:#2e7d32;">🔒 HTTPS Encrypted Traffic</strong><br/>';
                    content += '<span style="color:#555;font-size:10px;">' + (entry.warning || 'End-to-end encryption prevents content inspection') + '</span><br/>';
                    content += '<div style="margin-top:5px;font-family:monospace;background:#f1f8e9;padding:5px;border-radius:3px;color:#666;">';
                    content += entry.body || '[ENCRYPTED DATA]';
                    content += '</div>';
                    content += '<div style="margin-top:5px;color:#666;font-size:10px;">';
                    content += '💡 <b>Educational Note:</b> HTTPS uses TLS/SSL encryption. Without the private key or a certificate attack, ';
                    content += 'a MITM attacker can only see that communication is happening, not the actual content.';
                    content += '</div>';
                    content += '</div>';
                } else {
                    // HTTP traffic - show actual content
                    if (entry.credentials) {
                        content += '<div style="margin-top:5px;padding:5px;background:#ffebee;border:1px solid #ef5350;border-radius:3px;">';
                        content += '<strong style="color:#c62828;">⚠️ Captured Credentials:</strong><br/>';
                        content += 'Type: ' + entry.credentials.type + '<br/>';
                        content += 'Username: <b>' + entry.credentials.username + '</b><br/>';
                        content += 'Password: <b>' + (entry.credentials.password || '[empty]') + '</b>';
                        content += '</div>';
                    }
                    
                    if (entry.headers && Object.keys(entry.headers).length > 0) {
                        content += '<details style="margin-top:5px;"><summary style="cursor:pointer;">Headers (Visible in HTTP)</summary>';
                        content += '<pre style="font-size:10px;background:#f5f5f5;padding:5px;border-radius:3px;">';
                        content += JSON.stringify(entry.headers, null, 2);
                        content += '</pre></details>';
                    }
                    
                    if (entry.body) {
                        content += '<details style="margin-top:5px;"><summary style="cursor:pointer;">Body Content</summary>';
                        content += '<pre style="font-size:10px;background:#f5f5f5;padding:5px;border-radius:3px;max-height:100px;overflow:auto;">';
                        content += entry.body;
                        content += '</pre></details>';
                    }
                }
                
                content += '</div>';
            });
            
            content += '</div>';
        }
        
        content += '</div>';
        
        var w = new UIWindow('divintercepted', 'Intercepted Traffic (MITM)', 600, 500, false, 1.0);
        w.setContent(content);
        w.setControls('<button onclick="uimanager.getWindow(\'divintercepted\').dispose()">Close</button>');
        w.render();
    }
    
    // Function to view compromised hosts
    function viewCompromisedHosts(hostId) {
        var host = network.getElement(hostId);
        if (!host) return;
        
        var dhcpServer = host.getApp("DHCPServer");
        if (!dhcpServer || !dhcpServer.getCompromisedHosts) return;
        
        var compromisedHosts = dhcpServer.getCompromisedHosts();
        
        var content = '<div style="padding:10px;">';
        content += '<h3 style="color:#f44336;">🎯 Compromised Hosts</h3>';
        content += '<p style="font-size:12px;color:#666;">Hosts that received poisoned DHCP configuration from this rogue server:</p>';
        
        if (compromisedHosts.length === 0) {
            content += '<div style="text-align:center;padding:30px;color:#999;">';
            content += '<div style="font-size:48px;">🔍</div>';
            content += '<p>No compromised hosts yet.</p>';
            content += '<p style="font-size:11px;">Hosts will appear here after they request DHCP configuration.</p>';
            content += '</div>';
        } else {
            content += '<table style="width:100%;border-collapse:collapse;margin-top:15px;">';
            content += '<tr style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;">';
            content += '<th style="padding:10px;border:1px solid #ddd;text-align:left;">Host IP</th>';
            content += '<th style="padding:10px;border:1px solid #ddd;text-align:left;">MAC Address</th>';
            content += '<th style="padding:10px;border:1px solid #ddd;text-align:left;">Poisoned Gateway</th>';
            content += '<th style="padding:10px;border:1px solid #ddd;text-align:left;">Status</th>';
            content += '</tr>';
            
            compromisedHosts.forEach(function(host, index) {
                var rowColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';
                content += '<tr style="background:' + rowColor + ';">';
                content += '<td style="padding:8px;border:1px solid #ddd;font-family:monospace;font-size:12px;">' + host.ip + '</td>';
                content += '<td style="padding:8px;border:1px solid #ddd;font-family:monospace;font-size:11px;">' + host.mac + '</td>';
                content += '<td style="padding:8px;border:1px solid #ddd;font-family:monospace;font-size:12px;color:#f44336;">' + host.poisonedGateway + '</td>';
                content += '<td style="padding:8px;border:1px solid #ddd;">';
                content += '<span style="background:#4caf50;color:white;padding:2px 6px;border-radius:3px;font-size:10px;">COMPROMISED</span>';
                content += '</td>';
                content += '</tr>';
            });
            
            content += '</table>';
            
            content += '<div style="margin-top:15px;padding:10px;background:#fff3e0;border:1px solid #ff9800;border-radius:4px;">';
            content += '<strong style="color:#e65100;">⚠️ Security Notice:</strong><br/>';
            content += '<span style="font-size:11px;">These hosts are now routing their traffic through the rogue DHCP server. ';
            content += 'All HTTP traffic from these hosts can be intercepted and logged.</span>';
            content += '</div>';
        }
        
        content += '</div>';
        
        var w = new UIWindow('divcompromised', 'Compromised Hosts - MITM Attack', 600, 450, false, 1.0);
        w.setContent(content);
        w.setControls('<button onclick="uimanager.getWindow(\'divcompromised\').dispose()" style="padding:8px 20px;">Close</button>');
        w.render();
    }
    
    // Initialize Template Manager
    var templateManager = null;
    
    // Initialize after network is created
    function initializeTemplateManager() {
        if (network && !templateManager) {
            templateManager = new TemplateManager(network);
            
            // Load templates from JSON file if available
            loadTemplatesFromFile();
        }
    }
    
    // Load templates from external JSON file
    var templatesLoadedPromise = null;
    function loadTemplatesFromFile() {
        if (!templatesLoadedPromise) {
            templatesLoadedPromise = fetch('templates/network-templates.json?v=' + Date.now())
                .then(response => response.json())
                .then(data => {
                    if (templateManager && data.templates) {
                        for (var id in data.templates) {
                            templateManager.registerTemplate(id, data.templates[id]);
                        }
                        console.log('Loaded ' + Object.keys(data.templates).length + ' templates from file');
                    }
                    return data;
                })
                .catch(error => {
                    console.error('Could not load external templates:', error);
                    return null;
                });
        }
        return templatesLoadedPromise;
    }
    
    // Export current network as template
    function exportAsTemplate() {
        var name = prompt('Enter template name:');
        if (!name) return;
        
        var description = prompt('Enter template description:');
        if (!description) return;
        
        if (!templateManager) {
            initializeTemplateManager();
        }
        
        var template = templateManager.exportCurrentAsTemplate(name, description, {
            author: 'User',
            category: 'custom'
        });
        
        // Save to localStorage
        templateManager.registerTemplate(template.id, template);
        templateManager.saveTemplateToStorage(template.id);
        
        // Download as JSON
        var dataStr = JSON.stringify(template, null, 2);
        var dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        var exportFileDefaultName = 'template_' + template.id + '.json';
        
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showToast('Template exported successfully!', 'success');
    }

    // Share preview - generate shareable link
    async function sharePreview() {
        // Check if there's a current project
        if (!currentProjectId) {
            showToast('Please save your project first before sharing', 'error');
            return;
        }

        try {
            // Generate hash for the preview URL (matching the PHP salt)
            const hash = await generatePreviewHash(currentProjectId);
            const baseUrl = window.location.origin + window.location.pathname.replace('index.php', '');
            const shareUrl = baseUrl + 'share.php?hash=' + hash;

            // Copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(shareUrl);
                showToast('Preview link copied to clipboard!', 'success');
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = shareUrl;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast('Preview link copied to clipboard!', 'success');
                } catch (err) {
                    // If copy fails, just open the preview without clipboard
                    console.warn('Clipboard copy failed, opening preview directly');
                }
                document.body.removeChild(textArea);
            }

            // Open preview in new tab
            window.open(shareUrl, '_blank');

        } catch (error) {
            console.error('Error generating share link:', error);
            showToast('Failed to generate share link', 'error');
        }
    }

    // Generate preview hash (matching the PHP implementation)
    async function generatePreviewHash(projectId) {
        const salt = 'networksim_share_salt_2025';
        const data = projectId + salt;

        // Use Web Crypto API for SHA-256
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        return hashHex;
    }

    // Legacy network templates for backward compatibility
    var networkTemplates = {
        'basic_lan': {
            name: '🏠 Basic Home Network',
            description: 'Simple home network with router, switch, and PCs',
            difficulty: 'Beginner',
            category: 'Basic',
            data: '{"version":2,"elements":[{"type":"router","x":400,"y":200,"name":"Home Router","ips":["192.168.1.1","10.0.0.1"]},{"type":"switch","x":400,"y":350,"name":"LAN Switch"},{"type":"host","x":200,"y":500,"name":"PC 1"},{"type":"host","x":400,"y":500,"name":"PC 2"},{"type":"host","x":600,"y":500,"name":"PC 3"}],"connections":[{"from":0,"to":1},{"from":1,"to":2},{"from":1,"to":3},{"from":1,"to":4}]}'
        }
        // Other templates temporarily disabled - implementation needs fixing
        /*
        'mitm_attack': {
            name: '🔴 MITM Attack Demo',
            description: 'Rogue DHCP server performing man-in-the-middle attack',
            difficulty: 'Advanced',
            category: 'Security',
            data: '{"version":2,"elements":[{"type":"router","x":400,"y":100,"name":"Internet Gateway","ips":["10.0.0.1"]},{"type":"switch","x":400,"y":250,"name":"Network Switch"},{"type":"host","x":200,"y":400,"name":"Victim PC"},{"type":"host","x":600,"y":400,"name":"Attacker PC","dhcp":{"mode":"rogue","gateway":"poisoned"}},{"type":"web","x":400,"y":50,"name":"Web Server","ip":"10.0.0.100"}],"connections":[{"from":0,"to":1},{"from":1,"to":2},{"from":1,"to":3},{"from":0,"to":4}]}'
        },
        'dmz_network': {
            name: '🛡️ DMZ Network',
            description: 'Network with DMZ for web server using firewall',
            difficulty: 'Intermediate',
            category: 'Security',
            data: '{"version":2,"elements":[{"type":"router","x":400,"y":50,"name":"ISP Router"},{"type":"firewall","x":400,"y":200,"name":"Corporate Firewall"},{"type":"switch","x":250,"y":350,"name":"DMZ Switch"},{"type":"switch","x":550,"y":350,"name":"LAN Switch"},{"type":"web","x":250,"y":500,"name":"Public Web Server"},{"type":"host","x":550,"y":500,"name":"Employee PC"}],"connections":[{"from":0,"to":1,"port":0},{"from":1,"to":2,"port":2},{"from":1,"to":3,"port":1},{"from":2,"to":4},{"from":3,"to":5}]}'
        },
        'corporate_network': {
            name: '🏢 Corporate Network',
            description: 'Enterprise network with DHCP, DNS, and multiple VLANs',
            difficulty: 'Advanced',
            category: 'Enterprise',
            data: '{"version":2,"elements":[{"type":"router","x":400,"y":50,"name":"Core Router"},{"type":"firewall","x":400,"y":150,"name":"Firewall"},{"type":"switch","x":400,"y":250,"name":"Core Switch"},{"type":"dhcp","x":200,"y":350,"name":"DHCP Server"},{"type":"dns","x":300,"y":350,"name":"DNS Server"},{"type":"web","x":500,"y":350,"name":"Intranet Server"},{"type":"switch","x":200,"y":450,"name":"Sales Switch"},{"type":"switch","x":600,"y":450,"name":"IT Switch"},{"type":"host","x":150,"y":550,"name":"Sales PC 1"},{"type":"host","x":250,"y":550,"name":"Sales PC 2"},{"type":"host","x":550,"y":550,"name":"IT PC 1"},{"type":"host","x":650,"y":550,"name":"IT PC 2"}],"connections":[{"from":0,"to":1},{"from":1,"to":2},{"from":2,"to":3},{"from":2,"to":4},{"from":2,"to":5},{"from":2,"to":6},{"from":2,"to":7},{"from":6,"to":8},{"from":6,"to":9},{"from":7,"to":10},{"from":7,"to":11}]}'
        },
        'arp_poisoning': {
            name: '☠️ ARP Poisoning Attack',
            description: 'Demonstration of ARP cache poisoning attack',
            difficulty: 'Advanced',
            category: 'Security',
            data: '{"version":2,"elements":[{"type":"router","x":400,"y":100,"name":"Gateway","ip":"192.168.1.1"},{"type":"switch","x":400,"y":250,"name":"LAN Switch"},{"type":"host","x":200,"y":400,"name":"Victim","ip":"192.168.1.100"},{"type":"host","x":600,"y":400,"name":"Attacker","ip":"192.168.1.200","arp_poison":true},{"type":"host","x":400,"y":400,"name":"Target Server","ip":"192.168.1.50"}],"connections":[{"from":0,"to":1},{"from":1,"to":2},{"from":1,"to":3},{"from":1,"to":4}]}'
        },
        'wireless_network': {
            name: '📶 Wireless Network',
            description: 'WiFi network with access point and mixed devices',
            difficulty: 'Beginner',
            category: 'Basic',
            data: '{"version":2,"elements":[{"type":"router","x":400,"y":100,"name":"ISP Router"},{"type":"router","x":400,"y":250,"name":"WiFi Router","wifi":true},{"type":"host","x":200,"y":400,"name":"Laptop 1","wifi":true},{"type":"host","x":400,"y":400,"name":"Laptop 2","wifi":true},{"type":"host","x":600,"y":400,"name":"Desktop PC","wifi":false}],"connections":[{"from":0,"to":1},{"from":1,"to":2,"wireless":true},{"from":1,"to":3,"wireless":true},{"from":1,"to":4}]}'
        }
        */
    };
    
    async function showTemplatesModal() {
        // Initialize template manager if needed
        if (!templateManager) {
            initializeTemplateManager();
        }

        // Wait for templates to load from JSON file
        if (templatesLoadedPromise) {
            await templatesLoadedPromise;
        }

        var content = '<div style="background:#1a1d2e;color:#e4e4e7;height:100%;overflow-y:auto;">';
        content += '<div style="padding:20px 20px 10px 20px;">';
        content += '<h2 style="margin-bottom:10px;color:#ffffff;">🎯 Network Templates</h2>';
        content += '<p style="color:#9ca3af;margin-bottom:15px;">Select a pre-built network scenario to load. This will replace your current network!</p>';

        // Add export button
        content += '<div style="margin-bottom:15px;">';
        content += '<button onclick="exportAsTemplate()" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:12px;margin-right:10px;">📤 Export Current Network as Template</button>';
        content += '<button onclick="loadTemplateFile()" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:12px;">📂 Import Template</button>';
        content += '</div>';
        content += '</div>';

        // Get templates from both sources
        var allTemplates = {};

        // Add legacy templates
        for (var key in networkTemplates) {
            allTemplates[key] = networkTemplates[key];
        }

        // Add templates from TemplateManager if available
        if (templateManager) {
            var managerTemplates = templateManager.getAllTemplates();
            console.log('Templates from manager:', Object.keys(managerTemplates));
            for (var key in managerTemplates) {
                allTemplates[key] = managerTemplates[key];
            }
        }
        
        // Group templates by category
        var categories = {};
        for (var key in allTemplates) {
            var template = allTemplates[key];
            var cat = template.category || 'Other';
            if (!categories[cat]) categories[cat] = [];
            template.id = template.id || key;
            categories[cat].push(template);
        }
        
        // Display templates by category
        for (var category in categories) {
            var categoryTemplates = categories[category];
            var categoryColor = category === 'security' ? '#ff5252' : 
                              category === 'enterprise' ? '#4caf50' : 
                              category === 'educational' ? '#ff9800' :
                              category === 'custom' ? '#9c27b0' : '#2196f3';
            
            content += '<div style="padding:0 20px;">';
            content += '<h3 style="color:' + categoryColor + ';margin:15px 0 10px 0;font-size:14px;text-transform:uppercase;letter-spacing:1px;">' + category + '</h3>';
            content += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:15px;margin-bottom:20px;">';
            
            for (var i = 0; i < categoryTemplates.length; i++) {
                var template = categoryTemplates[i];
                
                content += '<div style="background:#2a2a3e;border:1px solid #444;border-radius:8px;padding:15px;cursor:pointer;transition:all 0.3s;" ';
                content += 'onmouseover="this.style.background=\'#3a3a4e\';this.style.transform=\'translateY(-2px)\';this.style.borderColor=\'#667eea\'" ';
                content += 'onmouseout="this.style.background=\'#2a2a3e\';this.style.transform=\'translateY(0)\';this.style.borderColor=\'#444\'" ';
                content += 'onclick="confirmLoadTemplate(\'' + template.id + '\')">';
                
                content += '<div style="font-size:18px;font-weight:bold;margin-bottom:8px;color:#ffffff;">' + template.name + '</div>';
                content += '<div style="font-size:12px;color:#999;margin-bottom:8px;">' + template.description + '</div>';
                content += '<div style="display:flex;justify-content:space-between;align-items:center;">';
                content += '<span style="background:' + categoryColor + ';color:white;padding:2px 8px;border-radius:4px;font-size:10px;">' + category + '</span>';
                content += '<span style="color:#ff9800;font-size:11px;">' + (template.difficulty || 'Custom') + '</span>';
                content += '</div>';
                if (template.author) {
                    content += '<div style="font-size:10px;color:#666;margin-top:5px;">by ' + template.author + '</div>';
                }
                content += '</div>';
            }
            
            content += '</div>';
            content += '</div>';
        }
        
        content += '</div>';
        
        var w = new UIWindow('divtemplates', 'Network Templates', 750, 600, false, 1.0);
        w.setContent(content);
        w.setControls('<button onclick="uimanager.getWindow(\'divtemplates\').dispose()" style="padding:8px 20px;">Close</button>');
        w.render();
    }
    
    // Function to load template from file
    function loadTemplateFile() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = function(e) {
            var file = e.target.files[0];
            if (!file) return;
            
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    var template = JSON.parse(e.target.result);
                    if (!templateManager) {
                        initializeTemplateManager();
                    }
                    
                    // Register the template
                    var id = template.id || 'imported_' + Date.now();
                    templateManager.registerTemplate(id, template);
                    templateManager.saveTemplateToStorage(id);
                    
                    showToast('Template imported successfully!', 'success');
                    
                    // Refresh the modal
                    var templatesWindow = uimanager.getWindow('divtemplates');
                    if (templatesWindow) {
                        templatesWindow.dispose();
                        showTemplatesModal();
                    }
                } catch (error) {
                    showToast('Error importing template: ' + error.message, 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }
    
    function confirmLoadTemplate(templateKey) {
        // Try to get template from template manager first
        var template = null;
        if (templateManager) {
            template = templateManager.getTemplate(templateKey);
        }
        
        // Fall back to legacy templates
        if (!template) {
            template = networkTemplates[templateKey];
        }
        
        if (!template) {
            showToast('Template not found', 'error');
            return;
        }
        
        // Create confirmation dialog
        var confirmDiv = document.createElement('div');
        confirmDiv.id = 'templateConfirm';
        confirmDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:10000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s ease;';
        
        var dialog = '<div style="background:#1a1d2e;border:2px solid #667eea;border-radius:12px;padding:30px;max-width:450px;animation:slideDown 0.3s ease;">';
        dialog += '<h3 style="color:#ffffff;margin-bottom:15px;">⚠️ Load Template?</h3>';
        dialog += '<p style="color:#9ca3af;margin-bottom:20px;">Loading the <strong style="color:#667eea;">' + template.name + '</strong> template will replace your current network. This action cannot be undone.</p>';
        dialog += '<div style="display:flex;gap:10px;justify-content:flex-end;">';
        dialog += '<button onclick="document.body.removeChild(document.getElementById(\'templateConfirm\'))" style="background:#374151;color:#9ca3af;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:500;">Cancel</button>';
        dialog += '<button onclick="document.body.removeChild(document.getElementById(\'templateConfirm\'));loadTemplate(\'' + templateKey + '\')" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:500;">Load Template</button>';
        dialog += '</div>';
        dialog += '</div>';
        
        confirmDiv.innerHTML = dialog;
        document.body.appendChild(confirmDiv);
    }
    
    function loadTemplate(templateKey) {
        // Close the templates modal
        var templatesWindow = uimanager.getWindow('divtemplates');
        if (templatesWindow) {
            templatesWindow.dispose();
        }
        
        // Check if we can use template manager
        if (templateManager && templateManager.getTemplate(templateKey)) {
            // Properly dispose of the old network to stop its render loop
            if (network && network.dispose) {
                network.dispose();
            }
            
            // Create new network with images
            var ctx = document.getElementById('simcanvas').getContext('2d');
            network = new Network(images, ctx, simcanvas.width, simcanvas.height);
            network.init();
            
            // Re-initialize template manager with new network
            templateManager = new TemplateManager(network);
            templatesLoadedPromise = null; // Reset the promise

            // Apply the template after loading templates
            loadTemplatesFromFile().then(function() {
                if (templateManager.applyTemplate(templateKey, false)) {
                    showToast('Template loaded successfully!', 'success');
                } else {
                    showToast('Error loading template', 'error');
                }
            });
            return;
        }
        
        // Fall back to legacy template loading
        var template = networkTemplates[templateKey];
        if (!template) {
            showToast('Template not found', 'error');
            return;
        }
        
        // Properly dispose of the old network to stop its render loop
        if (network && network.dispose) {
            network.dispose();
        }
        
        // Create new network with images
        var ctx = document.getElementById('simcanvas').getContext('2d');
        network = new Network(images, ctx, simcanvas.width, simcanvas.height);
        network.init();
        
        try {
            // Legacy template loading code
            
            switch(templateKey) {
                case 'basic_lan':
                    // Create realistic home network with router, switch, and various devices
                    var router = network.createRouter(400, 100);
                    var switch1 = network.createSwitch(400, 250, 8);
                    
                    // Create different types of devices for a home
                    var desktop = network.createComputerWithType(200, 400, 'desktop');
                    var laptop = network.createComputerWithType(350, 400, 'laptop');
                    var gaming = network.createComputerWithType(500, 400, 'gaming');
                    var smartTV = network.createComputerWithType(650, 400, 'desktop');  // Using desktop as TV placeholder
                    
                    // Connect everything
                    network.createLink(router, 0, switch1, 0);
                    network.createLink(switch1, 1, desktop, 0);
                    network.createLink(switch1, 2, laptop, 0);
                    network.createLink(switch1, 3, gaming, 0);
                    network.createLink(switch1, 4, smartTV, 0);
                    
                    // Set realistic names
                    var routerElem = network.getElement(router);
                    if (routerElem) {
                        routerElem.setName('Home Router');
                        // Note: DHCP would need to be added via the UI
                    }
                    
                    var switchElem = network.getElement(switch1);
                    if (switchElem) switchElem.setName('Gigabit Switch');
                    
                    var desktopElem = network.getElement(desktop);
                    if (desktopElem) desktopElem.setName('Dad\'s Desktop');
                    
                    var laptopElem = network.getElement(laptop);
                    if (laptopElem) laptopElem.setName('Work Laptop');
                    
                    var gamingElem = network.getElement(gaming);
                    if (gamingElem) gamingElem.setName('Gaming PC');
                    
                    var smartTVElem = network.getElement(smartTV);
                    if (smartTVElem) smartTVElem.setName('Smart TV');
                    break;
                    
                // Templates temporarily disabled - implementation needs fixing
                /*
                case 'mitm_attack':
                    // Create MITM attack demo with rogue DHCP server
                    var gateway = network.createRouter(400, 50);
                    var mainSwitch = network.createSwitch(400, 200, 8);
                    
                    // Legitimate DHCP server
                    var legitServer = network.createComputer(250, 350);
                    
                    // Rogue attacker with DHCP server
                    var attacker = network.createComputerWithType(550, 350, 'laptop');
                    
                    // Victim computers
                    var victim1 = network.createComputerWithType(150, 500, 'desktop');
                    var victim2 = network.createComputerWithType(350, 500, 'laptop');
                    var victim3 = network.createComputerWithType(550, 500, 'desktop');
                    
                    // Connect network
                    network.createLink(gateway, 0, mainSwitch, 0);
                    network.createLink(mainSwitch, 1, legitServer, 0);
                    network.createLink(mainSwitch, 2, attacker, 0);
                    network.createLink(mainSwitch, 3, victim1, 0);
                    network.createLink(mainSwitch, 4, victim2, 0);
                    network.createLink(mainSwitch, 5, victim3, 0);
                    
                    // Configure devices
                    var gatewayElem = network.getElement(gateway);
                    if (gatewayElem) {
                        gatewayElem.setName('Internet Gateway');
                        if (gatewayElem.setRogueMode) {
                            gatewayElem.setRogueMode(true);  // Make it a rogue router
                        }
                    }
                    
                    var switchElem = network.getElement(mainSwitch);
                    if (switchElem) switchElem.setName('Corporate Switch');
                    
                    var legitElem = network.getElement(legitServer);
                    if (legitElem) {
                        legitElem.setName('Legitimate DHCP');
                        // Note: DHCP server needs to be added manually via right-click menu
                    }
                    
                    var attackerElem = network.getElement(attacker);
                    if (attackerElem) {
                        attackerElem.setName('Rogue DHCP Attacker');
                        // Note: Rogue DHCP needs to be configured manually
                    }
                    
                    var victim1Elem = network.getElement(victim1);
                    if (victim1Elem) victim1Elem.setName('Employee PC 1');
                    
                    var victim2Elem = network.getElement(victim2);
                    if (victim2Elem) victim2Elem.setName('Employee Laptop');
                    
                    var victim3Elem = network.getElement(victim3);
                    if (victim3Elem) victim3Elem.setName('Employee PC 2');
                    break;
                    
                case 'dmz_network':
                    // Create proper DMZ network with three zones
                    var ispRouter = network.createRouter(400, 50);
                    var firewall = network.createFirewall(400, 180);
                    
                    // DMZ zone (left)
                    var dmzSwitch = network.createSwitch(200, 320, 8);
                    var webServer = network.createComputerWithType(100, 450, 'desktop');
                    var mailServer = network.createComputerWithType(200, 450, 'desktop');
                    var ftpServer = network.createComputerWithType(300, 450, 'desktop');
                    
                    // LAN zone (right)
                    var lanSwitch = network.createSwitch(600, 320, 8);
                    var employee1 = network.createComputerWithType(500, 450, 'desktop');
                    var employee2 = network.createComputerWithType(600, 450, 'laptop');
                    var employee3 = network.createComputerWithType(700, 450, 'desktop');
                    
                    // Create connections - ISP to Firewall
                    network.createLink(ispRouter, 0, firewall, 0);
                    
                    // DMZ connections
                    network.createLink(firewall, 1, dmzSwitch, 0);
                    network.createLink(dmzSwitch, 1, webServer, 0);
                    network.createLink(dmzSwitch, 2, mailServer, 0);
                    network.createLink(dmzSwitch, 3, ftpServer, 0);
                    
                    // LAN connections
                    network.createLink(firewall, 2, lanSwitch, 0);
                    network.createLink(lanSwitch, 1, employee1, 0);
                    network.createLink(lanSwitch, 2, employee2, 0);
                    network.createLink(lanSwitch, 3, employee3, 0);
                    
                    // Configure devices
                    var ispElem = network.getElement(ispRouter);
                    if (ispElem) ispElem.setName('ISP Router');
                    
                    var firewallElem = network.getElement(firewall);
                    if (firewallElem) firewallElem.setName('Corporate Firewall');
                    
                    var dmzElem = network.getElement(dmzSwitch);
                    if (dmzElem) dmzElem.setName('DMZ Switch');
                    
                    var lanElem = network.getElement(lanSwitch);
                    if (lanElem) lanElem.setName('Internal LAN Switch');
                    
                    // DMZ servers
                    var webElem = network.getElement(webServer);
                    if (webElem) {
                        webElem.setName('Public Web Server');
                        // HTTP Server can be added via right-click menu
                    }
                    
                    var mailElem = network.getElement(mailServer);
                    if (mailElem) {
                        mailElem.setName('Mail Server');
                        // Email Server can be added via right-click menu
                    }
                    
                    var ftpElem = network.getElement(ftpServer);
                    if (ftpElem) ftpElem.setName('FTP Server');
                    
                    // LAN computers
                    var emp1Elem = network.getElement(employee1);
                    if (emp1Elem) emp1Elem.setName('Accounting PC');
                    
                    var emp2Elem = network.getElement(employee2);
                    if (emp2Elem) emp2Elem.setName('HR Laptop');
                    
                    var emp3Elem = network.getElement(employee3);
                    if (emp3Elem) emp3Elem.setName('Manager Desktop');
                    break;
                    
                case 'corporate_network':
                    // Create enterprise network with multiple departments
                    var coreRouter = network.createRouter(400, 50);
                    var coreSwitch = network.createSwitch(400, 150, 24);  // 24-port core switch
                    
                    // Server rack
                    var dhcpServer = network.createComputerWithType(200, 250, 'desktop');
                    var dnsServer = network.createComputerWithType(300, 250, 'desktop');
                    var fileServer = network.createComputerWithType(500, 250, 'desktop');
                    var intranetServer = network.createComputerWithType(600, 250, 'desktop');
                    
                    // Department switches
                    var salesSwitch = network.createSwitch(150, 380, 8);
                    var itSwitch = network.createSwitch(400, 380, 8);
                    var hrSwitch = network.createSwitch(650, 380, 8);
                    
                    // Sales department
                    var salesPC1 = network.createComputerWithType(80, 500, 'desktop');
                    var salesPC2 = network.createComputerWithType(150, 500, 'laptop');
                    var salesPC3 = network.createComputerWithType(220, 500, 'desktop');
                    
                    // IT department
                    var itPC1 = network.createComputerWithType(330, 500, 'desktop');
                    var itPC2 = network.createComputerWithType(400, 500, 'desktop');
                    var itPC3 = network.createComputerWithType(470, 500, 'laptop');
                    
                    // HR department
                    var hrPC1 = network.createComputerWithType(580, 500, 'desktop');
                    var hrPC2 = network.createComputerWithType(650, 500, 'laptop');
                    var hrPC3 = network.createComputerWithType(720, 500, 'desktop');
                    
                    // Core connections
                    network.createLink(coreRouter, 0, coreSwitch, 0);
                    
                    // Server connections
                    network.createLink(coreSwitch, 1, dhcpServer, 0);
                    network.createLink(coreSwitch, 2, dnsServer, 0);
                    network.createLink(coreSwitch, 3, fileServer, 0);
                    network.createLink(coreSwitch, 4, intranetServer, 0);
                    
                    // Department switch connections
                    network.createLink(coreSwitch, 5, salesSwitch, 0);
                    network.createLink(coreSwitch, 6, itSwitch, 0);
                    network.createLink(coreSwitch, 7, hrSwitch, 0);
                    
                    // Sales connections
                    network.createLink(salesSwitch, 1, salesPC1, 0);
                    network.createLink(salesSwitch, 2, salesPC2, 0);
                    network.createLink(salesSwitch, 3, salesPC3, 0);
                    
                    // IT connections
                    network.createLink(itSwitch, 1, itPC1, 0);
                    network.createLink(itSwitch, 2, itPC2, 0);
                    network.createLink(itSwitch, 3, itPC3, 0);
                    
                    // HR connections
                    network.createLink(hrSwitch, 1, hrPC1, 0);
                    network.createLink(hrSwitch, 2, hrPC2, 0);
                    network.createLink(hrSwitch, 3, hrPC3, 0);
                    
                    // Configure names
                    network.getElement(coreRouter) && network.getElement(coreRouter).setName('Core Router');
                    network.getElement(coreSwitch) && network.getElement(coreSwitch).setName('Core Switch');
                    
                    // Servers
                    var dhcpElem = network.getElement(dhcpServer);
                    if (dhcpElem) {
                        dhcpElem.setName('DHCP Server');
                        // DHCP service can be added via right-click menu
                    }
                    
                    var dnsElem = network.getElement(dnsServer);
                    if (dnsElem) {
                        dnsElem.setName('DNS Server');
                        // DNS service can be added via right-click menu
                    }
                    
                    network.getElement(fileServer) && network.getElement(fileServer).setName('File Server');
                    
                    var intranetElem = network.getElement(intranetServer);
                    if (intranetElem) {
                        intranetElem.setName('Intranet');
                        // HTTP Server can be added via right-click menu
                    }
                    
                    // Department switches and PCs
                    network.getElement(salesSwitch) && network.getElement(salesSwitch).setName('Sales Dept Switch');
                    network.getElement(salesPC1) && network.getElement(salesPC1).setName('Sales Desk 1');
                    network.getElement(salesPC2) && network.getElement(salesPC2).setName('Sales Laptop');
                    network.getElement(salesPC3) && network.getElement(salesPC3).setName('Sales Desk 2');
                    
                    network.getElement(itSwitch) && network.getElement(itSwitch).setName('IT Dept Switch');
                    network.getElement(itPC1) && network.getElement(itPC1).setName('Dev Workstation');
                    network.getElement(itPC2) && network.getElement(itPC2).setName('Admin PC');
                    network.getElement(itPC3) && network.getElement(itPC3).setName('IT Laptop');
                    
                    network.getElement(hrSwitch) && network.getElement(hrSwitch).setName('HR Dept Switch');
                    network.getElement(hrPC1) && network.getElement(hrPC1).setName('HR Desktop 1');
                    network.getElement(hrPC2) && network.getElement(hrPC2).setName('HR Laptop');
                    network.getElement(hrPC3) && network.getElement(hrPC3).setName('HR Desktop 2');
                    break;
                    
                case 'arp_poisoning':
                    // Create ARP poisoning demonstration
                    // This shows how an attacker can poison ARP caches to intercept traffic
                    
                    // Network infrastructure
                    var gateway = network.createRouter(400, 100);
                    var switch1 = network.createSwitch(400, 250, 8);
                    
                    // Create devices in strategic positions
                    // Attacker in the middle position (physically and logically)
                    var attacker = network.createComputerWithType(400, 400, 'laptop');
                    
                    // Victim on the left
                    var victim = network.createComputerWithType(200, 400, 'desktop');
                    
                    // Target server on the right  
                    var targetServer = network.createComputerWithType(600, 400, 'desktop');
                    
                    // Connect all devices through the switch
                    network.createLink(gateway, 0, switch1, 0);
                    network.createLink(switch1, 1, victim, 0);
                    network.createLink(switch1, 2, attacker, 0);
                    network.createLink(switch1, 3, targetServer, 0);
                    
                    // Configure device names to explain the scenario
                    var gatewayElem = network.getElement(gateway);
                    if (gatewayElem) {
                        gatewayElem.setName('Gateway (192.168.1.1)');
                    }
                    
                    network.getElement(switch1) && network.getElement(switch1).setName('LAN Switch');
                    
                    var attackerElem = network.getElement(attacker);
                    if (attackerElem) {
                        attackerElem.setName('MITM Attacker (.1.100)');
                        // In a real scenario, this would run ARP spoofing tools
                    }
                    
                    var victimElem = network.getElement(victim);  
                    if (victimElem) {
                        victimElem.setName('Victim PC (.1.50)');
                    }
                    
                    var targetElem = network.getElement(targetServer);
                    if (targetElem) {
                        targetElem.setName('Web Server (.1.200)');
                        // HTTP Server can be added via right-click menu for demo
                    }
                    
                    // Note: To demonstrate ARP poisoning:
                    // 1. Configure static IPs on all devices
                    // 2. View ARP tables before attack (should show correct MACs)
                    // 3. Attacker sends false ARP replies claiming to be gateway or server
                    // 4. Victim's ARP cache gets poisoned with attacker's MAC
                    // 5. All traffic now flows through attacker (MITM position)
                    break;
                    
                case 'wireless_network':
                    // Create wireless network scenario
                    var ispRouter = network.createRouter(400, 50);
                    var wifiRouter = network.createSwitch(400, 200, 8);  // Use switch with 8 ports for WiFi AP
                    var ethSwitch = network.createSwitch(600, 350, 8);
                    
                    // Wireless devices
                    var laptop1 = network.createComputerWithType(200, 350, 'laptop');
                    var laptop2 = network.createComputerWithType(300, 450, 'laptop');
                    var phone1 = network.createComputerWithType(200, 450, 'laptop');  // Using laptop as phone
                    var smartphone2 = network.createComputerWithType(300, 350, 'smartphone');  // Second smartphone
                    
                    // Wired devices
                    var desktop1 = network.createComputerWithType(550, 500, 'desktop');
                    var desktop2 = network.createComputerWithType(650, 500, 'desktop');
                    var printer = network.createComputerWithType(750, 500, 'desktop');  // Using desktop as printer
                    
                    // Connect network
                    network.createLink(ispRouter, 0, wifiRouter, 0);
                    network.createLink(wifiRouter, 1, ethSwitch, 0);
                    
                    // Wireless connections (simulated as regular connections)
                    network.createLink(wifiRouter, 2, laptop1, 0);
                    network.createLink(wifiRouter, 3, laptop2, 0);
                    network.createLink(wifiRouter, 4, phone1, 0);
                    network.createLink(wifiRouter, 5, smartphone2, 0);
                    
                    // Wired connections
                    network.createLink(ethSwitch, 1, desktop1, 0);
                    network.createLink(ethSwitch, 2, desktop2, 0);
                    network.createLink(ethSwitch, 3, printer, 0);
                    
                    // Configure names
                    network.getElement(ispRouter) && network.getElement(ispRouter).setName('ISP Modem');
                    
                    var wifiElem = network.getElement(wifiRouter);
                    if (wifiElem) {
                        wifiElem.setName('WiFi Access Point');
                        // Acts as both a switch and WiFi access point
                    }
                    
                    network.getElement(ethSwitch) && network.getElement(ethSwitch).setName('Ethernet Switch');
                    
                    // Configure wireless devices to use WiFi
                    var l1 = network.getElement(laptop1);
                    if (l1) {
                        l1.setName('MacBook Pro (WiFi)');
                        l1.setHasWiFi(true);
                        l1.setConnectionType('wifi');
                    }
                    
                    var l2 = network.getElement(laptop2);
                    if (l2) {
                        l2.setName('Windows Laptop (WiFi)');
                        l2.setHasWiFi(true);
                        l2.setConnectionType('wifi');
                    }
                    
                    var p1 = network.getElement(phone1);
                    if (p1) {
                        p1.setName('iPhone (WiFi)');
                        p1.setHasWiFi(true);
                        p1.setConnectionType('wifi');
                    }
                    
                    var t1 = network.getElement(smartphone2);
                    if (t1) {
                        t1.setName('Phone2 (WiFi)');
                        t1.setHasWiFi(true);
                        t1.setConnectionType('wifi');
                    }
                    
                    // Wired devices
                    network.getElement(desktop1) && network.getElement(desktop1).setName('Office PC (Ethernet)');
                    network.getElement(desktop2) && network.getElement(desktop2).setName('Gaming PC (Ethernet)');
                    network.getElement(printer) && network.getElement(printer).setName('Network Printer');
                    break;
                */
                    
                default:
                    // Simple fallback network
                    var r = network.createRouter(400, 200);
                    var s = network.createSwitch(400, 350, 8);
                    var c = network.createComputer(400, 500);
                    network.createLink(r, 0, s, 0);
                    network.createLink(s, 1, c, 0);
                    network.getElement(r) && network.getElement(r).setName('Router');
                    network.getElement(s) && network.getElement(s).setName('Switch');
                    network.getElement(c) && network.getElement(c).setName('Computer');
                    break;
            }
            
            // Show success message
            showToast('✓ Template "' + template.name + '" loaded successfully!', 'success');
            
        } catch (error) {
            console.error('Error loading template:', error);
            showToast('Error loading template: ' + error.message, 'error');
        }
    }
    
    function showToast(message, type) {
        var toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:20px;right:20px;padding:15px 20px;border-radius:8px;color:white;font-size:14px;z-index:10000;animation:slideIn 0.3s ease;';
        
        if (type === 'success') {
            toast.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
        } else if (type === 'error') {
            toast.style.background = 'linear-gradient(135deg, #f44336, #da190b)';
        } else {
            toast.style.background = 'linear-gradient(135deg, #2196f3, #0d47a1)';
        }
        
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(function() {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(function() {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Rogue Router UI Functions
    function configureRogueRouter(routerId) {
        var router = network.getElement(routerId);
        if (!router || router.getType() !== 'router') return;
        
        var isRogue = router.isRogue ? router.isRogue() : false;
        
        var content = '<div style="padding:15px;">';
        content += '<h3 style="color:#667eea;">🔧 Router Configuration</h3>';
        
        // Rogue mode toggle
        content += '<div style="margin:20px 0;padding:15px;background:#2a2d3a;border-radius:8px;border:1px solid #667eea;">';
        content += '<label style="display:flex;align-items:center;cursor:pointer;">';
        content += '<input type="checkbox" id="rogueMode" ' + (isRogue ? 'checked' : '') + ' style="width:20px;height:20px;margin-right:10px;">';
        content += '<span style="font-size:16px;color:#fff;">Enable Rogue Mode (MITM Attack)</span>';
        content += '</label>';
        content += '<div style="margin-top:10px;padding:10px;background:#1a1d2a;border-radius:4px;">';
        content += '<p style="margin:5px 0;color:#ff9800;font-size:12px;">⚠️ <strong>Educational Purpose Only:</strong></p>';
        content += '<ul style="margin:5px 0;padding-left:20px;color:#aaa;font-size:11px;">';
        content += '<li>When enabled, this router will intercept all HTTP/HTTPS traffic passing through it</li>';
        content += '<li>HTTPS traffic will appear encrypted (realistic simulation)</li>';
        content += '<li>HTTP traffic content will be visible</li>';
        content += '<li>Use with a rogue DHCP server to poison gateway settings</li>';
        content += '</ul>';
        content += '</div>';
        content += '</div>';
        
        // Information about usage
        content += '<div style="padding:10px;background:#e8f5e9;border-radius:4px;margin-top:15px;">';
        content += '<p style="margin:5px 0;color:#2e7d32;font-size:12px;"><strong>💡 How to use:</strong></p>';
        content += '<ol style="margin:5px 0;padding-left:20px;color:#388e3c;font-size:11px;">';
        content += '<li>Enable rogue mode on this router</li>';
        content += '<li>Configure a DHCP server in rogue mode</li>';
        content += '<li>Set the DHCP to give this router\'s IP as the gateway</li>';
        content += '<li>Clients will route all traffic through this rogue router</li>';
        content += '<li>View intercepted traffic from the router\'s menu</li>';
        content += '</ol>';
        content += '</div>';
        
        content += '</div>';
        
        var controls = '<button onclick="saveRogueRouterConfig(' + routerId + ')" style="background:linear-gradient(135deg, #667eea, #764ba2);color:white;border:none;padding:8px 20px;border-radius:4px;cursor:pointer;margin-right:10px;">Save</button>';
        controls += '<button onclick="uimanager.getWindow(\'divroguerouter\').dispose()" style="background:#6c757d;color:white;border:none;padding:8px 20px;border-radius:4px;cursor:pointer;">Cancel</button>';
        
        var w = new UIWindow('divroguerouter', 'Rogue Router Configuration', 500, 420, false, 1.0);
        w.setContent(content);
        w.setControls(controls);
        w.render();
    }
    
    function saveRogueRouterConfig(routerId) {
        var router = network.getElement(routerId);
        if (!router) return;
        
        var rogueMode = document.getElementById('rogueMode').checked;
        router.setRogueMode(rogueMode);
        
        uimanager.getWindow('divroguerouter').dispose();
        
        // Show confirmation
        var msg = rogueMode ? 'Router configured in rogue mode (MITM enabled)' : 'Router configured in normal mode';
        showNotification(msg, rogueMode ? 'warning' : 'success');
    }
    
    function viewRouterInterceptedTraffic(routerId) {
        var router = network.getElement(routerId);
        if (!router || !router.isRogue || !router.isRogue()) {
            alert("This router is not in rogue mode");
            return;
        }
        
        var traffic = router.getInterceptedTraffic();
        var content = '<div style="max-height:400px;overflow-y:auto;">';
        
        if (traffic.length === 0) {
            content += '<p style="text-align:center;color:#999;">No intercepted traffic yet.<br/>Traffic will appear here when data passes through this rogue router.</p>';
        } else {
            content += '<h3 style="color:#f44336;">🔴 Router Intercepted Traffic</h3>';
            content += '<div style="font-size:11px;">';
            
            traffic.forEach(function(entry, index) {
                // Same display logic as viewInterceptedTraffic but for router
                var bgColor = entry.isEncrypted ? '#e8f5e9' : '#fff3e0';
                var borderColor = entry.isEncrypted ? '#4caf50' : '#ff9800';
                var titleColor = entry.isEncrypted ? '#2e7d32' : '#e65100';
                
                content += '<div style="margin-bottom:15px;padding:10px;background:' + bgColor + ';border:1px solid ' + borderColor + ';border-radius:4px;">';
                content += '<div style="color:' + titleColor + ';font-weight:bold;">';
                content += 'Entry #' + (index + 1) + ' - ' + entry.timestamp;
                
                // Show if it's a request or response
                if (entry.isResponse) {
                    var statusColor = entry.statusCode >= 200 && entry.statusCode < 300 ? '#4caf50' : 
                                     entry.statusCode >= 400 ? '#f44336' : '#ff9800';
                    content += ' <span style="background:' + statusColor + ';color:white;padding:2px 6px;border-radius:3px;margin-left:5px;">RESPONSE ' + (entry.statusCode || '') + '</span>';
                } else {
                    content += ' <span style="background:#2196f3;color:white;padding:2px 6px;border-radius:3px;margin-left:5px;">REQUEST</span>';
                }
                
                if (entry.isEncrypted) {
                    content += ' <span style="background:#4caf50;color:white;padding:2px 6px;border-radius:3px;margin-left:5px;">🔒 HTTPS</span>';
                } else {
                    content += ' <span style="background:#ff9800;color:white;padding:2px 6px;border-radius:3px;margin-left:5px;">⚠️ HTTP</span>';
                }
                content += '</div>';
                
                content += '<div>Source: ' + entry.sourceIP + ' → Dest: ' + entry.destIP + ' (Port ' + (entry.port || 80) + ')</div>';
                
                // Show different info for requests vs responses
                if (entry.isResponse) {
                    content += '<div><strong>Status:</strong> ' + (entry.statusDescription || 'Unknown') + '</div>';
                } else {
                    content += '<div><strong>Method:</strong> ' + entry.method + '</div>';
                    content += '<div><strong>URL:</strong> <span style="color:#1976d2;">' + (entry.url || 'N/A') + '</span></div>';
                }
                
                if (entry.isEncrypted) {
                    content += '<div style="margin-top:8px;padding:8px;background:#c8e6c9;border:1px solid #81c784;border-radius:3px;">';
                    content += '<strong style="color:#2e7d32;">🔒 HTTPS Encrypted Traffic</strong><br/>';
                    content += '<div style="margin-top:5px;font-family:monospace;background:#f1f8e9;padding:5px;border-radius:3px;color:#666;">';
                    content += entry.body || '[ENCRYPTED DATA]';
                    content += '</div>';
                    content += '</div>';
                } else {
                    // Show headers if available
                    if (entry.headers && Object.keys(entry.headers).length > 0) {
                        content += '<details style="margin-top:5px;"><summary style="cursor:pointer;color:#1976d2;">📋 Headers</summary>';
                        content += '<pre style="font-size:10px;background:#f5f5f5;padding:5px;border-radius:3px;margin-top:5px;">';
                        for (var header in entry.headers) {
                            content += header + ': ' + entry.headers[header] + '\n';
                        }
                        content += '</pre></details>';
                    }
                    
                    // Show body/content if available
                    if (entry.body) {
                        var bodyPreview = entry.body.substring(0, 200);
                        if (entry.body.length > 200) bodyPreview += '...';
                        
                        content += '<details style="margin-top:5px;"><summary style="cursor:pointer;color:#1976d2;">📄 Body Content</summary>';
                        content += '<pre style="font-size:10px;background:#f5f5f5;padding:5px;border-radius:3px;max-height:200px;overflow:auto;margin-top:5px;">';
                        content += entry.body.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        content += '</pre></details>';
                    }
                    
                    // Show credentials if captured
                    if (entry.credentials) {
                        content += '<div style="margin-top:5px;padding:5px;background:#ffebee;border:1px solid #ef5350;border-radius:3px;">';
                        content += '<strong style="color:#c62828;">⚠️ Captured Credentials:</strong><br/>';
                        content += 'Username: <b>' + entry.credentials.username + '</b><br/>';
                        content += 'Password: <b>' + (entry.credentials.password || '[empty]') + '</b>';
                        content += '</div>';
                    }
                }
                
                content += '</div>';
            });
            
            content += '</div>';
        }
        
        content += '</div>';
        
        var w = new UIWindow('divroutertraffic', 'Router Intercepted Traffic', 600, 500, false, 1.0);
        w.setContent(content);
        w.setControls('<button onclick="uimanager.getWindow(\'divroutertraffic\').dispose()">Close</button>');
        w.render();
    }
    
    function clearRouterInterceptedTraffic(routerId) {
        var router = network.getElement(routerId);
        if (!router || !router.clearInterceptedTraffic) return;
        
        if (confirm('Clear all intercepted traffic from this router?')) {
            router.clearInterceptedTraffic();
            showNotification('Intercepted traffic cleared', 'success');
        }
    }
    
    function showNotification(message, type, duration) {
        // Enhanced notification system
        duration = duration || 3000;
        var color = type === 'success' ? '#4caf50' : (type === 'warning' ? '#ff9800' : '#f44336');
        var notification = document.createElement('div');
        notification.style.cssText = 'position:fixed;top:20px;right:20px;padding:15px 20px;background:' + color + ';color:white;border-radius:4px;z-index:9999;font-size:14px;box-shadow:0 2px 5px rgba(0,0,0,0.2);max-width:400px;';
        
        // Support HTML content for more complex messages
        if (typeof message === 'object' && message.html) {
            notification.innerHTML = message.html;
        } else {
            notification.textContent = message;
        }
        
        document.body.appendChild(notification);
        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(function() {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
    
    // Track DHCP race events
    var dhcpRaceHistory = [];
    
    // Global event listener for DHCP race conditions
    window.onDHCPRaceWinner = function(winnerInfo) {
        // Add to history
        winnerInfo.timestamp = new Date().toISOString();
        dhcpRaceHistory.push(winnerInfo);
        if (dhcpRaceHistory.length > 10) dhcpRaceHistory.shift(); // Keep last 10
        
        if (winnerInfo.isRogue) {
            showNotification({
                html: '<strong>⚠️ DHCP RACE CONDITION - ROGUE WIN!</strong><br>' +
                      '<small>Rogue server (' + winnerInfo.serverIP + ') responded faster!<br>' +
                      'Host ' + winnerInfo.clientName + ' is now compromised.</small>'
            }, 'warning', 5000);
        } else {
            showNotification({
                html: '<strong>✅ DHCP RACE CONDITION - LEGITIMATE WIN</strong><br>' +
                      '<small>Legitimate server (' + winnerInfo.serverIP + ') responded first.<br>' +
                      'Host ' + winnerInfo.clientName + ' received safe configuration.</small>'
            }, 'success', 4000);
        }
    }
    
    // View DHCP race condition history
    function viewDHCPRaceHistory() {
        var content = '<div style="padding:15px;">';
        content += '<h3 style="color:#667eea;">🏁 DHCP Race Condition History</h3>';
        
        if (dhcpRaceHistory.length === 0) {
            content += '<p style="text-align:center;color:#999;margin:30px 0;">No DHCP race events recorded yet.<br><small>Race conditions occur when multiple DHCP servers respond to requests.</small></p>';
        } else {
            content += '<div style="margin:15px 0;padding:10px;background:#e8f5e9;border-radius:4px;">';
            content += '<p style="margin:5px 0;color:#2e7d32;font-size:12px;"><strong>📚 Educational Note:</strong></p>';
            content += '<p style="margin:5px 0;color:#388e3c;font-size:11px;">In a DHCP race condition, the first server to respond wins. ';
            content += 'Rogue DHCP servers often respond faster (0-50ms) than legitimate servers (100-300ms) to increase their chances of poisoning the network.</p>';
            content += '</div>';
            
            content += '<table style="width:100%;border-collapse:collapse;margin-top:15px;">';
            content += '<tr style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;">';
            content += '<th style="padding:8px;text-align:left;">Time</th>';
            content += '<th style="padding:8px;text-align:left;">Client</th>';
            content += '<th style="padding:8px;text-align:left;">Winner</th>';
            content += '<th style="padding:8px;text-align:left;">Type</th>';
            content += '</tr>';
            
            dhcpRaceHistory.forEach(function(race, index) {
                var rowColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';
                var typeColor = race.isRogue ? '#f44336' : '#4caf50';
                var typeText = race.isRogue ? 'ROGUE' : 'LEGITIMATE';
                
                content += '<tr style="background:' + rowColor + ';">';
                content += '<td style="padding:6px;font-size:11px;">' + new Date(race.timestamp).toLocaleTimeString() + '</td>';
                content += '<td style="padding:6px;font-size:12px;">' + race.clientName + '</td>';
                content += '<td style="padding:6px;font-size:11px;">' + race.serverIP + '</td>';
                content += '<td style="padding:6px;"><span style="background:' + typeColor + ';color:white;padding:2px 6px;border-radius:3px;font-size:10px;">' + typeText + '</span></td>';
                content += '</tr>';
            });
            
            content += '</table>';
        }
        
        content += '</div>';
        
        var w = new UIWindow('divdhcprace', 'DHCP Race Condition Monitor', 500, 400, false, 1.0);
        w.setContent(content);
        w.setControls('<button onclick="uimanager.getWindow(\'divdhcprace\').dispose()">Close</button>');
        w.render();
    }
    
    // 802.1X Port Security Configuration for Switches
    function configure802_1X(switchId) {
        var sw = network.getElement(switchId);
        if (!sw || !sw.getRADIUSClient) {
            alert('This switch does not support 802.1X');
            return;
        }
        
        var radiusClient = sw.getRADIUSClient();
        if (!radiusClient) {
            alert('RADIUS client not initialized');
            return;
        }
        
        createBkDiv();
        
        var config = radiusClient.getConfig();
        var portStates = radiusClient.getPortStates();
        var connectable = sw.getConnectable();

        console.log('🔧 Opening 802.1X config for', sw.getName());
        console.log('  Port states:', portStates);
        
        var innerHTML = '<div style="padding:20px;">';
        innerHTML += '<h3 style="color:#667eea; margin-bottom:20px;">🔐 802.1X Port Security Configuration</h3>';
        
        // RADIUS Server Configuration
        innerHTML += '<div style="background:#2a2d3a; padding:15px; border-radius:8px; margin-bottom:20px;">';
        innerHTML += '<h4 style="color:#a5b4fc; margin-bottom:15px;">RADIUS Server Settings</h4>';
        innerHTML += '<div style="display:grid; grid-template-columns: 150px 1fr; gap:10px; align-items:center;">';
        
        innerHTML += '<label style="color:#9ca3af;">Enable 802.1X:</label>';
        innerHTML += '<input type="checkbox" id="radius_enabled" ' + (config.enabled ? 'checked' : '') + ' style="width:20px; height:20px;">';
        
        innerHTML += '<label style="color:#9ca3af;">RADIUS Server IP:</label>';
        innerHTML += '<input type="text" id="radius_server_ip" value="' + (config.serverIP || '') + '" placeholder="192.168.1.100" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px;">';
        
        innerHTML += '<label style="color:#9ca3af;">Port:</label>';
        innerHTML += '<input type="number" id="radius_port" value="' + config.serverPort + '" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px; width:100px;">';
        
        innerHTML += '<label style="color:#9ca3af;">Shared Secret:</label>';
        innerHTML += '<input type="password" id="radius_secret" value="' + config.sharedSecret + '" placeholder="radius123" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px;">';
        
        innerHTML += '<label style="color:#9ca3af;">Timeout (ms):</label>';
        innerHTML += '<input type="number" id="radius_timeout" value="' + config.timeout + '" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px; width:100px;">';
        
        innerHTML += '</div>';
        innerHTML += '</div>';
        
        // Port Configuration
        innerHTML += '<div style="background:#2a2d3a; padding:15px; border-radius:8px;">';
        innerHTML += '<h4 style="color:#a5b4fc; margin-bottom:15px;">Port Configuration</h4>';
        innerHTML += '<table style="width:100%; border-collapse:collapse; background:#1a1d2e;">';
        innerHTML += '<thead>';
        innerHTML += '<tr style="border-bottom:2px solid #4a5568; background:#16213e;">';
        innerHTML += '<th style="text-align:left; padding:10px; color:#e4e4e7; font-weight:600;">Port</th>';
        innerHTML += '<th style="text-align:center; padding:10px; color:#e4e4e7; font-weight:600;">802.1X</th>';
        innerHTML += '<th style="text-align:left; padding:10px; color:#e4e4e7; font-weight:600;">State</th>';
        innerHTML += '<th style="text-align:left; padding:10px; color:#e4e4e7; font-weight:600;">Connected Device</th>';
        innerHTML += '</tr>';
        innerHTML += '</thead>';
        innerHTML += '<tbody style="background:#1a1d2e;">';
        
        // Show all ports
        var numPorts = connectable ? connectable.getConnectorNumber() : 8;
        for (var i = 0; i < numPorts; i++) {
            var portState = portStates[i] || {state: 'unauthorized', enabled: false};
            console.log('  Port', i, '- enabled:', portState.enabled, 'state:', portState.state);
            var connector = connectable ? connectable.getConnector(i) : null;
            var linkedDevice = '';
            
            if (connector && connector.isConnected()) {
                var link = connector.getConnectedConnector();
                if (link && link.getConnectable && link.getConnectable().getOwner) {
                    linkedDevice = link.getConnectable().getOwner().getName();
                }
            }
            
            var stateColor = portState.state === 'authorized' ? '#10b981' : 
                           portState.state === 'authorizing' ? '#f59e0b' : '#ef4444';
            
            innerHTML += '<tr style="border-bottom:1px solid #2a2d3a;">';
            innerHTML += '<td style="padding:10px; color:#e4e4e7; font-weight:500;">Port ' + i + '</td>';
            innerHTML += '<td style="text-align:center; padding:10px;">';
            innerHTML += '<input type="checkbox" id="port_802_1x_' + i + '" ' + 
                        (portState.enabled ? 'checked' : '') + ' style="width:18px; height:18px; cursor:pointer;">';
            innerHTML += '</td>';
            innerHTML += '<td style="padding:10px;"><span style="color:' + stateColor + '; font-weight:600;">' + 
                        portState.state.charAt(0).toUpperCase() + portState.state.slice(1) + '</span></td>';
            innerHTML += '<td style="padding:10px; color:#d1d5db; font-weight:500;">' + (linkedDevice || '-') + '</td>';
            innerHTML += '</tr>';
        }
        
        innerHTML += '</tbody>';
        innerHTML += '</table>';
        innerHTML += '</div>';
        
        innerHTML += '</div>';
        
        var controls = '<button onclick="save802_1XConfig(' + switchId + ')" style="background:#667eea; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Save</button>';
        controls += '<button onclick="test802_1XAuth(' + switchId + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Test Auth</button>';
        controls += '<button onclick="var w = uimanager.getWindow(\'div802_1x\'); if(w) w.dispose(); removeBodyDiv(\'divbk\');" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Close</button>';
        
        var w = new UIWindow('div802_1x', '802.1X Configuration - ' + sw.getName(), 600, 550, true, 1.0);
        w.setContent(innerHTML);
        w.setControls(controls);
        w.render();
    }
    
    // Save 802.1X Configuration
    function save802_1XConfig(switchId) {
        var sw = network.getElement(switchId);
        if (!sw || !sw.getRADIUSClient) return;

        var radiusClient = sw.getRADIUSClient();
        var connectable = sw.getConnectable();
        var numPorts = connectable ? connectable.getConnectorNumber() : 8;

        console.log('💾 SAVING 802.1X Config for', sw.getName());

        // Save RADIUS server settings
        var config = {
            enabled: document.getElementById('radius_enabled').checked,
            serverIP: document.getElementById('radius_server_ip').value,
            serverPort: parseInt(document.getElementById('radius_port').value),
            sharedSecret: document.getElementById('radius_secret').value,
            timeout: parseInt(document.getElementById('radius_timeout').value)
        };

        radiusClient.setConfig(config);

        // Save port 802.1X settings
        for (var i = 0; i < numPorts; i++) {
            var checkbox = document.getElementById('port_802_1x_' + i);
            var enabled = checkbox ? checkbox.checked : false;
            console.log('  Port', i, '- Checkbox checked:', enabled);
            radiusClient.setPort802_1X(i, enabled);
        }

        console.log('  After saving, getting port states back:');
        var portStates = radiusClient.getPortStates();
        for (var i = 0; i < numPorts; i++) {
            if (portStates[i]) {
                console.log('    Port', i, '- enabled:', portStates[i].enabled);
            }
        }
        
        // Close the modal after saving
        uimanager.getWindow('div802_1x').dispose();
        removeBodyDiv('divbk');
    }
    
    // Test 802.1X Authentication
    function test802_1XAuth(switchId) {
        var sw = network.getElement(switchId);
        if (!sw || !sw.getRADIUSClient) return;
        
        var radiusClient = sw.getRADIUSClient();
        var connectable = sw.getConnectable();
        var numPorts = connectable ? connectable.getConnectorNumber() : 8;
        
        // Save current configuration from the modal first
        var config = {
            enabled: document.getElementById('radius_enabled').checked,
            serverIP: document.getElementById('radius_server_ip').value,
            serverPort: parseInt(document.getElementById('radius_port').value),
            sharedSecret: document.getElementById('radius_secret').value,
            timeout: parseInt(document.getElementById('radius_timeout').value)
        };
        
        radiusClient.setConfig(config);
        
        // Save port 802.1X settings
        for (var i = 0; i < numPorts; i++) {
            var enabled = document.getElementById('port_802_1x_' + i).checked;
            radiusClient.setPort802_1X(i, enabled);
        }
        
        // Now check if it's enabled
        if (!radiusClient.isEnabled()) {
            alert('802.1X is not enabled. Please enable it first.');
            return;
        }
        
        if (!config.serverIP) {
            alert('RADIUS server IP not configured.');
            return;
        }
        
        var username = prompt('Enter username to test:');
        if (!username) return;
        
        var password = prompt('Enter password:');
        if (!password) return;
        
        var port = prompt('Enter port number to test (0-7):', '0');
        if (port === null) return;
        
        port = parseInt(port);
        
        // Pass the network reference to the authentication
        if (radiusClient.setNetwork) {
            radiusClient.setNetwork(network);
        }
        
        radiusClient.authenticateUser(username, password, port, '10.0.0.100', function(success, message) {
            if (success) {
                alert('✅ Authentication successful!\n\nUser: ' + username + '\nPort: ' + port + '\nStatus: Authorized');
            } else {
                alert('❌ Authentication failed!\n\nUser: ' + username + '\nPort: ' + port + '\nReason: ' + message);
            }
            
            // Refresh the window to show updated port states
            // First close the old window properly
            var oldWindow = uimanager.getWindow('div802_1x');
            if (oldWindow) {
                oldWindow.dispose();
            }
            // Remove the background if it exists
            var bkDiv = document.getElementById('divbk');
            if (bkDiv) {
                removeBodyDiv('divbk');
            }
            // Then recreate it
            configure802_1X(switchId);
        });
    }

    // 802.1X Supplicant Configuration for Hosts (client-side)
    function configure802_1XSupplicant(hostId) {
        var host = network.getElement(hostId);
        if (!host) {
            alert('Host not found');
            return;
        }

        createBkDiv();

        var enabled = host.get802_1XEnabled();
        var username = host.get802_1XUsername();
        var password = host.get802_1XPassword(); // Get existing password to check if set
        var authState = host.get802_1XAuthState();
        var autoConnect = host.get802_1XAutoConnect();

        console.log('🔓 Opening 802.1X config for', host.getName());
        console.log('  🔥 PASSWORD FIX VERSION 2025-10-08-v2 LOADED 🔥');
        console.log('  Password:', password ? '****' + password.slice(-2) + ' (length: ' + password.length + ')' : 'NULL/EMPTY');
        console.log('  Username:', username);
        console.log('  Enabled:', enabled);

        var stateColor = {
            'DISCONNECTED': '#9ca3af',
            'AUTHENTICATING': '#f59e0b',
            'AUTHENTICATED': '#10b981',
            'FAILED': '#ef4444'
        };

        var stateIcon = {
            'DISCONNECTED': '🔒',
            'AUTHENTICATING': '⏳',
            'AUTHENTICATED': '✅',
            'FAILED': '❌'
        };

        var innerHTML = '<div style="background:#1a1d2e;padding:20px;color:#e4e4e7;border-radius:8px;">';

        // Header
        innerHTML += '<h3 style="color:#a5b4fc;margin-top:0;">🔐 802.1X Network Authentication</h3>';
        innerHTML += '<p style="color:#9ca3af;font-size:13px;margin-bottom:20px;">Configure client credentials for automatic network authentication</p>';

        // Current Status
        innerHTML += '<div style="background:#2a2d3e;padding:15px;border-radius:6px;margin-bottom:20px;border-left:4px solid ' + stateColor[authState] + ';">';
        innerHTML += '<div style="font-weight:600;margin-bottom:5px;color:#e4e4e7;">Current Status</div>';
        innerHTML += '<div style="font-size:18px;color:' + stateColor[authState] + ';">' + stateIcon[authState] + ' ' + authState + '</div>';
        if (authState === 'AUTHENTICATED') {
            innerHTML += '<div style="font-size:12px;color:#9ca3af;margin-top:5px;">Network access granted</div>';
        } else if (authState === 'FAILED') {
            innerHTML += '<div style="font-size:12px;color:#ef4444;margin-top:5px;">Check credentials or RADIUS server</div>';
        }
        innerHTML += '</div>';

        // Enable/Disable
        innerHTML += '<div style="margin-bottom:20px;">';
        innerHTML += '<label style="display:flex;align-items:center;cursor:pointer;">';
        innerHTML += '<input type="checkbox" id="dot1xEnabled" ' + (enabled ? 'checked' : '') + ' style="margin-right:10px;width:18px;height:18px;cursor:pointer;">';
        innerHTML += '<span style="font-weight:600;">Enable 802.1X Authentication</span>';
        innerHTML += '</label>';
        innerHTML += '<div style="font-size:12px;color:#9ca3af;margin-top:5px;margin-left:28px;">Automatically authenticate when connecting to protected networks</div>';
        innerHTML += '</div>';

        // Credentials Section
        innerHTML += '<div id="credentialsSection" style="' + (enabled ? '' : 'opacity:0.5;pointer-events:none;') + '">';

        innerHTML += '<div style="margin-bottom:15px;">';
        innerHTML += '<label style="display:block;color:#e4e4e7;margin-bottom:5px;font-weight:500;">Username <span style="color:#ef4444;">*</span></label>';
        innerHTML += '<input type="text" id="dot1xUsername" value="' + username + '" placeholder="Enter your username" style="width:100%;padding:10px;background:#2a2d3e;border:1px solid #4a5568;border-radius:4px;color:#e4e4e7;font-size:14px;">';
        innerHTML += '</div>';

        innerHTML += '<div style="margin-bottom:15px;">';
        innerHTML += '<label style="display:block;color:#e4e4e7;margin-bottom:5px;font-weight:500;">Password <span style="color:#ef4444;">*</span></label>';
        var passwordPlaceholder = password ? "Password is set (leave blank to keep current)" : "Enter your password";
        console.log('  Password placeholder will be:', passwordPlaceholder);
        innerHTML += '<input type="password" id="dot1xPassword" placeholder="' + passwordPlaceholder + '" style="width:100%;padding:10px;background:#2a2d3e;border:1px solid #4a5568;border-radius:4px;color:#e4e4e7;font-size:14px;">';
        // Hidden field to preserve existing password
        innerHTML += '<input type="hidden" id="dot1xPasswordExisting" value="' + (password || '') + '">';
        innerHTML += '<div style="font-size:11px;color:#9ca3af;margin-top:5px;">⚠️ For educational simulation - password stored unencrypted</div>';
        innerHTML += '</div>';

        innerHTML += '<div style="margin-bottom:20px;">';
        innerHTML += '<label style="display:flex;align-items:center;cursor:pointer;">';
        innerHTML += '<input type="checkbox" id="dot1xAutoConnect" ' + (autoConnect ? 'checked' : '') + ' style="margin-right:10px;width:16px;height:16px;cursor:pointer;">';
        innerHTML += '<span>Auto-connect to network</span>';
        innerHTML += '</label>';
        innerHTML += '<div style="font-size:12px;color:#9ca3af;margin-top:5px;margin-left:26px;">Automatically authenticate when connecting to 802.1X-protected ports</div>';
        innerHTML += '</div>';

        innerHTML += '</div>'; // End credentials section

        // Info box
        innerHTML += '<div style="background:#1e293b;padding:12px;border-radius:6px;border-left:4px solid #3b82f6;font-size:12px;color:#9ca3af;">';
        innerHTML += '<div style="font-weight:600;color:#60a5fa;margin-bottom:5px;">ℹ️ How it works:</div>';
        innerHTML += '1. Enable 802.1X and enter your credentials<br>';
        innerHTML += '2. Connect to a switch with 802.1X port security enabled<br>';
        innerHTML += '3. The host will automatically authenticate against the RADIUS server<br>';
        innerHTML += '4. Upon success, the network port grants access';
        innerHTML += '</div>';

        innerHTML += '</div>'; // End main container

        var controls = '<button onclick="save802_1XSupplicantConfig(' + hostId + ');" style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;border:none;padding:10px 20px;border-radius:4px;cursor:pointer;font-weight:600;">Save Configuration</button>';
        controls += '<button onclick="test802_1XAuthentication(' + hostId + ');" style="background:#10b981;color:white;border:none;padding:10px 20px;border-radius:4px;cursor:pointer;margin-left:10px;font-weight:600;">Test Now</button>';
        controls += '<button onclick="cancel802_1XSupplicantConfig();" style="background:#4a5568;color:white;border:none;padding:10px 20px;border-radius:4px;cursor:pointer;margin-left:10px;">Cancel</button>';

        var w = new UIWindow('div802_1xSupplicant', host.getName() + ' - 802.1X Configuration', 550, 600, false, 1.0);
        w.setContent(innerHTML);
        w.setControls(controls);
        w.render();

        // Add event listener for enable checkbox
        document.getElementById('dot1xEnabled').addEventListener('change', function() {
            var section = document.getElementById('credentialsSection');
            if (this.checked) {
                section.style.opacity = '1';
                section.style.pointerEvents = 'auto';
            } else {
                section.style.opacity = '0.5';
                section.style.pointerEvents = 'none';
            }
        });
    }

    function save802_1XSupplicantConfig(hostId) {
        var host = network.getElement(hostId);
        if (!host) return;

        var enabled = document.getElementById('dot1xEnabled').checked;
        var username = document.getElementById('dot1xUsername').value.trim();
        var password = document.getElementById('dot1xPassword').value;
        var existingPassword = document.getElementById('dot1xPasswordExisting').value;
        var autoConnect = document.getElementById('dot1xAutoConnect').checked;

        if (enabled && !username) {
            alert('Username is required when 802.1X is enabled');
            return;
        }

        // Use new password if provided, otherwise keep existing
        var finalPassword = password || existingPassword;

        if (enabled && !finalPassword) {
            alert('Password is required when 802.1X is enabled');
            return;
        }

        host.set802_1XEnabled(enabled);
        host.set802_1XUsername(username);
        // Always set password (either new or existing)
        if (finalPassword) {
            host.set802_1XPassword(finalPassword);
        }
        host.set802_1XAutoConnect(autoConnect);

        // If enabling 802.1X and host is already connected, trigger auto-authentication
        if (enabled && username && finalPassword) {
            var connectable = host.getConnectable();
            if (connectable && connectable.getConnector) {
                var connector = connectable.getConnector(0);
                if (connector && connector.isConnected && connector.isConnected()) {
                    var connectedDevice = connector.getConnectedConnector();
                    if (connectedDevice) {
                        var switchHost = connectedDevice.getConnectable().getOwner();
                        if (switchHost && switchHost.getType && switchHost.getType() === 'switch') {
                            var switchRadiusClient = switchHost.getRADIUSClient ? switchHost.getRADIUSClient() : null;
                            if (switchRadiusClient && switchRadiusClient.isEnabled && switchRadiusClient.isEnabled()) {
                                var portNum = switchHost.getConnectable().getConnectorPos(connectedDevice);
                                if (switchRadiusClient.isPort802_1XEnabled && switchRadiusClient.isPort802_1XEnabled(portNum)) {
                                    console.log('🔐 Auto-triggering authentication for newly enabled 802.1X');
                                    setTimeout(function() {
                                        host.authenticate802_1X(switchHost.id, portNum);
                                    }, 500);
                                }
                            }
                        }
                    }
                }
            }
        }

        showToast('802.1X configuration saved for ' + host.getName(), 'success');

        cancel802_1XSupplicantConfig();
    }

    function cancel802_1XSupplicantConfig() {
        var window = uimanager.getWindow('div802_1xSupplicant');
        if (window) {
            window.dispose();
        }
        removeBodyDiv('divbk');
    }

    // VLAN Configuration Functions (Phase 1)
    function openVlanConfig(switchId) {
        var sw = network.getElement(switchId);
        if (!sw || sw.getType() !== "switch") {
            alert('This device is not a switch');
            return;
        }

        createBkDiv();

        var vlanDb = sw.getVlanDatabase();
        var connectable = sw.getConnectable();
        var numPorts = connectable ? connectable.getConnectorNumber() : 8;

        var innerHTML = '<div style="padding:20px;">';
        innerHTML += '<h3 style="color:#667eea; margin-bottom:20px;">🏷️ VLAN Configuration - ' + sw.getName() + '</h3>';

        // VLAN Database Section
        innerHTML += '<div style="background:#2a2d3a; padding:15px; border-radius:8px; margin-bottom:20px;">';
        innerHTML += '<h4 style="color:#a5b4fc; margin-bottom:15px;">VLAN Database</h4>';
        innerHTML += '<table style="width:100%; border-collapse:collapse; background:#1a1d2e; margin-bottom:10px;">';
        innerHTML += '<thead>';
        innerHTML += '<tr style="border-bottom:2px solid #4a5568; background:#16213e;">';
        innerHTML += '<th style="text-align:left; padding:10px; color:#e4e4e7; font-weight:600;">VLAN ID</th>';
        innerHTML += '<th style="text-align:left; padding:10px; color:#e4e4e7; font-weight:600;">Name</th>';
        innerHTML += '<th style="text-align:center; padding:10px; color:#e4e4e7; font-weight:600;">Actions</th>';
        innerHTML += '</tr>';
        innerHTML += '</thead>';
        innerHTML += '<tbody>';

        for (var vlanId in vlanDb) {
            innerHTML += '<tr style="border-bottom:1px solid #2a2d3a;">';
            innerHTML += '<td style="padding:10px; color:#e4e4e7; font-weight:500;">' + vlanId + '</td>';
            innerHTML += '<td style="padding:10px;"><input type="text" id="vlan_name_' + vlanId + '" value="' + vlanDb[vlanId].name + '" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px; width:200px;"></td>';
            innerHTML += '<td style="text-align:center; padding:10px;">';
            if (vlanId !== "1") {
                innerHTML += '<button onclick="deleteVlan(' + switchId + ', ' + vlanId + ')" style="background:#ef4444; color:white; padding:5px 10px; border:none; border-radius:4px; cursor:pointer;">Delete</button>';
            } else {
                innerHTML += '<span style="color:#6b7280;">Default</span>';
            }
            innerHTML += '</td>';
            innerHTML += '</tr>';
        }

        innerHTML += '</tbody>';
        innerHTML += '</table>';
        innerHTML += '<button onclick="addVlan(' + switchId + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">➕ Add VLAN</button>';
        innerHTML += '</div>';

        // Port Assignment Section (Phase 2 - with trunk support)
        innerHTML += '<div style="background:#2a2d3a; padding:15px; border-radius:8px;">';
        innerHTML += '<h4 style="color:#a5b4fc; margin-bottom:15px;">Port Assignment</h4>';
        innerHTML += '<table style="width:100%; border-collapse:collapse; background:#1a1d2e;">';
        innerHTML += '<thead>';
        innerHTML += '<tr style="border-bottom:2px solid #4a5568; background:#16213e;">';
        innerHTML += '<th style="text-align:left; padding:10px; color:#e4e4e7; font-weight:600;">Port</th>';
        innerHTML += '<th style="text-align:left; padding:10px; color:#e4e4e7; font-weight:600;">Mode</th>';
        innerHTML += '<th style="text-align:left; padding:10px; color:#e4e4e7; font-weight:600;">VLAN Config</th>';
        innerHTML += '<th style="text-align:left; padding:10px; color:#e4e4e7; font-weight:600;">Status</th>';
        innerHTML += '</tr>';
        innerHTML += '</thead>';
        innerHTML += '<tbody>';

        for (var i = 0; i < numPorts; i++) {
            var connector = connectable.getConnector(i);
            var currentVlan = connector.getVlanId();
            var portMode = connector.getPortMode ? connector.getPortMode() : 'access';
            var allowedVlans = connector.getAllowedVlans ? connector.getAllowedVlans() : [1];
            var nativeVlan = connector.getNativeVlan ? connector.getNativeVlan() : 1;
            var isConnected = connector.isConnected();
            var statusText = isConnected ? 'Connected' : 'Not Connected';
            var statusColor = isConnected ? '#10b981' : '#6b7280';

            innerHTML += '<tr style="border-bottom:1px solid #2a2d3a;">';
            innerHTML += '<td style="padding:10px; color:#e4e4e7; font-weight:500;">Port ' + i + '</td>';

            // Port Mode dropdown
            innerHTML += '<td style="padding:10px;">';
            innerHTML += '<select id="port_mode_' + i + '" onchange="togglePortMode(' + switchId + ',' + i + ')" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px;">';
            innerHTML += '<option value="access"' + (portMode === 'access' ? ' selected' : '') + '>Access</option>';
            innerHTML += '<option value="trunk"' + (portMode === 'trunk' ? ' selected' : '') + '>Trunk</option>';
            innerHTML += '</select>';
            innerHTML += '</td>';

            // VLAN Config (different for access vs trunk)
            innerHTML += '<td style="padding:10px;"><div id="port_config_' + i + '">';

            if (portMode === 'access') {
                // Access port: single VLAN dropdown
                innerHTML += '<select id="port_vlan_' + i + '" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px; width:150px;">';
                for (var vId in vlanDb) {
                    var selected = (parseInt(vId) === currentVlan) ? ' selected' : '';
                    innerHTML += '<option value="' + vId + '"' + selected + '>VLAN ' + vId + ' (' + vlanDb[vId].name + ')</option>';
                }
                innerHTML += '</select>';
            } else {
                // Trunk port: allowed VLANs checkboxes + native VLAN
                innerHTML += '<div style="font-size:11px;">';
                innerHTML += '<div style="margin-bottom:5px;"><strong>Allowed:</strong> ';
                for (var vId in vlanDb) {
                    var checked = allowedVlans.indexOf(parseInt(vId)) >= 0 ? ' checked' : '';
                    innerHTML += '<label style="margin-right:8px;"><input type="checkbox" id="port_allowed_' + i + '_' + vId + '" value="' + vId + '"' + checked + '> ' + vId + '</label>';
                }
                innerHTML += '</div>';
                innerHTML += '<div><strong>Native:</strong> ';
                innerHTML += '<select id="port_native_' + i + '" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:3px; border-radius:4px; font-size:11px;">';
                for (var vId in vlanDb) {
                    var selected = (parseInt(vId) === nativeVlan) ? ' selected' : '';
                    innerHTML += '<option value="' + vId + '"' + selected + '>' + vId + '</option>';
                }
                innerHTML += '</select></div>';
                innerHTML += '</div>';
            }

            innerHTML += '</div></td>';
            innerHTML += '<td style="padding:10px; color:' + statusColor + '; font-weight:500;">' + statusText + '</td>';
            innerHTML += '</tr>';
        }

        innerHTML += '</tbody>';
        innerHTML += '</table>';
        innerHTML += '</div>';
        innerHTML += '</div>';

        var controls = '<button onclick="saveVlanConfig(' + switchId + ')" style="background:#667eea; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Save</button>';
        controls += '<button onclick="cancelVlanConfig()" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Cancel</button>';

        var w = new UIWindow('divvlanconfig', 'VLAN Configuration', 600, 600, true, 1.0);
        w.setContent(innerHTML);
        w.setControls(controls);
        w.render();
    }

    function togglePortMode(switchId, portIndex) {
        // Refresh the modal to show appropriate UI
        cancelVlanConfig();
        setTimeout(function() { openVlanConfig(switchId); }, 100);
    }

    function saveVlanConfig(switchId) {
        var sw = network.getElement(switchId);
        if (!sw) return;

        var vlanDb = sw.getVlanDatabase();
        var connectable = sw.getConnectable();

        // Update VLAN names
        for (var vlanId in vlanDb) {
            var nameInput = document.getElementById('vlan_name_' + vlanId);
            if (nameInput) {
                sw.renameVlan(parseInt(vlanId), nameInput.value);
            }
        }

        // Update port assignments (Phase 2 - handles both access and trunk)
        var numPorts = connectable.getConnectorNumber();
        for (var i = 0; i < numPorts; i++) {
            var connector = connectable.getConnector(i);
            var modeSelect = document.getElementById('port_mode_' + i);

            if (modeSelect) {
                var portMode = modeSelect.value;
                connector.setPortMode(portMode);

                if (portMode === 'access') {
                    // Access port: set single VLAN
                    var vlanSelect = document.getElementById('port_vlan_' + i);
                    if (vlanSelect) {
                        connector.setVlanId(parseInt(vlanSelect.value));
                    }
                } else if (portMode === 'trunk') {
                    // Trunk port: set allowed VLANs and native VLAN
                    var allowedVlans = [];
                    for (var vlanId in vlanDb) {
                        var checkbox = document.getElementById('port_allowed_' + i + '_' + vlanId);
                        if (checkbox && checkbox.checked) {
                            allowedVlans.push(parseInt(vlanId));
                        }
                    }
                    connector.setAllowedVlans(allowedVlans);

                    var nativeSelect = document.getElementById('port_native_' + i);
                    if (nativeSelect) {
                        connector.setNativeVlan(parseInt(nativeSelect.value));
                    }
                }
            }
        }

        showToast('✅ VLAN configuration saved successfully', 'success');
        cancelVlanConfig();
        network.save();
    }

    function addVlan(switchId) {
        var vlanId = prompt("Enter VLAN ID (2-4094):");
        if (!vlanId) return;

        vlanId = parseInt(vlanId);
        if (isNaN(vlanId) || vlanId < 2 || vlanId > 4094) {
            alert("Invalid VLAN ID. Must be between 2 and 4094.");
            return;
        }

        var sw = network.getElement(switchId);
        var vlanName = prompt("Enter VLAN name:", "VLAN" + vlanId);
        if (!vlanName) vlanName = "VLAN" + vlanId;

        if (sw.createVlan(vlanId, vlanName)) {
            showToast('✅ VLAN ' + vlanId + ' created', 'success');
            // Refresh the modal
            cancelVlanConfig();
            setTimeout(function() { openVlanConfig(switchId); }, 100);
        } else {
            alert("Failed to create VLAN. It may already exist.");
        }
    }

    function deleteVlan(switchId, vlanId) {
        if (!confirm("Delete VLAN " + vlanId + "? Ports assigned to this VLAN will be moved to VLAN 1.")) {
            return;
        }

        var sw = network.getElement(switchId);
        var connectable = sw.getConnectable();

        // Move all ports from this VLAN to VLAN 1
        var numPorts = connectable.getConnectorNumber();
        for (var i = 0; i < numPorts; i++) {
            var connector = connectable.getConnector(i);
            if (connector.getVlanId() === vlanId) {
                connector.setVlanId(1);
            }
        }

        if (sw.deleteVlan(vlanId)) {
            showToast('✅ VLAN ' + vlanId + ' deleted', 'success');
            // Refresh the modal
            cancelVlanConfig();
            setTimeout(function() { openVlanConfig(switchId); }, 100);
        } else {
            alert("Failed to delete VLAN.");
        }
    }

    function cancelVlanConfig() {
        var window = uimanager.getWindow('divvlanconfig');
        if (window) {
            window.dispose();
        }
        removeBodyDiv('divbk');
    }

    function test802_1XAuthentication(hostId) {
        var host = network.getElement(hostId);
        if (!host) return;

        // First save the configuration
        save802_1XSupplicantConfig(hostId);

        if (!host.get802_1XEnabled()) {
            alert('802.1X is not enabled. Please enable it first.');
            return;
        }

        if (!host.get802_1XUsername() || !host.get802_1XPassword()) {
            alert('Please configure username and password first.');
            return;
        }

        // Find which switch the host is connected to
        var connectable = host.getConnectable();
        if (!connectable || connectable.getConnectorNumber() === 0) {
            alert('Host has no network interfaces');
            return;
        }

        var connector = connectable.getConnector(0);
        var link = connector.getLink();

        if (!link) {
            alert('Host is not connected to any network device.\n\nPlease connect this host to a switch with 802.1X enabled.');
            return;
        }

        // Get the other end of the link
        var otherConnector = (link.getConnector1() !== connector) ? link.getConnector1() : link.getConnector2();
        var switchHost = otherConnector.getConnectable().getOwner();

        if (switchHost.getType() !== 'switch') {
            alert('Host must be connected to a switch for 802.1X authentication.\n\nCurrent connection: ' + switchHost.getType());
            return;
        }

        if (!switchHost.getRADIUSClient || !switchHost.getRADIUSClient().isEnabled()) {
            alert('The connected switch does not have 802.1X enabled.\n\nPlease configure 802.1X Port Security on the switch first.');
            return;
        }

        // Get the port number on the switch
        var switchConnectable = switchHost.getConnectable();
        var portNum = -1;
        for (var i = 0; i < switchConnectable.getConnectorNumber(); i++) {
            if (switchConnectable.getConnector(i) === otherConnector) {
                portNum = i;
                break;
            }
        }

        if (portNum === -1) {
            alert('Could not determine switch port number');
            return;
        }

        showToast('🔐 Attempting authentication on ' + switchHost.getName() + ' port ' + portNum + '...', 'info');

        // Trigger authentication
        host.authenticate802_1X(switchHost.id, portNum);
    }
    
    // RADIUS Authentication Configuration for Routers
    function configureRADIUSAuth(routerId) {
        var router = network.getElement(routerId);
        if (!router || !router.getRADIUSClient) {
            alert('This router does not support RADIUS authentication');
            return;
        }
        
        var radiusClient = router.getRADIUSClient();
        if (!radiusClient) {
            alert('RADIUS client not initialized');
            return;
        }
        
        createBkDiv();
        
        var config = radiusClient.getConfig();
        
        var innerHTML = '<div style="padding:20px;">';
        innerHTML += '<h3 style="color:#667eea; margin-bottom:20px;">🔐 RADIUS Authentication Configuration</h3>';
        
        innerHTML += '<div style="background:#2a2d3a; padding:15px; border-radius:8px; margin-bottom:20px;">';
        innerHTML += '<h4 style="color:#a5b4fc; margin-bottom:15px;">Admin Authentication Settings</h4>';
        innerHTML += '<p style="color:#9ca3af; margin-bottom:15px;">Configure RADIUS authentication for router administrative access.</p>';
        
        innerHTML += '<div style="display:grid; grid-template-columns: 150px 1fr; gap:10px; align-items:center;">';
        
        innerHTML += '<label style="color:#9ca3af;">Enable RADIUS:</label>';
        innerHTML += '<input type="checkbox" id="radius_enabled" ' + (config.enabled ? 'checked' : '') + ' style="width:20px; height:20px;">';
        
        innerHTML += '<label style="color:#9ca3af;">RADIUS Server IP:</label>';
        innerHTML += '<input type="text" id="radius_server_ip" value="' + (config.serverIP || '') + '" placeholder="192.168.1.100" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px;">';
        
        innerHTML += '<label style="color:#9ca3af;">Port:</label>';
        innerHTML += '<input type="number" id="radius_port" value="' + config.serverPort + '" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px; width:100px;">';
        
        innerHTML += '<label style="color:#9ca3af;">Shared Secret:</label>';
        innerHTML += '<input type="password" id="radius_secret" value="' + config.sharedSecret + '" placeholder="radius123" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px;">';
        
        innerHTML += '<label style="color:#9ca3af;">NAS Identifier:</label>';
        innerHTML += '<input type="text" id="nas_identifier" value="' + config.nasIdentifier + '" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px;">';
        
        innerHTML += '<label style="color:#9ca3af;">Timeout (ms):</label>';
        innerHTML += '<input type="number" id="radius_timeout" value="' + config.timeout + '" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px; width:100px;">';
        
        innerHTML += '<label style="color:#9ca3af;">Retries:</label>';
        innerHTML += '<input type="number" id="radius_retries" value="' + config.retries + '" style="background:#1a1d2e; color:#e4e4e7; border:1px solid #4a5568; padding:5px; border-radius:4px; width:100px;">';
        
        innerHTML += '</div>';
        innerHTML += '</div>';
        
        // Authentication Statistics
        var stats = radiusClient.getStats();
        innerHTML += '<div style="background:#2a2d3a; padding:15px; border-radius:8px;">';
        innerHTML += '<h4 style="color:#a5b4fc; margin-bottom:15px;">Authentication Statistics</h4>';
        innerHTML += '<div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:10px;">';
        innerHTML += '<div>Status: <span style="color:' + (stats.enabled ? '#10b981' : '#ef4444') + ';">' + 
                    (stats.enabled ? 'Enabled' : 'Disabled') + '</span></div>';
        innerHTML += '<div>Server: <span style="color:' + (stats.serverConfigured ? '#10b981' : '#ef4444') + ';">' + 
                    (stats.serverConfigured ? 'Configured' : 'Not Configured') + '</span></div>';
        innerHTML += '</div>';
        innerHTML += '</div>';
        
        innerHTML += '</div>';
        
        var controls = '<button onclick="saveRADIUSAuthConfig(' + routerId + ')" style="background:#667eea; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Save</button>';
        controls += '<button onclick="testRADIUSAuth(' + routerId + ')" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; margin-right:10px; cursor:pointer;">Test Auth</button>';
        controls += '<button onclick="var w = uimanager.getWindow(\'divradiusauth\'); if(w) w.dispose(); removeBodyDiv(\'divbk\');" style="background:#6b7280; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Close</button>';
        
        var w = new UIWindow('divradiusauth', 'RADIUS Authentication - ' + router.getName(), 500, 450, true, 1.0);
        w.setContent(innerHTML);
        w.setControls(controls);
        w.render();
    }
    
    // Save RADIUS Authentication Configuration for Router
    function saveRADIUSAuthConfig(routerId) {
        var router = network.getElement(routerId);
        if (!router || !router.getRADIUSClient) return;
        
        var radiusClient = router.getRADIUSClient();
        
        var config = {
            enabled: document.getElementById('radius_enabled').checked,
            serverIP: document.getElementById('radius_server_ip').value,
            serverPort: parseInt(document.getElementById('radius_port').value),
            sharedSecret: document.getElementById('radius_secret').value,
            nasIdentifier: document.getElementById('nas_identifier').value,
            timeout: parseInt(document.getElementById('radius_timeout').value),
            retries: parseInt(document.getElementById('radius_retries').value)
        };
        
        radiusClient.setConfig(config);
        
        // Close the modal after saving
        uimanager.getWindow('divradiusauth').dispose();
        removeBodyDiv('divbk');
    }
    
    // Test RADIUS Authentication for Router
    function testRADIUSAuth(routerId) {
        var router = network.getElement(routerId);
        if (!router || !router.getRADIUSClient) return;
        
        var radiusClient = router.getRADIUSClient();
        
        // Save current configuration from the modal first
        var config = {
            enabled: document.getElementById('radius_enabled').checked,
            serverIP: document.getElementById('radius_server_ip').value,
            serverPort: parseInt(document.getElementById('radius_port').value),
            sharedSecret: document.getElementById('radius_secret').value,
            nasIdentifier: document.getElementById('nas_identifier').value,
            timeout: parseInt(document.getElementById('radius_timeout').value),
            retries: parseInt(document.getElementById('radius_retries').value)
        };
        
        radiusClient.setConfig(config);
        
        // Now check if it's enabled
        if (!radiusClient.isEnabled()) {
            alert('RADIUS authentication is not enabled. Please enable it first.');
            return;
        }
        
        if (!config.serverIP) {
            alert('RADIUS server IP not configured.');
            return;
        }
        
        var username = prompt('Enter admin username to test:');
        if (!username) return;
        
        var password = prompt('Enter password:');
        if (!password) return;
        
        radiusClient.authenticateAdmin(username, password, function(success, message) {
            if (success) {
                alert('✅ Authentication successful!\n\nAdmin user: ' + username + '\nAccess: Granted\nMessage: ' + message);
            } else {
                alert('❌ Authentication failed!\n\nAdmin user: ' + username + '\nAccess: Denied\nReason: ' + message);
            }
        });
    }


// ── Platform Integration Exports ──────────────────────────────
window.serializeProjectData = function () {
    if (typeof network !== 'undefined' && network) {
        var data = network.save();
        try {
            var parsed = JSON.parse(data);
            parsed.saveTimestamp = Date.now();
            parsed.saveDate = new Date().toISOString();
            return parsed;
        } catch (e) {
            return data;
        }
    }
    return null;
};

window.loadProjectData = function (data) {
    if (!data) return;
    if (typeof network === 'undefined' || !network) return;
    
    var parsed = (typeof data === 'string') ? JSON.parse(data) : data;
    
    if (parsed && parsed.elements) {
        initialElementCount = parsed.elements.length;
    }
    
    NetworkSimulator.initialdata = parsed;
    if (typeof network !== 'undefined' && network && network.load) {
        network.load(parsed);
    }
};

window.markAsChanged = function () {
    hasUnsavedChanges = true;
};
