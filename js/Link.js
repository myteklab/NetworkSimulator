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

function selectLinkConnectors(id1, id2) 
{
    createBkDiv();
    createLinkConnectorsDiv(id1, id2);
}

function getElementConnectorsSelectables(host) 
{
    var result = "";
    for (var i = 0; i < host.getConnectable().getConnectorNumber(); i++) 
    {
        var connector = host.getConnectable().getConnector(i);
        var disabledTxt = connector.isConnected() ? " disabled='disabled' " : "";
        result += "<input type='radio' name='link_host_" + host.id + "' value='" + i + "' id='link_host_" + host.id + "_" + i + "' " + disabledTxt + "/>";
        result += host.getConnectorDesc(i);
        result += "<br/>";
    }
    return result;
}

function createLinkConnectorsDiv(id1, id2) 
{
    var host1 = network.getElement(id1);
    var host2 = network.getElement(id2);
    /*var div = document.createElement("div");
    var l = window.innerWidth / 2 - 200;
    var t = window.innerHeight / 2 - 200;
    
    div.setAttribute('style', 'position:absolute;top:' + t + 'px;left:' + l + 'px;z-index:110;background-color:white;width:400px;height:400px;border-radius:10px;border:1px solid;padding:10px;text-align:center;');
    div.setAttribute('id', 'divlinkconnectors');*/
    var html = '<table style="font-size:0.8em;">';
    html += '<tr><th>'+host1.getName()+'</th><th>'+host2.getName()+'</th></tr>';
    html += '<tr>';
    html += '<td>';
    html += getElementConnectorsSelectables(host1);
    html += '</td>';
    html += '<td>';
    html += getElementConnectorsSelectables(host2);
    html += '</td>';
    html += '</tr>';
    html += '</table>';
    var controls = '<p>\
  <input type="button" id="upload" value="'+_("Save")+'" onclick="saveLinkConnectors(' + id1 + ',' + id2 + ');" />\
  <input type="button" id="cancel" value="'+_("Cancel")+'" onclick="cancelLinkConnectors();" />\
  </p>';
    /*div.innerHTML = html;
    document.body.appendChild(div);*/
    var w = new UIWindow('divlinkconnectors', 'Create Link', 400, 400, false, 1.0);
    w.setContent(html);
    w.setControls(controls);
    w.render();
}

function saveLinkConnectors(id1, id2) 
{
    var selected1 = document.querySelector('input[name="link_host_' + id1 + '"]:checked');
    var selected2 = document.querySelector('input[name="link_host_' + id2 + '"]:checked');
    if ((selected1 !== null) && (selected2 !== null)) 
    {
        var c1 = selected1.value;
        var c2 = selected2.value;
        if ((c1 !== null) && (c2 !== null)) 
        {
            network.createLink(id1, c1, id2, c2);
            uimanager.getWindow("divlinkconnectors").dispose();
            removeBodyDiv('divbk');
        }
    }
}

function cancelLinkConnectors() 
{
    uimanager.getWindow("divlinkconnectors").dispose();
    removeBodyDiv('divbk');
}

