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

function newElement(type) 
{
    // Calculate position accounting for viewport
    var x = 100;
    var y = 100;
    
    if (typeof canvasViewport !== 'undefined') {
        // Place new elements at center of current view
        var canvas = document.getElementById("simcanvas");
        if (canvas) {
            x = (canvas.width / 2 - canvasViewport.offsetX) / canvasViewport.zoom;
            y = (canvas.height / 2 - canvasViewport.offsetY) / canvasViewport.zoom;
        }
    }
    
    switch (type) 
    {
        case "host":
            network.createComputer(x, y);
            break;
        case "dns":
            network.createDNSServer(x, y);
            break;
        case "dhcp":
            network.createDHCPServer(x, y);
            break;
        case "web":
            network.createHTTPServer(x, y);
            break;
        case "email":
            network.createEmailServer(x, y);
            break;
        case "gameserver":
            network.createGameServer(x, y);
            break;
        case "radius":
            network.createRADIUSServer(x, y);
            break;
        case "switch":
            network.createSwitch(x, y, 8);
            break;
        case "router":
            network.createRouter(x, y);
            break;
        case "firewall":
            network.createFirewall(x, y);
            break;
    }
}

function simulator(imgs) 
{
    images = imgs;
    var container = document.getElementById("simcontainer");
    var canvas = document.getElementById("simcanvas");
    
    var W = container.offsetWidth * window.devicePixelRatio;
    var H = container.offsetHeight * window.devicePixelRatio;
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext("2d", {antialias: true});
    
    uimanager = new UIManager();

    network = new Network(images, ctx, W, H);
    network.init();

    // Initialize the AttackManager
    attackManager = new AttackManager(network);

    // Initialize template manager early to load templates
    if (typeof initializeTemplateManager === 'function') {
        initializeTemplateManager();
    }

    if (NetworkSimulator.initialdata !== null)
    {
      network.load(NetworkSimulator.initialdata);
      // Auto-fit the network to the screen after loading
      setTimeout(function() {
        if (typeof fitToScreen === 'function') {
          fitToScreen();
        }
      }, 100); // Small delay to ensure everything is rendered
    }

    createControlsWindow();
}

