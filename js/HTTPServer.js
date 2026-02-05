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

function editHTTPServerInfo(id)
{
    createBkDiv();
    createHTTPServerInfoDiv1(id);
}

function configureRESTAPI(id)
{
    createBkDiv();

    var host = network.getElement(id);
    var app = host.getApp("HTTPServer");

    var w = new UIWindow('divrestapiconfig', '🎓 REST API Configuration', 750, 600, false, 1.0);

    var configUI = '<div style="height: 100%; display: flex; flex-direction: column; background: #1a1d2e; color: #e4e4e7;">';

    // Header
    configUI += '<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 15px; color: white;">';
    configUI += '<h3 style="margin: 0 0 8px 0;">🎓 Configure REST API Endpoints</h3>';
    configUI += '<p style="margin: 0; font-size: 13px; opacity: 0.9;">Set up custom API endpoints with specific responses for each HTTP method</p>';
    configUI += '</div>';

    // Endpoint list
    configUI += '<div style="flex: 1; overflow: auto; padding: 20px; background: #1a1d2e;">';

    // Add new endpoint section
    configUI += '<div style="background: #2a2d3e; padding: 15px; border-radius: 8px; margin-bottom: 20px;">';
    configUI += '<h4 style="color: #667eea; margin: 0 0 15px 0;">Add New API Endpoint</h4>';

    configUI += '<div style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 10px; margin-bottom: 10px;">';
    configUI += '<input type="text" id="newEndpointPath" placeholder="/api/products" onblur="autoSelectTemplate()" style="padding: 8px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 4px;">';
    configUI += '<select id="newEndpointMethod" onchange="autoSelectTemplate()" style="padding: 8px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 4px;">';
    configUI += '<option value="GET">GET</option>';
    configUI += '<option value="POST">POST</option>';
    configUI += '<option value="PUT">PUT</option>';
    configUI += '<option value="PATCH">PATCH</option>';
    configUI += '<option value="DELETE">DELETE</option>';
    configUI += '<option value="HEAD">HEAD</option>';
    configUI += '<option value="OPTIONS">OPTIONS</option>';
    configUI += '</select>';
    configUI += '<select id="newEndpointStatus" style="padding: 8px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 4px;">';
    configUI += '<option value="200">200 OK</option>';
    configUI += '<option value="201">201 Created</option>';
    configUI += '<option value="204">204 No Content</option>';
    configUI += '<option value="400">400 Bad Request</option>';
    configUI += '<option value="401">401 Unauthorized</option>';
    configUI += '<option value="403">403 Forbidden</option>';
    configUI += '<option value="404">404 Not Found</option>';
    configUI += '<option value="500">500 Server Error</option>';
    configUI += '<option value="503">503 Service Unavailable</option>';
    configUI += '</select>';
    configUI += '<button onclick="addAPIEndpoint(' + id + ')" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">Add</button>';
    configUI += '</div>';

    configUI += '<div style="margin-top: 10px;">';
    configUI += '<label style="display: block; margin-bottom: 5px; font-size: 12px; color: #9ca3af;">Response Body (JSON):</label>';

    // Template buttons
    configUI += '<div style="display: flex; gap: 5px; margin-bottom: 5px;">';
    configUI += '<button onclick="useJSONTemplate(\'list\')" style="padding: 4px 8px; background: #4a5568; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 11px;" title="List of items">📋 List</button>';
    configUI += '<button onclick="useJSONTemplate(\'item\')" style="padding: 4px 8px; background: #4a5568; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 11px;" title="Single item">📄 Item</button>';
    configUI += '<button onclick="useJSONTemplate(\'created\')" style="padding: 4px 8px; background: #4a5568; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 11px;" title="Created response">✅ Created</button>';
    configUI += '<button onclick="useJSONTemplate(\'error\')" style="padding: 4px 8px; background: #4a5568; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 11px;" title="Error response">⚠️ Error</button>';
    configUI += '<button onclick="useJSONTemplate(\'deleted\')" style="padding: 4px 8px; background: #4a5568; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 11px;" title="Deleted response">🗑️ Deleted</button>';
    configUI += '<button onclick="useJSONTemplate(\'auth\')" style="padding: 4px 8px; background: #4a5568; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 11px;" title="Auth token">🔑 Auth</button>';
    configUI += '<button onclick="useJSONTemplate(\'paginated\')" style="padding: 4px 8px; background: #4a5568; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 11px;" title="Paginated list">📖 Paged</button>';
    configUI += '</div>';

    configUI += '<textarea id="newEndpointResponse" style="width: 100%; height: 100px; padding: 8px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 4px; font-family: monospace; font-size: 12px;" placeholder=\'{"message": "Success", "data": []}\'></textarea>';
    configUI += '</div>';
    configUI += '</div>';

    // Existing endpoints
    configUI += '<div style="background: #2a2d3e; padding: 15px; border-radius: 8px;">';
    configUI += '<h4 style="color: #667eea; margin: 0 0 15px 0;">Configured Endpoints</h4>';
    configUI += '<div id="endpointList">';
    configUI += app.getAPIEndpointsList();
    configUI += '</div>';
    configUI += '</div>';

    configUI += '</div>';

    configUI += '</div>';

    w.setContent(configUI);
    w.setControls('<button onclick="saveRESTAPIConfig(' + id + ');" style="padding: 6px 12px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Save</button><button onclick="closeRESTAPIConfig();" style="padding: 6px 12px; background: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>');
    w.render();
}

function addAPIEndpoint(hostId) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");

    var path = document.getElementById('newEndpointPath').value.trim();
    var method = document.getElementById('newEndpointMethod').value;
    var status = parseInt(document.getElementById('newEndpointStatus').value);
    var response = document.getElementById('newEndpointResponse').value.trim();

    if (!path) {
        alert('Please enter an endpoint path');
        return;
    }

    // Validate JSON if provided
    if (response) {
        try {
            JSON.parse(response);
        } catch(e) {
            alert('Invalid JSON in response body');
            return;
        }
    }

    app.addAPIEndpoint(path, method, status, response);

    // Clear inputs
    document.getElementById('newEndpointPath').value = '';
    document.getElementById('newEndpointResponse').value = '';

    // Refresh list
    document.getElementById('endpointList').innerHTML = app.getAPIEndpointsList();
}

function removeAPIEndpoint(hostId, path, method) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");

    app.removeAPIEndpoint(path, method);

    // Refresh list
    document.getElementById('endpointList').innerHTML = app.getAPIEndpointsList();
}

function saveRESTAPIConfig(hostId) {
    closeRESTAPIConfig();
}

function closeRESTAPIConfig() {
    removeBodyDiv('divbk');
    var window = uimanager.getWindow('divrestapiconfig');
    if (window) {
        window.dispose();
    }
}

// JSON template function for API responses
function useJSONTemplate(type) {
    var textarea = document.getElementById('newEndpointResponse');
    if (!textarea) return;

    var templates = {
        'list': {
            "success": true,
            "data": [
                {
                    "id": 1,
                    "name": "Item 1",
                    "description": "First item description",
                    "price": 19.99,
                    "category": "electronics",
                    "inStock": true
                },
                {
                    "id": 2,
                    "name": "Item 2",
                    "description": "Second item description",
                    "price": 29.99,
                    "category": "electronics",
                    "inStock": false
                }
            ],
            "total": 2,
            "page": 1,
            "pageSize": 10
        },
        'item': {
            "success": true,
            "data": {
                "id": 1,
                "name": "Sample Item",
                "description": "This is a sample item",
                "price": 99.99,
                "category": "electronics",
                "inStock": true,
                "createdAt": "2024-01-01T10:00:00Z",
                "updatedAt": "2024-01-15T14:30:00Z"
            }
        },
        'created': {
            "success": true,
            "message": "Resource created successfully",
            "data": {
                "id": 123,
                "name": "New Item",
                "createdAt": new Date().toISOString()
            }
        },
        'error': {
            "success": false,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "The request data is invalid",
                "details": [
                    "Field 'name' is required",
                    "Field 'email' must be a valid email address"
                ]
            }
        },
        'deleted': {
            "success": true,
            "message": "Resource deleted successfully",
            "deletedId": 123
        },
        'auth': {
            "success": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
            "user": {
                "id": 1,
                "username": "johndoe",
                "email": "john@example.com",
                "role": "user"
            },
            "expiresIn": 3600
        },
        'paginated': {
            "success": true,
            "data": [
                {"id": 1, "name": "Item 1"},
                {"id": 2, "name": "Item 2"},
                {"id": 3, "name": "Item 3"}
            ],
            "pagination": {
                "page": 1,
                "pageSize": 10,
                "totalPages": 5,
                "totalItems": 47,
                "hasNext": true,
                "hasPrevious": false
            }
        }
    };

    var template = templates[type];
    if (template) {
        textarea.value = JSON.stringify(template, null, 2);
    }
}

// Auto-select template based on method and path
function autoSelectTemplate() {
    var method = document.getElementById('newEndpointMethod').value;
    var path = document.getElementById('newEndpointPath').value.toLowerCase();

    // Auto-select appropriate template based on method
    if (method === 'GET') {
        if (path.includes('/users') || path.includes('/products') || path.includes('/items')) {
            if (path.match(/\/\d+$/) || path.includes('/{id}')) {
                useJSONTemplate('item');
            } else {
                useJSONTemplate('list');
            }
        } else {
            useJSONTemplate('list');
        }
    } else if (method === 'POST') {
        if (path.includes('/auth') || path.includes('/login')) {
            useJSONTemplate('auth');
        } else {
            useJSONTemplate('created');
        }
    } else if (method === 'DELETE') {
        useJSONTemplate('deleted');
    } else if (method === 'PUT' || method === 'PATCH') {
        useJSONTemplate('item');
    }
}

function createHTTPServerInfoDiv1(id)
{
    var host = network.getElement(id);
    var app = host.getApp("HTTPServer");

    var headers = [_("Domain")];
    var data = app.getAppControllerData1();
    var uihttptable = new UITable(headers, data, 'httptable');
    uihttptable.setSecondary(true, "editDomainHTTPServerInfo");
    uihttptable.setParam("hostid", id);

    // Store a reference to the UITable globally so we can intercept adds
    window.httpServerUITable = uihttptable;
    window.httpServerHostId = id;

    var controls = '<input type="button" id="upload" value="'+_("Save")+'" onclick="saveHTTPServerData1(' + id + ',\'' + uihttptable.getId() + '\');" />\
  <input type="button" id="cancel" value="'+_("Cancel")+'" onclick="cancelHTTPServerData1(\'' + uihttptable.getId() + '\');" />';
    var w = new UIWindow('divhttpserverinfo', 'HTTP Server Configuration', 500, 500, false, 1.0);
    w.setContent(app.getAppController1());
    w.setControls(controls);
    w.render();
    uihttptable.render();
}

function createHTTPServerInfoDiv1back(id, uitableid) 
{
    var host = network.getElement(id);
    var app = host.getApp("HTTPServer");
    /*var div = document.createElement("div");
    var l = document.body.clientWidth / 2 - 200;
    var t = document.body.clientHeight / 2 - 200;*/
    
    var primaryuitableid = uitables[uitableid].getParam("primaryuitableid");
    var headers = [_("Domain")];
    var data = uitables[primaryuitableid].getData();
    var uihttptable = uitables[primaryuitableid];
    
    /*div.setAttribute('style', 'position:absolute;top:' + t + 'px;left:' + l + 'px;z-index:110;background-color:white;width:400px;height:400px;border-radius:10px;border:1px solid;padding:10px;text-align:center;overflow-y:scroll;');
    div.setAttribute('id', 'divhttpserverinfo');
    div.innerHTML = app.getAppController1();
    div.innerHTML += '<p>\
  <input type="button" id="upload" value="Save" onclick="saveHTTPServerData1(' + id + ',\'' + uihttptable.getId() + '\');" />\
  <input type="button" id="cancel" value="Cancel" onclick="cancelHTTPServerData1(\'' + uihttptable.getId() + '\');" />\
  </p>';*/
    var controls = '<input type="button" id="upload" value="'+_("Save")+'" onclick="saveHTTPServerData1(' + id + ',\'' + uihttptable.getId() + '\');" />\
  <input type="button" id="cancel" value="'+_("Cancel")+'" onclick="cancelHTTPServerData1(\'' + uihttptable.getId() + '\');" />';
    var w = new UIWindow('divhttpserverinfo', 'HTTP Server', 400, 400, false, 1.0);
    w.setContent(app.getAppController1());
    w.setControls(controls);
    w.render();
    uihttptable.render();
}

function createHTTPServerInfoDiv2(id, primaryuitableid, filedata) 
{
    var host = network.getElement(id);
    var app = host.getApp("HTTPServer");
    
    var headers = [_("File")];
    var data = filedata;
    var uihttpfiletable = new UITable(headers, data, 'httpfiletable');
    uihttpfiletable.setSecondary(true, "editFileHTTPServerInfo");
    uihttpfiletable.setParam("hostid", id);
    uihttpfiletable.setParam("primaryuitableid", primaryuitableid);
    // Get the primary row from the primary table
    var primaryRow = uitables[primaryuitableid].getParam("currentRow") || 0;
    uihttpfiletable.setParam("primaryrow", primaryRow);
    
    /*div.setAttribute('style', 'position:absolute;top:' + t + 'px;left:' + l + 'px;z-index:110;background-color:white;width:400px;height:400px;border-radius:10px;border:1px solid;padding:10px;text-align:center;overflow-y:scroll;');
    div.setAttribute('id', 'divhttpfileserverinfo');
    div.innerHTML = app.getAppController2();*/
    var controls = '<input type="button" id="upload" value="'+_("Back")+'" onclick="backHTTPServerData2(' + id + ',\'' + uihttpfiletable.getId() + '\');" />';
    var w = new UIWindow('divhttpfileserverinfo', 'HTTP Domain Files', 400, 400, false, 1.0);
    w.setContent(app.getAppController2());
    w.setControls(controls);
    w.render();
    uihttpfiletable.render();
}

function createHTTPServerInfoDiv3(id, secondarytableid, row) 
{
    var secondarydata = uitables[secondarytableid].getData();
    var contents = secondarydata[row][1];
    var filename = secondarydata[row][0];
    var primaryuitableid = uitables[secondarytableid].getParam("primaryuitableid");
    var primarydata = uitables[primaryuitableid].getData();
    var primaryRow = uitables[secondarytableid].getParam("primaryrow");
    var domain = primarydata[primaryRow][0];
    
    var host = network.getElement(id);
    var app = host.getApp("HTTPServer");
    
    var controls = '<input type="button" id="upload" value="'+_("Back")+'" onclick="backHTTPServerData3(' + id + ',\'' + secondarytableid + '\',' + row + ');" />';
    var w = new UIWindow('divhttpcontentsserverinfo', 'HTTP File Configuration: ' + filename, 500, 450, false, 1.0);
    w.setContent(app.getAppController3(contents, domain, filename));
    w.setControls(controls);
    w.render();
}

function backHTTPServerData3(id, secondarytableid, row) 
{
    var secondarydata = uitables[secondarytableid].getData();
    var contents = document.getElementById("httpcontents").value;
    var statusCode = document.getElementById("fileStatusCode") ? document.getElementById("fileStatusCode").value : 200;
    
    secondarydata[row][1] = contents;
    // Store status code in array for later saving
    if (!secondarydata[row][2]) {
        secondarydata[row][2] = {};
    }
    secondarydata[row][2].statusCode = parseInt(statusCode);
    
    uimanager.getWindow("divhttpcontentsserverinfo").dispose();
    var primaryuitableid = uitables[secondarytableid].getParam("primaryuitableid");
    createHTTPServerInfoDiv2(id, primaryuitableid, secondarydata);
}

function editFileHTTPServerInfo(secondarytableid, row) 
{
    var id = uitables[secondarytableid].getParam("hostid");
    var secondarydata = uitables[secondarytableid].getData();
    if (secondarydata[row].length == 1) 
    {
        secondarydata[row][1] = "";
    }
    //removeBodyDiv('divhttpfileserverinfo');
    uimanager.getWindow("divhttpfileserverinfo").dispose();
    createHTTPServerInfoDiv3(id, secondarytableid, row);
}

function editDomainHTTPServerInfo(primaryuitableid, row)
{
    var id = uitables[primaryuitableid].getParam("hostid");
    var primarydata = uitables[primaryuitableid].getData();
    if (primarydata[row].length == 1)
    {
        primarydata[row][1] = [];
    }
    var domain = primarydata[row][0];
    var filedata = primarydata[row][1];
    // Store the primary row for later use
    uitables[primaryuitableid].setParam("currentRow", row);
    uimanager.getWindow("divhttpserverinfo").dispose();
    createDomainConfigurationWindow(id, primaryuitableid, row, domain, filedata);
}

