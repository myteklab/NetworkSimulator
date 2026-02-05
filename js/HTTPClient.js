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

// Global variable to track browser window state
var browserCompactMode = false;

// Helper function to escape HTML
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Toggle SSL handshake visualization preference
function toggleSSLHandshakeVisualization(enabled) {
    localStorage.setItem('showSSLHandshake', enabled ? 'true' : 'false');
    console.log('SSL Handshake visualization ' + (enabled ? 'enabled' : 'disabled'));
}

// Function to show error when server is disabled
function showServerDisabledError(errorInfo) {
    console.log("showServerDisabledError called with:", errorInfo);

    // Clear any response timeout
    var clientApps = document.querySelectorAll('[id^="HTTPClient_"]');
    clientApps.forEach(function(app) {
        if (app._self && app._self.responseTimeout) {
            clearTimeout(app._self.responseTimeout);
        }
    });

    // Update the browser status
    updateBrowserStatus('Server Not Running', 'error');

    // Get the HTTPClient browser content area to update its display
    var browserContents = document.getElementById('httpbrowsercontents');
    console.log("Browser contents element found:", browserContents ? "yes" : "no");
    if (browserContents) {
        var errorHTML = '<div style="padding: 30px; background: linear-gradient(135deg, #f5f5f5, #e8e8e8); min-height: 300px; display: flex; align-items: center; justify-content: center;">';
        errorHTML += '<div style="max-width: 500px; text-align: center;">';
        errorHTML += '<div style="font-size: 72px; margin-bottom: 20px;">⚠️</div>';
        errorHTML += '<h2 style="color: #d32f2f; margin: 0 0 15px 0;">Web Server Not Running</h2>';
        errorHTML += '<p style="color: #666; margin: 0 0 10px 0;">The web server at <strong>' + errorInfo.ip + '</strong> ';
        if (errorInfo.elementName) {
            errorHTML += '(' + errorInfo.elementName + ') ';
        }
        errorHTML += 'is currently stopped.</p>';
        errorHTML += '<div style="background: #fff; border-left: 4px solid #ff9800; padding: 15px; margin: 20px 0; text-align: left;">';
        errorHTML += '<strong>How to fix this:</strong><br>';
        errorHTML += '1. Right-click on the server host<br>';
        errorHTML += '2. Select "Edit HTTP server info"<br>';
        errorHTML += '3. Click "Start Server" in the Server Control section<br>';
        errorHTML += '4. Click Save<br>';
        errorHTML += '5. Try your request again';
        errorHTML += '</div>';
        errorHTML += '<button onclick="requestHTTPWebSite(\'' + errorInfo.elementId + '\')" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Retry Request</button>';
        errorHTML += '</div>';
        errorHTML += '</div>';

        browserContents.innerHTML = errorHTML;
    } else {
        // Try alternate method - show alert if browser div not found
        console.log("Browser contents element not found, showing alert");
        alert("Web Server Not Running!\n\nThe server at " + errorInfo.ip + " is currently stopped.\n\nTo fix:\n1. Right-click the server\n2. Select 'Edit HTTP server info'\n3. Click 'Start Server'\n4. Click Save\n5. Try again");
    }
}

function viewWebBrowser(id)
{
    // Skip background overlay to allow viewing network
    // createBkDiv();

    var host = network.getElement(id);
    var app = host.getApp("HTTPClient");

    // Create a larger window for better visibility
    var w = new UIWindow('divhttpclient','🌐 Browser',700,550,false,0.98);

    // Center the window but slightly to the right
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;
    var screenHeight = window.innerHeight || document.documentElement.clientHeight;
    w.setPos((screenWidth - 700) / 2 + 100, (screenHeight - 550) / 2);

    // Create browser-like interface
    var browserUI = '<div id="browserContainer" style="height: 100%; display: flex; flex-direction: column; background: #2a2d3e;">';
    
    // Browser navigation bar
    browserUI += '<div style="background: linear-gradient(135deg, #1a1d2e, #2a2d3e); border-bottom: 1px solid #3a3d4e; padding: 8px 12px; display: flex; align-items: center; gap: 8px;">';
    
    // Navigation buttons with better styling
    browserUI += '<div style="display: flex; gap: 4px;">';
    browserUI += '<button onclick="navigateBack(' + id + ')" style="width: 28px; height: 28px; border-radius: 6px; background: transparent; color: #9ca3af; border: none; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" onmouseover="this.style.background=\'#3a3d4e\'" onmouseout="this.style.background=\'transparent\'" title="Back">‹</button>';
    browserUI += '<button onclick="navigateForward(' + id + ')" style="width: 28px; height: 28px; border-radius: 6px; background: transparent; color: #9ca3af; border: none; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" onmouseover="this.style.background=\'#3a3d4e\'" onmouseout="this.style.background=\'transparent\'" title="Forward">›</button>';
    browserUI += '<button onclick="refreshPage(' + id + ')" style="width: 28px; height: 28px; border-radius: 6px; background: transparent; color: #9ca3af; border: none; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" onmouseover="this.style.background=\'#3a3d4e\'" onmouseout="this.style.background=\'transparent\'" title="Refresh">↻</button>';
    browserUI += '</div>';

    // Single tab display (simplified)
    browserUI += '<div style="flex: 1; display: flex; align-items: center; margin: 0 8px;">';
    browserUI += '<div style="background: #2a2d3e; padding: 6px 12px; border-radius: 6px; display: flex; align-items: center; gap: 8px; max-width: 400px; flex: 1;">';
    browserUI += '<span style="color: #e4e4e7; font-size: 13px; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" id="browserTabTitle">NetworkSim Browser</span>';
    browserUI += '</div>';
    browserUI += '</div>';
    
    browserUI += '</div>';
    
    // Main browser content
    browserUI += '<div id="browserMainContent" style="flex: 1; overflow: hidden; background: #1a1d2e;">';
    browserUI += app.getAppController();
    browserUI += '</div>';

    // Status bar
    browserUI += '<div id="browserStatusBar" style="background: #2a2d3e; border-top: 1px solid #3a3d4e; padding: 4px 10px; font-size: 11px; color: #9ca3af; display: flex; justify-content: space-between;">';
    browserUI += '<span id="browserStatus">Ready</span>';
    browserUI += '<span id="browserConnectionInfo">🔓 Not Secure</span>';
    browserUI += '</div>';
    
    browserUI += '</div>';
    
    w.setContent(browserUI);
    // Add compact mode toggle and close button
    var controls = '<button onclick="toggleBrowserCompactMode(' + id + '); event.stopPropagation();" style="padding: 6px 12px; background: #4a5568; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 5px;" title="Minimize browser (Alt+M)">↙ Minimize</button>';
    controls += '<button onclick="closeWebBrowser(); event.stopPropagation();" style="padding: 6px 12px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>';
    w.setControls(controls);
    w.render();

    // Add keyboard shortcut for minimizing (Alt+M)
    document.addEventListener('keydown', function browserKeyHandler(e) {
        if (e.altKey && e.key === 'm') {
            var browserWindow = document.getElementById('divhttpclient');
            if (browserWindow) {
                e.preventDefault();
                toggleBrowserCompactMode(id);
            } else {
                // Remove listener if browser is closed
                document.removeEventListener('keydown', browserKeyHandler);
            }
        }
    });
    
    // Update the window title to be more minimal since we have our own chrome
    var titleBar = document.querySelector('#divhttpclient .title');
    if (titleBar) {
        titleBar.style.background = 'linear-gradient(135deg, #2a2d3e, #1a1d2e)';
        titleBar.style.borderBottom = '1px solid #3a3d4e';
    }
}

function closeWebBrowser()
{
    // No background div to remove since we didn't create one
    // removeBodyDiv('divbk');

    // Remove keyboard event listeners
    var keyHandlers = document.querySelectorAll('[data-browser-key-handler]');
    keyHandlers.forEach(function(handler) {
        document.removeEventListener('keydown', handler);
    });

    // Remove compact mode styles if they exist
    var styleOverride = document.getElementById('browserCompactModeStyles');
    if (styleOverride) {
        styleOverride.remove();
    }

    uimanager.getWindow("divhttpclient").dispose();
    browserCompactMode = false; // Reset for next time
}