function viewLinkInfo(linkId) {
    var link = network.getLink(linkId);
    if (!link) return;
    
    var info1 = link.getInterfaceInfo(1);
    var info2 = link.getInterfaceInfo(2);
    
    createBkDiv();
    
    var html = '<div id="divlinkinfo" style="' +
        'position: absolute; ' +
        'left: 50%; top: 50%; ' +
        'transform: translate(-50%, -50%); ' +
        'background: #2c3e50; ' +
        'border: 2px solid #34495e; ' +
        'border-radius: 8px; ' +
        'padding: 20px; ' +
        'color: #ecf0f1; ' +
        'font-family: Arial, sans-serif; ' +
        'min-width: 400px; ' +
        'box-shadow: 0 4px 6px rgba(0,0,0,0.3);">';
    
    html += '<h3 style="margin-top: 0; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Link Information</h3>';
    
    // First device
    html += '<div style="margin-bottom: 15px;">';
    html += '<h4 style="color: #3498db; margin-bottom: 5px;">📍 Device 1: ' + info1.deviceName + '</h4>';
    html += '<table style="margin-left: 20px; font-size: 14px;">';
    html += '<tr><td style="padding-right: 15px;">Type:</td><td>' + info1.deviceType + '</td></tr>';
    html += '<tr><td>Interface:</td><td><strong>' + (info1.interfaceLabel || 'Port ' + info1.interfaceIndex) + '</strong> (index: ' + info1.interfaceIndex + ')</td></tr>';
    if (info1.ipAddress) {
        html += '<tr><td>IP Address:</td><td>' + info1.ipAddress + '</td></tr>';
    } else {
        html += '<tr><td>IP Address:</td><td style="color: #95a5a6;">None configured</td></tr>';
    }
    html += '</table>';
    html += '</div>';
    
    // Connection line
    html += '<div style="text-align: center; color: #7f8c8d; margin: 10px 0;">↕ Connected to ↕</div>';
    
    // Second device
    html += '<div style="margin-bottom: 15px;">';
    html += '<h4 style="color: #3498db; margin-bottom: 5px;">📍 Device 2: ' + info2.deviceName + '</h4>';
    html += '<table style="margin-left: 20px; font-size: 14px;">';
    html += '<tr><td style="padding-right: 15px;">Type:</td><td>' + info2.deviceType + '</td></tr>';
    html += '<tr><td>Interface:</td><td><strong>' + (info2.interfaceLabel || 'Port ' + info2.interfaceIndex) + '</strong> (index: ' + info2.interfaceIndex + ')</td></tr>';
    if (info2.ipAddress) {
        html += '<tr><td>IP Address:</td><td>' + info2.ipAddress + '</td></tr>';
    } else {
        html += '<tr><td>IP Address:</td><td style="color: #95a5a6;">None configured</td></tr>';
    }
    html += '</table>';
    html += '</div>';
    
    // Close button
    html += '<div style="text-align: center; margin-top: 20px;">';
    html += '<button onclick="closeLinkInfo();" style="' +
        'background: #3498db; ' +
        'color: white; ' +
        'border: none; ' +
        'padding: 8px 20px; ' +
        'border-radius: 4px; ' +
        'cursor: pointer; ' +
        'font-size: 14px;"' +
        '>Close</button>';
    html += '</div>';
    html += '</div>';
    
    document.body.insertAdjacentHTML('beforeend', html);
}

function closeLinkInfo() {
    var div = document.getElementById('divlinkinfo');
    if (div) {
        div.remove();
    }
    removeBodyDiv('divbk');
}

/*
- El link tiene un UILine asociado
- Cada vez que se mueve uno de los drawables se actualiza el UILine
- Dispose: borra el UILine
*/