// New tabbed configuration window for per-domain settings
function createDomainConfigurationWindow(hostId, primaryuitableid, row, domain, filedata) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");

    // Get current domain settings
    var domainSettings = app.getDomainSettings(domain);
    var certificate = app.getDomainCertificate(domain);

    var content = '<div style="background: #1a1d2e; color: #e4e4e7; height: 100%; display: flex; flex-direction: column;">';

    // Domain header
    content += '<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 15px; color: white;">';
    content += '<h3 style="margin: 0;">Virtual Host: ' + domain + '</h3>';
    content += '</div>';

    // Tabs
    content += '<div style="background: #2a2d3e; padding: 10px; border-bottom: 1px solid #3a3d4e;">';
    content += '<button id="tab-general" class="domain-tab active" onclick="switchDomainTab(\'general\')" style="padding: 8px 16px; margin-right: 5px; background: #667eea; color: white; border: none; border-radius: 4px 4px 0 0; cursor: pointer;">General</button>';
    content += '<button id="tab-certificate" class="domain-tab" onclick="switchDomainTab(\'certificate\')" style="padding: 8px 16px; margin-right: 5px; background: #3a3d4e; color: #e4e4e7; border: none; border-radius: 4px 4px 0 0; cursor: pointer;">Certificate</button>';
    content += '<button id="tab-files" class="domain-tab" onclick="switchDomainTab(\'files\')" style="padding: 8px 16px; background: #3a3d4e; color: #e4e4e7; border: none; border-radius: 4px 4px 0 0; cursor: pointer;">Files</button>';
    content += '</div>';

    // Tab content container
    content += '<div style="flex: 1; overflow-y: auto; padding: 20px;">';

    // General tab
    content += '<div id="tab-content-general" class="tab-content" style="display: block;">';
    content += '<fieldset style="margin-bottom: 15px; padding: 15px; border: 1px solid #3a3d4e; border-radius: 5px; background: #2a2d3e;">';
    content += '<legend style="color: #667eea; font-weight: bold;">Protocol & Port Configuration</legend>';

    // Protocol selection
    content += '<div style="margin-bottom: 10px;">';
    content += '<label style="display: inline-block; width: 120px;">Protocol:</label>';
    content += '<select id="domainProtocol" onchange="updateDomainProtocolPort(\'' + hostId + '\', \'' + domain + '\')" style="padding: 5px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;">';
    content += '<option value="http"' + (domainSettings.protocol !== 'https' ? ' selected' : '') + '>HTTP</option>';
    content += '<option value="https"' + (domainSettings.protocol === 'https' ? ' selected' : '') + '>HTTPS</option>';
    content += '</select>';
    content += '</div>';

    // Port configuration
    content += '<div style="margin-bottom: 10px;">';
    content += '<label style="display: inline-block; width: 120px;">Port:</label>';
    content += '<input type="number" id="domainPort" value="' + (domainSettings.port || (domainSettings.protocol === 'https' ? 443 : 80)) + '" style="width: 100px; padding: 5px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;">';
    content += '</div>';

    // Server status
    content += '<div style="margin-bottom: 10px;">';
    content += '<label style="display: inline-block; width: 120px;">Status:</label>';
    var status = app.enabled ? 'Running' : 'Stopped';
    var statusColor = app.enabled ? '#4caf50' : '#f44336';
    content += '<span style="color: ' + statusColor + '; font-weight: bold;">' + status + '</span>';
    content += '</div>';

    content += '</fieldset>';
    content += '</div>';

    // Certificate tab
    content += '<div id="tab-content-certificate" class="tab-content" style="display: none;">';
    content += '<fieldset style="margin-bottom: 15px; padding: 15px; border: 1px solid #3a3d4e; border-radius: 5px; background: #2a2d3e;">';
    content += '<legend style="color: #667eea; font-weight: bold;">SSL/TLS Certificate Configuration</legend>';

    // Certificate subject
    content += '<div style="margin-bottom: 10px;">';
    content += '<label style="display: inline-block; width: 140px;">Subject (CN):</label>';
    content += '<input type="text" id="certSubject" value="' + (certificate.subject || domain) + '" style="width: 250px; padding: 5px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;">';
    content += '</div>';

    // Certificate issuer
    content += '<div style="margin-bottom: 10px;">';
    content += '<label style="display: inline-block; width: 140px;">Issuer:</label>';
    content += '<select id="certIssuer" onchange="toggleDomainCertIssuer(\'' + domain + '\')" style="padding: 5px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;">';
    content += '<option value="self"' + (certificate.selfSigned ? ' selected' : '') + '>Self-Signed</option>';
    content += '<option value="ca"' + (!certificate.selfSigned ? ' selected' : '') + '>Certificate Authority</option>';
    content += '</select>';
    content += '</div>';

    // CA name (if CA selected)
    content += '<div id="caNameDiv" style="margin-bottom: 10px; ' + (certificate.selfSigned ? 'display: none;' : '') + '">';
    content += '<label style="display: inline-block; width: 140px;">CA Name:</label>';
    content += '<input type="text" id="caName" value="' + (!certificate.selfSigned ? certificate.issuer : 'DigiCert Global Root CA') + '" style="width: 250px; padding: 5px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;">';
    content += '</div>';

    // Certificate info
    content += '<div style="margin-top: 15px; padding: 10px; background: #1a1d2e; border-radius: 5px;">';
    content += '<div style="color: #667eea; font-weight: bold; margin-bottom: 10px;">Certificate Information:</div>';
    content += '<div style="font-family: monospace; font-size: 12px; line-height: 1.5;">';
    content += 'Subject: CN=' + (certificate.subject || domain) + '<br>';
    content += 'Issuer: ' + (certificate.selfSigned ? 'CN=' + (certificate.subject || domain) : certificate.issuer) + '<br>';
    content += 'Valid From: ' + new Date().toISOString().split('T')[0] + '<br>';
    content += 'Valid To: ' + new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + '<br>';
    content += 'Fingerprint: SHA256:' + btoa(domain).substr(0, 32).toUpperCase() + '...';
    content += '</div>';
    content += '</div>';

    content += '</fieldset>';
    content += '</div>';

    // Files tab
    content += '<div id="tab-content-files" class="tab-content" style="display: none;">';
    content += '<fieldset style="margin-bottom: 15px; padding: 15px; border: 1px solid #3a3d4e; border-radius: 5px; background: #2a2d3e;">';
    content += '<legend style="color: #667eea; font-weight: bold;">Domain Files</legend>';
    content += '<div id="domainFilesTable"></div>';
    content += '</fieldset>';
    content += '</div>';

    content += '</div>'; // End tab content container
    content += '</div>'; // End main container

    // Create window
    var controls = '<input type="button" value="Save" onclick="saveDomainConfiguration(\'' + hostId + '\', \'' + domain + '\', \'' + primaryuitableid + '\', ' + row + ');" style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">';
    controls += '<input type="button" value="Cancel" onclick="cancelDomainConfiguration(\'' + primaryuitableid + '\');" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">';

    var w = new UIWindow('divdomainconfig', 'Virtual Host Configuration: ' + domain, 600, 550, false, 1.0);
    w.setContent(content);
    w.setControls(controls);
    w.render();

    // Initialize files table
    initializeDomainFilesTable(hostId, domain, filedata);
}

// Toggle HTTP Server on/off
function toggleHTTPServer(hostId, enable) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");

    if (enable) {
        app.enable();
        // If no domains exist, add a default one
        if (Object.keys(app.getDomains()).length === 0) {
            app.addDomain('localhost');
            app.setFileContents('localhost', '/index.html', '<html><body><h1>Welcome to NetworkSimulator HTTP Server</h1></body></html>');
        }
    } else {
        app.disable();
    }

    // Update the content of the existing window instead of creating a new one
    var window = uimanager.getWindow("divhttpserverinfo");
    if (window) {
        // Get current scroll position of the content div
        var contentDiv = document.getElementById("divhttpserverinfo_contents");
        var scrollTop = contentDiv ? contentDiv.scrollTop : 0;

        // Update the content
        window.setContent(app.getAppController1());

        // Get the UITable and re-render it
        var tableId = 'httptable';
        if (uitables[tableId]) {
            uitables[tableId].render();
        } else {
            // If the table doesn't exist, create it
            var headers = [_("Domain")];
            var data = app.getAppControllerData1();
            var uihttptable = new UITable(headers, data, tableId);
            uihttptable.setSecondary(true, "editDomainHTTPServerInfo");
            uihttptable.setParam("hostid", hostId);
            uihttptable.render();
        }

        // Restore scroll position
        setTimeout(function() {
            var contentDiv = document.getElementById("divhttpserverinfo_contents");
            if (contentDiv) {
                contentDiv.scrollTop = scrollTop;
            }
        }, 10);
    }
}

// Tab switching function
function switchDomainTab(tab) {
    // Hide all tabs
    var tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(function(t) {
        t.style.display = 'none';
    });

    // Remove active class from all buttons
    var buttons = document.querySelectorAll('.domain-tab');
    buttons.forEach(function(b) {
        b.style.background = '#3a3d4e';
        b.style.color = '#e4e4e7';
    });

    // Show selected tab
    document.getElementById('tab-content-' + tab).style.display = 'block';

    // Highlight active button
    var activeBtn = document.getElementById('tab-' + tab);
    activeBtn.style.background = '#667eea';
    activeBtn.style.color = 'white';
}

// Add a new file to domain
function addDomainFile(hostId, domain) {
    createBkDiv();

    var content = '<div style="background: #1a1d2e; color: #e4e4e7; height: 100%; display: flex; flex-direction: column;">';

    // Header
    content += '<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 15px; color: white;">';
    content += '<h3 style="margin: 0;">Add New File to ' + domain + '</h3>';
    content += '</div>';

    // Form content
    content += '<div style="flex: 1; overflow-y: auto; padding: 20px;">';

    content += '<div style="margin-bottom: 20px;">';
    content += '<label style="display: block; margin-bottom: 5px; color: #667eea; font-weight: bold;">File Path:</label>';
    content += '<input type="text" id="newFilePath" placeholder="/index.html, /css/style.css, /api/data.json" style="width: 100%; padding: 8px; background: #2a2d3e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 4px;">';
    content += '<small style="color: #999;">Enter the file path starting with /</small>';
    content += '</div>';

    content += '<div style="margin-bottom: 20px;">';
    content += '<label style="display: block; margin-bottom: 5px; color: #667eea; font-weight: bold;">File Type:</label>';
    content += '<select id="fileTypeSelect" onchange="updateDefaultContent(\'' + domain + '\')" style="width: 100%; padding: 8px; background: #2a2d3e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 4px;">';
    content += '<option value="html">HTML Page</option>';
    content += '<option value="css">CSS Stylesheet</option>';
    content += '<option value="js">JavaScript</option>';
    content += '<option value="json">JSON Data</option>';
    content += '<option value="xml">XML Document</option>';
    content += '<option value="txt">Plain Text</option>';
    content += '<option value="custom">Custom</option>';
    content += '</select>';
    content += '</div>';

    content += '<div style="margin-bottom: 20px;">';
    content += '<label style="display: block; margin-bottom: 5px; color: #667eea; font-weight: bold;">File Content:</label>';
    content += '<textarea id="newFileContent" style="width: 100%; height: 300px; padding: 8px; background: #2a2d3e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 4px; font-family: monospace; font-size: 13px;">';
    content += '<!DOCTYPE html>\n<html>\n<head>\n    <title>' + domain + '</title>\n</head>\n<body>\n    <h1>Welcome to ' + domain + '</h1>\n</body>\n</html>';
    content += '</textarea>';
    content += '</div>';

    content += '</div>';
    content += '</div>';

    var controls = '<button onclick="saveNewDomainFile(\'' + hostId + '\', \'' + domain + '\')" style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Create File</button>';
    controls += '<button onclick="cancelNewDomainFile()" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>';

    var w = new UIWindow('divnewfile', 'Add New File', 600, 550, false, 1.0);
    w.setContent(content);
    w.setControls(controls);
    w.render();
}

// Edit a domain file
function editDomainFile(hostId, domain, index) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");
    var files = app.getFilesForDomain(domain);

    if (files && files[index]) {
        var filename = files[index][0];
        var currentContent = files[index][1] || '';

        createBkDiv();

        var content = '<div style="background: #1a1d2e; color: #e4e4e7; height: 100%; display: flex; flex-direction: column;">';

        // Header
        content += '<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 15px; color: white;">';
        content += '<h3 style="margin: 0;">Edit File: ' + filename + '</h3>';
        content += '<div style="font-size: 12px; opacity: 0.9; margin-top: 5px;">Domain: ' + domain + '</div>';
        content += '</div>';

        // Form content
        content += '<div style="flex: 1; overflow-y: auto; padding: 20px;">';

        content += '<div style="margin-bottom: 20px;">';
        content += '<label style="display: block; margin-bottom: 5px; color: #667eea; font-weight: bold;">File Path:</label>';
        content += '<input type="text" id="editFilePath" value="' + filename + '" readonly style="width: 100%; padding: 8px; background: #1a1d2e; color: #999; border: 1px solid #3a3d4e; border-radius: 4px;">';
        content += '</div>';

        content += '<div style="margin-bottom: 20px;">';
        content += '<label style="display: block; margin-bottom: 5px; color: #667eea; font-weight: bold;">File Content:</label>';
        content += '<textarea id="editFileContent" style="width: 100%; height: 350px; padding: 8px; background: #2a2d3e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 4px; font-family: monospace; font-size: 13px; white-space: pre;">';
        content += escapeHtml(currentContent);
        content += '</textarea>';
        content += '</div>';

        // File info
        content += '<div style="padding: 10px; background: #2a2d3e; border-radius: 4px; font-size: 12px; color: #999;">';
        content += '<strong>File Size:</strong> ' + currentContent.length + ' bytes | ';
        content += '<strong>Lines:</strong> ' + currentContent.split('\n').length;
        content += '</div>';

        content += '</div>';
        content += '</div>';

        var controls = '<button onclick="saveEditedDomainFile(\'' + hostId + '\', \'' + domain + '\', ' + index + ')" style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Save Changes</button>';
        controls += '<button onclick="cancelEditDomainFile()" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>';

        var w = new UIWindow('diveditfile', 'Edit File', 650, 600, false, 1.0);
        w.setContent(content);
        w.setControls(controls);
        w.render();
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update default content based on file type
function updateDefaultContent(domain) {
    var fileType = document.getElementById('fileTypeSelect').value;
    var contentArea = document.getElementById('newFileContent');

    var templates = {
        'html': '<!DOCTYPE html>\n<html>\n<head>\n    <title>' + domain + '</title>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>\n<body>\n    <h1>Welcome to ' + domain + '</h1>\n    <p>This is a new HTML page.</p>\n</body>\n</html>',
        'css': '/* Stylesheet for ' + domain + ' */\n\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    color: #333;\n}\n\nh1 {\n    color: #667eea;\n}',
        'js': '// JavaScript for ' + domain + '\n\n(function() {\n    \'use strict\';\n    \n    console.log(\'Welcome to ' + domain + '\');\n    \n    // Your code here\n    \n})();',
        'json': '{\n    "name": "' + domain + '",\n    "version": "1.0.0",\n    "description": "Configuration for ' + domain + '",\n    "data": []\n}',
        'xml': '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n    <title>' + domain + '</title>\n    <content>XML content here</content>\n</root>',
        'txt': 'This is a text file for ' + domain + '\n\nAdd your content here.',
        'custom': '// Custom file content'
    };

    if (templates[fileType]) {
        contentArea.value = templates[fileType];
    }
}

// Save new file
function saveNewDomainFile(hostId, domain) {
    var filename = document.getElementById('newFilePath').value.trim();
    var content = document.getElementById('newFileContent').value;

    if (!filename) {
        alert('Please enter a file path');
        return;
    }

    // Ensure filename starts with /
    if (!filename.startsWith('/')) {
        filename = '/' + filename;
    }

    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");
    app.setFileContents(domain, filename, content);

    // Close modal and refresh
    cancelNewDomainFile();

    // Refresh the parent window's file list
    var filedata = app.getFilesForDomain(domain);
    initializeDomainFilesTable(hostId, domain, filedata);
}

// Cancel new file
function cancelNewDomainFile() {
    removeBodyDiv('divbk');
    var w = uimanager.getWindow('divnewfile');
    if (w) {
        w.dispose();
    }
}

// Save edited file
function saveEditedDomainFile(hostId, domain, index) {
    var content = document.getElementById('editFileContent').value;

    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");
    var files = app.getFilesForDomain(domain);

    if (files && files[index]) {
        var filename = files[index][0];
        app.setFileContents(domain, filename, content);

        // Close modal and refresh
        cancelEditDomainFile();

        // Refresh the parent window's file list
        var filedata = app.getFilesForDomain(domain);
        initializeDomainFilesTable(hostId, domain, filedata);
    }
}

// Cancel edit file
function cancelEditDomainFile() {
    removeBodyDiv('divbk');
    var w = uimanager.getWindow('diveditfile');
    if (w) {
        w.dispose();
    }
}

// Delete a domain file
function deleteDomainFile(hostId, domain, index) {
    if (confirm('Are you sure you want to delete this file?')) {
        var host = network.getElement(hostId);
        var app = host.getApp("HTTPServer");
        var files = app.getFilesForDomain(domain);

        if (files && files[index]) {
            var filename = files[index][0];
            app.removeFile(domain, filename);
            // Refresh the files table
            var filedata = app.getFilesForDomain(domain);
            initializeDomainFilesTable(hostId, domain, filedata);
        }
    }
}

// Initialize domain files table
function initializeDomainFilesTable(hostId, domain, filedata) {
    var tableHtml = '<table style="width: 100%; background: #1a1d2e; border-collapse: collapse;">';
    tableHtml += '<thead><tr>';
    tableHtml += '<th style="padding: 10px; text-align: left; border-bottom: 1px solid #3a3d4e;">File Path</th>';
    tableHtml += '<th style="padding: 10px; text-align: center; border-bottom: 1px solid #3a3d4e;">Actions</th>';
    tableHtml += '</tr></thead><tbody>';

    if (filedata && filedata.length > 0) {
        filedata.forEach(function(file, index) {
            tableHtml += '<tr>';
            tableHtml += '<td style="padding: 10px; border-bottom: 1px solid #3a3d4e;">' + file[0] + '</td>';
            tableHtml += '<td style="padding: 10px; border-bottom: 1px solid #3a3d4e; text-align: center;">';
            tableHtml += '<button onclick="editDomainFile(\'' + hostId + '\', \'' + domain + '\', ' + index + ')" style="padding: 4px 8px; background: #667eea; color: white; border: none; border-radius: 3px; cursor: pointer; margin-right: 5px;">Edit</button>';
            tableHtml += '<button onclick="deleteDomainFile(\'' + hostId + '\', \'' + domain + '\', ' + index + ')" style="padding: 4px 8px; background: #f44336; color: white; border: none; border-radius: 3px; cursor: pointer;">Delete</button>';
            tableHtml += '</td></tr>';
        });
    } else {
        tableHtml += '<tr><td colspan="2" style="padding: 20px; text-align: center; color: #999;">No files configured</td></tr>';
    }

    tableHtml += '</tbody></table>';

    // Add new file button
    tableHtml += '<div style="margin-top: 15px;">';
    tableHtml += '<button onclick="addDomainFile(\'' + hostId + '\', \'' + domain + '\')" style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">Add File</button>';
    tableHtml += '</div>';

    document.getElementById('domainFilesTable').innerHTML = tableHtml;
}

// Update domain protocol and port
function updateDomainProtocolPort(hostId, domain) {
    var protocol = document.getElementById('domainProtocol').value;
    var portInput = document.getElementById('domainPort');

    // Auto-update port if switching protocols
    if (protocol === 'https' && portInput.value === '80') {
        portInput.value = '443';
    } else if (protocol === 'http' && portInput.value === '443') {
        portInput.value = '80';
    }
}

// Toggle certificate issuer for domain
function toggleDomainCertIssuer(domain) {
    var issuer = document.getElementById('certIssuer').value;
    var caDiv = document.getElementById('caNameDiv');

    if (issuer === 'ca') {
        caDiv.style.display = 'block';
    } else {
        caDiv.style.display = 'none';
    }
}

// Save domain configuration
function saveDomainConfiguration(hostId, domain, primaryuitableid, row) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");

    // Save protocol and port settings
    var protocol = document.getElementById('domainProtocol').value;
    var port = parseInt(document.getElementById('domainPort').value);
    app.updateDomainSettings(domain, protocol, port);

    // Save certificate settings
    var subject = document.getElementById('certSubject').value;
    var issuerType = document.getElementById('certIssuer').value;
    var selfSigned = issuerType === 'self';
    var issuer = selfSigned ? subject : document.getElementById('caName').value;

    app.updateDomainCertificate(domain, selfSigned, issuer, subject);

    // Update the UITable data with the current file information
    if (uitables[primaryuitableid]) {
        var primarydata = uitables[primaryuitableid].getData();
        // Get the current files from the HTTPServer
        var currentFiles = app.getFilesForDomain(domain);
        // Update the row data with the current files
        primarydata[row] = [domain, currentFiles];
    }

    // Close window and return to domain list
    uimanager.getWindow('divdomainconfig').dispose();
    // Reopen the HTTP server configuration without creating new background
    createHTTPServerInfoDiv1(hostId);
}

// Cancel domain configuration
function cancelDomainConfiguration(primaryuitableid) {
    uimanager.getWindow('divdomainconfig').dispose();
    // Get host ID from the UITable if it exists
    if (uitables[primaryuitableid] && uitables[primaryuitableid].getParam) {
        var hostId = uitables[primaryuitableid].getParam("hostid");
        createHTTPServerInfoDiv1(hostId);  // Don't create new background
    }
}

