/*
 * EmailClient.js - Email Client Implementation for Network Simulator
 * Provides email composition, sending, and retrieval functionality
 * 
 * Part of the Education Network Simulator project
 * GPLv3 license
 */

        // console.log('EmailClient.js script loaded successfully');

// Make sure EmailClient is in global scope
window.EmailClient = function(ifaceNumber)
{
    var _self = this;
    var ifacepos = ifaceNumber;
    var owner = null;
    
    // Client configuration
    var config = {
        username: "",
        password: "",
        emailAddress: "",
        smtpServer: "",
        smtpPort: 25,
        pop3Server: "",
        pop3Port: 110,
        configured: false
    };
    
    // Local email storage
    var folders = {
        inbox: [],
        sent: [],
        drafts: [],
        trash: []
    };
    
    // Current view state
    var currentFolder = "inbox";
    var currentEmail = null;
    
    this.save = function()
    {
        var result = {};
        result.version = 1;
        result.config = config;
        result.folders = folders;
        result.currentFolder = currentFolder;
        
        return result;
    };
    
    this.load = function(data)
    {
        if (data.config) {
            config = data.config;
        }
        
        if (data.folders) {
            folders = data.folders;
        }
        
        if (data.currentFolder) {
            currentFolder = data.currentFolder;
        }
    };
    
    this.getId = function()
    {
        return "EmailClient";
    };
    
    this.setOwner = function(o)
    {
        owner = o;
    };
    
    this.getOwner = function()
    {
        return owner;
    };
    
    this.setIfacepos = function(i)
    {
        ifacepos = i;
    };
    
    this.getIfacepos = function()
    {
        return ifacepos;
    };
    
    // Configure email account
    this.configure = function(username, password, domain, smtpServer, pop3Server)
    {
        config.username = username;
        config.password = password;
        config.emailAddress = username + '@' + domain;
        config.smtpServer = smtpServer || domain;
        config.pop3Server = pop3Server || domain;
        config.configured = true;
        
        return {success: true, message: "Email client configured"};
    };
    
    // Send email via SMTP
    this.sendEmail = function(to, subject, body)
    {
        if (!config.configured) {
            return {success: false, message: "Email client not configured"};
        }
        
        // Create email message
        var email = {
            id: Date.now() + '_' + Math.random(),
            from: config.emailAddress,
            to: to,
            subject: subject,
            body: body,
            timestamp: Date.now(),
            folder: "sent"
        };
        
        // Save to sent folder
        folders.sent.push(email);
        
        // Create SMTP message
        var smtpMessage = {
            command: "SMTP_DATA",
            message: {
                from: config.emailAddress,
                to: to,
                subject: subject,
                body: body,
                headers: {
                    "Message-ID": "<" + email.id + "@" + config.emailAddress.split('@')[1] + ">",
                    "Date": new Date().toISOString(),
                    "From": config.emailAddress,
                    "To": to,
                    "Subject": subject
                }
            }
        };
        
        // Send via network
        if (owner && owner.getConnectable()) {
            // Find an email server on the network
            var serverIP = null;
            var elements = network.getAllElements();
            
            for (var id in elements) {
                var element = elements[id];
                if (element.getType && element.getType() === 'emailserver') {
                    // Found an email server, get its IP
                    var connectable = element.getConnectable();
                    if (connectable && connectable.getIPInfo(0).getIPv4()) {
                        serverIP = connectable.getIPInfo(0).getIPv4();
                        break;
                    }
                }
            }
            
            if (serverIP) {
                // Get destination MAC
                var dstMAC = owner.getConnectable().getDstMAC(serverIP);
                if (dstMAC) {
                    // Create network message  
                    var message = new Message(
                        "tcp",
                        owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
                        serverIP,
                        owner.getConnectable().getMAC(ifacepos),
                        dstMAC,
                        getDinamycPort(),
                        25, // SMTP port
                        smtpMessage,
                        images[IMAGE_ENVELOPEMAIL] || images[IMAGE_ENVELOPEHTTP]
                    );
                    
                    // Register with traffic manager and send
                    owner.getConnectable().getTrafficManager().registerApplication(this, message.getOrigPort(), false);
                    owner.getConnectable().getConnector(ifacepos).send(message);
                    
                    return {success: true, message: "Email sent to " + to};
                }
            }
            
            return {success: false, message: "No email server found on network"};
        }
        
        return {success: false, message: "Network not available"};
    };
    
    // Check for new emails (POP3)
    this.checkEmail = function()
    {
        if (!config.configured) {
            return {success: false, message: "Email client not configured"};
        }
        
        // Send POP3 LIST command
        var pop3Message = {
            command: "POP3_LIST",
            username: config.username,
            password: config.password
        };
        
        if (owner && owner.getConnectable()) {
            var message = new Message(
                "email",
                owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
                config.pop3Server, // This should be resolved to IP
                null,
                null,
                getDinamycPort(),
                110, // POP3 port
                pop3Message,
                null
            );
            
            owner.getConnectable().getTrafficManager().sendMessage(message, ifacepos);
        }
        
        return {success: true, message: "Checking for new emails..."};
    };
    
    // Handle incoming email response
    this.processResponse = function(message)
    {
        var data = message.getData();
        
        if (data.code === "+OK" && data.emails) {
            // Received email list from POP3
            for (var i = 0; i < data.emails.length; i++) {
                var email = data.emails[i];
                
                // Check if we already have this email
                var exists = false;
                for (var j = 0; j < folders.inbox.length; j++) {
                    if (folders.inbox[j].id === email.id) {
                        exists = true;
                        break;
                    }
                }
                
                if (!exists) {
                    folders.inbox.push(email);
                }
            }
            
            return {success: true, message: "Received " + data.emails.length + " emails"};
        }
        
        return {success: false, message: "Email operation failed"};
    };
    
    // Move email to folder
    this.moveEmail = function(emailId, fromFolder, toFolder)
    {
        var email = null;
        var index = -1;
        
        // Find email in source folder
        for (var i = 0; i < folders[fromFolder].length; i++) {
            if (folders[fromFolder][i].id === emailId) {
                email = folders[fromFolder][i];
                index = i;
                break;
            }
        }
        
        if (email && index >= 0) {
            // Remove from source folder
            folders[fromFolder].splice(index, 1);
            
            // Add to destination folder
            email.folder = toFolder;
            folders[toFolder].push(email);
            
            return {success: true, message: "Email moved"};
        }
        
        return {success: false, message: "Email not found"};
    };
    
    // Delete email (move to trash)
    this.deleteEmail = function(emailId, folder)
    {
        return this.moveEmail(emailId, folder, "trash");
    };
    
    // Get emails from folder
    this.getEmails = function(folder)
    {
        return folders[folder] || [];
    };
    
    // Get email count for folder
    this.getEmailCount = function(folder)
    {
        return (folders[folder] || []).length;
    };
    
    // Get unread count for folder
    this.getUnreadCount = function(folder)
    {
        var count = 0;
        var emails = folders[folder] || [];
        
        for (var i = 0; i < emails.length; i++) {
            if (!emails[i].read) {
                count++;
            }
        }
        
        return count;
    };
    
    // Mark email as read
    this.markAsRead = function(emailId, folder)
    {
        var emails = folders[folder] || [];
        
        for (var i = 0; i < emails.length; i++) {
            if (emails[i].id === emailId) {
                emails[i].read = true;
                return {success: true, message: "Email marked as read"};
            }
        }
        
        return {success: false, message: "Email not found"};
    };
    
    // Get HTML for email client interface
    this.getAppController = function()
    {
        var html = '<div style="height:400px;display:flex;">';
        
        // Sidebar with folders
        html += '<div style="width:150px;background:#f8f9fa;padding:10px;border-right:1px solid #ddd;">';
        html += '<h4 style="margin:0 0 15px 0;color:#667eea;">Folders</h4>';
        
        var folderNames = ['inbox', 'sent', 'drafts', 'trash'];
        var folderIcons = {'inbox': '📥', 'sent': '📤', 'drafts': '📝', 'trash': '🗑️'};
        
        for (var i = 0; i < folderNames.length; i++) {
            var folder = folderNames[i];
            var count = this.getEmailCount(folder);
            var unread = this.getUnreadCount(folder);
            
            html += '<div onclick="selectEmailFolder(\'' + owner.id + '\', \'' + folder + '\')" style="padding:8px;margin:2px 0;border-radius:4px;cursor:pointer;' + 
                    (currentFolder === folder ? 'background:#667eea;color:white;' : 'background:white;') + '">';
            html += folderIcons[folder] + ' ' + folder.charAt(0).toUpperCase() + folder.slice(1);
            if (count > 0) {
                html += ' (' + count;
                if (unread > 0) {
                    html += ', <strong>' + unread + '</strong>';
                }
                html += ')';
            }
            html += '</div>';
        }
        
        html += '</div>';
        
        // Main content area
        html += '<div style="flex:1;display:flex;flex-direction:column;">';
        
        // Toolbar
        html += '<div style="padding:10px;background:#f8f9fa;border-bottom:1px solid #ddd;">';
        
        if (config.configured) {
            html += '<button onclick="composeEmail(' + owner.id + ')" style="background:#10b981;color:white;border:none;padding:5px 15px;border-radius:4px;margin-right:10px;cursor:pointer;">📝 Compose</button>';
            html += '<button onclick="checkEmail(' + owner.id + ')" style="background:#667eea;color:white;border:none;padding:5px 15px;border-radius:4px;margin-right:10px;cursor:pointer;">🔄 Check Mail</button>';
            html += '<span style="float:right;color:#666;font-size:12px;">' + config.emailAddress + '</span>';
        } else {
            html += '<button onclick="configureEmailClient(' + owner.id + ')" style="background:#ef4444;color:white;border:none;padding:5px 15px;border-radius:4px;cursor:pointer;">⚙️ Configure Account</button>';
            html += '<span style="margin-left:10px;color:#ef4444;">Not configured</span>';
        }
        
        html += '</div>';
        
        // Email list
        html += '<div style="flex:1;overflow-y:auto;padding:10px;" id="email_list_' + owner.id + '">';
        
        if (config.configured) {
            var emails = this.getEmails(currentFolder);
            
            if (emails.length === 0) {
                html += '<div style="text-align:center;color:#999;padding:50px;">No emails in ' + currentFolder + '</div>';
            } else {
                for (var i = emails.length - 1; i >= 0; i--) { // Show newest first
                    var email = emails[i];
                    var date = new Date(email.timestamp);
                    
                    html += '<div onclick="viewEmail(\'' + owner.id + '\', \'' + email.id + '\', \'' + currentFolder + '\')" style="padding:10px;margin:5px 0;background:white;border:1px solid #ddd;border-radius:4px;cursor:pointer;' + 
                            (!email.read ? 'font-weight:bold;' : '') + '">';
                    html += '<div style="display:flex;justify-content:space-between;">';
                    html += '<span>' + (email.from || 'Unknown') + '</span>';
                    html += '<span style="font-size:11px;color:#666;">' + date.toLocaleString() + '</span>';
                    html += '</div>';
                    html += '<div style="margin-top:5px;">' + (email.subject || '(no subject)') + '</div>';
                    html += '</div>';
                }
            }
        } else {
            html += '<div style="text-align:center;color:#999;padding:50px;">Please configure your email account first</div>';
        }
        
        html += '</div>';
        html += '</div>';
        html += '</div>';
        
        return html;
    };
    
    // Get configuration
    this.getConfig = function()
    {
        return config;
    };
    
    // Set current folder
    this.setCurrentFolder = function(folder)
    {
        currentFolder = folder;
    };
    
    // Get menu entries for right-click menu
    this.getMenuEntries = function()
    {
        var data = [];
        
        // console.log('EmailClient.getMenuEntries called, owner:', owner);
        
        if (owner) {
            data[0] = {};
            data[0].img = 'img/64/envelope-EMAIL.png';
            data[0].text = 'Open Email Client';
            data[0].js = 'openEmailClient(' + owner.id + ');';
            
            data[1] = {};
            data[1].img = 'img/64/envelope-EMAIL.png';
            data[1].text = 'Configure Email Account';
            data[1].js = 'configureEmailAccount(' + owner.id + ');';
            
        // console.log('EmailClient menu entries created:', data);
        } else {
        // console.log('EmailClient owner is null, no menu entries');
        }
        
        return data;
    };
    
    // Get app description
    this.getAppDescription = function()
    {
        return "Email Client";
    };
    
    // Get app controller for email client UI
    this.getAppController = function()
    {
        var html = '<div style="padding:10px;height:400px;overflow:auto;">';
        
        if (!config.configured) {
            html += '<div style="text-align:center;padding:50px;">';
            html += '<h3>Email Client Not Configured</h3>';
            html += '<p>Please configure your email account to start using email.</p>';
            html += '<p>Right-click and select "Configure Email Account"</p>';
            html += '</div>';
        } else {
            html += '<h4>Email Client - ' + config.emailAddress + '</h4>';
            
            // Folder tabs
            html += '<div style="margin-bottom:10px;">';
            html += '<button onclick="switchEmailFolder(\'' + owner.id + '\', \'inbox\')" style="margin-right:5px;">Inbox (' + folders.inbox.length + ')</button>';
            html += '<button onclick="switchEmailFolder(\'' + owner.id + '\', \'sent\')" style="margin-right:5px;">Sent (' + folders.sent.length + ')</button>';
            html += '<button onclick="switchEmailFolder(\'' + owner.id + '\', \'drafts\')" style="margin-right:5px;">Drafts (' + folders.drafts.length + ')</button>';
            html += '<button onclick="switchEmailFolder(\'' + owner.id + '\', \'trash\')">Trash (' + folders.trash.length + ')</button>';
            html += '</div>';
            
            // Email list
            html += '<div style="border:1px solid #ccc;padding:10px;background:#f9f9f9;">';
            html += '<h5>' + currentFolder.charAt(0).toUpperCase() + currentFolder.slice(1) + '</h5>';
            
            var emails = folders[currentFolder] || [];
            if (emails.length === 0) {
                html += '<p style="color:#666;font-style:italic;">No emails in this folder</p>';
            } else {
                html += '<table style="width:100%;border-collapse:collapse;">';
                for (var i = emails.length - 1; i >= 0; i--) {
                    var email = emails[i];
                    var isRead = email.read ? '' : 'font-weight:bold;';
                    html += '<tr style="border-bottom:1px solid #ddd;cursor:pointer;" onclick="viewEmailMessage(\'' + owner.id + '\', \'' + email.id + '\', \'' + currentFolder + '\')">';
                    html += '<td style="padding:5px;' + isRead + '">' + (email.from || 'Unknown') + '</td>';
                    html += '<td style="padding:5px;' + isRead + '">' + (email.subject || '(No Subject)') + '</td>';
                    html += '<td style="padding:5px;text-align:right;color:#666;">' + new Date(email.timestamp).toLocaleString() + '</td>';
                    html += '</tr>';
                }
                html += '</table>';
            }
            html += '</div>';
        }
        
        html += '</div>';
        return html;
    };
};

