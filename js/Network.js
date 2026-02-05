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

// Custom confirmation dialog
function showDeleteConfirmation(message, onConfirm) {
    // Remove any existing confirmation dialog
    var existingDialog = document.getElementById('delete-confirm-dialog');
    if (existingDialog) {
        document.body.removeChild(existingDialog);
    }
    
    // Create overlay
    var overlay = document.createElement('div');
    overlay.id = 'delete-confirm-dialog';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s ease;';
    
    // Create dialog box
    var dialog = document.createElement('div');
    dialog.style.cssText = 'background:linear-gradient(145deg, #ffffff, #f8f9fa);border-radius:12px;padding:24px;box-shadow:0 10px 40px rgba(0,0,0,0.3);max-width:400px;animation:slideIn 0.3s ease;';
    
    // Add content
    dialog.innerHTML = `
        <div style="margin-bottom:20px;">
            <h3 style="margin:0 0 12px 0;color:#2d3748;font-size:18px;font-weight:600;">Confirm Delete</h3>
            <p style="margin:0;color:#4a5568;font-size:14px;line-height:1.5;">${message}</p>
        </div>
        <div style="display:flex;gap:12px;justify-content:flex-end;">
            <button id="delete-cancel-btn" style="padding:8px 20px;background:#e2e8f0;color:#2d3748;border:none;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;">Cancel</button>
            <button id="delete-confirm-btn" style="padding:8px 20px;background:linear-gradient(135deg, #ef4444 0%, #dc2626 100%);color:white;border:none;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;">Delete</button>
        </div>
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            #delete-cancel-btn:hover { background: #cbd5e0 !important; }
            #delete-confirm-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); }
        </style>
    `;
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    // Add event handlers
    document.getElementById('delete-cancel-btn').onclick = function() {
        document.body.removeChild(overlay);
    };
    
    document.getElementById('delete-confirm-btn').onclick = function() {
        document.body.removeChild(overlay);
        onConfirm();
    };
    
    // Close on overlay click
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    };
    
    // Close on Escape key
    document.onkeydown = function(e) {
        if (e.key === 'Escape' && document.getElementById('delete-confirm-dialog')) {
            document.body.removeChild(document.getElementById('delete-confirm-dialog'));
        }
    };
}

function deleteSelected() 
{
    var selected = network.getSelected();
    if (selected !== null && (selected instanceof Host || (typeof selected.getType === 'function'))) 
    {
        // Check if it's a Host or any element with a getType method (like Firewall)
        showDeleteConfirmation("Do you really want to delete the selected element?", function() {
            network.deleteSelectedElement();
            uimanager.selectedElementDeleted();
        });
    } 
    else if ((selected !== null) && (selected instanceof Link)) 
    {
        showDeleteConfirmation("Do you really want to delete the selected link?", function() {
            network.deleteSelectedLink();
            uimanager.selectedLineDeleted();
        });
    }
}

