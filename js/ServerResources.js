/*
 * ServerResources.js - Server Resource Modeling for DoS Attack Simulation
 * Part of the NetworkSimulator Educational Project
 * 
 * This module models server resources (CPU, Memory, Connections, Bandwidth)
 * to simulate realistic performance degradation during DoS attacks.
 */

var ServerResources = function() {
    var _self = this;
    
    // Resource configuration
    this.resources = {
        cpu: {
            capacity: 100,        // Percentage (0-100)
            current: 0,
            baseline: 10,         // Normal idle usage
            requestCost: 0.5,     // CPU cost per request
            recoveryRate: 2       // Recovery per tick when not under attack
        },
        memory: {
            capacity: 1024,       // MB
            current: 128,         // Baseline memory usage
            baseline: 128,
            connectionCost: 1,    // MB per connection
            recoveryRate: 10      // MB recovered per tick
        },
        connections: {
            max: 1000,           // Maximum concurrent connections
            current: 0,
            timeout: 30000,      // Connection timeout in ms
            halfOpen: 0,         // Half-open connections (SYN flood)
            maxHalfOpen: 500     // Max half-open before dropping
        },
        bandwidth: {
            capacity: 1000,      // Mbps
            current: 0,
            baseline: 10,        // Normal usage
            packetSize: 0.001,   // Mbps per packet (approximate)
            recoveryRate: 50     // Mbps recovered per tick
        }
    };
    
    // Performance metrics
    this.metrics = {
        responseTime: 10,        // Base response time in ms
        availability: 100,       // Service availability percentage
        packetsProcessed: 0,
        packetsDropped: 0,
        lastUpdate: Date.now()
    };
    
    // Separate tracking for legitimate traffic
    this.legitimateProcessed = 0;
    this.legitimateDropped = 0;
    
    // Status tracking
    this.status = 'normal';  // normal, degraded, critical, offline
    
    // Process an incoming request/packet
    this.processPacket = function(type, intensity, isLegitimate) {
        var canProcess = true;
        var load = (intensity || 100) / 100;
        
        // For legitimate traffic, check if we can process based on current load
        if (isLegitimate) {
            // Legitimate traffic has lower resource cost
            this.resources.cpu.current += 0.1;
            this.resources.bandwidth.current += 0.1;
            
            // Check if server can handle legitimate traffic based on current status
            var dropChance = 0;
            if (this.status === 'offline') {
                dropChance = 1.0; // 100% drop
            } else if (this.status === 'critical') {
                dropChance = 0.7; // 70% drop
            } else if (this.status === 'degraded') {
                dropChance = 0.3; // 30% drop
            }
            
            if (Math.random() < dropChance) {
                this.legitimateDropped++;
                canProcess = false;
            } else {
                this.legitimateProcessed++;
            }
            
            // Cap resources
            this.capResources();
            this.updateStatus();
            
            return canProcess;
        }
        
        // Attack packet processing
        switch(type) {
            case 'SYN_FLOOD':
                // SYN flood primarily affects connection pool
                this.resources.connections.halfOpen += 8 * load;  // Balanced rate
                this.resources.cpu.current += 0.5 * load;  // Balanced rate
                
                if (this.resources.connections.halfOpen > this.resources.connections.maxHalfOpen) {
                    canProcess = false;
                    this.resources.connections.halfOpen = this.resources.connections.maxHalfOpen;
                }
                break;
                
            case 'HTTP_FLOOD':
                // HTTP flood affects CPU and memory
                this.resources.cpu.current += 3 * load;  // Balanced rate
                this.resources.memory.current += 7 * load;  // Balanced rate
                this.resources.connections.current += 1;
                
                if (this.resources.cpu.current > this.resources.cpu.capacity) {
                    canProcess = false;
                }
                break;
                
            case 'ICMP_FLOOD':
                // ICMP flood primarily affects bandwidth
                this.resources.bandwidth.current += 10 * load;  // Balanced rate
                this.resources.cpu.current += 0.3 * load;  // Balanced rate
                
                if (this.resources.bandwidth.current > this.resources.bandwidth.capacity) {
                    canProcess = false;
                }
                break;
                
            case 'SLOWLORIS':
                // Slowloris ties up connections
                this.resources.connections.current += 1;
                this.resources.memory.current += 0.5 * load;
                
                if (this.resources.connections.current > this.resources.connections.max) {
                    canProcess = false;
                    this.resources.connections.current = this.resources.connections.max;
                }
                break;
                
            default:
                // Normal traffic (shouldn't reach here for attacks)
                this.resources.cpu.current += 0.1;
                this.resources.bandwidth.current += 0.1;
        }
        
        // Update metrics for attack packets
        if (canProcess) {
            this.metrics.packetsProcessed++;
        } else {
            this.metrics.packetsDropped++;
        }
        
        // Cap resources at maximum
        this.capResources();
        
        // Update status
        this.updateStatus();
        
        return canProcess;
    };
    
    // Natural resource recovery (called periodically)
    this.recover = function() {
        var now = Date.now();
        var timeDelta = (now - this.metrics.lastUpdate) / 1000; // Convert to seconds
        this.metrics.lastUpdate = now;
        
        // CPU recovery
        if (this.resources.cpu.current > this.resources.cpu.baseline) {
            this.resources.cpu.current -= this.resources.cpu.recoveryRate * timeDelta;
            if (this.resources.cpu.current < this.resources.cpu.baseline) {
                this.resources.cpu.current = this.resources.cpu.baseline;
            }
        }
        
        // Memory recovery
        if (this.resources.memory.current > this.resources.memory.baseline) {
            this.resources.memory.current -= this.resources.memory.recoveryRate * timeDelta;
            if (this.resources.memory.current < this.resources.memory.baseline) {
                this.resources.memory.current = this.resources.memory.baseline;
            }
        }
        
        // Connection cleanup
        if (this.resources.connections.current > 0) {
            this.resources.connections.current -= Math.ceil(this.resources.connections.current * 0.1);
            if (this.resources.connections.current < 0) {
                this.resources.connections.current = 0;
            }
        }
        
        // Half-open connection cleanup
        if (this.resources.connections.halfOpen > 0) {
            this.resources.connections.halfOpen -= 10 * timeDelta;
            if (this.resources.connections.halfOpen < 0) {
                this.resources.connections.halfOpen = 0;
            }
        }
        
        // Bandwidth recovery
        if (this.resources.bandwidth.current > this.resources.bandwidth.baseline) {
            this.resources.bandwidth.current -= this.resources.bandwidth.recoveryRate * timeDelta;
            if (this.resources.bandwidth.current < this.resources.bandwidth.baseline) {
                this.resources.bandwidth.current = this.resources.bandwidth.baseline;
            }
        }
        
        this.updateStatus();
    };
    
    // Cap resources at maximum values
    this.capResources = function() {
        if (this.resources.cpu.current > this.resources.cpu.capacity) {
            this.resources.cpu.current = this.resources.cpu.capacity;
        }
        if (this.resources.memory.current > this.resources.memory.capacity) {
            this.resources.memory.current = this.resources.memory.capacity;
        }
        if (this.resources.connections.current > this.resources.connections.max) {
            this.resources.connections.current = this.resources.connections.max;
        }
        if (this.resources.bandwidth.current > this.resources.bandwidth.capacity) {
            this.resources.bandwidth.current = this.resources.bandwidth.capacity;
        }
    };
    
    // Update server status based on resource usage
    this.updateStatus = function() {
        var cpuLoad = this.resources.cpu.current / this.resources.cpu.capacity;
        var memLoad = this.resources.memory.current / this.resources.memory.capacity;
        var connLoad = this.resources.connections.current / this.resources.connections.max;
        var bwLoad = this.resources.bandwidth.current / this.resources.bandwidth.capacity;
        
        var maxLoad = Math.max(cpuLoad, memLoad, connLoad, bwLoad);
        
        if (maxLoad >= 0.90) {  // Lowered from 0.95
            this.status = 'offline';
            this.metrics.availability = 0;
        } else if (maxLoad >= 0.60) {  // Lowered from 0.80
            this.status = 'critical';
            this.metrics.availability = 25;
        } else if (maxLoad >= 0.30) {  // Lowered from 0.60
            this.status = 'degraded';
            this.metrics.availability = 75;
        } else {
            this.status = 'normal';
            this.metrics.availability = 100;
        }
        
        // Calculate response time based on load
        this.metrics.responseTime = 10 * Math.exp(maxLoad * 2); // Exponential degradation
    };
    
    // Get current resource usage as percentages
    this.getUsagePercentages = function() {
        return {
            cpu: Math.round((this.resources.cpu.current / this.resources.cpu.capacity) * 100),
            memory: Math.round((this.resources.memory.current / this.resources.memory.capacity) * 100),
            connections: Math.round((this.resources.connections.current / this.resources.connections.max) * 100),
            bandwidth: Math.round((this.resources.bandwidth.current / this.resources.bandwidth.capacity) * 100)
        };
    };
    
    // Get HTML for resource display
    this.getResourceHTML = function() {
        var usage = this.getUsagePercentages();
        var statusColor = {
            'normal': '#10b981',
            'degraded': '#f59e0b',
            'critical': '#ef4444',
            'offline': '#991b1b'
        }[this.status];
        
        var html = '<div style="padding:10px; background:#1f2937; border-radius:8px;">';
        html += '<h4 style="margin:0 0 10px 0; color:' + statusColor + ';">Server Status: ' + this.status.toUpperCase() + '</h4>';
        
        // Add attack impact warning if under attack
        if (this.status !== 'normal') {
            var dropRate = 0;
            if (this.status === 'offline') dropRate = 100;
            else if (this.status === 'critical') dropRate = 70;
            else if (this.status === 'degraded') dropRate = 30;
            
            html += '<div style="background:#7f1d1d; padding:8px; border-radius:4px; margin-bottom:10px;">';
            html += '<p style="color:#fca5a5; margin:0; font-size:12px; font-weight:bold;">⚠️ UNDER ATTACK</p>';
            html += '<p style="color:#fca5a5; margin:2px 0 0 0; font-size:11px;">Dropping ~' + dropRate + '% of legitimate traffic</p>';
            html += '</div>';
        }
        
        // CPU
        html += '<div style="margin-bottom:10px;">';
        html += '<label style="color:#9ca3af; font-size:12px;">CPU: ' + usage.cpu + '%</label>';
        html += '<div style="background:#374151; height:20px; border-radius:4px; overflow:hidden;">';
        html += '<div style="background:' + (usage.cpu > 80 ? '#ef4444' : usage.cpu > 60 ? '#f59e0b' : '#10b981') + '; height:100%; width:' + usage.cpu + '%; transition:width 0.3s;"></div>';
        html += '</div>';
        html += '</div>';
        
        // Memory
        html += '<div style="margin-bottom:10px;">';
        html += '<label style="color:#9ca3af; font-size:12px;">Memory: ' + usage.memory + '%</label>';
        html += '<div style="background:#374151; height:20px; border-radius:4px; overflow:hidden;">';
        html += '<div style="background:' + (usage.memory > 80 ? '#ef4444' : usage.memory > 60 ? '#f59e0b' : '#10b981') + '; height:100%; width:' + usage.memory + '%; transition:width 0.3s;"></div>';
        html += '</div>';
        html += '</div>';
        
        // Connections
        html += '<div style="margin-bottom:10px;">';
        html += '<label style="color:#9ca3af; font-size:12px;">Connections: ' + this.resources.connections.current + '/' + this.resources.connections.max + '</label>';
        html += '<div style="background:#374151; height:20px; border-radius:4px; overflow:hidden;">';
        html += '<div style="background:' + (usage.connections > 80 ? '#ef4444' : usage.connections > 60 ? '#f59e0b' : '#10b981') + '; height:100%; width:' + usage.connections + '%; transition:width 0.3s;"></div>';
        html += '</div>';
        html += '</div>';
        
        // Bandwidth
        html += '<div style="margin-bottom:10px;">';
        html += '<label style="color:#9ca3af; font-size:12px;">Bandwidth: ' + usage.bandwidth + '%</label>';
        html += '<div style="background:#374151; height:20px; border-radius:4px; overflow:hidden;">';
        html += '<div style="background:' + (usage.bandwidth > 80 ? '#ef4444' : usage.bandwidth > 60 ? '#f59e0b' : '#10b981') + '; height:100%; width:' + usage.bandwidth + '%; transition:width 0.3s;"></div>';
        html += '</div>';
        html += '</div>';
        
        // Metrics
        html += '<div style="margin-top:15px; padding-top:10px; border-top:1px solid #374151;">';
        html += '<h5 style="color:#e4e4e7; margin:0 0 8px 0; font-size:13px;">Attack Packets:</h5>';
        html += '<p style="color:#9ca3af; font-size:12px; margin:3px 0;">Attack Packets Processed: ' + this.metrics.packetsProcessed + '</p>';
        html += '<p style="color:#ef4444; font-size:12px; margin:3px 0;">Attack Packets Dropped: ' + this.metrics.packetsDropped + '</p>';
        
        // Show legitimate traffic stats if available
        if (this.legitimateProcessed || this.legitimateDropped) {
            html += '<h5 style="color:#e4e4e7; margin:10px 0 8px 0; font-size:13px;">Legitimate Traffic Impact:</h5>';
            html += '<p style="color:#10b981; font-size:12px; margin:3px 0;">Legitimate Packets Passed: ' + (this.legitimateProcessed || 0) + '</p>';
            html += '<p style="color:#ef4444; font-size:12px; margin:3px 0;">Legitimate Packets Dropped: ' + (this.legitimateDropped || 0) + '</p>';
            var totalLegitimate = (this.legitimateProcessed || 0) + (this.legitimateDropped || 0);
            if (totalLegitimate > 0) {
                var successRate = Math.round(((this.legitimateProcessed || 0) / totalLegitimate) * 100);
                html += '<p style="color:#f59e0b; font-size:12px; margin:3px 0; font-weight:bold;">Success Rate: ' + successRate + '%</p>';
            }
        }
        
        html += '<h5 style="color:#e4e4e7; margin:10px 0 8px 0; font-size:13px;">Performance:</h5>';
        html += '<p style="color:#9ca3af; font-size:12px; margin:3px 0;">Response Time: ' + Math.round(this.metrics.responseTime) + 'ms</p>';
        html += '<p style="color:#9ca3af; font-size:12px; margin:3px 0;">Availability: ' + this.metrics.availability + '%</p>';
        html += '</div>';
        
        html += '</div>';
        
        return html;
    };
    
    // Reset resources to baseline
    this.reset = function() {
        this.resources.cpu.current = this.resources.cpu.baseline;
        this.resources.memory.current = this.resources.memory.baseline;
        this.resources.connections.current = 0;
        this.resources.connections.halfOpen = 0;
        this.resources.bandwidth.current = this.resources.bandwidth.baseline;
        
        this.metrics.packetsProcessed = 0;
        this.metrics.packetsDropped = 0;
        this.metrics.responseTime = 10;
        this.metrics.availability = 100;
        
        this.legitimateProcessed = 0;
        this.legitimateDropped = 0;
        
        this.status = 'normal';
    };
};