// Helper functions for email client UI
function openEmailClient(hostId)
{
    createBkDiv();
    createEmailClientDiv(hostId);
}

function createEmailClientDiv(hostId)
{
    var host = network.getElement(hostId);
    var app = host.getApp("EmailClient");
    
    var controls = '<input type="button" id="compose" value="' + _("Compose") + '" onclick="composeEmail(' + hostId + ');" />\
      <input type="button" id="refresh" value="' + _("Refresh") + '" onclick="refreshEmailClient(' + hostId + ');" />\
      <input type="button" id="close" value="' + _("Close") + '" onclick="closeEmailClient();" />';
    
    var w = new UIWindow('divemailclient', 'Email Client', 600, 500, false, 1.0);
    w.setContent(app.getAppController());
    w.setControls(controls);
    w.render();
}

function closeEmailClient()
{
    uimanager.getWindow('divemailclient').dispose();
    removeBodyDiv('divbk');
}

function refreshEmailClient(hostId)
{
    var host = network.getElement(hostId);
    var app = host.getApp("EmailClient");
    
    // Refresh the content
    uimanager.getWindow('divemailclient').setContent(app.getAppController());
}

function composeEmail(hostId)
{
    var to = prompt("To:");
    if (!to) return;
    
    var subject = prompt("Subject:");
    if (!subject) return;
    
    var body = prompt("Message:");
    if (!body) return;
    
    var host = network.getElement(hostId);
    var app = host.getApp("EmailClient");
    
    var result = app.sendEmail(to, subject, body);
    if (result.success) {
        // Just refresh the client view, no alert needed
        refreshEmailClient(hostId);
    } else {
        // Only show alert for errors
        alert("Error: " + result.message);
    }
}