// Helper function for protocol switching
function updateProtocolPort(hostId) {
    var protocol = document.getElementById("httpProtocol").value;
    var portInput = document.getElementById("httpPort");
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");
    var config = app.getConfig();

    if (protocol === 'https' && portInput.value === '80') {
        portInput.value = '443';
    } else if (protocol === 'http' && portInput.value === '443') {
        portInput.value = '80';
    }

    // Dynamically show/hide certificate configuration
    var existingCertConfig = document.getElementById("sslCertConfig");

    if (protocol === 'https') {
        // If certificate config doesn't exist, create it dynamically
        if (!existingCertConfig) {
            var certConfigHTML = '<div id="sslCertConfig" style="margin-top: 15px; padding: 10px; background: #1e2a3e; border: 1px solid #2e3a4e; border-radius: 5px;">';
            certConfigHTML += '<h4 style="margin-top: 0; color: #667eea;">🔐 SSL Certificate Configuration</h4>';

            // Certificate Subject (Common Name)
            certConfigHTML += '<div style="margin-bottom: 10px;">';
            certConfigHTML += '<label style="display: inline-block; width: 120px; color: #9ca3af;">Common Name:</label>';
            certConfigHTML += '<input type="text" id="certSubject" value="' + (config.sslCertificate.subject || 'localhost') + '" placeholder="e.g., www.example.com" style="width: 200px; padding: 4px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;" />';
            certConfigHTML += ' <span style="color: #6b7280; font-size: 0.85em;">(Domain name)</span>';
            certConfigHTML += '</div>';

            // Certificate Type
            certConfigHTML += '<div style="margin-bottom: 10px;">';
            certConfigHTML += '<label style="display: inline-block; width: 120px; color: #9ca3af;">Certificate Type:</label>';
            certConfigHTML += '<select id="certType" onchange="toggleCertificateIssuer(' + hostId + ')" style="padding: 4px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;">';
            certConfigHTML += '<option value="self-signed"' + (config.sslCertificate.selfSigned ? ' selected' : '') + '>Self-Signed</option>';
            certConfigHTML += '<option value="ca-signed"' + (!config.sslCertificate.selfSigned ? ' selected' : '') + '>CA-Signed</option>';
            certConfigHTML += '</select>';

            if (config.sslCertificate.selfSigned) {
                certConfigHTML += ' <span style="color: #fbbf24; margin-left: 10px; font-size: 0.85em;">⚠️ Will show browser warning</span>';
            } else {
                certConfigHTML += ' <span style="color: #4ade80; margin-left: 10px; font-size: 0.85em;">✅ Trusted by browsers</span>';
            }
            certConfigHTML += '</div>';

            // Certificate Issuer
            certConfigHTML += '<div style="margin-bottom: 10px;">';
            certConfigHTML += '<label style="display: inline-block; width: 120px; color: #9ca3af;">Issuer:</label>';
            certConfigHTML += '<input type="text" id="certIssuer" value="' + config.sslCertificate.issuer + '" ' +
                (config.sslCertificate.selfSigned ? 'readonly style="width: 200px; padding: 4px; background: #0a0d1e; color: #6b7280; border: 1px solid #2a2d3e; border-radius: 3px;"' :
                'style="width: 200px; padding: 4px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;"') + ' />';
            certConfigHTML += '</div>';

            // Validity Period
            certConfigHTML += '<div style="margin-bottom: 10px;">';
            certConfigHTML += '<label style="display: inline-block; width: 120px; color: #9ca3af;">Valid From:</label>';
            certConfigHTML += '<input type="date" id="certValidFrom" value="' + config.sslCertificate.validFrom + '" style="padding: 4px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;" />';
            certConfigHTML += '</div>';

            certConfigHTML += '<div style="margin-bottom: 10px;">';
            certConfigHTML += '<label style="display: inline-block; width: 120px; color: #9ca3af;">Valid To:</label>';
            certConfigHTML += '<input type="date" id="certValidTo" value="' + config.sslCertificate.validTo + '" style="padding: 4px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;" />';
            certConfigHTML += '</div>';

            // Certificate Info
            certConfigHTML += '<div style="margin-top: 10px; padding: 8px; background: #0a0d1e; border: 1px solid #2a2d3e; border-radius: 3px;">';
            certConfigHTML += '<small style="color: #6b7280;">💡 <strong>Note:</strong> Self-signed certificates provide encryption but trigger browser security warnings. CA-signed certificates are trusted by browsers.</small>';
            certConfigHTML += '</div>';

            certConfigHTML += '</div>';

            // Insert the certificate config after the protocol selection
            var protocolDiv = document.getElementById("httpProtocol").parentElement.parentElement;
            var certDiv = document.createElement("div");
            certDiv.innerHTML = certConfigHTML;
            protocolDiv.appendChild(certDiv.firstChild);
        } else {
            // Show existing certificate config
            existingCertConfig.style.display = 'block';
        }

        // Remove any "save and re-open" notice if it exists
        var noticeDiv = document.getElementById("certNotice");
        if (noticeDiv) {
            noticeDiv.remove();
        }
    } else {
        // Hide certificate config when switching to HTTP
        if (existingCertConfig) {
            existingCertConfig.style.display = 'none';
        }
    }
}

function toggleCertificateIssuer(hostId) {
    var certType = document.getElementById("certType").value;
    var issuerField = document.getElementById("certIssuer");
    var certTypeDiv = document.getElementById("certType").parentElement;

    // Update issuer field based on certificate type
    if (certType === 'self-signed') {
        issuerField.value = 'NetworkSimulator CA';
        issuerField.readOnly = true;
        issuerField.style.background = '#0a0d1e';
        issuerField.style.color = '#6b7280';
    } else {
        issuerField.readOnly = false;
        issuerField.style.background = '#1a1d2e';
        issuerField.style.color = '#e4e4e7';
        if (issuerField.value === 'NetworkSimulator CA') {
            issuerField.value = 'NetworkSimulator Trusted CA';
        }
    }

    // Update the warning/success message
    var warningSpan = certTypeDiv.querySelector('span[style*="margin-left"]');
    if (warningSpan) {
        if (certType === 'self-signed') {
            warningSpan.innerHTML = '⚠️ Will show browser warning';
            warningSpan.style.color = '#fbbf24';
        } else {
            warningSpan.innerHTML = '✅ Trusted by browsers';
            warningSpan.style.color = '#4ade80';
        }
    } else {
        // Create the warning span if it doesn't exist
        var newSpan = document.createElement('span');
        newSpan.style.cssText = 'margin-left: 10px; font-size: 0.85em;';
        if (certType === 'self-signed') {
            newSpan.innerHTML = '⚠️ Will show browser warning';
            newSpan.style.color = '#fbbf24';
        } else {
            newSpan.innerHTML = '✅ Trusted by browsers';
            newSpan.style.color = '#4ade80';
        }
        certTypeDiv.appendChild(newSpan);
    }
}

// Helper function to generate mock SSL fingerprint
function generateFingerprint() {
    var chars = '0123456789ABCDEF';
    var fingerprint = '';
    for (var i = 0; i < 20; i++) {
        if (i > 0) fingerprint += ':';
        fingerprint += chars.charAt(Math.floor(Math.random() * 16));
        fingerprint += chars.charAt(Math.floor(Math.random() * 16));
    }
    return fingerprint;
}

// Phase 3: Global helper functions for UI button clicks
function manageVirtualHosts(hostId) {
    var host = network.getElement(hostId);
    if (host) {
        var app = host.getApp("HTTPServer");
        if (app) {
            app.manageVirtualHosts();
        }
    }
}

// Legacy function - kept for backward compatibility but no longer used
// Authentication is now configured per virtual host
function configureAuthentication(hostId) {
    alert('Authentication is now configured per virtual host.\n\nPlease use the "Manage Virtual Hosts" button and click "Authentication" for each domain.');
}

// Toggle virtual host authentication fields
function toggleVHostAuthFields() {
    var enabled = document.getElementById('vhost_auth_enabled').checked;
    var fields = document.getElementById('vhost_auth_fields');
    if (fields) {
        fields.style.opacity = enabled ? '1' : '0.5';
        fields.style.pointerEvents = enabled ? 'auto' : 'none';
    }
}

// Global function to update status code explanation
function updateStatusExplanation(code) {
    var exp = document.getElementById("statusExplanation");
    if (exp) {
        var explanations = {
            200: '✅ The request was successful. The page will be displayed normally.',
            201: '✅ Resource created successfully. Typically used for POST requests.',
            301: '➡️ Permanent redirect. The browser will cache this redirect.',
            302: '↩️ Temporary redirect. The browser will not cache this redirect.',
            304: '📄 Not modified. Used for caching - content hasn\'t changed.',
            400: '❌ Bad request. The server cannot process the request.',
            401: '🔒 Authentication required. User must log in.',
            403: '🚫 Forbidden. Server refuses to authorize the request.',
            404: '❓ Not found. The requested resource doesn\'t exist.',
            500: '💥 Internal server error. Something went wrong on the server.',
            502: '🔌 Bad gateway. Invalid response from upstream server.',
            503: '🔧 Service unavailable. Server is temporarily offline.'
        };
        exp.innerHTML = explanations[code] || 'Status code ' + code;
    }
}

// Simple Certificate Authority simulation - make it global for HTTPClient access
window.CertificateAuthority = {
    trustedCerts: {},
    
    // Sign a certificate (make it trusted)
    signCertificate: function(hostId, domain) {
        var certId = 'cert_' + hostId + '_' + Date.now();
        this.trustedCerts[certId] = {
            domain: domain,
            hostId: hostId,
            signedAt: new Date().toISOString(),
            issuer: 'NetworkSimulator Trusted CA',
            validDays: 365
        };
        return certId;
    },
    
    // Check if a certificate is trusted
    isTrusted: function(hostId, domain) {
        for (var certId in this.trustedCerts) {
            var cert = this.trustedCerts[certId];
            if (cert.hostId === hostId && cert.domain === domain) {
                return true;
            }
        }
        return false;
    },
    
    // Get CA signed certificate details
    getCertificateDetails: function(hostId, domain) {
        for (var certId in this.trustedCerts) {
            var cert = this.trustedCerts[certId];
            if (cert.hostId === hostId && cert.domain === domain) {
                return cert;
            }
        }
        return null;
    }
};

// Per-domain certificate UI functions
function viewDomainCertificate(hostId, domainName) {
    // Clean domain name from any HTML tags
    var cleanDomain = domainName.replace(/<[^>]*>/g, '').trim();

    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");
    var cert = app.getDomainCertificate(cleanDomain);

    createBkDiv();

    var content = '<div style="padding: 20px;">';
    content += '<h3 style="color: #667eea; margin: 0 0 20px 0;">🔐 SSL Certificate for ' + cleanDomain + '</h3>';

    // Certificate configuration form
    content += '<div style="background: #1e2a3e; padding: 15px; border-radius: 8px; border: 1px solid #2e3a4e;">';

    // Certificate Type
    content += '<div style="margin-bottom: 15px;">';
    content += '<label style="display: inline-block; width: 140px; color: #9ca3af;">Certificate Type:</label>';
    content += '<select id="domainCertType" onchange="toggleDomainCertIssuer()" style="padding: 5px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;">';
    content += '<option value="self-signed"' + (cert.selfSigned ? ' selected' : '') + '>Self-Signed</option>';
    content += '<option value="ca-signed"' + (!cert.selfSigned ? ' selected' : '') + '>CA-Signed</option>';
    content += '</select>';
    if (cert.selfSigned) {
        content += ' <span style="color: #fbbf24; margin-left: 10px; font-size: 0.9em;">⚠️ Browser warning</span>';
    } else {
        content += ' <span style="color: #4ade80; margin-left: 10px; font-size: 0.9em;">✅ Trusted</span>';
    }
    content += '</div>';

    // Common Name
    content += '<div style="margin-bottom: 15px;">';
    content += '<label style="display: inline-block; width: 140px; color: #9ca3af;">Common Name:</label>';
    content += '<input type="text" id="domainCertSubject" value="' + (cert.subject || cleanDomain) + '" ';
    content += 'style="width: 250px; padding: 5px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;" />';
    content += '</div>';

    // Issuer
    content += '<div style="margin-bottom: 15px;">';
    content += '<label style="display: inline-block; width: 140px; color: #9ca3af;">Issuer:</label>';
    content += '<input type="text" id="domainCertIssuer" value="' + cert.issuer + '" ';
    content += (cert.selfSigned ? 'readonly style="width: 250px; padding: 5px; background: #0a0d1e; color: #6b7280; border: 1px solid #2a2d3e; border-radius: 3px;"' :
        'style="width: 250px; padding: 5px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;"') + ' />';
    content += '</div>';

    // Validity
    content += '<div style="margin-bottom: 15px;">';
    content += '<label style="display: inline-block; width: 140px; color: #9ca3af;">Valid From:</label>';
    content += '<input type="date" id="domainCertValidFrom" value="' + cert.validFrom + '" ';
    content += 'style="padding: 5px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;" />';
    content += '</div>';

    content += '<div style="margin-bottom: 15px;">';
    content += '<label style="display: inline-block; width: 140px; color: #9ca3af;">Valid To:</label>';
    content += '<input type="date" id="domainCertValidTo" value="' + cert.validTo + '" ';
    content += 'style="padding: 5px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;" />';
    content += '</div>';

    content += '</div>';

    content += '</div>';

    var controls = '<button onclick="saveDomainCertificate(' + hostId + ', \'' + cleanDomain.replace(/'/g, "\\'") + '\')" style="padding: 6px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Save</button>';
    controls += '<button onclick="closeDomainCertificate()" style="padding: 6px 16px; background: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>';

    var w = new UIWindow('divdomaincert', '🔐 Certificate: ' + cleanDomain, 600, 400, false, 1.0);
    w.setContent(content);
    w.setControls(controls);
    w.render();
}


function saveDomainCertificate(hostId, domain) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");

    var certData = {
        selfSigned: document.getElementById('domainCertType').value === 'self-signed',
        subject: document.getElementById('domainCertSubject').value,
        issuer: document.getElementById('domainCertIssuer').value,
        validFrom: document.getElementById('domainCertValidFrom').value,
        validTo: document.getElementById('domainCertValidTo').value,
        enabled: true
    };

    app.updateDomainCertificate(domain, certData);

    closeDomainCertificate();
}

function closeDomainCertificate() {
    removeBodyDiv('divbk');
    var w = uimanager.getWindow('divdomaincert');
    if (w) {
        w.dispose();
    }
}

// Phase 2: View SSL Certificate modal
function viewSSLCertificate(hostId) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");
    var cert = app.getCertificate();
    
    var content = '<div style="padding: 15px; background: #1a1d2e; color: #e4e4e7;">';
    
    // Certificate status
    content += '<div style="margin-bottom: 20px; padding: 10px; background: #2a2d3e; border: 1px solid #3a3d4e; border-radius: 5px;">';
    
    // Check if certificate is CA-signed
    var isTrusted = CertificateAuthority.isTrusted(hostId, cert.subject || 'localhost');
    var caDetails = CertificateAuthority.getCertificateDetails(hostId, cert.subject || 'localhost');
    
    if (isTrusted && caDetails) {
        content += '<span style="color: #4ade80;">✅ CA-Signed Certificate</span><br/>';
        content += '<small style="color: #9ca3af;">Signed by: ' + caDetails.issuer + '</small>';
    } else if (cert.selfSigned) {
        content += '<span style="color: #fbbf24;">⚠️ Self-Signed Certificate</span><br/>';
        content += '<small style="color: #9ca3af;">This certificate is not verified by a trusted authority</small>';
    } else {
        content += '<span style="color: #4ade80;">✅ Valid Certificate</span>';
    }
    content += '</div>';
    
    // Certificate details with no-hover class
    content += '<style>.cert-table tr:hover td { background: inherit !important; }</style>';
    content += '<table class="cert-table" style="width: 100%; font-size: 0.9em; background: #2a2d3e; border: 1px solid #3a3d4e; border-radius: 5px;">';
    content += '<tr style="background: #1a1d2e;"><td style="padding: 8px; font-weight: bold; width: 120px; color: #9ca3af; border-bottom: 1px solid #3a3d4e;">Issued To:</td><td style="padding: 8px; color: #e4e4e7; border-bottom: 1px solid #3a3d4e;">' + (cert.subject || 'localhost') + '</td></tr>';
    content += '<tr style="background: #2a2d3e;"><td style="padding: 8px; font-weight: bold; color: #9ca3af; border-bottom: 1px solid #3a3d4e;">Issued By:</td><td style="padding: 8px; color: #e4e4e7; border-bottom: 1px solid #3a3d4e;">' + cert.issuer + '</td></tr>';
    content += '<tr style="background: #1a1d2e;"><td style="padding: 8px; font-weight: bold; color: #9ca3af; border-bottom: 1px solid #3a3d4e;">Valid From:</td><td style="padding: 8px; color: #e4e4e7; border-bottom: 1px solid #3a3d4e;">' + cert.validFrom + '</td></tr>';
    content += '<tr style="background: #2a2d3e;"><td style="padding: 8px; font-weight: bold; color: #9ca3af; border-bottom: 1px solid #3a3d4e;">Valid To:</td><td style="padding: 8px; color: #e4e4e7; border-bottom: 1px solid #3a3d4e;">' + cert.validTo + '</td></tr>';
    content += '<tr style="background: #1a1d2e;"><td style="padding: 8px; font-weight: bold; color: #9ca3af; border-bottom: 1px solid #3a3d4e;">Algorithm:</td><td style="padding: 8px; color: #e4e4e7; border-bottom: 1px solid #3a3d4e;">' + cert.algorithm + '</td></tr>';
    content += '<tr style="background: #2a2d3e;"><td style="padding: 8px; font-weight: bold; color: #9ca3af;">Fingerprint:</td><td style="padding: 8px; font-family: monospace; font-size: 0.8em; color: #667eea; word-break: break-all;">' + cert.fingerprint + '</td></tr>';
    content += '</table>';
    
    // Certificate Actions
    if (!isTrusted && cert.selfSigned) {
        content += '<div style="margin-top: 20px; padding: 10px; background: #3a2d1e; border: 1px solid #5a4d3e; border-radius: 5px;">';
        content += '<strong style="color: #fbbf24;">🔐 Certificate Signing:</strong><br/>';
        content += '<small style="color: #9ca3af;">You can request the Certificate Authority to sign this certificate to make it trusted.</small><br/>';
        content += '<button onclick="requestCertificateSigning(' + hostId + ')" style="margin-top: 10px; padding: 5px 15px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 3px; cursor: pointer;">Request CA Signing</button>';
        content += '</div>';
    }
    
    // Educational info
    content += '<div style="margin-top: 20px; padding: 10px; background: #1e2a3e; border: 1px solid #2e3a4e; border-radius: 5px;">';
    content += '<strong style="color: #667eea;">📚 About SSL Certificates:</strong><br/>';
    content += '<small style="color: #9ca3af;">SSL certificates encrypt data between the client and server. ';
    content += 'Self-signed certificates provide encryption but are not verified by a Certificate Authority (CA). ';
    content += 'CA-signed certificates are trusted by browsers and don\'t show security warnings.</small>';
    content += '</div>';
    
    content += '</div>';
    
    var controls = '<button onclick="closeCertificateViewer()">Close</button>';
    var w = new UIWindow('divcertviewer', '🔒 SSL Certificate Details', 500, 400, false, 1.0);
    w.setContent(content);
    w.setControls(controls);
    w.render();
}

function closeCertificateViewer() {
    uimanager.getWindow("divcertviewer").dispose();
}

