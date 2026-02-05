/*
 * ARP Table Implementation for Educational Network Simulator
 * Manages ARP cache entries with IP-MAC address mappings
 * 
 * Educational implementation - focuses on visualization and understanding
 * rather than full protocol compliance
 */

var ARPTable = function() {
    // ARP cache entries: IP -> {mac, timestamp, type}
    var cache = {};
    
    // Cache timeout in milliseconds (300 seconds = 5 minutes for educational purposes)
    var CACHE_TIMEOUT = 300000;
    
    // Maximum cache size
    var MAX_ENTRIES = 100;
    
    /**
     * Add or update an ARP cache entry
     * @param {string} ip - IP address
     * @param {string} mac - MAC address
     * @param {string} type - 'dynamic' or 'static'
     */
    this.addEntry = function(ip, mac, type) {
        if (Object.keys(cache).length >= MAX_ENTRIES && !cache[ip]) {
            // Remove oldest entry if cache is full
            this.removeOldestEntry();
        }
        
        cache[ip] = {
            mac: mac,
            timestamp: Date.now(),
            type: type || 'dynamic'
        };
    };
    
    /**
     * Lookup MAC address for given IP
     * @param {string} ip - IP address to lookup
     * @returns {string|null} MAC address or null if not found/expired
     */
    this.lookup = function(ip) {
        var entry = cache[ip];
        if (!entry) {
            return null;
        }
        
        // Check if entry has expired (only for dynamic entries)
        if (entry.type === 'dynamic' && (Date.now() - entry.timestamp) > CACHE_TIMEOUT) {
            delete cache[ip];
            return null;
        }
        
        // Update timestamp on successful lookup (refresh timer)
        if (entry.type === 'dynamic') {
            entry.timestamp = Date.now();
        }
        
        return entry.mac;
    };
    
    /**
     * Remove a specific entry
     * @param {string} ip - IP address to remove
     */
    this.removeEntry = function(ip) {
        delete cache[ip];
    };
    
    /**
     * Clear all dynamic entries (keep static ones)
     */
    this.clearDynamic = function() {
        for (var ip in cache) {
            if (cache[ip].type === 'dynamic') {
                delete cache[ip];
            }
        }
    };
    
    /**
     * Clear entire ARP cache
     */
    this.clearAll = function() {
        cache = {};
    };
    
    /**
     * Remove oldest entry from cache
     */
    this.removeOldestEntry = function() {
        var oldestTime = Date.now();
        var oldestIP = null;
        
        for (var ip in cache) {
            if (cache[ip].type === 'dynamic' && cache[ip].timestamp < oldestTime) {
                oldestTime = cache[ip].timestamp;
                oldestIP = ip;
            }
        }
        
        if (oldestIP) {
            delete cache[oldestIP];
        }
    };
    
    /**
     * Get all cache entries for display
     * @returns {Array} Array of cache entries
     */
    this.getEntries = function() {
        var entries = [];
        var now = Date.now();
        
        for (var ip in cache) {
            var entry = cache[ip];
            var age = Math.floor((now - entry.timestamp) / 1000); // Age in seconds
            
            entries.push({
                ip: ip,
                mac: entry.mac,
                type: entry.type,
                age: age,
                timeout: entry.type === 'dynamic' ? Math.max(0, CACHE_TIMEOUT/1000 - age) : -1
            });
        }
        
        return entries;
    };
    
    /**
     * Get HTML table representation of ARP cache
     * @returns {string} HTML table
     */
    this.getHTMLTable = function() {
        var entries = this.getEntries();
        var html = '<table class="arp-table" style="width:100%; font-size:12px; border-collapse:collapse;">';
        html += '<thead><tr style="background:#667eea; color:white;">';
        html += '<th style="padding:8px; text-align:left;">IP Address</th>';
        html += '<th style="padding:8px; text-align:left;">MAC Address</th>';
        html += '<th style="padding:8px; text-align:left;">Type</th>';
        html += '<th style="padding:8px; text-align:left;">Age (s)</th>';
        html += '<th style="padding:8px; text-align:left;">Timeout (s)</th>';
        html += '</tr></thead><tbody>';
        
        if (entries.length === 0) {
            html += '<tr><td colspan="5" style="padding:20px; text-align:center; color:#9ca3af; background:#1a1d2e;">ARP cache is empty</td></tr>';
        } else {
            entries.forEach(function(entry, index) {
                var bgColor = index % 2 === 0 ? '#1a1d2e' : '#16213e';
                html += '<tr style="background:' + bgColor + '; color:#e4e4e7;">';
                html += '<td style="padding:8px; border-bottom:1px solid #2a2d3a;">' + entry.ip + '</td>';
                html += '<td style="padding:8px; border-bottom:1px solid #2a2d3a; font-family:monospace;">' + entry.mac + '</td>';
                html += '<td style="padding:8px; border-bottom:1px solid #2a2d3a;"><span style="';
                if (entry.type === 'static') {
                    html += 'color:#10b981; font-weight:bold;';
                } else {
                    html += 'color:#8b5cf6;';
                }
                html += '">' + entry.type + '</span></td>';
                html += '<td style="padding:8px; border-bottom:1px solid #2a2d3a;">' + entry.age + '</td>';
                html += '<td style="padding:8px; border-bottom:1px solid #2a2d3a;">';
                if (entry.timeout === -1) {
                    html += '<span style="color:#10b981;">∞</span>';
                } else {
                    html += entry.timeout;
                }
                html += '</td>';
                html += '</tr>';
            });
        }
        
        html += '</tbody></table>';
        return html;
    };
    
    /**
     * Get cache size
     * @returns {number} Number of entries in cache
     */
    this.size = function() {
        return Object.keys(cache).length;
    };
    
    /**
     * Export cache for saving
     * @returns {Object} Cache data
     */
    this.exportData = function() {
        return JSON.parse(JSON.stringify(cache));
    };
    
    /**
     * Import cache from saved data
     * @param {Object} data - Cache data to import
     */
    this.importData = function(data) {
        cache = data || {};
    };
};