var Network = function(imgs, context, w, h) 
{
    var elements = {};  // Changed from array to object
    var links = [];
    var images = imgs;
    var ctx = context;
    var _self = this;
    var W = w;
    var H = h;
    var selected = null;
    var renderInterval = null;
    
    this.init = function() 
    {
        // Clear any existing interval first
        if (renderInterval) {
            clearInterval(renderInterval);
        }
        renderInterval = setInterval(render, REFRESH_INTERVAL);
    };
    
    this.dispose = function() 
    {
        // Stop the render loop
        if (renderInterval) {
            clearInterval(renderInterval);
            renderInterval = null;
        }
        
        // Clear all elements
        for (var id in elements) {
            if (elements[id] && elements[id].dispose) {
                elements[id].dispose();
            }
        }
        elements = {};
        
        // Clear all links
        for (var i = links.length - 1; i >= 0; i--) {
            if (links[i] && links[i].dispose) {
                links[i].dispose();
            }
        }
        links = [];
    };
    
    this.getImages = function() 
    {
        return images;
    };
    
    this.createComputer = function(x, y) 
    {
        // Default to desktop for backward compatibility
        return this.createComputerWithType(x, y, 'desktop');
    };
    
    this.createComputerWithType = function(x, y, deviceType)
    {
        deviceType = deviceType || 'desktop';
        
        c = new Host("computer", 1);
        c.setDeviceType(deviceType);
        c.getDrawable().setPosition(x, y);
        
        // Set device properties and name based on type
        var deviceName = '';
        switch(deviceType) {
            case 'laptop':
                c.setHasWiFi(true);
                c.setHasEthernet(true);
                c.setDeviceIcon('💻');
                deviceName = 'Laptop';
                break;
            case 'smartphone':
                c.setHasWiFi(true);
                c.setHasEthernet(false);
                c.setConnectionType('wifi'); // WiFi-only device
                c.setDeviceIcon('📱');
                deviceName = 'Phone';
                break;
            case 'gaming':
                c.setHasWiFi(true);
                c.setHasEthernet(true);
                c.setDeviceIcon('🎮');
                deviceName = 'Console';
                break;
            case 'smarttv':
                c.setHasWiFi(true);
                c.setHasEthernet(true);
                c.setDeviceIcon('📺');
                deviceName = 'SmartTV';
                break;
            case 'iot':
                c.setHasWiFi(true);
                c.setHasEthernet(false);
                c.setConnectionType('wifi'); // WiFi-only device
                c.setDeviceIcon('💡'); // Smart device icon (like smart bulbs)
                deviceName = 'IoT';
                break;
            case 'desktop':
            default:
                c.setHasWiFi(false);
                c.setHasEthernet(true);
                c.setDeviceIcon('🖥️');
                deviceName = 'Desktop';
                break;
        }
        
        // Set a descriptive name with the device type and ID
        c.setName(deviceName + ' ' + c.id);
        
        // Use device-specific image if available, otherwise fall back to default
        if (window.deviceImages && window.deviceImages[deviceType]) {
            c.getDrawable().setImage(window.deviceImages[deviceType]);
        } else {
            c.getDrawable().setImage(images[IMAGE_COMPUTER]);
        }
        
        var dhcpClient = new DHCPClient(0);
        c.addApp(dhcpClient, -1, false);
        
        var dnsClient = new DNSClient(0);
        c.addApp(dnsClient, -1, false);
        
        // Only add HTTP client and Email client for full computers (not Smart TVs or IoT devices)
        if (deviceType !== 'smarttv' && deviceType !== 'iot') {
            var httpClient = new HTTPClient(0);
            c.addApp(httpClient, -1, false);
            
            var emailClient = new EmailClient(0);
        // console.log('Adding EmailClient to computer:', emailClient);
            c.addApp(emailClient, -1, false);
        // console.log('EmailClient added, checking if it has getId:', emailClient.getId ? emailClient.getId() : 'NO getId METHOD');
        }
        
        elements[c.id] = c;
        
        return c.id;
    };
    
    this.createDHCPServer = function(x, y) 
    {
        c = new Host("dhcpserver", 1);
        c.getDrawable().setPosition(x, y);
        c.getDrawable().setImage(images[IMAGE_SERVERDHCP]);
        var dhcpServer = new DHCPServer(0);
        c.addApp(dhcpServer, 67, true);
        elements[c.id] = c;
        
        return c.id;
    };
    
    this.createDNSServer = function(x, y) 
    {
        // console.log('Creating DNS Server...');
        c = new Host("dnsserver", 1);
        c.getDrawable().setPosition(x, y);
        c.getDrawable().setImage(images[IMAGE_SERVERDNS]);
        var dnsServer = new DNSServer(0);
        c.addApp(dnsServer, 53, true);
        elements[c.id] = c;
        // console.log('DNS Server created with ID:', c.id);
        // console.log('Elements now contains:', Object.keys(elements).length, 'items');
        // console.log('Verify it was added:', elements[c.id] ? 'YES' : 'NO');
        
        return c.id;
    };
    
    this.createHTTPServer = function(x, y) 
    {
        // console.log('Creating HTTP Server...');
        c = new Host("httpserver", 1);
        c.getDrawable().setPosition(x, y);
        c.getDrawable().setImage(images[IMAGE_SERVERWEB]);
        var httpServer = new HTTPServer(0);
        c.addApp(httpServer, 80, true);
        elements[c.id] = c;
        // console.log('HTTP Server created with ID:', c.id);
        // console.log('Elements now contains:', Object.keys(elements).length, 'items');
        // console.log('Verify it was added:', elements[c.id] ? 'YES' : 'NO');
        
        return c.id;
    };
    
    this.createEmailServer = function(x, y) 
    {
        // console.log('Creating Email Server...');
        c = new Host("emailserver", 1);
        c.getDrawable().setPosition(x, y);
        c.getDrawable().setImage(images[IMAGE_SERVERDHCP]); // Use DHCP server image as base, overlay will be added
        
        // Create and add the email server application
        var emailServer = new EmailServer(0);
        
        // Add SMTP service on port 25
        c.addApp(emailServer, 25, true);
        
        // Also register on POP3 port 110
        c.addApp(emailServer, 110, true);
        
        // Register on submission port 587
        c.addApp(emailServer, 587, true);
        
        // Store in elements
        elements[c.id] = c;
        
        // console.log('Email Server created with ID:', c.id);
        // console.log('Email Server configured with SMTP (25), POP3 (110), and Submission (587)');
        
        return c.id;
    };
    
    this.createRADIUSServer = function(x, y) 
    {
        c = new Host("radiusserver", 1);
        c.getDrawable().setPosition(x, y);
        c.getDrawable().setImage(images[IMAGE_SERVERDHCP]); // Using DHCP server image as base with overlay
        
        // Create and add the RADIUS server application
        var radiusServer = new RADIUSServer(0);
        
        // Add Authentication service on port 1812
        c.addApp(radiusServer, 1812, true);
        
        // Also register on Accounting port 1813
        c.addApp(radiusServer, 1813, true);
        
        // Store in elements
        elements[c.id] = c;
        
        return c.id;
    };
    
    this.createSwitch = function(x, y, ports) 
    {
        s = new Host("switch", ports);
        s.getDrawable().setPosition(x, y);
        s.getDrawable().setImage(images[IMAGE_SWITCH]);
        elements[s.id] = s;
        
        // Set network reference for RADIUS client if it exists
        if (s.getRADIUSClient && s.getRADIUSClient()) {
            s.getRADIUSClient().setNetwork(this);
        }
        
        return s.id;
    };
    
    this.createGameServer = function(x, y) 
    {
        // console.log('Creating Game Server...');
        var gs = new Host("gameserver", 1);
        gs.getDrawable().setPosition(x, y);
        gs.getDrawable().setImage(images[IMAGE_COMPUTER]); // Will use computer image for now
        
        // Set game server specific properties before setting isGameServer
        gs.setGamePort(25565); // Default Minecraft port
        gs.setGameType("minecraft");
        gs.setMaxPlayers(10);
        gs.setServerName("My Game Server");
        gs.setServerStatus("offline"); // Initialize server as offline
        
        // Store in elements
        elements[gs.id] = gs;
        
        // Set isGameServer flag last to trigger menu refresh with all options
        gs.setIsGameServer(true);
        
        // console.log('Game Server created with ID:', gs.id);
        // console.log('Game Server configured on port 25565');
        
        return gs.id;
    };
    
    this.createRouter = function(x, y) 
    {
        r = new Host("router", 2);
        r.getDrawable().setPosition(x, y);
        r.getDrawable().setImage(images[IMAGE_ROUTER]);
        elements[r.id] = r;
        
        // Set network reference for RADIUS client if it exists
        if (r.getRADIUSClient && r.getRADIUSClient()) {
            r.getRADIUSClient().setNetwork(this);
        }
        
        return r.id;
    };
    
    this.createFirewall = function(x, y)
    {
        // Create firewall instance
        var f = new Firewall();
        
        // Set up drawable (Drawable expects owner in constructor)
        f.drawable = new Drawable(f);
        f.drawable.setPosition(x, y);
        f.drawable.setImage(images[IMAGE_FIREWALL] || images[IMAGE_ROUTER]); // Use router image as fallback
        
        // Add to network elements
        elements[f.id] = f;
        
        // Add some default rules
        f.addDefaultRules();
        
        return f.id;
    };
    
    this.createLink = function(e1, c1, e2, c2) 
    {
        var element1 = elements[e1];
        var element2 = elements[e2];
        
        var connector1 = element1.getConnectable().getConnector(c1);
        var connector2 = element2.getConnectable().getConnector(c2);
        var success = false;
        
        if ((connector1 !== null) && (connector2 !== null)) 
        {
            var link = new Link(connector1, connector2);
            links.push(link);
            success = links.length;
        }
        
        return success;
    };
    
    this.getElement = function(id) 
    {
        var result = null;
        
        result = elements[id];
        
        return result;
    };
    
    this.getAllElements = function()
    {
        return elements;
    };
    
    this.getLink = function(pos)
    {
        var result = null;

        if (pos < links.length)
        {
            result = links[pos];
        }

        return result;
    };

    this.getLinks = function()
    {
        return links;
    };

    function countUntilDestination(connector, dstIP, dstMAC, visited) 
    {
        var result = -1;
        // Si el conector no tiene link, devolvemos -1
        if (connector.isConnected()) 
        {
            // Si el conector tiene link, cogemos el conectable del otro extremo
            var c = connector.getConnectedConnector().getConnectable();
            // Si no lo hemos visitado
            if (visited.indexOf(c) === -1) 
            {
                // Si tiene la dirección, devolvemos 0
                if (c.compatibleIP(dstIP, false) || c.compatibleMAC(dstMAC, false)) 
                {
                    result = 0;
                } 
                else 
                {
                    // Si no, contamos hasta el destino en cada uno de sus conectores
                    var min = 100000;
                    for (var i = 0; i < c.getConnectorNumber(); i++) 
                    {
                        visited.push(c);
                        var num = countUntilDestination(c.getConnector(i), dstIP, dstMAC, visited);
                        num = (num === -1) ? -1 : num + 1;
                        if ((num !== -1) && (num < min)) 
                        {
                            result = c.getConnector(i);
                            min = num;
                        }
                    }
                    
                    if (min !== 100000) 
                    {
                        result = min;
                    }
                }
            }
        }
        
        return result;
    }
    
    this.findNextConnectorInPath = function(currentConnectable, dstIP, dstMAC) 
    {
        // Por cada uno de los conectores del conectable, contamos cuántos pasos hay desde cada uno
        var result = null;
        var min = 100000;
        for (var i = 0; i < currentConnectable.getConnectorNumber(); i++) 
        {
            var visited = [];
            visited.push(currentConnectable);
            var num = countUntilDestination(currentConnectable.getConnector(i), dstIP, dstMAC, visited);
            num = (num === -1) ? -1 : num + 1;
            if ((num !== -1) && (num < min)) 
            {
                result = currentConnectable.getConnector(i);
                min = num;
            }
        }
        
        return result;
    };
    
    this.getElementInCoords = function(x, y) 
    {
        var result = null;
        var i = 0;
        var keys = Object.keys(elements);
        while ((result === null) && (i < keys.length)) 
        {
            var drawable = elements[keys[i]].getDrawable();
            // Check if drawable exists and has the hasCoords method
            if (drawable && typeof drawable.hasCoords === 'function' && drawable.hasCoords(x, y)) 
            {
                result = elements[keys[i]];
            } 
            else 
            {
                i++;
            }
        }
        
        return result;
    };
    
    this.getMessageInCoords = function(x, y) 
    {
        var result = null;
        var i = 0;
        
        while ((result === null) && (i < links.length)) 
        {
            var messagecount = links[i].getMessageCount();
            var j = 0;
            while ((result === null) && (j < messagecount)) 
            {
                if (links[i].messageHasCoords(j, x, y)) 
                {
                    result = links[i].getMessage(j);
                } 
                else 
                {
                    j++;
                }
            }
            if (result === null) 
            {
                i++;
            }
        }
        
        return result;
    };
    
    this.getPosForElement = function(elem) 
    {
        // Since elements is now an object, we need to find the position differently
        // Return the element's ID which serves as its position/index
        if (elem && elem.id && elements[elem.id]) {
            return elem.id;
        }
        
        // If not found by ID, search through the object
        var keys = Object.keys(elements);
        for (var i = 0; i < keys.length; i++) {
            if (elements[keys[i]] === elem) {
                return keys[i];
            }
        }
        
        return -1; // Not found
    };
    
    this.getLinkInCoords = function(x, y) 
    {
        var result = null;
        var i = 0;
        
        while ((result === null) && (i < links.length)) 
        {
            if (links[i].hasCoords(x, y)) 
            {
                result = links[i];
            } 
            else 
            {
                i++;
            }
        }
        
        return result;
    };
    
    this.setSelected = function(s) 
    {
        selected = s;
    };
    
    this.getSelected = function() 
    {
        return selected;
    };
    
    function deleteLink(link) 
    {
        link.getConnector1().setLink(null);
        link.getConnector2().setLink(null);
        var pos = links.indexOf(link);
        links.splice(pos, 1);
        link.dispose();
    }
    
    function deleteElement(element) 
    {
        // Use the element parameter, not selected
        var num = element.getConnectable().getConnectorNumber();
        for (var i = 0; i < num; i++) 
        {
            var connector = element.getConnectable().getConnector(i);
            if (connector.getLink() !== null) 
            {
                deleteLink(connector.getLink());
            }
        }
        // Fixed: elements is an object, not an array, so we delete by ID
        if (element && element.id) {
        // console.log('Deleting element with ID:', element.id);
            delete elements[element.id];
        } else {
            console.error('Cannot delete element - no ID found:', element);
        }
    }
    
    this.deleteSelectedLink = function() 
    {
        deleteLink(selected);
        selected = null;
    };
    
    this.deleteSelectedElement = function() 
    {
        deleteElement(selected);
        selected.dispose();
        selected = null;
    };
    
    function renderGroups(ctx) 
    {
        var groups = [];
        var keys = Object.keys(elements);
        for (var i = 0; i < keys.length; i++) 
        {
            var host = elements[keys[i]];
            if (host.getGroup() !== null) 
            {
                if (!(host.getGroup() in groups)) 
                {
                    var data = {};
                    data.minx = 1000000;
                    data.miny = 1000000;
                    data.maxx = 0;
                    data.maxy = 0;
                    
                    groups[host.getGroup()] = data;
                }
                var data = groups[host.getGroup()];
                var rect = host.getDrawable().getRect();
                if (data.minx > rect.x) 
                {
                    data.minx = rect.x;
                }
                if (data.miny > rect.y) 
                {
                    data.miny = rect.y;
                }
                if (data.maxx < rect.x + rect.width) 
                {
                    data.maxx = rect.x + rect.width;
                }
                if (data.maxy < rect.y + rect.height) 
                {
                    data.maxy = rect.y + rect.height;
                }
            }
        }
        
        keys = Object.keys(groups);
        for (var i = 0; i < keys.length; i++) 
        {
            var data = groups[keys[i]];
            ctx.strokeStyle = "rgba(255,255,255,0.5)";
            ctx.lineWidth = 4;
            ctx.strokeRect(data.minx - 10, data.miny - 10, data.maxx - data.minx + 20, data.maxy - data.miny + 20);
            ctx.font = '16pt';
            ctx.fillStyle = "rgba(255,255,255,1.0)";
            ctx.fillText(keys[i], data.minx, data.maxy + 20);
        }
    }
    
    function render() 
    {
        // Clear canvas with dark background
        ctx.fillStyle = "#1a1d2e";
        ctx.fillRect(0, 0, W, H);
        
        // Apply viewport transformations if available
        ctx.save();
        
        if (typeof canvasViewport !== 'undefined') {
            // Apply zoom and pan transformations
            ctx.translate(canvasViewport.offsetX, canvasViewport.offsetY);
            ctx.scale(canvasViewport.zoom, canvasViewport.zoom);
        }
        
        // Draw grid background (optional, for better visual reference)
        drawGrid(ctx);
        
        // Draw links
        for (var i = 0; i < links.length; i++) 
        {
            links[i].update();
            links[i].draw(ctx, selected === links[i]);
        }
        
        // Draw elements
        var keys = Object.keys(elements);
        for (var i = 0; i < keys.length; i++) 
        {
            elements[keys[i]].getDrawable().draw(ctx);
        }
        
        renderGroups(ctx);
        
        // UI manager needs to render selection within transformed context
        // Pass true to indicate we're in transformed space
        uimanager.renderInWorldSpace(ctx);
        
        // Restore context for screen-space UI elements
        ctx.restore();
        
        // Render screen-space UI elements (menus, etc)
        uimanager.renderInScreenSpace(ctx);
        
        if (DEBUG)
        {
            ctx.fillStyle = "#ffffff";
            var coords = uimanager.getMousePos();
            ctx.fillText("Mouse coords - X: " + coords.X + " - Y: " + coords.Y, 10, 100);
        }
    }
    
    function drawGrid(ctx) {
        // Optional grid for better visual reference
        if (typeof canvasViewport === 'undefined' || canvasViewport.zoom < 0.5) return;
        
        var gridSize = 50;
        var startX = -canvasViewport.offsetX / canvasViewport.zoom;
        var startY = -canvasViewport.offsetY / canvasViewport.zoom;
        var endX = (W - canvasViewport.offsetX) / canvasViewport.zoom;
        var endY = (H - canvasViewport.offsetY) / canvasViewport.zoom;
        
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1 / canvasViewport.zoom;
        
        for (var x = Math.floor(startX / gridSize) * gridSize; x < endX; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
            ctx.stroke();
        }
        
        for (var y = Math.floor(startY / gridSize) * gridSize; y < endY; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
        }
    }
    
    this.setDimensions = function(width, height) {
        W = width;
        H = height;
    };
    
    this.getBounds = function() {
        if (Object.keys(elements).length === 0) {
            return null;
        }
        
        var minX = Infinity, minY = Infinity;
        var maxX = -Infinity, maxY = -Infinity;
        
        var keys = Object.keys(elements);
        for (var i = 0; i < keys.length; i++) {
            var rect = elements[keys[i]].getDrawable().getRect();
            minX = Math.min(minX, rect.x);
            minY = Math.min(minY, rect.y);
            maxX = Math.max(maxX, rect.x + rect.width);
            maxY = Math.max(maxY, rect.y + rect.height);
        }
        
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY,
            width: maxX - minX,
            height: maxY - minY
        };
    };
    
    this.render = render;
    
    this.save = function() 
    {
        var result = {};
        result.version = 1;
        result.lastusedid = lastusedid;
        result.saveTimestamp = Date.now();  // Add timestamp to track save versions
        result.saveDate = new Date().toISOString();
        result.elements = [];
        result.links = [];
        
        var keys = Object.keys(elements);
        // console.log('Saving network with', keys.length, 'elements');
        // console.log('Element IDs present:', keys);
        
        // First, let's see what's REALLY in elements
        // console.log('=== CHECKING ELEMENTS BEFORE SAVE ===');
        for (var key in elements) {
            if (elements.hasOwnProperty(key)) {
        // console.log('Key:', key, 'Element:', elements[key], 'Type:', elements[key] ? elements[key].getType() : 'null');
            }
        }
        
        // Debug: Check what's actually in elements
        var elementTypes = {};
        for (var i = 0; i < keys.length; i++) 
        {
            var elem = elements[keys[i]];
            if (!elem) {
                console.error('WARNING: Null element at key:', keys[i]);
                continue;
            }
            
            var elementData = elem.save();
        // console.log('Saving element:', elementData.type, 'ID:', elementData.id, 'Name:', elementData.name);
            
            // Count element types for debugging
            elementTypes[elementData.type] = (elementTypes[elementData.type] || 0) + 1;
            
            result.elements.push(elementData);
        }
        
        // console.log('Element type summary:', elementTypes);
        
        for (var i = 0; i < links.length; i++) 
        {
            result.links.push(links[i].save());
        }
        
        return JSON.stringify(result);
    };
    
    this.load = function(data) 
    {
        // console.log('=== LOADING NETWORK DATA ===');
        // console.log('Save timestamp:', data.saveTimestamp, 'Date:', data.saveDate);
        // console.log('Last used ID:', data.lastusedid);
        // console.log('Raw data:', JSON.stringify(data).substring(0, 500) + '...');
        // console.log('Number of elements in data:', data.elements ? data.elements.length : 0);
        // console.log('Number of links in data:', data.links ? data.links.length : 0);
        
        // Check if we're about to load old data over newer data
        if (typeof lastLoadedTimestamp !== 'undefined' && lastLoadedTimestamp && data.saveTimestamp) {
            if (data.saveTimestamp < lastLoadedTimestamp) {
                console.error('WARNING: Attempting to load OLDER data!');
                console.error('Current timestamp:', lastLoadedTimestamp);
                console.error('New data timestamp:', data.saveTimestamp);
                // You could optionally prevent loading here
                // return;
            }
        }
        
        // Store the timestamp of loaded data
        if (data.saveTimestamp) {
            window.lastLoadedTimestamp = data.saveTimestamp;
        }
        
        if (data.elements) {
        // console.log('Element types in saved data:');
            var types = {};
            data.elements.forEach(function(el) {
                types[el.type] = (types[el.type] || 0) + 1;
            });
        // console.log(types);
        }
        
        uimanager.reset();
        switch (data.version) 
        {
            case 1:
                loadv1(data);
                break;
        }
        ;
    };
    
    function loadv1(data) 
    {
        links = [];
        elements = {};  // Changed from array to object
        
        // console.log('Loading network with', data.elements.length, 'elements');
        
        // Check for duplicate IDs before loading
        var idCheck = {};
        for (var i = 0; i < data.elements.length; i++) 
        {
            if (idCheck[data.elements[i].id]) {
                console.warn('WARNING: Duplicate element ID found:', data.elements[i].id, 
                           'Type1:', idCheck[data.elements[i].id], 'Type2:', data.elements[i].type);
            }
            idCheck[data.elements[i].id] = data.elements[i].type;
        }
        
        for (var i = 0; i < data.elements.length; i++) 
        {
            try {
        // console.log('Loading element:', data.elements[i].type || 'NO TYPE', 'ID:', data.elements[i].id);
                var element = null;
                
                // Check if this is a firewall (by type or by name pattern for old saves)
                var isFirewall = (data.elements[i].type === "firewall") || 
                                 (data.elements[i].name && data.elements[i].name.startsWith("Firewall"));
                
                if (isFirewall) {
        // console.log('Loading as Firewall:', data.elements[i].name);
                    element = new Firewall();
                    element.load(data.elements[i]);
                } else {
                    // Handle Host elements (computer, server, router, switch)
                    var ports = 1;
                    if (data.elements[i].ports) 
                    {
                        ports = data.elements[i].ports;
                    } 
                    else if (data.elements[i].type === "router") 
                    {
                        ports = 2;
                    }
                    // Default to computer type if type is missing
                    var hostType = data.elements[i].type || "computer";
                    element = new Host(hostType, ports);
                    element.load(data.elements[i]);
                }
                
                // Check if ID already exists (shouldn't happen but let's be safe)
                if (elements[element.id]) {
                    console.error('ERROR: Element with ID', element.id, 'already exists! Old type:', 
                                elements[element.id].getType(), 'New type:', data.elements[i].type);
                    // Generate new ID to avoid collision
                    element.id = getNextID();
        // console.log('Assigned new ID:', element.id);
                }
                
                elements[element.id] = element;
        // console.log('Successfully loaded element:', data.elements[i].type, 'ID:', element.id);
                
                // Verify element was actually added
                if (!elements[element.id]) {
                    console.error('ERROR: Element was not added to elements collection!', element.id);
                }
            } catch (e) {
                console.error('Failed to load element:', data.elements[i].type, 'Error:', e);
                console.error('Element data:', data.elements[i]);
            }
        }
        
        // After loading all elements, set network reference for RADIUS clients
        for (var id in elements) {
            var elem = elements[id];
            if (elem && elem.getRADIUSClient && elem.getRADIUSClient()) {
                elem.getRADIUSClient().setNetwork(network);
            }
        }
        
        // After loading all elements, check what we have
        // console.log('=== LOAD COMPLETE ===');
        var loadedTypes = {};
        var loadedElements = Object.keys(elements);
        // console.log('Total elements loaded:', loadedElements.length);
        loadedElements.forEach(function(id) {
            var elem = elements[id];
            if (elem) {
                var type = elem.getType ? elem.getType() : 'unknown';
                loadedTypes[type] = (loadedTypes[type] || 0) + 1;
            }
        });
        // console.log('Loaded element types:', loadedTypes);
        
        for (var i = 0; i < data.links.length; i++) 
        {
            var c1 = _self.findConnector(data.links[i].connector1);
            var c2 = _self.findConnector(data.links[i].connector2);
            var link = new Link(c1, c2);
            link.load(data.links[i]);
            links.push(link);
        }
        
        lastusedid = data.lastusedid;
    }
    
    this.findConnector = function(id) 
    {
        var keys = Object.keys(elements);
        var result = null;
        var i = 0;
        while ((result === null) && (i < keys.length)) 
        {
            result = elements[keys[i]].getConnectable().findConnector(id);
            i++;
        }
        
        return result;
    };
};