function requestCertificateSigning(hostId) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");
    var cert = app.getCertificate();
    
    // Sign the certificate with the CA
    var domain = cert.subject || 'localhost';
    var certId = CertificateAuthority.signCertificate(hostId, domain);
    
    // Update the certificate to mark it as CA-signed
    cert.selfSigned = false;
    cert.issuer = 'NetworkSimulator Trusted CA';
    cert.caSignedId = certId;
    app.updateCertificate(cert);
    
    // Close and reopen the certificate viewer to show the updated status
    closeCertificateViewer();
    viewSSLCertificate(hostId);
    
    // Show success message
    alert('Certificate successfully signed by the Certificate Authority!\n\nThe certificate is now trusted and browsers will not show security warnings.');
}

// Phase 2: Edit custom headers modal
function editCustomHeaders(hostId) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");
    var config = app.getConfig();
    var headers = config.customHeaders || {};
    
    var content = '<div style="padding: 15px; background: #1a1d2e; color: #e4e4e7;">';
    content += '<div style="margin-bottom: 15px;">';
    content += '<strong style="color: #e4e4e7;">Custom HTTP Response Headers:</strong><br/>';
    content += '<small style="color: #9ca3af;">These headers will be sent with every response</small>';
    content += '</div>';
    
    // Existing headers
    content += '<div id="headersList" style="margin-bottom: 15px; max-height: 200px; overflow-y: auto;">';
    for (var name in headers) {
        content += '<div style="margin-bottom: 5px; padding: 5px; background: #2a2d3e; border: 1px solid #3a3d4e; border-radius: 3px;">';
        content += '<strong style="color: #667eea;">' + name + ':</strong> <span style="color: #e4e4e7;">' + headers[name] + '</span>';
        content += ' <button onclick="removeCustomHeader(\'' + hostId + '\', \'' + name + '\')" style="float: right; padding: 1px 5px; font-size: 0.8em; background: #ef4444; color: white; border: none; border-radius: 3px; cursor: pointer;">Remove</button>';
        content += '</div>';
    }
    if (Object.keys(headers).length === 0) {
        content += '<em style="color: #6b7280;">No custom headers defined</em>';
    }
    content += '</div>';
    
    // Add new header
    content += '<fieldset style="padding: 10px; border: 1px solid #3a3d4e; border-radius: 5px; background: #2a2d3e;">';
    content += '<legend style="color: #667eea;">Add Header</legend>';
    content += '<input type="text" id="newHeaderName" placeholder="Header-Name" style="width: 45%; margin-right: 5px; padding: 4px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;" />';
    content += '<input type="text" id="newHeaderValue" placeholder="Header Value" style="width: 45%; margin-right: 5px; padding: 4px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;" />';
    content += '<button onclick="addCustomHeader(\'' + hostId + '\')" style="padding: 4px 10px; background: #667eea; color: white; border: none; border-radius: 3px; cursor: pointer;">Add</button>';
    content += '</fieldset>';
    
    // Common headers dropdown
    content += '<div style="margin-top: 15px;">';
    content += '<label style="color: #9ca3af;">Quick Add: </label>';
    content += '<select id="commonHeaders" onchange="fillCommonHeader()" style="padding: 4px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;">';
    content += '<option value="">-- Common Headers --</option>';
    content += '<option value="Cache-Control:no-cache">Cache-Control: no-cache</option>';
    content += '<option value="Content-Type:application/json">Content-Type: application/json</option>';
    content += '<option value="X-Powered-By:NetworkSimulator">X-Powered-By: NetworkSimulator</option>';
    content += '<option value="Strict-Transport-Security:max-age=31536000">HSTS Header</option>';
    content += '</select>';
    content += '</div>';
    
    content += '</div>';
    
    var controls = '<button onclick="closeHeadersEditor()">Done</button>';
    var w = new UIWindow('divheaderseditor', 'Edit Response Headers', 500, 450, false, 1.0);
    w.setContent(content);
    w.setControls(controls);
    w.render();
}

function addCustomHeader(hostId) {
    var name = document.getElementById('newHeaderName').value.trim();
    var value = document.getElementById('newHeaderValue').value.trim();
    
    if (name && value) {
        var host = network.getElement(hostId);
        var app = host.getApp("HTTPServer");
        app.setHeader(name, value);
        
        // Refresh the modal
        editCustomHeaders(hostId);
    }
}

function removeCustomHeader(hostId, headerName) {
    var host = network.getElement(hostId);
    var app = host.getApp("HTTPServer");
    app.removeHeader(headerName);
    
    // Refresh the modal
    editCustomHeaders(hostId);
}

function fillCommonHeader() {
    var select = document.getElementById('commonHeaders');
    if (select.value) {
        var parts = select.value.split(':');
        document.getElementById('newHeaderName').value = parts[0];
        document.getElementById('newHeaderValue').value = parts[1];
        select.value = '';
    }
}

function closeHeadersEditor() {
    uimanager.getWindow("divheaderseditor").dispose();
}

function backHTTPServerData2(id, uitableid) 
{
    //removeBodyDiv('divhttpfileserverinfo');
    uimanager.getWindow("divhttpfileserverinfo").dispose();
    createHTTPServerInfoDiv1back(id, uitableid);
}

function saveHTTPServerData1(id, uitableid)
{
    var data = uitables[uitableid].getData();
    var host = network.getElement(id);
    var app = host.getApp("HTTPServer");

    // Save security header settings if they exist
    var securityHeaders = document.getElementById("securityHeaders") ? document.getElementById("securityHeaders").checked : false;
    var corsEnabled = document.getElementById("corsEnabled") ? document.getElementById("corsEnabled").checked : false;

    // Update the security settings
    app.getConfig().securityHeaders = securityHeaders;
    app.getConfig().corsEnabled = corsEnabled;

    // Preserve existing domain settings and certificates before reset
    var savedDomainSettings = {};
    var savedDomainCertificates = {};
    var existingDomains = app.getDomains();
    for (var domain in existingDomains) {
        savedDomainSettings[domain] = app.getDomainSettings(domain);
        savedDomainCertificates[domain] = app.getDomainCertificate(domain);
    }

    // Save domains and files
    app.resetHTTPServerInfo();
    for (var i = 0; i < data.length; i++)
    {
        var domain = data[i][0];
        app.addDomain(domain);

        // Restore saved settings if they existed
        if (savedDomainSettings[domain]) {
            app.updateDomainSettings(domain, savedDomainSettings[domain]);
        }
        if (savedDomainCertificates[domain]) {
            app.updateDomainCertificate(domain,
                savedDomainCertificates[domain].selfSigned,
                savedDomainCertificates[domain].issuer,
                savedDomainCertificates[domain].subject);
        }

        if (data[i].length > 1)
        {
            for (var j = 0; j < data[i][1].length; j++)
            {
                var filename = data[i][1][j][0];
                if (data[i][1][j].length === 1)
                {
                    data[i][1][j][1] = "";
                }
                var contents = data[i][1][j][1];
                app.setFileContents(domain, filename, contents);

                // Save status code if configured
                if (data[i][1][j][2] && data[i][1][j][2].statusCode) {
                    app.setStatusCode(domain, filename, data[i][1][j][2].statusCode);
                }
            }
        }
    }
    
    uimanager.getWindow("divhttpserverinfo").dispose();
    removeBodyDiv('divbk');
    uitables[uitableid].dispose();
}

function cancelHTTPServerData1(uitableid) 
{
    //removeBodyDiv('divhttpserverinfo');
    uimanager.getWindow("divhttpserverinfo").dispose();
    removeBodyDiv('divbk');
    uitables[uitableid].dispose();
}

