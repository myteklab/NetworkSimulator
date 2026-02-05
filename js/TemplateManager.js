/**
 * TemplateManager.js
 * 
 * A modular template management system for NetworkSimulator
 * Makes it easy to add, export, import, and manage network templates
 */

var TemplateManager = function(network) {
    var self = this;
    this.network = network;
    
    // Store templates - can be loaded from files or defined inline
    this.templates = {};
    
    // Template categories for organization
    this.categories = {
        'basic': { name: 'Basic Networks', color: '#2196f3', icon: '🏠' },
        'security': { name: 'Security Demos', color: '#ff5252', icon: '🔒' },
        'enterprise': { name: 'Enterprise', color: '#4caf50', icon: '🏢' },
        'educational': { name: 'Educational', color: '#ff9800', icon: '🎓' },
        'custom': { name: 'User Templates', color: '#9c27b0', icon: '⭐' }
    };
    
    /**
     * Register a new template
     * @param {string} id - Unique template identifier
     * @param {object} template - Template configuration
     */
    this.registerTemplate = function(id, template) {
        // Validate template structure
        if (!template.name || !template.description) {
            console.error('Template must have name and description');
            return false;
        }
        
        // Set defaults
        template.id = id;
        template.category = template.category || 'custom';
        template.difficulty = template.difficulty || 'Beginner';
        template.version = template.version || '1.0';
        template.author = template.author || 'Unknown';
        template.created = template.created || new Date().toISOString();
        
        this.templates[id] = template;
        // console.log('Registered template:', id, template.name);
        return true;
    };
    
    /**
     * Load template from JSON file or string
     * @param {string|object} data - JSON string or object
     */
    this.loadTemplateFromJSON = function(data) {
        try {
            var templateData = typeof data === 'string' ? JSON.parse(data) : data;
            
            // If it's a single template
            if (templateData.id) {
                return this.registerTemplate(templateData.id, templateData);
            }
            
            // If it's multiple templates
            if (templateData.templates) {
                var loaded = 0;
                for (var id in templateData.templates) {
                    if (this.registerTemplate(id, templateData.templates[id])) {
                        loaded++;
                    }
                }
        // console.log('Loaded', loaded, 'templates');
                return loaded > 0;
            }
        } catch (e) {
            console.error('Error loading template:', e);
            return false;
        }
    };
    
    /**
     * Export current network as a template
     * @param {string} name - Template name
     * @param {string} description - Template description
     * @param {object} metadata - Additional metadata
     * @returns {object} Template object
     */
    this.exportCurrentAsTemplate = function(name, description, metadata) {
        metadata = metadata || {};
        
        var template = {
            id: 'custom_' + Date.now(),
            name: name,
            description: description,
            category: metadata.category || 'custom',
            difficulty: metadata.difficulty || 'Custom',
            author: metadata.author || 'User',
            version: '1.0',
            created: new Date().toISOString(),
            // Use the actual network.save() format
            networkData: this.network.save()
        };
        
        return template;
    };
    
    /**
     * Apply a template to the network
     * @param {string} templateId - Template ID to load
     * @param {boolean} clearFirst - Whether to clear existing network
     */
    this.applyTemplate = function(templateId, clearFirst) {
        var template = this.templates[templateId];
        if (!template) {
            console.error('Template not found:', templateId);
            return false;
        }
        
        try {
            if (clearFirst !== false) {
                // Clear existing network
                if (this.network.clear) {
                    this.network.clear();
                } else {
                    // Manual clear if no clear method
                    this.network.reset();
                }
            }
            
            // Load based on data format
            if (template.networkData) {
                // Full network save format
                var data = typeof template.networkData === 'string' 
                    ? JSON.parse(template.networkData) 
                    : template.networkData;
                this.network.load(data);
            } else if (template.buildFunction) {
                // Custom build function
                template.buildFunction(this.network);
            } else if (template.elements && template.links) {
                // Simple format with elements and links arrays
                this.loadSimpleFormat(template);
            }
            
        // console.log('Applied template:', template.name);
            return true;
        } catch (e) {
            console.error('Error applying template:', e);
            return false;
        }
    };
    
    /**
     * Load simple format template (elements + links)
     */
    this.loadSimpleFormat = function(template) {
        var elementMap = {};
        
        // Create elements
        template.elements.forEach(function(elem) {
            var id;
            switch(elem.type) {
                case 'router':
                    id = self.network.createRouter(elem.x, elem.y);
                    break;
                case 'switch':
                    id = self.network.createSwitch(elem.x, elem.y, elem.ports || 8);
                    break;
                case 'host':
                case 'computer':
                    id = self.network.createComputer(elem.x, elem.y);
                    break;
                case 'firewall':
                    id = self.network.createFirewall(elem.x, elem.y);
                    break;
                case 'dhcp':
                    id = self.network.createComputer(elem.x, elem.y);
                    // Configure as DHCP server after creation
                    break;
                case 'dns':
                    id = self.network.createComputer(elem.x, elem.y);
                    // Configure as DNS server after creation
                    break;
                case 'web':
                    id = self.network.createComputer(elem.x, elem.y);
                    // Configure as web server after creation
                    break;
                case 'gameserver':
                    id = self.network.createGameServer(elem.x, elem.y);
                    break;
                case 'email':
                    id = self.network.createComputer(elem.x, elem.y);
                    // Configure as email server after creation
                    break;
            }
            
            if (id !== undefined) {
                elementMap[elem.id || elementMap.length] = id;
                
                // Apply properties
                var element = self.network.getElement(id);
                if (element && elem.name) {
                    element.setName(elem.name);
                }
                if (element && elem.ip) {
                    // Set IP if method exists
                    if (element.setIP) element.setIP(elem.ip);
                }
            }
        });
        
        // Create links
        if (template.links) {
            template.links.forEach(function(link) {
                var from = elementMap[link.from];
                var to = elementMap[link.to];
                if (from !== undefined && to !== undefined) {
                    self.network.createLink(
                        from, 
                        link.fromPort || 0, 
                        to, 
                        link.toPort || 0
                    );
                }
            });
        }
    };
    
    /**
     * Get template by ID
     */
    this.getTemplate = function(templateId) {
        return this.templates[templateId];
    };
    
    /**
     * Get all templates
     */
    this.getAllTemplates = function() {
        return this.templates;
    };
    
    /**
     * Get templates by category
     */
    this.getTemplatesByCategory = function(category) {
        var result = {};
        for (var id in this.templates) {
            if (this.templates[id].category === category) {
                result[id] = this.templates[id];
            }
        }
        return result;
    };
    
    /**
     * Save template to localStorage
     */
    this.saveTemplateToStorage = function(templateId) {
        var template = this.templates[templateId];
        if (!template) return false;
        
        try {
            var stored = localStorage.getItem('networkTemplates') || '{}';
            var templates = JSON.parse(stored);
            templates[templateId] = template;
            localStorage.setItem('networkTemplates', JSON.stringify(templates));
            return true;
        } catch (e) {
            console.error('Error saving template to storage:', e);
            return false;
        }
    };
    
    /**
     * Load templates from localStorage
     */
    this.loadTemplatesFromStorage = function() {
        try {
            var stored = localStorage.getItem('networkTemplates');
            if (stored) {
                var templates = JSON.parse(stored);
                for (var id in templates) {
                    this.registerTemplate(id, templates[id]);
                }
        // console.log('Loaded templates from storage');
            }
        } catch (e) {
            console.error('Error loading templates from storage:', e);
        }
    };
    
    /**
     * Delete template
     */
    this.deleteTemplate = function(templateId) {
        if (this.templates[templateId]) {
            delete this.templates[templateId];
            
            // Also remove from localStorage
            try {
                var stored = localStorage.getItem('networkTemplates') || '{}';
                var templates = JSON.parse(stored);
                delete templates[templateId];
                localStorage.setItem('networkTemplates', JSON.stringify(templates));
            } catch (e) {
                console.error('Error removing template from storage:', e);
            }
            
            return true;
        }
        return false;
    };
    
    /**
     * Initialize with default templates
     */
    this.loadDefaultTemplates = function() {
        // Basic Home Network - using build function
        this.registerTemplate('basic_home', {
            name: '🏠 Basic Home Network',
            description: 'Simple home network with router, switch, and PCs',
            category: 'basic',
            difficulty: 'Beginner',
            buildFunction: function(network) {
                // Create network components
                var router = network.createRouter(400, 100);
                var switch1 = network.createSwitch(400, 250, 8);
                
                // Create different types of devices
                var desktop = network.createComputerWithType(200, 400, 'desktop');
                var laptop = network.createComputerWithType(350, 400, 'laptop');
                var gaming = network.createComputerWithType(500, 400, 'gaming');
                var smartTV = network.createComputerWithType(650, 400, 'desktop');
                
                // Connect everything
                network.createLink(router, 0, switch1, 0);
                network.createLink(switch1, 1, desktop, 0);
                network.createLink(switch1, 2, laptop, 0);
                network.createLink(switch1, 3, gaming, 0);
                network.createLink(switch1, 4, smartTV, 0);
                
                // Set device names
                var routerElem = network.getElement(router);
                if (routerElem) routerElem.setName('Home Router');
                
                var switchElem = network.getElement(switch1);
                if (switchElem) switchElem.setName('LAN Switch');
                
                var desktopElem = network.getElement(desktop);
                if (desktopElem) desktopElem.setName('Desktop PC');
                
                var laptopElem = network.getElement(laptop);
                if (laptopElem) laptopElem.setName('Laptop');
                
                var gamingElem = network.getElement(gaming);
                if (gamingElem) gamingElem.setName('Gaming PC');
                
                var tvElem = network.getElement(smartTV);
                if (tvElem) tvElem.setName('Smart TV');
            }
        });
        
        // Simple LAN - using elements/links format
        this.registerTemplate('simple_lan', {
            name: '🖥️ Simple LAN',
            description: 'Basic Local Area Network setup',
            category: 'basic',
            difficulty: 'Beginner',
            elements: [
                { id: 0, type: 'switch', x: 400, y: 300, name: 'Main Switch' },
                { id: 1, type: 'host', x: 200, y: 450, name: 'PC 1' },
                { id: 2, type: 'host', x: 400, y: 450, name: 'PC 2' },
                { id: 3, type: 'host', x: 600, y: 450, name: 'PC 3' }
            ],
            links: [
                { from: 0, to: 1, fromPort: 0, toPort: 0 },
                { from: 0, to: 2, fromPort: 1, toPort: 0 },
                { from: 0, to: 3, fromPort: 2, toPort: 0 }
            ]
        });
        
        // Client-Server setup
        this.registerTemplate('client_server', {
            name: '🖥️ Client-Server',
            description: 'Basic client-server architecture',
            category: 'educational',
            difficulty: 'Beginner',
            elements: [
                { id: 0, type: 'router', x: 400, y: 100, name: 'Gateway' },
                { id: 1, type: 'switch', x: 400, y: 250, name: 'Network Switch' },
                { id: 2, type: 'host', x: 200, y: 400, name: 'Server', ip: '192.168.1.10' },
                { id: 3, type: 'host', x: 350, y: 400, name: 'Client 1' },
                { id: 4, type: 'host', x: 500, y: 400, name: 'Client 2' },
                { id: 5, type: 'host', x: 650, y: 400, name: 'Client 3' }
            ],
            links: [
                { from: 0, to: 1 },
                { from: 1, to: 2, fromPort: 1 },
                { from: 1, to: 3, fromPort: 2 },
                { from: 1, to: 4, fromPort: 3 },
                { from: 1, to: 5, fromPort: 4 }
            ]
        });
    };
    
    // Initialize with defaults
    this.loadDefaultTemplates();
    this.loadTemplatesFromStorage();
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateManager;
}