function configureEmailAccount(hostId)
{
    createBkDiv();
    createEmailAccountConfigDiv(hostId);
}

function createEmailAccountConfigDiv(hostId)
{
    var host = network.getElement(hostId);
    var app = host.getApp("EmailClient");
    
    var html = '<div style="padding:10px;">';
    html += '<h4>Email Account Configuration</h4>';
    html += '<p><label>Username: <input type="text" id="emailUsername" value="" /></label></p>';
    html += '<p><label>Password: <input type="password" id="emailPassword" value="" /></label></p>';
    html += '<p><label>Domain: <input type="text" id="emailDomain" value="example.com" /></label></p>';
    html += '<p><label>SMTP Server: <input type="text" id="emailSmtpServer" value="" /></label></p>';
    html += '<p><label>POP3 Server: <input type="text" id="emailPop3Server" value="" /></label></p>';
    html += '</div>';
    
    var controls = '<input type="button" id="save" value="' + _("Save") + '" onclick="saveEmailAccountConfig(' + hostId + ');" />\
      <input type="button" id="cancel" value="' + _("Cancel") + '" onclick="cancelEmailAccountConfig();" />';
    
    var w = new UIWindow('divemailaccountconfig', 'Configure Email Account', 400, 300, false, 1.0);
    w.setContent(html);
    w.setControls(controls);
    w.render();
}