/*
- Domains
  - Files
*/
var HTTPServer = function(ifacepos)
{
    var owner = null;
    var ifacepos = ifacepos;
    var domains = {};
    // Per-domain certificate storage
    var domainCertificates = {};
    // Per-domain settings (protocol, port, etc.)
    var domainSettings = {};
    
    // Phase 1 enhancements: Port configuration and status codes
    var config = {
        protocol: 'http',  // 'http' or 'https'
        port: 80,          // Default HTTP port
        httpsEnabled: false,
        customPort: null,
        // Status code configurations per file
        statusCodes: {},   // Format: { "domain/file": statusCode }
        // Global server status (for maintenance mode, etc.)
        serverStatus: 'running', // 'running', 'maintenance'
        
        // Phase 2: SSL/TLS Certificate
        sslCertificate: {
            enabled: false,
            issuer: 'NetworkSimulator CA',
            subject: '',
            validFrom: new Date().toISOString().split('T')[0],
            validTo: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0], // 1 year
            fingerprint: '', // Will be generated later
            selfSigned: true,
            algorithm: 'RSA 2048'
        },
        
        // Phase 2: Custom Headers
        customHeaders: {}, // Format: { "header-name": "header-value" }
        corsEnabled: false,
        securityHeaders: false,
        
        // Phase 3: Virtual Hosts
        virtualHosts: {}, // Format: { "domain": { files: {}, auth: {}, redirects: {} } }
        defaultHost: 'localhost', // Default virtual host
        // Phase 3: Authentication
        authentication: {} // Format: { "domain/path": { username: "", password: "" } }
    };
    
    // Generate fingerprint after config is initialized
    if (!config.sslCertificate.fingerprint) {
        config.sslCertificate.fingerprint = typeof generateFingerprint === 'function' ? generateFingerprint() : 'AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD';
    }

    // Server enabled state
    this.enabled = false;

    // Enable/disable methods
    this.enable = function() {
        this.enabled = true;

        // Register on appropriate ports based on domain settings
        if (owner && owner.getConnectable) {
            var trafficManager = owner.getConnectable().getTrafficManager();
            if (trafficManager) {
                // Register on standard HTTP/HTTPS ports
                trafficManager.registerApplication(this, 80, true);
                trafficManager.registerApplication(this, 443, true);

                // Also register on any custom ports from domain settings
                for (var domain in domainSettings) {
                    if (domainSettings[domain].port &&
                        domainSettings[domain].port !== 80 &&
                        domainSettings[domain].port !== 443) {
                        trafficManager.registerApplication(this, domainSettings[domain].port, true);
                    }
                }

                console.log("HTTPServer enabled and registered on ports 80, 443, and custom domain ports");
            }
        }
    };

    this.disable = function() {
        this.enabled = false;

        // Unregister from all ports
        if (owner && owner.getConnectable) {
            var trafficManager = owner.getConnectable().getTrafficManager();
            if (trafficManager) {
                trafficManager.unregisterApplication(80);
                trafficManager.unregisterApplication(443);

                // Also unregister from any custom ports
                for (var domain in domainSettings) {
                    if (domainSettings[domain].port &&
                        domainSettings[domain].port !== 80 &&
                        domainSettings[domain].port !== 443) {
                        trafficManager.unregisterApplication(domainSettings[domain].port);
                    }
                }
            }
        }
    };

    // Initialize with a default domain if none exist (for new servers)
    // This will be overwritten when loading saved data
    this.initializeDefaultDomain = function() {
        if (Object.keys(domains).length === 0) {
            this.addDomain('localhost');
            this.setFileContents('localhost', '/index.html', '<html><body><h1>Welcome to NetworkSimulator HTTP Server</h1></body></html>');
        }
    };

    this.save = function()
    {
        var result = {};
        result.version = 2; // Updated version for new features
        result.id = this.getId();
        result.ifacepos = ifacepos;
        result.enabled = this.enabled;

        // Save configuration
        result.config = config;
        
        result.domains = [];
        for (domain in domains)
        {
            var domaindata = {};
            domaindata.domain = domain;
            domaindata.files = [];
            // Add per-domain certificate if exists
            if (domainCertificates[domain]) {
                domaindata.certificate = domainCertificates[domain];
            }
            // Add per-domain settings if exists
            if (domainSettings[domain]) {
                domaindata.settings = domainSettings[domain];
            }
            for (filename in domains[domain])
            {
                var filedata = {};
                filedata.filename = filename;
                filedata.contents = domains[domain][filename];
                domaindata.files.push(filedata);
            }
            result.domains.push(domaindata);
        }

        // Save domain certificates separately for easier migration
        result.domainCertificates = domainCertificates;
        
        return result;
    };
    
    this.load = function(data)
    {
        // Load enabled state
        if (data.enabled !== undefined) {
            this.enabled = data.enabled;
        }

        // Load configuration if available (backward compatible)
        if (data.version >= 2 && data.config) {
            config = data.config;
            // Ensure Phase 2 properties exist for backward compatibility
            if (!config.customHeaders) {
                config.customHeaders = {};
            }
            if (config.corsEnabled === undefined) {
                config.corsEnabled = false;
            }
            if (config.securityHeaders === undefined) {
                config.securityHeaders = false;
            }
            if (!config.sslCertificate) {
                config.sslCertificate = {
                    enabled: false,
                    issuer: 'NetworkSimulator CA',
                    subject: '',
                    validFrom: new Date().toISOString().split('T')[0],
                    validTo: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
                    fingerprint: typeof generateFingerprint === 'function' ? generateFingerprint() : 'AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD',
                    selfSigned: true,
                    algorithm: 'RSA 2048'
                };
            }
            // Ensure Phase 3 properties exist for backward compatibility
            if (!config.virtualHosts) {
                config.virtualHosts = {};
            }
            if (!config.authentication) {
                config.authentication = {};
            }
            if (!config.defaultHost) {
                config.defaultHost = 'localhost';
            }
            
            // CRITICAL FIX: After loading config, ensure the host's port registration matches
            // This fixes the issue where HTTPS servers on port 443 remain registered on port 80
            if (config.port && owner) {
                // We need to update the port registration after load completes
                // Schedule this to run after the host has finished loading all apps
                setTimeout(function() {
                    if (owner && owner.updateAppPort) {
	// console.log("HTTPServer.load: Updating port registration to match config port:", config.port);
                        var updated = owner.updateAppPort("HTTPServer", config.port);
                        if (updated) {
	// console.log("HTTPServer.load: Successfully updated port registration to", config.port);
                        } else {
	// console.log("HTTPServer.load: Warning - could not update port registration to", config.port);
                        }
                    }
                }, 100); // Small delay to ensure host has finished loading
            }
        }
        
        // Load domain certificates if available
        if (data.domainCertificates) {
            domainCertificates = data.domainCertificates;
        }

        // Load domains if available
        if (data.domains && data.domains.length > 0) {
            for (var i = 0; i < data.domains.length; i++)
        {
            var domain = data.domains[i].domain;
            this.addDomain(domain);

            // Load per-domain certificate if available
            if (data.domains[i].certificate) {
                domainCertificates[domain] = data.domains[i].certificate;
            }

            // Load per-domain settings if available
            if (data.domains[i].settings) {
                domainSettings[domain] = data.domains[i].settings;
            }

            for (var j = 0; j < data.domains[i].files.length; j++)
            {
                var filename = data.domains[i].files[j].filename;
                var contents = data.domains[i].files[j].contents;
                this.setFileContents(domain, filename, contents);
            }
        }
        }
    };
    
    this.setOwner = function(c_owner) 
    {
        owner = c_owner;
        // Register on both common HTTP ports so we can respond with appropriate errors
        // This allows us to tell users when they use the wrong protocol
        if (owner && owner.getConnectable) {
            var trafficManager = owner.getConnectable().getTrafficManager();
            if (trafficManager) {
                // Register on port 80 if we're not already there
                if (config.port !== 80) {
                    trafficManager.registerApplication(this, 80, true);
	// console.log("HTTPServer: Also listening on port 80 for protocol mismatch handling");
                }
                // Register on port 443 if we're not already there
                if (config.port !== 443) {
                    trafficManager.registerApplication(this, 443, true);
	// console.log("HTTPServer: Also listening on port 443 for protocol mismatch handling");
                }
            }
        }
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
        return "HTTPServer";
    };
    
    this.getDomains = function()
    {
        return domains;
    };

    this.addDomain = function(domain)
    {
        if (!(domain in domains))
        {
            domains[domain] = [];  // Keep the original structure for backward compatibility

            // Also create the virtualHosts entry
            if (!config.virtualHosts[domain]) {
                config.virtualHosts[domain] = {
                    files: {},
                    auth: {},
                    redirects: {},
                    enabled: true
                };
            }

            // Initialize per-domain settings
            if (!domainSettings[domain]) {
                domainSettings[domain] = {
                    protocol: 'http',  // Each domain has its own protocol
                    port: 80,          // Each domain can have its own port
                    enabled: true      // Domain can be enabled/disabled
                };
            }

            // Initialize per-domain certificate
            if (!domainCertificates[domain]) {
                domainCertificates[domain] = {
                    enabled: false,  // Will be set to true when domain uses HTTPS
                    selfSigned: true,
                    issuer: 'NetworkSimulator CA',
                    subject: domain, // Default to the domain name
                    validFrom: new Date().toISOString().split('T')[0],
                    validTo: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
                    fingerprint: typeof generateFingerprint === 'function' ? generateFingerprint() :
                        'AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD'
                };
            }
        }
    }
    
    this.deleteDomain = function(domain) 
    {
        if (domain in domains) 
        {
            delete domains[domain];
        }
    }
    
    this.getFilesForDomain = function(domain)
    {
        var files = [];
        if (domains[domain]) {
            for (var filename in domains[domain]) {
                files.push([filename, domains[domain][filename]]);
            }
        }
        return files;
    };

    this.removeFile = function(domain, filename)
    {
        if (domains[domain] && domains[domain][filename]) {
            delete domains[domain][filename];
        }
        // Also remove from virtualHosts structure
        if (config.virtualHosts[domain] && config.virtualHosts[domain].files && config.virtualHosts[domain].files[filename]) {
            delete config.virtualHosts[domain].files[filename];
        }
    };

    this.setFileContents = function(domain, filename, contents)
    {
        if (domain in domains)
        {
            domains[domain][filename] = contents;
        }
        // Also update the virtualHosts structure for consistency
        if (!config.virtualHosts[domain]) {
            config.virtualHosts[domain] = {
                files: {},
                auth: {},
                redirects: {},
                enabled: true
            };
        }
        config.virtualHosts[domain].files[filename] = contents;
    };
    
    this.deleteFile = function(domain, filename)
    {
        if (domain in domains)
        {
            if (filename in domains[domain])
            {
                delete domains[domain][filename];
            }
        }
        // Also remove from virtualHosts structure
        if (config.virtualHosts[domain] && config.virtualHosts[domain].files) {
            delete config.virtualHosts[domain].files[filename];
        }
    };
    
    this.resetHTTPServerInfo = function()
    {
        domains = {};  // Should be an object, not an array
        config.virtualHosts = {};  // Also reset virtualHosts
        domainSettings = {};  // Reset domain settings
        domainCertificates = {};  // Reset domain certificates
    };
    
    // Configuration methods for Phase 1 enhancements
    this.setProtocol = function(protocol) {
        config.protocol = protocol;
        config.httpsEnabled = (protocol === 'https');
        config.sslCertificate.enabled = (protocol === 'https');
        if (protocol === 'https' && config.port === 80) {
            config.port = 443;
            // Update certificate subject if empty
            if (!config.sslCertificate.subject && Object.keys(domains).length > 0) {
                config.sslCertificate.subject = Object.keys(domains)[0];
            }
        } else if (protocol === 'http' && config.port === 443) {
            config.port = 80;
        }
        // Re-register on standard ports for protocol mismatch handling
        this.updateRegistration();
    };
    
    // Update server registration to listen on standard ports for error messages
    this.updateRegistration = function() {
        // Get trafficManager from the global network object
        var tm = null;
        if (typeof network !== 'undefined' && network && network.getTrafficManager) {
            tm = network.getTrafficManager();
        }
        
        if (tm) {
            // Always register on both standard ports to handle protocol mismatches
            if (config.port !== 80) {
                tm.registerApplication(this, 80, true);
                // console.log("HTTPServer: Listening on port 80 for protocol mismatch handling");
            }
            if (config.port !== 443) {
                tm.registerApplication(this, 443, true);
                // console.log("HTTPServer: Listening on port 443 for protocol mismatch handling");
            }
        }
    };
    
    this.getProtocol = function() {
        return config.protocol;
    };
    
    this.setPort = function(port) {
        config.port = parseInt(port);
        config.customPort = (port != 80 && port != 443) ? port : null;
        // Re-register on standard ports for protocol mismatch handling
        this.updateRegistration();
    };
    
    this.getPort = function() {
        return config.port;
    };
    
    this.setStatusCode = function(domain, filename, statusCode) {
        var key = domain + '/' + filename;
        config.statusCodes[key] = parseInt(statusCode);
    };
    
    this.getStatusCode = function(domain, filename) {
        var key = domain + '/' + filename;
        return config.statusCodes[key] || null;
    };
    
    this.setServerStatus = function(status) {
        config.serverStatus = status;
    };
    
    this.getConfig = function() {
        return config;
    };
    
    this.getStatusCodeDescription = function(code) {
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
            421: 'Misdirected Request',
            426: 'Upgrade Required',
            500: 'Internal Server Error',
            502: 'Bad Gateway',
            503: 'Service Unavailable'
        };
        return descriptions[code] || 'Unknown';
    };
    
    this.getStatusExplanation = function(code) {
        var explanations = {
            200: '✅ The request was successful. The page will be displayed normally.',
            201: '✅ Resource created successfully. Typically used for POST requests.',
            301: '➡️ Permanent redirect. The browser will cache this redirect.',
            302: '↩️ Temporary redirect. The browser will not cache this redirect.',
            304: '📄 Not modified. Used for caching - content hasn\'t changed.',
            400: '❌ Bad request. The server cannot process the request.',
            401: '🔒 Authentication required. User must log in.',
            403: '🚫 Forbidden. Server refuses to authorize the request.',
            404: '❓ Not found. The requested resource doesn\'t exist.',
            500: '💥 Internal server error. Something went wrong on the server.',
            502: '🔌 Bad gateway. Invalid response from upstream server.',
            503: '🔧 Service unavailable. Server is temporarily offline.'
        };
        return explanations[code] || 'Status code ' + code;
    };
    
    // Phase 2: SSL Certificate methods
    // Legacy method - returns global certificate for backward compatibility
    this.getCertificate = function() {
        return config.sslCertificate;
    };

    // Get certificate for a specific domain
    this.getDomainCertificate = function(domain) {
        if (domainCertificates[domain]) {
            return domainCertificates[domain];
        }
        // Fallback to global certificate for backward compatibility
        return config.sslCertificate;
    };

    // Update certificate for a specific domain
    this.updateDomainCertificate = function(domain, selfSignedOrCertData, issuer, subject) {
        if (!domainCertificates[domain]) {
            domainCertificates[domain] = {};
        }

        var certData;
        // Handle both calling formats: (domain, certData) or (domain, selfSigned, issuer, subject)
        if (typeof selfSignedOrCertData === 'object') {
            certData = selfSignedOrCertData;
        } else {
            certData = {
                selfSigned: selfSignedOrCertData,
                issuer: issuer,
                subject: subject || domain
            };
        }

        if (certData) {
            Object.assign(domainCertificates[domain], certData);
        }
    };

    // Get settings for a specific domain
    this.getDomainSettings = function(domain) {
        if (!domainSettings[domain]) {
            domainSettings[domain] = {
                protocol: 'http',
                port: 80,
                enabled: true
            };
        }
        return domainSettings[domain];
    };

    // Update settings for a specific domain
    this.updateDomainSettings = function(domain, protocolOrSettings, port) {
        if (!domainSettings[domain]) {
            domainSettings[domain] = {};
        }

        var settings;
        // Handle both calling formats: (domain, settings) or (domain, protocol, port)
        if (typeof protocolOrSettings === 'object') {
            settings = protocolOrSettings;
        } else {
            settings = {
                protocol: protocolOrSettings,
                port: port
            };
        }

        if (settings) {
            Object.assign(domainSettings[domain], settings);
            // If protocol changes to HTTPS, update certificate
            if (settings.protocol === 'https') {
                if (!domainCertificates[domain]) {
                    domainCertificates[domain] = {
                        selfSigned: true,
                        issuer: 'NetworkSimulator CA',
                        subject: domain
                    };
                }
                domainCertificates[domain].enabled = true;
                if (settings.port === undefined) {
                    domainSettings[domain].port = 443;
                }
            } else if (settings.protocol === 'http') {
                if (domainCertificates[domain]) {
                    domainCertificates[domain].enabled = false;
                }
                if (settings.port === undefined) {
                    domainSettings[domain].port = 80;
                }
            }
        }
    };

    // Legacy method - updates global certificate for backward compatibility
    this.updateCertificate = function(certData) {
        if (certData) {
            Object.assign(config.sslCertificate, certData);
        }
    };
    
    // Phase 2: Headers methods
    this.setHeader = function(name, value) {
        config.customHeaders[name] = value;
    };
    
    this.removeHeader = function(name) {
        delete config.customHeaders[name];
    };
    
    this.getHeaders = function(filename, fileContent) {
        var headers = Object.assign({}, config.customHeaders);

        // More realistic server header with version
        headers['Server'] = 'Apache/2.4.41 (Ubuntu)';
        headers['Date'] = new Date().toUTCString();

        // Determine content type based on file extension
        if (filename) {
            var ext = filename.split('.').pop().toLowerCase();
            switch(ext) {
                case 'html':
                case 'htm':
                    headers['Content-Type'] = 'text/html; charset=UTF-8';
                    break;
                case 'css':
                    headers['Content-Type'] = 'text/css; charset=UTF-8';
                    break;
                case 'js':
                    headers['Content-Type'] = 'application/javascript; charset=UTF-8';
                    break;
                case 'json':
                    headers['Content-Type'] = 'application/json; charset=UTF-8';
                    break;
                case 'xml':
                    headers['Content-Type'] = 'application/xml; charset=UTF-8';
                    break;
                case 'jpg':
                case 'jpeg':
                    headers['Content-Type'] = 'image/jpeg';
                    break;
                case 'png':
                    headers['Content-Type'] = 'image/png';
                    break;
                case 'gif':
                    headers['Content-Type'] = 'image/gif';
                    break;
                case 'svg':
                    headers['Content-Type'] = 'image/svg+xml';
                    break;
                case 'ico':
                    headers['Content-Type'] = 'image/x-icon';
                    break;
                case 'pdf':
                    headers['Content-Type'] = 'application/pdf';
                    break;
                case 'zip':
                    headers['Content-Type'] = 'application/zip';
                    break;
                case 'txt':
                    headers['Content-Type'] = 'text/plain; charset=UTF-8';
                    break;
                default:
                    headers['Content-Type'] = 'application/octet-stream';
            }
        } else {
            headers['Content-Type'] = 'text/html; charset=UTF-8';
        }

        // Add content length if we have content
        if (fileContent) {
            headers['Content-Length'] = fileContent.length.toString();
        }

        // Add cache control headers (realistic defaults)
        headers['Cache-Control'] = 'max-age=3600, public';
        headers['Accept-Ranges'] = 'bytes';

        // Add ETag for caching (simple hash based on content)
        if (fileContent) {
            var hash = 0;
            for (var i = 0; i < Math.min(fileContent.length, 100); i++) {
                hash = ((hash << 5) - hash) + fileContent.charCodeAt(i);
                hash = hash & hash;
            }
            headers['ETag'] = '"' + Math.abs(hash).toString(16) + '-' + fileContent.length + '"';
        }

        // Add Last-Modified header
        headers['Last-Modified'] = new Date(Date.now() - Math.floor(Math.random() * 86400000)).toUTCString();

        // Connection header
        headers['Connection'] = 'keep-alive';

        // Add security headers if enabled
        if (config.securityHeaders) {
            headers['X-Content-Type-Options'] = 'nosniff';
            headers['X-Frame-Options'] = 'SAMEORIGIN';
            headers['X-XSS-Protection'] = '1; mode=block';
            headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
            headers['Content-Security-Policy'] = "default-src 'self'";
        }

        // Add CORS headers if enabled
        if (config.corsEnabled) {
            headers['Access-Control-Allow-Origin'] = '*';
            headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
            headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
            headers['Access-Control-Max-Age'] = '86400';
        }

        // Add Vary header for proper caching
        headers['Vary'] = 'Accept-Encoding';

        return headers;
    };
    
    // Phase 3: Virtual Host methods
    this.addVirtualHost = function(hostname) {
        if (!config.virtualHosts[hostname]) {
            config.virtualHosts[hostname] = {
                files: {},
                auth: {},
                redirects: {},
                enabled: true
            };
        }
        // Also add to old domains array for backward compatibility
        if (domains.indexOf(hostname) === -1) {
            domains[hostname] = [];
        }
    };
    
    this.removeVirtualHost = function(hostname) {
        delete config.virtualHosts[hostname];
        delete domains[hostname];
    };
    
    this.setVirtualHostFile = function(hostname, filename, content) {
        if (!config.virtualHosts[hostname]) {
            this.addVirtualHost(hostname);
        }
        config.virtualHosts[hostname].files[filename] = content;
        // Also update old domains structure
        if (domains[hostname]) {
            domains[hostname][filename] = content;
        }
    };
    
    this.setAuthentication = function(hostname, path, username, password) {
        var key = hostname + '/' + path;
        config.authentication[key] = {
            username: username,
            password: password,
            enabled: true
        };
    };
    
    this.checkAuthentication = function(hostname, path, authHeader) {
        // Check virtual host authentication first
        var vhost = config.virtualHosts && config.virtualHosts[hostname];
        if (vhost && vhost.requiresAuth) {
            // Virtual host requires authentication
            if (!authHeader) {
                return false; // Auth required but not provided
            }

            // Check Basic auth against virtual host's users
            if (authHeader.indexOf('Basic ') === 0) {
                var credentials = authHeader.substring(6);
                try {
                    var decoded = atob(credentials);
                    var parts = decoded.split(':');
                    var username = parts[0];
                    var password = parts[1];

                    // Check against virtual host's authentication users
                    if (vhost.authUsers &&
                        vhost.authUsers[username] === password) {
                        return true;
                    }

                    // Fallback: check against global authentication users for backward compatibility
                    if (config.authentication.users &&
                        config.authentication.users[username] === password) {
                        return true;
                    }
                } catch (e) {
                    return false;
                }
            }
            return false;
        }
        
        // Check path-specific authentication (legacy)
        var key = hostname + '/' + path;
        var auth = config.authentication[key];
        
        if (!auth || !auth.enabled) {
            return true; // No auth required
        }
        
        if (!authHeader) {
            return false; // Auth required but not provided
        }
        
        // Check Basic auth
        if (authHeader.indexOf('Basic ') === 0) {
            var credentials = authHeader.substring(6);
            try {
                var decoded = atob(credentials);
                var parts = decoded.split(':');
                return parts[0] === auth.username && parts[1] === auth.password;
            } catch (e) {
                return false;
            }
        }
        
        return false;
    };
    
    this.setRedirect = function(hostname, fromPath, toPath, code) {
        if (!config.virtualHosts) {
            config.virtualHosts = {};
        }
        if (!config.virtualHosts[hostname]) {
            this.addVirtualHost(hostname);
        }
        if (!config.virtualHosts[hostname].redirects) {
            config.virtualHosts[hostname].redirects = {};
        }
        config.virtualHosts[hostname].redirects[fromPath] = {
            to: toPath,
            code: code || 301 // Default to permanent (301)
        };
    };
    
    this.getMenuEntries = function()
    {
        var data = [];

        data[0] = {};
        data[0].img = 'img/64/envelope-HTTP.png';
        data[0].text = 'Edit HTTP server info';
        data[0].js = 'editHTTPServerInfo(' + owner.id + ');';

        data[1] = {};
        data[1].img = 'img/64/envelope-HTTP.png';
        data[1].text = '🎓 Configure REST API';
        data[1].js = 'configureRESTAPI(' + owner.id + ');';

        return data;
    };
    
    this.getAppController1 = function()
    {
        var result = '<div style="padding: 10px; background: #1a1d2e; color: #e4e4e7;">';

        // Virtual Hosts Section (main focus now)
        result += '<fieldset style="margin-bottom: 15px; padding: 10px; border: 1px solid #3a3d4e; border-radius: 5px; background: #2a2d3e;">';
        result += '<legend style="color: #667eea; font-weight: bold;">Virtual Hosts Configuration</legend>';
        result += '<div style="margin-bottom: 10px; padding: 10px; background: #1a1d2e; border-radius: 5px;">';
        result += '<div style="color: #4ade80; font-size: 13px; margin-bottom: 8px;">💡 Click on a domain below to configure its settings</div>';
        result += '<div style="color: #999; font-size: 12px;">Each virtual host can have its own:</div>';
        result += '<ul style="margin: 5px 0 0 20px; color: #999; font-size: 12px;">';
        result += '<li>Protocol (HTTP/HTTPS)</li>';
        result += '<li>Port configuration</li>';
        result += '<li>SSL/TLS certificate</li>';
        result += '<li>Files and content</li>';
        result += '</ul>';
        result += '</div>';
        result += "<table id='httptable' style='font-size:0.9em; width: 100%; color: #e4e4e7;'></table>";
        result += '</fieldset>';
        
        // Headers Configuration Section (Phase 2)
        result += '<fieldset style="margin-bottom: 15px; padding: 10px; border: 1px solid #3a3d4e; border-radius: 5px; background: #2a2d3e;">';
        result += '<legend style="color: #667eea; font-weight: bold;">Response Headers</legend>';
        
        // Security headers toggle
        result += '<div style="margin-bottom: 10px;">';
        result += '<label style="display: inline-block; width: 150px;">Security Headers:</label>';
        result += '<input type="checkbox" id="securityHeaders"' + (config.securityHeaders ? ' checked' : '') + ' /> ';
        result += '<span style="color: #9ca3af; font-size: 0.9em;">(X-Frame-Options, X-Content-Type-Options, etc.)</span>';
        result += '</div>';
        
        // CORS toggle
        result += '<div style="margin-bottom: 10px;">';
        result += '<label style="display: inline-block; width: 150px;">Enable CORS:</label>';
        result += '<input type="checkbox" id="corsEnabled"' + (config.corsEnabled ? ' checked' : '') + ' /> ';
        result += '<span style="color: #9ca3af; font-size: 0.9em;">(Allow cross-origin requests)</span>';
        result += '</div>';
        
        // Custom headers button
        result += '<div>';
        result += '<button onclick="editCustomHeaders(' + owner.id + ')" style="padding: 4px 10px; background: #667eea; color: white; border: none; border-radius: 3px; cursor: pointer;">Edit Custom Headers</button>';
        var headerCount = (config.customHeaders && typeof config.customHeaders === 'object') ? Object.keys(config.customHeaders).length : 0;
        result += '<span style="margin-left: 10px; color: #9ca3af; font-size: 0.9em;">(' + headerCount + ' custom headers set)</span>';
        result += '</div>';
        
        result += '</fieldset>';
        
        // Server Status Section
        result += '<fieldset style="margin-bottom: 15px; padding: 10px; border: 1px solid #3a3d4e; border-radius: 5px; background: #2a2d3e;">';
        result += '<legend style="color: #667eea; font-weight: bold;">Server Control</legend>';

        result += '<div style="margin-bottom: 10px;">';
        result += '<label style="display: inline-block; width: 120px;">Status:</label>';
        if (this.enabled) {
            result += '<span style="color: #4caf50; font-weight: bold;">✓ Running</span>';
            result += ' <button onclick="toggleHTTPServer(' + owner.id + ', false)" style="margin-left: 20px; padding: 6px 12px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Stop Server</button>';
        } else {
            result += '<span style="color: #f44336; font-weight: bold;">✗ Stopped</span>';
            result += ' <button onclick="toggleHTTPServer(' + owner.id + ', true)" style="margin-left: 20px; padding: 6px 12px; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">Start Server</button>';
        }
        result += '</div>';

        result += '<div style="margin-bottom: 10px;">';
        result += '<label style="display: inline-block; width: 120px;">Virtual Hosts:</label>';
        result += '<span>' + (Object.keys(domains).length > 0 ? Object.keys(domains).length + ' configured' : 'None configured') + '</span>';
        result += '</div>';

        // Show active protocols/ports summary
        if (Object.keys(domains).length > 0) {
            var httpDomains = 0;
            var httpsDomains = 0;
            var uniquePorts = [];

            for (var domain in domains) {
                var domainSettings = this.getDomainSettings(domain);
                if (domainSettings.protocol === 'https') {
                    httpsDomains++;
                } else {
                    httpDomains++;
                }
                if (uniquePorts.indexOf(domainSettings.port) === -1) {
                    uniquePorts.push(domainSettings.port);
                }
            }

            result += '<div style="margin-bottom: 10px;">';
            result += '<label style="display: inline-block; width: 120px;">Protocols:</label>';
            result += '<span>';
            if (httpDomains > 0) result += '🌐 HTTP (' + httpDomains + ') ';
            if (httpsDomains > 0) result += '🔒 HTTPS (' + httpsDomains + ')';
            result += '</span>';
            result += '</div>';

            result += '<div style="margin-bottom: 10px;">';
            result += '<label style="display: inline-block; width: 120px;">Active Ports:</label>';
            result += '<span>' + uniquePorts.join(', ') + '</span>';
            result += '</div>';
        }

        result += '</fieldset>';
        
        result += '</div>';
        return result;
    };
    
    this.getAppController2 = function() 
    {
        result = "<table id='httpfiletable' style='font-size:0.8em;'></table>";
        return result;
    };
    
    this.getAppController3 = function(contents, domain, filename) 
    {
        var currentStatusCode = this.getStatusCode(domain, filename) || 200;
        
        var result = '<div style="padding: 10px; background: #1a1d2e; color: #e4e4e7;">';
        
        // Status Code Configuration
        result += '<fieldset style="margin-bottom: 15px; padding: 10px; border: 1px solid #3a3d4e; border-radius: 5px; background: #2a2d3e;">';
        result += '<legend style="color: #667eea; font-weight: bold;">Response Configuration</legend>';
        
        result += '<div style="margin-bottom: 10px;">';
        result += '<label style="display: inline-block; width: 120px;">Status Code:</label>';
        result += '<select id="fileStatusCode" onchange="updateStatusExplanation(parseInt(this.value))" style="padding: 4px; width: 200px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;">';
        
        // Common status codes
        var statusCodes = [
            {code: 200, desc: 'OK'},
            {code: 201, desc: 'Created'},
            {code: 301, desc: 'Moved Permanently'},
            {code: 302, desc: 'Found (Redirect)'},
            {code: 304, desc: 'Not Modified'},
            {code: 400, desc: 'Bad Request'},
            {code: 401, desc: 'Unauthorized'},
            {code: 403, desc: 'Forbidden'},
            {code: 404, desc: 'Not Found'},
            {code: 500, desc: 'Internal Server Error'},
            {code: 502, desc: 'Bad Gateway'},
            {code: 503, desc: 'Service Unavailable'}
        ];
        
        statusCodes.forEach(function(status) {
            var selected = (currentStatusCode === status.code) ? ' selected' : '';
            var color = '';
            if (status.code >= 200 && status.code < 300) color = 'style="color: #4CAF50;"'; // Green for success
            else if (status.code >= 300 && status.code < 400) color = 'style="color: #2196F3;"'; // Blue for redirect
            else if (status.code >= 400 && status.code < 500) color = 'style="color: #FF9800;"'; // Orange for client error
            else if (status.code >= 500) color = 'style="color: #f44336;"'; // Red for server error
            
            result += '<option value="' + status.code + '"' + selected + ' ' + color + '>';
            result += status.code + ' - ' + status.desc;
            result += '</option>';
        });
        
        result += '</select>';
        result += '</div>';
        
        // Status code explanation
        result += '<div style="margin-bottom: 10px; padding: 8px; background: #1e2a3e; border: 1px solid #2e3a4e; border-radius: 4px;">';
        result += '<span id="statusExplanation" style="font-size: 0.9em; color: #9ca3af;">';
        result += this.getStatusExplanation(currentStatusCode);
        result += '</span>';
        result += '</div>';
        
        result += '</fieldset>';
        
        // File Contents
        result += '<fieldset style="padding: 10px; border: 1px solid #3a3d4e; border-radius: 5px; background: #2a2d3e;">';
        result += '<legend style="color: #667eea; font-weight: bold;">File Contents</legend>';
        result += "<textarea id='httpcontents' style='font-size:0.8em;width:100%;height:150px; background: #1a1d2e; color: #e4e4e7; border: 1px solid #3a3d4e; border-radius: 3px;'>";
        result += contents;
        result += "</textarea>";
        result += '</fieldset>';
        
        result += '</div>';
        
        return result;
    };
    
    this.getAppControllerData1 = function() 
    {
        var result = [];
        
        for (var domain in domains) 
        {
            var data = [];
            data.push(domain);
            var files = [];
            for (var filename in domains[domain]) 
            {
                var fileinfo = [];
                fileinfo[0] = filename;
                fileinfo[1] = domains[domain][filename];
                files.push(fileinfo);
            }
            data.push(files);
            result.push(data);
        }
        
        return result;
    };
    
    this.receiveMessage = function(message)
    {
        // Check if server is enabled - if not, don't respond
        if (!this.enabled) {
            // Server is stopped - silently drop the request (no response)
            return;
        }

        var data = message.getData();
        var domain = data.domain;
        var filename = data.filename || data.path;  // Support path for API requests
        var ip = data.ip;
        var code = null;
        var contents = null;

        // Handle API Explorer requests with educational responses
        if (data.isAPIRequest) {
            var method = data.method || 'GET';
            var path = data.path || '/';
            var body = data.body || null;

            // Educational REST API handler
            var apiResponse = this.handleEducationalAPIRequest(method, path, body, data.headers);

            var responsedata = {};
            responsedata.code = apiResponse.status;
            responsedata.contents = apiResponse.body;
            responsedata.body = apiResponse.body;
            responsedata.headers = apiResponse.headers;
            responsedata.description = apiResponse.status + " " + this.getStatusCodeDescription(apiResponse.status);
            responsedata.protocol = data.protocol || 'http';
            responsedata.port = message.getDstPort();
            responsedata.path = path;
            responsedata.isAPIResponse = true;

            // Use request's source MAC as destination - we know exactly where to send the response
            var responseDstMAC = message.getOriginMAC() || owner.getConnectable().getDstMAC(message.getOriginIP());
            var response = new Message(
                "tcp",
                owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
                message.getOriginIP(),
                owner.getConnectable().getMAC(ifacepos),
                responseDstMAC,
                message.getDstPort(),
                message.getOrigPort(),
                responsedata,
                images[IMAGE_ENVELOPEHTTP]
            );

            // Track response packet creation
            response.addPathHop({
                deviceType: 'source',
                deviceName: owner.getName(),
                deviceId: owner.id,
                action: 'created',
                changes: {
                    description: 'HTTP Response created (returning to client)'
                }
            });

            // Link request and response packets
            if (message.setRelatedPacketId && response.setRelatedPacketId) {
                response.setRelatedPacketId(message.getId());
                message.setRelatedPacketId(response.getId());
            }

            owner.getConnectable().getConnector(ifacepos).send(response);
            return;
        }
        
        // Check if the request protocol matches server configuration
        var requestProtocol = data.protocol || 'http';
        var requestPort = message.getDstPort(); // The port this request was sent TO

	// console.log("HTTPServer received request: protocol=" + requestProtocol + ", port=" + requestPort + ", configured for " + config.protocol + "/" + config.port);

        // Check if the domain exists and get its settings
        var domainExists = (domain in domains);
        var domainSettings = this.getDomainSettings(domain);

        // For existing domains, use their specific settings, otherwise use global config
        var expectedPort = domainExists ? domainSettings.port : config.port;
        var expectedProtocol = domainExists ? domainSettings.protocol : config.protocol;
        var protocolMatch = (requestProtocol === expectedProtocol);

        // Determine if this is a protocol mismatch on standard ports
        // We listen on both 80 and 443 to provide helpful error messages
        var isStandardHTTPPort = (requestPort === 80 && requestProtocol === 'http');
        var isStandardHTTPSPort = (requestPort === 443 && requestProtocol === 'https');
        var isConfiguredPort = (requestPort === expectedPort);

        // Check for protocol mismatches
        // If domain exists, check its specific protocol requirements
        // If domain doesn't exist but wrong protocol for global config, also check
        if ((domainExists && !protocolMatch) ||
            (!domainExists && ((isStandardHTTPPort && expectedProtocol === 'https') ||
            (isStandardHTTPSPort && expectedProtocol === 'http')))) {
	// console.log("HTTPServer: Protocol mismatch on standard port - received " + requestProtocol + " on port " + requestPort + ", server expects " + expectedProtocol);
            
            if (expectedProtocol === 'https' && requestProtocol === 'http') {
                // Server expects HTTPS but got HTTP
                code = 426;  // Upgrade Required
                contents = '<html><body><h1>426 Upgrade Required</h1>' +
                    '<p>This server requires HTTPS for secure communication.</p>' +
                    '<p>Please use: <a href="https://' + domain + ':' + expectedPort + '/">https://' + domain + 
                    (expectedPort === 443 ? '' : ':' + expectedPort) + '/</a></p>' +
                    '</body></html>';
            } else if (expectedProtocol === 'http' && requestProtocol === 'https') {
                // Server expects HTTP but got HTTPS
                code = 400;  // Bad Request
                contents = '<html><body><h1>400 Bad Request</h1>' +
                    '<p>This server does not support HTTPS/SSL.</p>' +
                    '<p>Please use: <a href="http://' + domain + ':' + expectedPort + '/">http://' + domain + 
                    (expectedPort === 80 ? '' : ':' + expectedPort) + '/</a></p>' +
                    '</body></html>';
            }
            
            // Send error response for protocol mismatch
            var responsedata = {};
            responsedata.code = code;
            responsedata.contents = contents;
            responsedata.description = code + " " + this.getStatusCodeDescription(code);
            responsedata.protocol = requestProtocol; // Respond with the protocol they used
            responsedata.port = config.port;
            responsedata.isAPIResponse = true;

            // Use request's source MAC as destination - we know exactly where to send the response
            var responseDstMAC = message.getOriginMAC() || owner.getConnectable().getDstMAC(message.getOriginIP());
            var response = new Message(
                "tcp",
                owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
                message.getOriginIP(),
                owner.getConnectable().getMAC(ifacepos),
                responseDstMAC,
                requestPort, // Respond from the port that received the request
                message.getOrigPort(),
                responsedata,
                images[IMAGE_ENVELOPEHTTP]
            );

            // Track response packet creation
            response.addPathHop({
                deviceType: 'source',
                deviceName: owner.getName(),
                deviceId: owner.id,
                action: 'created',
                changes: {
                    description: 'HTTP Response created (' + code + ' error)'
                }
            });

	// console.log("HTTPServer sending protocol mismatch error from port " + requestPort + " to port " + message.getOrigPort() + ", code=" + code);
            owner.getConnectable().getConnector(ifacepos).send(response);
            return;
        }
        
        // Handle requests on non-standard ports or wrong protocol/port combinations
        if (!isConfiguredPort && !isStandardHTTPPort && !isStandardHTTPSPort) {
	// console.log("HTTPServer: Request on unexpected port - received on " + requestPort + ", configured for " + expectedPort);
            code = 421;  // Misdirected Request
            contents = '<html><body><h1>421 Misdirected Request</h1>' +
                '<p>This server is configured to listen on port ' + expectedPort + '.</p>' +
                '<p>Please use: <a href="' + expectedProtocol + '://' + domain + ':' + expectedPort + '/">' + 
                expectedProtocol + '://' + domain + (expectedPort === 80 || expectedPort === 443 ? '' : ':' + expectedPort) + '/</a></p>' +
                '</body></html>';
                
            var responsedata = {};
            responsedata.code = code;
            responsedata.contents = contents;
            responsedata.description = code + " " + this.getStatusCodeDescription(code);
            responsedata.protocol = requestProtocol;
            responsedata.port = requestPort;
            responsedata.isAPIResponse = true;

            // Use request's source MAC as destination - we know exactly where to send the response
            var responseDstMAC = message.getOriginMAC() || owner.getConnectable().getDstMAC(message.getOriginIP());
            var response = new Message(
                "tcp",
                owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
                message.getOriginIP(),
                owner.getConnectable().getMAC(ifacepos),
                responseDstMAC,
                requestPort,
                message.getOrigPort(),
                responsedata,
                images[IMAGE_ENVELOPEHTTP]
            );

            // Track response packet creation
            response.addPathHop({
                deviceType: 'source',
                deviceName: owner.getName(),
                deviceId: owner.id,
                action: 'created',
                changes: {
                    description: 'HTTP Response created (421 port mismatch)'
                }
            });

	// console.log("HTTPServer sending port mismatch error from port " + requestPort + " to port " + message.getOrigPort() + ", code=421");
            owner.getConnectable().getConnector(ifacepos).send(response);
            return;
        }
        
        // Phase 3: Check Host header for virtual host routing
        var hostHeader = data.headers && data.headers['Host'] ? data.headers['Host'].split(':')[0] : domain;
        var authHeader = data.headers && data.headers['Authorization'] ? data.headers['Authorization'] : null;
        
        // Use virtual host if available
        var vhost = config.virtualHosts[hostHeader] || config.virtualHosts[domain];
        
        // Check for authentication first
        if (!this.checkAuthentication(hostHeader, filename, authHeader)) {
            code = 401;
            contents = "<html><body><h1>401 Unauthorized</h1><p>Authentication required</p></body></html>";
            var responsedata = {};
            responsedata.code = code;
            responsedata.contents = contents;
            responsedata.description = code + " " + this.getStatusCodeDescription(code) + " - " + filename;
            responsedata.protocol = config.protocol;
            responsedata.port = config.port;
            responsedata.headers = this.getHeaders(data.filename, null);
            responsedata.headers['WWW-Authenticate'] = 'Basic realm="Protected Area"';
            responsedata.isAPIResponse = true;

            // Use request's source MAC as destination - we know exactly where to send the response
            var responseDstMAC = message.getOriginMAC() || owner.getConnectable().getDstMAC(message.getOriginIP());
            var response = new Message(
                "tcp",
                owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
                message.getOriginIP(),
                owner.getConnectable().getMAC(ifacepos),
                responseDstMAC,
                message.getDstPort(), // Respond from the port that received the request
                message.getOrigPort(),
                responsedata,
                images[IMAGE_ENVELOPEHTTP]
            );

            // Track response packet creation
            response.addPathHop({
                deviceType: 'source',
                deviceName: owner.getName(),
                deviceId: owner.id,
                action: 'created',
                changes: {
                    description: 'HTTP Response created (401 auth required)'
                }
            });

            // Link request and response packets
            if (message.setRelatedPacketId && response.setRelatedPacketId) {
                response.setRelatedPacketId(message.getId());
                message.setRelatedPacketId(response.getId());
            }

            owner.getConnectable().getConnector(ifacepos).send(response);
            return;
        }
        
        // Check for redirects
        if (vhost && vhost.redirects && vhost.redirects[filename]) {
            var redirect = vhost.redirects[filename];
            code = redirect.code || 301;
            contents = "Location: " + redirect.to;
            var responsedata = {};
            responsedata.code = code;
            responsedata.contents = contents;
            responsedata.description = code + " " + this.getStatusCodeDescription(code) + " - " + filename;
            responsedata.protocol = config.protocol;
            responsedata.port = config.port;
            responsedata.headers = this.getHeaders(data.filename, null);
            responsedata.headers['Location'] = redirect.to;
            responsedata.isAPIResponse = true;

            // Use request's source MAC as destination - we know exactly where to send the response
            var responseDstMAC = message.getOriginMAC() || owner.getConnectable().getDstMAC(message.getOriginIP());
            var response = new Message(
                "tcp",
                owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
                message.getOriginIP(),
                owner.getConnectable().getMAC(ifacepos),
                responseDstMAC,
                message.getDstPort(), // Respond from the port that received the request
                message.getOrigPort(),
                responsedata,
                images[IMAGE_ENVELOPEHTTP]
            );

            // Track response packet creation
            response.addPathHop({
                deviceType: 'source',
                deviceName: owner.getName(),
                deviceId: owner.id,
                action: 'created',
                changes: {
                    description: 'HTTP Response created (' + code + ' redirect)'
                }
            });

            // Link request and response packets
            if (message.setRelatedPacketId && response.setRelatedPacketId) {
                response.setRelatedPacketId(message.getId());
                message.setRelatedPacketId(response.getId());
            }

            owner.getConnectable().getConnector(ifacepos).send(response);
            return;
        }
        
        // Check if server is in maintenance mode
        if (config.serverStatus === 'maintenance') {
            code = 503;
            contents = "<html><body><h1>503 Service Unavailable</h1><p>Server is under maintenance</p></body></html>";
        }
        // Phase 3: Check virtual host files first
        else if (vhost && vhost.files && filename in vhost.files) {
            code = this.getStatusCode(hostHeader || domain, filename) || 200;
            contents = vhost.files[filename];
        }
        // Check for custom status code configuration
        else if (this.getStatusCode(domain, filename)) {
            code = this.getStatusCode(domain, filename);
            // For redirects, provide location header info in contents
            if (code === 301 || code === 302) {
                contents = "Location: /redirected-page";
            } else if (code === 401) {
                contents = "<html><body><h1>401 Unauthorized</h1><p>Authentication required</p></body></html>";
            } else if (code === 500) {
                contents = "<html><body><h1>500 Internal Server Error</h1><p>The server encountered an error</p></body></html>";
            } else if (filename in domains[domain]) {
                contents = domains[domain][filename];
            } else {
                contents = "<html><body><h1>" + code + " " + this.getStatusCodeDescription(code) + "</h1></body></html>";
            }
        }
        else if (domain in domains) 
        {
            if (filename in domains[domain]) 
            {
                code = 200;
                contents = domains[domain][filename];
            } 
            else 
            {
                code = 404;
                contents = '<!DOCTYPE html>\n' +
                          '<html lang="en">\n' +
                          '<head>\n' +
                          '    <meta charset="UTF-8">\n' +
                          '    <title>404 Not Found</title>\n' +
                          '</head>\n' +
                          '<body>\n' +
                          '    <h1>Not Found</h1>\n' +
                          '    <p>The requested URL ' + data.filename + ' was not found on this server.</p>\n' +
                          '    <hr>\n' +
                          '    <address>Apache/2.4.41 (Ubuntu) Server at ' + data.domain + ' Port ' + (domainSettings.port || 80) + '</address>\n' +
                          '</body>\n' +
                          '</html>';
            }
        } 
        else 
        {
            if (isValidIPv4(domain)) 
            {
                // Default: 1st domain
                var domainKeys = Object.keys(domains);
                if ((domainKeys.length > 0) && (filename in domains[domainKeys[0]]))
                {
                    code = this.getStatusCode(domainKeys[0], filename) || 200;
                    contents = domains[domainKeys[0]][filename];
                } 
                else 
                {
                    code = 404;
                    contents = '<!DOCTYPE html>\n' +
                              '<html lang="en">\n' +
                              '<head>\n' +
                              '    <meta charset="UTF-8">\n' +
                              '    <title>404 Not Found</title>\n' +
                              '</head>\n' +
                              '<body>\n' +
                              '    <h1>Not Found</h1>\n' +
                              '    <p>The requested URL ' + data.filename + ' was not found on this server.</p>\n' +
                              '    <hr>\n' +
                              '    <address>Apache/2.4.41 (Ubuntu) Server at ' + data.domain + ' Port ' + (domainSettings.port || 80) + '</address>\n' +
                              '</body>\n' +
                              '</html>';
                }
            }
            else
            {
                code = 404;
                contents = '<!DOCTYPE html>\n' +
                          '<html lang="en">\n' +
                          '<head>\n' +
                          '    <meta charset="UTF-8">\n' +
                          '    <title>404 Not Found</title>\n' +
                          '</head>\n' +
                          '<body>\n' +
                          '    <h1>Not Found</h1>\n' +
                          '    <p>The requested URL was not found on this server.</p>\n' +
                          '    <p>Additionally, a 404 Not Found error was encountered while trying to use an ErrorDocument to handle the request.</p>\n' +
                          '    <hr>\n' +
                          '    <address>Apache/2.4.41 (Ubuntu) Server at ' + data.domain + ' Port ' + (config.port || 80) + '</address>\n' +
                          '</body>\n' +
                          '</html>';
            }
        }
        
        // Protocol mismatches are now handled earlier with error responses
        // No need for warnings in successful responses
        
        var responsedata = {};
        responsedata.code = code;
        responsedata.contents = contents;
        responsedata.description = code + " " + this.getStatusCodeDescription(code) + " - " + filename;
        responsedata.isAPIResponse = true;

        // Use per-domain settings for protocol and port
        var domainSettings = this.getDomainSettings(domain);
        responsedata.protocol = domainSettings.protocol || config.protocol;
        responsedata.port = domainSettings.port || config.port;

        // Phase 2: Include headers and SSL info
        responsedata.headers = this.getHeaders(data.filename, contents);
        if (domainSettings.protocol === 'https') {
            // Use per-domain certificate
            var cert = this.getDomainCertificate(domain);
            responsedata.sslCertificate = {
                selfSigned: cert.selfSigned,
                issuer: cert.issuer,
                subject: cert.subject || domain,
                hostId: owner.id // Include host ID for certificate validation
            };
            // Mark HTTPS content as encrypted for MITM simulation
            responsedata.isEncrypted = true;
            // Store the encrypted view for interception/MITM scenarios
            responsedata.encryptedView = "[ENCRYPTED HTTPS DATA - " + responsedata.contents.length + " bytes]";
            // Keep the actual content for the legitimate browser to display
            // The browser will show decrypted content after SSL/TLS handshake
            responsedata.decryptedContent = responsedata.contents;
        }
        
        // Use request's source MAC as destination - we know exactly where to send the response
        var responseDstMAC = message.getOriginMAC() || owner.getConnectable().getDstMAC(message.getOriginIP());
        var response = new Message(
        "tcp",
        owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
        message.getOriginIP(),
        owner.getConnectable().getMAC(ifacepos),
        responseDstMAC,
        message.getDstPort(), // Respond from the port that received the request
        message.getOrigPort(),
        responsedata,
        images[IMAGE_ENVELOPEHTTP]
        );

        // Track response packet creation
        response.addPathHop({
            deviceType: 'source',
            deviceName: owner.getName(),
            deviceId: owner.id,
            action: 'created',
            changes: {
                description: 'HTTP Response created (' + code + ' ' + this.getStatusCodeDescription(code) + ')'
            }
        });

        // Link request and response packets
        if (message.setRelatedPacketId && response.setRelatedPacketId) {
            response.setRelatedPacketId(message.getId());
            message.setRelatedPacketId(response.getId());
        }

	// console.log("HTTPServer sending response from port " + message.getDstPort() + " to port " + message.getOrigPort() + ", code=" + responsedata.code);
        owner.getConnectable().getConnector(ifacepos).send(response);
    };
    
    this.getAppDescription = function()
    {
        return "HTTP Server";
    };
    
    // Phase 3: Virtual Hosts Management UI  
    this.manageVirtualHosts = function() {
        var div = document.createElement("div");
        div.setAttribute("id", "virtual_hosts_dialog");
        div.setAttribute("style", "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;max-height:80vh;overflow-y:auto;background:linear-gradient(145deg, #2a2d3a, #1a1d2a);border:2px solid #667eea;border-radius:12px;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,0.3);z-index:110;");
        
        var html = "<div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;'>";
        html += "<h3 style='color:#667eea;margin:0;'>Virtual Hosts Configuration</h3>";
        html += "<button onclick='document.body.removeChild(document.getElementById(\"virtual_hosts_dialog\"));' style='background:transparent;border:none;color:#ff6b6b;font-size:24px;cursor:pointer;'>&times;</button>";
        html += "</div>";
        
        html += "<div style='margin-bottom:20px;'>";
        html += "<h4 style='color:#a0a0a0;margin-bottom:10px;'>Add Virtual Host</h4>";
        html += "<div style='display:flex;gap:10px;'>";
        html += "<input type='text' id='new_vhost_domain' placeholder='example.com' style='flex:1;padding:8px;background:#1a1d2a;border:1px solid #667eea;border-radius:4px;color:white;' />";
        html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").addNewVirtualHost()' style='padding:8px 16px;background:linear-gradient(135deg, #667eea, #764ba2);color:white;border:none;border-radius:4px;cursor:pointer;'>Add Domain</button>";
        html += "</div>";
        html += "</div>";
        
        html += "<div style='margin-bottom:20px;'>";
        html += "<h4 style='color:#a0a0a0;margin-bottom:10px;'>Existing Virtual Hosts</h4>";
        html += "<div id='vhosts_list' style='max-height:300px;overflow-y:auto;'>";
        
        // List existing virtual hosts
        for (var domain in config.virtualHosts) {
            var vhost = config.virtualHosts[domain];
            html += "<div style='background:#1a1d2a;padding:10px;margin-bottom:10px;border-radius:6px;border:1px solid #3a3d4a;'>";
            html += "<div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;'>";
            html += "<strong style='color:#667eea;'>" + domain + "</strong>";
            html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").removeVirtualHost(\"" + domain + "\")' style='background:#ff6b6b;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:12px;'>Remove</button>";
            html += "</div>";
            
            // Document root and authentication
            html += "<div style='font-size:12px;color:#a0a0a0;margin-bottom:5px;'>";
            html += "Document Root: <span style='color:#68d391;'>" + (vhost.documentRoot || '/') + "</span>";
            if (vhost.requiresAuth) {
                var userCount = vhost.authUsers ? Object.keys(vhost.authUsers).length : 0;
                html += " | <span style='color:#fbbf24;'>🔒 Protected (" + userCount + " user" + (userCount !== 1 ? 's' : '') + ")</span>";
            } else {
                html += " | <span style='color:#6b7280;'>🔓 Public</span>";
            }
            html += "</div>";
            
            // Files in this virtual host
            if (vhost.files && Object.keys(vhost.files).length > 0) {
                html += "<div style='font-size:11px;color:#888;margin-top:5px;'>Files: ";
                for (var file in vhost.files) {
                    html += "<span style='background:#2a2d3a;padding:2px 6px;border-radius:3px;margin-right:4px;'>" + file + "</span>";
                }
                html += "</div>";
            }
            
            // Redirects
            if (vhost.redirects && Object.keys(vhost.redirects).length > 0) {
                html += "<div style='font-size:11px;color:#888;margin-top:5px;'>Redirects configured: " + Object.keys(vhost.redirects).length + "</div>";
            }
            
            html += "<div style='margin-top:10px;display:flex;gap:5px;'>";
            html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").editVirtualHostFiles(\"" + domain + "\")' style='padding:4px 8px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;font-size:11px;'>Manage Files</button>";
            html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").configureVHostAuth(\"" + domain + "\")' style='padding:4px 8px;background:#764ba2;color:white;border:none;border-radius:4px;cursor:pointer;font-size:11px;'>Authentication</button>";
            html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").configureVHostRedirects(\"" + domain + "\")' style='padding:4px 8px;background:#f59e0b;color:white;border:none;border-radius:4px;cursor:pointer;font-size:11px;'>Redirects</button>";
            html += "</div>";
            
            html += "</div>";
        }
        
        if (Object.keys(config.virtualHosts).length === 0) {
            html += "<div style='color:#888;text-align:center;padding:20px;'>No virtual hosts configured. Add a domain to get started.</div>";
        }
        
        html += "</div>";
        html += "</div>";
        
        html += "<div style='background:#1a1d2a;padding:10px;border-radius:6px;margin-top:20px;'>";
        html += "<div style='font-size:12px;color:#a0a0a0;'><strong>ℹ️ Virtual Hosts Info:</strong></div>";
        html += "<div style='font-size:11px;color:#888;margin-top:5px;'>Virtual hosts allow the server to host multiple domains. The server uses the Host header to route requests to the correct virtual host.</div>";
        html += "</div>";
        
        div.innerHTML = html;
        document.body.appendChild(div);
    };
    
    this.addNewVirtualHost = function() {
        var domain = document.getElementById('new_vhost_domain').value.trim();
        if (!domain) {
            alert('Please enter a domain name');
            return;
        }
        
        this.addVirtualHost(domain, '/');
        document.getElementById('new_vhost_domain').value = '';
        
        // Refresh the dialog
        document.body.removeChild(document.getElementById('virtual_hosts_dialog'));
        this.manageVirtualHosts();
    };
    
    this.removeVirtualHost = function(domain) {
        if (confirm('Remove virtual host ' + domain + '?')) {
            delete config.virtualHosts[domain];
            
            // Refresh the dialog
            document.body.removeChild(document.getElementById('virtual_hosts_dialog'));
            this.manageVirtualHosts();
        }
    };
    
    this.editVirtualHostFiles = function(domain) {
        var vhost = config.virtualHosts[domain];
        if (!vhost) return;
        
        var div = document.createElement("div");
        div.setAttribute("id", "vhost_files_dialog");
        div.setAttribute("style", "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;max-height:70vh;overflow-y:auto;background:linear-gradient(145deg, #2a2d3a, #1a1d2a);border:2px solid #667eea;border-radius:12px;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,0.3);z-index:111;");
        
        var html = "<div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;'>";
        html += "<h3 style='color:#667eea;margin:0;'>Files for " + domain + "</h3>";
        html += "<button onclick='document.body.removeChild(document.getElementById(\"vhost_files_dialog\"));' style='background:transparent;border:none;color:#ff6b6b;font-size:24px;cursor:pointer;'>&times;</button>";
        html += "</div>";
        
        html += "<div style='margin-bottom:15px;'>";
        html += "<input type='text' id='vhost_new_file' placeholder='index.html' style='width:70%;padding:8px;background:#1a1d2a;border:1px solid #667eea;border-radius:4px;color:white;margin-right:10px;' />";
        html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").addVHostFile(\"" + domain + "\")' style='padding:8px 16px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;'>Add File</button>";
        html += "</div>";
        
        html += "<div id='vhost_files_list'>";
        if (vhost.files) {
            for (var file in vhost.files) {
                html += "<div style='background:#1a1d2a;padding:10px;margin-bottom:10px;border-radius:6px;display:flex;justify-content:space-between;align-items:center;'>";
                html += "<span style='color:#68d391;'>" + file + "</span>";
                html += "<div>";
                html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").editVHostFileContent(\"" + domain + "\", \"" + file + "\")' style='padding:4px 8px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;font-size:11px;margin-right:5px;'>Edit</button>";
                html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").removeVHostFile(\"" + domain + "\", \"" + file + "\")' style='padding:4px 8px;background:#ff6b6b;color:white;border:none;border-radius:4px;cursor:pointer;font-size:11px;'>Delete</button>";
                html += "</div>";
                html += "</div>";
            }
        }
        html += "</div>";
        
        div.innerHTML = html;
        document.body.appendChild(div);
    };
    
    this.addVHostFile = function(domain) {
        var filename = document.getElementById('vhost_new_file').value.trim();
        if (!filename) return;
        
        if (!config.virtualHosts[domain].files) {
            config.virtualHosts[domain].files = {};
        }
        
        config.virtualHosts[domain].files[filename] = "<html><body><h1>Welcome to " + domain + "</h1><p>" + filename + "</p></body></html>";
        
        document.body.removeChild(document.getElementById('vhost_files_dialog'));
        this.editVirtualHostFiles(domain);
    };
    
    this.removeVHostFile = function(domain, filename) {
        if (config.virtualHosts[domain] && config.virtualHosts[domain].files) {
            delete config.virtualHosts[domain].files[filename];
        }
        
        document.body.removeChild(document.getElementById('vhost_files_dialog'));
        this.editVirtualHostFiles(domain);
    };
    
    this.editVHostFileContent = function(domain, filename) {
        var content = config.virtualHosts[domain].files[filename] || '';
        
        var div = document.createElement("div");
        div.setAttribute("id", "file_content_dialog");
        div.setAttribute("style", "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;background:linear-gradient(145deg, #2a2d3a, #1a1d2a);border:2px solid #667eea;border-radius:12px;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,0.3);z-index:112;");
        
        var html = "<div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;'>";
        html += "<h3 style='color:#667eea;margin:0;'>Edit: " + filename + "</h3>";
        html += "<button onclick='document.body.removeChild(document.getElementById(\"file_content_dialog\"));' style='background:transparent;border:none;color:#ff6b6b;font-size:24px;cursor:pointer;'>&times;</button>";
        html += "</div>";
        
        html += "<textarea id='file_content_text' style='width:100%;height:300px;padding:10px;background:#1a1d2a;border:1px solid #667eea;border-radius:4px;color:white;font-family:monospace;font-size:12px;'>" + content.replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</textarea>";
        
        html += "<div style='display:flex;justify-content:flex-end;gap:10px;margin-top:15px;'>";
        html += "<button onclick='document.body.removeChild(document.getElementById(\"file_content_dialog\"));' style='padding:8px 16px;background:#6b7280;color:white;border:none;border-radius:4px;cursor:pointer;'>Cancel</button>";
        html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").saveVHostFileContent(\"" + domain + "\", \"" + filename + "\")' style='padding:8px 16px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;'>Save</button>";
        html += "</div>";
        
        div.innerHTML = html;
        document.body.appendChild(div);
    };
    
    this.saveVHostFileContent = function(domain, filename) {
        var content = document.getElementById('file_content_text').value;
        config.virtualHosts[domain].files[filename] = content;
        
        document.body.removeChild(document.getElementById('file_content_dialog'));
    };
    
    // Phase 3: Authentication Configuration UI
    this.configureAuthentication = function() {
        var div = document.createElement("div");
        div.setAttribute("id", "auth_dialog");
        div.setAttribute("style", "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;max-height:70vh;overflow-y:auto;background:linear-gradient(145deg, #2a2d3a, #1a1d2a);border:2px solid #667eea;border-radius:12px;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,0.3);z-index:110;");
        
        var html = "<div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;'>";
        html += "<h3 style='color:#667eea;margin:0;'>Authentication Configuration</h3>";
        html += "<button onclick='document.body.removeChild(document.getElementById(\"auth_dialog\"));' style='background:transparent;border:none;color:#ff6b6b;font-size:24px;cursor:pointer;'>&times;</button>";
        html += "</div>";
        
        html += "<div style='margin-bottom:20px;'>";
        html += "<h4 style='color:#a0a0a0;margin-bottom:10px;'>Add User Credentials</h4>";
        html += "<div style='display:grid;grid-template-columns:1fr 1fr auto;gap:10px;'>";
        html += "<input type='text' id='auth_username' placeholder='Username' style='padding:8px;background:#1a1d2a;border:1px solid #667eea;border-radius:4px;color:white;' />";
        html += "<input type='password' id='auth_password' placeholder='Password' style='padding:8px;background:#1a1d2a;border:1px solid #667eea;border-radius:4px;color:white;' />";
        html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").addAuthUser()' style='padding:8px 16px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;'>Add</button>";
        html += "</div>";
        html += "</div>";
        
        html += "<div style='margin-bottom:20px;'>";
        html += "<h4 style='color:#a0a0a0;margin-bottom:10px;'>Existing Users</h4>";
        html += "<div id='auth_users_list'>";
        
        if (config.authentication.users && Object.keys(config.authentication.users).length > 0) {
            for (var username in config.authentication.users) {
                html += "<div style='background:#1a1d2a;padding:10px;margin-bottom:10px;border-radius:6px;display:flex;justify-content:space-between;align-items:center;'>";
                html += "<span style='color:#68d391;'>👤 " + username + "</span>";
                html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").removeAuthUser(\"" + username + "\")' style='padding:4px 8px;background:#ff6b6b;color:white;border:none;border-radius:4px;cursor:pointer;font-size:11px;'>Remove</button>";
                html += "</div>";
            }
        } else {
            html += "<div style='color:#888;text-align:center;padding:20px;'>No users configured</div>";
        }
        
        html += "</div>";
        html += "</div>";
        
        // Add Clear All button if there are any auth settings
        if ((config.authentication.users && Object.keys(config.authentication.users).length > 0) || 
            (config.authentication && Object.keys(config.authentication).length > 0)) {
            html += "<div style='margin-bottom:20px;text-align:center;'>";
            html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").clearAllAuthentication()' style='padding:8px 16px;background:#ff6b6b;color:white;border:none;border-radius:4px;cursor:pointer;'>🗑️ Clear All Authentication</button>";
            html += "</div>";
        }
        
        html += "<div style='background:#1a1d2a;padding:10px;border-radius:6px;'>";
        html += "<div style='font-size:12px;color:#a0a0a0;'><strong>ℹ️ Basic Authentication:</strong></div>";
        html += "<div style='font-size:11px;color:#888;margin-top:5px;'>Configure users who can access protected resources. Authentication can be applied per virtual host or per file.</div>";
        html += "</div>";
        
        div.innerHTML = html;
        document.body.appendChild(div);
    };
    
    this.addAuthUser = function() {
        var username = document.getElementById('auth_username').value.trim();
        var password = document.getElementById('auth_password').value.trim();
        
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
        
        // Initialize authentication if needed
        if (!config.authentication) {
            config.authentication = {};
        }
        
        if (!config.authentication.users) {
            config.authentication.users = {};
        }
        
        config.authentication.users[username] = password;
        
        document.getElementById('auth_username').value = '';
        document.getElementById('auth_password').value = '';
        
        // Refresh the dialog
        document.body.removeChild(document.getElementById('auth_dialog'));
        this.configureAuthentication();
    };
    
    this.removeAuthUser = function(username) {
        if (confirm('Remove user ' + username + '?')) {
            delete config.authentication.users[username];
            
            // Refresh the dialog
            document.body.removeChild(document.getElementById('auth_dialog'));
            this.configureAuthentication();
        }
    };
    
    this.clearAllAuthentication = function() {
        if (confirm('Clear all authentication settings? This will remove all users and protected paths.')) {
            // Completely reset authentication to empty object
            config.authentication = {};
            
            // Clear any virtual host authentication
            for (var hostname in config.virtualHosts) {
                if (config.virtualHosts[hostname]) {
                    config.virtualHosts[hostname].requiresAuth = false;
                    config.virtualHosts[hostname].auth = {};
                }
            }
            
            // Refresh the dialog
            if (document.getElementById('auth_dialog')) {
                document.body.removeChild(document.getElementById('auth_dialog'));
                this.configureAuthentication();
            }
        }
    };
    
    this.configureVHostAuth = function(domain) {
        var vhost = config.virtualHosts[domain];
        if (!vhost) return;

        // Initialize auth users if not present
        if (!vhost.authUsers) {
            vhost.authUsers = {};
        }

        var div = document.createElement("div");
        div.setAttribute("id", "vhost_auth_dialog");
        div.setAttribute("style", "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;max-height:70vh;overflow-y:auto;background:linear-gradient(145deg, #2a2d3a, #1a1d2a);border:2px solid #667eea;border-radius:12px;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,0.3);z-index:111;");

        var html = "<div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;'>";
        html += "<h3 style='color:#667eea;margin:0;'>🔐 Authentication: " + domain + "</h3>";
        html += "<button onclick='document.body.removeChild(document.getElementById(\"vhost_auth_dialog\"));' style='background:transparent;border:none;color:#ff6b6b;font-size:24px;cursor:pointer;'>&times;</button>";
        html += "</div>";

        // Enable/Disable authentication checkbox
        html += "<div style='margin-bottom:20px;padding:15px;background:#1a1d2a;border-radius:8px;'>";
        html += "<label style='display:flex;align-items:center;color:#e4e4e7;cursor:pointer;font-weight:bold;'>";
        html += "<input type='checkbox' id='vhost_auth_enabled' " + (vhost.requiresAuth ? "checked" : "") + " onchange='toggleVHostAuthFields()' style='margin-right:10px;' />";
        html += "Enable authentication for this domain";
        html += "</label>";
        html += "</div>";

        // Authentication realm
        html += "<div id='vhost_auth_fields' style='" + (vhost.requiresAuth ? "" : "opacity:0.5;pointer-events:none;") + "'>";

        html += "<div style='margin-bottom:20px;'>";
        html += "<label style='color:#a0a0a0;display:block;margin-bottom:5px;'>Authentication Realm:</label>";
        html += "<input type='text' id='vhost_auth_realm' value='" + (vhost.authRealm || 'Protected Area') + "' placeholder='Protected Area' style='width:100%;padding:8px;background:#1a1d2a;border:1px solid #667eea;border-radius:4px;color:white;' />";
        html += "</div>";

        // User Management Section
        html += "<div style='margin-bottom:20px;'>";
        html += "<h4 style='color:#a0a0a0;margin-bottom:15px;'>User Accounts</h4>";

        // Add new user form
        html += "<div style='display:flex;gap:5px;margin-bottom:15px;'>";
        html += "<input type='text' id='new_vhost_username' placeholder='Username' style='flex:1;padding:6px;background:#1a1d2a;border:1px solid #667eea;border-radius:4px;color:white;font-size:12px;' />";
        html += "<input type='password' id='new_vhost_password' placeholder='Password' style='flex:1;padding:6px;background:#1a1d2a;border:1px solid #667eea;border-radius:4px;color:white;font-size:12px;' />";
        html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").addVHostAuthUser(\"" + domain + "\")' style='padding:6px 12px;background:#4ade80;color:black;border:none;border-radius:4px;cursor:pointer;font-size:12px;'>Add User</button>";
        html += "</div>";

        // List existing users
        html += "<div id='vhost_users_list' style='max-height:200px;overflow-y:auto;'>";
        var userCount = Object.keys(vhost.authUsers).length;
        if (userCount > 0) {
            for (var username in vhost.authUsers) {
                html += "<div style='display:flex;justify-content:space-between;align-items:center;padding:8px;background:#0a0d1a;margin-bottom:5px;border-radius:4px;'>";
                html += "<span style='color:#e4e4e7;'>👤 " + username + "</span>";
                html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").removeVHostAuthUser(\"" + domain + "\", \"" + username + "\")' style='background:#ff6b6b;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:11px;'>Remove</button>";
                html += "</div>";
            }
        } else {
            html += "<div style='color:#888;text-align:center;padding:20px;background:#0a0d1a;border-radius:4px;'>No users configured</div>";
        }
        html += "</div>";
        html += "</div>";

        // Protected Paths Section
        html += "<div style='margin-bottom:20px;'>";
        html += "<h4 style='color:#a0a0a0;margin-bottom:10px;'>Protected Paths</h4>";
        html += "<div style='background:#0a0d1a;padding:10px;border-radius:4px;'>";
        html += "<div style='color:#888;font-size:12px;'>🔒 All paths under this domain (/*) will require authentication</div>";
        html += "</div>";
        html += "</div>";

        html += "</div>"; // End of auth fields div

        html += "<div style='display:flex;justify-content:flex-end;gap:10px;margin-top:20px;'>";
        html += "<button onclick='document.body.removeChild(document.getElementById(\"vhost_auth_dialog\"));' style='padding:8px 16px;background:#6b7280;color:white;border:none;border-radius:4px;cursor:pointer;'>Close</button>";
        html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").saveVHostAuth(\"" + domain + "\")' style='padding:8px 16px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;'>Save Settings</button>";
        html += "</div>";

        div.innerHTML = html;
        document.body.appendChild(div);
    };
    
    this.saveVHostAuth = function(domain) {
        var vhost = config.virtualHosts[domain];
        if (!vhost) return;

        vhost.requiresAuth = document.getElementById('vhost_auth_enabled').checked;
        vhost.authRealm = document.getElementById('vhost_auth_realm').value || 'Protected Area';

        // Update the main configuration UI if it's open
        if (document.querySelector('#divhttpserverinfo')) {
            // Trigger a refresh of the main config to update the auth counter
            var authCountSpan = document.querySelector('#divhttpserverinfo span[style*="margin-left: 10px"]');
            if (authCountSpan) {
                // Recalculate the auth text
                var protectedCount = 0;
                for (var d in config.virtualHosts) {
                    if (config.virtualHosts[d].requiresAuth) {
                        protectedCount++;
                    }
                }
                var userCount = 0;
                if (config.authentication && config.authentication.users) {
                    userCount = Object.keys(config.authentication.users).length;
                }

                var authText = '';
                if (protectedCount > 0) {
                    authText = protectedCount + ' protected domain' + (protectedCount !== 1 ? 's' : '');
                }
                if (userCount > 0) {
                    if (authText) authText += ', ';
                    authText += userCount + ' user' + (userCount !== 1 ? 's' : '');
                }
                if (!authText) {
                    authText = 'No authentication configured';
                }

                // Find and update the authentication counter span
                var authButton = document.querySelector('button[onclick*="configureAuthentication"]');
                if (authButton && authButton.nextElementSibling) {
                    authButton.nextElementSibling.textContent = '(' + authText + ')';
                }
            }
        }

        document.body.removeChild(document.getElementById('vhost_auth_dialog'));
    };

    this.addVHostAuthUser = function(domain) {
        var vhost = config.virtualHosts[domain];
        if (!vhost) return;

        var username = document.getElementById('new_vhost_username').value.trim();
        var password = document.getElementById('new_vhost_password').value.trim();

        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }

        if (!vhost.authUsers) {
            vhost.authUsers = {};
        }

        vhost.authUsers[username] = password;

        // Clear the input fields
        document.getElementById('new_vhost_username').value = '';
        document.getElementById('new_vhost_password').value = '';

        // Refresh the users list
        this.refreshVHostUsersList(domain);
    };

    this.removeVHostAuthUser = function(domain, username) {
        var vhost = config.virtualHosts[domain];
        if (!vhost || !vhost.authUsers) return;

        if (confirm('Remove user ' + username + '?')) {
            delete vhost.authUsers[username];
            this.refreshVHostUsersList(domain);
        }
    };

    this.refreshVHostUsersList = function(domain) {
        var vhost = config.virtualHosts[domain];
        if (!vhost) return;

        var listDiv = document.getElementById('vhost_users_list');
        if (!listDiv) return;

        var html = '';
        var userCount = vhost.authUsers ? Object.keys(vhost.authUsers).length : 0;

        if (userCount > 0) {
            for (var username in vhost.authUsers) {
                html += "<div style='display:flex;justify-content:space-between;align-items:center;padding:8px;background:#0a0d1a;margin-bottom:5px;border-radius:4px;'>";
                html += "<span style='color:#e4e4e7;'>👤 " + username + "</span>";
                html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").removeVHostAuthUser(\"" + domain + "\", \"" + username + "\")' style='background:#ff6b6b;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:11px;'>Remove</button>";
                html += "</div>";
            }
        } else {
            html += "<div style='color:#888;text-align:center;padding:20px;background:#0a0d1a;border-radius:4px;'>No users configured</div>";
        }

        listDiv.innerHTML = html;
    };
    
    this.configureVHostRedirects = function(domain) {
        var vhost = config.virtualHosts[domain];
        if (!vhost) return;
        
        var div = document.createElement("div");
        div.setAttribute("id", "vhost_redirects_dialog");
        div.setAttribute("style", "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;max-height:70vh;overflow-y:auto;background:linear-gradient(145deg, #2a2d3a, #1a1d2a);border:2px solid #667eea;border-radius:12px;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,0.3);z-index:111;");
        
        var html = "<div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;'>";
        html += "<h3 style='color:#667eea;margin:0;'>Redirects: " + domain + "</h3>";
        html += "<button onclick='document.body.removeChild(document.getElementById(\"vhost_redirects_dialog\"));' style='background:transparent;border:none;color:#ff6b6b;font-size:24px;cursor:pointer;'>&times;</button>";
        html += "</div>";
        
        html += "<div style='margin-bottom:15px;'>";
        html += "<div style='display:grid;grid-template-columns:1fr 1fr auto auto;gap:10px;margin-bottom:10px;'>";
        html += "<input type='text' id='redirect_from' placeholder='/old-page' style='padding:8px;background:#1a1d2a;border:1px solid #667eea;border-radius:4px;color:white;' />";
        html += "<input type='text' id='redirect_to' placeholder='/new-page' style='padding:8px;background:#1a1d2a;border:1px solid #667eea;border-radius:4px;color:white;' />";
        html += "<select id='redirect_code' style='padding:8px;background:#1a1d2a;border:1px solid #667eea;border-radius:4px;color:white;'>";
        html += "<option value='301'>301</option>";
        html += "<option value='302'>302</option>";
        html += "</select>";
        html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").addVHostRedirect(\"" + domain + "\")' style='padding:8px 16px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;'>Add</button>";
        html += "</div>";
        html += "</div>";
        
        html += "<div id='redirects_list'>";
        if (vhost.redirects && Object.keys(vhost.redirects).length > 0) {
            for (var from in vhost.redirects) {
                var redirect = vhost.redirects[from];
                html += "<div style='background:#1a1d2a;padding:10px;margin-bottom:10px;border-radius:6px;display:flex;justify-content:space-between;align-items:center;'>";
                html += "<span style='color:#fbbf24;'>" + from + " → " + redirect.to + " (" + redirect.code + ")</span>";
                html += "<button onclick='network.getElement(" + owner.id + ").getApp(\"HTTPServer\").removeVHostRedirect(\"" + domain + "\", \"" + from + "\")' style='padding:4px 8px;background:#ff6b6b;color:white;border:none;border-radius:4px;cursor:pointer;font-size:11px;'>Remove</button>";
                html += "</div>";
            }
        } else {
            html += "<div style='color:#888;text-align:center;padding:20px;'>No redirects configured</div>";
        }
        html += "</div>";
        
        div.innerHTML = html;
        document.body.appendChild(div);
    };
    
    this.addVHostRedirect = function(domain) {
        var from = document.getElementById('redirect_from').value.trim();
        var to = document.getElementById('redirect_to').value.trim();
        var code = parseInt(document.getElementById('redirect_code').value);
        
        if (!from || !to) {
            alert('Please enter both source and destination URLs');
            return;
        }
        
        this.setRedirect(domain, from, to, code);
        
        document.body.removeChild(document.getElementById('vhost_redirects_dialog'));
        this.configureVHostRedirects(domain);
    };
    
    this.removeVHostRedirect = function(domain, from) {
        if (config.virtualHosts[domain] && config.virtualHosts[domain].redirects) {
            delete config.virtualHosts[domain].redirects[from];
        }

        document.body.removeChild(document.getElementById('vhost_redirects_dialog'));
        this.configureVHostRedirects(domain);
    };

    // Store custom API endpoints
    this.apiEndpoints = {};

    // Add a custom API endpoint
    this.addAPIEndpoint = function(path, method, status, responseBody) {
        if (!this.apiEndpoints[path]) {
            this.apiEndpoints[path] = {};
        }
        this.apiEndpoints[path][method] = {
            status: status,
            body: responseBody || '{"message": "OK"}'
        };
    };

    // Remove a custom API endpoint
    this.removeAPIEndpoint = function(path, method) {
        if (this.apiEndpoints[path]) {
            delete this.apiEndpoints[path][method];
            if (Object.keys(this.apiEndpoints[path]).length === 0) {
                delete this.apiEndpoints[path];
            }
        }
    };

    // Get list of configured endpoints for UI
    this.getAPIEndpointsList = function() {
        var html = '';

        if (Object.keys(this.apiEndpoints).length === 0) {
            html = '<div style="color: #9ca3af; text-align: center; padding: 20px;">No custom endpoints configured. Using default educational API.</div>';
        } else {
            for (var path in this.apiEndpoints) {
                for (var method in this.apiEndpoints[path]) {
                    var endpoint = this.apiEndpoints[path][method];
                    var statusColor = '#4CAF50';
                    if (endpoint.status >= 400) statusColor = '#FF9800';
                    if (endpoint.status >= 500) statusColor = '#F44336';

                    html += '<div style="background: #1a1d2e; padding: 10px; margin-bottom: 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">';
                    html += '<div>';
                    html += '<span style="background: ' + this.getMethodColor(method) + '; color: white; padding: 2px 6px; border-radius: 3px; font-size: 11px; font-weight: bold; margin-right: 8px;">' + method + '</span>';
                    html += '<span style="color: #e4e4e7; font-family: monospace;">' + path + '</span>';
                    html += '<span style="color: ' + statusColor + '; margin-left: 10px; font-size: 12px;">→ ' + endpoint.status + '</span>';
                    html += '</div>';
                    html += '<button onclick="removeAPIEndpoint(' + owner.id + ', \'' + path + '\', \'' + method + '\')" style="padding: 4px 8px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">Remove</button>';
                    html += '</div>';
                }
            }
        }

        return html;
    };

    // Helper to get method color
    this.getMethodColor = function(method) {
        var colors = {
            'GET': '#4CAF50',
            'POST': '#2196F3',
            'PUT': '#FF9800',
            'PATCH': '#9C27B0',
            'DELETE': '#F44336',
            'HEAD': '#607D8B',
            'OPTIONS': '#795548'
        };
        return colors[method] || '#666';
    };

    // Educational API handler for REST methods
    this.handleEducationalAPIRequest = function(method, path, body, headers) {
        // First check if there's a custom endpoint configured
        if (this.apiEndpoints[path] && this.apiEndpoints[path][method]) {
            var endpoint = this.apiEndpoints[path][method];
            var responseBody = endpoint.body;

            // Try to parse as JSON if it's a string
            if (typeof responseBody === 'string') {
                try {
                    responseBody = JSON.parse(responseBody);
                } catch(e) {
                    // Keep as string if not valid JSON
                }
            }

            return {
                status: endpoint.status,
                headers: {
                    'Content-Type': 'application/json',
                    'Server': 'NetworkSimulator Custom API/1.0',
                    'X-Custom-Endpoint': 'true'
                },
                body: typeof responseBody === 'object' ? JSON.stringify(responseBody, null, 2) : responseBody
            };
        }

        // Fall back to default educational API
        // In-memory mock database for educational purposes
        if (!this.apiDatabase) {
            this.apiDatabase = {
                users: [
                    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28 },
                    { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 32 },
                    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 25 }
                ],
                posts: [
                    { id: 1, userId: 1, title: 'Learning REST APIs', content: 'REST APIs are awesome!' },
                    { id: 2, userId: 2, title: 'Network Simulation', content: 'Building virtual networks is fun!' }
                ]
            };
            this.apiIdCounters = { users: 4, posts: 3 };
        }

        var response = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Server': 'NetworkSimulator Educational API/1.0',
                'Date': new Date().toUTCString(),
                'X-Educational': 'This is a teaching server for learning REST'
            },
            body: null
        };

        // Parse path to extract resource and ID
        var pathParts = path.split('/').filter(p => p);
        var resource = pathParts[0] === 'api' ? pathParts[1] : pathParts[0];
        var resourceId = pathParts[0] === 'api' ? pathParts[2] : pathParts[1];

        // Handle different HTTP methods
        switch(method) {
            case 'GET':
                if (!resource || resource === '/') {
                    // Root endpoint - show available resources
                    response.body = {
                        message: 'Welcome to the Educational REST API!',
                        availableEndpoints: {
                            'GET /api/users': 'List all users',
                            'GET /api/users/{id}': 'Get specific user',
                            'POST /api/users': 'Create new user',
                            'PUT /api/users/{id}': 'Update user',
                            'PATCH /api/users/{id}': 'Partially update user',
                            'DELETE /api/users/{id}': 'Delete user',
                            'GET /api/posts': 'List all posts',
                            'OPTIONS /api/users': 'Get allowed methods'
                        }
                    };
                } else if (resource === 'users') {
                    if (resourceId) {
                        // Get specific user
                        var user = this.apiDatabase.users.find(u => u.id == resourceId);
                        if (user) {
                            response.body = user;
                        } else {
                            response.status = 404;
                            response.body = { error: 'User not found', id: resourceId };
                        }
                    } else {
                        // List all users
                        response.body = {
                            data: this.apiDatabase.users,
                            total: this.apiDatabase.users.length,
                            method: 'GET',
                            explanation: 'GET retrieves data without modifying it (safe & idempotent)'
                        };
                    }
                } else if (resource === 'posts') {
                    response.body = {
                        data: this.apiDatabase.posts,
                        total: this.apiDatabase.posts.length
                    };
                } else {
                    response.status = 404;
                    response.body = { error: 'Resource not found: ' + resource };
                }
                break;

            case 'POST':
                if (resource === 'users') {
                    if (!body || !body.name) {
                        response.status = 400;
                        response.body = { error: 'Bad Request: name is required' };
                    } else {
                        // Create new user
                        var newUser = {
                            id: this.apiIdCounters.users++,
                            name: body.name,
                            email: body.email || 'no-email@example.com',
                            age: body.age || 0,
                            created: new Date().toISOString()
                        };
                        this.apiDatabase.users.push(newUser);
                        response.status = 201;
                        response.headers['Location'] = '/api/users/' + newUser.id;
                        response.body = {
                            data: newUser,
                            message: 'User created successfully',
                            explanation: 'POST creates new resources (not idempotent)'
                        };
                    }
                } else {
                    response.status = 404;
                    response.body = { error: 'Cannot POST to ' + resource };
                }
                break;

            case 'PUT':
                if (resource === 'users' && resourceId) {
                    var userIndex = this.apiDatabase.users.findIndex(u => u.id == resourceId);
                    if (userIndex !== -1) {
                        // Replace entire user
                        this.apiDatabase.users[userIndex] = {
                            id: parseInt(resourceId),
                            name: body.name || 'Unknown',
                            email: body.email || 'no-email@example.com',
                            age: body.age || 0,
                            updated: new Date().toISOString()
                        };
                        response.body = {
                            data: this.apiDatabase.users[userIndex],
                            message: 'User replaced successfully',
                            explanation: 'PUT replaces entire resource (idempotent)'
                        };
                    } else {
                        response.status = 404;
                        response.body = { error: 'User not found for update' };
                    }
                } else {
                    response.status = 400;
                    response.body = { error: 'PUT requires resource ID' };
                }
                break;

            case 'PATCH':
                if (resource === 'users' && resourceId) {
                    var userIndex = this.apiDatabase.users.findIndex(u => u.id == resourceId);
                    if (userIndex !== -1) {
                        // Partial update
                        if (body.name) this.apiDatabase.users[userIndex].name = body.name;
                        if (body.email) this.apiDatabase.users[userIndex].email = body.email;
                        if (body.age) this.apiDatabase.users[userIndex].age = body.age;
                        this.apiDatabase.users[userIndex].updated = new Date().toISOString();

                        response.body = {
                            data: this.apiDatabase.users[userIndex],
                            message: 'User partially updated',
                            explanation: 'PATCH modifies only specified fields (idempotent)'
                        };
                    } else {
                        response.status = 404;
                        response.body = { error: 'User not found for patch' };
                    }
                } else {
                    response.status = 400;
                    response.body = { error: 'PATCH requires resource ID' };
                }
                break;

            case 'DELETE':
                if (resource === 'users' && resourceId) {
                    var userIndex = this.apiDatabase.users.findIndex(u => u.id == resourceId);
                    if (userIndex !== -1) {
                        var deleted = this.apiDatabase.users.splice(userIndex, 1)[0];
                        response.status = 204; // No Content
                        response.body = null; // DELETE typically returns no body
                        response.headers['X-Deleted-Resource'] = 'User ' + resourceId;
                    } else {
                        response.status = 404;
                        response.body = { error: 'User not found for deletion' };
                    }
                } else {
                    response.status = 400;
                    response.body = { error: 'DELETE requires resource ID' };
                }
                break;

            case 'HEAD':
                // Same as GET but no body
                response.body = null;
                response.headers['X-Resource-Count'] = resource === 'users' ?
                    this.apiDatabase.users.length : '0';
                response.headers['X-Method-Info'] = 'HEAD returns headers only (safe & idempotent)';
                break;

            case 'OPTIONS':
                response.headers['Allow'] = 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS';
                response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS';
                response.body = {
                    allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    explanation: 'OPTIONS shows what methods are allowed (safe & idempotent)'
                };
                break;

            default:
                response.status = 405; // Method Not Allowed
                response.headers['Allow'] = 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS';
                response.body = { error: 'Method ' + method + ' not allowed' };
        }

        // Convert body to string if it's an object
        if (response.body && typeof response.body === 'object') {
            response.body = JSON.stringify(response.body, null, 2);
        }

        return response;
    };
};
