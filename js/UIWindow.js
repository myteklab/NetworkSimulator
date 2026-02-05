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

var UIWindow = function(windowid, title, w, h, scrollable, opacity) 
{
    var STATE_MOUSE_DOWN = 0;
    var STATE_MOUSE_UP = 1;
    var state = STATE_MOUSE_UP;
    
    var ACTION_MOUSE_DOWN = 0;
    var ACTION_MOUSE_UP = 1;
    var ACTION_MOUSE_MOVE = 2;
    
    var title = title;
    var w = w;
    var h = h;
    var x = window.innerWidth / 2 - w / 2;
    var y = window.innerHeight / 2 - h / 2;
    var opacity = opacity;
    var scrollable = scrollable;
    var windowid = windowid;
    var contentid = contentid + "_contents";
    var controlsid = controlsid + "_controls";
    var outerdiv = null;
    var titlediv = null;
    var contentDiv = null;
    var controlsDiv = null;
    
    var click_offset_x = 0;
    var click_offset_y = 0;
    var move_X = 0;
    var move_Y = 0;

    var _self = this;
    
    function windowMouseDownEvent(e)
    {
        var bbox = titlediv.getBoundingClientRect();
        var evt_x = e.clientX;
        var evt_y = e.clientY;
        
        if ((bbox.left <= evt_x) && (evt_x <= (bbox.left + bbox.width))
            && (bbox.top <= evt_y) && (evt_y <= (bbox.top + bbox.height)))
        {
            dispatchEvent(evt_x, evt_y, ACTION_MOUSE_DOWN);            
        }
    }
    
    function windowMouseUpEvent(e) 
    {
        dispatchEvent(-1, -1, ACTION_MOUSE_UP);
    }
    
    function windowMouseMoveEvent(e)
    {
        var evt_x = e.clientX;
        var evt_y = e.clientY;
        
        dispatchEvent(evt_x, evt_y, ACTION_MOUSE_MOVE);
    }
    
    function dispatchEvent(evt_x, evt_y, action) 
    {
        switch (state)
        {
            case STATE_MOUSE_DOWN:
                switch (action) 
                {
                    case ACTION_MOUSE_UP:
                        state = STATE_MOUSE_UP;
                        break;
                    case ACTION_MOUSE_MOVE:
                        x = evt_x - click_offset_x + scrollX;
                        y = evt_y - click_offset_y + scrollY;
                        outerdiv.setAttribute('style', getOuterStyle());
                        break;
                }
                break;
            case STATE_MOUSE_UP:
                switch (action) 
                {
                    case ACTION_MOUSE_DOWN:
                        var bbox = titlediv.getBoundingClientRect();
                        click_offset_x = evt_x - bbox.left;
                        click_offset_y = evt_y - bbox.top;
                        state = STATE_MOUSE_DOWN;
                        break;
                }
                break;
        }
    }
    
    function getOuterStyle()
    {
        // Check if this is a modal that should have dark theme
        var isDarkModal = (windowid === 'divtemplates' ||
                          windowid === 'divcompromised' ||
                          windowid === 'divfirewallconfig' ||
                          windowid === 'divaddfirewallrule' ||
                          windowid === 'divfirewalllogs' ||
                          windowid === 'divattackconfig' ||
                          windowid === 'divserverstatus' ||
                          windowid === 'divapiexplorer' ||
                          windowid === 'divrestapiconfig' ||
                          windowid === 'divdomainconfig' ||
                          windowid === 'divdomaincert' ||
                          windowid === 'divnewfile' ||
                          windowid === 'diveditfile' ||
                          windowid === 'divvlanconfig' ||
                          windowid === 'divaclconfig' ||
                          windowid === 'divcreateacl' ||
                          windowid === 'diveditacl' ||
                          windowid === 'divapplyacl' ||
                          windowid === 'divhelp');
        var bgGradient = isDarkModal ? 
            'linear-gradient(145deg, #1a1d2e, #16213e)' : 
            'linear-gradient(145deg, #ffffff, #f8f9fa)';
        var borderColor = isDarkModal ? '#2a2d3a' : 'none';
        var boxShadow = isDarkModal ? 
            '0 10px 40px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)' : 
            '0 10px 40px rgba(0,0,0,0.15), 0 2px 10px rgba(0,0,0,0.1)';
        return 'position:absolute;top:' + y + 'px;left:' + x + 'px;z-index:110;background:' + bgGradient + ';width:' + w + 'px;height:' + h + 'px;border-radius:12px;border:1px solid ' + borderColor + ';box-shadow:' + boxShadow + ';overflow:hidden;opacity:' + opacity + ';';
    }

    function init() 
    {
        outerdiv = document.createElement("div");
        outerdiv.setAttribute('id', windowid);
        outerdiv.setAttribute('style', getOuterStyle());
        
        titlediv = document.createElement("div");
        titlediv.setAttribute('id', windowid + "_title");
        titlediv.setAttribute('style', 'width:100%;height:36px;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;font-weight:600;font-size:14px;padding:10px 15px;line-height:16px;cursor:move;-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;letter-spacing:0.5px;');
        titlediv.innerHTML = _(title);
        
        contentDiv = document.createElement("div");
        contentDiv.setAttribute('id', contentid);
        var contentHeight = h - 96; // Adjusted for new title and controls height
        var isDarkModal = (windowid === 'divtemplates' ||
                          windowid === 'divcompromised' ||
                          windowid === 'divfirewallconfig' ||
                          windowid === 'divaddfirewallrule' ||
                          windowid === 'divfirewalllogs' ||
                          windowid === 'divgameserverconfig' ||
                          windowid === 'divgameserverstatus' ||
                          windowid === 'divgameconnection' ||
                          windowid === 'divportforwarding' ||
                          windowid === 'divaddportforward' ||
                          windowid === 'divgameserverselect' ||
                          windowid === 'divtestportforward' ||
                          windowid === 'divarpttable' ||
                          windowid === 'divaddstaticarp' ||
                          windowid === 'divnetworkinterface' ||
                          windowid === 'divdiagnostics' ||
                          windowid === 'divattackconfig' ||
                          windowid === 'divserverstatus' ||
                          windowid === 'divdnslookup' ||
                          windowid === 'divemailserverconfig' ||
                          windowid === 'divemailmailboxes' ||
                          windowid === 'divupload' ||
                          windowid === 'divdownload' ||
                          windowid === 'divdhcpserverinfo' ||
                          windowid === 'divhttpserverinfo' ||
                          windowid === 'divhttpfileserverinfo' ||
                          windowid === 'divhttpcontentsserverinfo' ||
                          windowid === 'divcertviewer' ||
                          windowid === 'divheaderseditor' ||
                          windowid === 'divlinkconnectors' ||
                          windowid === 'divemailclient' ||
                          windowid === 'divemailaccountconfig' ||
                          windowid === 'divemailconfig' ||
                          windowid === 'divemailcompose' ||
                          windowid === 'divemailview' ||
                          windowid === 'divapiexplorer' ||
                          windowid === 'divrestapiconfig' ||
                          windowid === 'controlswindow' ||
                          windowid === 'localediv' ||
                          windowid === 'divdnsserverconfig' ||
                          windowid === 'divgwconfig' ||
                          windowid === 'divhttpclient' ||
                          windowid === 'divauthentication' ||
                          windowid === 'divnamegroup' ||
                          windowid === 'divnatconfig' ||
                          windowid === 'divipinfo' ||
                          windowid === 'divroguerouter' ||
                          windowid === 'divradiusserverinfo' ||
                          windowid === 'divradiuslogs' ||
                          windowid === 'div802_1x' ||
                          windowid === 'div802_1xSupplicant' ||
                          windowid === 'divradiusauth' ||
                          windowid === 'divdomainconfig' ||
                          windowid === 'divdomaincert' ||
                          windowid === 'divnewfile' ||
                          windowid === 'diveditfile' ||
                          windowid === 'divvlanconfig' ||
                          windowid === 'divaclconfig' ||
                          windowid === 'divcreateacl' ||
                          windowid === 'diveditacl' ||
                          windowid === 'divapplyacl' ||
                          windowid === 'divhelp');
        var contentBg = isDarkModal ? '#1a1d2e' : 'white';
        var contentColor = isDarkModal ? '#e4e4e7' : '#2d3748';
        // Remove padding for templates modal to allow full-width content
        var contentPadding = (windowid === 'divtemplates') ? '0' : '20px';
        contentDiv.setAttribute('style', 'width:100%; height:' + contentHeight + 'px;padding:' + contentPadding + ';background:' + contentBg + ';color:' + contentColor + ';font-size:13px;line-height:1.6;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;overflow-y:auto;overflow-x:hidden;')
        
        controlsDiv = document.createElement("div");
        controlsDiv.setAttribute('id', controlsid);
        var isDarkModal2 = (windowid === 'divtemplates' ||
                           windowid === 'divcompromised' ||
                           windowid === 'divfirewallconfig' ||
                           windowid === 'divaddfirewallrule' ||
                           windowid === 'divfirewalllogs' ||
                           windowid === 'divradiusserverinfo' ||
                           windowid === 'divradiuslogs' ||
                           windowid === 'div802_1x' ||
                           windowid === 'div802_1xSupplicant' ||
                           windowid === 'divradiusauth' ||
                           windowid === 'divapiexplorer' ||
                           windowid === 'divrestapiconfig' ||
                           windowid === 'divgameserverconfig' ||
                           windowid === 'divgameserverstatus' ||
                           windowid === 'divgameconnection' ||
                           windowid === 'divportforwarding' ||
                           windowid === 'divaddportforward' ||
                           windowid === 'divgameserverselect' ||
                           windowid === 'divtestportforward' ||
                           windowid === 'divarpttable' ||
                           windowid === 'divaddstaticarp' ||
                           windowid === 'divnetworkinterface' ||
                           windowid === 'divdiagnostics' ||
                           windowid === 'divdnslookup' ||
                           windowid === 'divemailserverconfig' ||
                           windowid === 'divemailmailboxes' ||
                           windowid === 'divupload' ||
                           windowid === 'divdownload' ||
                           windowid === 'divdhcpserverinfo' ||
                           windowid === 'divhttpserverinfo' ||
                           windowid === 'divhttpfileserverinfo' ||
                           windowid === 'divhttpcontentsserverinfo' ||
                           windowid === 'divcertviewer' ||
                           windowid === 'divheaderseditor' ||
                           windowid === 'divlinkconnectors' ||
                           windowid === 'divemailclient' ||
                           windowid === 'divemailaccountconfig' ||
                           windowid === 'divemailconfig' ||
                           windowid === 'divemailcompose' ||
                           windowid === 'divemailview' ||
                           windowid === 'controlswindow' ||
                           windowid === 'localediv' ||
                           windowid === 'divdnsserverconfig' ||
                           windowid === 'divgwconfig' ||
                           windowid === 'divhttpclient' ||
                           windowid === 'divauthentication' ||
                           windowid === 'divnamegroup' ||
                           windowid === 'divnatconfig' ||
                           windowid === 'divipinfo' ||
                           windowid === 'divroguerouter' ||
                           windowid === 'divdomainconfig' ||
                           windowid === 'divdomaincert' ||
                           windowid === 'divnewfile' ||
                           windowid === 'diveditfile' ||
                           windowid === 'divvlanconfig' ||
                           windowid === 'divaclconfig' ||
                           windowid === 'divcreateacl' ||
                           windowid === 'diveditacl' ||
                           windowid === 'divapplyacl' ||
                           windowid === 'divhelp');
        var controlsBg = isDarkModal2 ? '#16213e' : '#f7fafc';
        var controlsBorder = isDarkModal2 ? '#2a2d3a' : '#e2e8f0';
        controlsDiv.setAttribute('style', 'width:100%; height:60px;background:' + controlsBg + ';padding:12px 16px;border-top:1px solid ' + controlsBorder + ';display:flex;gap:10px;justify-content:flex-end;align-items:center;')
        
        //var bkdiv = document.getElementById('divbk');
        window.addEventListener("mousedown", windowMouseDownEvent, true);
        window.addEventListener("mouseup", windowMouseUpEvent, true);
        window.addEventListener("mousemove", windowMouseMoveEvent, true);

        uimanager.addWindow(_self);
        uitranslation.addObserver(_self);
    }
    
    this.render = function() 
    {
        outerdiv.appendChild(titlediv);
        outerdiv.appendChild(contentDiv);
        outerdiv.appendChild(controlsDiv);
        
        document.body.appendChild(outerdiv);
    };
    
    this.setControls = function(controls) 
    {
        controlsDiv.innerHTML = controls;
    };
    
    this.setContent = function(content) 
    {
        contentDiv.innerHTML = content;
    };

    this.dispose = function()
    {
        window.removeEventListener("mousedown", windowMouseDownEvent);
        window.removeEventListener("mouseup", windowMouseUpEvent);
        window.removeEventListener("mousemove", windowMouseMoveEvent);
        uimanager.removeWindow(this);
        removeBodyDiv(windowid);
        uitranslation.removeObserver(this);
    };

    this.getId = function()
    {
        return windowid;
    };

    this.getPos = function()
    {
        return {x: x, y: y};
    };

    this.setPos = function(nx, ny)
    {
        x = nx;
        y = ny;
        outerdiv.setAttribute('style', getOuterStyle());
    };

    this.localeChanged = function()
    {
        titlediv.innerHTML = _(title);
    };
    
    init();
};