// Toggle between compact and full view
function toggleBrowserCompactMode(id)
{
    var windowDiv = document.getElementById("divhttpclient");
    if (!windowDiv) return;

    console.log("Toggle browser compact mode. Current state:", browserCompactMode);
    browserCompactMode = !browserCompactMode;

    if (browserCompactMode) {
        // Compact mode - stay in place but shrink and become transparent
        // Store original position for restoration
        if (!windowDiv.dataset.originalWidth) {
            var computedStyle = window.getComputedStyle(windowDiv);
            windowDiv.dataset.originalWidth = computedStyle.width;
            windowDiv.dataset.originalHeight = computedStyle.height;
            windowDiv.dataset.originalLeft = computedStyle.left;
            windowDiv.dataset.originalTop = computedStyle.top;
            windowDiv.dataset.originalOpacity = computedStyle.opacity || '0.98';
            console.log("Stored original dimensions:", computedStyle.width, computedStyle.height);
        }

        // Create or update a style element to forcefully override the window styles
        var styleOverride = document.getElementById('browserCompactModeStyles');
        if (!styleOverride) {
            styleOverride = document.createElement('style');
            styleOverride.id = 'browserCompactModeStyles';
            document.head.appendChild(styleOverride);
        }

        // Apply compact mode styles with !important to override UIWindow
        styleOverride.textContent = '#divhttpclient { ' +
            'width: 300px !important; ' +
            'height: 200px !important; ' +
            'opacity: 0.3 !important; ' +
            'transition: all 0.3s ease !important; ' +
        '} ' +
        '#divhttpclient #divhttpclient_contents { ' +
            'height: 104px !important; ' +
        '}';

        console.log("Applied compact mode styles via style element");

        // Hide all content
        var browserContainer = document.querySelector('#divhttpclient #browserContainer');
        if (browserContainer) {
            browserContainer.style.display = 'none';
        }

        // Hide the title bar content to reduce clutter
        var titleBar = document.querySelector('#divhttpclient .title');
        if (titleBar) {
            titleBar.style.opacity = '0.5';
        }

        // Add a simple restore button overlay
        var restoreOverlay = document.getElementById('browserRestoreOverlay');
        if (!restoreOverlay) {
            restoreOverlay = document.createElement('div');
            restoreOverlay.id = 'browserRestoreOverlay';
            restoreOverlay.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; background: rgba(26, 26, 46, 0.8);';
            restoreOverlay.innerHTML = '<button onclick="toggleBrowserCompactMode(' + id + ', event)" style="padding: 20px 40px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">' +
                                      '<div style="font-size: 32px; margin-bottom: 5px;">🌐</div>' +
                                      'Click to Restore Browser</button>';
            windowDiv.appendChild(restoreOverlay);
        }
        restoreOverlay.style.display = 'flex';

        // Don't make the window itself clickable - only the restore button
        // This prevents double-triggering issues

        // Update button text in controls
        var compactBtn = document.querySelector('#divhttpclient button[onclick*="toggleBrowserCompactMode"]');
        if (compactBtn) {
            compactBtn.innerHTML = '↗ Restore';
            compactBtn.style.background = '#48bb78';
        }
    } else {
        // Full mode - restore to original size
        var origWidth = windowDiv.dataset.originalWidth || '700px';
        var origHeight = windowDiv.dataset.originalHeight || '550px';
        var origOpacity = windowDiv.dataset.originalOpacity || '0.98';

        // Remove the compact mode style override
        var styleOverride = document.getElementById('browserCompactModeStyles');
        if (styleOverride) {
            styleOverride.textContent = '#divhttpclient { ' +
                'width: ' + origWidth + ' !important; ' +
                'height: ' + origHeight + ' !important; ' +
                'opacity: ' + origOpacity + ' !important; ' +
                'transition: all 0.3s ease !important; ' +
            '} ' +
            '#divhttpclient #divhttpclient_contents { ' +
                'height: ' + (parseInt(origHeight) - 96) + 'px !important; ' +
            '}';
        }

        windowDiv.style.cursor = 'default';
        windowDiv.onclick = null;

        console.log("Restored full mode dimensions via style element");

        // Show browser content
        var browserContainer = document.querySelector('#divhttpclient #browserContainer');
        if (browserContainer) {
            browserContainer.style.display = 'flex';
        }

        // Restore title bar
        var titleBar = document.querySelector('#divhttpclient .title');
        if (titleBar) {
            titleBar.style.opacity = '1';
        }

        // Hide restore overlay
        var restoreOverlay = document.getElementById('browserRestoreOverlay');
        if (restoreOverlay) {
            restoreOverlay.style.display = 'none';
        }

        // Update button text
        var compactBtn = document.querySelector('#divhttpclient button[onclick*="toggleBrowserCompactMode"]');
        if (compactBtn) {
            compactBtn.innerHTML = '↙ Minimize';
            compactBtn.style.background = '#4a5568';
        }
    }
}

// Browser navigation functions
function navigateBack(id) {
    var host = network.getElement(id);
    var app = host.getApp("HTTPClient");
    if (app.browserHistory && app.historyIndex > 0) {
        app.historyIndex--;
        var url = app.browserHistory[app.historyIndex];
        document.getElementById('httpclienturl').value = url;
        requestHTTPWebSite(id);
    }
}

function navigateForward(id) {
    var host = network.getElement(id);
    var app = host.getApp("HTTPClient");
    if (app.browserHistory && app.historyIndex < app.browserHistory.length - 1) {
        app.historyIndex++;
        var url = app.browserHistory[app.historyIndex];
        document.getElementById('httpclienturl').value = url;
        requestHTTPWebSite(id);
    }
}

function refreshPage(id) {
    requestHTTPWebSite(id);
}

// API Explorer Functions
function viewAPIExplorer(id)
{
    createBkDiv();

    // Make sure the background overlay is dark
    var bkDiv = document.getElementById('divbk');
    if (bkDiv) {
        bkDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    }

    var host = network.getElement(id);
    var app = host.getApp("HTTPClient");

    // Create API Explorer window
    var w = new UIWindow('divapiexplorer','🎓 REST API Explorer',800,650,false,1.0);

    // Apply dark theme to window after creation
    setTimeout(function() {
        var windowEl = document.getElementById('divapiexplorer');
        if (windowEl) {
            windowEl.style.background = '#1a1d2e';
            windowEl.style.backgroundColor = '#1a1d2e';
            windowEl.style.border = '2px solid #3a3d4e';
            windowEl.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.8)';
            windowEl.style.borderRadius = '8px';

            // Remove any white/light backgrounds from all child elements
            var allDivs = windowEl.getElementsByTagName('div');
            for (var i = 0; i < allDivs.length; i++) {
                if (allDivs[i].style.background && allDivs[i].style.background.includes('white')) {
                    allDivs[i].style.background = '#1a1d2e';
                }
                if (allDivs[i].style.backgroundColor && allDivs[i].style.backgroundColor.includes('white')) {
                    allDivs[i].style.backgroundColor = '#1a1d2e';
                }
            }

            // Fix title bar
            var titleBar = windowEl.querySelector('.title');
            if (titleBar) {
                titleBar.style.background = 'linear-gradient(135deg, #2a2d3e, #1a1d2e)';
                titleBar.style.backgroundColor = '#2a2d3e';
                titleBar.style.borderBottom = '1px solid #3a3d4e';
                titleBar.style.color = '#e4e4e7';
                titleBar.style.borderRadius = '8px 8px 0 0';
            }

            // Fix controls area
            var controls = windowEl.querySelector('.controls');
            if (controls) {
                controls.style.background = '#2a2d3e';
                controls.style.backgroundColor = '#2a2d3e';
                controls.style.borderTop = '1px solid #3a3d4e';
                controls.style.borderRadius = '0 0 8px 8px';
            }

            // Fix content area
            var content = windowEl.querySelector('.content');
            if (content) {
                content.style.background = '#1a1d2e';
                content.style.backgroundColor = '#1a1d2e';
            }

            // Fix any table elements
            var tables = windowEl.getElementsByTagName('table');
            for (var i = 0; i < tables.length; i++) {
                tables[i].style.background = '#2a2d3e';
                tables[i].style.backgroundColor = '#2a2d3e';
            }
        }
    }, 10);

    // Build API Explorer interface
    var explorerUI = '<div style="height: 100%; display: flex; flex-direction: column; background: #1a1d2e; color: #e4e4e7;">';

    // Header with educational info
    explorerUI += '<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 15px; color: white;">';
    explorerUI += '<h3 style="margin: 0 0 8px 0;">🎓 Learn REST API & HTTP Methods</h3>';
    explorerUI += '<p style="margin: 0; font-size: 13px; opacity: 0.9;">Send different HTTP methods to your web server and see how it responds!</p>';
    explorerUI += '</div>';

    // Request builder
    explorerUI += '<div style="padding: 20px; background: #2a2d3e; border-bottom: 2px solid #3a3d4e;">';

    // Method selector with educational tooltips
    explorerUI += '<div style="display: flex; gap: 15px; margin-bottom: 15px;">';
    explorerUI += '<div style="flex: 0 0 120px;">';
    explorerUI += '<label style="display: block; margin-bottom: 5px; font-size: 12px; color: #9ca3af;">HTTP Method:</label>';
    explorerUI += '<select id="apiMethod" onchange="updateMethodInfo()" style="width: 100%; padding: 8px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 4px;">';
    explorerUI += '<option value="GET">GET</option>';
    explorerUI += '<option value="POST">POST</option>';
    explorerUI += '<option value="PUT">PUT</option>';
    explorerUI += '<option value="PATCH">PATCH</option>';
    explorerUI += '<option value="DELETE">DELETE</option>';
    explorerUI += '<option value="HEAD">HEAD</option>';
    explorerUI += '<option value="OPTIONS">OPTIONS</option>';
    explorerUI += '</select>';
    explorerUI += '</div>';

    // URL input
    explorerUI += '<div style="flex: 1;">';
    explorerUI += '<label style="display: block; margin-bottom: 5px; font-size: 12px; color: #9ca3af;">URL (host:port/path):</label>';
    explorerUI += '<input type="text" id="apiUrl" placeholder="example.com:8080/api/users" style="width: 100%; padding: 8px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 4px;">';
    explorerUI += '</div>';

    explorerUI += '<button onclick="sendAPIRequest(' + id + ')" style="padding: 8px 20px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Send Request</button>';
    explorerUI += '</div>';

    // Method info panel
    explorerUI += '<div id="methodInfo" style="padding: 15px 20px; background: #2a2d3e; border-bottom: 1px solid #3a3d4e; min-height: 60px;">';
    explorerUI += getMethodInfo('GET');
    explorerUI += '</div>';

    // Request body (for POST/PUT/PATCH)
    explorerUI += '<div id="requestBodySection" style="display: none; padding: 15px 20px; background: #2a2d3e; border-bottom: 1px solid #3a3d4e;">';
    explorerUI += '<label style="display: block; margin-bottom: 5px; font-size: 12px; color: #9ca3af;">Request Body (JSON):</label>';
    explorerUI += '<textarea id="apiRequestBody" style="width: 100%; height: 100px; padding: 8px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 4px; font-family: monospace;" placeholder=\'{\n  "name": "John Doe",\n  "email": "john@example.com"\n}\'></textarea>';
    explorerUI += '</div>';

    // Response area
    explorerUI += '<div style="flex: 1; overflow: auto; padding: 20px; background: #1a1d2e;">';
    explorerUI += '<div id="apiResponse">';
    explorerUI += '<div style="text-align: center; color: #9ca3af; padding: 40px;">';
    explorerUI += '<p style="font-size: 16px;">👆 Configure your request above and click "Send Request"</p>';
    explorerUI += '<p style="font-size: 13px; margin-top: 10px;">The request will be sent through the network to your web server</p>';
    explorerUI += '</div>';
    explorerUI += '</div>';
    explorerUI += '</div>';

    explorerUI += '</div>';

    explorerUI += '</div>';

    w.setContent(explorerUI);
    w.setControls('<button onclick="closeAPIExplorer();" style="padding: 6px 12px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>');
    w.render();
}

