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

var lasttableid = 0;
var uitables = [];

function getNextTableID()
{
    return ++lasttableid;
}

function deleteUITableRow(id,row)
{
    uitables[id].deleteRow(row);
}

function addUITableRow(id)
{
    uitables[id].addRow();

    // Special handling for HTTP Server tables
    if (window.httpServerUITable && uitables[id] === window.httpServerUITable) {
        // When a domain is added to the HTTP server table, immediately create it in the server
        var data = uitables[id].getData();
        if (data.length > 0) {
            var lastRow = data[data.length - 1];
            var domainName = lastRow[0];
            if (domainName && domainName.trim() !== '') {
                // Get the HTTP server app and add the domain
                var host = network.getElement(window.httpServerHostId);
                if (host) {
                    var app = host.getApp("HTTPServer");
                    if (app) {
                        app.addDomain(domainName);
                        // Initialize with a default file
                        app.setFileContents(domainName, '/index.html', '<html><body><h1>Welcome to ' + domainName + '</h1></body></html>');
                    }
                }
            }
        }
    }
}

var UITable = function(headers, data, tableid) 
{
    var headers = headers;
    var data = data;
    var tableid = tableid;
    var id = "uitable_" + getNextTableID();
    var editsecondary = false;
    var editsecondaryfunc = null;
    var params = [];
    uitables[id] = this;
    
    this.getId = function()
    {
        return id;
    };

    this.setParam = function(id, value)
    {
        params[id] = value;
    };

    this.getParam = function(id)
    {
        var result = null;
        if (id in params)
        {
            result = params[id];
        }
        return result;
    };

    this.setSecondary = function(editsecondary_p, editsecondaryfunc_p)
    {
        editsecondary = editsecondary_p;
        editsecondaryfunc = editsecondaryfunc_p;
    };

    this.render = function() 
    {
        var result = '';
        result += '<tr>';
        for (var i = 0; i < headers.length; i++) 
        {
            result += '<th>' + headers[i] + '</th>';
        }
        result += '<th>'+_("Controls")+'</th>'
        result += '</tr>';
        
        for (var i = 0; i < data.length; i++) 
        {
            result += '<tr>';
            for (var j = 0; j < headers.length; j++) 
            {
                var inputid = tableid + "_" + i + "_" + j;
                result += '<td>';
                result += '<input type="text" id="'+inputid+'" value="'+data[i][j]+'" disabled="disabled" />';
                result += '</td>';
            }
            result += '<td>';
            result += '<img src="img/64/delete.png" title="'+_("Delete")+'" alt="'+_("Delete")+'" style="width:24px;" onclick="deleteUITableRow(\''+id+'\','+i+')" />';
            if (editsecondary)
            {
                result += '<img src="img/64/edit.png" title="'+_("Edit")+'" alt="'+_("Edit")+'" style="width:24px;" onclick="'+editsecondaryfunc+'(\''+id+'\','+i+')" />';
            }
            result += '</td>';
            result += '</tr>';
        }
        result += '<tr>';
        for (var j = 0; j < headers.length; j++) 
        {
            var inputid = tableid + "_new_" + j;
            result += '<td>';
            result += '<input type="text" id="'+inputid+'" />';
            result += '</td>';
        }
        result += '<td><img src="img/64/add.png" title="'+_("Add")+'" alt="'+_("Add")+'" style="width:24px;" onclick="addUITableRow(\''+id+'\')" /></td>';
        result += '</tr>';

        document.getElementById(tableid).innerHTML = result;
    };

    this.deleteRow = function(row)
    {
        data.splice(row,1);
        this.render();
    };

    this.dispose = function()
    {
        delete uitables[id];
    };

    this.getData = function()
    {
        return data;
    };

    this.addRow = function()
    {
        var row = [];

        for (var j = 0; j < headers.length; j++) 
        {
            var inputid = tableid + "_new_" + j;
            var value = document.getElementById(inputid).value;
            row.push(value);
        }

        data.push(row);
        this.render();
    };
};
