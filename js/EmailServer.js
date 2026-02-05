/*
 * EmailServer.js - Email Server Implementation for Network Simulator
 * Implements SMTP, POP3, and basic email functionality
 * 
 * Part of the Education Network Simulator project
 * GPLv3 license
 */

        // console.log('EmailServer.js script loaded successfully');

// Make sure EmailServer is in global scope
window.EmailServer = function(ifaceNumber)
{
    var _self = this;
    var ifacepos = ifaceNumber;
    var owner = null;
    
    // Server configuration
    var config = {
        domain: "example.com",
        postmaster: "postmaster",
        maxMessageSize: 10485760, // 10MB
        requireAuth: true,
        allowRelay: false,
        smtpEnabled: true,
        pop3Enabled: true,
        imapEnabled: false, // Future feature
        rateLimit: 100, // messages per hour
        spamFilter: "basic"
    };
    
    // Mailboxes storage - username -> mailbox data
    var mailboxes = {};
    
    // Outgoing mail queue
    var mailQueue = [];
    
    // Statistics
    var stats = {
        messagesReceived: 0,
        messagesSent: 0,
        messagesRejected: 0,
        totalMailboxes: 0,
        totalStorageUsed: 0
    };
    
    this.save = function()
    {
        var result = {};
        result.version = 1;
        result.config = config;
        result.mailboxes = {};
        
        // Save mailboxes (without passwords for security)
        for (var username in mailboxes) {
            result.mailboxes[username] = {
                emails: mailboxes[username].emails,
                quota: mailboxes[username].quota,
                used: mailboxes[username].used
            };
        }
        
        result.mailQueue = mailQueue;
        result.stats = stats;
        
        return result;
    };
    
    this.load = function(data)
    {
        if (data.config) {
            config = data.config;
        }
        
        if (data.mailboxes) {
            mailboxes = {};
            for (var username in data.mailboxes) {
                mailboxes[username] = {
                    password: "password", // Default password on load
                    emails: data.mailboxes[username].emails || [],
                    quota: data.mailboxes[username].quota || 100,
                    used: data.mailboxes[username].used || 0
                };
            }
        }
        
        if (data.mailQueue) {
            mailQueue = data.mailQueue;
        }
        
        if (data.stats) {
            stats = data.stats;
        }
    };
    
    this.getId = function()
    {
        return "EmailServer";
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
    
    // Create a new mailbox
    this.createMailbox = function(username, password)
    {
        if (mailboxes[username]) {
            return {success: false, message: "Mailbox already exists"};
        }
        
        mailboxes[username] = {
            password: password || "password",
            emails: [],
            quota: 100, // MB
            used: 0
        };
        
        stats.totalMailboxes++;
        
        return {success: true, message: "Mailbox created"};
    };
    
    // Delete a mailbox
    this.deleteMailbox = function(username)
    {
        if (!mailboxes[username]) {
            return {success: false, message: "Mailbox not found"};
        }
        
        delete mailboxes[username];
        stats.totalMailboxes--;
        
        return {success: true, message: "Mailbox deleted"};
    };
    
    // Get list of mailboxes
    this.getMailboxList = function()
    {
        var list = [];
        for (var username in mailboxes) {
            list.push({
                username: username,
                emailCount: mailboxes[username].emails.length,
                used: mailboxes[username].used,
                quota: mailboxes[username].quota
            });
        }
        return list;
    };
    
    // Check authentication
    this.checkAuthentication = function(username, password)
    {
        if (!mailboxes[username]) {
            return false;
        }
        
        return mailboxes[username].password === password;
    };
    
    // Receive email via SMTP
    this.receiveEmail = function(message)
    {
        // Parse recipient
        var recipient = message.to;
        if (typeof recipient === 'string') {
            recipient = recipient.split('@')[0]; // Get username part
        }
        
        // Check if mailbox exists
        if (!mailboxes[recipient]) {
            stats.messagesRejected++;
            return {
                success: false,
                code: 550,
                message: "Mailbox unavailable"
            };
        }
        
        // Check message size
        var messageSize = JSON.stringify(message).length;
        if (messageSize > config.maxMessageSize) {
            stats.messagesRejected++;
            return {
                success: false,
                code: 552,
                message: "Message too large"
            };
        }
        
        // Check quota
        if (mailboxes[recipient].used + messageSize > mailboxes[recipient].quota * 1024 * 1024) {
            stats.messagesRejected++;
            return {
                success: false,
                code: 552,
                message: "Mailbox quota exceeded"
            };
        }
        
        // Add email to mailbox
        var email = {
            id: Date.now() + '_' + Math.random(),
            from: message.from,
            to: message.to,
            subject: message.subject || "(no subject)",
            body: message.body || "",
            timestamp: Date.now(),
            read: false,
            folder: "inbox",
            headers: message.headers || {}
        };
        
        mailboxes[recipient].emails.push(email);
        mailboxes[recipient].used += messageSize;
        stats.messagesReceived++;
        
        return {
            success: true,
            code: 250,
            message: "Message accepted for delivery"
        };
    };
    
    // Send email (add to queue)
    this.sendEmail = function(from, to, subject, body)
    {
        var message = {
            from: from + '@' + config.domain,
            to: to,
            subject: subject,
            body: body,
            timestamp: Date.now(),
            attempts: 0,
            status: "queued"
        };
        
        mailQueue.push(message);
        
        // Attempt immediate delivery
        this.processMailQueue();
        
        return {success: true, message: "Message queued for delivery"};
    };
    
    // Process mail queue
    this.processMailQueue = function()
    {
        for (var i = 0; i < mailQueue.length; i++) {
            var message = mailQueue[i];
            
            if (message.status !== "queued") {
                continue;
            }
            
            // Try to deliver the message
            var result = this.deliverEmail(message);
            
            if (result.success) {
                message.status = "delivered";
                stats.messagesSent++;
            } else {
                message.attempts++;
                if (message.attempts >= 3) {
                    message.status = "failed";
                    // Generate bounce message
                    this.generateBounce(message, result.message);
                }
            }
        }
        
        // Clean up delivered/failed messages
        mailQueue = mailQueue.filter(function(msg) {
            return msg.status === "queued";
        });
    };
    
    // Deliver email to destination
    this.deliverEmail = function(message)
    {
        // Parse destination
        var parts = message.to.split('@');
        if (parts.length !== 2) {
            return {success: false, message: "Invalid recipient address"};
        }
        
        var domain = parts[1];
        var username = parts[0];
        
        // Check if it's a local delivery
        if (domain === config.domain) {
            return this.receiveEmail(message);
        }
        
        // For remote delivery, need to find MX record and remote server
        // This will be implemented with DNS integration
        return {success: false, message: "Remote delivery not yet implemented"};
    };
    
    // Generate bounce message
    this.generateBounce = function(originalMessage, reason)
    {
        var bounce = {
            from: "MAILER-DAEMON@" + config.domain,
            to: originalMessage.from,
            subject: "Delivery Status Notification (Failure)",
            body: "Your message to " + originalMessage.to + " could not be delivered.\n\n" +
                  "Reason: " + reason + "\n\n" +
                  "Original message:\n" +
                  "Subject: " + originalMessage.subject + "\n" +
                  "Body: " + originalMessage.body,
            timestamp: Date.now()
        };
        
        // Try to deliver bounce locally
        var fromUser = originalMessage.from.split('@')[0];
        if (mailboxes[fromUser]) {
            mailboxes[fromUser].emails.push(bounce);
        }
    };
    
    // Get emails for a user (POP3/IMAP)
    this.getEmails = function(username, password)
    {
        if (!this.checkAuthentication(username, password)) {
            return {success: false, message: "Authentication failed"};
        }
        
        return {
            success: true,
            emails: mailboxes[username].emails
        };
    };
    
    // Delete email (POP3 DELE command)
    this.deleteEmail = function(username, emailId)
    {
        if (!mailboxes[username]) {
            return {success: false, message: "Mailbox not found"};
        }
        
        var emails = mailboxes[username].emails;
        for (var i = 0; i < emails.length; i++) {
            if (emails[i].id === emailId) {
                emails.splice(i, 1);
                return {success: true, message: "Email deleted"};
            }
        }
        
        return {success: false, message: "Email not found"};
    };
    
    // Mark email as read
    this.markAsRead = function(username, emailId)
    {
        if (!mailboxes[username]) {
            return {success: false, message: "Mailbox not found"};
        }
        
        var emails = mailboxes[username].emails;
        for (var i = 0; i < emails.length; i++) {
            if (emails[i].id === emailId) {
                emails[i].read = true;
                return {success: true, message: "Email marked as read"};
            }
        }
        
        return {success: false, message: "Email not found"};
    };
    
    // Get server configuration
    this.getConfig = function()
    {
        return config;
    };
    
    // Update server configuration
    this.setConfig = function(newConfig)
    {
        for (var key in newConfig) {
            if (config.hasOwnProperty(key)) {
                config[key] = newConfig[key];
            }
        }
    };
    
    // Get statistics
    this.getStatistics = function()
    {
        return stats;
    };
    
    // Handle incoming message (called by TrafficManager)
    this.receiveMessage = function(message)
    {
        var data = message.getData();
        var response = {};
        
        if (!data || !data.command) {
            return;
        }
        
        switch(data.command) {
            case "SMTP_HELO":
                response = {
                    code: 250,
                    message: config.domain + " Hello " + data.client
                };
                break;
                
            case "SMTP_MAIL_FROM":
                response = {
                    code: 250,
                    message: "Sender OK"
                };
                break;
                
            case "SMTP_RCPT_TO":
                response = {
                    code: 250,
                    message: "Recipient OK"
                };
                break;
                
            case "SMTP_DATA":
                // Process the email message
                if (data.message) {
                    var email = data.message;
                    var result = this.receiveEmail({
                        from: email.from,
                        to: email.to,
                        subject: email.subject,
                        body: email.body,
                        headers: email.headers,
                        timestamp: email.timestamp || Date.now()
                    });
                    response = result;
                } else {
                    response = this.receiveEmail(data);
                }
                break;
                
            case "POP3_USER":
                response = {
                    code: "+OK",
                    message: "User accepted"
                };
                break;
                
            case "POP3_PASS":
                if (this.checkAuthentication(data.username, data.password)) {
                    response = {
                        code: "+OK",
                        message: "Logged in"
                    };
                } else {
                    response = {
                        code: "-ERR",
                        message: "Authentication failed"
                    };
                }
                break;
                
            case "POP3_LIST":
                var result = this.getEmails(data.username, data.password);
                if (result.success) {
                    response = {
                        code: "+OK",
                        emails: result.emails
                    };
                } else {
                    response = {
                        code: "-ERR",
                        message: result.message
                    };
                }
                break;
                
            case "POP3_RETR":
                var result = this.getEmails(data.username, data.password);
                if (result.success) {
                    var email = result.emails[data.messageNumber - 1];
                    if (email) {
                        response = {
                            code: "+OK",
                            email: email
                        };
                    } else {
                        response = {
                            code: "-ERR",
                            message: "No such message"
                        };
                    }
                } else {
                    response = {
                        code: "-ERR",
                        message: result.message
                    };
                }
                break;
                
            case "POP3_DELE":
                // Find email by index and delete
                var result = this.getEmails(data.username, data.password);
                if (result.success && result.emails[data.messageNumber - 1]) {
                    var emailId = result.emails[data.messageNumber - 1].id;
                    this.deleteEmail(data.username, emailId);
                    response = {
                        code: "+OK",
                        message: "Message deleted"
                    };
                } else {
                    response = {
                        code: "-ERR",
                        message: "No such message"
                    };
                }
                break;
                
            default:
                response = {
                    code: 500,
                    message: "Command not recognized"
                };
        }
        
        // Send response back
        if (owner && owner.getConnectable()) {
            var responseMessage = new Message(
                "email_response",
                owner.getConnectable().getIPInfo(ifacepos).getIPv4(),
                message.getOriginIP(),
                null,
                null,
                25, // SMTP port
                message.getOrigPort(),
                response,
                null
            );
            
            owner.getConnectable().getTrafficManager().sendMessage(responseMessage, ifacepos);
        }
    };
    
    // Get HTML for configuration interface
    this.getConfigHTML = function()
    {
        var html = '<div style="padding:20px;">';
        
        // Server info
        html += '<div style="margin-bottom:20px;padding:15px;background:#f8f9fa;border-radius:8px;">';
        html += '<h4 style="margin:0 0 10px 0;color:#667eea;">Server Configuration</h4>';
        html += '<p style="margin:5px 0;"><strong>Domain:</strong> <input type="text" id="email_domain" value="' + config.domain + '" style="width:200px;margin-left:10px;"></p>';
        html += '<p style="margin:5px 0;"><strong>Postmaster:</strong> <input type="text" id="email_postmaster" value="' + config.postmaster + '" style="width:200px;margin-left:10px;"></p>';
        html += '</div>';
        
        // Mailboxes
        html += '<div style="margin-bottom:20px;padding:15px;background:#f8f9fa;border-radius:8px;">';
        html += '<h4 style="margin:0 0 10px 0;color:#667eea;">Mailboxes (' + Object.keys(mailboxes).length + ')</h4>';
        html += '<div style="max-height:150px;overflow-y:auto;">';
        
        for (var username in mailboxes) {
            var mailbox = mailboxes[username];
            html += '<div style="margin:5px 0;padding:5px;background:#2a2d3e;border:1px solid #3a3d4e;border-radius:4px;">';
            html += '<strong>' + username + '@' + config.domain + '</strong> ';
            html += '<span style="color:#666;">(' + mailbox.emails.length + ' emails, ';
            html += Math.round(mailbox.used / 1024) + ' KB used)</span> ';
            html += '<button onclick="deleteEmailMailbox(\'' + owner.id + '\', \'' + username + '\')" style="float:right;background:#ef4444;color:white;border:none;padding:2px 8px;border-radius:4px;font-size:11px;cursor:pointer;">Delete</button>';
            html += '</div>';
        }
        
        html += '</div>';
        html += '<div style="margin-top:10px;">';
        html += '<input type="text" id="new_mailbox_name" placeholder="username" style="width:150px;margin-right:10px;">';
        html += '<input type="password" id="new_mailbox_pass" placeholder="password" style="width:150px;margin-right:10px;">';
        html += '<button onclick="addEmailMailbox(' + owner.id + ')" style="background:#10b981;color:white;border:none;padding:5px 15px;border-radius:4px;cursor:pointer;">Add Mailbox</button>';
        html += '</div>';
        html += '</div>';
        
        // Services
        html += '<div style="margin-bottom:20px;padding:15px;background:#f8f9fa;border-radius:8px;">';
        html += '<h4 style="margin:0 0 10px 0;color:#667eea;">Services</h4>';
        html += '<label style="display:block;margin:5px 0;"><input type="checkbox" id="smtp_enabled" ' + (config.smtpEnabled ? 'checked' : '') + '> SMTP (Port 25)</label>';
        html += '<label style="display:block;margin:5px 0;"><input type="checkbox" id="pop3_enabled" ' + (config.pop3Enabled ? 'checked' : '') + '> POP3 (Port 110)</label>';
        html += '<label style="display:block;margin:5px 0;"><input type="checkbox" id="auth_required" ' + (config.requireAuth ? 'checked' : '') + '> Require Authentication</label>';
        html += '<label style="display:block;margin:5px 0;"><input type="checkbox" id="allow_relay" ' + (config.allowRelay ? 'checked' : '') + '> Allow Relay (Warning: Security Risk)</label>';
        html += '</div>';
        
        // Statistics
        html += '<div style="padding:15px;background:#f0fdf4;border-radius:8px;">';
        html += '<h4 style="margin:0 0 10px 0;color:#10b981;">Statistics</h4>';
        html += '<p style="margin:5px 0;font-size:12px;">📥 Messages Received: ' + stats.messagesReceived + '</p>';
        html += '<p style="margin:5px 0;font-size:12px;">📤 Messages Sent: ' + stats.messagesSent + '</p>';
        html += '<p style="margin:5px 0;font-size:12px;">🚫 Messages Rejected: ' + stats.messagesRejected + '</p>';
        html += '</div>';
        
        html += '</div>';
        
        return html;
    };
    
    // Get menu entries for right-click menu
    this.getMenuEntries = function()
    {
        var data = [];
        
        if (owner) {
            data[0] = {};
            data[0].img = 'img/64/envelope-EMAIL.png';
            data[0].text = 'Configure Email Server';
            data[0].js = 'configureEmailServer(' + owner.id + ');';
            
            data[1] = {};
            data[1].img = 'img/64/envelope-EMAIL.png';
            data[1].text = 'Manage Mailboxes';
            data[1].js = 'manageEmailMailboxes(' + owner.id + ');';
        }
        
        return data;
    };
    
    // Get app description
    this.getAppDescription = function()
    {
        return "Email Server (SMTP/POP3)";
    };
    
    // Get app controller for configuration dialog
    this.getAppController = function()
    {
        var html = '<div style="padding:10px;">';
        html += '<h4>Email Server Configuration</h4>';
        html += '<p><label>Domain: <input type="text" id="emailDomain" value="' + config.domain + '" /></label></p>';
        html += '<p><label>Postmaster: <input type="text" id="emailPostmaster" value="' + config.postmaster + '" /></label></p>';
        html += '<p><label><input type="checkbox" id="emailRequireAuth" ' + (config.requireAuth ? 'checked' : '') + ' /> Require Authentication</label></p>';
        html += '<p><label><input type="checkbox" id="emailAllowRelay" ' + (config.allowRelay ? 'checked' : '') + ' /> Allow Relay</label></p>';
        html += '<p><label><input type="checkbox" id="emailSmtpEnabled" ' + (config.smtpEnabled ? 'checked' : '') + ' /> Enable SMTP (Port 25)</label></p>';
        html += '<p><label><input type="checkbox" id="emailPop3Enabled" ' + (config.pop3Enabled ? 'checked' : '') + ' /> Enable POP3 (Port 110)</label></p>';
        html += '</div>';
        return html;
    };
    
    // Get mailbox controller for mailbox management dialog
    this.getMailboxController = function()
    {
        var html = '<div style="padding:10px;">';
        html += '<h4>Email Mailboxes</h4>';
        html += '<table style="width:100%;border-collapse:collapse;">';
        html += '<tr style="background:#f0f0f0;"><th style="padding:5px;border:1px solid #ccc;">Username</th><th style="padding:5px;border:1px solid #ccc;">Email Count</th><th style="padding:5px;border:1px solid #ccc;">Storage Used</th></tr>';
        
        for (var username in mailboxes) {
            var mailbox = mailboxes[username];
            var emailCount = mailbox.emails ? mailbox.emails.length : 0;
            var storageUsed = Math.round((mailbox.storageUsed || 0) / 1024) + ' KB';
            html += '<tr>';
            html += '<td style="padding:5px;border:1px solid #ccc;">' + username + '@' + config.domain + '</td>';
            html += '<td style="padding:5px;border:1px solid #ccc;text-align:center;">' + emailCount + '</td>';
            html += '<td style="padding:5px;border:1px solid #ccc;text-align:right;">' + storageUsed + '</td>';
            html += '</tr>';
        }
        
        html += '</table>';
        html += '</div>';
        return html;
    };
    
    // Set configuration (for UI updates)
    this.setConfig = function(newConfig)
    {
        for (var key in newConfig) {
            if (config.hasOwnProperty(key)) {
                config[key] = newConfig[key];
            }
        }
    };
    
    // Configure server domain
    this.configureDomain = function(domain)
    {
        config.domain = domain;
        return {success: true, message: "Domain configured"};
    };
    
    // Initialize with default mailbox
    this.createMailbox("admin", "admin");
    this.createMailbox("user", "password");
};

// UI Handler Functions for Email Server Configuration

function configureEmailServer(id)
{
    createBkDiv();
    createEmailServerConfigDiv(id);
}

function createEmailServerConfigDiv(id)
{
    var host = network.getElement(id);
    var app = host.getApp("EmailServer");
    
    var controls = '<input type="button" id="save" value="' + _("Save") + '" onclick="saveEmailServerConfig(' + id + ');" />\
      <input type="button" id="cancel" value="' + _("Cancel") + '" onclick="cancelEmailServerConfig();" />';
    
    var w = new UIWindow('divemailserverconfig', 'Email Server Configuration', 500, 400, false, 1.0);
    w.setContent(app.getAppController());
    w.setControls(controls);
    w.render();
}

function saveEmailServerConfig(id)
{
    var host = network.getElement(id);
    var app = host.getApp("EmailServer");
    
    // Get configuration values
    var domain = document.getElementById('emailDomain').value;
    var postmaster = document.getElementById('emailPostmaster').value;
    var requireAuth = document.getElementById('emailRequireAuth').checked;
    var allowRelay = document.getElementById('emailAllowRelay').checked;
    var smtpEnabled = document.getElementById('emailSmtpEnabled').checked;
    var pop3Enabled = document.getElementById('emailPop3Enabled').checked;
    
    // Update configuration
    app.configureDomain(domain);
    app.setConfig({
        domain: domain,
        postmaster: postmaster,
        requireAuth: requireAuth,
        allowRelay: allowRelay,
        smtpEnabled: smtpEnabled,
        pop3Enabled: pop3Enabled
    });
    
    // Close dialog
    uimanager.getWindow('divemailserverconfig').dispose();
    removeBodyDiv('divbk');
}

function cancelEmailServerConfig()
{
    uimanager.getWindow('divemailserverconfig').dispose();
    removeBodyDiv('divbk');
}

function manageEmailMailboxes(id)
{
    createBkDiv();
    createEmailMailboxesDiv(id);
}

function createEmailMailboxesDiv(id)
{
    var host = network.getElement(id);
    var app = host.getApp("EmailServer");
    
    var controls = '<input type="button" id="addMailbox" value="' + _("Add Mailbox") + '" onclick="addEmailMailbox(' + id + ');" />\
      <input type="button" id="close" value="' + _("Close") + '" onclick="closeEmailMailboxes();" />';
    
    var w = new UIWindow('divemailmailboxes', 'Manage Email Mailboxes', 500, 400, false, 1.0);
    w.setContent(app.getMailboxController());
    w.setControls(controls);
    w.render();
}

function addEmailMailbox(id)
{
    var username = prompt("Enter username for new mailbox:");
    if (!username) return;
    
    var password = prompt("Enter password for new mailbox:");
    if (!password) return;
    
    var host = network.getElement(id);
    var app = host.getApp("EmailServer");
    
    var result = app.createMailbox(username, password);
    if (result.success) {
        // Just refresh the mailbox list, no alert needed
        uimanager.getWindow('divemailmailboxes').setContent(app.getMailboxController());
    } else {
        // Only show alert for errors
        alert("Error: " + result.message);
    }
}

function closeEmailMailboxes()
{
    uimanager.getWindow('divemailmailboxes').dispose();
    removeBodyDiv('divbk');
}