function closeAPIExplorer() {
    removeBodyDiv('divbk');
    var window = uimanager.getWindow('divapiexplorer');
    if (window) {
        window.dispose();
    }
}

function updateMethodInfo() {
    var method = document.getElementById('apiMethod').value;
    document.getElementById('methodInfo').innerHTML = getMethodInfo(method);
    var bodySection = document.getElementById('requestBodySection');
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        bodySection.style.display = 'block';
    } else {
        bodySection.style.display = 'none';
    }
}

function getMethodInfo(method) {
    var info = {
        'GET': {
            icon: '📥',
            color: '#4CAF50',
            description: 'Retrieve data from the server',
            characteristics: 'Safe ✅ | Idempotent 🔄 | Cacheable 💾',
            example: 'GET /api/users - Returns list of all users'
        },
        'POST': {
            icon: '📤',
            color: '#2196F3',
            description: 'Create a new resource on the server',
            characteristics: 'Not Safe ⚠️ | Not Idempotent ❌ | Not Cacheable ❌',
            example: 'POST /api/users - Creates a new user'
        },
        'PUT': {
            icon: '🔄',
            color: '#FF9800',
            description: 'Replace an entire resource',
            characteristics: 'Not Safe ⚠️ | Idempotent 🔄 | Not Cacheable ❌',
            example: 'PUT /api/users/123 - Replaces user 123 entirely'
        },
        'PATCH': {
            icon: '✏️',
            color: '#9C27B0',
            description: 'Partially update a resource',
            characteristics: 'Not Safe ⚠️ | Idempotent 🔄 | Not Cacheable ❌',
            example: 'PATCH /api/users/123 - Updates specific fields'
        },
        'DELETE': {
            icon: '🗑️',
            color: '#F44336',
            description: 'Remove a resource from the server',
            characteristics: 'Not Safe ⚠️ | Idempotent 🔄 | Not Cacheable ❌',
            example: 'DELETE /api/users/123 - Deletes user 123'
        },
        'HEAD': {
            icon: '📋',
            color: '#607D8B',
            description: 'Get headers only, no response body',
            characteristics: 'Safe ✅ | Idempotent 🔄 | Cacheable 💾',
            example: 'HEAD /api/users - Returns headers without data'
        },
        'OPTIONS': {
            icon: '❓',
            color: '#795548',
            description: 'Get allowed methods for a resource',
            characteristics: 'Safe ✅ | Idempotent 🔄 | Cacheable 💾',
            example: 'OPTIONS /api/users - Returns allowed operations'
        }
    };

    var m = info[method] || info['GET'];
    var html = '<div style="display: flex; align-items: center; gap: 15px;">';
    html += '<span style="font-size: 24px;">' + m.icon + '</span>';
    html += '<div style="flex: 1;">';
    html += '<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">';
    html += '<span style="background: ' + m.color + '; color: white; padding: 2px 8px; border-radius: 3px; font-weight: bold; font-size: 11px;">' + method + '</span>';
    html += '<span style="font-size: 13px; color: #e4e4e7;">' + m.description + '</span>';
    html += '</div>';
    html += '<div style="font-size: 11px; color: #9ca3af;">' + m.characteristics + ' | Example: ' + m.example + '</div>';
    html += '</div>';
    html += '</div>';
    return html;
}

function sendAPIRequest(hostId) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPClient");

    var method = document.getElementById('apiMethod').value;
    var url = document.getElementById('apiUrl').value;
    var body = document.getElementById('apiRequestBody') ? document.getElementById('apiRequestBody').value : '';

    // Update response area to show loading
    document.getElementById('apiResponse').innerHTML = '<div style="text-align: center; padding: 20px;"><div style="font-size: 24px;">⏳</div>Sending ' + method + ' request through the network...</div>';

    // Send the API request
    app.sendAPIRequest(method, url, body, function(response) {
        displayAPIResponse(response, method);
    });
}

function displayAPIResponse(response, method) {
    var html = '<div style="background: #2a2d3e; border-radius: 8px; padding: 20px;">';

    // Status line with educational color coding
    var statusColor = '#4CAF50';
    var statusIcon = '✅';
    var statusExplanation = '';

    if (response.status >= 200 && response.status < 300) {
        statusColor = '#4CAF50';
        statusIcon = '✅';
        statusExplanation = 'Success! The request was processed successfully.';
    } else if (response.status >= 300 && response.status < 400) {
        statusColor = '#2196F3';
        statusIcon = '↩️';
        statusExplanation = 'Redirection. The resource has moved.';
    } else if (response.status >= 400 && response.status < 500) {
        statusColor = '#FF9800';
        statusIcon = '⚠️';
        statusExplanation = 'Client error. Check your request.';
    } else if (response.status >= 500) {
        statusColor = '#F44336';
        statusIcon = '❌';
        statusExplanation = 'Server error. The server encountered a problem.';
    }

    html += '<div style="background: ' + statusColor + '22; border: 2px solid ' + statusColor + '; border-radius: 6px; padding: 15px; margin-bottom: 20px;">';
    html += '<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">';
    html += '<span style="font-size: 24px;">' + statusIcon + '</span>';
    html += '<div>';
    html += '<div style="font-size: 18px; font-weight: bold; color: ' + statusColor + ';">HTTP ' + response.status + ' ' + (response.statusText || '') + '</div>';
    html += '<div style="font-size: 13px; color: #9ca3af; margin-top: 3px;">' + statusExplanation + '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    // Request summary
    html += '<div style="margin-bottom: 20px;">';
    html += '<h4 style="color: #667eea; margin-bottom: 10px;">📤 Request Sent:</h4>';
    html += '<div style="background: #1a1d2e; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px;">';
    html += method + ' ' + (response.url || '/') + '<br>';
    html += 'Through network path: Client → Router → Server';
    html += '</div>';
    html += '</div>';

    // Response headers
    if (response.headers) {
        html += '<div style="margin-bottom: 20px;">';
        html += '<h4 style="color: #667eea; margin-bottom: 10px;">📋 Response Headers:</h4>';
        html += '<div style="background: #1a1d2e; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px;">';
        for (var header in response.headers) {
            html += '<div><span style="color: #9ca3af;">' + header + ':</span> ' + response.headers[header] + '</div>';
        }
        html += '</div>';
        html += '</div>';
    }

    // Response body
    if (response.body) {
        html += '<div>';
        html += '<h4 style="color: #667eea; margin-bottom: 10px;">📦 Response Body:</h4>';
        html += '<div style="background: #1a1d2e; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px; white-space: pre-wrap; max-height: 300px; overflow-y: auto;">';
        if (typeof response.body === 'object') {
            html += JSON.stringify(response.body, null, 2);
        } else {
            html += response.body;
        }
        html += '</div>';
        html += '</div>';
    }

    html += '</div>';

    document.getElementById('apiResponse').innerHTML = html;
}


function updateBrowserTabTitle(title) {
    var tabTitle = document.getElementById('browserTabTitle');
    if (tabTitle) {
        tabTitle.textContent = title || 'New Tab';
    }
}

function updateBrowserStatus(status, isSecure) {
    var statusEl = document.getElementById('browserStatus');
    if (statusEl) {
        statusEl.textContent = status || 'Ready';
    }
    
    var connInfo = document.getElementById('browserConnectionInfo');
    if (connInfo) {
        if (isSecure === true) {
            connInfo.innerHTML = '🔒 Secure Connection';
            connInfo.style.color = '#4ade80';
        } else if (isSecure === false) {
            connInfo.innerHTML = '🔓 Not Secure';
            connInfo.style.color = '#fbbf24';
        } else {
            connInfo.innerHTML = '';
        }
    }
}

function requestHTTPWebSite(id)
{
    var host = network.getElement(id);
    var app = host.getApp("HTTPClient");
    var url = document.getElementById("httpclienturl").value;
    app.requestHTTPWebSite(url);
}

// Phase 2: Toggle response headers display
function toggleResponseHeaders()
{
    var headersDiv = document.getElementById('responseHeadersDiv');
    if (headersDiv) {
        if (headersDiv.style.display === 'none') {
            headersDiv.style.display = 'block';
        } else {
            headersDiv.style.display = 'none';
        }
    }
}

// Toggle security details display
function toggleSecurityDetails()
{
    var detailsDiv = document.getElementById('securityDetailsDiv');
    var toggleIcon = document.getElementById('securityToggleIcon');
    if (detailsDiv && toggleIcon) {
        if (detailsDiv.style.display === 'none') {
            detailsDiv.style.display = 'block';
            toggleIcon.innerHTML = '▼ Click to hide';
        } else {
            detailsDiv.style.display = 'none';
            toggleIcon.innerHTML = '▶ Click for details';
        }
    }
}