function saveEmailAccountConfig(hostId)
{
    var host = network.getElement(hostId);
    var app = host.getApp("EmailClient");
    
    var username = document.getElementById('emailUsername').value;
    var password = document.getElementById('emailPassword').value;
    var domain = document.getElementById('emailDomain').value;
    var smtpServer = document.getElementById('emailSmtpServer').value || domain;
    var pop3Server = document.getElementById('emailPop3Server').value || domain;
    
    var result = app.configure(username, password, domain, smtpServer, pop3Server);
    if (result.success) {
        // Just close the dialog, no alert needed
        uimanager.getWindow('divemailaccountconfig').dispose();
        removeBodyDiv('divbk');
    } else {
        // Only show alert for errors
        alert("Error: " + result.message);
    }
}

function cancelEmailAccountConfig()
{
    uimanager.getWindow('divemailaccountconfig').dispose();
    removeBodyDiv('divbk');
}

function configureEmailClient(hostId)
{
    var host = network.getElement(hostId);
    var client = host.getApp("EmailClient");
    
    createBkDiv();
    
    var innerHTML = '<div style="padding:20px;">';
    innerHTML += '<h3 style="margin-top:0;color:#667eea;">Email Account Configuration</h3>';
    
    innerHTML += '<div style="margin:15px 0;">';
    innerHTML += '<label style="display:block;margin-bottom:5px;">Username:</label>';
    innerHTML += '<input type="text" id="email_username" style="width:100%;padding:5px;" placeholder="user">';
    innerHTML += '</div>';
    
    innerHTML += '<div style="margin:15px 0;">';
    innerHTML += '<label style="display:block;margin-bottom:5px;">Password:</label>';
    innerHTML += '<input type="password" id="email_password" style="width:100%;padding:5px;" placeholder="password">';
    innerHTML += '</div>';
    
    innerHTML += '<div style="margin:15px 0;">';
    innerHTML += '<label style="display:block;margin-bottom:5px;">Domain:</label>';
    innerHTML += '<input type="text" id="email_domain" style="width:100%;padding:5px;" placeholder="example.com">';
    innerHTML += '</div>';
    
    innerHTML += '<div style="margin:15px 0;">';
    innerHTML += '<label style="display:block;margin-bottom:5px;">SMTP Server (optional):</label>';
    innerHTML += '<input type="text" id="smtp_server" style="width:100%;padding:5px;" placeholder="Leave empty to use domain">';
    innerHTML += '</div>';
    
    innerHTML += '<div style="margin:15px 0;">';
    innerHTML += '<label style="display:block;margin-bottom:5px;">POP3 Server (optional):</label>';
    innerHTML += '<input type="text" id="pop3_server" style="width:100%;padding:5px;" placeholder="Leave empty to use domain">';
    innerHTML += '</div>';
    
    innerHTML += '</div>';
    
    var controls = '<button onclick="saveEmailConfig(' + hostId + ')" style="background:#10b981;color:white;padding:8px 16px;border:none;border-radius:6px;margin-right:10px;cursor:pointer;">Save</button>';
    controls += '<button onclick="cancelEmailConfig()" style="background:#6b7280;color:white;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;">Cancel</button>';
    
    var w = new UIWindow('divemailconfig', 'Email Configuration', 400, 400, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function saveEmailConfig(hostId)
{
    var host = network.getElement(hostId);
    var client = host.getApp("EmailClient");
    
    var username = document.getElementById('email_username').value;
    var password = document.getElementById('email_password').value;
    var domain = document.getElementById('email_domain').value;
    var smtpServer = document.getElementById('smtp_server').value;
    var pop3Server = document.getElementById('pop3_server').value;
    
    if (!username || !password || !domain) {
        alert('Please fill in all required fields');
        return;
    }
    
    client.configure(username, password, domain, smtpServer, pop3Server);
    
    uimanager.getWindow("divemailconfig").dispose();
    removeBodyDiv('divbk');
    
    // Refresh the email client view
    viewWebBrowser(hostId);
}

function cancelEmailConfig()
{
    uimanager.getWindow("divemailconfig").dispose();
    removeBodyDiv('divbk');
}

function composeEmail(hostId)
{
    var host = network.getElement(hostId);
    var client = host.getApp("EmailClient");
    var config = client.getConfig();
    
    createBkDiv();
    
    var innerHTML = '<div style="padding:20px;">';
    innerHTML += '<h3 style="margin-top:0;color:#667eea;">Compose Email</h3>';
    
    innerHTML += '<div style="margin:10px 0;">';
    innerHTML += '<label style="display:block;margin-bottom:5px;">From:</label>';
    innerHTML += '<input type="text" id="email_from" style="width:100%;padding:5px;" value="' + config.emailAddress + '" readonly>';
    innerHTML += '</div>';
    
    innerHTML += '<div style="margin:10px 0;">';
    innerHTML += '<label style="display:block;margin-bottom:5px;">To:</label>';
    innerHTML += '<input type="text" id="email_to" style="width:100%;padding:5px;" placeholder="recipient@example.com">';
    innerHTML += '</div>';
    
    innerHTML += '<div style="margin:10px 0;">';
    innerHTML += '<label style="display:block;margin-bottom:5px;">Subject:</label>';
    innerHTML += '<input type="text" id="email_subject" style="width:100%;padding:5px;">';
    innerHTML += '</div>';
    
    innerHTML += '<div style="margin:10px 0;">';
    innerHTML += '<label style="display:block;margin-bottom:5px;">Message:</label>';
    innerHTML += '<textarea id="email_body" style="width:100%;height:150px;padding:5px;"></textarea>';
    innerHTML += '</div>';
    
    innerHTML += '</div>';
    
    var controls = '<button onclick="sendEmailMessage(' + hostId + ')" style="background:#10b981;color:white;padding:8px 16px;border:none;border-radius:6px;margin-right:10px;cursor:pointer;">Send</button>';
    controls += '<button onclick="cancelCompose()" style="background:#6b7280;color:white;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;">Cancel</button>';
    
    var w = new UIWindow('divemailcompose', 'Compose Email', 500, 450, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function sendEmailMessage(hostId)
{
    var host = network.getElement(hostId);
    var client = host.getApp("EmailClient");
    
    var to = document.getElementById('email_to').value;
    var subject = document.getElementById('email_subject').value;
    var body = document.getElementById('email_body').value;
    
    if (!to) {
        alert('Please enter a recipient');
        return;
    }
    
    var result = client.sendEmail(to, subject, body);
    
    if (result.success) {
        uimanager.getWindow("divemailcompose").dispose();
        removeBodyDiv('divbk');
        
        // Show success message
        alert('Email sent successfully!');
        
        // Refresh the email client view
        viewWebBrowser(hostId);
    } else {
        alert('Failed to send email: ' + result.message);
    }
}

function cancelCompose()
{
    uimanager.getWindow("divemailcompose").dispose();
    removeBodyDiv('divbk');
}

function checkEmail(hostId)
{
    var host = network.getElement(hostId);
    var client = host.getApp("EmailClient");
    
    var result = client.checkEmail();
    
    if (result.success) {
        alert(result.message);
    } else {
        alert('Failed to check email: ' + result.message);
    }
}

function selectEmailFolder(hostId, folder)
{
    var host = network.getElement(hostId);
    var client = host.getApp("EmailClient");
    
    client.setCurrentFolder(folder);
    
    // Refresh the email client view
    viewWebBrowser(hostId);
}

function viewEmail(hostId, emailId, folder)
{
    var host = network.getElement(hostId);
    var client = host.getApp("EmailClient");
    
    // Mark as read
    client.markAsRead(emailId, folder);
    
    // Find the email
    var emails = client.getEmails(folder);
    var email = null;
    
    for (var i = 0; i < emails.length; i++) {
        if (emails[i].id === emailId) {
            email = emails[i];
            break;
        }
    }
    
    if (!email) {
        alert('Email not found');
        return;
    }
    
    createBkDiv();
    
    var innerHTML = '<div style="padding:20px;">';
    innerHTML += '<div style="margin-bottom:15px;padding:15px;background:#f8f9fa;border-radius:8px;">';
    innerHTML += '<p style="margin:5px 0;"><strong>From:</strong> ' + (email.from || 'Unknown') + '</p>';
    innerHTML += '<p style="margin:5px 0;"><strong>To:</strong> ' + (email.to || 'Unknown') + '</p>';
    innerHTML += '<p style="margin:5px 0;"><strong>Subject:</strong> ' + (email.subject || '(no subject)') + '</p>';
    innerHTML += '<p style="margin:5px 0;"><strong>Date:</strong> ' + new Date(email.timestamp).toLocaleString() + '</p>';
    innerHTML += '</div>';
    
    innerHTML += '<div style="padding:15px;background:white;border:1px solid #ddd;border-radius:8px;min-height:200px;">';
    innerHTML += '<pre style="white-space:pre-wrap;font-family:sans-serif;">' + (email.body || '') + '</pre>';
    innerHTML += '</div>';
    innerHTML += '</div>';
    
    var controls = '<button onclick="replyToEmail(' + hostId + ', \'' + emailId + '\', \'' + folder + '\')" style="background:#667eea;color:white;padding:8px 16px;border:none;border-radius:6px;margin-right:10px;cursor:pointer;">Reply</button>';
    controls += '<button onclick="deleteEmailMessage(' + hostId + ', \'' + emailId + '\', \'' + folder + '\')" style="background:#ef4444;color:white;padding:8px 16px;border:none;border-radius:6px;margin-right:10px;cursor:pointer;">Delete</button>';
    controls += '<button onclick="closeEmailView()" style="background:#6b7280;color:white;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;">Close</button>';
    
    var w = new UIWindow('divemailview', 'Email', 600, 500, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function closeEmailView()
{
    uimanager.getWindow("divemailview").dispose();
    removeBodyDiv('divbk');
}

function switchEmailFolder(hostId, folder)
{
    var host = network.getElement(hostId);
    var client = host.getApp("EmailClient");
    
    client.setCurrentFolder(folder);
    
    // Refresh the email client view
    if (uimanager.getWindow('divemailclient')) {
        uimanager.getWindow('divemailclient').setContent(client.getAppController());
    }
}

function viewEmailMessage(hostId, emailId, folder)
{
    var host = network.getElement(hostId);
    var client = host.getApp("EmailClient");
    
    var email = client.getEmail(emailId, folder);
    if (!email) {
        // Silently return if email not found
        return;
    }
    
    // Mark as read
    client.markAsRead(emailId, folder);
    
    // Show email in a dialog
    var html = '<div style="padding:10px;">';
    html += '<p><strong>From:</strong> ' + (email.from || 'Unknown') + '</p>';
    html += '<p><strong>To:</strong> ' + (email.to || 'Unknown') + '</p>';
    html += '<p><strong>Subject:</strong> ' + (email.subject || '(No Subject)') + '</p>';
    html += '<p><strong>Date:</strong> ' + new Date(email.timestamp).toLocaleString() + '</p>';
    html += '<hr>';
    html += '<div style="padding:10px;background:#f9f9f9;min-height:200px;">' + (email.body || '(No content)').replace(/\n/g, '<br>') + '</div>';
    html += '</div>';
    
    var controls = '<input type="button" value="Reply" onclick="replyToEmail(\'' + hostId + '\', \'' + emailId + '\', \'' + folder + '\')" />\
      <input type="button" value="Delete" onclick="deleteEmailMessage(\'' + hostId + '\', \'' + emailId + '\', \'' + folder + '\')" />\
      <input type="button" value="Close" onclick="closeEmailView()" />';
    
    createBkDiv();
    var w = new UIWindow('divemailview', 'View Email', 500, 400, false, 1.0);
    w.setContent(html);
    w.setControls(controls);
    w.render();
}

function closeEmailView()
{
    uimanager.getWindow('divemailview').dispose();
    removeBodyDiv('divbk');
}

function replyToEmail(hostId, emailId, folder)
{
    var host = network.getElement(hostId);
    var client = host.getApp("EmailClient");
    
    var email = client.getEmail(emailId, folder);
    if (!email) return;
    
    closeEmailView();
    
    var subject = prompt("Subject:", "Re: " + (email.subject || ''));
    if (!subject) return;
    
    var body = prompt("Message:");
    if (!body) return;
    
    var result = client.sendEmail(email.from, subject, body);
    if (result.success) {
        // Just refresh the client view, no alert needed
        refreshEmailClient(hostId);
    } else {
        // Only show alert for errors
        alert("Error: " + result.message);
    }
}

function deleteEmailMessage(hostId, emailId, folder)
{
    var host = network.getElement(hostId);
    var client = host.getApp("EmailClient");
    
    client.deleteEmail(emailId, folder);
    
    if (uimanager.getWindow('divemailview')) {
        uimanager.getWindow('divemailview').dispose();
        removeBodyDiv('divbk');
    }
    
    // Refresh the email client view
    refreshEmailClient(hostId);
}