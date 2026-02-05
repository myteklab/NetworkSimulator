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

var UIMenu = function(description, X,Y, fixed)
{
    var X = X;
    var Y = Y;
    var entries = [];
    var id = "uimenu_" + getNextID();
    var description = description;
    var visible = false;
    var fixed = fixed;
    var _self = this;

    function init()
    {
        uitranslation.addObserver(_self);
    }
    
    this.dispose = function()
    {
        // Use removeObserver instead of deleteObserver (which doesn't exist)
        if (uitranslation && typeof uitranslation.removeObserver === 'function') {
            uitranslation.removeObserver(this);
        }
    };

    this.localeChanged = function()
    {
        /*for (var i = 0; i < entries.length; i++)
        {
            var span = document.getElementById(entries[i].id);
            span.innerHTML = _(entries[i].text);
        }*/
    };

    this.getId = function()
    {
        return id;
    };

    this.getVisible = function()
    {
        return visible;
    };

    this.addEntry = function(img, text, js)
    {
        var data = {};
        data.id = "entry_" + getNextID();
        data.img = img;
        data.text = text;
        data.js = js;
        data.type = 'item';  // Regular menu item
        entries.push(data);
    };
    
    this.addSubmenu = function(img, text, items)
    {
        var data = {};
        data.id = "submenu_" + getNextID();
        data.img = img;
        data.text = text;
        data.type = 'submenu';
        data.items = items;  // Array of {img, text, js} objects
        data.expanded = false;
        entries.push(data);
    };
    
    this.addSeparator = function()
    {
        var data = {};
        data.id = "separator_" + getNextID();
        data.type = 'separator';
        entries.push(data);
    };

    this.setPos = function(cX, cY)
    {
        X = cX;
        Y = cY;
    }

    this.setDescription = function(desc)
    {
        description = desc;
    };

    this.purge = function()
    {
        entries = [];
    }

    this.show = function()
    {
        // Transform world coordinates to screen coordinates if viewport exists
        var screenX = X;
        var screenY = Y;
        
        if (!fixed && typeof canvasViewport !== 'undefined') {
            // Convert from world space to screen space
            screenX = X * canvasViewport.zoom + canvasViewport.offsetX;
            screenY = Y * canvasViewport.zoom + canvasViewport.offsetY;
            
            // Account for canvas scaling and position
            var canvas = document.getElementById("simcanvas");
            if (canvas) {
                var bbox = canvas.getBoundingClientRect();
                // Convert from canvas pixels to screen pixels
                screenX = screenX / window.devicePixelRatio + bbox.left;
                screenY = screenY / window.devicePixelRatio + bbox.top;
            }
        }
        
        // Calculate menu dimensions including potential expanded submenus
        var menuWidth = 180;  // Base menu width
        var baseItemHeight = 32;  // Height per regular item
        var headerHeight = 40;  // Header height
        
        // Calculate total height including expanded submenus
        var totalHeight = headerHeight;
        var maxExpandedHeight = headerHeight;  // Track max possible height with all submenus expanded
        var hasSubmenus = false;
        
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            if (entry.type === 'separator') {
                totalHeight += 10;  // Separator height
                maxExpandedHeight += 10;
            } else if (entry.type === 'submenu') {
                hasSubmenus = true;
                totalHeight += baseItemHeight;  // Submenu header
                maxExpandedHeight += baseItemHeight;
                // Add potential height of submenu items when expanded
                if (entry.items) {
                    maxExpandedHeight += entry.items.length * baseItemHeight;
                }
            } else {
                totalHeight += baseItemHeight;  // Regular item
                maxExpandedHeight += baseItemHeight;
            }
        }
        
        // Use the maximum possible height for positioning to ensure space for expanded submenus
        var menuHeight = hasSubmenus ? maxExpandedHeight : totalHeight;
        
        // Add extra padding for submenus that might expand to the right
        var totalMenuWidth = hasSubmenus ? menuWidth + 100 : menuWidth;  // Extra space for submenu expansion
        
        // Get viewport dimensions
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Smart positioning with preference order
        var finalX = screenX;
        var finalY = screenY;
        
        // Horizontal positioning
        if (screenX + totalMenuWidth > viewportWidth - 10) {
            // Try to position menu to the left of cursor if it doesn't fit on the right
            if (screenX - menuWidth > 10) {
                finalX = screenX - menuWidth;
            } else {
                // Center horizontally if neither side works well
                finalX = Math.max(10, (viewportWidth - menuWidth) / 2);
            }
        }
        
        // Ensure minimum left margin
        if (finalX < 10) {
            finalX = 10;
        }
        
        // Vertical positioning - prefer showing menu above cursor if near bottom
        if (screenY + menuHeight > viewportHeight - 10) {
            // Try to show menu above the cursor
            if (screenY - menuHeight > 10) {
                finalY = screenY - menuHeight;
            } else {
                // If can't fit above, align to bottom with scroll if needed
                finalY = Math.max(10, viewportHeight - menuHeight - 10);
                // If menu is too tall for viewport, allow scrolling
                if (menuHeight > viewportHeight - 20) {
                    finalY = 10;
                    menuHeight = viewportHeight - 20;
                }
            }
        }
        
        // Ensure minimum top margin
        if (finalY < 10) {
            finalY = 10;
        }
        
        screenX = finalX;
        screenY = finalY;
        
        var div = document.createElement("div");
        div.setAttribute("id",id);
        
        // Add max-height and overflow handling for very tall menus
        var styleStr = "width:"+menuWidth+"px;background:linear-gradient(145deg, #ffffff, #f8f9fa);border:none;border-radius:8px;box-shadow:0 6px 20px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);position:"+ (fixed?"fixed":"absolute") +";top:"+screenY+"px;left:"+screenX+"px;font-size:12px;padding:6px;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;z-index:105;";
        
        // If menu was constrained by viewport height, add scrolling
        if (menuHeight > viewportHeight - 20) {
            styleStr += "max-height:" + (viewportHeight - 20) + "px;overflow-y:auto;overflow-x:hidden;";
        }
        
        div.setAttribute("style", styleStr);

        var innerHtml = "<div style='font-weight:600;color:#667eea;padding:4px 8px;font-size:12px;letter-spacing:0.3px;border-bottom:1px solid #e2e8f0;margin-bottom:4px;'>" + _(description) + "</div>";

        for (var i = 0; i < entries.length; i++)
        {
            var entry = entries[i];
            
            // Handle separators
            if (entry.type === 'separator') {
                innerHtml += "<div style='height:1px;background:#e2e8f0;margin:4px 8px;'></div>";
                continue;
            }
            
            // Handle submenus
            if (entry.type === 'submenu') {
                // Create submenu header with arrow
                innerHtml += "<div id='" + entry.id + "_header' style='display:flex;align-items:center;gap:8px;padding:5px 8px;margin:2px 0;border-radius:6px;color:#2d3748;cursor:pointer;position:relative;transition:all 0.15s ease;' onmouseover='this.style.background=\"linear-gradient(135deg, #667eea 0%, #764ba2 100%)\";this.style.color=\"white\";' onmouseout='this.style.background=\"transparent\";this.style.color=\"#2d3748\";' onclick='toggleSubmenu(\"" + entry.id + "\");event.preventDefault();'>";
                
                // Icon
                if (entry.img && entry.img.startsWith('emoji:')) {
                    var emoji = entry.img.substring(6);
                    innerHtml += "<span style='width:18px;height:18px;font-size:16px;text-align:center;'>" + emoji + "</span>";
                } else {
                    innerHtml += "<img src='" + entry.img + "' style='width:18px;height:18px;object-fit:contain;' />";
                }
                
                // Text
                innerHtml += "<span style='font-weight:500;font-size:11px;flex:1;'>" + _(entry.text) + "</span>";
                
                // Arrow indicator
                innerHtml += "<span id='" + entry.id + "_arrow' style='font-size:10px;'>▶</span>";
                innerHtml += "</div>";
                
                // Submenu items container (initially hidden)
                innerHtml += "<div id='" + entry.id + "_items' style='display:none;margin-left:20px;'>";
                for (var j = 0; j < entry.items.length; j++) {
                    var subitem = entry.items[j];
                    innerHtml += "<a href='#' onclick='" + subitem.js + "uimanager.menuOptionClicked();' style='display:flex;align-items:center;gap:8px;padding:5px 8px;margin:2px 0;border-radius:6px;text-decoration:none;color:#2d3748;transition:all 0.15s ease;' onmouseover='this.style.background=\"linear-gradient(135deg, #667eea 0%, #764ba2 100%)\";this.style.color=\"white\";this.style.transform=\"translateX(2px)\";' onmouseout='this.style.background=\"transparent\";this.style.color=\"#2d3748\";this.style.transform=\"translateX(0)\";'>";
                    
                    if (subitem.img && subitem.img.startsWith('emoji:')) {
                        var subEmoji = subitem.img.substring(6);
                        innerHtml += "<span style='width:18px;height:18px;font-size:16px;text-align:center;'>" + subEmoji + "</span>";
                    } else {
                        innerHtml += "<img src='" + subitem.img + "' style='width:18px;height:18px;object-fit:contain;' />";
                    }
                    
                    innerHtml += "<span style='font-weight:500;font-size:11px;'>" + _(subitem.text) + "</span></a>";
                }
                innerHtml += "</div>";
                continue;
            }
            
            // Handle regular items (existing code)
            innerHtml += "<a href='#' onclick='"+ entry.js +"uimanager.menuOptionClicked();' style='display:flex;align-items:center;gap:8px;padding:5px 8px;margin:2px 0;border-radius:6px;text-decoration:none;color:#2d3748;transition:all 0.15s ease;' onmouseover='this.style.background=\"linear-gradient(135deg, #667eea 0%, #764ba2 100%)\";this.style.color=\"white\";this.style.transform=\"translateX(2px)\";' onmouseout='this.style.background=\"transparent\";this.style.color=\"#2d3748\";this.style.transform=\"translateX(0)\";'>";
            
            if (entry.img && entry.img.startsWith('emoji:')) {
                var emoji = entry.img.substring(6);
                innerHtml += "<span style='width:18px;height:18px;font-size:16px;text-align:center;'>" + emoji + "</span>";
            } else {
                innerHtml += "<img src='"+ entry.img +"' style='width:18px;height:18px;object-fit:contain;' />";
            }
            
            innerHtml += "<span id='" +entry.id+ "' style='font-weight:500;font-size:11px;'>" + _(entry.text) + "</span></a>";
        }

        div.innerHTML = innerHtml;

        document.body.appendChild(div);
        visible = true;
    };

    this.hide = function()
    {
        var div = document.getElementById(id);
        document.body.removeChild(div);
        visible = false;
    };

    init();
};