// Show authentication dialog for 401 responses
function showAuthenticationDialog(hostId)
{
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPClient");
    
    var content = '<div style="padding: 15px;">';
    content += '<div style="margin-bottom: 15px;">';
    content += '<strong>🔒 Authentication Required</strong><br/>';
    content += '<small style="color: #666;">The server requires a username and password.</small>';
    content += '</div>';
    
    content += '<div style="margin-bottom: 10px;">';
    content += '<label style="display: block; margin-bottom: 5px;">Username:</label>';
    content += '<input type="text" id="authUsername" style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 4px;" />';
    content += '</div>';
    
    content += '<div style="margin-bottom: 15px;">';
    content += '<label style="display: block; margin-bottom: 5px;">Password:</label>';
    content += '<input type="password" id="authPassword" style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 4px;" />';
    content += '</div>';
    
    content += '</div>';
    
    var controls = '<button onclick="submitAuthentication(\'' + hostId + '\')">Login</button> ';
    controls += '<button onclick="cancelAuthentication()">Cancel</button>';
    
    var w = new UIWindow('divauthentication', 'Authentication Required', 350, 250, false, 1.0);
    w.setContent(content);
    w.setControls(controls);
    w.render();
}

function submitAuthentication(hostId)
{
    var username = document.getElementById('authUsername').value;
    var password = document.getElementById('authPassword').value;
    
    if (username && password) {
        var host = network.getElement(hostId);
        var app = host.getApp("HTTPClient");
        
        // Store credentials and retry request
        app.retryWithAuth(username, password);
        
        uimanager.getWindow("divauthentication").dispose();
    }
}

function cancelAuthentication()
{
    // Reset authentication state so user can try again later
    var activeHostId = null;
    // Find the host that's currently showing auth dialog
    var elements = network.getAllElements();
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type === 'host' && elements[i].getApp) {
            var app = elements[i].getApp("HTTPClient");
            if (app && app.authAttempted) {
                app.authAttempted = false;
                app.authHeader = null;
                break;
            }
        }
    }

    uimanager.getWindow("divauthentication").dispose();
}

// Browser tab switching
function showBrowserTab(tab, hostId)
{
    var contentDiv = document.getElementById('httpbrowsercontents');
    if (!contentDiv) return;
    
    // Update tab styles
    var tabs = ['content', 'request', 'response', 'certificate'];
    tabs.forEach(function(t) {
        var tabBtn = document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1));
        if (tabBtn) {
            if (t === tab) {
                tabBtn.style.background = '#667eea';
                tabBtn.style.color = 'white';
                tabBtn.onmouseover = null;
                tabBtn.onmouseout = null;
            } else {
                tabBtn.style.background = 'transparent';
                tabBtn.style.color = '#9ca3af';
                tabBtn.onmouseover = function() { this.style.background = '#3a3d4e'; };
                tabBtn.onmouseout = function() { this.style.background = 'transparent'; };
            }
        }
    });
    
    // Get the HTTPClient instance from the specific host
    var client = null;
    if (hostId) {
        var host = network.getElement(hostId);
        if (host && host.getApp) {
            client = host.getApp('HTTPClient');
        }
    } else {
        // Fallback: search for any HTTPClient
        for (var id in network.elements) {
            var elem = network.elements[id];
            if (elem && elem.getApp && elem.getApp('HTTPClient')) {
                client = elem.getApp('HTTPClient');
                break;
            }
        }
    }
    
    if (!client) {
        contentDiv.innerHTML = '<div style="padding: 10px;"><em>Unable to find browser client</em></div>';
        return;
    }
    
    // Show appropriate content
    switch(tab) {
        case 'content':
            contentDiv.innerHTML = client.getBrowserContents();
            break;
            
        case 'request':
            var html = '<div style="padding: 10px; font-family: monospace; font-size: 0.9em;">';
            html += '<strong>Request Details:</strong><br/><br/>';
            if (client.lastRequestMethod) {
                html += '<div><strong>Method:</strong> ' + client.lastRequestMethod + '</div>';
                html += '<div><strong>URL:</strong> ' + (client.lastRequestURL || 'N/A') + '</div>';
                html += '<br/><strong>Request Headers:</strong><br/>';
                if (client.lastRequestHeaders) {
                    for (var h in client.lastRequestHeaders) {
                        html += '<div style="margin-left: 10px;">' + h + ': ' + client.lastRequestHeaders[h] + '</div>';
                    }
                } else {
                    html += '<em>No request sent yet</em>';
                }
            } else {
                html += '<em>No request sent yet</em>';
            }
            html += '</div>';
            contentDiv.innerHTML = html;
            break;
            
        case 'response':
            var html = '<div style="padding: 10px; font-family: monospace; font-size: 0.9em; background: #1a1d2e; color: #e4e4e7; border-radius: 4px;">';
            html += '<div style="margin-bottom: 15px;"><strong style="color: #667eea;">📥 HTTP Response</strong></div>';

            if (client.lastHeaders && lastCode) {
                // Show complete HTTP response format
                html += '<div style="background: #0a0c0f; padding: 12px; border-radius: 4px; margin-bottom: 15px; border: 1px solid #2a2d3e;">';

                // Status line (first line of HTTP response)
                var statusText = client.getStatusDescription ? client.getStatusDescription(lastCode) : '';
                html += '<div style="color: #4ade80; margin-bottom: 8px;">HTTP/1.1 ' + lastCode + ' ' + statusText + '</div>';

                // Response headers
                for (var h in client.lastHeaders) {
                    html += '<div><span style="color: #60a5fa;">' + h + ':</span> <span style="color: #e4e4e7;">' + client.lastHeaders[h] + '</span></div>';
                }

                // Show content info
                if (lastContent) {
                    html += '<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #2a2d3e;">';
                    html += '<div style="color: #9ca3af;">// Response Body (' + lastContent.length + ' bytes)</div>';
                    // Show first 500 chars of content if it's text
                    if (client.lastHeaders && client.lastHeaders['Content-Type'] && client.lastHeaders['Content-Type'].indexOf('text') !== -1) {
                        var preview = lastContent.substring(0, 500);
                        if (lastContent.length > 500) preview += '...';
                        html += '<div style="color: #6b7280; margin-top: 8px; white-space: pre-wrap; max-height: 200px; overflow-y: auto;">' + escapeHtml(preview) + '</div>';
                    }
                    html += '</div>';
                }
                html += '</div>';

                // Request details section
                html += '<div style="margin-top: 15px;"><strong style="color: #667eea;">📤 HTTP Request</strong></div>';
                html += '<div style="background: #0a0c0f; padding: 12px; border-radius: 4px; margin-top: 10px; border: 1px solid #2a2d3e;">';

                // Request line
                var requestUrl = client.lastRequestURL ? client.lastRequestURL.replace(/^https?:\/\/[^\/]+/, '') : '/';
                html += '<div style="color: #4ade80; margin-bottom: 8px;">' + (client.lastRequestMethod || 'GET') + ' ' + requestUrl + ' HTTP/1.1</div>';

                // Request headers
                if (client.lastRequestHeaders) {
                    for (var rh in client.lastRequestHeaders) {
                        html += '<div><span style="color: #60a5fa;">' + rh + ':</span> <span style="color: #e4e4e7;">' + client.lastRequestHeaders[rh] + '</span></div>';
                    }
                }
                html += '</div>';
            } else {
                html += '<div style="color: #9ca3af; text-align: center; padding: 40px;">';
                html += '<div style="font-size: 48px; margin-bottom: 10px;">📭</div>';
                html += '<em>No response received yet</em><br/>';
                html += '<span style="font-size: 0.9em;">Make a request to see HTTP headers here</span>';
                html += '</div>';
            }
            html += '</div>';
            contentDiv.innerHTML = html;
            break;
            
        case 'certificate':
            if (client.lastSSLInfo) {
                var html = '<div style="padding: 10px;">';
                html += '<strong>🔒 SSL Certificate Information:</strong><br/><br/>';
                
                // Check if certificate is trusted
                var hostId = client.lastHostId || client.lastSSLInfo.hostId || null;
                var domain = client.lastDomain || client.lastSSLInfo.subject || 'localhost';
                var isTrusted = false;
                
                if (typeof window.CertificateAuthority !== 'undefined' && hostId && domain) {
                    isTrusted = window.CertificateAuthority.isTrusted(hostId, domain);
                }
                
                html += '<table style="width: 100%;">';
                html += '<tr><td><strong>Issued To:</strong></td><td>' + (client.lastSSLInfo.subject || 'Unknown') + '</td></tr>';
                html += '<tr><td><strong>Issued By:</strong></td><td>' + client.lastSSLInfo.issuer + '</td></tr>';
                html += '<tr><td><strong>Self-Signed:</strong></td><td>' + (client.lastSSLInfo.selfSigned ? '⚠️ Yes' : '✅ No') + '</td></tr>';
                html += '<tr><td><strong>CA Trusted:</strong></td><td>' + (isTrusted ? '✅ Yes (Verified by CA)' : '❌ No') + '</td></tr>';
                html += '</table>';
                
                if (isTrusted) {
                    html += '<div style="margin-top: 10px; padding: 10px; background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px;">';
                    html += '<strong>✅ Trusted Certificate:</strong> This certificate has been signed by the Certificate Authority and is trusted.';
                    html += '</div>';
                } else if (client.lastSSLInfo.selfSigned) {
                    html += '<div style="margin-top: 10px; padding: 10px; background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 4px;">';
                    html += '<strong>⚠️ Warning:</strong> This certificate is self-signed and not verified by a trusted authority.';
                    html += '</div>';
                }
                html += '</div>';
                contentDiv.innerHTML = html;
            }
            break;
    }
}