var Link = function(c1, c2) 
{
    this.id = getNextID();
    var connector1 = c1;
    var connector2 = c2;
    var messages = [];
    var _self = this;
    var uiline = null;
    var menu = null;
    
    this.save = function() 
    {
        var result = {};
        result.version = 1;
        result.id = this.id;
        result.connector1 = connector1.id;
        result.connector2 = connector2.id;
        
        return result;
    };
    
    this.load = function(data) 
    {
        this.id = data.id;
    };
    
    function init() 
    {
        connector1.setLink(_self);
        connector2.setLink(_self);
        var vertices = getVertices();
        uiline = new UILine(null, null, _self, vertices.x1, vertices.y1, vertices.x2, vertices.y2, 0);
        uimanager.addClickable(uiline);
        connector1.getConnectable().getOwner().getDrawable().addObserver(_self);
        connector2.getConnectable().getOwner().getDrawable().addObserver(_self);
        menu = new UIMenu("Link", 0, 0, false);
        addStaticMenu();
        uimanager.addMenu(menu);
    }
    
    function addStaticMenu() 
    {
        menu.addEntry("img/64/inspect.png", "View link info", "viewLinkInfo(" + _self.id + ");");
        menu.addEntry("img/64/delete.png", "Delete element", "deleteSelected();");
    }
    
    this.drawableChanged = function() 
    {
        var vertices = getVertices();
        uiline.setCoords(vertices.x1, vertices.y1, vertices.x2, vertices.y2, 0);
    }
    
    this.dispose = function() 
    {
        uimanager.removeClickable(uiline);
        connector1.getConnectable().getOwner().getDrawable().deleteObserver(_self);
        connector2.getConnectable().getOwner().getDrawable().deleteObserver(_self);
        if (menu.getVisible()) 
        {
            menu.hide();
        }
        uimanager.deleteMenu(menu);
    };
    
    this.getConnector1 = function() 
    {
        return connector1;
    };
    
    this.getConnector2 = function() 
    {
        return connector2;
    };
    
    this.getInterfaceInfo = function(connectorNum) {
        var connector = (connectorNum === 1) ? connector1 : connector2;
        var owner = connector.getConnectable().getOwner();
        var ownerType = owner.getType();
        var ownerName = owner.getName ? owner.getName() : ownerType + ' ' + owner.id;
        var connectorPos = connector.getConnectable().getConnectorPos(connector);
        var label = getInterfaceLabel(connector);
        var ipInfo = connector.getIPInfo();
        var ip = ipInfo ? ipInfo.getIPv4() : null;
        
        return {
            deviceName: ownerName,
            deviceType: ownerType,
            interfaceIndex: connectorPos,
            interfaceLabel: label,
            ipAddress: ip
        };
    };
    
    this.delete = function() 
    {
        connector1.setLink(null);
        connector2.setLink(null);
    };
    
    this.addMessage = function(orig, message) {
        var data = {};
        data.pos = 0;
        data.message = message;
        data.orig = orig;
        data.dst = (orig === connector1) ? connector2 : connector1;
        messages.push(data);
    };
    
    function getMessageCoords(pos) 
    {
        var origX = messages[pos].orig.getConnectable().getOwner().getDrawable().getCenterX();
        var origY = messages[pos].orig.getConnectable().getOwner().getDrawable().getCenterY();
        var dstX = messages[pos].dst.getConnectable().getOwner().getDrawable().getCenterX();
        var dstY = messages[pos].dst.getConnectable().getOwner().getDrawable().getCenterY();
        var X = origX + (dstX - origX) * messages[pos].pos / 100;
        var Y = origY + (dstY - origY) * messages[pos].pos / 100;
        
        return {x: X,y: Y};
    }

    function drawMessageInfo(ctx, message)
    {
        var pos = 12; // Increased initial spacing from packet image
        ctx.font = 'bold 8pt sans-serif'; // Slightly smaller font for better fit
        // White text with shadow for visibility
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillStyle = "#ffffff";
        var parts = message.getStrInfo().split("\n");
        for (var i = 0; i < parts.length; i++) 
        {
            ctx.fillText(parts[i], 0, message.getImage().height + pos);
            pos += 12; // Increased spacing from 8 to 12 for better readability
        }
        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
    
    function drawMessages(ctx) 
    {
        for (var i = 0; i < messages.length; i++) 
        {
            var coords = getMessageCoords(i);
            ctx.save();
            ctx.translate(coords.x, coords.y);
            ctx.drawImage(messages[i].message.getImage(), 0, 0);
            drawMessageInfo(ctx,messages[i].message);
            ctx.restore();
        }
    }
    
    function getVertices() 
    {
        return {
            x1: connector1.getConnectable().getOwner().getDrawable().getCenterX(),
            y1: connector1.getConnectable().getOwner().getDrawable().getCenterY(),
            x2: connector2.getConnectable().getOwner().getDrawable().getCenterX(),
            y2: connector2.getConnectable().getOwner().getDrawable().getCenterY()
        };
    }
    
    function getInterfaceLabel(connector) {
        var owner = connector.getConnectable().getOwner();
        var ownerType = owner.getType();
        var connectorPos = connector.getConnectable().getConnectorPos(connector);
        
        // For routers, show WAN/LAN labels
        if (ownerType === 'router') {
            if (connectorPos === 0) return 'WAN';
            if (connectorPos === 1) return 'LAN';
            return 'Port ' + connectorPos;
        }
        
        // For switches, show port numbers
        if (ownerType === 'switch') {
            return 'Port ' + connectorPos;
        }
        
        // For devices with multiple interfaces
        var totalConnectors = connector.getConnectable().getConnectorNumber();
        if (totalConnectors > 1) {
            return 'Eth' + connectorPos;
        }
        
        // Single interface devices don't need labels
        return '';
    }
    
    function drawConnectorDescription(ctx, connector, x1, y1, x2, y2) 
    {
        var label = getInterfaceLabel(connector);
        if (!label) return; // Don't draw if no label
        
        var owner = connector.getConnectable().getOwner();
        var ownerType = owner.getType();
        var totalConnectors = connector.getConnectable().getConnectorNumber();
        
        var mod = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        
        // Adjust distance based on device type
        var distance = 60; // Default distance - increased to clear device images
        
        // For switches, push labels further out to avoid overlap
        if (ownerType === 'switch') {
            distance = 70; // Further from switch
        }
        // For devices with multiple interfaces (but not switches), also push out more
        else if (totalConnectors > 1) {
            distance = 75; // Increased to clear device image and name label
        }
        
        // Position the label along the link
        var X = x1 + (x2 - x1) * distance / mod;
        var Y = y1 + (y2 - y1) * distance / mod;
        
        // Draw background for better readability
        ctx.save();
        ctx.font = '10px Arial';
        var textWidth = ctx.measureText(label).width;
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fillRect(X - textWidth/2 - 3, Y - 8, textWidth + 6, 14);
        
        // Add a subtle border to the background
        ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(X - textWidth/2 - 3, Y - 8, textWidth + 6, 14);
        
        // Draw the label text
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, X, Y);
        ctx.restore();
    }
    
    // Helper function to get VLAN color based on VLAN ID
    function getVlanColor(vlanId) {
        // Color palette for VLANs (bright, distinguishable colors)
        var vlanColors = {
            1:   '#808080', // VLAN 1 (default) - Gray
            10:  '#3B82F6', // Blue
            20:  '#10B981', // Green
            30:  '#F59E0B', // Orange
            40:  '#EF4444', // Red
            50:  '#8B5CF6', // Purple
            60:  '#EC4899', // Pink
            70:  '#14B8A6', // Teal
            80:  '#F97316', // Dark Orange
            90:  '#6366F1', // Indigo
            100: '#06B6D4', // Cyan
            110: '#84CC16', // Lime
            120: '#A855F7', // Violet
            130: '#F43F5E', // Rose
            140: '#0EA5E9', // Sky Blue
            150: '#22C55E', // Emerald
            200: '#FACC15', // Yellow
            300: '#FB923C', // Light Orange
            999: '#64748B'  // Admin VLAN - Slate
        };

        // Return color if defined, otherwise generate from VLAN ID
        if (vlanColors[vlanId]) {
            return vlanColors[vlanId];
        }

        // Generate color based on VLAN ID for undefined VLANs
        var hue = (vlanId * 137.5) % 360; // Golden angle for good distribution
        return 'hsl(' + hue + ', 70%, 50%)';
    }

    // Helper function to determine link color based on VLAN configuration
    function getLinkColor(selected) {
        // Check if either connector has VLAN configured
        var vlan1 = null;
        var vlan2 = null;
        var portMode1 = null;
        var portMode2 = null;

        // Get VLAN info from both connectors
        if (connector1.getVlanId && connector1.getPortMode) {
            vlan1 = connector1.getVlanId();
            portMode1 = connector1.getPortMode();
        }
        if (connector2.getVlanId && connector2.getPortMode) {
            vlan2 = connector2.getVlanId();
            portMode2 = connector2.getPortMode();
        }

        // Check if either end is a switch using VLANs
        var host1 = connector1.getConnectable().getOwner();
        var host2 = connector2.getConnectable().getOwner();
        var isSwitchConnection = (host1.getType && host1.getType() === 'switch') ||
                                  (host2.getType && host2.getType() === 'switch');

        // If connected to a switch and in access mode, use VLAN color
        if (isSwitchConnection) {
            // Prefer access port VLAN (single VLAN)
            if (portMode1 === 'access' && vlan1 !== null && vlan1 !== 1) {
                return selected ? getVlanColor(vlan1) : getVlanColor(vlan1);
            }
            if (portMode2 === 'access' && vlan2 !== null && vlan2 !== 1) {
                return selected ? getVlanColor(vlan2) : getVlanColor(vlan2);
            }

            // Trunk ports get a special multi-color indicator (keep default red but thicker)
            if (portMode1 === 'trunk' || portMode2 === 'trunk') {
                return selected ? "#9333EA" : "#7C3AED"; // Purple for trunk links
            }
        }

        // Default colors (no VLAN or VLAN 1)
        return selected ? "blue" : "red";
    }

    this.draw = function(ctx, selected)
    {
        var vertices = getVertices();

        // Check if either end is a WiFi connection
        var host1 = connector1.getConnectable().getOwner();
        var host2 = connector2.getConnectable().getOwner();
        var isWiFiConnection = false;

        // Check if either host is using WiFi
        if (host1.getHasWiFi && host1.getConnectionType) {
            if (host1.getHasWiFi() && host1.getConnectionType() === 'wifi') {
                isWiFiConnection = true;
            }
        }
        if (!isWiFiConnection && host2.getHasWiFi && host2.getConnectionType) {
            if (host2.getHasWiFi() && host2.getConnectionType() === 'wifi') {
                isWiFiConnection = true;
            }
        }

        ctx.lineWidth = 2;
        // Use VLAN-aware color selection
        ctx.strokeStyle = getLinkColor(selected);
        
        if (isWiFiConnection) {
            // Draw WiFi connection as a dashed/dotted line with wave pattern
            ctx.setLineDash([5, 5]); // Create dashed line
            // Use VLAN color if available, otherwise default WiFi colors
            var wifiColor = getLinkColor(selected);
            if (wifiColor === "blue" || wifiColor === "red") {
                // No VLAN color, use default WiFi colors
                ctx.strokeStyle = selected ? "#4169E1" : "#FF6B6B";
            } else {
                // Use VLAN color for WiFi
                ctx.strokeStyle = wifiColor;
            }
            
            // Draw the main dashed line
            ctx.beginPath();
            ctx.moveTo(vertices.x1, vertices.y1);
            ctx.lineTo(vertices.x2, vertices.y2);
            ctx.stroke();
            
            // Add WiFi signal waves visualization in the middle
            var centerX = (vertices.x1 + vertices.x2) / 2;
            var centerY = (vertices.y1 + vertices.y2) / 2;
            
            // Calculate angle for the radio waves to face the direction of the link
            var angle = Math.atan2(vertices.y2 - vertices.y1, vertices.x2 - vertices.x1);
            
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle); // Rotate to align with the line direction
            
            ctx.setLineDash([]); // Reset to solid for the waves
            ctx.lineWidth = 2;
            
            // Get base color for waves (use VLAN color or default)
            var baseWifiColor = wifiColor;
            var waveColorForward, waveColorBackward, dotColor;

            // Parse color to use in rgba format
            if (baseWifiColor.startsWith('#')) {
                // Convert hex to RGB for opacity
                var r = parseInt(baseWifiColor.slice(1,3), 16);
                var g = parseInt(baseWifiColor.slice(3,5), 16);
                var b = parseInt(baseWifiColor.slice(5,7), 16);

                // Draw radio waves emanating in both directions along the line
                // Draw waves going forward (towards target)
                for (var i = 1; i <= 3; i++) {
                    var radius = 6 * i;
                    var opacity = 0.7 - (i * 0.15); // Fade out for larger waves
                    ctx.strokeStyle = "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";

                    ctx.beginPath();
                    // Draw arc from -45 to 45 degrees (90 degree arc) facing forward
                    ctx.arc(0, 0, radius, -Math.PI / 4, Math.PI / 4);
                    ctx.stroke();
                }

                // Draw waves going backward (towards source) for bidirectional communication
                for (var i = 1; i <= 3; i++) {
                    var radius = 6 * i;
                    var opacity = 0.7 - (i * 0.15); // Fade out for larger waves
                    ctx.strokeStyle = "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";

                    ctx.beginPath();
                    // Draw arc from 135 to 225 degrees (90 degree arc) facing backward
                    ctx.arc(0, 0, radius, 3 * Math.PI / 4, 5 * Math.PI / 4);
                    ctx.stroke();
                }

                // Draw the source dot (router/access point indicator)
                ctx.fillStyle = baseWifiColor;
            } else {
                // Fallback to original WiFi colors
                // Draw radio waves emanating in both directions along the line
                // Draw waves going forward (towards target)
                for (var i = 1; i <= 3; i++) {
                    var radius = 6 * i;
                    var opacity = 0.7 - (i * 0.15); // Fade out for larger waves
                    ctx.strokeStyle = selected ?
                        "rgba(65, 105, 225, " + opacity + ")" :
                        "rgba(255, 107, 107, " + opacity + ")";

                    ctx.beginPath();
                    // Draw arc from -45 to 45 degrees (90 degree arc) facing forward
                    ctx.arc(0, 0, radius, -Math.PI / 4, Math.PI / 4);
                    ctx.stroke();
                }

                // Draw waves going backward (towards source) for bidirectional communication
                for (var i = 1; i <= 3; i++) {
                    var radius = 6 * i;
                    var opacity = 0.7 - (i * 0.15); // Fade out for larger waves
                    ctx.strokeStyle = selected ?
                        "rgba(65, 105, 225, " + opacity + ")" :
                        "rgba(255, 107, 107, " + opacity + ")";

                    ctx.beginPath();
                    // Draw arc from 135 to 225 degrees (90 degree arc) facing backward
                    ctx.arc(0, 0, radius, 3 * Math.PI / 4, 5 * Math.PI / 4);
                    ctx.stroke();
                }

                // Draw the source dot (router/access point indicator)
                ctx.fillStyle = selected ? "#4169E1" : "#FF6B6B";
            }
            ctx.beginPath();
            ctx.arc(0, 0, 3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
            
            // Reset line width
            ctx.lineWidth = 2;
        } else {
            // Draw regular ethernet connection as solid line
            ctx.setLineDash([]); // Ensure solid line
            ctx.beginPath();
            ctx.moveTo(vertices.x1, vertices.y1);
            ctx.lineTo(vertices.x2, vertices.y2);
            ctx.stroke();
        }
        
        // Reset line dash to default
        ctx.setLineDash([]);
        
        // Draw interface labels on both ends of the link (only if enabled)
        if (typeof showLinkLabels !== 'undefined' ? showLinkLabels : true) {
            drawConnectorDescription(ctx, connector1, vertices.x1, vertices.y1, vertices.x2, vertices.y2);
            drawConnectorDescription(ctx, connector2, vertices.x2, vertices.y2, vertices.x1, vertices.y1);
        }
        
        drawMessages(ctx);
    };
    
    this.update = function() 
    {
        var newmessages = [];
        for (var i = 0; i < messages.length; i++) 
        {
            messages[i].pos += AnimationControls.MSG_ADVANCE;
            if (messages[i].pos < 100) 
            {
                newmessages.push(messages[i]);
            } 
            else 
            {
                messages[i].dst.receive(messages[i].message);
            }
        }
        
        messages = newmessages;
    }
    
    this.messageHasCoords = function(pos, x, y) 
    {
        var coords = getMessageCoords(pos);
        
        return (coords.x <= x) && (x <= coords.x + messages[pos].message.getImage().width) && 
        (coords.y <= y) && (y <= coords.y + messages[pos].message.getImage().height);
    };
    
    this.getMessage = function(pos) 
    {
        return messages[pos].message;
    };
    
    this.getMessageCount = function() 
    {
        return messages.length;
    };
    
    this.hasCoords = function(x, y) 
    {
        var vertices = getVertices();
        
        return distToSegment({x: x,y: y}, {x: vertices.x1,y: vertices.y1}, {x: vertices.x2,y: vertices.y2}) < LINE_SELECT_TOLERANCE;
    };
    
    this.getCenter = function() 
    {
        var result = {};
        var vertices = getVertices();
        
        result.x = (vertices.x1 + vertices.x2) / 2.0;
        result.y = (vertices.y1 + vertices.y2) / 2.0;
        
        return result;
    };
    
    this.getMenu = function() 
    {
        return menu;
    };
    
    init();
};
