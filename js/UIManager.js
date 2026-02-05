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

function createLinkAction()
{
    uimanager.createLinkAction();
}

function createBkDiv()
{
    var div = document.createElement("div");
    var w = document.body.scrollWidth;
    var h = document.body.scrollHeight;
    div.setAttribute('style', 'position:absolute;top:0;left:0;z-index:100;background-color:rgba(0,0,0,0.5);width:' + w + 'px;height:' + h + 'px;');
    div.setAttribute('id', 'divbk');
    document.body.appendChild(div);
}

function saveNetwork()
{
    var filename = document.getElementById('filename').value;
    var download = document.createElement("a");
    download.setAttribute('href', 'data:text/plain;charset:utf-8,' + encodeURIComponent(network.save()));
    download.setAttribute('download', filename);
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
    cancelDownload();
}

function removeBodyDiv(name)
{
    var div = document.getElementById(name);
    document.body.removeChild(div);
}

function cancelUpload()
{
    uimanager.getWindow("divupload").dispose();
    removeBodyDiv('divbk');
}

function cancelDownload()
{
    uimanager.getWindow("divdownload").dispose();
    removeBodyDiv('divbk');
}

function confirmUpload()
{
    var fileinput = document.getElementById('uploaddata');
    var file = fileinput.files[0];
    var reader = new FileReader();
    reader.onload = function(filedata) {
        var data = JSON.parse(filedata.target.result);
        network.load(data);
    };
    reader.readAsText(file);
    uimanager.getWindow("divupload").dispose();
    removeBodyDiv('divbk');
}