var HTTPClient = function(ifacepos)
{
    var owner = null;
    var ifacepos = ifacepos;
    var lastCode = null;
    var lastContent = null;
    var lastURL = null;
    var _self = this;
    // Store protocol and port info from server response
    this.lastProtocol = null;
    this.lastPort = null;
    // Phase 2: Store headers and SSL info
    this.lastHeaders = null;
    this.lastSSLInfo = null;

    this.save = function()
    {
        var result = {};
        result.version = 1;
        result.id = this.getId();
        result.ifacepos = ifacepos;

        return result;
    };

    this.load = function(data)
    {
    };

    this.setOwner = function(c_owner)
    {
        owner = c_owner;
    };

    this.getOwner = function()
    {
        return owner;
    };

    this.getIfacepos = function()
    {
        return ifacepos;
    };

    this.getId = function()
    {
        return "HTTPClient";
    };

    this.resetHTTPServerInfo = function()
    {
        domains = [];
    };

    this.getMenuEntries = function()
    {
        var data = [];

        data[0] = {};
        data[0].img = 'img/64/envelope-HTTP.png';
        data[0].text = 'Web browser (HTTP client)';
        data[0].js = 'viewWebBrowser(' + owner.id + ');';

        data[1] = {};
        data[1].img = 'img/64/envelope-HTTP.png';
        data[1].text = '🎓 API Explorer (Learn REST)';
        data[1].js = 'viewAPIExplorer(' + owner.id + ');';

        return data;
    };

    this.getBrowserContents = function()
    {
        var result = "";
        
        // Handle client-side errors
        if (lastCode === 0) {
            result = '<div style="text-align:center; padding:20px;"><i class="fa fa-spinner fa-spin"></i> Loading...</div>';
        } else if (lastCode === 997) {
            result = '<div style="color:#f44336; padding:10px;">⚠️ Malformed URL.<br/><br/>Use only "domain_or_ip/filename.html".</div>';
        } else if (lastCode === 998) {
            result = '<div style="color:#f44336; padding:10px;">⚠️ DNS client not present.</div>';
        } else if (lastCode === 999) {
            result = '<div style="color:#f44336; padding:10px;">⚠️ Domain not in local DNS cache. Look up first.<br/><br/>If you already performed a lookup, the domain does not exist.</div>';
        } 
        // Handle HTTP response codes with color coding
        else if (lastCode) {
            var statusColor = '#4CAF50'; // Green for 2xx
            var statusIcon = '✅';
            
            if (lastCode >= 300 && lastCode < 400) {
                statusColor = '#2196F3'; // Blue for 3xx
                statusIcon = '↩️';
            } else if (lastCode >= 400 && lastCode < 500) {
                statusColor = '#FF9800'; // Orange for 4xx
                statusIcon = '⚠️';
            } else if (lastCode >= 500) {
                statusColor = '#f44336'; // Red for 5xx
                statusIcon = '❌';
            }
            
            result = '<div style="border-bottom: 2px solid ' + statusColor + '; padding: 5px; margin-bottom: 10px;">';
            result += '<span style="color:' + statusColor + '; font-weight:bold;">' + statusIcon + ' HTTP ' + lastCode + ' ' + this.getStatusDescription(lastCode) + '</span>';
            
            // Show protocol and port info if available
            if (this.lastProtocol) {
                result += '<span style="float:right; color:#666;">';
                if (this.lastProtocol === 'https') {
                    result += '🔒 HTTPS';
                } else {
                    result += '🔓 HTTP';
                }
                if (this.lastPort && this.lastPort !== 80 && this.lastPort !== 443) {
                    result += ':' + this.lastPort;
                }
                result += '</span>';
            }
            result += '</div>';
            
            // Phase 2: SSL Certificate Warning and Educational Info
            if (this.lastSSLInfo) {
                // Check if the certificate is trusted by the CA
                var hostId = this.lastHostId || this.lastSSLInfo.hostId || null;
                var domain = this.lastDomain || this.lastSSLInfo.subject || 'localhost';
                var isTrusted = false;
                
                // Try to check if certificate is CA-signed
                if (typeof window.CertificateAuthority !== 'undefined' && hostId && domain) {
                    isTrusted = window.CertificateAuthority.isTrusted(hostId, domain);
	// console.log("Checking certificate trust: hostId=" + hostId + ", domain=" + domain + ", trusted=" + isTrusted);
                }
                
                if (!isTrusted && this.lastSSLInfo.selfSigned) {
                    result += '<div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 8px; margin-bottom: 10px; border-radius: 4px;">';
                    result += '<strong style="color: #856404;">⚠️ Security Warning:</strong> ';
                    result += 'This site is using a self-signed certificate. ';
                    result += 'The connection is encrypted but the identity of the server cannot be verified.';
                    result += '</div>';
                } else if (isTrusted || !this.lastSSLInfo.selfSigned) {
                    // Collapsible secure connection info
                    result += '<div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 8px; margin-bottom: 10px; border-radius: 4px;">';
                    result += '<div style="cursor: pointer; user-select: none;" onclick="toggleSecurityDetails()">';
                    result += '<strong style="color: #155724;">🔒 Connection is secure</strong> ';
                    result += '<span id="securityToggleIcon" style="float: right; color: #155724;">▶ Click for details</span>';
                    result += '</div>';

                    // Collapsible content
                    result += '<div id="securityDetailsDiv" style="display: none; margin-top: 10px; padding-top: 10px; border-top: 1px solid #c3e6cb;">';

                    // Certificate details
                    result += '<div style="margin-bottom: 10px;">';
                    result += '<strong style="color: #155724;">🌐 Certificate Information:</strong><br/>';
                    result += '<div style="margin-left: 15px; margin-top: 5px; font-size: 0.9em;">';
                    if (this.lastSSLInfo) {
                        var certDomain = this.lastSSLInfo.subject || this.lastDomain || 'Unknown';
                        result += '<strong>Common Name (CN):</strong> ' + certDomain + '<br/>';
                        result += '<strong>Issuer:</strong> ' + (this.lastSSLInfo.issuer || 'NetworkSimulator CA') + '<br/>';
                        result += '<strong>Valid From:</strong> ' + new Date(Date.now() - 30*24*60*60*1000).toLocaleDateString() + '<br/>';
                        result += '<strong>Valid Until:</strong> ' + new Date(Date.now() + 335*24*60*60*1000).toLocaleDateString() + '<br/>';
                        result += '<strong>Key Algorithm:</strong> RSA 2048-bit<br/>';
                        result += '<strong>Signature Algorithm:</strong> SHA256withRSA<br/>';
                        if (isTrusted) {
                            result += '<strong>Verification:</strong> <span style="color: #28a745;">✓ Verified by Certificate Authority</span><br/>';
                        }
                        result += '<strong>Serial Number:</strong> ' + Math.random().toString(16).substring(2, 10).toUpperCase() + ':' + Math.random().toString(16).substring(2, 10).toUpperCase() + '<br/>';
                    }
                    result += '</div>';
                    result += '</div>';

                    // Encryption details
                    if (this.wasEncrypted) {
                        result += '<div style="margin-bottom: 10px;">';
                        result += '<strong style="color: #155724;">🔐 Connection Details:</strong><br/>';
                        result += '<div style="margin-left: 15px; margin-top: 5px; font-size: 0.9em;">';
                        result += '<strong>Protocol:</strong> TLS 1.3<br/>';
                        result += '<strong>Cipher Suite:</strong> TLS_AES_128_GCM_SHA256<br/>';
                        result += '<strong>Key Exchange:</strong> X25519<br/>';
                        if (this.encryptedSize && this.encryptedSize[1]) {
                            result += '<strong>Encrypted Payload:</strong> ' + this.encryptedSize[1] + ' bytes<br/>';
                        }
                        result += '</div>';
                        result += '</div>';

                        // Educational info
                        result += '<div style="background-color: rgba(227, 242, 253, 0.5); padding: 8px; border-radius: 4px;">';
                        result += '<strong style="color: #1565c0;">🎓 How HTTPS Works:</strong><br/>';
                        result += '<small style="color: #424242;">';
                        result += '• Your browser performed an SSL/TLS handshake with the server<br/>';
                        result += '• All data was encrypted before transmission<br/>';
                        result += '• The content you see was decrypted by your browser<br/>';
                        result += '• Network interceptors (MITM) would only see encrypted gibberish<br/>';
                        result += '• The certificate proves the server\'s identity';
                        result += '</small>';
                        result += '</div>';
                    }

                    result += '</div>'; // End collapsible content
                    result += '</div>'; // End main secure connection div
                }
            }
            
            // Phase 2: Headers viewer button with complete HTTP response
            if (this.lastHeaders && Object.keys(this.lastHeaders).length > 0) {
                result += '<div style="margin-bottom: 10px;">';
                result += '<button onclick="toggleResponseHeaders()" style="padding: 4px 8px; font-size: 0.9em;">📋 View HTTP Response (' + Object.keys(this.lastHeaders).length + ' headers)</button>';
                result += '<div id="responseHeadersDiv" style="display:none; margin-top: 10px; padding: 10px; background-color: #1a1d2e; border: 1px solid #3a3d4e; border-radius: 4px; font-family: monospace; font-size: 0.8em; color: #e4e4e7;">';

                // Show HTTP status line
                var statusText = this.getStatusDescription(lastCode);
                result += '<div style="color: #4ade80; font-weight: bold; margin-bottom: 8px;">HTTP/1.1 ' + lastCode + ' ' + statusText + '</div>';

                // Show headers
                for (var header in this.lastHeaders) {
                    result += '<div><span style="color: #60a5fa;">' + header + ':</span> ' + this.lastHeaders[header] + '</div>';
                }

                // Show empty line between headers and body (HTTP standard)
                result += '<div style="margin-top: 8px; color: #6b7280;">// Empty line (separates headers from body)</div>';
                result += '</div>';
                result += '</div>';
            }
            
            // Display content
            result += '<div style="padding:10px;">';
            if (lastContent) {
                result += lastContent;
            } else {
                result += '<em>No content</em>';
            }
            result += '</div>';
        }

        return result;
    };
    
    this.getStatusDescription = function(code) {
        var descriptions = {
            200: 'OK',
            201: 'Created',
            301: 'Moved Permanently',
            302: 'Found',
            304: 'Not Modified',
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            500: 'Internal Server Error',
            502: 'Bad Gateway',
            503: 'Service Unavailable'
        };
        return descriptions[code] || 'Unknown';
    };

    function updateBrowser()
    {
        var browsercontents = document.getElementById("httpbrowsercontents");
        if (browsercontents !== null)
        {
            browsercontents.innerHTML = _self.getBrowserContents();
        }
        
        // Update tab title with page info
        if (lastURL) {
            var domain = lastURL.replace(/^https?:\/\//, '').split('/')[0];
            updateBrowserTabTitle(domain || 'Loading...');
        }
        
        // Update status bar
        if (_self.lastProtocol === 'https') {
            updateBrowserStatus('Done', true);
        } else if (_self.lastProtocol) {
            updateBrowserStatus('Done', false);
        }
    }

    this.getAppController = function()
    {
        var result = '<div style="padding: 0; height: 100%; display: flex; flex-direction: column; background: #1a1d2e;">';
        
        // Address bar section with better browser styling
        result += '<div style="background: #2a2d3e; padding: 10px; border-bottom: 1px solid #3a3d4e;">';
        result += '<div style="display: flex; align-items: center; gap: 8px;">';
        
        // URL Bar container with browser-like styling
        result += '<div style="flex: 1; display: flex; align-items: center; background: #1a1d2e; border: 1px solid #3a3d4e; border-radius: 20px; padding: 2px 12px; height: 32px;">';
        
        // Protocol/Security indicator
        if (_self.lastProtocol === 'https') {
            result += '<span style="color: #4ade80; font-size: 14px; margin-right: 8px; cursor: pointer;" title="View Certificate" onclick="showBrowserTab(\'certificate\', ' + owner.id + ')">🔒</span>';
        } else {
            result += '<span style="color: #9ca3af; font-size: 14px; margin-right: 8px;" title="Not Secure">ⓘ</span>';
        }
        
        // URL input with minimal styling
        result += '<input type="text" id="httpclienturl" placeholder="Search or enter web address" ';
        result += 'style="flex: 1; padding: 0; background: transparent; border: none; color: #e4e4e7; font-size: 13px; outline: none;" ';
        result += 'value="' + ((lastURL !== null) ? lastURL : "") + '" ';
        result += 'onfocus="this.select()" ';
        result += 'onkeypress="if(event.keyCode==13) { requestHTTPWebSite(\'' + owner.id + '\'); updateBrowserStatus(\'Loading...\', null); }" />';
        
        // Bookmark star
        result += '<span style="color: #9ca3af; font-size: 16px; margin-left: 8px; cursor: pointer;" title="Bookmark">☆</span>';
        result += '</div>';
        
        // Go button and menu
        result += '<button onclick="requestHTTPWebSite(\'' + owner.id + '\'); updateBrowserStatus(\'Loading...\', null);" ';
        result += 'style="width: 32px; height: 32px; border-radius: 6px; background: #667eea; color: white; border: none; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" onmouseover="this.style.opacity=\'0.9\'" onmouseout="this.style.opacity=\'1\'" title="Go">Go</button>';
        
        result += '<button onclick="toggleDevTools()" ';
        result += 'style="width: 32px; height: 32px; border-radius: 6px; background: transparent; color: #9ca3af; border: 1px solid #3a3d4e; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" onmouseover="this.style.background=\'#3a3d4e\'" onmouseout="this.style.background=\'transparent\'" title="Developer Tools (F12)">⋮</button>';
        
        result += '</div>';

        // SSL Handshake toggle option
        result += '<div style="padding: 4px 12px; display: flex; align-items: center; gap: 8px; background: #1a1d2e; border-top: 1px solid #3a3d4e;">';
        result += '<input type="checkbox" id="sslHandshakeToggle" ';
        result += localStorage.getItem('showSSLHandshake') !== 'false' ? 'checked' : '';
        result += ' onchange="toggleSSLHandshakeVisualization(this.checked)" ';
        result += 'style="cursor: pointer;" />';
        result += '<label for="sslHandshakeToggle" style="cursor: pointer; color: #9ca3af; font-size: 12px; user-select: none;">Show SSL/TLS Handshake Animation</label>';
        result += '<span style="color: #6b7280; font-size: 11px; margin-left: auto;">🔐 Educational visualization for HTTPS connections</span>';
        result += '</div>';

        result += '</div>';

        // Developer tools tabs (hidden by default, shown when needed)
        result += '<div id="devToolsTabs" style="background: #2a2d3e; border-bottom: 1px solid #3a3d4e; display: none;">';
        result += '<div style="display: flex; gap: 2px; font-size: 12px; padding: 0 8px;">';
        result += '<button onclick="showBrowserTab(\'content\', ' + owner.id + ')" id="tabContent" ';
        result += 'style="padding: 6px 12px; background: #667eea; color: white; border: none; cursor: pointer; border-radius: 4px 4px 0 0; margin-top: 4px;">Page</button>';
        result += '<button onclick="showBrowserTab(\'request\', ' + owner.id + ')" id="tabRequest" ';
        result += 'style="padding: 6px 12px; background: transparent; color: #9ca3af; border: none; cursor: pointer; border-radius: 4px 4px 0 0; margin-top: 4px;" onmouseover="this.style.background=\'#3a3d4e\'" onmouseout="this.style.background=\'transparent\'">Network</button>';
        result += '<button onclick="showBrowserTab(\'response\', ' + owner.id + ')" id="tabResponse" ';
        result += 'style="padding: 6px 12px; background: transparent; color: #9ca3af; border: none; cursor: pointer; border-radius: 4px 4px 0 0; margin-top: 4px;" onmouseover="this.style.background=\'#3a3d4e\'" onmouseout="this.style.background=\'transparent\'">Headers</button>';
        if (_self.lastSSLInfo) {
            result += '<button onclick="showBrowserTab(\'certificate\', ' + owner.id + ')" id="tabCertificate" ';
            result += 'style="padding: 6px 12px; background: transparent; color: #9ca3af; border: none; cursor: pointer; border-radius: 4px 4px 0 0; margin-top: 4px;" onmouseover="this.style.background=\'#3a3d4e\'" onmouseout="this.style.background=\'transparent\'">Security</button>';
        }
        result += '<button onclick="toggleDevTools()" style="margin-left: auto; padding: 4px 8px; background: transparent; color: #9ca3af; border: none; cursor: pointer; font-size: 16px;" title="Close Developer Tools">×</button>';
        result += '</div>';
        result += '</div>';
        
        // Main content area with browser-like styling
        result += '<div id="httpbrowsercontents" style="flex: 1; overflow: auto; background: white; color: #333; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif;">';
        result += this.getBrowserContents();
        result += '</div>';
        
        // Developer console toggle (F12 key)
        result += '<script>';
        result += 'function toggleDevTools() {';
        result += '  var tabs = document.getElementById("devToolsTabs");';
        result += '  if (tabs) tabs.style.display = tabs.style.display === "none" ? "block" : "none";';
        result += '}';
        result += 'document.addEventListener("keydown", function(e) {';
        result += '  if (e.key === "F12") { e.preventDefault(); toggleDevTools(); }';
        result += '});';
        result += '</script>';
        
        result += '</div>';
        return result;
    };

    function performHTTPRequest(domain, ip, filename, port, protocol)
    {
      console.log("performHTTPRequest called with: domain=" + domain + ", ip=" + ip + ", filename=" + filename + ", port=" + port + ", protocol=" + protocol);

      // Tenemos IP?
      if (owner.getConnectable().getIPInfo(ifacepos).getIPv4() !== null)
      {
        lastCode = 0;
        updateBrowser();

        // Set a timeout to show error if no response received
        if (_self.responseTimeout) {
            clearTimeout(_self.responseTimeout);
            _self.responseTimeout = null;
        }

        // Use longer timeout to allow for multi-hop network routing
        // HTTPS needs more time for SSL handshake, HTTP also needs time for complex routing
        var timeoutDuration = (protocol === 'https') ? 15000 : 10000;

        _self.responseTimeout = setTimeout(function() {
            // Only show error if we still have this timeout active and no response
            if (lastCode === 0 && _self.responseTimeout) { // Still no response
                // Check if server was disabled
                if (window.lastServerDisabledError) {
                    showServerDisabledError(window.lastServerDisabledError);
                    window.lastServerDisabledError = null;
                } else {
                    // Generic no response error
                    updateBrowserStatus('No Response', 'error');
                    var browserContents = document.getElementById('httpbrowsercontents');
                    if (browserContents) {
                        var errorHTML = '<div style="padding: 30px; background: linear-gradient(135deg, #f5f5f5, #e8e8e8); min-height: 300px; display: flex; align-items: center; justify-content: center;">';
                        errorHTML += '<div style="max-width: 500px; text-align: center;">';
                        errorHTML += '<div style="font-size: 72px; margin-bottom: 20px;">🔌</div>';
                        errorHTML += '<h2 style="color: #d32f2f; margin: 0 0 15px 0;">Connection Failed</h2>';
                        errorHTML += '<p style="color: #666; margin: 0 0 10px 0;">Unable to connect to the server at <strong>' + ip + '</strong></p>';
                        errorHTML += '<div style="background: #fff; border-left: 4px solid #ff9800; padding: 15px; margin: 20px 0; text-align: left;">';
                        errorHTML += '<strong>Possible causes:</strong><br>';
                        errorHTML += '• The server is not running<br>';
                        errorHTML += '• Network routing issues<br>';
                        errorHTML += '• Firewall blocking the connection<br>';
                        errorHTML += '• Wrong IP address or port';
                        errorHTML += '</div>';
                        errorHTML += '</div>';
                        errorHTML += '</div>';
                        browserContents.innerHTML = errorHTML;
                    }
                }
                // Clear the timeout reference so we don't check it again
                _self.responseTimeout = null;
            }
        }, timeoutDuration); // 5 second for HTTP, 10 seconds for HTTPS

        var MAC = owner.getConnectable().getDstMAC(ip);
        if (MAC !== null)
        {
            var data = {};
            data.domain = domain;
            data.filename = filename;
            data.ip = ip;
            data.protocol = protocol || 'http';
            data.description = "GET: " + filename;
            // Include headers that would be sent
            data.headers = {
                'Host': domain + (port !== 80 && port !== 443 ? ':' + port : ''),
                'User-Agent': 'NetworkSimulator Browser/1.0',
                'Accept': 'text/html,application/json,*/*'
            };
            
            // Add authentication header if available
            if (_self.authHeader) {
                data.headers['Authorization'] = _self.authHeader;
            }
            
            // Store request details for display
            _self.lastRequestHeaders = data.headers;
            _self.lastRequestMethod = 'GET';
            _self.lastRequestURL = (protocol || 'http') + '://' + domain + '/' + filename;
            
            // Use provided port or default to 80
            var targetPort = port || 80;
            var sourcePort = getDinamycPort();
	// console.log("HTTPClient sending request: protocol=" + protocol + ", targetPort=" + targetPort + ", sourcePort=" + sourcePort);
            var message = new Message(
            "tcp",
            owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
            ip,
            owner.getConnectable().getMAC(ifacepos),
            MAC,
            sourcePort,
            targetPort,
            data, images[IMAGE_ENVELOPEHTTP]
            );

            // Track packet creation
            message.addPathHop({
                deviceType: 'source',
                deviceName: owner.getName(),
                deviceId: owner.id,
                action: 'created',
                changes: {
                    description: (protocol === 'https' ? 'HTTPS' : 'HTTP') + ' Request to ' + domain
                }
            });

            owner.getConnectable().getTrafficManager().registerApplication(_self, message.getOrigPort(), false);
            owner.getConnectable().getConnector(ifacepos).send(message);
        }
      }
    }

    // Send API request with different methods
    this.sendAPIRequest = function(method, url, body, callback) {
        _self.apiCallback = callback;
        _self.apiMethod = method;

        // Parse URL
        var protocol = 'http';
        var port = 80;
        var domain = '';
        var path = '';

        // Check for protocol
        if (url.indexOf('https://') === 0) {
            protocol = 'https';
            port = 443;
            url = url.substring(8);
        } else if (url.indexOf('http://') === 0) {
            protocol = 'http';
            port = 80;
            url = url.substring(7);
        }

        // Split into domain/path
        var firstSlash = url.indexOf('/');
        if (firstSlash === -1) {
            domain = url;
            path = '/index.html'; // Default file with leading slash
        } else {
            domain = url.substring(0, firstSlash);
            path = url.substring(firstSlash); // Keep the leading slash
            if (!path || path === '/') path = '/index.html';
        }

        // Check if port is specified
        if (domain.indexOf(':') > -1) {
            var domainParts = domain.split(':');
            domain = domainParts[0];
            port = parseInt(domainParts[1]) || port;
        }

        // Find IP for domain
        var ip = null;
        if (isValidIPv4(domain)) {
            ip = domain;
        } else {
            var dnsclientapp = owner.getApp("DNSClient");
            if (dnsclientapp) {
                ip = dnsclientapp.getIp(domain);
            }
        }

        if (!ip) {
            callback({
                status: 0,
                statusText: 'DNS Resolution Failed',
                error: 'Could not resolve domain: ' + domain
            });
            return;
        }

        // Send the API request through the network
        if (owner.getConnectable().getIPInfo(ifacepos).getIPv4() !== null) {
            var MAC = owner.getConnectable().getDstMAC(ip);
            if (MAC !== null) {
                var data = {};
                data.method = method;
                data.domain = domain;
                data.path = path;
                data.ip = ip;
                data.protocol = protocol;
                data.description = method + ": " + path;
                data.isAPIRequest = true;

                // Include headers
                data.headers = {
                    'Host': domain + (port !== 80 && port !== 443 ? ':' + port : ''),
                    'User-Agent': 'NetworkSimulator API Explorer/1.0',
                    'Accept': 'application/json, text/html, */*'
                };

                // Add body for POST/PUT/PATCH
                if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && body) {
                    try {
                        data.body = JSON.parse(body);
                        data.headers['Content-Type'] = 'application/json';
                        data.headers['Content-Length'] = body.length;
                    } catch(e) {
                        data.body = body;
                        data.headers['Content-Type'] = 'text/plain';
                        data.headers['Content-Length'] = body.length;
                    }
                }

                var targetPort = port;
                var sourcePort = getDinamycPort();

                var message = new Message(
                    "tcp",
                    owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
                    ip,
                    owner.getConnectable().getMAC(ifacepos),
                    MAC,
                    sourcePort,
                    targetPort,
                    data,
                    images[IMAGE_ENVELOPEHTTP]
                );

                // Track packet creation
                message.addPathHop({
                    deviceType: 'source',
                    deviceName: owner.getName(),
                    deviceId: owner.id,
                    action: 'created',
                    changes: {
                        description: method + ' API request to ' + domain
                    }
                });

                owner.getConnectable().getTrafficManager().registerApplication(_self, message.getOrigPort(), false);
                owner.getConnectable().getConnector(ifacepos).send(message);
            }
        }
    };

    this.requestHTTPWebSite = function(url)
    {
        var url = document.getElementById("httpclienturl").value.trim();
        lastURL = url;

        // Clear any previous server disabled errors
        window.lastServerDisabledError = null;
        
        // Update browser history
        if (!this.browserHistory) {
            this.browserHistory = [];
            this.historyIndex = -1;
        }
        if (url && url !== this.browserHistory[this.historyIndex]) {
            this.historyIndex++;
            this.browserHistory = this.browserHistory.slice(0, this.historyIndex);
            this.browserHistory.push(url);
        }
        
        // Parse URL with protocol support
        var protocol = 'http';
        var port = 80;
        var domain = '';
        var path = '';
        
        // Check for protocol
        if (url.indexOf('https://') === 0) {
            protocol = 'https';
            port = 443;
            url = url.substring(8);
        } else if (url.indexOf('http://') === 0) {
            protocol = 'http';
            port = 80;
            url = url.substring(7);
        }
        
        // Split into domain/path
        var firstSlash = url.indexOf('/');
        if (firstSlash === -1) {
            domain = url;
            path = '/index.html'; // Default file with leading slash
        } else {
            domain = url.substring(0, firstSlash);
            path = url.substring(firstSlash); // Keep the leading slash
            if (!path || path === '/') path = '/index.html';
        }
        
        // Check if port is specified (e.g., domain:8080)
        if (domain.indexOf(':') > -1) {
            var domainParts = domain.split(':');
            domain = domainParts[0];
            port = parseInt(domainParts[1]) || port;
        }
        
        // Store protocol, domain and port for the request
        _self.requestProtocol = protocol;
        _self.requestPort = port;
        _self.lastDomain = domain;
        
        if (!domain) {
            lastCode = 997;
            updateBrowser();
            return;
        }
        
        // Perform the request
        var ip = null;
        if (isValidIPv4(domain))
        {
            ip = domain;
            // If HTTPS, show SSL handshake animation first
            if (protocol === 'https' && window.sslHandshake) {
                console.log("HTTPS detected! Looking for server to show handshake...");
                // Find the server with this IP
                var serverId = _self.findServerByIP(ip, port);
                if (serverId === -1) {
                    // Server found but disabled - error already shown by findServerByIP
                    console.log("Server is disabled, error already shown");
                    return;
                } else if (serverId) {
                    // Check if SSL handshake visualization is enabled
                    var showHandshake = localStorage.getItem('showSSLHandshake') !== 'false';

                    if (showHandshake) {
                        console.log("Starting SSL handshake visualization between " + owner.id + " and " + serverId);
                        // Start SSL handshake visualization
                        window.sslHandshake.startHandshake(owner.id, serverId, function(success) {
                            console.log("SSL handshake completed with success: " + success);
                            if (success) {
                                // After handshake completes, perform the actual request
                                console.log("Calling performHTTPRequest with: domain=" + ip + ", ip=" + ip + ", path=" + path + ", port=" + port + ", protocol=" + protocol);
                                performHTTPRequest(ip, ip, path, port, protocol);
                            }
                        });
                    } else {
                        console.log("SSL handshake visualization disabled, proceeding directly with HTTPS request");
                        // Skip handshake visualization and go directly to the request
                        performHTTPRequest(ip, ip, path, port, protocol);
                    }
                } else {
                    console.log("Server not found for SSL handshake, proceeding with normal request");
                    // Server not found, just do the request normally
                    performHTTPRequest(ip, ip, path, port, protocol);
                }
            } else {
                performHTTPRequest(ip, ip, path, port, protocol);
            }
        }
        else
        {
            var dnsclientapp = owner.getApp("DNSClient");
            if (dnsclientapp === null)
            {
                lastCode = 998;
                updateBrowser();
            }
            else
            {
                var ip = dnsclientapp.getIp(domain);
                if (ip === null)
                {
                    lastCode = 999;
                    updateBrowser();
                }
                else
                {
                    // If HTTPS, show SSL handshake animation first
                    if (protocol === 'https' && window.sslHandshake) {
                        console.log("HTTPS detected (DNS lookup path)! Looking for server to show handshake...");
                        // Find the server with this IP
                        var serverId = _self.findServerByIP(ip, port);
                        if (serverId === -1) {
                            // Server found but disabled - error already shown by findServerByIP
                            console.log("Server is disabled, error already shown");
                            return;
                        } else if (serverId) {
                            // Check if SSL handshake visualization is enabled
                            var showHandshake = localStorage.getItem('showSSLHandshake') !== 'false';

                            if (showHandshake) {
                                console.log("Starting SSL handshake visualization between " + owner.id + " and " + serverId);
                                // Start SSL handshake visualization
                                window.sslHandshake.startHandshake(owner.id, serverId, function(success) {
                                    console.log("SSL handshake completed with success: " + success);
                                    if (success) {
                                        // After handshake completes, perform the actual request
                                        console.log("Calling performHTTPRequest with: domain=" + domain + ", ip=" + ip + ", path=" + path + ", port=" + port + ", protocol=" + protocol);
                                        performHTTPRequest(domain, ip, path, port, protocol);
                                    }
                                });
                            } else {
                                console.log("SSL handshake visualization disabled, proceeding directly with HTTPS request");
                                // Skip handshake visualization and go directly to the request
                                performHTTPRequest(domain, ip, path, port, protocol);
                            }
                        } else {
                            console.log("Server not found for SSL handshake, proceeding with normal request");
                            // Server not found, just do the request normally
                            performHTTPRequest(domain, ip, path, port, protocol);
                        }
                    } else {
                        performHTTPRequest(domain, ip, path, port, protocol);
                    }
                }
            }
        }
    };

    // Helper function to find a server by IP address and port
    this.findServerByIP = function(ip, port) {
        console.log("Looking for server with IP: " + ip + " on port: " + port);

        // Try different ways to access the network object
        var networkObj = null;

        // Try window.network first (global scope)
        if (window.network) {
            networkObj = window.network;
            console.log("Found network via window.network");
        }
        // Try direct global
        else if (typeof network !== 'undefined') {
            networkObj = network;
            console.log("Found network via global");
        }
        // Try from owner
        else if (owner && owner.network) {
            networkObj = owner.network;
            console.log("Found network via owner.network");
        }
        // Last resort - just return the owner ID if it has an HTTP server
        else {
            console.log("ERROR: Cannot access network object! Using fallback...");
            // Check if the destination IP matches owner's IP
            if (owner && owner.getConnectable) {
                var connectable = owner.getConnectable();
                for (var j = 0; j < connectable.getConnectorNumber(); j++) {
                    var ipInfo = connectable.getIPInfo(j);
                    if (ipInfo && ipInfo.getIPv4() === ip) {
                        console.log("Destination is self - checking for local HTTP server");
                        var httpServer = owner.getApp("HTTPServer");
                        if (httpServer && httpServer.enabled) {
                            console.log("Local HTTPServer found and enabled");
                            return owner.id;
                        }
                    }
                }
            }

            // Ultimate fallback - assume the server exists somewhere
            console.log("WARNING: Using blind fallback - assuming server exists");
            return "server_" + ip.replace(/\./g, '_');
        }

        if (!networkObj || !networkObj.getAllElements) {
            console.log("ERROR: Network object doesn't have getAllElements method!");
            return null;
        }

        // Get elements - getAllElements returns an OBJECT, not an array!
        var elements = networkObj.getAllElements();

        if (!elements) {
            console.log("ERROR: getAllElements returned null/undefined");
            return null;
        }

        // Convert elements object to array of values for iteration
        var elementKeys = Object.keys(elements);
        console.log("Total elements to check: " + elementKeys.length);

        if (elementKeys.length === 0) {
            console.log("No elements found in network!");
            return null;
        }

        // Iterate through the element keys
        for (var i = 0; i < elementKeys.length; i++) {
            var elemId = elementKeys[i];
            var elem = elements[elemId];
            if (elem && elem.getConnectable) {
                var connectable = elem.getConnectable();
                if (connectable) {
                    // Check all interfaces for this IP
                    for (var j = 0; j < connectable.getConnectorNumber(); j++) {
                        var ipInfo = connectable.getIPInfo(j);
                        if (ipInfo) {
                            var elemIP = ipInfo.getIPv4();
                            // Debug: show what IPs we're checking
                            if (elemIP) {
                                console.log("Checking element " + elem.id + " interface " + j + " with IP: " + elemIP);
                            }
                            if (elemIP === ip) {
                                console.log("MATCH! Found element with IP " + ip + ": " + elem.id);
                                // Check if this host has an HTTP server on the right port
                                var httpServer = elem.getApp("HTTPServer");
                                if (httpServer) {
                                    console.log("HTTPServer found on element " + elem.id);

                                    // Check if the server is enabled
                                    if (!httpServer.enabled) {
                                        console.log("Server is not enabled");
                                        // Store this for user feedback and show error immediately
                                        var errorInfo = {
                                            ip: ip,
                                            port: port,
                                            elementId: elem.id,
                                            elementName: elem.getName ? elem.getName() : 'Server'
                                        };
                                        showServerDisabledError(errorInfo);
                                        return -1; // Special value to indicate server found but disabled
                                    }

                                    // For HTTPS (port 443), check if any domain has HTTPS enabled
                                    if (port === 443) {
                                        // Check domain settings for HTTPS
                                        var domains = httpServer.getDomains ? httpServer.getDomains() : [];
                                        for (var d = 0; d < domains.length; d++) {
                                            var domainName = domains[d][0]; // domains is array of [name, files] pairs
                                            var domainSettings = httpServer.getDomainSettings ? httpServer.getDomainSettings(domainName) : null;
                                            if (domainSettings && domainSettings.protocol === 'https' && domainSettings.port === 443) {
                                                console.log("Server found with HTTPS enabled for domain: " + domainName);
                                                return elem.id;
                                            }
                                        }
                                    }

                                    // For HTTP (port 80) or other ports, just return if server exists
                                    if (port === 80) {
                                        console.log("Server found with HTTP enabled");
                                        return elem.id;
                                    }
                                }
                                // Still return the element ID as fallback
                                return elem.id;
                            }
                        }
                    }
                }
            }
        }
        console.log("No server found for IP: " + ip);
        return null;
    };

    this.receiveMessage = function(message)
    {
        var data = message.getData();
	// console.log("HTTPClient received response: code=" + data.code + ", clearing timeout");

        // Clear the response timeout immediately since we got a response
        if (_self.responseTimeout) {
            clearTimeout(_self.responseTimeout);
            _self.responseTimeout = null;
        }

        // Handle API Explorer responses
        if (_self.apiCallback && data.isAPIResponse) {
            var response = {
                status: data.code,
                statusText: _self.getStatusDescription(data.code),
                headers: data.headers || {},
                body: data.contents || data.body,
                url: data.path || '/',
                method: _self.apiMethod || 'GET'
            };
            _self.apiCallback(response);
            _self.apiCallback = null;
            _self.apiMethod = null;
            return;
        }

        lastCode = data.code;

        // Handle HTTPS encrypted content
        if (data.isEncrypted && data.decryptedContent) {
            // Browser decrypts HTTPS content after SSL/TLS handshake
            lastContent = data.decryptedContent;
            // Store that this was encrypted for educational display
            _self.wasEncrypted = true;
            _self.encryptedSize = data.encryptedView ? data.encryptedView.match(/(\d+) bytes/) : null;
        } else {
            lastContent = data.contents;
            _self.wasEncrypted = false;
        }
        // Store protocol and port info if available
        _self.lastProtocol = data.protocol || 'http';
        _self.lastPort = data.port || 80;
        // Phase 2: Store headers and SSL info
        _self.lastHeaders = data.headers || null;
        _self.lastSSLInfo = data.sslCertificate || null;
        // Store host ID if provided in SSL certificate
        if (data.sslCertificate && data.sslCertificate.hostId) {
            _self.lastHostId = data.sslCertificate.hostId;
        }
        
        // Handle authentication required (401)
        if (lastCode === 401) {
            // If we already have an auth header, it means authentication failed
            if (_self.authHeader) {
                // Clear the failed auth header and reset the flag so user can try again
                _self.authHeader = null;
                _self.authAttempted = false;

                // Show error message in the browser
                lastContent = '<div style="padding: 20px; background-color: #fee; border: 1px solid #f44336; color: #d32f2f;">';
                lastContent += '<h3>🔒 Authentication Failed</h3>';
                lastContent += '<p>The username or password you entered was incorrect.</p>';
                lastContent += '<button onclick="requestHTTPWebSite(\'' + owner.id + '\');" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Try Again</button>';
                lastContent += '</div>';
            } else if (!_self.authAttempted) {
                // First time seeing 401, show auth dialog
                _self.authAttempted = true;
                showAuthenticationDialog(owner.id);
            }
        }
        // Handle redirects (301, 302)
        else if ((lastCode === 301 || lastCode === 302) && data.contents) {
            // Look for Location header in content (simplified)
            var locationMatch = data.contents.match(/Location:\s*([^\s]+)/);
            if (locationMatch && locationMatch[1]) {
                var redirectUrl = locationMatch[1];
                // If it's a relative URL, make it absolute
                if (!redirectUrl.match(/^https?:\/\//)) {
                    redirectUrl = _self.lastProtocol + '://' + data.domain + '/' + redirectUrl;
                }
                // Show redirect notice
                lastContent = '<div style="padding: 10px; background-color: #e3f2fd; border: 1px solid #2196F3;">';
                lastContent += '<strong>↩️ Redirecting to:</strong> ' + redirectUrl + '<br/>';
                lastContent += '<button onclick="document.getElementById(\'httpclienturl\').value=\'' + redirectUrl + '\'; requestHTTPWebSite(\'' + owner.id + '\');">Follow Redirect</button>';
                lastContent += '</div>';
            }
        } else {
            _self.authAttempted = false;
        }
        
        updateBrowser();
    };
    
    // Method to retry request with authentication
    this.retryWithAuth = function(username, password) {
        if (_self.lastRequestURL) {
            // Encode credentials
            var credentials = btoa(username + ':' + password);
            _self.authHeader = 'Basic ' + credentials;
            // Retry the last request
            this.requestHTTPWebSite(_self.lastRequestURL);
        }
    };
    
    this.getAppDescription = function()
    {
        return "";
    };
    
};