function createUploadDiv()
{
    var div = document.createElement("div");
    var innerHTML = '<p><input type="file" id="uploaddata" name="uploaddata" /></p>';
    var controls = '<p>\
  <input type="button" id="upload" value="'+_("Upload")+'" onclick="confirmUpload();" />\
  <input type="button" id="cancel" value="'+_("Cancel")+'" onclick="cancelUpload();" />\
  </p>';
    //document.body.appendChild(div);
    var w = new UIWindow('divupload', _('Upload file'), 400, 250, false, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function createDownloadDiv()
{
    var div = document.createElement("div");
    var innerHTML = '<p><label for="filename">'+_("File name:")+'</label><input type="text" id="filename" name="filename" value="network.json" /></p>';
    var controls = '<p>\
  <input type="button" id="upload" value="'+_("Download")+'" onclick="saveNetwork();" />\
  <input type="button" id="cancel" value="'+_("Cancel")+'" onclick="cancelDownload();" />\
  </p>';
    //document.body.appendChild(div);
    var w = new UIWindow('divdownload', _('Download file'), 400, 250, false, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function uploadClick()
{
    createBkDiv();
    createUploadDiv();
}

function downloadClick()
{
    // Check if in preview mode
    if (typeof previewMode !== 'undefined' && previewMode) {
        if (typeof showToast === 'function') {
            showToast('⚠️ Saving is disabled in preview mode', 'info', 2000);
        } else {
            alert('Saving is disabled in preview mode');
        }
        return;
    }

    // Instead of showing download dialog, save directly to server
    if (typeof saveProjectToAPI === 'function') {
        // Use the showSaveIndicator function if available
        if (typeof showSaveIndicator === 'function') {
            showSaveIndicator('Saving to server...', 'info', 60000); // Show for up to 60 seconds while saving
        } else {
            // Fallback to simple indicator
            var savingDiv = document.createElement('div');
            savingDiv.id = 'saving-indicator';
            savingDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0, 0, 0, 0.8); color: white; padding: 20px; border-radius: 10px; z-index: 10000;';
            savingDiv.innerHTML = '<p style="margin: 0;">Saving to server...</p>';
            document.body.appendChild(savingDiv);
        }

        // Call the mytekOS save function
        saveProjectToAPI(function(success) {
            if (typeof showSaveIndicator === 'function') {
                if (success) {
                    showSaveIndicator('Saved successfully!', 'success', 2000);
                } else {
                    showSaveIndicator('Failed to save', 'error', 3000);
                }
            } else if (document.getElementById('saving-indicator')) {
                // Fallback indicator update
                var savingDiv = document.getElementById('saving-indicator');
                if (success) {
                    savingDiv.innerHTML = '<p style="margin: 0; color: #4CAF50;">✓ Saved successfully!</p>';
                } else {
                    savingDiv.innerHTML = '<p style="margin: 0; color: #f44336;">Failed to save. Please try again.</p>';
                }

                // Remove the indicator after a short delay
                setTimeout(function() {
                    if (savingDiv && savingDiv.parentNode) {
                        savingDiv.parentNode.removeChild(savingDiv);
                    }
                }, 1500);
            }
        });
    } else {
        // Fallback to original download behavior if saveProjectToAPI is not available
        createBkDiv();
        createDownloadDiv();
    }
}

var UIManager = function()
{
    var STATE_NEUTRAL = 0; // Nada seleccionado, ningún menú visible
    var STATE_ELEMENT_SELECTED_MOUSE_DOWN = 1; //  Un elemento seleccionado, ningún menú visible, no hemos soltado el botón
    var STATE_ELEMENT_SELECTED_MOUSE_UP = 2; //  Un elemento seleccionado, ningún menú visible, hemos soltado el botón
    var STATE_LINE_SELECTED = 3; // Una línea seleccionada, ningún menú visible
    var STATE_DRAGGING = 4; // Un elemento seleccionado, arrastrándolo, ningún menú visible
    var STATE_CREATING_LINK = 5; // Un elemento seleccionado, moviendo, para hacer click en otro y crear un link, ningún menú visible
    var STATE_MAIN_MENU_VISIBLE = 6; // Nada seleccionado, menú principal visible
    var STATE_ELEMENT_MENU_VISIBLE = 7; // Un elemento seleccionado, su menú visible
    var STATE_LINE_MENU_VISIBLE = 8; // Un enlace seleccionado, su menú visible

    var ACTION_MOUSE_DOWN = 0;
    var ACTION_MOUSE_UP = 1;
    var ACTION_MOUSE_MOVE = 2;
    var ACTION_MENU_OPTION_CLICKED = 3;
    var ACTION_SELECTED_ELEMENT_DELETED = 4;
    var ACTION_SELECTED_LINE_DELETED = 5;
    var ACTION_CREATE_LINK = 6;

    var menus = [];
    var clickables = [];
    var windows = [];
    var canvas = document.getElementById("simcanvas");
    var state = STATE_NEUTRAL;
    var mainmenu = null;
    var _self = this;
    var click_offset_x = 0;
    var click_offset_y = 0;
    var elemRect = null;
    var move_X = 0;
    var move_Y = 0;

    function switchMainMenu(params)
    {
        if (mainmenu.getVisible())
        {
            mainmenu.hide();
        }
        else
        {
            mainmenu.show();
        }
    }

    function init()
    {
        var canvas = document.getElementById("simcanvas");
        canvas.addEventListener("mousedown", mouseDownEvent, false);
        canvas.addEventListener("mouseup", mouseUpEvent, false);
        canvas.addEventListener("mousemove", mouseMoveEvent, false);
        canvas.addEventListener("contextmenu", contextMenuEvent, false); // Add right-click support
        var bbox = canvas.getBoundingClientRect();

        mainmenu = new UIMenu("Main menu", 42 + bbox.left, 3, true);

        // Only show upload and save buttons if not in preview mode
        var isPreviewMode = (typeof previewMode !== 'undefined' && previewMode);
        if (!isPreviewMode) {
            mainmenu.addEntry("img/64/upload.png", _("Upload"), 'uploadClick();');
            mainmenu.addEntry("img/64/save.png", _("Save"), 'downloadClick();');
        }

        mainmenu.addEntry("img/64/computer.png", _("Add Host"), 'newElement("host");');
        mainmenu.addEntry("img/64/server_dhcp.png", _("Add DHCP server"), 'newElement("dhcp");');
        mainmenu.addEntry("img/64/server_dns.png", _("Add DNS server"), 'newElement("dns");');
        mainmenu.addEntry("img/64/server_web.png", _("Add web server"), 'newElement("web");');
        mainmenu.addEntry("img/64/switch.png", _("Add switch"), 'newElement("switch");');
        mainmenu.addEntry("img/64/router2.png", _("Add router"), 'newElement("router");');
        // Language selector removed - not fully implemented
        // mainmenu.addEntry("img/64/i18n.png", _("Select language"), 'createLocaleDiv();');
        _self.addMenu(mainmenu);

        // Menu button is hidden since we have the modern toolbar
        // var rect = new UIRectangle(switchMainMenu, null, mainmenu, 5, 5, 35, 50, 10, true);
        // _self.addClickable(rect);
    }

    this.addWindow = function(w)
    {
        windows[w.getId()] = w;
    };

    this.getWindow = function(id)
    {
        return windows[id];
    };

    this.removeWindow = function(w)
    {
        delete windows[w.getId()];
    };

    this.reset = function()
    {
        this.clickables = [];
        // Menu button removed - using modern toolbar instead
        // var rect = new UIRectangle(switchMainMenu, null, mainmenu, 5, 5, 35, 50, 10, true);
        // this.addClickable(rect);
    };

    function mouseDownEvent(event)
    {
        // Hide any open menus when left-clicking (unless clicking on a menu itself)
        if (event.button === 0) { // Left mouse button
            hideAllMenus();
        }
        
        var canvas = document.getElementById("simcanvas");
        // THANK_YOU: http://www.informit.com/articles/article.aspx?p=1903884&seqNum=6
        var bbox = canvas.getBoundingClientRect();
        var canvas_x = (event.clientX - bbox.left) * (canvas.width / bbox.width);
        var canvas_y = (event.clientY - bbox.top) * (canvas.height / bbox.height);
        
        // Transform coordinates from screen space to world space
        if (typeof canvasViewport !== 'undefined') {
            canvas_x = (canvas_x - canvasViewport.offsetX) / canvasViewport.zoom;
            canvas_y = (canvas_y - canvasViewport.offsetY) / canvasViewport.zoom;
        }

        dispatchEvent(canvas_x, canvas_y, ACTION_MOUSE_DOWN);
    }

    function mouseUpEvent(event)
    {
        var canvas = document.getElementById("simcanvas");
        // THANK_YOU: http://www.informit.com/articles/article.aspx?p=1903884&seqNum=6
        var bbox = canvas.getBoundingClientRect();
        var canvas_x = (event.clientX - bbox.left) * (canvas.width / bbox.width);
        var canvas_y = (event.clientY - bbox.top) * (canvas.height / bbox.height);
        
        // Transform coordinates from screen space to world space
        if (typeof canvasViewport !== 'undefined') {
            canvas_x = (canvas_x - canvasViewport.offsetX) / canvasViewport.zoom;
            canvas_y = (canvas_y - canvasViewport.offsetY) / canvasViewport.zoom;
        }

        dispatchEvent(canvas_x, canvas_y, ACTION_MOUSE_UP);
    }

    function mouseMoveEvent(event)
    {
        var canvas = document.getElementById("simcanvas");
        // THANK_YOU: http://www.informit.com/articles/article.aspx?p=1903884&seqNum=6
        var bbox = canvas.getBoundingClientRect();
        var canvas_x = (event.clientX - bbox.left) * (canvas.width / bbox.width);
        var canvas_y = (event.clientY - bbox.top) * (canvas.height / bbox.height);
        
        // Transform coordinates from screen space to world space
        if (typeof canvasViewport !== 'undefined') {
            canvas_x = (canvas_x - canvasViewport.offsetX) / canvasViewport.zoom;
            canvas_y = (canvas_y - canvasViewport.offsetY) / canvasViewport.zoom;
        }
        
        move_X = canvas_x;
        move_Y = canvas_y;
        
        // Handle hover detection directly here, before dispatch
        if (network && network.getAllElements) {
            var elementsObj = network.getAllElements();
            var hoveredElement = null;
            
            // Check each element for hover
            for (var key in elementsObj) {
                if (elementsObj.hasOwnProperty(key)) {
                    var elem = elementsObj[key];
                    if (elem && elem.getDrawable) {
                        var drawable = elem.getDrawable();
                        if (drawable && drawable.hasCoords && drawable.hasCoords(canvas_x, canvas_y)) {
                            hoveredElement = elem;
                            break;
                        }
                    }
                }
            }
            
            // Update hover states
            for (var key in elementsObj) {
                if (elementsObj.hasOwnProperty(key)) {
                    var elem = elementsObj[key];
                    if (elem && elem.setHovered) {
                        elem.setHovered(elem === hoveredElement);
                    }
                }
            }
        }

        dispatchEvent(canvas_x, canvas_y, ACTION_MOUSE_MOVE);
    }
    
    function contextMenuEvent(event)
    {
        // Prevent the browser's context menu from appearing
        event.preventDefault();
        
        var canvas = document.getElementById("simcanvas");
        var bbox = canvas.getBoundingClientRect();
        var canvas_x = (event.clientX - bbox.left) * (canvas.width / bbox.width);
        var canvas_y = (event.clientY - bbox.top) * (canvas.height / bbox.height);
        
        // Transform coordinates from screen space to world space
        if (typeof canvasViewport !== 'undefined') {
            canvas_x = (canvas_x - canvasViewport.offsetX) / canvasViewport.zoom;
            canvas_y = (canvas_y - canvasViewport.offsetY) / canvasViewport.zoom;
        }
        
        // First check if we're clicking on an element (not link)
        var elem = network.getElementInCoords(canvas_x, canvas_y);
        if (elem !== null) {
            // Hide any currently open menus
            hideAllMenus();
            
            // Clean up previous selection if it exists
            if (network.getSelected() !== null && network.getSelected() !== elem) {
                var prevSelected = network.getSelected();
                // Check if the previous selection has these methods before calling them
                if (prevSelected.getDrawable && typeof prevSelected.getDrawable === 'function') {
                    var drawable = prevSelected.getDrawable();
                    if (drawable && typeof drawable.removeObserver === 'function') {
                        drawable.removeObserver(_self);
                    }
                }
                if (elemRect) {
                    _self.removeClickable(elemRect);
                    elemRect = null;
                }
            }
            
            // Select the element if not already selected
            if (network.getSelected() !== elem) {
                selectElement(elem);
            }
            
            // Show the element's menu at the mouse position
            var menu = elem.getMenu();
            if (menu) {
                // For right-click, we want the menu at the cursor position
                // Since element menus are not "fixed", we need to pass world coordinates
                // But for right-click context menu, it's better to temporarily use screen coords
                // Save original position
                var originalX = menu.X;
                var originalY = menu.Y;
                
                // Set position in world coordinates (will be converted to screen in show())
                menu.setPos(canvas_x, canvas_y);
                menu.show();
                
                // Now override the position to be at the cursor with boundary checking
                var menuDiv = document.getElementById(menu.getId());
                if (menuDiv) {
                    // Get menu dimensions
                    var menuWidth = menuDiv.offsetWidth || 180;
                    var menuHeight = menuDiv.offsetHeight || 200;
                    
                    // Get viewport dimensions
                    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
                    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                    
                    // Calculate position with boundary checking
                    var menuX = event.clientX + 5;
                    var menuY = event.clientY + 5;
                    
                    // Check right edge
                    if (menuX + menuWidth > viewportWidth - 10) {
                        menuX = event.clientX - menuWidth - 5; // Show menu to the left of cursor
                    }
                    
                    // Check bottom edge
                    if (menuY + menuHeight > viewportHeight - 10) {
                        menuY = event.clientY - menuHeight - 5; // Show menu above cursor
                    }
                    
                    // Check left edge
                    if (menuX < 10) {
                        menuX = 10;
                    }
                    
                    // Check top edge
                    if (menuY < 10) {
                        menuY = 10;
                    }
                    
                    menuDiv.style.left = menuX + 'px';
                    menuDiv.style.top = menuY + 'px';
                    menuDiv.style.position = 'fixed';  // Use fixed positioning for context menu
                }
                
                // Set the proper state so menu options work correctly
                state = STATE_ELEMENT_MENU_VISIBLE;
            }
            return false;
        }
        
        // Check if right-click is on a link
        var link = network.getLinkInCoords(canvas_x, canvas_y);
        if (link !== null) {
            // Hide any currently open menus
            hideAllMenus();
            
            // Clean up previous selection
            if (network.getSelected() !== null && network.getSelected() !== link) {
                var prevSelected = network.getSelected();
                if (prevSelected.getDrawable && typeof prevSelected.getDrawable === 'function') {
                    var drawable = prevSelected.getDrawable();
                    if (drawable && typeof drawable.removeObserver === 'function') {
                        drawable.removeObserver(_self);
                    }
                }
                if (elemRect) {
                    _self.removeClickable(elemRect);
                    elemRect = null;
                }
            }
            
            // Select the link if not already selected
            if (network.getSelected() !== link) {
                selectLink(link);
            }
            
            // Show the link's menu at the mouse position
            var menu = link.getMenu();
            if (menu) {
                // Similar approach for link menus
                menu.setPos(canvas_x, canvas_y);
                menu.show();
                
                // Override position to be at cursor with boundary checking
                var menuDiv = document.getElementById(menu.getId());
                if (menuDiv) {
                    // Get menu dimensions
                    var menuWidth = menuDiv.offsetWidth || 180;
                    var menuHeight = menuDiv.offsetHeight || 200;
                    
                    // Get viewport dimensions
                    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
                    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                    
                    // Calculate position with boundary checking
                    var menuX = event.clientX + 5;
                    var menuY = event.clientY + 5;
                    
                    // Check right edge
                    if (menuX + menuWidth > viewportWidth - 10) {
                        menuX = event.clientX - menuWidth - 5; // Show menu to the left of cursor
                    }
                    
                    // Check bottom edge
                    if (menuY + menuHeight > viewportHeight - 10) {
                        menuY = event.clientY - menuHeight - 5; // Show menu above cursor
                    }
                    
                    // Check left edge
                    if (menuX < 10) {
                        menuX = 10;
                    }
                    
                    // Check top edge
                    if (menuY < 10) {
                        menuY = 10;
                    }
                    
                    menuDiv.style.left = menuX + 'px';
                    menuDiv.style.top = menuY + 'px';
                    menuDiv.style.position = 'fixed';
                }
                
                // Set the proper state so menu options work correctly
                state = STATE_LINE_MENU_VISIBLE;
            }
            return false;
        }
        
        // If clicking on empty space, deselect
        hideAllMenus();
        if (network.getSelected() !== null) {
            var prevSelected = network.getSelected();
            if (prevSelected.getDrawable && typeof prevSelected.getDrawable === 'function') {
                var drawable = prevSelected.getDrawable();
                if (drawable && typeof drawable.removeObserver === 'function') {
                    drawable.removeObserver(_self);
                }
            }
            if (elemRect) {
                _self.removeClickable(elemRect);
                elemRect = null;
            }
            network.setSelected(null);
            state = STATE_MOUSE_UP;
        }
        
        return false;
    }

    function hideAllMenus()
    {

        for (var id in menus)
        {
            if (menus[id].getVisible())
            {
                menus[id].hide();
            }
        }
    }

    function updateOffsets(drawable, X, Y)
    {
        var rect = drawable.getRect();
        click_offset_x = X - rect.x;
        click_offset_y = Y - rect.y;
    }

    function switchSelectedMenu(menu)
    {
        if (menu.getVisible())
        {
            menu.hide();
        }
        else
        {
            menu.show();
        }
    }

    function selectElement(e)
    {
        network.setSelected(e);
        e.getDrawable().addObserver(_self);
        // Create menu deployment rectangle in world space
        var rect = e.getDrawable().getRect();
        elemRect = new UIRectangle(switchSelectedMenu, e.getMenu(), _self, rect.x + rect.width - 10, rect.y, 10, 10, 50);
        _self.addClickable(elemRect);
    }

    function selectLink(l)
    {
        network.setSelected(l);
        var vertices = l.getCenter();
        elemRect = new UIRectangle(switchSelectedMenu, l.getMenu(), _self, vertices.x - 5, vertices.y - 5, 10, 10, 50);
        l.getMenu().setPos(vertices.x + 5, vertices.y - 5);
        _self.addClickable(elemRect);
    }

    this.drawableChanged = function()
    {
        if (network.getSelected() !== null)
        {
            var rect = network.getSelected().getDrawable().getRect();

            elemRect.X = rect.x + rect.width - 10;
            elemRect.Y = rect.y;
        }
    };

    function unselectElement(e)
    {
        if ((e !== null) && (e.getMenu().getVisible()))
        {
            e.getMenu().hide();
            e.getDrawable().deleteObserver(_self);
        }
        _self.removeClickable(elemRect);
        network.setSelected(null);
    }

    function unselectLine(e)
    {
        network.setSelected(null);
    }

    function dispatchEvent(X, Y, action)
    {
        switch (state)
        {
            case STATE_NEUTRAL:
                switch (action)
                {
                    case ACTION_MOUSE_DOWN:
                        var clicked = detectClick(X, Y);
                        if (clicked !== null)
                        {
                            if (clicked.getObject() === mainmenu)
                            {
                                // Ocultar todos los demás menús
                                hideAllMenus();
                                // Main menu visible
                                clicked.performAction();
                                // Nuevo estado
                                state = STATE_MAIN_MENU_VISIBLE;
                            }
                            else if (clicked.getObject() instanceof Drawable)
                            {
                                // Update offsets for dragging - X,Y are already in world space
                                updateOffsets(clicked.getObject(), X, Y);
                                // Ocultar todos los menús
                                hideAllMenus();
                                // Seleccionado el owner
                                selectElement(clicked.getObject().getOwner());
                                // Nuevo estado
                                state = STATE_ELEMENT_SELECTED_MOUSE_DOWN;
                            }
                            else if (clicked.getObject() instanceof Link)
                            {
                                // Ocultar los menus
                                hideAllMenus();
                                selectLink(clicked.getObject());
                                state = STATE_LINE_SELECTED;
                            }
                        }
                        break;
                }
                break;
            case STATE_MAIN_MENU_VISIBLE:
                switch (action)
                {
                    case ACTION_MOUSE_DOWN:
                        var clicked = detectClick(X, Y);
                        if (clicked !== null)
                        {
                            if (clicked.getObject() === mainmenu)
                            {
                                // Main menu oculto
                                clicked.performAction();
                                // Nuevo estado
                                state = STATE_NEUTRAL;
                            }
                            else if (clicked.getObject() instanceof Drawable)
                            {
                                // Actualizar los offsets para mover el objeto
                                updateOffsets(clicked.getObject(), X, Y);
                                // Ocultar el menú principal
                                mainmenu.hide();
                                // Seleccionado el owner
                                selectElement(clicked.getObject().getOwner());
                                // Nuevo estado
                                state = STATE_ELEMENT_SELECTED_MOUSE_DOWN;
                            }
                            else if (clicked.getObject() instanceof Link)
                            {
                                // Ocultar los menus
                                hideAllMenus();
                                selectLink(clicked.getObject());
                                state = STATE_LINE_SELECTED;
                            }
                        }
                        else
                        {
                            // Main menu oculto
                            mainmenu.hide();
                            // Nuevo estado
                            state = STATE_NEUTRAL;
                        }
                        break;
                    case ACTION_MENU_OPTION_CLICKED:
                        // Main menu oculto
                        mainmenu.hide();
                        // Nuevo estado
                        state = STATE_NEUTRAL;
                        break;
                }
                break;
            case STATE_ELEMENT_SELECTED_MOUSE_DOWN:
                switch (action)
                {
                    case ACTION_MOUSE_UP:
                        state = STATE_ELEMENT_SELECTED_MOUSE_UP;
                        break;
                    case ACTION_MOUSE_MOVE:
                        // When dragging, the position is already in world space coordinates
                        // since X and Y have been transformed
                        network.getSelected().getDrawable().setPosition(X - click_offset_x, Y - click_offset_y);
                        break;
                }
                break;
            case STATE_ELEMENT_SELECTED_MOUSE_UP:
                switch (action)
                {
                    case ACTION_MOUSE_DOWN:
                        var clicked = detectClick(X, Y);
                        if (clicked !== null)
                        {
                            if (clicked.getObject() === mainmenu)
                            {
                                // Ocultar todos los demás menús
                                hideAllMenus();
                                // Main menu visible
                                clicked.performAction();
                                // Nada seleccionado
                                network.setSelected(null);
                                // Nuevo estado
                                state = STATE_MAIN_MENU_VISIBLE;
                            }
                            else if (clicked.getObject() instanceof Drawable)
                            {
                                // Ocultar todos los menús
                                hideAllMenus();
                                // Seleccionado el owner
                                unselectElement(network.getSelected());
                                selectElement(clicked.getObject().getOwner());
                                // Nuevo estado
                                state = STATE_ELEMENT_SELECTED_MOUSE_DOWN;
                            }
                            else if (clicked.getObject() instanceof UIManager)
                            {
                                clicked.performAction();
                                // Nuevo estado
                                state = STATE_ELEMENT_MENU_VISIBLE;
                            }
                            else if (clicked.getObject() instanceof Link)
                            {
                                // Ocultar los menus
                                hideAllMenus();
                                selectLink(clicked.getObject());
                                state = STATE_LINE_SELECTED;
                            }
                        }
                        else
                        {
                            // Nada seleccionado
                            network.setSelected(null);
                            // Nuevo estado
                            state = STATE_NEUTRAL;
                        }
                        break;
                }
                break;
            case STATE_LINE_SELECTED:
                switch (action)
                {
                    case ACTION_MOUSE_DOWN:
                        var clicked = detectClick(X, Y);
                        if (clicked !== null)
                        {
                            if (clicked.getObject() === mainmenu)
                            {
                                // Ocultar todos los demás menús
                                hideAllMenus();
                                // Main menu visible
                                clicked.performAction();
                                // Nada seleccionado
                                network.setSelected(null);
                                // Nuevo estado
                                state = STATE_MAIN_MENU_VISIBLE;
                            }
                            else if (clicked.getObject() instanceof Drawable)
                            {
                                // Ocultar todos los menús
                                hideAllMenus();
                                // Seleccionado el owner
                                unselectLine(network.getSelected());
                                selectElement(clicked.getObject().getOwner());
                                // Nuevo estado
                                state = STATE_ELEMENT_SELECTED_MOUSE_DOWN;
                            }
                            else if (clicked.getObject() instanceof UIManager)
                            {
                                clicked.performAction();
                                // Nuevo estado
                                state = STATE_LINE_MENU_VISIBLE;
                            }
                            else if (clicked.getObject() instanceof Link)
                            {
                                // Ocultar los menus
                                hideAllMenus();
                                selectLink(clicked.getObject());
                                state = STATE_LINE_SELECTED;
                            }
                        }
                        else
                        {
                            // Nada seleccionado
                            network.setSelected(null);
                            // Nuevo estado
                            state = STATE_NEUTRAL;
                        }
                        break;
                }
                break;
            case STATE_LINE_MENU_VISIBLE:
                switch (action)
                {
                    case ACTION_MOUSE_DOWN:
                        var clicked = detectClick(X, Y);
                        if (clicked !== null)
                        {
                            if (clicked.getObject() === mainmenu)
                            {
                                // Ocultar todos los demás menús
                                hideAllMenus();
                                // Main menu visible
                                clicked.performAction();
                                // Nada seleccionado
                                network.setSelected(null);
                                // Nuevo estado
                                state = STATE_MAIN_MENU_VISIBLE;
                            }
                            else if (clicked.getObject() instanceof Drawable)
                            {
                                // Ocultar todos los menús
                                hideAllMenus();
                                // Seleccionado el owner
                                unselectLine(network.getSelected());
                                selectElement(clicked.getObject().getOwner());
                                // Nuevo estado
                                state = STATE_ELEMENT_SELECTED_MOUSE_DOWN;
                            }
                            else if (clicked.getObject() instanceof UIManager)
                            {
                                clicked.performAction();
                                // Nuevo estado
                                state = STATE_LINE_SELECTED;
                            }
                            else if (clicked.getObject() instanceof Link)
                            {
                                // Ocultar los menus
                                hideAllMenus();
                                selectLink(clicked.getObject());
                                state = STATE_LINE_SELECTED;
                            }
                        }
                        else
                        {
                            hideAllMenus();
                            // Nada seleccionado
                            unselectLine(network.getSelected());
                            // Nuevo estado
                            state = STATE_NEUTRAL;
                        }
                        break;
                    case ACTION_SELECTED_LINE_DELETED:
                        // Menu oculto
                        hideAllMenus();
                        unselectLine(network.getSelected());
                        // Nuevo estado
                        state = STATE_NEUTRAL;
                        break;
                }
                break;
            case STATE_ELEMENT_MENU_VISIBLE:
                switch (action)
                {
                    case ACTION_MOUSE_DOWN:
                        var clicked = detectClick(X, Y);
                        if (clicked !== null)
                        {
                            if (clicked.getObject() === mainmenu)
                            {
                                // Ocultar todos los demás menús
                                hideAllMenus();
                                // Main menu visible
                                clicked.performAction();
                                // Nada seleccionado
                                network.setSelected(null);
                                // Nuevo estado
                                state = STATE_MAIN_MENU_VISIBLE;
                            }
                            else if (clicked.getObject() instanceof Drawable)
                            {
                                // Ocultar todos los menús
                                hideAllMenus();
                                // Seleccionado el owner
                                unselectElement(network.getSelected());
                                selectElement(clicked.getObject().getOwner());
                                // Nuevo estado
                                state = STATE_ELEMENT_SELECTED_MOUSE_DOWN;
                            }
                            else if (clicked.getObject() instanceof UIManager)
                            {
                                clicked.performAction();
                                // Nuevo estado
                                state = STATE_ELEMENT_MENU_VISIBLE;
                            }
                            else if (clicked.getObject() instanceof Link)
                            {
                                // Ocultar los menus
                                hideAllMenus();
                                selectLink(clicked.getObject());
                                state = STATE_LINE_SELECTED;
                            }
                        }
                        else
                        {
                            unselectElement(network.getSelected());
                            // Main menu oculto
                            hideAllMenus();
                            // Nuevo estado
                            state = STATE_NEUTRAL;
                        }
                        break;
                    case ACTION_MENU_OPTION_CLICKED:
                        // Menu oculto
                        hideAllMenus();
                        // Nuevo estado
                        state = STATE_ELEMENT_SELECTED_MOUSE_UP;
                        break;
                    case ACTION_SELECTED_ELEMENT_DELETED:
                        // Menu oculto
                        hideAllMenus();
                        unselectElement(network.getSelected());
                        // Nuevo estado
                        state = STATE_NEUTRAL;
                        break;
                    case ACTION_CREATE_LINK:
                        hideAllMenus();
                        state = STATE_CREATING_LINK;
                        break;
                }
                break;
            case STATE_CREATING_LINK:
                switch (action)
                {
                    case ACTION_MOUSE_DOWN:
                        var clicked = detectClick(X, Y);
                        if (clicked !== null)
                        {
                            if (clicked.getObject() instanceof Drawable)
                            {
                                // Ocultar todos los menús
                                hideAllMenus();
                                // Crear el link
                                selectLinkConnectors(network.getSelected().id, clicked.getObject().getOwner().id);
                                state = STATE_ELEMENT_SELECTED_MOUSE_UP;
                            }
                        }
                        else
                        {
                            hideAllMenus();
                            // Nuevo estado
                            state = STATE_ELEMENT_SELECTED_MOUSE_UP;
                        }
                        break;
                }
                break;
        }
    }

    this.menuOptionClicked = function()
    {
        // Always hide all menus when a menu option is clicked
        hideAllMenus();
        dispatchEvent(-1, -1, ACTION_MENU_OPTION_CLICKED);
    };

    this.selectedElementDeleted = function()
    {
        dispatchEvent(-1, -1, ACTION_SELECTED_ELEMENT_DELETED);
    };

    this.selectedLineDeleted = function()
    {
        dispatchEvent(-1, -1, ACTION_SELECTED_LINE_DELETED);
    };

    this.createLinkAction = function()
    {
        dispatchEvent(-1, -1, ACTION_CREATE_LINK);
    };

    function detectClick(X, Y)
    {
        var clicked = null;

        for (var i = 0; i < clickables.length; i++)
        {
            if (clickables[i].isInCoords(X, Y))
            {
                if ((clicked === null) || (clickables[i].Z > clicked.Z))
                {
                    clicked = clickables[i];
                }
            }
        }

        return clicked;
    }

    this.addMenu = function(menu)
    {
        menus[menu.getId()] = menu;
    };

    this.deleteMenu = function(menu)
    {
        menus[menu.getId()].dispose();
        delete menus[menu.getId()];
    };

    this.getMenu = function(id)
    {
        return menus[id];
    };

    this.addClickable = function(c)
    {
        clickables.push(c);
    };

    this.removeClickable = function(c)
    {
        var index = clickables.indexOf(c);
        clickables.splice(index, 1);
    };

    function renderMainMenu(ctx)
    {
        // Menu button removed - using modern toolbar instead
        // No longer drawing the menu button on canvas
        return;
        
        /* Original code commented out:
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillRect(5, document.body.scrollTop + 5, 35, 50);
        ctx.strokeStyle = "rgba(255,255,255,1.0)";
        ctx.lineWidth = 4;
        ctx.strokeRect(5, document.body.scrollTop + 5, 35, 50);
        ctx.lineWidth = 5;
        for (var i = 15; i < 50; i += 10)
        {
            ctx.strokeRect(12, document.body.scrollTop + i, 21, 0);
        }
        */
    }

    function renderSelected(ctx)
    {
        if ((state === STATE_ELEMENT_SELECTED_MOUSE_DOWN) || (state === STATE_ELEMENT_SELECTED_MOUSE_UP) || (state === STATE_ELEMENT_MENU_VISIBLE) || (state === STATE_CREATING_LINK))
        {
            // Check if selected element still exists before trying to render it
            var selected = network.getSelected();
            if (!selected || !selected.getDrawable) {
                // Element was deleted, reset state
                state = STATE_NEUTRAL;
                return;
            }
            var rect = selected.getDrawable().getRect();
            ctx.strokeStyle = "rgba(100,100,100,0.75)";
            ctx.lineWidth = 5;
            ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
            // Draw a more prominent menu button with gradient and icon
            ctx.save();
            
            // Create gradient for button background
            var gradient = ctx.createLinearGradient(elemRect.X, elemRect.Y, elemRect.X, elemRect.Y + elemRect.H);
            gradient.addColorStop(0, "rgba(102, 126, 234, 0.9)");  // Purple from theme
            gradient.addColorStop(1, "rgba(118, 75, 162, 0.9)");   // Darker purple
            
            // Draw button background with gradient
            ctx.fillStyle = gradient;
            ctx.fillRect(elemRect.X, elemRect.Y, elemRect.W, elemRect.H);
            
            // Draw border
            ctx.strokeStyle = "rgba(255,255,255,0.9)";
            ctx.lineWidth = 1;
            ctx.strokeRect(elemRect.X, elemRect.Y, elemRect.W, elemRect.H);
            
            // Draw menu icon (three horizontal lines)
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
            var centerX = elemRect.X + elemRect.W / 2;
            var centerY = elemRect.Y + elemRect.H / 2;
            
            // Three horizontal lines for menu icon
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY - 3);
            ctx.lineTo(centerX + 3, centerY - 3);
            ctx.moveTo(centerX - 3, centerY);
            ctx.lineTo(centerX + 3, centerY);
            ctx.moveTo(centerX - 3, centerY + 3);
            ctx.lineTo(centerX + 3, centerY + 3);
            ctx.stroke();
            
            ctx.restore();
        }
        else if ((state === STATE_LINE_SELECTED) || (state === STATE_LINE_MENU_VISIBLE))
        {
            var pos = network.getSelected().getCenter();
            ctx.save();
            
            // Create gradient for link menu button
            var gradient = ctx.createLinearGradient(pos.x - 5, pos.y - 5, pos.x - 5, pos.y + 5);
            gradient.addColorStop(0, "rgba(102, 126, 234, 0.9)");
            gradient.addColorStop(1, "rgba(118, 75, 162, 0.9)");
            
            // Draw button background
            ctx.fillStyle = gradient;
            ctx.fillRect(pos.x - 5, pos.y - 5, 10, 10);
            
            // Draw border
            ctx.strokeStyle = "rgba(255,255,255,0.9)";
            ctx.lineWidth = 1;
            ctx.strokeRect(pos.x - 5, pos.y - 5, 10, 10);
            
            // Draw menu icon
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pos.x - 3, pos.y - 3);
            ctx.lineTo(pos.x + 3, pos.y - 3);
            ctx.moveTo(pos.x - 3, pos.y);
            ctx.lineTo(pos.x + 3, pos.y);
            ctx.moveTo(pos.x - 3, pos.y + 3);
            ctx.lineTo(pos.x + 3, pos.y + 3);
            ctx.stroke();
            
            ctx.restore();
        }
    }

    function renderCreatingLink(ctx)
    {
        if (state === STATE_CREATING_LINK)
        {
            var rect = network.getSelected().getDrawable().getRect();
            var x1 = rect.x + rect.width / 2;
            var y1 = rect.y + rect.height / 2;
            ctx.strokeStyle = "rgba(128,255,128,1.0)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(move_X, move_Y);
            ctx.stroke();

        }
    }

    // Split rendering into world space (transformed) and screen space (untransformed)
    this.renderInWorldSpace = function(ctx)
    {
        // These need to be drawn in world coordinates (with zoom/pan)
        renderSelected(ctx);
        renderCreatingLink(ctx);
    };
    
    this.renderInScreenSpace = function(ctx)
    {
        // These are UI overlays that should not be transformed
        renderMainMenu(ctx);
    };
    
    // Keep old render function for compatibility
    this.render = function(ctx)
    {
        renderSelected(ctx);
        renderCreatingLink(ctx);
        renderMainMenu(ctx);
    };
    
    this.getMousePos = function()
    {
        return {X: move_X, Y: move_Y};
    };

    init();
};
