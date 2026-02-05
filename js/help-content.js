// NetworkSimulator - Help Content
// Educational information for network concepts and features

const helpContent = {
    // ============ APPLICATION OVERVIEW ============
    app_overview: {
        title: "Welcome to Network Simulator! 🌐",
        content: `
            <div class="help-section">
                <h3>🎯 What is Network Simulator?</h3>
                <p>Network Simulator is an <strong>interactive learning tool</strong> that lets you design, build, and test computer networks in a safe virtual environment. It's like having your own networking lab where you can experiment without breaking anything!</p>

                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; border-left:4px solid #667eea;">
                    <strong style="color:#667eea;">Perfect For:</strong>
                    <div style="margin:10px 0 0 0; line-height:1.8;">
                        <div>Students learning networking fundamentals</div>
                        <div>IT certification prep (CompTIA Network+, Cisco CCNA, CCST Cybersecurity)</div>
                        <div>Teachers demonstrating network concepts</div>
                        <div>Anyone curious about how the internet works!</div>
                    </div>
                </div>
            </div>

            <div class="help-section">
                <h3>✨ What Can You Build?</h3>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:15px 0;">
                    <div style="background:#16213e; padding:12px; border-radius:6px;">
                        <div style="font-size:24px; margin-bottom:8px;">🏠</div>
                        <strong style="color:#10b981;">Home Networks</strong>
                        <p style="font-size:12px; color:#9ca3af; margin:5px 0 0 0;">Router, WiFi, smart devices, gaming consoles</p>
                    </div>
                    <div style="background:#16213e; padding:12px; border-radius:6px;">
                        <div style="font-size:24px; margin-bottom:8px;">🏢</div>
                        <strong style="color:#3b82f6;">Business Networks</strong>
                        <p style="font-size:12px; color:#9ca3af; margin:5px 0 0 0;">Servers, departments, VLANs, security</p>
                    </div>
                    <div style="background:#16213e; padding:12px; border-radius:6px;">
                        <div style="font-size:24px; margin-bottom:8px;">☁️</div>
                        <strong style="color:#8b5cf6;">Data Centers</strong>
                        <p style="font-size:12px; color:#9ca3af; margin:5px 0 0 0;">Web servers, databases, load balancing</p>
                    </div>
                    <div style="background:#16213e; padding:12px; border-radius:6px;">
                        <div style="font-size:24px; margin-bottom:8px;">🔒</div>
                        <strong style="color:#ef4444;">Security Labs</strong>
                        <p style="font-size:12px; color:#9ca3af; margin:5px 0 0 0;">Firewalls, VPNs, intrusion detection</p>
                    </div>
                </div>
            </div>

            <div class="help-section">
                <h3>🚀 Quick Start Guide</h3>
                <div style="background:#16213e; padding:20px; border-radius:8px; margin:15px 0;">
                    <div style="display:flex; align-items:start; gap:15px; margin-bottom:15px;">
                        <div style="background:#667eea; color:white; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0;">1</div>
                        <div>
                            <strong style="color:#667eea;">Add Devices</strong>
                            <p style="margin:5px 0 0 0; font-size:13px; color:#e4e4e7;">Click <strong>💻 Add Device</strong> to add computers, laptops, phones. Click <strong>🔌 Add Switch</strong> or <strong>📡 Add Router</strong> to connect them.</p>
                        </div>
                    </div>
                    <div style="display:flex; align-items:start; gap:15px; margin-bottom:15px;">
                        <div style="background:#667eea; color:white; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0;">2</div>
                        <div>
                            <strong style="color:#667eea;">Connect Devices</strong>
                            <p style="margin:5px 0 0 0; font-size:13px; color:#e4e4e7;">Click a device, then click another device to draw a cable between them. It's that simple!</p>
                        </div>
                    </div>
                    <div style="display:flex; align-items:start; gap:15px; margin-bottom:15px;">
                        <div style="background:#667eea; color:white; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0;">3</div>
                        <div>
                            <strong style="color:#667eea;">Configure IP Addresses</strong>
                            <p style="margin:5px 0 0 0; font-size:13px; color:#e4e4e7;">Right-click a device → <strong>Edit IP Info</strong> to set its IP address, or add a <strong>🌐 DHCP Server</strong> to assign IPs automatically.</p>
                        </div>
                    </div>
                    <div style="display:flex; align-items:start; gap:15px;">
                        <div style="background:#667eea; color:white; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0;">4</div>
                        <div>
                            <strong style="color:#667eea;">Test Your Network</strong>
                            <p style="margin:5px 0 0 0; font-size:13px; color:#e4e4e7;">Right-click a computer → <strong>Open Terminal</strong> → Type <code style="background:#1a1a2e; padding:2px 6px; border-radius:3px;">ping 192.168.1.5</code> to test connectivity!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="help-section">
                <h3>🎓 Learning Path</h3>
                <p>Here's a recommended order to learn networking concepts:</p>
                <div style="margin:10px 0; line-height:1.8;">
                    <div><strong>1. Start Simple:</strong> Build a 2-computer network with a switch</div>
                    <div><strong>2. Add IP Addressing:</strong> Learn about IP addresses and subnet masks</div>
                    <div><strong>3. Expand Networks:</strong> Add routers to connect multiple networks</div>
                    <div><strong>4. Add Services:</strong> Set up DHCP, DNS, and web servers</div>
                    <div><strong>5. Secure It:</strong> Add firewalls and configure access controls</div>
                    <div><strong>6. Go Wireless:</strong> Add WiFi access points and wireless devices</div>
                    <div><strong>7. Advanced Topics:</strong> VLANs, VPNs, network troubleshooting</div>
                </div>
            </div>

            <div class="help-section">
                <h3>💡 Key Features</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <tbody>
                        <tr>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:#16213e !important; width:140px;"><strong style="color:#667eea;">🖱️ Drag & Drop</strong></td>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Easy visual interface - click to add, drag to move, right-click for options</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:#16213e !important;"><strong style="color:#667eea;">🔌 Auto-Connect</strong></td>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Click two devices to automatically create cables between them</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:#16213e !important;"><strong style="color:#667eea;">💻 Real Terminal</strong></td>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Use real networking commands: ping, traceroute, ipconfig, nslookup</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:#16213e !important;"><strong style="color:#667eea;">📊 Packet Viewer</strong></td>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Watch network traffic flow in real-time and inspect packet contents</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:#16213e !important;"><strong style="color:#667eea;">🌐 Web Browser</strong></td>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Simulated web browser to visit websites hosted on your network</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:#16213e !important;"><strong style="color:#667eea;">📧 Email Client</strong></td>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Send and receive emails between devices on your network</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:#16213e !important;"><strong style="color:#667eea;">💾 Save & Share</strong></td>
                            <td style="padding:10px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Save your network designs and share them with classmates or teachers</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🎮 Try These Projects</h3>
                <div style="background:#16213e; padding:15px; border-radius:6px; margin-bottom:10px;">
                    <strong style="color:#10b981;">🏠 Home Network</strong>
                    <p style="font-size:13px; margin:8px 0 0 0;">Build a home network with router, WiFi, laptops, smartphones, and smart TV. Set up DHCP for automatic IP assignment.</p>
                </div>
                <div style="background:#16213e; padding:15px; border-radius:6px; margin-bottom:10px;">
                    <strong style="color:#3b82f6;">🏫 School Network</strong>
                    <p style="font-size:13px; margin:8px 0 0 0;">Create separate networks for students, teachers, and admin. Use VLANs and firewalls to control access.</p>
                </div>
                <div style="background:#16213e; padding:15px; border-radius:6px; margin-bottom:10px;">
                    <strong style="color:#f59e0b;">🌍 Web Server Setup</strong>
                    <p style="font-size:13px; margin:8px 0 0 0;">Set up a web server with DNS so other computers can visit your website by typing a domain name.</p>
                </div>
                <div style="background:#16213e; padding:15px; border-radius:6px;">
                    <strong style="color:#ef4444;">🛡️ Security Challenge</strong>
                    <p style="font-size:13px; margin:8px 0 0 0;">Add a firewall between networks and configure rules to block specific ports or IP addresses.</p>
                </div>
            </div>

            <div class="help-section">
                <h3>❓ Need More Help?</h3>
                <p>Look for the <strong style="background:#667eea; color:white; padding:2px 8px; border-radius:10px; font-size:12px;">?</strong> icons throughout the application for context-specific help on:</p>
                <div style="margin:10px 0; line-height:1.8;">
                    <div>IP addressing and subnetting</div>
                    <div>DHCP server configuration</div>
                    <div>DNS setup</div>
                    <div>Firewall rules</div>
                    <div>And much more!</div>
                </div>
            </div>

            <div style="background:#16213e; padding:20px; border-radius:8px; margin-top:20px; border-left:4px solid #10b981;">
                <strong style="color:#10b981; font-size:16px;">💪 Ready to Start?</strong>
                <p style="margin:10px 0 0 0;">Close this help window and start building! Remember: you can't break anything - this is a safe learning environment. Experiment, make mistakes, and learn from them!</p>
            </div>
        `
    },

    // ============ FUNDAMENTALS ============
    networking_basics: {
        title: "What is a Network?",
        content: `
            <h3>🌐 What is a Computer Network?</h3>
            <p>A <strong>computer network</strong> is two or more computers connected together to share information and resources. Think of it like a neighborhood where houses (computers) are connected by roads (cables) so people can visit each other and share things!</p>

            <h3>📡 Why Do We Need Networks?</h3>
            <ul>
                <li><strong>Share Files:</strong> Send documents, photos, and videos between computers</li>
                <li><strong>Share Devices:</strong> Use the same printer, scanner, or storage from multiple computers</li>
                <li><strong>Communication:</strong> Send emails, chat messages, and video calls</li>
                <li><strong>Access Resources:</strong> Browse websites, stream videos, play online games</li>
            </ul>

            <div class="help-tip">
                <strong>Real World:</strong> Your school has a network! When you save a file to the school server, print a document, or access the internet, you're using the school network.
            </div>

            <h3>🏠 Types of Networks</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Size</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>LAN</strong> (Local Area Network)</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">One building/campus</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Your home or school network</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>WAN</strong> (Wide Area Network)</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Cities/countries</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">The Internet</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>MAN</strong> (Metropolitan Network)</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Across a city</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">City-wide WiFi</td>
                    </tr>
                </tbody>
            </table>

            <h3>🔌 Network Components</h3>
            <ul>
                <li><strong>Computers/Devices:</strong> The endpoints that send and receive data (also called "hosts")</li>
                <li><strong>Cables/WiFi:</strong> The physical connections that carry data</li>
                <li><strong>Switches:</strong> Connect multiple devices in the same network</li>
                <li><strong>Routers:</strong> Connect different networks together and direct traffic</li>
                <li><strong>Servers:</strong> Computers that provide services (web pages, files, email)</li>
            </ul>

            <div class="help-example">
                <div class="help-example-title">Try It in the Simulator!</div>
                <p>Create your first network:</p>
                <ol>
                    <li>Add a <strong>Router</strong> from the toolbar</li>
                    <li>Add two <strong>Computers</strong></li>
                    <li>Connect them to the router using links</li>
                    <li>Configure IP addresses on each interface</li>
                    <li>Try pinging from one computer to another!</li>
                </ol>
            </div>
        `
    },

    ip_addressing: {
        title: "IP Addresses Explained",
        content: `
            <h3>📫 What is an IP Address?</h3>
            <p>An <strong>IP (Internet Protocol) address</strong> is a unique number that identifies each device on a network. It's like a street address for your computer - it tells other devices where to send information!</p>

            <h3>🔢 IP Address Format (IPv4)</h3>
            <p>IPv4 addresses are written as four numbers (0-255) separated by dots:</p>
            <div style="background:#16213e; padding:15px; border-radius:6px; font-family:monospace; font-size:16px; text-align:center; margin:15px 0;">
                <span style="color:#10b981;">192</span>.<span style="color:#3b82f6;">168</span>.<span style="color:#f59e0b;">1</span>.<span style="color:#ef4444;">100</span>
            </div>
            <p>Each number is called an <strong>octet</strong> (because it's 8 bits in binary)</p>

            <div class="help-tip">
                <strong>Real World Analogy:</strong> IP addresses are like phone numbers. Just as you need someone's phone number to call them, computers need IP addresses to communicate with each other!
            </div>

            <h3>🏠 Private vs Public IP Addresses</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Range</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Private</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">
                            10.0.0.0 - 10.255.255.255<br>
                            172.16.0.0 - 172.31.255.255<br>
                            192.168.0.0 - 192.168.255.255
                        </td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Home/office networks (not on internet)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Public</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">All other addresses</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Internet-facing servers and routers</td>
                    </tr>
                </tbody>
            </table>

            <h3>🎯 Special IP Addresses</h3>
            <ul>
                <li><strong>127.0.0.1</strong> - "Localhost" - Your own computer (always)</li>
                <li><strong>0.0.0.0</strong> - "Any address" - Used for default routes</li>
                <li><strong>255.255.255.255</strong> - Broadcast - Sends to everyone on network</li>
                <li><strong>192.168.1.1</strong> - Common default gateway (home routers)</li>
            </ul>

            <div class="help-example">
                <div class="help-example-title">Example: Home Network</div>
                <p>Typical home network setup:</p>
                <ul>
                    <li><strong>Router:</strong> 192.168.1.1</li>
                    <li><strong>Your Computer:</strong> 192.168.1.100</li>
                    <li><strong>Your Phone:</strong> 192.168.1.101</li>
                    <li><strong>Smart TV:</strong> 192.168.1.102</li>
                </ul>
                <p>All devices are in the same "neighborhood" (192.168.1.x) and can talk to each other!</p>
            </div>

            <h3>📝 IP Address Assignment</h3>
            <p>Devices can get IP addresses two ways:</p>
            <ul>
                <li><strong>Static:</strong> You manually configure the IP address (never changes)</li>
                <li><strong>Dynamic (DHCP):</strong> Router automatically assigns IP addresses (can change)</li>
            </ul>

            <div class="help-tip">
                <strong>In the Simulator:</strong> Right-click a device → Network → Edit IP Info to configure its IP address!
            </div>
        `
    },

    subnetting: {
        title: "Subnet Masks & Subnetting",
        content: `
            <h3>🎭 What is a Subnet Mask?</h3>
            <p>A <strong>subnet mask</strong> tells a computer which part of an IP address is the "network" and which part is the "device." It's like knowing which numbers in a street address are the street and which are the house number!</p>

            <h3>🔍 How Subnet Masks Work</h3>
            <p>Every IP address has a partner - its subnet mask:</p>
            <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0;">
                <p style="margin:0; font-family:monospace;">
                    <strong>IP Address:</strong> &nbsp;&nbsp;&nbsp;192.168.1.100<br>
                    <strong>Subnet Mask:</strong> 255.255.255.0
                </p>
            </div>
            <p>The <strong>255</strong> parts are the "network portion" and <strong>0</strong> is the "host portion"</p>

            <div class="help-tip">
                <strong>Street Address Analogy:</strong><br>
                Think of "123 Oak Street" as an address:<br>
                • "Oak Street" = Network portion (which neighborhood)<br>
                • "123" = Host portion (which house on that street)<br>
                Subnet mask tells you where the street ends and house number begins!
            </div>

            <h3>📊 Common Subnet Masks</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Subnet Mask</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">CIDR</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Hosts</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use Case</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">255.255.255.0</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">/24</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">254 devices</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Home/small office</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">255.255.0.0</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">/16</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">65,534 devices</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Large organization</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">255.255.255.252</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">/30</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2 devices</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Router-to-router link</td>
                    </tr>
                </tbody>
            </table>

            <h3>🎯 CIDR Notation</h3>
            <p>Instead of writing 255.255.255.0, network engineers use <strong>CIDR</strong> (Classless Inter-Domain Routing):</p>
            <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; text-align:center;">
                192.168.1.0<span style="color:#667eea; font-weight:bold;">/24</span>
            </div>
            <p>The <strong>/24</strong> means "first 24 bits are the network portion" (same as 255.255.255.0)</p>

            <div class="help-example">
                <div class="help-example-title">Example: Same Network or Different?</div>
                <p><strong>Question:</strong> Can these two devices talk directly?</p>
                <ul>
                    <li>Device A: 192.168.1.50 / 255.255.255.0</li>
                    <li>Device B: 192.168.1.200 / 255.255.255.0</li>
                </ul>
                <p><strong>Answer:</strong> YES! They're on the same network (192.168.1.x)</p>

                <p><strong>Question:</strong> How about these?</p>
                <ul>
                    <li>Device C: 192.168.1.50 / 255.255.255.0</li>
                    <li>Device D: 192.168.2.50 / 255.255.255.0</li>
                </ul>
                <p><strong>Answer:</strong> NO! Different networks (192.168.1.x vs 192.168.2.x) - need a router!</p>
            </div>

            <h3>🏢 Why Subnet?</h3>
            <p>Subnetting divides a large network into smaller pieces:</p>
            <ul>
                <li><strong>Security:</strong> Separate departments (Finance, HR, Students)</li>
                <li><strong>Performance:</strong> Reduce broadcast traffic</li>
                <li><strong>Organization:</strong> Logical grouping of devices</li>
                <li><strong>Efficiency:</strong> Use IP addresses more efficiently</li>
            </ul>

            <div class="help-tip">
                <strong>Key Rule:</strong> Devices on the same subnet can talk directly. Devices on different subnets need a router to communicate!
            </div>
        `
    },

    default_gateway: {
        title: "Default Gateway Concept",
        content: `
            <h3>🚪 What is a Default Gateway?</h3>
            <p>A <strong>default gateway</strong> is the "door" that lets your computer communicate with devices outside your local network. It's the router's IP address that your computer sends traffic to when it doesn't know where else to send it!</p>

            <div class="help-tip">
                <strong>Real World Analogy:</strong> Imagine your house (computer) is in a neighborhood (local network). Your front door opens to your street where you can visit neighbors. But to visit someone in a different city, you need to drive to the highway entrance (default gateway) first!
            </div>

            <h3>🔄 How Default Gateway Works</h3>
            <p>When your computer wants to send data:</p>
            <ol>
                <li><strong>Check destination:</strong> Is it on my local network?</li>
                <li><strong>Same network?</strong> Send directly to that device</li>
                <li><strong>Different network?</strong> Send to default gateway (router)</li>
                <li><strong>Router decides:</strong> Where to forward the packet next</li>
            </ol>

            <div class="help-example">
                <div class="help-example-title">Example Network</div>
                <div style="background:#16213e; padding:15px; border-radius:6px; margin:10px 0;">
                    <p style="margin:0;"><strong>Your Computer:</strong></p>
                    <p style="margin:5px 0; font-family:monospace;">
                        IP Address: 192.168.1.100<br>
                        Subnet Mask: 255.255.255.0<br>
                        Default Gateway: 192.168.1.1
                    </p>
                </div>

                <p><strong>Scenario 1:</strong> Ping 192.168.1.50</p>
                <p style="margin-left:20px;">✅ Same network (192.168.1.x) → Send directly!</p>

                <p><strong>Scenario 2:</strong> Visit www.google.com (172.217.14.206)</p>
                <p style="margin-left:20px;">✅ Different network → Send to gateway (192.168.1.1)</p>
                <p style="margin-left:20px;">→ Router forwards to internet</p>
            </div>

            <h3>❌ What Happens Without a Gateway?</h3>
            <ul>
                <li>✅ You CAN communicate with devices on your local network</li>
                <li>❌ You CANNOT reach the internet</li>
                <li>❌ You CANNOT reach other networks</li>
                <li>❌ You'll see "Network Unreachable" errors</li>
            </ul>

            <h3>🏠 Common Gateway Addresses</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Network</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Typical Gateway</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">192.168.1.0/24</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">192.168.1.1</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">192.168.0.0/24</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">192.168.0.1</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">10.0.0.0/24</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">10.0.0.1</td>
                    </tr>
                </tbody>
            </table>
            <p><em>Usually the first usable IP address in the network!</em></p>

            <h3>🔧 Configuring Gateway in Simulator</h3>
            <ol>
                <li>Right-click a device</li>
                <li>Select <strong>Network → Edit Gateways</strong></li>
                <li>Enter the router's IP address</li>
                <li>Click Save</li>
            </ol>

            <div class="help-tip">
                <strong>Quick Test:</strong> After setting a gateway, try pinging a device on a different network. If it works, your gateway is configured correctly!
            </div>

            <h3>⚠️ Common Mistakes</h3>
            <ul>
                <li><strong>Wrong gateway IP:</strong> Must be an IP on your local network</li>
                <li><strong>Gateway unreachable:</strong> Router must be powered on and connected</li>
                <li><strong>Subnet mismatch:</strong> Gateway must be in same subnet as your device</li>
            </ul>
        `
    },

    mac_addresses: {
        title: "MAC Addresses",
        content: `
            <h3>🏷️ What is a MAC Address?</h3>
            <p>A <strong>MAC (Media Access Control) address</strong> is a permanent hardware address built into every network device. Unlike IP addresses which can change, MAC addresses are burned into the device at the factory and stay the same forever!</p>

            <div class="help-tip">
                <strong>Real World Analogy:</strong> Think of MAC addresses like a car's VIN (Vehicle Identification Number) - it's permanently assigned at manufacture. Your IP address is like your current parking spot - it can change!
            </div>

            <h3>🔢 MAC Address Format</h3>
            <p>MAC addresses are 48-bit numbers written in hexadecimal:</p>
            <div style="background:#16213e; padding:15px; border-radius:6px; font-family:monospace; font-size:14px; text-align:center; margin:15px 0;">
                <span style="color:#10b981;">00:1A:2B</span>:<span style="color:#3b82f6;">3C:4D:5E</span>
            </div>
            <ul>
                <li>First 3 bytes (00:1A:2B) = Manufacturer ID</li>
                <li>Last 3 bytes (3C:4D:5E) = Device serial number</li>
            </ul>

            <h3>🆚 IP Address vs MAC Address</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Feature</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">MAC Address</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">IP Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Layer</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Layer 2 (Data Link)</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Layer 3 (Network)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Scope</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Local network only</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Can route across networks</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Assigned</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">At factory (permanent)</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">By network admin (changeable)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Used For</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Local delivery</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">End-to-end routing</td>
                    </tr>
                </tbody>
            </table>

            <h3>🔄 How MAC and IP Work Together</h3>
            <div class="help-example">
                <div class="help-example-title">Sending a Packet</div>
                <p><strong>Scenario:</strong> Computer A (192.168.1.100) wants to ping Computer B (192.168.1.200)</p>
                <ol>
                    <li><strong>IP Layer:</strong> "I need to send to 192.168.1.200"</li>
                    <li><strong>ARP:</strong> "What's the MAC address for 192.168.1.200?"</li>
                    <li><strong>ARP Response:</strong> "It's 00:1A:2B:3C:4D:5E"</li>
                    <li><strong>MAC Layer:</strong> Package data with destination MAC address</li>
                    <li><strong>Switch:</strong> Delivers to device with that MAC address</li>
                </ol>
            </div>

            <h3>📋 ARP (Address Resolution Protocol)</h3>
            <p>ARP is the "translator" between IP and MAC addresses:</p>
            <ul>
                <li>Device knows destination IP address</li>
                <li>Broadcasts "Who has IP 192.168.1.200?"</li>
                <li>Device with that IP responds with its MAC address</li>
                <li>MAC address cached in ARP table for future use</li>
            </ul>

            <div class="help-tip">
                <strong>In the Simulator:</strong> Right-click a device → Network → View ARP Cache to see the IP-to-MAC mappings!
            </div>
        `
    },

    tcp_vs_udp: {
        title: "TCP vs UDP Protocols",
        content: `
            <h3>📦 Transport Layer Protocols</h3>
            <p><strong>TCP</strong> (Transmission Control Protocol) and <strong>UDP</strong> (User Datagram Protocol) are the two main ways data is transported across networks. Think of them as two different shipping services!</p>

            <h3>🤝 TCP - Reliable Delivery</h3>
            <p>TCP is like certified mail - guarantees delivery with tracking:</p>
            <ul>
                <li><strong>Connection-based:</strong> Establishes connection before sending</li>
                <li><strong>Reliable:</strong> Guarantees all data arrives</li>
                <li><strong>Ordered:</strong> Packets arrive in correct order</li>
                <li><strong>Error checking:</strong> Resends lost packets</li>
                <li><strong>Slower:</strong> Extra overhead for reliability</li>
            </ul>

            <div class="help-example">
                <div class="help-example-title">TCP 3-Way Handshake</div>
                <p>Before sending data, TCP establishes a connection:</p>
                <ol>
                    <li><strong>Client:</strong> SYN (synchronize) - "Want to connect?"</li>
                    <li><strong>Server:</strong> SYN-ACK (synchronize-acknowledge) - "OK, I'm ready!"</li>
                    <li><strong>Client:</strong> ACK (acknowledge) - "Great, let's go!"</li>
                </ol>
                <p>Now data can flow reliably in both directions!</p>
            </div>

            <h3>⚡ UDP - Fast Delivery</h3>
            <p>UDP is like a postcard - fast but no guarantees:</p>
            <ul>
                <li><strong>Connectionless:</strong> Just sends data immediately</li>
                <li><strong>Unreliable:</strong> No guarantee of delivery</li>
                <li><strong>Unordered:</strong> Packets may arrive out of order</li>
                <li><strong>No error checking:</strong> Doesn't resend lost packets</li>
                <li><strong>Faster:</strong> Minimal overhead</li>
            </ul>

            <h3>📊 When to Use Each</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use TCP For</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use UDP For</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                            • Web browsing (HTTP/HTTPS)<br>
                            • Email (SMTP, POP3, IMAP)<br>
                            • File transfers (FTP)<br>
                            • Databases<br>
                            • SSH remote access
                        </td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                            • Video streaming<br>
                            • Online gaming<br>
                            • Voice calls (VoIP)<br>
                            • DNS lookups<br>
                            • Live broadcasts
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="help-tip">
                <strong>Key Rule:</strong> If you need ALL data to arrive correctly (like a file download), use TCP. If speed matters more than perfect delivery (like a video call), use UDP!
            </div>

            <h3>🎮 Real World Example: Online Gaming</h3>
            <div class="help-example">
                <p><strong>Game uses both protocols:</strong></p>
                <ul>
                    <li><strong>TCP:</strong> Chat messages, inventory updates, login/authentication</li>
                    <li><strong>UDP:</strong> Player positions, shooting, real-time movement</li>
                </ul>
                <p><strong>Why?</strong> Missing one player position update isn't critical (next update comes 16ms later), but losing a chat message would be annoying!</p>
            </div>
        `
    },

    ports_and_services: {
        title: "Ports and Services",
        content: `
            <h3>🚪 What are Network Ports?</h3>
            <p><strong>Ports</strong> are like apartment numbers in a building. The IP address gets you to the building (computer), and the port number directs you to the specific apartment (application) inside!</p>

            <div class="help-tip">
                <strong>Analogy:</strong> IP address = Street address (123 Main St)<br>
                Port number = Apartment number (Apt 80)<br>
                Together: 192.168.1.100:80 means "Computer 192.168.1.100, web server application"
            </div>

            <h3>🔢 Port Number Ranges</h3>
            <p>Ports are numbered 0-65535 and divided into categories:</p>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Range</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Name</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">0-1023</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Well-Known</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Standard services (HTTP, FTP, SSH)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">1024-49151</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Registered</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Registered applications (games, apps)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">49152-65535</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Dynamic/Private</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Temporary client ports</td>
                    </tr>
                </tbody>
            </table>

            <h3>📋 Common Port Numbers</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Port</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Protocol</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Service</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">80</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TCP</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">HTTP (Web browsing)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">443</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TCP</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">HTTPS (Secure web)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">25</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TCP</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">SMTP (Send email)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">110</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TCP</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">POP3 (Receive email)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">53</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">UDP</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DNS (Name lookup)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">22</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TCP</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">SSH (Secure remote access)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">3389</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TCP</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">RDP (Remote Desktop)</td>
                    </tr>
                </tbody>
            </table>

            <h3>🔄 How Ports Work</h3>
            <div class="help-example">
                <div class="help-example-title">Example: Browsing a Website</div>
                <ol>
                    <li><strong>You type:</strong> www.example.com in browser</li>
                    <li><strong>DNS resolves:</strong> example.com → 93.184.216.34</li>
                    <li><strong>Browser connects:</strong> 93.184.216.34:80 (HTTP port)</li>
                    <li><strong>Your computer uses:</strong> Random high port like 51234</li>
                    <li><strong>Connection:</strong> Your PC:51234 ↔ Server:80</li>
                    <li><strong>Data flows:</strong> Web page downloads through this connection</li>
                </ol>
            </div>

            <h3>🛡️ Port Security</h3>
            <p>Firewalls control which ports are open:</p>
            <ul>
                <li><strong>Open Port:</strong> Accepts connections (server listening)</li>
                <li><strong>Closed Port:</strong> Rejects connections</li>
                <li><strong>Filtered Port:</strong> Firewall blocking access</li>
            </ul>

            <div class="help-tip">
                <strong>Security Best Practice:</strong> Only open ports you actually need! Every open port is a potential entry point for attackers.
            </div>

            <h3>🎮 In the Simulator</h3>
            <p>Configure services on different ports:</p>
            <ul>
                <li>HTTP Server runs on port 80</li>
                <li>Email Server uses ports 25 (SMTP) and 110 (POP3)</li>
                <li>Game Servers can use custom ports</li>
                <li>Firewall rules can block/allow specific ports</li>
            </ul>
        `
    },

    client_server: {
        title: "Client-Server Model",
        content: `
            <h3>🤝 What is Client-Server?</h3>
            <p>The <strong>client-server model</strong> is how most network applications work. One computer (the <strong>server</strong>) provides a service, and other computers (the <strong>clients</strong>) use that service. It's like a restaurant where the server provides food to customers!</p>

            <div class="help-tip">
                <strong>Real World Analogy:</strong><br>
                • <strong>Server</strong> = Restaurant kitchen (prepares food)<br>
                • <strong>Client</strong> = Customer (orders and consumes food)<br>
                • <strong>Protocol</strong> = Menu (defines what can be ordered and how)
            </div>

            <h3>🖥️ Server Characteristics</h3>
            <ul>
                <li><strong>Always On:</strong> Running 24/7 waiting for requests</li>
                <li><strong>Listens:</strong> Waits for client connections on specific port</li>
                <li><strong>Responds:</strong> Processes requests and sends back data</li>
                <li><strong>Serves Many:</strong> Handles multiple clients simultaneously</li>
                <li><strong>Known Address:</strong> Has fixed IP/domain name</li>
            </ul>

            <h3>💻 Client Characteristics</h3>
            <ul>
                <li><strong>Initiates:</strong> Starts the connection to server</li>
                <li><strong>Requests:</strong> Asks for specific service/data</li>
                <li><strong>Temporary:</strong> Connects only when needed</li>
                <li><strong>Dynamic Address:</strong> IP address may change (DHCP)</li>
                <li><strong>Consumes:</strong> Uses the service provided</li>
            </ul>

            <h3>🔄 How Client-Server Works</h3>
            <div class="help-example">
                <div class="help-example-title">Example: Web Browsing</div>
                <ol>
                    <li><strong>Server Setup:</strong> Web server runs on port 80, waiting...</li>
                    <li><strong>Client Request:</strong> Browser connects to server:80</li>
                    <li><strong>Client Sends:</strong> "GET /index.html HTTP/1.1"</li>
                    <li><strong>Server Processes:</strong> Finds requested page</li>
                    <li><strong>Server Responds:</strong> Sends HTML, images, CSS</li>
                    <li><strong>Client Displays:</strong> Browser renders the page</li>
                    <li><strong>Connection Closes:</strong> Task complete!</li>
                </ol>
            </div>

            <h3>📊 Common Client-Server Services</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Service</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Server</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Client</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Web</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Apache, Nginx</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Chrome, Firefox</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Email</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Exchange, Postfix</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Outlook, Thunderbird</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DNS</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">BIND, PowerDNS</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">OS resolver</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>File Sharing</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">FTP Server</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">FileZilla</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Gaming</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Game Server</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Game Client</td>
                    </tr>
                </tbody>
            </table>

            <h3>🎯 Advantages of Client-Server</h3>
            <ul>
                <li><strong>Centralized:</strong> Data stored in one place (easier backup)</li>
                <li><strong>Security:</strong> Server can enforce access control</li>
                <li><strong>Updates:</strong> Update server once, all clients benefit</li>
                <li><strong>Resources:</strong> Server can be powerful, clients can be simple</li>
                <li><strong>Sharing:</strong> Multiple clients share same data/resources</li>
            </ul>

            <h3>⚡ Peer-to-Peer Alternative</h3>
            <p>Not all networks use client-server! <strong>Peer-to-peer (P2P)</strong> is different:</p>
            <ul>
                <li>No dedicated server - all computers are equal</li>
                <li>Each computer can be both client and server</li>
                <li>Examples: BitTorrent, old LAN games</li>
                <li>Good for: File sharing, distributed systems</li>
                <li>Bad for: Centralized control, enterprise apps</li>
            </ul>

            <div class="help-tip">
                <strong>In the Simulator:</strong> You can create servers (HTTP, DNS, DHCP, Email) and connect clients to them. Try setting up a web server and accessing it from a client computer!
            </div>
        `
    },

    private_vs_public_ips: {
        title: "Private vs Public IP Addresses",
        content: `
            <h3>🌍 Two Types of IP Addresses</h3>
            <p>Not all IP addresses are created equal! There are <strong>private IPs</strong> (for your local network) and <strong>public IPs</strong> (for the internet).</p>

            <div class="help-tip">
                <strong>Analogy:</strong> Private IPs are like apartment numbers within a building (192.168.1.10 = Apt 10). Public IPs are like the building's street address that mail carriers use. Both are needed to deliver a package!
            </div>

            <h3>🏠 Private IP Address Ranges</h3>
            <p>These are reserved for use ONLY on local networks (home, office, school):</p>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Class</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Range</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Typical Use</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Class A</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">10.0.0.0 - 10.255.255.255</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Large corporations</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Class B</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">172.16.0.0 - 172.31.255.255</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Medium networks</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Class C</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">192.168.0.0 - 192.168.255.255</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Home/small office</td>
                    </tr>
                </tbody>
            </table>

            <div class="help-example">
                <div class="help-example-title">Example: Home Network</div>
                <p>Your home router uses <strong>private IPs</strong> inside your house:</p>
                <ul>
                    <li>Router: 192.168.1.1</li>
                    <li>Laptop: 192.168.1.100</li>
                    <li>Phone: 192.168.1.101</li>
                </ul>
                <p>But your router has ONE <strong>public IP</strong> from your ISP:</p>
                <ul>
                    <li>Public IP: 203.45.67.89 (visible to the internet)</li>
                </ul>
            </div>

            <h3>🌐 Public IP Addresses</h3>
            <p>All other IP addresses are <strong>public</strong> and can be used on the internet:</p>
            <ul>
                <li><strong>Unique worldwide:</strong> No two public IPs are the same</li>
                <li><strong>Assigned by ISPs:</strong> Internet Service Providers manage them</li>
                <li><strong>Routable:</strong> Can communicate across the internet</li>
                <li><strong>Limited:</strong> IPv4 has only ~4 billion addresses (we're running out!)</li>
            </ul>

            <h3>🔄 NAT: Bridging Private and Public</h3>
            <p><strong>NAT (Network Address Translation)</strong> lets many private IPs share one public IP:</p>
            <div class="help-example">
                <p><strong>How it works:</strong></p>
                <ol>
                    <li>Your laptop (192.168.1.100) requests a website</li>
                    <li>Router replaces your private IP with its public IP (203.45.67.89)</li>
                    <li>Website responds to the public IP</li>
                    <li>Router forwards response back to your laptop</li>
                </ol>
                <p><strong>Result:</strong> 100+ devices in your home can share 1 public IP!</p>
            </div>

            <h3>📊 Key Differences</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Feature</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Private IP</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Public IP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Uniqueness</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Reused in many networks</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Unique worldwide</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Internet Access</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Cannot directly access internet</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Directly routable on internet</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Cost</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Free (use as many as needed)</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Expensive (ISPs charge for them)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Security</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Hidden from internet (safer)</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Exposed to internet (needs firewall)</td>
                    </tr>
                </tbody>
            </table>

            <div class="help-tip">
                <strong>Why Private IPs Exist:</strong> IPv4 only has 4.3 billion addresses, but we have way more devices! Private IPs + NAT solved this problem by letting millions of networks reuse the same private ranges.
            </div>
        `
    },

    network_topologies: {
        title: "Network Topologies",
        content: `
            <h3>🗺️ What is Network Topology?</h3>
            <p><strong>Network topology</strong> is the physical or logical arrangement of devices in a network. It's like the floor plan of your network - how everything is connected together!</p>

            <h3>🌟 Star Topology (Most Common)</h3>
            <div class="help-example">
                <p><strong>Design:</strong> All devices connect to a central hub/switch</p>
                <div style="text-align:center; font-family:monospace; font-size:20px; margin:15px 0;">
                    <span style="color:#3b82f6;">💻</span>
                    &nbsp;&nbsp;&nbsp;
                    <span style="color:#3b82f6;">💻</span><br>
                    &nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;/<br>
                    &nbsp;&nbsp;&nbsp;<span style="color:#667eea;">⬡</span><br>
                    &nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;\<br>
                    <span style="color:#3b82f6;">💻</span>
                    &nbsp;&nbsp;&nbsp;
                    <span style="color:#3b82f6;">💻</span>
                </div>
                <p><strong>✅ Advantages:</strong></p>
                <ul>
                    <li>Easy to add/remove devices</li>
                    <li>One cable failure only affects one device</li>
                    <li>Easy to troubleshoot</li>
                    <li>Most common in homes/offices</li>
                </ul>
                <p><strong>❌ Disadvantages:</strong></p>
                <ul>
                    <li>If central switch fails, entire network goes down</li>
                    <li>Requires more cable than bus topology</li>
                </ul>
                <p><strong>Examples:</strong> Home WiFi router, office Ethernet network</p>
            </div>

            <h3>🚌 Bus Topology</h3>
            <div class="help-example">
                <p><strong>Design:</strong> All devices connect to a single cable (backbone)</p>
                <div style="text-align:center; font-family:monospace; font-size:20px; margin:15px 0;">
                    <span style="color:#3b82f6;">💻</span>&nbsp;&nbsp;<span style="color:#3b82f6;">💻</span>&nbsp;&nbsp;<span style="color:#3b82f6;">💻</span>&nbsp;&nbsp;<span style="color:#3b82f6;">💻</span><br>
                    |&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|<br>
                    <span style="color:#667eea;">═══════════════</span>
                </div>
                <p><strong>✅ Advantages:</strong></p>
                <ul>
                    <li>Uses least amount of cable</li>
                    <li>Cheap and simple</li>
                    <li>Easy to extend</li>
                </ul>
                <p><strong>❌ Disadvantages:</strong></p>
                <ul>
                    <li>If backbone cable breaks, entire network fails</li>
                    <li>Difficult to troubleshoot</li>
                    <li>Performance degrades with more devices</li>
                </ul>
                <p><strong>Examples:</strong> Old Ethernet (10Base2), rarely used today</p>
            </div>

            <h3>🔗 Ring Topology</h3>
            <div class="help-example">
                <p><strong>Design:</strong> Devices connected in a circle, data travels one direction</p>
                <div style="text-align:center; font-family:monospace; font-size:20px; margin:15px 0;">
                    &nbsp;&nbsp;<span style="color:#3b82f6;">💻</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#3b82f6;">💻</span><br>
                    &nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br>
                    <span style="color:#3b82f6;">💻</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#3b82f6;">💻</span><br>
                    &nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/<br>
                    &nbsp;&nbsp;<span style="color:#3b82f6;">💻</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#3b82f6;">💻</span>
                </div>
                <p><strong>✅ Advantages:</strong></p>
                <ul>
                    <li>No collisions (data flows one way)</li>
                    <li>Equal access for all devices</li>
                    <li>Predictable performance</li>
                </ul>
                <p><strong>❌ Disadvantages:</strong></p>
                <ul>
                    <li>One device failure can break entire ring</li>
                    <li>Difficult to add/remove devices</li>
                    <li>More expensive than bus</li>
                </ul>
                <p><strong>Examples:</strong> Token Ring (obsolete), FDDI, some WANs</p>
            </div>

            <h3>🕸️ Mesh Topology</h3>
            <div class="help-example">
                <p><strong>Design:</strong> Every device connects to every other device</p>
                <p><strong>✅ Advantages:</strong></p>
                <ul>
                    <li>Extremely reliable (multiple paths)</li>
                    <li>If one link fails, data takes alternate route</li>
                    <li>High performance (dedicated connections)</li>
                    <li>Very secure</li>
                </ul>
                <p><strong>❌ Disadvantages:</strong></p>
                <ul>
                    <li>VERY expensive (lots of cables/ports)</li>
                    <li>Complex to install and maintain</li>
                    <li>Formula: N devices need N×(N-1)/2 connections!</li>
                </ul>
                <p><strong>Examples:</strong> Internet backbone, critical infrastructure, wireless mesh networks</p>
            </div>

            <h3>🌲 Tree/Hierarchical Topology</h3>
            <div class="help-example">
                <p><strong>Design:</strong> Star topologies connected in hierarchy (like a family tree)</p>
                <p><strong>✅ Advantages:</strong></p>
                <ul>
                    <li>Scales well for large networks</li>
                    <li>Easy to manage in groups</li>
                    <li>Easy to expand</li>
                </ul>
                <p><strong>❌ Disadvantages:</strong></p>
                <ul>
                    <li>If root switch fails, segments become isolated</li>
                    <li>More cable than star</li>
                </ul>
                <p><strong>Examples:</strong> Corporate networks, campus networks, ISPs</p>
            </div>

            <h3>📊 Topology Comparison</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Topology</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Cost</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Reliability</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Best For</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Star</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Medium</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Good</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Home/Office LANs</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Bus</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Low</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Poor</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Small temporary networks</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Ring</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Medium</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Fair</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Legacy networks, some WANs</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Mesh</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Very High</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Excellent</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Critical infrastructure, WiFi mesh</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Tree</strong></td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Medium-High</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Good</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Large organizations, campuses</td>
                    </tr>
                </tbody>
            </table>

            <div class="help-tip">
                <strong>In the Simulator:</strong> You'll typically build star or tree topologies! Connect computers to switches, and switches to routers. This mirrors real-world network design.
            </div>
        `
    },

    // ========================================
    // 11. OSI Model (Simplified)
    // ========================================
    osi_model_simplified: {
        title: "OSI Model (Simplified)",
        icon: "📚",
        content: `
            <div class="help-section">
                <h3>What is the OSI Model?</h3>
                <p>The <strong>OSI (Open Systems Interconnection) Model</strong> is like a recipe for how networks work. It breaks networking down into 7 layers, each with a specific job. Think of it like building a house - you need a foundation, walls, roof, etc. Networks work the same way!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Memory Trick:</strong> "<strong>P</strong>lease <strong>D</strong>o <strong>N</strong>ot <strong>T</strong>hrow <strong>S</strong>ausage <strong>P</strong>izza <strong>A</strong>way" (Physical, Data Link, Network, Transport, Session, Presentation, Application)
            </div>

            <div class="help-section">
                <h3>The 7 Layers (Bottom to Top)</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Layer</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Name</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">What It Does</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">7</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Application</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Programs you use (web browsers, email)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Chrome, Outlook</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">6</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Presentation</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Translates data formats (encryption, compression)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">JPEG, SSL/TLS</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">5</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Session</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Manages connections between apps</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Login sessions</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">4</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Transport</strong> ⭐</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Reliable delivery (breaks data into packets)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TCP, UDP, Ports</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">3</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Network</strong> ⭐</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Routing (finds path from A to B)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IP addresses, Routers</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Data Link</strong> ⭐</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Communication between devices on same network</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">MAC addresses, Switches</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Physical</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Physical cables and signals</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Ethernet cables, WiFi</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🎯 The 3 Most Important Layers (⭐ marked above)</h3>
                <p>For most networking tasks, you'll focus on these three:</p>
                <ul>
                    <li><strong>Layer 2 (Data Link):</strong> Switches and MAC addresses - local network communication</li>
                    <li><strong>Layer 3 (Network):</strong> IP addresses and routing - communication between networks</li>
                    <li><strong>Layer 4 (Transport):</strong> TCP/UDP and ports - reliable delivery to applications</li>
                </ul>
            </div>

            <div class="help-example">
                <strong>📬 Real-World Analogy: Sending a Letter</strong>
                <ul>
                    <li><strong>Layer 7 (Application):</strong> You write the letter content</li>
                    <li><strong>Layer 6 (Presentation):</strong> You write it in English (language format)</li>
                    <li><strong>Layer 5 (Session):</strong> You decide this is part of an ongoing conversation</li>
                    <li><strong>Layer 4 (Transport):</strong> You put it in an envelope with tracking number</li>
                    <li><strong>Layer 3 (Network):</strong> You write the destination address (street, city, zip)</li>
                    <li><strong>Layer 2 (Data Link):</strong> Mail carrier delivers to the specific mailbox</li>
                    <li><strong>Layer 1 (Physical):</strong> The truck/plane that physically moves the letter</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🔄 How Data Flows Through the OSI Model</h3>
                <p>When you send data (like loading a website):</p>
                <ol>
                    <li><strong>Sender:</strong> Data goes DOWN the layers (7→1), each adding its own information</li>
                    <li><strong>Network:</strong> Physical transmission happens</li>
                    <li><strong>Receiver:</strong> Data goes UP the layers (1→7), each removing its information</li>
                </ol>
                <p>This is called <strong>encapsulation</strong> (adding headers) and <strong>de-encapsulation</strong> (removing headers).</p>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> You'll work mostly with Layers 2-4! Set IP addresses (Layer 3), configure switches (Layer 2), and work with TCP/UDP ports (Layer 4). The OSI model helps you understand WHERE each piece fits!
            </div>

            <div class="help-section">
                <h3>🆚 OSI vs TCP/IP Model</h3>
                <p>In the real world, most people use the simpler <strong>TCP/IP model</strong> (4 layers) instead of OSI (7 layers). But OSI is great for learning because it's more detailed!</p>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">OSI Model (7 Layers)</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">TCP/IP Model (4 Layers)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">7. Application<br>6. Presentation<br>5. Session</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">4. Application</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">4. Transport</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">3. Transport</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">3. Network</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2. Internet</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2. Data Link<br>1. Physical</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1. Network Access</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    },

    // ========================================
    // 12. IPv4 vs IPv6
    // ========================================
    ipv4_vs_ipv6: {
        title: "IPv4 vs IPv6",
        icon: "🌐",
        content: `
            <div class="help-section">
                <h3>What's the Difference?</h3>
                <p><strong>IPv4</strong> and <strong>IPv6</strong> are two versions of the Internet Protocol - the system that assigns addresses to devices on networks. Think of them like two different address systems: IPv4 is the old system running out of space, IPv6 is the new system with virtually unlimited addresses!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Quick Fact:</strong> We're running out of IPv4 addresses! There are only ~4.3 billion IPv4 addresses, but there are more than 8 billion people on Earth (many with multiple devices). IPv6 solves this with 340 undecillion addresses (that's 340 followed by 36 zeros)!
            </div>

            <div class="help-section">
                <h3>📊 Side-by-Side Comparison</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Feature</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">IPv4 (Current)</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">IPv6 (Future)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Address Size</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">32 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">128 bits</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Format</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Dotted decimal (192.168.1.1)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Hexadecimal (2001:0db8::1)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Total Addresses</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">~4.3 billion</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">340 undecillion (virtually unlimited)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Address Assignment</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DHCP or manual</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DHCP, manual, or auto-config (SLAAC)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>NAT Required?</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Yes (to save addresses)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">No (enough addresses for everyone)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Security</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Optional (IPsec)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Built-in (IPsec mandatory)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Header Complexity</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Complex (checksum, options)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Simpler (faster routing)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Broadcast</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Yes (broadcasts to all)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">No (uses multicast instead)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🔢 Address Format Examples</h3>
                <p><strong>IPv4 Address:</strong></p>
                <div style="background:#16213e; padding:12px; border-radius:4px; font-family:monospace; margin:10px 0;">
                    192.168.1.100
                </div>
                <p style="font-size:12px; color:#9ca3af;">4 decimal numbers (0-255) separated by dots</p>

                <p><strong>IPv6 Address:</strong></p>
                <div style="background:#16213e; padding:12px; border-radius:4px; font-family:monospace; margin:10px 0;">
                    2001:0db8:85a3:0000:0000:8a2e:0370:7334
                </div>
                <p style="font-size:12px; color:#9ca3af;">8 groups of hexadecimal numbers (0-FFFF) separated by colons</p>

                <p><strong>IPv6 Shortened:</strong></p>
                <div style="background:#16213e; padding:12px; border-radius:4px; font-family:monospace; margin:10px 0;">
                    2001:db8:85a3::8a2e:370:7334
                </div>
                <p style="font-size:12px; color:#9ca3af;">Leading zeros removed, consecutive zeros replaced with "::"</p>
            </div>

            <div class="help-example">
                <strong>📬 Real-World Analogy:</strong>
                <p><strong>IPv4</strong> is like the old phone number system with area codes - we're running out of numbers, so people share them (like using extensions or NAT).</p>
                <p><strong>IPv6</strong> is like giving every person on Earth their own unique phone number with room to spare - no sharing needed!</p>
            </div>

            <div class="help-section">
                <h3>🌟 Why IPv6 is Better (But Not Widely Used Yet)</h3>
                <ul>
                    <li><strong>More Addresses:</strong> Every device can have a unique public IP (no NAT needed)</li>
                    <li><strong>Better Security:</strong> Encryption (IPsec) is built-in, not optional</li>
                    <li><strong>Faster Routing:</strong> Simpler packet headers = faster processing</li>
                    <li><strong>Auto-Configuration:</strong> Devices can assign themselves IP addresses (SLAAC)</li>
                    <li><strong>No Broadcast:</strong> Uses multicast instead, reducing network noise</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>❓ Why Are We Still Using IPv4?</h3>
                <ul>
                    <li><strong>Legacy Infrastructure:</strong> Billions of devices and networks built for IPv4</li>
                    <li><strong>Cost to Upgrade:</strong> Replacing all routers, firewalls, and systems is expensive</li>
                    <li><strong>Training:</strong> Network admins need to learn new skills</li>
                    <li><strong>NAT Works:</strong> NAT lets multiple devices share one IPv4 address, buying us time</li>
                    <li><strong>Compatibility:</strong> Not all IPv4 networks can talk to IPv6 networks directly</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> NetworkSimulator uses IPv4 because it's what most networks still use today! Understanding IPv4 is essential for real-world networking. IPv6 is the future, but IPv4 skills are needed NOW!
            </div>

            <div class="help-section">
                <h3>🔄 Transition Technologies</h3>
                <p>To help move from IPv4 to IPv6, several technologies exist:</p>
                <ul>
                    <li><strong>Dual Stack:</strong> Devices run both IPv4 and IPv6 at the same time</li>
                    <li><strong>Tunneling:</strong> IPv6 packets travel inside IPv4 packets through old networks</li>
                    <li><strong>Translation:</strong> Gateways translate between IPv4 and IPv6 (like language translation)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🎓 What You Should Know</h3>
                <ul>
                    <li><strong>For Now:</strong> Master IPv4 - it's 95%+ of current networks</li>
                    <li><strong>For Future:</strong> Learn IPv6 basics - adoption is slowly growing</li>
                    <li><strong>For Jobs:</strong> Know both - employers value IPv6 knowledge even if not widely deployed</li>
                </ul>
            </div>
        `
    },

    // ============================================================
    // CORE PROTOCOLS (15 topics)
    // ============================================================

    // ========================================
    // 1. DHCP: Dynamic IP Assignment
    // ========================================
    dhcp_overview: {
        title: "DHCP: Dynamic IP Assignment",
        icon: "📡",
        content: `
            <div class="help-section">
                <h3>What is DHCP?</h3>
                <p><strong>DHCP (Dynamic Host Configuration Protocol)</strong> is like an automated receptionist that hands out IP addresses to devices when they join a network. Instead of manually typing network settings into every computer, DHCP does it automatically!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> Think of DHCP like checking into a hotel. The front desk (DHCP server) assigns you a room number (IP address) and tells you the WiFi password (DNS server) and where the elevator is (gateway). When you check out, they give that room to someone else!
            </div>

            <div class="help-section">
                <h3>🔄 The DHCP Process (DORA)</h3>
                <p>When a device joins a network, it goes through 4 steps (remember: <strong>DORA</strong>):</p>
                <ol>
                    <li><strong>D</strong>iscover - Client broadcasts "Is there a DHCP server here?"</li>
                    <li><strong>O</strong>ffer - DHCP server responds "Yes! Here's an IP you can use: 192.168.1.100"</li>
                    <li><strong>R</strong>equest - Client broadcasts "I'd like to use 192.168.1.100, please!"</li>
                    <li><strong>A</strong>cknowledge - Server confirms "OK, 192.168.1.100 is yours for 24 hours!"</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>📦 What DHCP Provides</h3>
                <p>DHCP doesn't just give out IP addresses - it provides a complete network configuration:</p>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Setting</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">What It Does</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>IP Address</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Unique identifier for device</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.100</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Subnet Mask</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Defines network size</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">255.255.255.0</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Default Gateway</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Router to reach other networks</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.1</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DNS Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Converts domain names to IPs</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8.8.8.8</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Lease Time</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">How long you can use the IP</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">24 hours</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>⏰ IP Address Leases</h3>
                <p>DHCP doesn't give you an IP address forever - it <strong>leases</strong> it to you for a specific time period (usually hours or days).</p>
                <ul>
                    <li><strong>Why lease?</strong> So addresses from devices that left the network can be reused</li>
                    <li><strong>Renewal:</strong> Devices automatically ask to renew their lease at 50% of lease time</li>
                    <li><strong>Expiration:</strong> If a device doesn't renew, the IP goes back to the pool</li>
                </ul>
            </div>

            <div class="help-example">
                <strong>🏠 Home Network Example:</strong>
                <p>Your WiFi router has a DHCP server built-in. When your phone connects:</p>
                <ol>
                    <li>Phone: "DHCP Discover" broadcast</li>
                    <li>Router: "Here's 192.168.1.50, subnet 255.255.255.0, I'm your gateway at 192.168.1.1"</li>
                    <li>Phone: "I'll take 192.168.1.50!"</li>
                    <li>Router: "Confirmed! It's yours for 24 hours"</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>🎯 DHCP Scope (Address Pool)</h3>
                <p>The DHCP server manages a <strong>scope</strong> - a range of IP addresses it can hand out:</p>
                <ul>
                    <li><strong>Start Address:</strong> 192.168.1.100 (first IP to give out)</li>
                    <li><strong>End Address:</strong> 192.168.1.200 (last IP to give out)</li>
                    <li><strong>Total Addresses:</strong> 101 IPs available (100-200 inclusive)</li>
                    <li><strong>Exclusions:</strong> Reserve some IPs for servers (e.g., skip 192.168.1.10 for printer)</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> Right-click on a PC or Router → Configure DHCP Server → Set the IP range, gateway, and DNS! Then configure clients to "Use DHCP" and watch them automatically get addresses. Super convenient for large networks!
            </div>

            <div class="help-section">
                <h3>✅ Benefits of DHCP</h3>
                <ul>
                    <li><strong>Saves Time:</strong> No manual configuration of hundreds of devices</li>
                    <li><strong>Prevents Errors:</strong> No typos or duplicate IP addresses</li>
                    <li><strong>Centralized Management:</strong> Change DNS server once, all devices update</li>
                    <li><strong>Efficient:</strong> Reuses IP addresses from devices that leave</li>
                    <li><strong>Mobility:</strong> Devices automatically adapt to new networks</li>
                </ul>
            </div>
        `
    },

    // ========================================
    // 2. DNS: Name Resolution
    // ========================================
    dns_overview: {
        title: "DNS: Name Resolution",
        icon: "🌐",
        content: `
            <div class="help-section">
                <h3>What is DNS?</h3>
                <p><strong>DNS (Domain Name System)</strong> is like the phonebook of the internet. Humans remember names like "google.com", but computers need IP addresses like "142.250.191.46". DNS translates the name into the number!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> DNS is like asking a librarian for a book. You say "I want Harry Potter" (domain name), and the librarian tells you "That's in aisle 3, shelf 7" (IP address). You remember the book's name, not its shelf location!
            </div>

            <div class="help-section">
                <h3>🔄 How DNS Works (Step-by-Step)</h3>
                <p>When you type "www.example.com" in your browser:</p>
                <ol>
                    <li><strong>Browser checks cache:</strong> "Have I looked this up recently?"</li>
                    <li><strong>Ask DNS server:</strong> "What's the IP for www.example.com?"</li>
                    <li><strong>DNS responds:</strong> "It's 93.184.216.34"</li>
                    <li><strong>Browser connects:</strong> Uses the IP to load the website</li>
                    <li><strong>Cache the answer:</strong> Remembers it for next time (TTL period)</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>📋 DNS Record Types</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Record Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>A Record</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Maps domain to IPv4 address</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">example.com → 93.184.216.34</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>AAAA Record</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Maps domain to IPv6 address</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">example.com → 2606:2800:220:1::</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>CNAME</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Alias (nickname) for another domain</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">www → example.com</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>MX Record</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Mail server for domain</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">example.com → mail.example.com</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>TXT Record</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Text information (verification, SPF)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">domain ownership proof</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>NS Record</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Nameserver for domain</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ns1.example.com</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🏗️ DNS Hierarchy (How DNS is Organized)</h3>
                <p>DNS is organized like a tree, with different levels of authority:</p>
                <ol>
                    <li><strong>Root Servers:</strong> Top level (knows about .com, .org, .net, etc.)</li>
                    <li><strong>TLD Servers:</strong> Top-Level Domain servers (knows about google.com, yahoo.com)</li>
                    <li><strong>Authoritative Servers:</strong> Knows the actual IP for specific domains</li>
                    <li><strong>Recursive Resolvers:</strong> Does the work for clients (your ISP's DNS)</li>
                </ol>
            </div>

            <div class="help-example">
                <strong>🔍 Looking Up "www.example.com":</strong>
                <ol>
                    <li><strong>Your Computer:</strong> "What's www.example.com?" → Recursive Resolver</li>
                    <li><strong>Recursive Resolver:</strong> "Let me find out..." → Root Server</li>
                    <li><strong>Root Server:</strong> "I don't know, but ask the .com server"</li>
                    <li><strong>TLD (.com) Server:</strong> "Ask example.com's nameserver"</li>
                    <li><strong>Authoritative Server:</strong> "www.example.com is 93.184.216.34!"</li>
                    <li><strong>Recursive Resolver:</strong> "Here you go! (and I'll remember this)"</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>⏱️ DNS Caching & TTL</h3>
                <p><strong>Caching</strong> makes DNS faster by remembering recent lookups:</p>
                <ul>
                    <li><strong>Browser Cache:</strong> Remembers DNS for a few minutes</li>
                    <li><strong>OS Cache:</strong> Your computer remembers for longer</li>
                    <li><strong>Router Cache:</strong> Local network cache</li>
                    <li><strong>ISP Cache:</strong> Shared cache for all customers</li>
                </ul>
                <p><strong>TTL (Time To Live):</strong> How long to cache an answer (e.g., 3600 seconds = 1 hour)</p>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> Configure a DNS server by adding domain→IP mappings! Set "www.school.com" to point to "192.168.1.10", and computers can browse using the domain name instead of typing the IP address. Try it!
            </div>

            <div class="help-section">
                <h3>🔒 DNS Security Issues</h3>
                <ul>
                    <li><strong>DNS Spoofing:</strong> Attacker tricks you into visiting fake IP address</li>
                    <li><strong>DNS Hijacking:</strong> Malware changes your DNS server to malicious one</li>
                    <li><strong>DNSSEC:</strong> Cryptographic signatures verify DNS responses are authentic</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🌍 Popular Public DNS Servers</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Provider</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Primary DNS</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Secondary DNS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Google</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8.8.8.8</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8.8.4.4</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Cloudflare</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1.1.1.1</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1.0.0.1</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Quad9</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">9.9.9.9</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">149.112.112.112</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    },

    // ========================================
    // 3. ARP: MAC Address Discovery
    // ========================================
    arp_protocol: {
        title: "ARP: MAC Address Discovery",
        icon: "🔍",
        content: `
            <div class="help-section">
                <h3>What is ARP?</h3>
                <p><strong>ARP (Address Resolution Protocol)</strong> is how devices find each other's physical (MAC) addresses when they only know IP addresses. Think of it like asking "Who lives at 123 Main Street?" to find out their name!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> ARP is like asking your neighbors "Does anyone know who owns the red car?" (IP address). The owner shouts back "That's me! My name is John!" (MAC address). Now you know both the car and the owner's name.
            </div>

            <div class="help-section">
                <h3>🔄 How ARP Works</h3>
                <p>When Computer A (192.168.1.10) wants to send data to Computer B (192.168.1.20):</p>
                <ol>
                    <li><strong>Check ARP Cache:</strong> "Do I already know 192.168.1.20's MAC address?"</li>
                    <li><strong>ARP Request (Broadcast):</strong> "Hey everyone! Who has IP 192.168.1.20? Tell me your MAC address!"</li>
                    <li><strong>ARP Reply (Unicast):</strong> Computer B responds "That's me! My MAC is AA:BB:CC:DD:EE:FF"</li>
                    <li><strong>Cache the Result:</strong> Computer A remembers this for future use (5-20 minutes)</li>
                    <li><strong>Send Data:</strong> Now Computer A can send Ethernet frames directly to Computer B</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>📋 ARP Packet Format</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Field</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Description</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Sender MAC</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Physical address of requester</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">11:22:33:44:55:66</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Sender IP</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IP address of requester</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.10</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Target MAC</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Unknown (00:00:00:00:00:00)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">?? (being requested)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Target IP</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IP we're looking for</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.20</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Operation</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Request (1) or Reply (2)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1 = Request</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🗂️ ARP Cache</h3>
                <p>To avoid sending ARP requests every time, devices maintain an <strong>ARP cache</strong> (table):</p>
                <ul>
                    <li><strong>Dynamic Entries:</strong> Learned from ARP replies (timeout in 5-20 minutes)</li>
                    <li><strong>Static Entries:</strong> Manually configured (permanent)</li>
                    <li><strong>Purpose:</strong> Speed up communication by reusing known MAC addresses</li>
                </ul>
            </div>

            <div class="help-example">
                <strong>Example ARP Cache:</strong>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">IP Address</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">MAC Address</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.1</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">AA:BB:CC:11:22:33</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Dynamic</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.20</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DD:EE:FF:44:55:66</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Dynamic</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> Check ARP tables by right-clicking a device → Network Diagnostics → ARP Table. You'll see all the IP→MAC mappings the device has learned. Send a ping to see ARP in action!
            </div>

            <div class="help-section">
                <h3>⚠️ ARP Spoofing Attack</h3>
                <p>Because ARP has no authentication, attackers can poison ARP caches:</p>
                <ul>
                    <li><strong>Attack:</strong> Attacker sends fake ARP replies claiming to own victim's IP</li>
                    <li><strong>Result:</strong> Traffic meant for victim gets redirected to attacker</li>
                    <li><strong>Prevention:</strong> Static ARP entries, network monitoring, ARP inspection</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🎯 Gratuitous ARP</h3>
                <p>Sometimes devices send ARP replies without being asked:</p>
                <ul>
                    <li><strong>Purpose:</strong> Announce "Hey, my IP is X and my MAC is Y"</li>
                    <li><strong>When:</strong> Device boots up, IP changes, duplicate IP detection</li>
                    <li><strong>Effect:</strong> Updates everyone's ARP cache proactively</li>
                </ul>
            </div>
        `
    },

    // ========================================
    // 4. NAT: Network Address Translation
    // ========================================
    nat_overview: {
        title: "NAT: Network Address Translation",
        icon: "🔄",
        content: `
            <div class="help-section">
                <h3>What is NAT?</h3>
                <p><strong>NAT (Network Address Translation)</strong> allows multiple devices on a private network to share one public IP address to access the internet. It's like an apartment building with one street address but many apartments inside!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> NAT is like a receptionist at an office building. Mail arrives at "123 Main St" (public IP), and the receptionist routes it to the correct office (private IP) based on the name or room number.
            </div>

            <div class="help-section">
                <h3>🏠 Why NAT Was Created</h3>
                <p>Two main reasons NAT became essential:</p>
                <ul>
                    <li><strong>IPv4 Address Shortage:</strong> Only ~4.3 billion IPv4 addresses exist, but billions of devices need internet</li>
                    <li><strong>Solution:</strong> Let thousands of devices share one public IP using private IPs internally</li>
                    <li><strong>Bonus Security:</strong> Hides internal network structure from the internet</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🔄 How NAT Works</h3>
                <p><strong>Outbound Traffic (Private → Public):</strong></p>
                <ol>
                    <li>Computer (192.168.1.100) sends packet to google.com (142.250.191.46)</li>
                    <li>Packet reaches NAT router</li>
                    <li>Router replaces source IP: 192.168.1.100 → 203.0.113.50 (public IP)</li>
                    <li>Router stores translation in NAT table</li>
                    <li>Packet sent to internet with public IP as source</li>
                </ol>

                <p><strong>Inbound Traffic (Public → Private):</strong></p>
                <ol>
                    <li>Reply comes back from google.com to 203.0.113.50</li>
                    <li>Router checks NAT table: "Which internal device requested this?"</li>
                    <li>Router replaces destination IP: 203.0.113.50 → 192.168.1.100</li>
                    <li>Packet delivered to original computer</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>📋 NAT Translation Table</h3>
                <p>Example of what the router tracks:</p>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Private IP:Port</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Public IP:Port</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.100:54321</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">203.0.113.50:12345</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">142.250.191.46:80</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.101:48576</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">203.0.113.50:12346</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">93.184.216.34:443</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🎯 Types of NAT</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Works</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Static NAT</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">One-to-one permanent mapping</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Servers that need consistent public IP</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Dynamic NAT</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Uses pool of public IPs</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Organizations with multiple public IPs</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>PAT</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Many-to-one using ports</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Home routers (most common)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>🏠 Home Router Example:</strong>
                <p>You have 5 devices at home (phones, laptops, tablets) all using private IPs (192.168.1.x). Your ISP gave you ONE public IP (203.0.113.50). NAT lets all 5 devices browse the web simultaneously by mapping each connection to different port numbers!</p>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> Configure NAT on routers to allow private networks (192.168.x.x) to access other networks. The router automatically translates addresses so internal devices can communicate with the outside world!
            </div>

            <div class="help-section">
                <h3>✅ Benefits of NAT</h3>
                <ul>
                    <li><strong>Saves IPv4 Addresses:</strong> Thousands of devices share one public IP</li>
                    <li><strong>Security:</strong> Hides internal network structure</li>
                    <li><strong>Flexibility:</strong> Change internal IPs without affecting internet access</li>
                    <li><strong>Cost Savings:</strong> Don't need to buy many public IPs</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>⚠️ Drawbacks of NAT</h3>
                <ul>
                    <li><strong>Breaks End-to-End Connectivity:</strong> Can't easily host servers</li>
                    <li><strong>Complicates Some Protocols:</strong> VoIP, P2P, gaming need special handling</li>
                    <li><strong>Router Overhead:</strong> Must maintain translation tables</li>
                    <li><strong>Port Forwarding Needed:</strong> To run servers behind NAT</li>
                </ul>
            </div>
        `
    },

    // ========================================
    // 5. PAT: Port Address Translation
    // ========================================
    pat_overview: {
        title: "PAT: Port Address Translation",
        icon: "🔌",
        content: `
            <div class="help-section">
                <h3>What is PAT?</h3>
                <p><strong>PAT (Port Address Translation)</strong>, also called <strong>NAT Overload</strong>, is the most common type of NAT. It lets thousands of devices share ONE public IP address by using different port numbers to track connections. This is what your home router uses!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> PAT is like a hotel with one street address but different room numbers. Mail arrives at "123 Main St" (public IP), and the room number (port) tells the front desk which guest (device) it's for!
            </div>

            <div class="help-section">
                <h3>🆚 PAT vs Regular NAT</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Feature</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">NAT (Dynamic)</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">PAT (NAT Overload)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Public IPs Needed</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">One per device (pool required)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Just ONE for all devices!</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>How It Tracks</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IP addresses only</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IP + Port numbers</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Max Devices</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Limited by public IP pool</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">~65,000 per public IP!</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Common Use</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Large enterprises</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Home/small business routers</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🔄 How PAT Works</h3>
                <p><strong>Scenario:</strong> Two devices browsing different websites through one router with public IP 203.0.113.50</p>

                <p><strong>Step 1 - Outbound:</strong></p>
                <ul>
                    <li>Computer A (192.168.1.100:54321) → google.com (port 80)</li>
                    <li>Router translates: 192.168.1.100:54321 → 203.0.113.50:<strong>10001</strong></li>
                    <li>Computer B (192.168.1.101:48576) → facebook.com (port 443)</li>
                    <li>Router translates: 192.168.1.101:48576 → 203.0.113.50:<strong>10002</strong></li>
                </ul>

                <p><strong>Step 2 - PAT Table:</strong></p>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Inside (Private)</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Outside (Public)</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.100:54321</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">203.0.113.50:10001</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">google.com:80</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.101:48576</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">203.0.113.50:10002</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">facebook.com:443</td>
                        </tr>
                    </tbody>
                </table>

                <p><strong>Step 3 - Inbound (Replies):</strong></p>
                <ul>
                    <li>Reply from google.com arrives at 203.0.113.50:<strong>10001</strong></li>
                    <li>Router checks port 10001 → routes to 192.168.1.100:54321</li>
                    <li>Reply from facebook.com arrives at 203.0.113.50:<strong>10002</strong></li>
                    <li>Router checks port 10002 → routes to 192.168.1.101:48576</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🎯 Port Number Range</h3>
                <p>PAT uses <strong>ephemeral ports</strong> (temporary high-numbered ports) for translations:</p>
                <ul>
                    <li><strong>Range:</strong> Typically 1024-65535 (dynamic/private ports)</li>
                    <li><strong>Total Available:</strong> ~64,000 ports per public IP</li>
                    <li><strong>Practical Limit:</strong> Most routers support thousands of simultaneous connections</li>
                    <li><strong>Timeout:</strong> Unused entries removed after 5-30 minutes</li>
                </ul>
            </div>

            <div class="help-example">
                <strong>🏠 Real Home Network Example:</strong>
                <p>Your home has 10 devices all sharing ONE public IP from your ISP:</p>
                <ul>
                    <li>Phone watching YouTube → 203.0.113.50:10001</li>
                    <li>Laptop on Zoom call → 203.0.113.50:10002</li>
                    <li>Tablet browsing web → 203.0.113.50:10003</li>
                    <li>Smart TV streaming Netflix → 203.0.113.50:10004</li>
                    <li>...and so on!</li>
                </ul>
                <p>Each device gets a unique port number, so the router knows where to send replies!</p>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> Most NAT configurations in the simulator use PAT automatically! When you enable NAT on a router, it tracks connections using IP+Port combinations, allowing multiple internal devices to share the router's external interface IP.
            </div>

            <div class="help-section">
                <h3>✅ Why PAT is Brilliant</h3>
                <ul>
                    <li><strong>Extreme Efficiency:</strong> Thousands of devices share one IP</li>
                    <li><strong>Solves IPv4 Shortage:</strong> Main reason internet didn't run out of IPs in 2000s</li>
                    <li><strong>Cost Effective:</strong> ISPs only give you one public IP (cheaper)</li>
                    <li><strong>Transparent:</strong> Devices don't know NAT is happening</li>
                    <li><strong>Security Bonus:</strong> Internal IPs completely hidden from internet</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>⚠️ PAT Limitations</h3>
                <ul>
                    <li><strong>Can't Host Servers Easily:</strong> Incoming connections don't know which internal device to reach</li>
                    <li><strong>Port Forwarding Required:</strong> Must manually map external ports to internal servers</li>
                    <li><strong>Some Protocols Break:</strong> FTP, SIP (VoIP) need special handling (ALG - Application Layer Gateway)</li>
                    <li><strong>Gaming/P2P Issues:</strong> May need port forwarding or UPnP for multiplayer games</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🔧 Port Forwarding</h3>
                <p>To run a server behind PAT, you set up <strong>port forwarding</strong>:</p>
                <ul>
                    <li><strong>Problem:</strong> Web server at 192.168.1.10:80 needs to be accessible from internet</li>
                    <li><strong>Solution:</strong> Configure router: "Incoming traffic to 203.0.113.50:80 → forward to 192.168.1.10:80"</li>
                    <li><strong>Result:</strong> Static mapping allows external users to reach your server</li>
                </ul>
            </div>
        `
    },

    // ========================================
    // 6. ICMP: Ping & Diagnostics
    // ========================================
    icmp_protocol: {
        title: "ICMP: Ping & Diagnostics",
        icon: "📡",
        content: `
            <div class="help-section">
                <h3>What is ICMP?</h3>
                <p><strong>ICMP (Internet Control Message Protocol)</strong> is like the postal service's notification system. When something goes wrong with network delivery, ICMP sends messages back to let you know. It's also what powers the <strong>ping</strong> command!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> ICMP is like "return to sender" notices from the post office. If mail can't be delivered, they send you a notification explaining why (address unknown, recipient moved, etc.). ICMP does the same for network packets!
            </div>

            <div class="help-section">
                <h3>🎯 ICMP's Main Jobs</h3>
                <ul>
                    <li><strong>Error Reporting:</strong> Tell sender when packets can't be delivered</li>
                    <li><strong>Network Diagnostics:</strong> Test connectivity (ping, traceroute)</li>
                    <li><strong>Flow Control:</strong> Tell sender to slow down if overwhelmed</li>
                    <li><strong>Route Information:</strong> Suggest better paths</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>📋 Common ICMP Message Types</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Name</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">What It Means</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Type 0</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Echo Reply</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"I got your ping! Here's my reply"</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Type 3</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Destination Unreachable</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"Can't reach that destination"</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Type 5</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Redirect</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"Use a different router for this destination"</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Type 8</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Echo Request</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"Are you there? (ping)"</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Type 11</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Time Exceeded</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"Packet took too long (TTL=0)"</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🏓 How Ping Works</h3>
                <p>The <strong>ping</strong> command uses ICMP Echo Request/Reply:</p>
                <ol>
                    <li><strong>Your Computer:</strong> Sends ICMP Echo Request (Type 8) to target</li>
                    <li><strong>Target Computer:</strong> Receives request</li>
                    <li><strong>Target Computer:</strong> Sends ICMP Echo Reply (Type 0) back</li>
                    <li><strong>Your Computer:</strong> Measures round-trip time (latency)</li>
                    <li><strong>Repeat:</strong> Usually sends 4-5 pings to check consistency</li>
                </ol>
            </div>

            <div class="help-example">
                <strong>Example Ping Output:</strong>
                <div style="background:#16213e; padding:12px; border-radius:4px; font-family:monospace; margin:10px 0; font-size:11px;">
                    Pinging 192.168.1.1 with 32 bytes of data:<br>
                    Reply from 192.168.1.1: bytes=32 time=1ms TTL=64<br>
                    Reply from 192.168.1.1: bytes=32 time=2ms TTL=64<br>
                    Reply from 192.168.1.1: bytes=32 time=1ms TTL=64<br>
                    Reply from 192.168.1.1: bytes=32 time=1ms TTL=64
                </div>
                <p style="font-size:12px; color:#9ca3af;">✅ Device is reachable, average latency is 1-2 milliseconds</p>
            </div>

            <div class="help-section">
                <h3>🔍 Destination Unreachable (Type 3) Codes</h3>
                <p>Type 3 has different <strong>codes</strong> that explain WHY it's unreachable:</p>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Code</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Meaning</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Common Cause</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">0</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Network Unreachable</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">No route to destination network</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Host Unreachable</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Host is down or offline</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Protocol Unreachable</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Protocol not supported</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">3</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Port Unreachable</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">No service listening on that port</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">13</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Administratively Prohibited</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Blocked by firewall/ACL</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> Use ping to test connectivity! Right-click a device → Network Diagnostics → Ping. If you get replies, the path is working. If you get "Destination Unreachable," check your routing tables and gateway settings!
            </div>

            <div class="help-section">
                <h3>🛤️ Traceroute (Uses ICMP Type 11)</h3>
                <p><strong>Traceroute</strong> uses ICMP "Time Exceeded" to map the path packets take:</p>
                <ol>
                    <li>Send packet with TTL=1 → First router responds "Time Exceeded" (reveals Router 1)</li>
                    <li>Send packet with TTL=2 → Second router responds "Time Exceeded" (reveals Router 2)</li>
                    <li>Send packet with TTL=3 → Third router responds "Time Exceeded" (reveals Router 3)</li>
                    <li>Continue until destination is reached!</li>
                </ol>
                <p>This reveals every router hop along the path!</p>
            </div>

            <div class="help-section">
                <h3>🔒 ICMP and Security</h3>
                <p><strong>Why Some Networks Block ICMP:</strong></p>
                <ul>
                    <li><strong>Security Through Obscurity:</strong> Prevent reconnaissance (network mapping)</li>
                    <li><strong>DDoS Protection:</strong> ICMP floods can overwhelm networks</li>
                    <li><strong>Privacy:</strong> Hide network topology from outsiders</li>
                </ul>

                <p><strong>Why Blocking ICMP is Problematic:</strong></p>
                <ul>
                    <li>Breaks legitimate diagnostics (can't ping/traceroute)</li>
                    <li>Prevents "Path MTU Discovery" (causes fragmentation issues)</li>
                    <li>Makes troubleshooting much harder</li>
                </ul>

                <p><strong>Best Practice:</strong> Allow ICMP Echo (ping) internally, limit it externally</p>
            </div>

            <div class="help-section">
                <h3>⚠️ ICMP Attacks</h3>
                <ul>
                    <li><strong>Ping Flood:</strong> Overwhelm target with ping requests</li>
                    <li><strong>Smurf Attack:</strong> Amplify ping by broadcasting to entire network</li>
                    <li><strong>Ping of Death:</strong> Send oversized ICMP packet (crashes old systems)</li>
                </ul>
            </div>
        `
    },

    // ========================================
    // 7. HTTP/HTTPS Web Traffic
    // ========================================
    http_https_overview: {
        title: "HTTP/HTTPS Web Traffic",
        icon: "🌐",
        content: `
            <div class="help-section">
                <h3>What is HTTP?</h3>
                <p><strong>HTTP (HyperText Transfer Protocol)</strong> is the language web browsers and web servers use to communicate. When you visit a website, your browser speaks HTTP to request pages, images, videos, and other content from the server.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> HTTP is like ordering at a restaurant. You (browser) tell the waiter (HTTP) what you want from the menu, the waiter brings your request to the kitchen (server), and brings back your food (web page). HTTPS is the same, but the waiter whispers so nobody else can hear your order!
            </div>

            <div class="help-section">
                <h3>🔄 How HTTP Works</h3>
                <p>A simple web page request follows these steps:</p>
                <ol>
                    <li><strong>Browser:</strong> "GET /index.html HTTP/1.1" (request)</li>
                    <li><strong>Server:</strong> Processes request, finds index.html</li>
                    <li><strong>Server:</strong> "HTTP/1.1 200 OK" + sends HTML content (response)</li>
                    <li><strong>Browser:</strong> Displays the web page</li>
                    <li><strong>Browser:</strong> Requests images, CSS, JavaScript (more HTTP requests)</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>📋 HTTP Request Methods</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Method</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>GET</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Retrieve a resource (read-only)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Load a web page</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>POST</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Send data to server (create/submit)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Submit a form, upload file</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>PUT</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Update/replace a resource</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Update user profile</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DELETE</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Remove a resource</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Delete a post</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>HEAD</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Get headers only (no body)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Check if file exists</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>📊 HTTP Status Codes</h3>
                <p>Servers respond with status codes to indicate what happened:</p>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Code Range</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Meaning</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Common Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>200-299</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Success</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">200 OK, 201 Created</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>300-399</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Redirection</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">301 Moved Permanently, 302 Found</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>400-499</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Client Error</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">404 Not Found, 403 Forbidden</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>500-599</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server Error</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">500 Internal Server Error, 503 Service Unavailable</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🔒 HTTP vs HTTPS</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Feature</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">HTTP</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">HTTPS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Port</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">80</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">443</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Encryption</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">None (plaintext)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">SSL/TLS encrypted</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Security</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Visible to anyone</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Private, authenticated</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Certificate</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Not required</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">SSL/TLS certificate required</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>URL</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">http://example.com</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">https://example.com</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Best For</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Public info (not sensitive)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Login, banking, shopping, etc.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Example HTTP Request:</strong>
                <div style="background:#16213e; padding:12px; border-radius:4px; font-family:monospace; margin:10px 0; font-size:11px;">
                    GET /products/shoes.html HTTP/1.1<br>
                    Host: www.example.com<br>
                    User-Agent: Mozilla/5.0<br>
                    Accept: text/html
                </div>

                <strong>Example HTTP Response:</strong>
                <div style="background:#16213e; padding:12px; border-radius:4px; font-family:monospace; margin:10px 0; font-size:11px;">
                    HTTP/1.1 200 OK<br>
                    Content-Type: text/html<br>
                    Content-Length: 1234<br>
                    <br>
                    &lt;html&gt;&lt;body&gt;Shoes page...&lt;/body&gt;&lt;/html&gt;
                </div>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> Configure HTTP servers and have clients browse to them! HTTP uses port 80, HTTPS uses port 443. You can see HTTP traffic flowing through the network when devices access web servers!
            </div>

            <div class="help-section">
                <h3>⚠️ Why HTTP is Insecure</h3>
                <ul>
                    <li><strong>No Encryption:</strong> Anyone on the network can read your traffic</li>
                    <li><strong>No Authentication:</strong> Can't verify server identity (MITM attacks)</li>
                    <li><strong>No Integrity:</strong> Data can be modified in transit</li>
                    <li><strong>Passwords Visible:</strong> Login credentials sent in plaintext</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>✅ Why Use HTTPS</h3>
                <ul>
                    <li><strong>Privacy:</strong> Traffic encrypted, can't be read by eavesdroppers</li>
                    <li><strong>Authentication:</strong> Certificate proves server identity</li>
                    <li><strong>Integrity:</strong> Data can't be tampered with</li>
                    <li><strong>SEO Boost:</strong> Google ranks HTTPS sites higher</li>
                    <li><strong>Browser Trust:</strong> Modern browsers show warnings for HTTP</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🔑 HTTPS Handshake (Simplified)</h3>
                <ol>
                    <li><strong>Client Hello:</strong> Browser says "I want to use HTTPS"</li>
                    <li><strong>Server Hello:</strong> Server sends SSL certificate</li>
                    <li><strong>Certificate Verification:</strong> Browser checks certificate is valid</li>
                    <li><strong>Key Exchange:</strong> Both agree on encryption keys</li>
                    <li><strong>Encrypted Communication:</strong> All HTTP traffic now encrypted!</li>
                </ol>
            </div>
        `
    },

    // ========================================
    // 8. TCP Handshake
    // ========================================
    tcp_handshake: {
        title: "TCP Three-Way Handshake",
        icon: "🤝",
        content: `
            <div class="help-section">
                <h3>What is the TCP Handshake?</h3>
                <p>Before TCP can send data, it establishes a <strong>connection</strong> using a <strong>three-way handshake</strong>. Think of it like a polite conversation before getting down to business - both sides confirm they're ready to communicate!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> TCP handshake is like calling someone on the phone:<br>
                <strong>You:</strong> "Hello?" (SYN)<br>
                <strong>Them:</strong> "Hi! I hear you!" (SYN-ACK)<br>
                <strong>You:</strong> "Great, let's talk!" (ACK)<br>
                Now the conversation can begin!
            </div>

            <div class="help-section">
                <h3>🤝 The Three Steps</h3>
                <p>The handshake uses three special messages:</p>

                <p><strong>Step 1 - SYN (Synchronize):</strong></p>
                <ul>
                    <li>Client sends: "I want to connect! My sequence number is 1000"</li>
                    <li>Sets SYN flag = 1</li>
                    <li>Includes initial sequence number (ISN)</li>
                </ul>

                <p><strong>Step 2 - SYN-ACK (Synchronize-Acknowledge):</strong></p>
                <ul>
                    <li>Server responds: "OK! I got 1000. My sequence number is 5000"</li>
                    <li>Sets SYN flag = 1 AND ACK flag = 1</li>
                    <li>Acknowledges client's ISN (1000+1 = 1001)</li>
                    <li>Sends its own ISN (5000)</li>
                </ul>

                <p><strong>Step 3 - ACK (Acknowledge):</strong></p>
                <ul>
                    <li>Client confirms: "Got it! I received 5000"</li>
                    <li>Sets ACK flag = 1</li>
                    <li>Acknowledges server's ISN (5000+1 = 5001)</li>
                    <li><strong>Connection established! Data transfer can begin</strong></li>
                </ul>
            </div>

            <div class="help-section">
                <h3>📋 Visual Diagram</h3>
                <div style="background:#16213e; padding:15px; border-radius:4px; font-family:monospace; margin:10px 0; font-size:11px; line-height:1.8;">
                    <strong>Client (192.168.1.10)</strong>          <strong>Server (192.168.1.20)</strong><br>
                    <br>
                    1. SYN, Seq=1000 ──────────────►<br>
                                                    "Want to connect!"<br>
                    <br>
                                   ◄────────────── 2. SYN-ACK, Seq=5000, Ack=1001<br>
                                                    "Yes! I'm ready too!"<br>
                    <br>
                    3. ACK, Ack=5001 ──────────────►<br>
                                                    "Perfect! Let's go!"<br>
                    <br>
                    ═══════ CONNECTION ESTABLISHED ═══════<br>
                    <br>
                    4. Data transfer begins... ─────►
                </div>
            </div>

            <div class="help-section">
                <h3>🎯 Why the Handshake is Necessary</h3>
                <ul>
                    <li><strong>Confirms Both Sides are Ready:</strong> Server knows client wants to connect</li>
                    <li><strong>Synchronizes Sequence Numbers:</strong> Both agree on starting points for tracking data</li>
                    <li><strong>Establishes Connection State:</strong> Both sides allocate resources (memory buffers)</li>
                    <li><strong>Negotiates Options:</strong> Window size, maximum segment size, etc.</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>📊 TCP Flags</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Flag</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Name</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>SYN</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Synchronize</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Initiate connection, set sequence number</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>ACK</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Acknowledge</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Confirm receipt of data</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>FIN</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Finish</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Close connection gracefully</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>RST</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Reset</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Abort connection immediately</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>PSH</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Push</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Send data immediately (don't buffer)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>URG</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Urgent</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Urgent data (rarely used)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🔄 Connection Termination (Four-Way Handshake)</h3>
                <p>Closing a TCP connection also requires a handshake (4 steps this time):</p>
                <ol>
                    <li><strong>FIN from Client:</strong> "I'm done sending data"</li>
                    <li><strong>ACK from Server:</strong> "OK, I got your FIN"</li>
                    <li><strong>FIN from Server:</strong> "I'm done too"</li>
                    <li><strong>ACK from Client:</strong> "Got it, goodbye!"</li>
                </ol>
                <p>Both sides gracefully close, ensuring no data is lost.</p>
            </div>

            <div class="help-example">
                <strong>Real-World Example - Web Page Load:</strong>
                <ol>
                    <li>Browser wants to load www.example.com:80</li>
                    <li>Three-way handshake establishes TCP connection</li>
                    <li>Browser sends HTTP GET request</li>
                    <li>Server sends HTML response</li>
                    <li>Four-way handshake closes connection (or kept alive for reuse)</li>
                </ol>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> TCP handshakes happen automatically! When you ping, browse, or transfer files, the simulator performs the three-way handshake first. Watch the message flow to see SYN, SYN-ACK, ACK packets!
            </div>

            <div class="help-section">
                <h3>⚠️ Common Handshake Problems</h3>
                <ul>
                    <li><strong>SYN Timeout:</strong> No SYN-ACK received → server down or firewall blocking</li>
                    <li><strong>RST Response:</strong> Server sends RST instead of SYN-ACK → port closed, no service listening</li>
                    <li><strong>SYN Flood Attack:</strong> Attacker sends many SYNs, never completes handshake → DoS</li>
                    <li><strong>Half-Open Connections:</strong> Handshake incomplete, resources wasted</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🛡️ SYN Cookies (Attack Defense)</h3>
                <p>Servers use <strong>SYN cookies</strong> to prevent SYN flood attacks:</p>
                <ul>
                    <li>Don't allocate resources until handshake completes</li>
                    <li>Encode connection info in the sequence number</li>
                    <li>Only create connection when final ACK arrives</li>
                    <li>Prevents resource exhaustion from fake SYN requests</li>
                </ul>
            </div>
        `
    },

    // ========================================
    // 9. UDP Datagrams
    // ========================================
    udp_datagrams: {
        title: "UDP: Connectionless Protocol",
        icon: "📮",
        content: `
            <div class="help-section">
                <h3>What is UDP?</h3>
                <p><strong>UDP (User Datagram Protocol)</strong> is the "fire and forget" protocol. Unlike TCP, UDP doesn't establish connections, doesn't guarantee delivery, and doesn't check if data arrived correctly. It just sends packets (called datagrams) and hopes for the best!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> UDP is like sending postcards. You write the message, put the address on it, drop it in the mailbox, and move on. You don't know if it arrived, in what order, or if it got damaged. But it's fast and simple!
            </div>

            <div class="help-section">
                <h3>🆚 UDP vs TCP</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Feature</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">TCP</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">UDP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Connection</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Connection-oriented (handshake)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Connectionless (no setup)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Reliability</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Guaranteed delivery</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">No guarantees (best effort)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Ordering</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">In-order delivery</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">No order guarantee</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Error Checking</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Extensive (retransmits lost data)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Basic checksum only</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Speed</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Slower (overhead)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Faster (minimal overhead)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Header Size</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">20 bytes minimum</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8 bytes (simple!)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Flow Control</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Yes (sliding window)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">No</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Best For</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">File transfer, web, email</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Streaming, gaming, DNS, VoIP</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>📦 UDP Header (Only 8 Bytes!)</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Field</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Size</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Source Port</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2 bytes</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Sender's port number</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Destination Port</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2 bytes</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Receiver's port number</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Length</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2 bytes</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Total datagram size (header + data)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Checksum</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2 bytes</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Error detection (optional!)</td>
                        </tr>
                    </tbody>
                </table>
                <p style="font-size:12px; color:#9ca3af;">That's it! Compare to TCP's 20+ byte header with sequence numbers, acknowledgments, flags, etc.</p>
            </div>

            <div class="help-section">
                <h3>✅ When to Use UDP</h3>
                <ul>
                    <li><strong>Real-Time Applications:</strong> Speed matters more than perfection
                        <ul>
                            <li>Video streaming (Netflix, YouTube)</li>
                            <li>Voice calls (VoIP, Skype, Discord)</li>
                            <li>Online gaming (FPS, MMORPGs)</li>
                            <li>Live broadcasts</li>
                        </ul>
                    </li>
                    <li><strong>Small Queries:</strong> Overhead not worth it
                        <ul>
                            <li>DNS lookups (simple request/response)</li>
                            <li>DHCP (network configuration)</li>
                            <li>NTP (time synchronization)</li>
                        </ul>
                    </li>
                    <li><strong>Broadcast/Multicast:</strong> One-to-many communication
                        <ul>
                            <li>Network discovery</li>
                            <li>Video conferencing</li>
                            <li>IPTV</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="help-example">
                <strong>Example: Why Gaming Uses UDP</strong>
                <p>In a fast-paced shooter game:</p>
                <ul>
                    <li><strong>TCP:</strong> "I shot at 10:00:01.123... wait, did you get that? Let me resend... still waiting... OK confirmed. Now I moved left at 10:00:01.456..."</li>
                    <li><strong>UDP:</strong> "Shot! Moved left! Jumped! Reloaded! Hit!" (fires off updates rapidly, doesn't wait for confirmation)</li>
                </ul>
                <p>If a UDP packet is lost (e.g., "Jumped!"), it doesn't matter - the next update will show the current position. Retransmitting old position data is useless!</p>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> DNS queries use UDP! When a computer looks up a domain name, it sends a UDP datagram on port 53 to the DNS server. DHCP also uses UDP (ports 67/68) for quick configuration requests!
            </div>

            <div class="help-section">
                <h3>⚠️ UDP Drawbacks</h3>
                <ul>
                    <li><strong>No Reliability:</strong> Packets can be lost (application must handle it)</li>
                    <li><strong>No Ordering:</strong> Packets may arrive out of order</li>
                    <li><strong>No Congestion Control:</strong> Can flood the network</li>
                    <li><strong>No Flow Control:</strong> Sender doesn't know if receiver is overwhelmed</li>
                    <li><strong>Vulnerable to Attacks:</strong> Easy to spoof source addresses (UDP flood, amplification)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🎮 Application-Level Solutions</h3>
                <p>Since UDP doesn't provide reliability, applications add it when needed:</p>
                <ul>
                    <li><strong>QUIC Protocol:</strong> Adds reliability on top of UDP (HTTP/3 uses this)</li>
                    <li><strong>RTP (Real-time Transport):</strong> Adds sequence numbers and timestamps</li>
                    <li><strong>Game Engines:</strong> Implement custom acknowledgments for critical events</li>
                    <li><strong>Error Correction:</strong> Forward Error Correction codes recover lost packets</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🔍 Common UDP Ports</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Port</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Service</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">53</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DNS</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Domain name lookups</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">67/68</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DHCP</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IP address assignment</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">123</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">NTP</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Time synchronization</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">161/162</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">SNMP</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Network monitoring</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">514</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Syslog</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">System logging</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    },

    // ========================================
    // 10. SSL/TLS Encryption
    // ========================================
    ssl_tls_encryption: {
        title: "SSL/TLS Encryption",
        icon: "🔒",
        content: `
            <div class="help-section">
                <h3>What is SSL/TLS?</h3>
                <p><strong>SSL (Secure Sockets Layer)</strong> and its successor <strong>TLS (Transport Layer Security)</strong> are protocols that encrypt data transmitted over networks. They're what make HTTPS secure - protecting passwords, credit cards, and personal information from eavesdroppers!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> SSL/TLS is like sending a letter in a locked safe instead of a transparent envelope. Even if someone intercepts it, they can't read the contents without the key. Plus, the seal on the safe proves it's really from who it claims to be!
            </div>

            <div class="help-section">
                <h3>🔑 Three Main Goals</h3>
                <ul>
                    <li><strong>Encryption:</strong> Scramble data so only intended recipient can read it</li>
                    <li><strong>Authentication:</strong> Prove the server is who it claims to be (via certificates)</li>
                    <li><strong>Integrity:</strong> Detect if data was tampered with during transmission</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🤝 The TLS Handshake</h3>
                <p>Before encrypted communication begins, client and server perform a <strong>TLS handshake</strong>:</p>

                <p><strong>Step 1 - Client Hello:</strong></p>
                <ul>
                    <li>Client says: "I support TLS 1.3, and these encryption methods"</li>
                    <li>Sends random number for key generation</li>
                </ul>

                <p><strong>Step 2 - Server Hello:</strong></p>
                <ul>
                    <li>Server responds: "Let's use TLS 1.3 with AES-256 encryption"</li>
                    <li>Sends its SSL certificate (proves identity)</li>
                    <li>Sends its own random number</li>
                </ul>

                <p><strong>Step 3 - Certificate Verification:</strong></p>
                <ul>
                    <li>Client checks certificate is valid and trusted</li>
                    <li>Verifies certificate was issued by trusted Certificate Authority (CA)</li>
                    <li>Checks certificate hasn't expired</li>
                </ul>

                <p><strong>Step 4 - Key Exchange:</strong></p>
                <ul>
                    <li>Client and server generate shared encryption keys</li>
                    <li>Uses asymmetric cryptography (RSA or Diffie-Hellman)</li>
                    <li>Both now have same secret key without sending it over network!</li>
                </ul>

                <p><strong>Step 5 - Encrypted Communication:</strong></p>
                <ul>
                    <li>All subsequent data encrypted with shared key</li>
                    <li>Uses fast symmetric encryption (AES)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>📜 SSL Certificates</h3>
                <p>Certificates are digital documents that prove a server's identity:</p>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Certificate Contains</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Domain Name</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">example.com (which sites it's valid for)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Public Key</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Used to establish encrypted connection</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Issuer (CA)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Who verified and signed this certificate</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Validity Period</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Start and expiration dates (usually 1-2 years)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Digital Signature</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">CA's signature proving certificate is authentic</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🔐 Symmetric vs Asymmetric Encryption</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Works</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">When Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Symmetric</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Same key encrypts and decrypts (AES)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Bulk data encryption (fast)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Asymmetric</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Public key encrypts, private key decrypts (RSA)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Key exchange, signatures (slow)</td>
                        </tr>
                    </tbody>
                </table>
                <p style="font-size:12px; color:#9ca3af;"><strong>TLS uses both:</strong> Asymmetric for initial handshake, then symmetric for actual data!</p>
            </div>

            <div class="help-example">
                <strong>Example: Banking Website</strong>
                <ol>
                    <li>You visit https://bank.com</li>
                    <li>Bank sends SSL certificate proving it's really them</li>
                    <li>Your browser verifies certificate with trusted CA</li>
                    <li>Browser and bank negotiate encryption keys</li>
                    <li>Your login credentials transmitted encrypted</li>
                    <li>Even on public WiFi, nobody can steal your password!</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>🏢 Certificate Authorities (CAs)</h3>
                <p>Trusted organizations that verify and sign SSL certificates:</p>
                <ul>
                    <li><strong>Popular CAs:</strong> Let's Encrypt, DigiCert, GlobalSign, Comodo</li>
                    <li><strong>Browser Trust:</strong> Browsers have list of trusted CAs built-in</li>
                    <li><strong>Chain of Trust:</strong> CA's certificate signed by root CA</li>
                    <li><strong>Revocation:</strong> CAs can revoke compromised certificates</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> HTTPS servers use port 443 instead of HTTP's port 80. While the simulator shows HTTPS connections, actual encryption happens behind the scenes - you'll see traffic marked as "HTTPS" to indicate it would be encrypted in real networks!
            </div>

            <div class="help-section">
                <h3>⚠️ SSL/TLS Vulnerabilities (Historical)</h3>
                <ul>
                    <li><strong>POODLE:</strong> Attack on SSL 3.0 (deprecated, use TLS)</li>
                    <li><strong>Heartbleed:</strong> Bug in OpenSSL library (patched 2014)</li>
                    <li><strong>BEAST:</strong> Attack on TLS 1.0 (use TLS 1.2+)</li>
                    <li><strong>Expired Certificates:</strong> Always check expiration dates</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>✅ Best Practices</h3>
                <ul>
                    <li><strong>Use TLS 1.2 or 1.3:</strong> Disable older SSL/TLS versions</li>
                    <li><strong>Strong Ciphers:</strong> Use AES-256, avoid RC4 and DES</li>
                    <li><strong>Perfect Forward Secrecy:</strong> Even if key stolen, past communications safe</li>
                    <li><strong>HSTS:</strong> Force HTTPS, prevent downgrade attacks</li>
                    <li><strong>Certificate Pinning:</strong> App only accepts specific certificates</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🔍 How to Identify HTTPS</h3>
                <ul>
                    <li><strong>Padlock Icon:</strong> Browser shows lock in address bar</li>
                    <li><strong>URL starts with https://</strong> not http://</li>
                    <li><strong>Certificate Viewer:</strong> Click padlock to see certificate details</li>
                    <li><strong>Green Bar:</strong> EV certificates show company name (less common now)</li>
                </ul>
            </div>
        `
    },

    // ========================================
    // 11. SMTP/POP3/IMAP Email Protocols
    // ========================================
    email_protocols: {
        title: "Email Protocols (SMTP/POP3/IMAP)",
        icon: "📧",
        content: `
            <div class="help-section">
                <h3>How Email Works</h3>
                <p>Email uses THREE different protocols working together: <strong>SMTP</strong> for sending, and <strong>POP3</strong> or <strong>IMAP</strong> for receiving. Think of it like the postal service with different departments for outgoing and incoming mail!</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> Email is like physical mail. SMTP is the post office that delivers your letter. POP3 is like picking up mail and taking it home (removes from mailbox). IMAP is like reading mail at the post office (stays on server).
            </div>

            <div class="help-section">
                <h3>📨 SMTP (Simple Mail Transfer Protocol)</h3>
                <p><strong>Purpose:</strong> Sending email from client to server, and between mail servers</p>
                <ul>
                    <li><strong>Port 25:</strong> Server-to-server (unencrypted)</li>
                    <li><strong>Port 587:</strong> Client-to-server (with STARTTLS encryption)</li>
                    <li><strong>Port 465:</strong> Client-to-server (SSL/TLS from start)</li>
                </ul>

                <p><strong>How SMTP Works:</strong></p>
                <ol>
                    <li>You compose email in Gmail/Outlook</li>
                    <li>Client sends to your mail server (smtp.gmail.com) via port 587</li>
                    <li>Your mail server looks up recipient's mail server (DNS MX record)</li>
                    <li>Your server sends to recipient's server via port 25</li>
                    <li>Recipient's server stores email in their mailbox</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>📥 POP3 (Post Office Protocol v3)</h3>
                <p><strong>Purpose:</strong> Download email from server to your device</p>
                <ul>
                    <li><strong>Port 110:</strong> Unencrypted</li>
                    <li><strong>Port 995:</strong> SSL/TLS encrypted</li>
                </ul>

                <p><strong>How POP3 Works:</strong></p>
                <ol>
                    <li>Client connects to mail server</li>
                    <li>Authenticates with username/password</li>
                    <li>Downloads all new messages</li>
                    <li>Deletes messages from server (default behavior)</li>
                    <li>Disconnects</li>
                </ol>

                <p><strong>Characteristics:</strong></p>
                <ul>
                    <li><strong>One-way sync:</strong> Downloads only, doesn't sync back</li>
                    <li><strong>Local storage:</strong> Email stored on your device</li>
                    <li><strong>Offline access:</strong> Read email without internet</li>
                    <li><strong>Single device:</strong> Best for one computer/phone</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>📬 IMAP (Internet Message Access Protocol)</h3>
                <p><strong>Purpose:</strong> Access and manage email stored on server</p>
                <ul>
                    <li><strong>Port 143:</strong> Unencrypted</li>
                    <li><strong>Port 993:</strong> SSL/TLS encrypted</li>
                </ul>

                <p><strong>How IMAP Works:</strong></p>
                <ol>
                    <li>Client connects to mail server</li>
                    <li>Authenticates with username/password</li>
                    <li>Views email headers (doesn't download full messages)</li>
                    <li>Downloads only when you open a message</li>
                    <li>All changes synced to server (read, delete, move)</li>
                    <li>Stays connected for real-time updates</li>
                </ol>

                <p><strong>Characteristics:</strong></p>
                <ul>
                    <li><strong>Two-way sync:</strong> Changes sync across all devices</li>
                    <li><strong>Server storage:</strong> Email stays on server</li>
                    <li><strong>Multiple devices:</strong> Access from phone, tablet, computer</li>
                    <li><strong>Folders:</strong> Create and sync folders across devices</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🆚 POP3 vs IMAP Comparison</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Feature</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">POP3</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">IMAP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Email Location</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Stored on device</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Stored on server</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Synchronization</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">None (one-way download)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Full sync across devices</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Multiple Devices</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Difficult</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Seamless</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Offline Access</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Full access</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⚠️ Limited (cached only)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Server Storage</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Freed after download</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Uses server quota</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Speed</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Slower initial download</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Faster (headers only)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Backup</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">On device (can be lost)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">On server (safer)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Best For</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Single device, limited server space</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Multiple devices, modern use</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Complete Email Journey:</strong>
                <ol>
                    <li><strong>Sending:</strong> alice@gmail.com writes to bob@yahoo.com</li>
                    <li><strong>SMTP (587):</strong> Alice's client → Gmail's SMTP server</li>
                    <li><strong>SMTP (25):</strong> Gmail server → Yahoo server</li>
                    <li><strong>Storage:</strong> Yahoo stores in Bob's mailbox</li>
                    <li><strong>IMAP (993):</strong> Bob's phone checks Yahoo server</li>
                    <li><strong>Sync:</strong> Bob reads on phone, marks as read</li>
                    <li><strong>IMAP Sync:</strong> Laptop also shows as read</li>
                </ol>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong> Email servers use SMTP (port 25) to send mail between servers. Clients use POP3 (port 110) or IMAP (port 143) to retrieve their messages. You can configure email servers and watch messages flow through the network!
            </div>

            <div class="help-section">
                <h3>🔒 Email Security</h3>
                <ul>
                    <li><strong>Always use encrypted ports:</strong> 587/465 for SMTP, 995 for POP3, 993 for IMAP</li>
                    <li><strong>SPF Records:</strong> Prevent email spoofing (verify sender)</li>
                    <li><strong>DKIM:</strong> Digital signatures verify email hasn't been modified</li>
                    <li><strong>DMARC:</strong> Policy for handling failed authentication</li>
                    <li><strong>End-to-End Encryption:</strong> PGP or S/MIME for sensitive content</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>📊 Port Summary</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Protocol</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Unencrypted Port</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Encrypted Port</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">SMTP (sending)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">25 (server-to-server)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">587 (STARTTLS) or 465 (SSL/TLS)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">POP3 (receiving)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">110</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">995 (SSL/TLS)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IMAP (receiving)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">143</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">993 (SSL/TLS)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    },

    // ============ Core Protocols (continued) ============

    ethernet_frames: {
        title: "Ethernet Frames",
        icon: "📦",
        content: `
            <div class="help-section">
                <h3>What are Ethernet Frames?</h3>
                <p><strong>Ethernet frames</strong> are the fundamental units of data transmission on local area networks (LANs). Think of them like envelopes that wrap around your letters (data) - they contain addressing information, error checking, and the actual data being sent.</p>
                <p>Ethernet operates at <strong>Layer 2 (Data Link Layer)</strong> of the OSI model and uses MAC addresses to deliver data between devices on the same network.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Imagine sending a letter inside an envelope. The envelope (Ethernet frame) has:
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Return address</strong> → Source MAC address</li>
                    <li><strong>Destination address</strong> → Destination MAC address</li>
                    <li><strong>Letter inside</strong> → IP packet (data)</li>
                    <li><strong>Seal/signature</strong> → Frame Check Sequence (error detection)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Ethernet Frame Structure</h3>
                <p>An Ethernet frame contains several important fields:</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Field</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Size</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Preamble</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">7 bytes</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Synchronizes sender and receiver clocks</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Start Frame Delimiter (SFD)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1 byte</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Marks the beginning of the frame</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Destination MAC</strong> ⭐</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">6 bytes</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">MAC address of the recipient device</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Source MAC</strong> ⭐</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">6 bytes</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">MAC address of the sender device</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>EtherType</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2 bytes</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Indicates protocol (0x0800 = IPv4, 0x0806 = ARP)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Data (Payload)</strong> ⭐</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">46-1500 bytes</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">The actual data (IP packet)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>FCS (Frame Check Sequence)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">4 bytes</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">CRC32 checksum for error detection</td>
                        </tr>
                    </tbody>
                </table>

                <p style="margin-top:10px; color:#9ca3af; font-size:13px;">⭐ = Most important fields to understand</p>
            </div>

            <div class="help-example">
                <strong>Example Frame Journey:</strong>
                <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                    <p style="margin:0; color:#e4e4e7;"><strong>1. Computer A wants to send data to Computer B</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Computer A creates IP packet</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Wraps it in Ethernet frame</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Sets Source MAC: AA:BB:CC:DD:EE:FF</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Sets Destination MAC: 11:22:33:44:55:66</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Calculates FCS checksum</p>
                    <p style="margin:10px 0 0 0; color:#e4e4e7;"><strong>2. Frame travels over Ethernet cable</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Switch reads destination MAC</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Forwards frame to correct port</p>
                    <p style="margin:10px 0 0 0; color:#e4e4e7;"><strong>3. Computer B receives frame</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Checks FCS for errors</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Sees own MAC address in destination</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Unwraps frame to get IP packet</p>
                </div>
            </div>

            <div class="help-section">
                <h3>Key Concepts</h3>

                <p><strong>Maximum Transmission Unit (MTU):</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Standard Ethernet MTU:</strong> 1500 bytes</li>
                    <li><strong>Jumbo Frames:</strong> Up to 9000 bytes (not standard, must be supported by all devices)</li>
                    <li><strong>Minimum Frame Size:</strong> 64 bytes (including headers)</li>
                </ul>

                <p style="margin-top:15px;"><strong>Frame Types:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Unicast:</strong> One sender → One receiver (specific MAC)</li>
                    <li><strong>Broadcast:</strong> One sender → All devices (MAC: FF:FF:FF:FF:FF:FF)</li>
                    <li><strong>Multicast:</strong> One sender → Group of devices (special MAC range)</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>When you send data, it's automatically wrapped in Ethernet frames</li>
                    <li>Switches use MAC addresses in frames to forward traffic</li>
                    <li>Click on devices to view their MAC addresses</li>
                    <li>Watch frames travel over cables in the traffic view</li>
                    <li>Broadcast frames (like ARP requests) go to all devices on the same network</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Common Issues</h3>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>CRC Errors:</strong> Damaged frames detected by FCS mismatch → Frame discarded</li>
                    <li><strong>Runt Frames:</strong> Frames smaller than 64 bytes → Usually caused by collisions</li>
                    <li><strong>Jabber:</strong> Frames larger than maximum size → Device malfunction or misconfiguration</li>
                    <li><strong>Collisions:</strong> Two devices transmit simultaneously on shared Ethernet → Retransmission needed</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Ethernet = Layer 2</strong> (uses MAC addresses)</li>
                    <li><strong>IP = Layer 3</strong> (uses IP addresses, carried inside Ethernet frames)</li>
                    <li>Ethernet frames only work on the <strong>local network</strong></li>
                    <li>Routers strip off Ethernet frames and create new ones for each network segment</li>
                </ul>
            </div>
        `
    },

    ip_packets: {
        title: "IP Packets",
        icon: "📨",
        content: `
            <div class="help-section">
                <h3>What are IP Packets?</h3>
                <p><strong>IP (Internet Protocol) packets</strong> are the fundamental units of data sent across the internet and networks. Think of them like parcels with addresses - they contain the sender's address, destination address, and the data being sent. IP packets enable communication between devices across different networks.</p>
                <p>IP operates at <strong>Layer 3 (Network Layer)</strong> of the OSI model and uses IP addresses to route data across networks.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Imagine sending a package through the postal service:
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>From address</strong> → Source IP address</li>
                    <li><strong>To address</strong> → Destination IP address</li>
                    <li><strong>Package contents</strong> → TCP/UDP data</li>
                    <li><strong>Tracking number</strong> → Packet ID</li>
                    <li><strong>Shipping route</strong> → Routers determine path</li>
                    <li><strong>Fragile sticker</strong> → Don't Fragment flag</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>IPv4 Packet Structure</h3>
                <p>An IPv4 packet header contains critical information for routing and delivery:</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Field</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Size</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Version</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">4 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IP version (4 for IPv4, 6 for IPv6)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Header Length</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">4 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Length of header (usually 20 bytes)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Type of Service (ToS)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Priority and quality of service (QoS)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Total Length</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">16 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Total packet size (header + data)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Identification</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">16 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Unique packet ID for reassembly</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Flags</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">3 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Don't Fragment, More Fragments flags</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Fragment Offset</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">13 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Position of fragment in original packet</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Time to Live (TTL)</strong> ⭐</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Max router hops (prevents infinite loops)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Protocol</strong> ⭐</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Upper layer protocol (6=TCP, 17=UDP, 1=ICMP)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Header Checksum</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">16 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Error checking for header only</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Source IP Address</strong> ⭐</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">32 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IP address of sender</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Destination IP Address</strong> ⭐</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">32 bits</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IP address of recipient</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Options</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Variable</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Optional features (rarely used)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Data (Payload)</strong> ⭐</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Variable</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TCP or UDP segment</td>
                        </tr>
                    </tbody>
                </table>

                <p style="margin-top:10px; color:#9ca3af; font-size:13px;">⭐ = Most important fields to understand</p>
            </div>

            <div class="help-example">
                <strong>Example Packet Journey:</strong>
                <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                    <p style="margin:0; color:#e4e4e7;"><strong>Scenario: Computer A (192.168.1.100) sends data to Web Server (8.8.8.8)</strong></p>

                    <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>1. Packet Created:</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Source IP: 192.168.1.100</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Destination IP: 8.8.8.8</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Protocol: 6 (TCP)</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • TTL: 64 (Linux default)</p>

                    <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>2. Hops Through Routers:</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Router 1: TTL decremented to 63, forwarded</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Router 2: TTL decremented to 62, forwarded</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Router 3: TTL decremented to 61, forwarded</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • ... (each router decrements TTL by 1)</p>

                    <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>3. Reaches Destination:</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • TTL: 54 (10 hops used)</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Server receives packet</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">   • Data passed to TCP layer</p>
                </div>
            </div>

            <div class="help-section">
                <h3>Key Concepts</h3>

                <p><strong>Time to Live (TTL):</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Purpose:</strong> Prevents packets from circulating forever if routing loops exist</li>
                    <li><strong>How it works:</strong> Each router decrements TTL by 1</li>
                    <li><strong>What happens at TTL=0:</strong> Router discards packet and sends ICMP "Time Exceeded" message</li>
                    <li><strong>Typical values:</strong> Linux=64, Windows=128, Cisco routers=255</li>
                    <li><strong>Traceroute uses TTL:</strong> Starts with TTL=1, then 2, then 3... to map route</li>
                </ul>

                <p style="margin-top:15px;"><strong>Fragmentation:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Why fragment?</strong> If packet is larger than network's MTU (Maximum Transmission Unit)</li>
                    <li><strong>Standard MTU:</strong> 1500 bytes for Ethernet</li>
                    <li><strong>Don't Fragment (DF) flag:</strong> If set, router drops oversized packets instead of fragmenting</li>
                    <li><strong>Path MTU Discovery:</strong> Finds smallest MTU along route to avoid fragmentation</li>
                    <li><strong>Reassembly:</strong> Destination host reassembles fragments using ID and offset fields</li>
                </ul>

                <p style="margin-top:15px;"><strong>Protocol Numbers (Common):</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>1</strong> = ICMP (ping, traceroute)</li>
                    <li><strong>6</strong> = TCP (reliable, connection-oriented)</li>
                    <li><strong>17</strong> = UDP (fast, connectionless)</li>
                    <li><strong>50</strong> = ESP (IPsec encrypted data)</li>
                    <li><strong>51</strong> = AH (IPsec authentication)</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Every message sent between devices is an IP packet</li>
                    <li>Routers examine destination IP to decide where to forward</li>
                    <li>Click on traffic to see source/destination IPs</li>
                    <li>Watch TTL decrement as packets pass through routers</li>
                    <li>Use traceroute tool to see packet path hop-by-hop</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>IP Packet vs Ethernet Frame</h3>
                <p><strong>Remember the relationship:</strong></p>
                <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                    <p style="margin:0; color:#e4e4e7;">📦 <strong>Ethernet Frame</strong> (Layer 2)</p>
                    <p style="margin:5px 0 0 20px; color:#e4e4e7;">└─ 📨 <strong>IP Packet</strong> (Layer 3)</p>
                    <p style="margin:5px 0 0 40px; color:#e4e4e7;">└─ 🔌 <strong>TCP/UDP Segment</strong> (Layer 4)</p>
                    <p style="margin:5px 0 0 60px; color:#e4e4e7;">└─ 📄 <strong>Application Data</strong> (Layer 7)</p>
                </div>
                <p style="margin-top:10px; color:#9ca3af;">IP packets are encapsulated inside Ethernet frames for local network delivery. When crossing routers, old Ethernet frame is stripped off and new one is added for next network segment.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>IP addresses</strong> stay the same end-to-end</li>
                    <li><strong>MAC addresses</strong> change at each router hop</li>
                    <li><strong>TTL</strong> decrements at each router to prevent loops</li>
                    <li><strong>Routers</strong> make forwarding decisions based on destination IP</li>
                </ul>
            </div>
        `
    },

    broadcast_vs_unicast: {
        title: "Broadcast vs Unicast vs Multicast",
        icon: "📡",
        content: `
            <div class="help-section">
                <h3>What are Broadcast, Unicast, and Multicast?</h3>
                <p>These are three different methods of sending data across a network. They differ in how many recipients receive the data:</p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Unicast:</strong> One sender → One specific receiver</li>
                    <li><strong>Broadcast:</strong> One sender → All devices on the network</li>
                    <li><strong>Multicast:</strong> One sender → A group of interested receivers</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Unicast</strong> = Sending a personal letter to one person</li>
                    <li><strong>Broadcast</strong> = Making an announcement over a school intercom (everyone hears it)</li>
                    <li><strong>Multicast</strong> = Sending emails to a mailing list (only subscribers receive it)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Detailed Comparison</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Aspect</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Unicast</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Broadcast</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Multicast</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Destination</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Specific device</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">All devices</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Group of devices</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>IP Address</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Normal IP<br>(e.g., 192.168.1.100)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">255.255.255.255<br>or network broadcast<br>(e.g., 192.168.1.255)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">224.0.0.0 to<br>239.255.255.255</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>MAC Address</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Device's MAC<br>(e.g., AA:BB:CC:DD:EE:FF)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">FF:FF:FF:FF:FF:FF</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">01:00:5E:xx:xx:xx<br>(mapped from IP)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Bandwidth Usage</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Efficient<br>(one copy)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Inefficient<br>(all process it)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Efficient<br>(one copy, selective delivery)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Router Behavior</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Forwards between networks</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Does NOT forward<br>(limited to local network)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Can forward<br>(with multicast routing)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Common Uses</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Web browsing,<br>email, file transfers</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DHCP discovery,<br>ARP requests</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Video streaming,<br>online gaming</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Unicast Communication</h3>
                <p><strong>One-to-one communication</strong> - the most common type of network traffic.</p>

                <p><strong>How it works:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li>Sender knows recipient's specific IP address</li>
                    <li>Packet sent with that destination IP</li>
                    <li>Routers/switches forward only to that device</li>
                    <li>Only the intended recipient processes it</li>
                </ol>

                <div class="help-example" style="margin-top:10px;">
                    <strong>Example:</strong>
                    <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                        <p style="margin:0; color:#e4e4e7;">Your computer (192.168.1.100) loads a website from server (8.8.8.8)</p>
                        <p style="margin:10px 0 0 0; color:#e4e4e7;"><strong>HTTP Request (Unicast):</strong></p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Source: 192.168.1.100</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Destination: 8.8.8.8</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   → Only 8.8.8.8 processes this packet</p>
                    </div>
                </div>

                <p style="margin-top:15px;"><strong>Advantages:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Efficient - only recipient processes packet</li>
                    <li>Private - only intended device receives data</li>
                    <li>Scalable across the internet</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Broadcast Communication</h3>
                <p><strong>One-to-all communication</strong> - sender transmits to every device on the local network.</p>

                <p><strong>Types of Broadcast:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Limited Broadcast:</strong> 255.255.255.255 (current network only)</li>
                    <li><strong>Directed Broadcast:</strong> Network broadcast address (e.g., 192.168.1.255 for 192.168.1.0/24)</li>
                </ul>

                <div class="help-example" style="margin-top:10px;">
                    <strong>Example: DHCP Discovery</strong>
                    <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                        <p style="margin:0; color:#e4e4e7;">Computer boots up with no IP address configured</p>
                        <p style="margin:10px 0 0 0; color:#e4e4e7;"><strong>DHCP Discover (Broadcast):</strong></p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Source: 0.0.0.0 (doesn't have IP yet)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Destination: 255.255.255.255 (broadcast)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   MAC Destination: FF:FF:FF:FF:FF:FF</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Message: "Is there a DHCP server? I need an IP!"</p>
                        <p style="margin:10px 0 0 0; color:#e4e4e7;">   → ALL devices on network receive this</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   → Only DHCP server responds</p>
                    </div>
                </div>

                <p style="margin-top:15px;"><strong>Common Broadcast Uses:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>DHCP Discovery:</strong> Finding DHCP server</li>
                    <li><strong>ARP Requests:</strong> "Who has IP 192.168.1.1? Tell me your MAC!"</li>
                    <li><strong>NetBIOS:</strong> Windows network name resolution</li>
                    <li><strong>Wake-on-LAN:</strong> Magic packet to wake sleeping computers</li>
                </ul>

                <p style="margin-top:15px;"><strong>Disadvantages:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>⚠️ <strong>Broadcast Storm:</strong> Too many broadcasts can overwhelm network</li>
                    <li>⚠️ <strong>Processing Overhead:</strong> Every device must examine packet</li>
                    <li>⚠️ <strong>Limited Scope:</strong> Routers don't forward broadcasts (only local network)</li>
                    <li>⚠️ <strong>Security Risk:</strong> Everyone can see broadcast traffic</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Multicast Communication</h3>
                <p><strong>One-to-many communication</strong> - sender transmits to a group of interested receivers.</p>

                <p><strong>How it works:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li>Devices "subscribe" to a multicast group (224.0.0.0 - 239.255.255.255)</li>
                    <li>Sender transmits once to the multicast IP</li>
                    <li>Network infrastructure duplicates packets only where needed</li>
                    <li>Only subscribed devices receive and process traffic</li>
                </ol>

                <div class="help-example" style="margin-top:10px;">
                    <strong>Example: Video Conference</strong>
                    <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                        <p style="margin:0; color:#e4e4e7;"><strong>Scenario:</strong> 100 people watching live video stream</p>

                        <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>Without Multicast (100 Unicast streams):</strong></p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Server sends: 100 separate copies</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Bandwidth needed: 100 × 5 Mbps = 500 Mbps 🔥</p>

                        <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>With Multicast:</strong></p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Server sends: 1 stream to group 224.1.1.1</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Network duplicates only where needed</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Bandwidth needed: 5 Mbps ✅</p>
                    </div>
                </div>

                <p style="margin-top:15px;"><strong>Common Multicast Groups:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>224.0.0.1</strong> - All hosts on local network</li>
                    <li><strong>224.0.0.2</strong> - All routers on local network</li>
                    <li><strong>224.0.0.5</strong> - OSPF routers</li>
                    <li><strong>224.0.0.9</strong> - RIP v2 routers</li>
                    <li><strong>239.x.x.x</strong> - Administratively scoped (private multicast)</li>
                </ul>

                <p style="margin-top:15px;"><strong>Advantages:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Extremely efficient for one-to-many distribution</li>
                    <li>Reduces bandwidth usage significantly</li>
                    <li>Only interested parties receive traffic</li>
                    <li>Scales well for large audiences</li>
                </ul>

                <p style="margin-top:15px;"><strong>Disadvantages:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Requires special router configuration (IGMP, PIM)</li>
                    <li>Not supported by all networks</li>
                    <li>More complex to troubleshoot</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Unicast:</strong> Most traffic you see (HTTP, DNS queries, file transfers)</li>
                    <li><strong>Broadcast:</strong> Watch for DHCP discover and ARP requests</li>
                    <li><strong>Broadcast domain:</strong> All devices connected to same switch/VLAN</li>
                    <li><strong>Routers block broadcasts:</strong> They don't cross router boundaries</li>
                    <li><strong>VLANs segment broadcasts:</strong> Different VLANs = different broadcast domains</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>When to Use Which?</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Scenario</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Best Choice</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Why</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Sending email</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Unicast</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">One specific recipient</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Finding DHCP server</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Broadcast</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Don't know server address yet</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Live video streaming to 1000 viewers</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Multicast</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Efficient one-to-many distribution</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Finding MAC for known IP</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Broadcast</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ARP must ask all devices</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Online multiplayer game (regional server)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Multicast</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Sends updates to player group</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Unicast</strong> = Point-to-point (most common)</li>
                    <li><strong>Broadcast</strong> = Shout to everyone locally (limited to broadcast domain)</li>
                    <li><strong>Multicast</strong> = Subscription service (efficient for groups)</li>
                    <li><strong>Routers block broadcasts</strong> but can forward multicast (if configured)</li>
                </ul>
            </div>
        `
    },

    dhcp_relay: {
        title: "DHCP Relay Agents",
        icon: "🔄",
        content: `
            <div class="help-section">
                <h3>What are DHCP Relay Agents?</h3>
                <p>A <strong>DHCP Relay Agent</strong> (also called IP Helper or DHCP Forwarder) is a router or server that forwards DHCP messages between clients and DHCP servers on different networks. Without relay agents, DHCP would only work on the same local network because routers don't forward broadcast traffic.</p>
                <p>Think of it like a helpful postal worker who takes local mail and sends it to the main post office in another city!</p>
            </div>

            <div class="help-tip">
                <strong>💡 The Problem:</strong>
                <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                    <p style="margin:0; color:#e4e4e7;"><strong>Without DHCP Relay:</strong></p>
                    <ul style="margin:10px 0 0 20px; color:#e4e4e7;">
                        <li>DHCP clients send DHCP Discover as <strong>broadcast</strong> (255.255.255.255)</li>
                        <li>Broadcasts don't cross routers - they're limited to the local network</li>
                        <li>DHCP server on different subnet never receives the request</li>
                        <li>Client never gets an IP address ❌</li>
                    </ul>

                    <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>With DHCP Relay:</strong></p>
                    <ul style="margin:10px 0 0 20px; color:#e4e4e7;">
                        <li>Router intercepts DHCP broadcast</li>
                        <li>Converts broadcast to <strong>unicast</strong></li>
                        <li>Forwards to DHCP server's IP address</li>
                        <li>Client gets IP address ✅</li>
                    </ul>
                </div>
            </div>

            <div class="help-section">
                <h3>How DHCP Relay Works</h3>
                <p><strong>Step-by-step process:</strong></p>

                <div class="help-example">
                    <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px; font-family:monospace;">
                        <p style="margin:0; color:#e4e4e7;"><strong>Step 1: DHCP Discover (Broadcast)</strong></p>
                        <p style="margin:5px 0 0 0; color:#9ca3af;">Client → Broadcast (255.255.255.255)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Source: 0.0.0.0 (no IP yet)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Destination: 255.255.255.255</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Message: "I need an IP address!"</p>

                        <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>Step 2: Router Intercepts</strong></p>
                        <p style="margin:5px 0 0 0; color:#9ca3af;">Router/Relay Agent processes broadcast</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   ✓ Sees DHCP Discover on port 67</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   ✓ Knows it's configured as DHCP Relay</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   ✓ Adds its own IP to "giaddr" field (gateway address)</p>

                        <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>Step 3: Relay Forwards (Unicast)</strong></p>
                        <p style="margin:5px 0 0 0; color:#9ca3af;">Router → DHCP Server (10.0.0.5)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Source: 192.168.1.1 (router IP)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Destination: 10.0.0.5 (DHCP server)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   giaddr: 192.168.1.1 (tells server which subnet client is on)</p>

                        <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>Step 4: DHCP Server Responds</strong></p>
                        <p style="margin:5px 0 0 0; color:#9ca3af;">DHCP Server → Router</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   ✓ Sees giaddr = 192.168.1.1</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   ✓ Knows client is on 192.168.1.0/24 network</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   ✓ Offers IP from correct subnet (192.168.1.50)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   ✓ Sends DHCP Offer to router (192.168.1.1)</p>

                        <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>Step 5: Router Relays Back</strong></p>
                        <p style="margin:5px 0 0 0; color:#9ca3af;">Router → Client (Broadcast)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Source: 192.168.1.1</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Destination: 255.255.255.255 (or client MAC)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Offer: "Here's 192.168.1.50 for you!"</p>

                        <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>Step 6-8: Request & Ack</strong></p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   DHCP Request and ACK follow same relay pattern</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   Client gets IP: 192.168.1.50 ✅</p>
                    </div>
                </div>
            </div>

            <div class="help-section">
                <h3>Key Components</h3>

                <p><strong>The "giaddr" Field (Gateway IP Address):</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Purpose:</strong> Tells DHCP server which subnet the client is on</li>
                    <li><strong>Set by:</strong> DHCP Relay Agent (router)</li>
                    <li><strong>Value:</strong> IP address of router interface facing the client</li>
                    <li><strong>Why important:</strong> Server uses this to select correct IP pool/scope</li>
                </ul>

                <p style="margin-top:15px;"><strong>Configuration Requirements:</strong></p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Device</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Configuration Needed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Router/Relay</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                                • Enable DHCP relay on interface<br>
                                • Specify DHCP server IP address<br>
                                • (Optional) Specify multiple servers for redundancy
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DHCP Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                                • Create DHCP scope for EACH client subnet<br>
                                • Configure correct gateway for each scope<br>
                                • Set DNS servers, lease times
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Client</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                                • No configuration needed!<br>
                                • Set to obtain IP automatically<br>
                                • Works transparently
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Real-World Example: School Network</strong>
                <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                    <p style="margin:0; color:#e4e4e7;"><strong>Network Setup:</strong></p>
                    <ul style="margin:10px 0 0 20px; color:#e4e4e7;">
                        <li><strong>DHCP Server:</strong> 10.0.0.5 (server VLAN)</li>
                        <li><strong>Students VLAN:</strong> 192.168.10.0/24 (gateway: 192.168.10.1)</li>
                        <li><strong>Teachers VLAN:</strong> 192.168.20.0/24 (gateway: 192.168.20.1)</li>
                        <li><strong>Staff VLAN:</strong> 192.168.30.0/24 (gateway: 192.168.30.1)</li>
                    </ul>

                    <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>Router Configuration:</strong></p>
                    <p style="margin:5px 0 0 0; color:#9ca3af; font-family:monospace;">interface vlan 10</p>
                    <p style="margin:5px 0 0 0; color:#9ca3af; font-family:monospace;">  ip helper-address 10.0.0.5</p>
                    <p style="margin:5px 0 0 0; color:#9ca3af; font-family:monospace;">interface vlan 20</p>
                    <p style="margin:5px 0 0 0; color:#9ca3af; font-family:monospace;">  ip helper-address 10.0.0.5</p>
                    <p style="margin:5px 0 0 0; color:#9ca3af; font-family:monospace;">interface vlan 30</p>
                    <p style="margin:5px 0 0 0; color:#9ca3af; font-family:monospace;">  ip helper-address 10.0.0.5</p>

                    <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>Result:</strong></p>
                    <ul style="margin:10px 0 0 20px; color:#e4e4e7;">
                        <li>One central DHCP server manages ALL subnets</li>
                        <li>Students automatically get 192.168.10.x addresses</li>
                        <li>Teachers automatically get 192.168.20.x addresses</li>
                        <li>Staff automatically get 192.168.30.x addresses</li>
                        <li>Each group gets correct gateway and DNS settings</li>
                    </ul>
                </div>
            </div>

            <div class="help-section">
                <h3>Benefits of DHCP Relay</h3>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Centralized Management:</strong> One DHCP server for entire network (instead of one per subnet)</li>
                    <li><strong>Cost Savings:</strong> Fewer servers to purchase, configure, and maintain</li>
                    <li><strong>Consistency:</strong> Easier to maintain consistent policies across subnets</li>
                    <li><strong>Scalability:</strong> Easy to add new subnets - just add relay on router</li>
                    <li><strong>Flexibility:</strong> Can specify multiple DHCP servers for redundancy</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Configure router as DHCP relay in router settings</li>
                    <li>Specify remote DHCP server IP address</li>
                    <li>Clients on different VLANs can share one DHCP server</li>
                    <li>Watch DHCP messages being converted from broadcast to unicast</li>
                    <li>Observe giaddr field being set by relay agent</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Troubleshooting DHCP Relay</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Problem</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Possible Cause</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Solution</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Clients not getting IPs</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Relay not configured</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Enable ip helper-address on router interface</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Wrong subnet IPs</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DHCP scope misconfigured</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Check giaddr matches scope configuration</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Relay not forwarding</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ACL blocking UDP 67/68</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Allow DHCP traffic in firewall/ACL</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server unreachable</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Routing issue</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Verify router can reach DHCP server IP</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>DHCP uses broadcasts</strong> which don't cross routers</li>
                    <li><strong>Relay agents solve this</strong> by converting broadcast → unicast</li>
                    <li><strong>giaddr field</strong> tells server which subnet client is on</li>
                    <li><strong>One server, many subnets</strong> - efficient and centralized</li>
                    <li><strong>Router does the heavy lifting</strong> - clients don't know relay exists</li>
                </ul>
            </div>
        `
    },

    // ============ ACL Help Content ============
    acl_overview: {
        title: "Access Control Lists (ACLs)",
        content: `
            <h3>🛡️ What are ACLs?</h3>
            <p><strong>Access Control Lists (ACLs)</strong> are security filters on routers that control which network traffic is allowed to pass through. Think of them like security guards at a building entrance - they check if each visitor (packet) is on the approved list before letting them in!</p>

            <h3>🎯 Why Use ACLs?</h3>
            <ul>
                <li><strong>Network Security:</strong> Block unauthorized access to sensitive networks</li>
                <li><strong>Traffic Control:</strong> Prevent certain departments from accessing others</li>
                <li><strong>Policy Enforcement:</strong> Implement company network access policies</li>
                <li><strong>Bandwidth Management:</strong> Control which networks can access resources</li>
            </ul>

            <div class="help-tip">
                <strong>Real World Example:</strong> A school might use ACLs to prevent student computers (192.168.10.0/24) from accessing the admin network (192.168.1.0/24), while still allowing internet access.
            </div>

            <h3>📋 Standard vs Extended ACLs</h3>
            <p>NetworkSimulator uses <strong>Standard ACLs</strong>, which are simpler and perfect for learning:</p>
            <ul>
                <li><strong>Standard ACLs (1-99):</strong> Filter based on SOURCE IP address only</li>
                <li><strong>Extended ACLs (100-199):</strong> Filter on source/destination IP, ports, protocols (not implemented yet)</li>
            </ul>

            <h3>🔄 How ACLs Work</h3>
            <p>When a packet arrives at a router interface with an ACL:</p>
            <ol>
                <li><strong>Check rules top-to-bottom:</strong> Rules are processed in order</li>
                <li><strong>First match wins:</strong> Once a rule matches, stop checking</li>
                <li><strong>Permit or Deny:</strong> Take the action specified by the matching rule</li>
                <li><strong>Implicit Deny:</strong> If no rules match, packet is DENIED</li>
            </ol>

            <div class="help-example">
                <div class="help-example-title">Example ACL Logic:</div>
                <p><strong>ACL 10:</strong></p>
                <ul style="font-family:monospace; font-size:12px;">
                    <li>Rule 1: PERMIT 192.168.1.5 0.0.0.0</li>
                    <li>Rule 2: DENY 192.168.1.0 0.0.0.255</li>
                    <li>Rule 3: PERMIT ANY</li>
                    <li>(implicit deny any)</li>
                </ul>
                <p><strong>Results:</strong></p>
                <ul>
                    <li>192.168.1.5 → <span style="color:#10b981;">PERMITTED</span> (matches rule 1)</li>
                    <li>192.168.1.100 → <span style="color:#ef4444;">DENIED</span> (matches rule 2)</li>
                    <li>10.0.0.5 → <span style="color:#10b981;">PERMITTED</span> (matches rule 3)</li>
                </ul>
            </div>
        `
    },

    acl_wildcards: {
        title: "Wildcard Masks",
        content: `
            <h3>🎭 What are Wildcard Masks?</h3>
            <p>Wildcard masks tell the ACL which parts of an IP address to check and which to ignore. They're the opposite of subnet masks!</p>

            <h3>🔢 How Wildcards Work</h3>
            <ul>
                <li><strong>0 = Must Match:</strong> This bit must match exactly</li>
                <li><strong>1 = Don't Care:</strong> This bit can be anything</li>
            </ul>

            <h3>💡 Common Wildcard Patterns</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Wildcard</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Meaning</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">0.0.0.0</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Exact host match</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.5 only</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">0.0.0.255</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Match /24 subnet (Class C)</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.0-255</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">0.0.255.255</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Match /16 subnet (Class B)</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.0.0-255.255</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; font-family:monospace; background:transparent !important; color:#e4e4e7 !important;">255.255.255.255</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Match ANY address</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">0.0.0.0-255.255.255.255</td>
                    </tr>
                </tbody>
            </table>

            <div class="help-example">
                <div class="help-example-title">Example: Block Entire Subnet</div>
                <p><strong>Goal:</strong> Block all traffic from 192.168.10.0/24 (guest network)</p>
                <p><strong>ACL Rule:</strong> <code>DENY 192.168.10.0 0.0.0.255</code></p>
                <p><strong>This blocks:</strong> 192.168.10.1, 192.168.10.50, 192.168.10.254, etc.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Example: Allow Specific Host</div>
                <p><strong>Goal:</strong> Only allow traffic from 10.0.0.5 (admin workstation)</p>
                <p><strong>ACL Rule:</strong> <code>PERMIT 10.0.0.5 0.0.0.0</code></p>
                <p><strong>This allows:</strong> Only 10.0.0.5 (exact match)</p>
            </div>

            <h3>🎯 Quick Reference</h3>
            <div class="help-tip">
                <strong>Remember:</strong> Wildcard 0.0.0.0 = host, 0.0.0.255 = /24 subnet, and you can use "ANY" as a shortcut for 0.0.0.0 255.255.255.255
            </div>
        `
    },

    acl_direction: {
        title: "Inbound vs Outbound ACLs",
        content: `
            <h3>🔄 ACL Direction</h3>
            <p>ACLs can be applied in two directions on a router interface:</p>

            <h3>📥 Inbound ACLs</h3>
            <p><strong>Check packets ARRIVING at the interface</strong></p>
            <ul>
                <li>Applied BEFORE routing decision</li>
                <li>More efficient (drops bad traffic early)</li>
                <li>Use source IP from incoming packets</li>
            </ul>

            <div class="help-example">
                <div class="help-example-title">Example: Guest Network Protection</div>
                <p><strong>Scenario:</strong> Interface 0 connects to guest network (192.168.50.0/24)</p>
                <p><strong>Goal:</strong> Prevent guests from accessing internal servers</p>
                <p><strong>Solution:</strong> Apply INBOUND ACL to Interface 0:</p>
                <ul>
                    <li>DENY 192.168.50.0 0.0.0.255</li>
                    <li>PERMIT ANY</li>
                </ul>
                <p><strong>Result:</strong> Packets from guests are dropped as they enter the router</p>
            </div>

            <h3>📤 Outbound ACLs</h3>
            <p><strong>Check packets LEAVING the interface</strong></p>
            <ul>
                <li>Applied AFTER routing decision</li>
                <li>Can filter traffic to specific destinations</li>
                <li>Use source IP from routed packets</li>
            </ul>

            <div class="help-example">
                <div class="help-example-title">Example: Server Protection</div>
                <p><strong>Scenario:</strong> Interface 2 connects to server network (10.0.0.0/24)</p>
                <p><strong>Goal:</strong> Only admin network can reach servers</p>
                <p><strong>Solution:</strong> Apply OUTBOUND ACL to Interface 2:</p>
                <ul>
                    <li>PERMIT 192.168.1.0 0.0.0.255 (admin network)</li>
                    <li>(implicit deny all others)</li>
                </ul>
                <p><strong>Result:</strong> Only admin traffic is sent to servers</p>
            </div>

            <h3>🎯 Which Direction to Use?</h3>
            <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                <thead>
                    <tr style="background:#2a2d3e !important;">
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use Inbound When</th>
                        <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use Outbound When</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Blocking traffic from a network</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Protecting a destination network</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">More efficient (drop early)</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Multiple sources, one destination</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Untrusted network connected</td>
                        <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Controlling access TO servers</td>
                    </tr>
                </tbody>
            </table>

            <div class="help-tip">
                <strong>Best Practice:</strong> Place ACLs as close to the source as possible. Inbound ACLs are usually more efficient!
            </div>
        `
    },

    acl_examples: {
        title: "ACL Configuration Examples",
        content: `
            <h3>📚 Real-World ACL Scenarios</h3>

            <h4>🏫 Example 1: School Network Segmentation</h4>
            <div class="help-example">
                <p><strong>Network Layout:</strong></p>
                <ul>
                    <li>Interface 0: Student Network (192.168.10.0/24)</li>
                    <li>Interface 1: Teacher Network (192.168.20.0/24)</li>
                    <li>Interface 2: Admin Network (192.168.1.0/24)</li>
                    <li>Interface 3: Server Network (10.0.0.0/24)</li>
                </ul>

                <p><strong>Security Requirements:</strong></p>
                <ul>
                    <li>Students can only access internet, not internal networks</li>
                    <li>Teachers can access servers</li>
                    <li>Admins can access everything</li>
                </ul>

                <p><strong>ACL Configuration:</strong></p>
                <div style="background:#16213e; padding:15px; border-radius:6px; font-family:monospace; font-size:12px; margin:10px 0;">
                    <strong style="color:#667eea;">ACL 10 - Block Students</strong><br>
                    DENY 192.168.10.0 0.0.0.255<br>
                    PERMIT ANY<br><br>

                    <strong style="color:#667eea;">Apply to Interface 3 (Servers) - OUTBOUND:</strong><br>
                    This prevents student traffic from reaching servers
                </div>

                <p><strong>Why this works:</strong> Students' packets are blocked when trying to leave toward servers, but can still route to internet.</p>
            </div>

            <h4>🏢 Example 2: Corporate Guest WiFi</h4>
            <div class="help-example">
                <p><strong>Network Layout:</strong></p>
                <ul>
                    <li>Interface 0: Guest WiFi (192.168.50.0/24)</li>
                    <li>Interface 1: Employee Network (192.168.100.0/24)</li>
                    <li>Interface 2: Internet Gateway</li>
                </ul>

                <p><strong>Goal:</strong> Guests can access internet only, no internal resources</p>

                <p><strong>ACL Configuration:</strong></p>
                <div style="background:#16213e; padding:15px; border-radius:6px; font-family:monospace; font-size:12px; margin:10px 0;">
                    <strong style="color:#667eea;">ACL 20 - Guest Restrictions</strong><br>
                    DENY 192.168.50.0 0.0.0.255<br>
                    PERMIT ANY<br><br>

                    <strong style="color:#667eea;">Apply to Interface 1 (Employees) - OUTBOUND:</strong><br>
                    This blocks guest traffic to employee network
                </div>
            </div>

            <h4>🔒 Example 3: Database Server Protection</h4>
            <div class="help-example">
                <p><strong>Scenario:</strong> Only application servers should access database server at 10.0.0.50</p>

                <p><strong>Network:</strong></p>
                <ul>
                    <li>Interface 0: App Servers (10.0.1.0/24)</li>
                    <li>Interface 1: Web Servers (10.0.2.0/24)</li>
                    <li>Interface 2: Database Network (10.0.0.0/24)</li>
                </ul>

                <p><strong>ACL Configuration:</strong></p>
                <div style="background:#16213e; padding:15px; border-radius:6px; font-family:monospace; font-size:12px; margin:10px 0;">
                    <strong style="color:#667eea;">ACL 30 - DB Access Control</strong><br>
                    PERMIT 10.0.1.0 0.0.0.255<br>
                    (implicit deny any)<br><br>

                    <strong style="color:#667eea;">Apply to Interface 2 (Database) - OUTBOUND:</strong><br>
                    Only app servers can send traffic to database network
                </div>
            </div>

            <h3>🎯 ACL Best Practices</h3>
            <ul>
                <li><strong>Most specific first:</strong> Put specific host rules before subnet rules</li>
                <li><strong>Named ACLs:</strong> Use descriptive names like "BLOCK_GUESTS" for clarity</li>
                <li><strong>Document:</strong> Explain why each ACL exists in your network diagram</li>
                <li><strong>Test:</strong> Use ping/traceroute to verify ACL behavior</li>
                <li><strong>Start permissive:</strong> Begin with PERMIT ANY, then add restrictions</li>
            </ul>

            <div class="help-tip">
                <strong>Pro Tip:</strong> Always test ACLs with the Statistics panel to see permit/deny counts and verify they're working as expected!
            </div>
        `
    },

    acl_troubleshooting: {
        title: "ACL Troubleshooting",
        content: `
            <h3>🔧 Common ACL Problems & Solutions</h3>

            <h4>❌ Problem: All Traffic Blocked</h4>
            <div class="help-example">
                <p><strong>Symptom:</strong> Nothing can communicate after applying ACL</p>
                <p><strong>Cause:</strong> Forgot the implicit deny - all rules are DENY or missing PERMIT ANY</p>
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Add <code>PERMIT ANY</code> as the last rule</li>
                    <li>Or add specific PERMIT rules before DENY rules</li>
                </ul>
                <div style="background:#2a1a1a; padding:10px; border-radius:4px; border-left:3px solid #ef4444; margin:10px 0;">
                    <strong style="color:#ef4444;">BAD:</strong><br>
                    <code>DENY 192.168.10.0 0.0.0.255</code><br>
                    <span style="color:#6b7280;">(implicit deny blocks everything else!)</span>
                </div>
                <div style="background:#1a2a1a; padding:10px; border-radius:4px; border-left:3px solid #10b981; margin:10px 0;">
                    <strong style="color:#10b981;">GOOD:</strong><br>
                    <code>DENY 192.168.10.0 0.0.0.255</code><br>
                    <code>PERMIT ANY</code>
                </div>
            </div>

            <h4>❌ Problem: ACL Not Blocking Anything</h4>
            <div class="help-example">
                <p><strong>Symptom:</strong> Traffic still passes even with DENY rules</p>
                <p><strong>Common Causes:</strong></p>
                <ol>
                    <li><strong>Wrong interface:</strong> ACL applied to wrong router interface</li>
                    <li><strong>Wrong direction:</strong> Inbound vs outbound confusion</li>
                    <li><strong>PERMIT before DENY:</strong> First match wins! Order matters!</li>
                    <li><strong>Wildcard error:</strong> Using subnet mask instead of wildcard</li>
                </ol>
                <p><strong>Solutions:</strong></p>
                <ul>
                    <li>Check ACL is applied to correct interface in "Interface ACL Assignments"</li>
                    <li>Verify direction (IN for arriving, OUT for leaving)</li>
                    <li>Check rule order - most specific rules first</li>
                    <li>Use Statistics panel to see if any packets are being denied</li>
                </ul>
            </div>

            <h4>❌ Problem: Wrong Hosts Blocked</h4>
            <div class="help-example">
                <p><strong>Symptom:</strong> ACL blocks hosts you wanted to allow</p>
                <p><strong>Cause:</strong> Wildcard mask error</p>
                <div style="background:#2a1a1a; padding:10px; border-radius:4px; border-left:3px solid #ef4444; margin:10px 0;">
                    <strong style="color:#ef4444;">WRONG:</strong> Block 192.168.1.5 only<br>
                    <code>DENY 192.168.1.5 0.0.0.255</code><br>
                    <span style="color:#6b7280;">(This blocks entire 192.168.1.0/24 subnet!)</span>
                </div>
                <div style="background:#1a2a1a; padding:10px; border-radius:4px; border-left:3px solid #10b981; margin:10px 0;">
                    <strong style="color:#10b981;">CORRECT:</strong> Block 192.168.1.5 only<br>
                    <code>DENY 192.168.1.5 0.0.0.0</code><br>
                    <span style="color:#6b7280;">(Wildcard 0.0.0.0 = exact host match)</span>
                </div>
            </div>

            <h3>🔍 Debugging Tools</h3>

            <h4>1. Statistics Panel</h4>
            <p>Check the ACL statistics to see:</p>
            <ul>
                <li><strong>Permitted packets:</strong> How many packets were allowed</li>
                <li><strong>Denied packets:</strong> How many packets were blocked</li>
            </ul>
            <p>If denied count is 0, your ACL isn't matching any traffic!</p>

            <h4>2. Console Logging</h4>
            <p>Open browser console (F12) to see ACL decisions:</p>
            <div style="background:#16213e; padding:10px; border-radius:4px; font-family:monospace; font-size:11px; margin:10px 0;">
                <span style="color:#ef4444;">[ACL] Denied inbound on interface 0: Matched ACL 10 rule 2</span><br>
                <span style="color:#10b981;">[ACL] Permitted outbound on interface 1: Matched ACL 20 rule 1</span>
            </div>

            <h4>3. Network Diagnostics</h4>
            <p>Use ping and traceroute to test connectivity:</p>
            <ul>
                <li><strong>Ping fails:</strong> Traffic is being blocked somewhere</li>
                <li><strong>Traceroute stops:</strong> Shows where packets are dropped</li>
            </ul>

            <h3>💡 Testing Strategy</h3>
            <ol>
                <li><strong>Start simple:</strong> Create network without ACLs first</li>
                <li><strong>Test connectivity:</strong> Verify everything works</li>
                <li><strong>Add one ACL:</strong> Apply one rule at a time</li>
                <li><strong>Test immediately:</strong> Ping after each change</li>
                <li><strong>Check statistics:</strong> Verify packets are being filtered</li>
                <li><strong>Refine rules:</strong> Adjust based on results</li>
            </ol>

            <div class="help-tip">
                <strong>Golden Rule:</strong> If you can't figure out why an ACL isn't working, remove it, verify basic connectivity, then re-add it step by step while testing!
            </div>
        `
    },

    // ============ Security Topics (continued) ============

    firewall_basics: {
        title: "Firewall Basics",
        icon: "🔥",
        content: `
            <div class="help-section">
                <h3>What is a Firewall?</h3>
                <p>A <strong>firewall</strong> is a network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules. Think of it like a security checkpoint at a border - it inspects everything passing through and only allows authorized traffic.</p>
                <p>Firewalls establish a barrier between trusted internal networks and untrusted external networks (like the Internet).</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                A firewall is like a bouncer at a nightclub:
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Checks ID</strong> → Inspects packet headers (source/destination IP, ports)</li>
                    <li><strong>Follows rules</strong> → "No one under 21" = firewall rules</li>
                    <li><strong>Allows or denies</strong> → Lets good traffic in, blocks bad traffic</li>
                    <li><strong>Keeps records</strong> → Logs who entered and when</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>How Firewalls Work</h3>
                <p><strong>Basic Process:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Packet arrives</strong> at firewall interface</li>
                    <li><strong>Firewall examines</strong> packet headers (IP addresses, ports, protocol)</li>
                    <li><strong>Checks rules</strong> top-to-bottom until match is found</li>
                    <li><strong>Takes action</strong> - ALLOW or DENY based on matching rule</li>
                    <li><strong>Logs activity</strong> (optional but recommended)</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>Types of Firewalls</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Works</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Pros/Cons</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Packet Filtering</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Inspects each packet individually<br>Checks IP, port, protocol<br>No context awareness</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Fast, low overhead<br>❌ Can't detect attacks spanning multiple packets</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Stateful Inspection</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Tracks connection state<br>Remembers previous packets<br>Knows if packet belongs to existing session</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Smarter security<br>✅ Auto-allows return traffic<br>❌ Higher memory usage</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Application Layer</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Deep packet inspection<br>Understands application protocols<br>Can block specific HTTP URLs, email attachments</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Most comprehensive<br>✅ Blocks application-level threats<br>❌ Slowest performance</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Next-Gen (NGFW)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">All of the above PLUS:<br>Intrusion prevention<br>Antivirus scanning<br>Application awareness</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Enterprise-grade protection<br>❌ Expensive<br>❌ Complex configuration</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Example: Web Server Protection</strong>
                <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                    <p style="margin:0; color:#e4e4e7;"><strong>Scenario:</strong> Protect a web server from the Internet</p>

                    <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>Firewall Rules:</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">1. ALLOW: Any → Web Server, Port 80 (HTTP)</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">2. ALLOW: Any → Web Server, Port 443 (HTTPS)</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">3. ALLOW: Web Server → Any, Port 53 (DNS)</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">4. DENY: Any → Web Server, Any Port (default deny)</p>

                    <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>What This Does:</strong></p>
                    <ul style="margin:10px 0 0 20px; color:#e4e4e7;">
                        <li>✅ Anyone can browse website (ports 80/443)</li>
                        <li>✅ Web server can resolve domain names (DNS)</li>
                        <li>❌ Blocks SSH (port 22) - no remote access from Internet</li>
                        <li>❌ Blocks database (port 3306) - no direct DB access</li>
                        <li>❌ Blocks all other services</li>
                    </ul>
                </div>
            </div>

            <div class="help-section">
                <h3>Firewall Deployment</h3>

                <p><strong>Common Placements:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Network Firewall:</strong> At network perimeter (between Internet and LAN)</li>
                    <li><strong>Host-based Firewall:</strong> On individual computers (Windows Firewall, iptables)</li>
                    <li><strong>DMZ Firewall:</strong> Isolates public servers from internal network</li>
                    <li><strong>Internal Firewall:</strong> Segments different departments/VLANs</li>
                </ul>

                <div class="help-example" style="margin-top:10px;">
                    <strong>Network Diagram:</strong>
                    <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px; font-family:monospace;">
                        <p style="margin:0; color:#e4e4e7;">Internet</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   ↓</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">🔥 <strong>Perimeter Firewall</strong> (blocks most traffic)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   ↓</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">📡 DMZ (Web servers, email servers)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   ↓</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">🔥 <strong>Internal Firewall</strong> (protects LAN from DMZ)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">   ↓</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">💼 Internal Network (employee computers, databases)</p>
                    </div>
                </div>
            </div>

            <div class="help-section">
                <h3>Default Policies</h3>

                <p><strong>Two main philosophies:</strong></p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Policy</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Description</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Default Deny ⭐</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Block everything UNLESS explicitly allowed<br>"Whitelist approach"</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ <strong>RECOMMENDED</strong><br>Corporate networks<br>Servers exposed to Internet</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Default Allow</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Allow everything UNLESS explicitly blocked<br>"Blacklist approach"</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Less secure<br>Home networks (convenience)<br>Testing environments</td>
                        </tr>
                    </tbody>
                </table>

                <div class="help-tip">
                    <strong>Best Practice:</strong> Always use <strong>Default Deny</strong> for security-critical environments. It's harder to configure initially but much more secure.
                </div>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Routers can act as firewalls with firewall rules</li>
                    <li>Configure firewall rules in the router's security settings</li>
                    <li>Rules are checked in order from top to bottom</li>
                    <li>First matching rule wins - order matters!</li>
                    <li>Test connectivity before and after adding rules</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Common Firewall Rules</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Allow web browsing</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ALLOW LAN → Any, Ports 80,443</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Allow DNS lookups</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ALLOW LAN → Any, Port 53 (UDP)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Block ping from Internet</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DENY Internet → Firewall, ICMP</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Block outbound Telnet (insecure)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DENY LAN → Any, Port 23</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Allow SSH from admin network only</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ALLOW 10.0.0.0/24 → Server, Port 22</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Firewalls work at Layer 3-4</strong> (IP addresses and ports)</li>
                    <li><strong>Order matters</strong> - first match wins</li>
                    <li><strong>Default deny</strong> is more secure than default allow</li>
                    <li><strong>Stateful firewalls</strong> are smarter than packet filters</li>
                    <li><strong>Log everything</strong> to detect attack patterns</li>
                </ul>
            </div>
        `
    },

    stateful_vs_stateless: {
        title: "Stateful vs Stateless Firewalls",
        icon: "🔄",
        content: `
            <div class="help-section">
                <h3>What's the Difference?</h3>
                <p>The key difference between stateful and stateless firewalls is whether they <strong>remember</strong> previous packets and track connection state.</p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Stateless (Packet Filtering):</strong> Examines each packet independently with no memory of previous packets</li>
                    <li><strong>Stateful (Stateful Inspection):</strong> Tracks connections and remembers which packets belong to which sessions</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Stateless</strong> = Bouncer who checks ID but doesn't remember who already went in. Every person re-checked every time.</li>
                    <li><strong>Stateful</strong> = Bouncer who remembers faces. "Oh, you're already inside, go ahead." Much smarter!</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Detailed Comparison</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Aspect</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Stateless Firewall</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Stateful Firewall</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>How it works</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Checks each packet against rules<br>No context awareness</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Tracks connection state<br>Knows packet history</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Performance</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⚡ Very fast<br>Low CPU/memory usage</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">🐌 Slightly slower<br>Higher memory (stores state)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Security</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Basic protection<br>Vulnerable to spoofing</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Strong protection<br>Detects invalid packets</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Rule complexity</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Need rules for BOTH directions<br>More rules to manage</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ One rule for outbound<br>Return traffic auto-allowed</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Typical use</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Routers (ACLs)<br>Simple filtering</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Enterprise firewalls<br>Modern security</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Cost</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">💰 Cheaper<br>Built into routers</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">💰💰💰 More expensive<br>Dedicated hardware</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Example: Web Browsing Session</strong>
                <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                    <p style="margin:0; color:#e4e4e7;"><strong>Scenario:</strong> User browses website from internal network</p>

                    <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>STATELESS Firewall (needs TWO rules):</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">Rule 1: ALLOW LAN → Internet, Dest Port 80 (outbound request)</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">Rule 2: ALLOW Internet → LAN, Src Port 80 (inbound response)</p>
                    <p style="margin:10px 0 5px 0; color:#ff6b6b;"><strong>Problem:</strong> Rule 2 allows ANY traffic from port 80, even unsolicited attacks!</p>

                    <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>STATEFUL Firewall (needs ONE rule):</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">Rule 1: ALLOW LAN → Internet, Dest Port 80</p>
                    <p style="margin:10px 0 5px 0; color:#51cf66;"><strong>Benefit:</strong> Return traffic automatically allowed because firewall tracks the connection!</p>
                </div>
            </div>

            <div class="help-section">
                <h3>How Stateful Tracking Works</h3>

                <p><strong>Connection State Table:</strong></p>
                <div class="help-example">
                    <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px; font-family:monospace; font-size:11px;">
                        <p style="margin:0; color:#9ca3af;">State Table (firewall memory):</p>
                        <table style="width:100%; border-collapse:collapse; margin:10px 0; background:transparent !important; color:#e4e4e7 !important; font-family:monospace; font-size:11px;">
                            <thead>
                                <tr style="background:#2a2d3e !important;">
                                    <th style="padding:4px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Src IP</th>
                                    <th style="padding:4px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Dst IP</th>
                                    <th style="padding:4px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Src Port</th>
                                    <th style="padding:4px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Dst Port</th>
                                    <th style="padding:4px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">State</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding:4px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.100</td>
                                    <td style="padding:4px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8.8.8.8</td>
                                    <td style="padding:4px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">54321</td>
                                    <td style="padding:4px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">80</td>
                                    <td style="padding:4px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ESTABLISHED</td>
                                </tr>
                                <tr>
                                    <td style="padding:4px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.50</td>
                                    <td style="padding:4px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1.1.1.1</td>
                                    <td style="padding:4px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">12345</td>
                                    <td style="padding:4px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">443</td>
                                    <td style="padding:4px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ESTABLISHED</td>
                                </tr>
                            </tbody>
                        </table>

                        <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>When return packet arrives:</strong></p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">✓ Firewall checks: "Does this match an ESTABLISHED connection?"</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">✓ If YES → Allow (no rule needed)</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">✓ If NO → Check rules as normal</p>
                    </div>
                </div>

                <p style="margin-top:15px;"><strong>Connection States:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>NEW:</strong> First packet of new connection</li>
                    <li><strong>ESTABLISHED:</strong> Part of existing connection (bidirectional traffic seen)</li>
                    <li><strong>RELATED:</strong> New connection related to existing one (e.g., FTP data channel)</li>
                    <li><strong>INVALID:</strong> Packet doesn't match any known connection (likely attack)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Security Advantages of Stateful Firewalls</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Attack</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Stateless Response</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Stateful Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Unsolicited SYN-ACK</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Might allow (if rule exists)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Blocked (no matching SYN sent)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Out-of-sequence packets</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Can't detect</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Detects and blocks</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>IP spoofing</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Easily fooled</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Harder to spoof (needs sequence numbers)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Port scanning</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Hard to detect</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Can detect scan patterns</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Router ACLs are <strong>stateless</strong> (packet filtering)</li>
                    <li>Firewall devices use <strong>stateful</strong> inspection</li>
                    <li>Stateful = fewer rules needed, better security</li>
                    <li>Stateless = faster performance, simpler</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Stateless</strong> = Each packet judged independently</li>
                    <li><strong>Stateful</strong> = Remembers connection context</li>
                    <li><strong>Modern firewalls</strong> are almost always stateful</li>
                    <li><strong>ACLs on routers</strong> are usually stateless</li>
                    <li><strong>Stateful is more secure</strong> but uses more resources</li>
                </ul>
            </div>
        `
    },

    firewall_rule_order: {
        title: "Firewall Rule Order",
        icon: "📋",
        content: `
            <div class="help-section">
                <h3>Why Does Rule Order Matter?</h3>
                <p>Firewall rules are processed <strong>top to bottom</strong>, and the <strong>first matching rule wins</strong>. Once a packet matches a rule, the firewall takes that action (ALLOW or DENY) and <strong>stops checking</strong> - it never looks at rules below.</p>
                <p>This means the <strong>order of your rules is critical</strong>. A poorly ordered ruleset can accidentally block legitimate traffic or allow malicious traffic.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Think of firewall rules like a bouncer with a checklist:
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Checks from top to bottom</strong> → Reads list line by line</li>
                    <li><strong>First match = action taken</strong> → "Oh, you're on the VIP list? Come in!" (stops checking)</li>
                    <li><strong>Never reaches lower rules</strong> → If allowed in at line 2, doesn't check lines 3-10</li>
                </ul>
            </div>

            <div class="help-example">
                <strong>Example: Bad Rule Order (doesn't work!)</strong>
                <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                    <p style="margin:0; color:#ff6b6b; font-family:monospace;"><strong>❌ WRONG ORDER:</strong></p>
                    <p style="margin:10px 0 0 0; color:#e4e4e7; font-family:monospace;">1. DENY: Any → Any (default deny all)</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">2. ALLOW: 192.168.1.0/24 → Any, Port 80</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">3. ALLOW: 192.168.1.0/24 → Any, Port 443</p>

                    <p style="margin:15px 0 5px 0; color:#ff6b6b;"><strong>Problem:</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">Rule 1 blocks EVERYTHING. Rules 2 and 3 are NEVER reached!</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">Users can't browse the web even though rules 2 and 3 should allow it.</p>
                </div>

                <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:15px;">
                    <p style="margin:0; color:#51cf66; font-family:monospace;"><strong>✅ CORRECT ORDER:</strong></p>
                    <p style="margin:10px 0 0 0; color:#e4e4e7; font-family:monospace;">1. ALLOW: 192.168.1.0/24 → Any, Port 80</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">2. ALLOW: 192.168.1.0/24 → Any, Port 443</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">3. DENY: Any → Any (default deny all)</p>

                    <p style="margin:15px 0 5px 0; color:#51cf66;"><strong>Result:</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">✓ HTTP traffic matches rule 1 → ALLOWED</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">✓ HTTPS traffic matches rule 2 → ALLOWED</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">✓ Everything else matches rule 3 → DENIED</p>
                </div>
            </div>

            <div class="help-section">
                <h3>Best Practices for Rule Order</h3>

                <p><strong>Follow this hierarchy (most specific to least specific):</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Explicit DENY rules first</strong> - Block known bad traffic immediately</li>
                    <li><strong>Specific ALLOW rules</strong> - Allow specific IP/port combinations</li>
                    <li><strong>Broader ALLOW rules</strong> - Allow general categories</li>
                    <li><strong>Default DENY rule last</strong> - Catch-all to block everything else</li>
                </ol>

                <div class="help-example" style="margin-top:15px;">
                    <strong>Recommended Order Template:</strong>
                    <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px; font-family:monospace;">
                        <p style="margin:0; color:#ff6b6b;">1. DENY: 10.0.0.5 → Any (block malicious host)</p>
                        <p style="margin:5px 0 0 0; color:#ff6b6b;">2. DENY: Any → Internal DB, Port 3306 (block external DB access)</p>
                        <p style="margin:10px 0 5px 0; color:#51cf66;">3. ALLOW: Admin Network → Server, Port 22 (SSH for admins only)</p>
                        <p style="margin:5px 0 0 0; color:#51cf66;">4. ALLOW: LAN → Any, Ports 80,443 (web browsing)</p>
                        <p style="margin:5px 0 0 0; color:#51cf66;">5. ALLOW: LAN → Any, Port 53 (DNS)</p>
                        <p style="margin:10px 0 5px 0; color:#9ca3af;">6. DENY: Any → Any (default deny)</p>
                    </div>
                </div>
            </div>

            <div class="help-section">
                <h3>Common Rule Order Mistakes</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Mistake</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Why It's Wrong</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Fix</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Default deny too early</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Blocks everything, allow rules below never match</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Move default deny to LAST position</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Broad rule before specific</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Broad rule matches first, specific rule never reached</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Move specific rules ABOVE broad rules</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Allow all before denies</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"Allow Any → Any" matches everything, deny rules useless</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Put explicit denies FIRST</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Duplicate rules</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Second rule never matched (first already caught it)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Remove duplicate, keep most specific</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Example: Specific Before Broad</strong>
                <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                    <p style="margin:0; color:#ff6b6b; font-family:monospace;"><strong>❌ WRONG (Broad before specific):</strong></p>
                    <p style="margin:10px 0 0 0; color:#e4e4e7; font-family:monospace;">1. ALLOW: Any → Web Server, Port 80</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">2. DENY: 1.2.3.4 → Web Server, Port 80 (block attacker)</p>

                    <p style="margin:15px 0 5px 0; color:#ff6b6b;"><strong>Problem:</strong> Rule 1 allows attacker (1.2.3.4) - Rule 2 never reached!</p>

                    <p style="margin:15px 0 0 0; color:#51cf66; font-family:monospace;"><strong>✅ CORRECT (Specific before broad):</strong></p>
                    <p style="margin:10px 0 0 0; color:#e4e4e7; font-family:monospace;">1. DENY: 1.2.3.4 → Web Server, Port 80 (block attacker)</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">2. ALLOW: Any → Web Server, Port 80</p>

                    <p style="margin:15px 0 5px 0; color:#51cf66;"><strong>Result:</strong> Attacker blocked, everyone else allowed!</p>
                </div>
            </div>

            <div class="help-section">
                <h3>Testing Rule Order</h3>

                <p><strong>Step-by-step testing process:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Start with basic connectivity</strong> - Ensure network works WITHOUT firewall</li>
                    <li><strong>Add default deny</strong> - Verify everything is blocked</li>
                    <li><strong>Add rules one at a time</strong> - Test after each addition</li>
                    <li><strong>Check logs</strong> - See which rule matched each packet</li>
                    <li><strong>Reorder if needed</strong> - Move more specific rules higher</li>
                </ol>

                <div class="help-tip" style="margin-top:15px;">
                    <strong>Debugging Tip:</strong> If traffic isn't working as expected, add logging to ALL rules. Check which rule is matching - often it's not the one you think!
                </div>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Rules are processed top to bottom</li>
                    <li>Use "Move Up" / "Move Down" buttons to reorder rules</li>
                    <li>Most specific rules should be at the top</li>
                    <li>Default deny should always be last</li>
                    <li>Test connectivity after adding each rule</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>First match wins</strong> - Order is critical!</li>
                    <li><strong>Specific before broad</strong> - Narrow rules on top</li>
                    <li><strong>Explicit denies first</strong> - Block bad traffic immediately</li>
                    <li><strong>Default deny last</strong> - Catch-all at the end</li>
                    <li><strong>Test thoroughly</strong> - Wrong order = security holes</li>
                </ul>
            </div>
        `
    },

    port_forwarding: {
        title: "Port Forwarding & NAT",
        icon: "🔀",
        content: `
            <div class="help-section">
                <h3>What is Port Forwarding?</h3>
                <p><strong>Port forwarding</strong> (also called Port Address Translation or PAT) allows external devices on the Internet to access services on your internal network by redirecting specific ports on your public IP to private IPs inside your network.</p>
                <p>Think of it like a receptionist at a company - calls come to one phone number (public IP), and the receptionist forwards specific calls to the right department (private IP + port).</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Your home has one street address (public IP), but inside are multiple rooms (private IPs):
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Mail to "Apt 80"</strong> → Forwarded to living room (Web Server:80)</li>
                    <li><strong>Mail to "Apt 22"</strong> → Forwarded to office (SSH Server:22)</li>
                    <li><strong>Mail to "Apt 3389"</strong> → Forwarded to bedroom (RDP Server:3389)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>How Port Forwarding Works</h3>

                <div class="help-example">
                    <strong>Example: Hosting a Web Server at Home</strong>
                    <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                        <p style="margin:0; color:#e4e4e7;"><strong>Setup:</strong></p>
                        <ul style="margin:10px 0 0 20px; color:#e4e4e7;">
                            <li><strong>Public IP:</strong> 203.0.113.10 (your home router)</li>
                            <li><strong>Web Server Internal IP:</strong> 192.168.1.100</li>
                            <li><strong>Web Server Port:</strong> 80 (HTTP)</li>
                        </ul>

                        <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>Port Forwarding Rule:</strong></p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7; font-family:monospace;">External Port 80 → 192.168.1.100:80</p>

                        <p style="margin:15px 0 5px 0; color:#e4e4e7;"><strong>What Happens:</strong></p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">1. User browses to http://203.0.113.10</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">2. Request arrives at router on port 80</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">3. Router forwards to 192.168.1.100:80</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">4. Web server responds</p>
                        <p style="margin:5px 0 0 0; color:#e4e4e7;">5. Router sends response back to user</p>
                    </div>
                </div>
            </div>

            <div class="help-section">
                <h3>Common Port Forwarding Scenarios</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Service</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Port</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Web Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">80, 443</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Host website from home</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Game Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">25565 (Minecraft)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Friends can join your server</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Remote Desktop</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">3389 (RDP)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Access PC remotely</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>SSH Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">22</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Remote Linux administration</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>FTP Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">21</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">File transfer from Internet</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Security Camera</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8080, 554 (RTSP)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">View cameras remotely</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Port Forwarding vs DMZ</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Aspect</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Port Forwarding</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">DMZ Host</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Exposure</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Only specific ports exposed</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ALL ports exposed to Internet</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Security</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ More secure (limited exposure)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Less secure (fully exposed)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Configuration</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Need to specify each port/service</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Just specify one IP address</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Best for</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Most scenarios (web, game servers)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Testing, devices needing many ports</td>
                        </tr>
                    </tbody>
                </table>

                <div class="help-tip">
                    <strong>Recommendation:</strong> Use <strong>Port Forwarding</strong> instead of DMZ whenever possible. Only expose the specific ports you need.
                </div>
            </div>

            <div class="help-section">
                <h3>Security Risks of Port Forwarding</h3>

                <p><strong>Every forwarded port is a potential entry point for attackers:</strong></p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Risk</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Mitigation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Brute force attacks</strong><br>Attackers try passwords on SSH/RDP</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">• Change default ports (SSH 22 → 2222)<br>• Use strong passwords<br>• Enable key-based authentication<br>• Use fail2ban/IP blocking</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Exploits in services</strong><br>Vulnerabilities in web/game servers</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">• Keep software updated<br>• Run services in sandboxes<br>• Use application firewalls (WAF)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DDoS attacks</strong><br>Overwhelm your connection</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">• Use DDoS protection services<br>• Rate limiting<br>• Cloudflare or similar</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Lateral movement</strong><br>Attacker compromises server, then attacks internal network</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">• Segment network (VLANs)<br>• Place in DMZ<br>• Restrict server's outbound access</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Secure Port Forwarding Example:</strong>
                <div style="background:#16213e; padding:15px; border-radius:4px; margin-top:10px;">
                    <p style="margin:0; color:#e4e4e7;"><strong>Scenario:</strong> Expose SSH securely</p>

                    <p style="margin:15px 0 5px 0; color:#ff6b6b;"><strong>❌ INSECURE:</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">• Forward port 22 to 192.168.1.100:22</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">• Use password authentication</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">• Allow from any IP</p>

                    <p style="margin:15px 0 5px 0; color:#51cf66;"><strong>✅ SECURE:</strong></p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">• Forward port 2222 → 192.168.1.100:22 (non-standard port)</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">• Use SSH keys only (disable passwords)</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">• Whitelist your office IP only</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">• Install fail2ban (blocks after failed attempts)</p>
                    <p style="margin:5px 0 0 0; color:#e4e4e7;">• Enable logging and monitoring</p>
                </div>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Configure port forwarding in router/firewall settings</li>
                    <li>Specify external port and internal IP:port</li>
                    <li>Test from external network to verify it works</li>
                    <li>Check NAT translation table to see active forwards</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Only forward what you need</strong> - Every port = more risk</li>
                    <li><strong>Change default ports</strong> - Reduces automated attacks</li>
                    <li><strong>Use authentication</strong> - Strong passwords or keys</li>
                    <li><strong>Monitor logs</strong> - Watch for attack attempts</li>
                    <li><strong>Consider VPN instead</strong> - Often more secure than port forwarding</li>
                </ul>
            </div>
        `
    },

    // === DMZ ZONES ===
    dmz_zones: {
        title: "DMZ Zones",
        icon: "🏰",
        content: `
            <div class="help-section">
                <h3>What is a DMZ?</h3>
                <p><strong>DMZ (Demilitarized Zone)</strong> is a separate network zone that sits between your trusted internal network and the untrusted internet. It's designed to host public-facing services (like web servers, mail servers, DNS) while keeping your internal network protected.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Think of a DMZ like the lobby of a secure building. Visitors (internet users) can enter the lobby and access reception services, but they can't get into the private offices without additional security clearance. If someone causes trouble in the lobby, the offices remain safe.
            </div>

            <div class="help-section">
                <h3>Why Use a DMZ?</h3>
                <p><strong>Security Principle:</strong> Defense in depth - multiple layers of protection.</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Without DMZ (Risky)</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">With DMZ (Secure)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Web server on internal network</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Web server in DMZ</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">If web server is hacked, attacker has access to internal network</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">If web server is hacked, attacker is still isolated from internal network</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Customer data, employee files, databases all exposed</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Sensitive data remains protected behind second firewall</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Single point of failure</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Multiple security layers</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>DMZ Architecture</h3>
                <p><strong>Typical Setup:</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
Internet
   ↓
[Perimeter Firewall] ← First line of defense
   ↓
DMZ Network (e.g., 192.168.100.0/24)
   ├── Web Server (192.168.100.10)
   ├── Mail Server (192.168.100.20)
   └── DNS Server (192.168.100.30)
   ↓
[Internal Firewall] ← Second line of defense
   ↓
Internal Network (e.g., 192.168.1.0/24)
   ├── Employee Workstations
   ├── Database Servers
   └── File Servers
                </pre>
            </div>

            <div class="help-section">
                <h3>DMZ Firewall Rules</h3>
                <p>Each firewall has different rules based on what traffic it protects:</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Firewall</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Inbound Rules</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Outbound Rules</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Perimeter</strong><br/>(Internet → DMZ)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                                ✅ Allow HTTP/HTTPS to web server<br/>
                                ✅ Allow SMTP to mail server<br/>
                                ✅ Allow DNS to DNS server<br/>
                                ❌ Deny everything else
                            </td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                                ✅ Allow established connections<br/>
                                ⚠️ Limited outbound (update servers only)<br/>
                                ❌ Block direct internet access
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Internal</strong><br/>(DMZ → Internal)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                                ❌ Deny all from DMZ to Internal<br/>
                                (DMZ servers can't initiate connections to internal network)
                            </td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                                ✅ Allow Internal → DMZ (for management)<br/>
                                ✅ Allow database queries (specific ports only)<br/>
                                ✅ Allow Internal → Internet
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Example: E-commerce Website</strong>
                <p><strong>Scenario:</strong> Online store with customer data</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Zone</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">What Goes Here</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Why</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DMZ</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                                • Web server (frontend)<br/>
                                • Application server (shopping cart)<br/>
                                • Reverse proxy/load balancer
                            </td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                                Public-facing services that customers access directly
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Internal</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                                • Customer database (credit cards, addresses)<br/>
                                • Inventory database<br/>
                                • Employee workstations<br/>
                                • File servers with business documents
                            </td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">
                                Sensitive data that should never be directly accessible from internet
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p style="margin-top:10px;"><strong>What happens if web server is compromised?</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>✅ Attacker can only access the DMZ</li>
                    <li>✅ Customer database remains protected (behind second firewall)</li>
                    <li>✅ Internal network continues operating normally</li>
                    <li>✅ IT team can isolate/rebuild DMZ without exposing internal data</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Types of DMZ Configurations</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Description</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Security Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Single Firewall DMZ</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">One firewall with 3 interfaces (Internet, DMZ, Internal)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐ Good (budget-friendly)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Dual Firewall DMZ</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Two separate firewalls (Perimeter + Internal)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐⭐ Excellent (most secure)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Multiple DMZs</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Separate DMZs for different risk levels (Web DMZ, Partner DMZ, etc.)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐⭐ Excellent (enterprise)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Create a DMZ by adding a subnet between your router and internal network</li>
                    <li>Place public servers (HTTP, DNS, email) in the DMZ</li>
                    <li>Configure firewall rules to allow specific traffic from internet to DMZ</li>
                    <li>Block all traffic from DMZ to internal network (except specific database queries)</li>
                    <li>Test that internal network remains isolated even if DMZ is compromised</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>DMZ = Sacrifice Zone</strong> - Assume it will be attacked/compromised</li>
                    <li><strong>Never store sensitive data in DMZ</strong> - Only what's needed for public services</li>
                    <li><strong>DMZ can't initiate connections inward</strong> - Internal always reaches out to DMZ</li>
                    <li><strong>Monitor DMZ heavily</strong> - It's your early warning system</li>
                    <li><strong>Harden DMZ servers</strong> - Minimal software, patched regularly, monitored constantly</li>
                </ul>
            </div>
        `
    },

    // === RADIUS AUTHENTICATION ===
    radius_authentication: {
        title: "RADIUS Authentication",
        icon: "🔐",
        content: `
            <div class="help-section">
                <h3>What is RADIUS?</h3>
                <p><strong>RADIUS (Remote Authentication Dial-In User Service)</strong> is a centralized authentication system that allows network devices to verify user credentials against a single database. Instead of each device maintaining its own user list, they all ask the RADIUS server "Is this username/password valid?"</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Think of RADIUS like a nightclub bouncer who checks IDs against a master guest list. Instead of every door having its own guest list (messy and inconsistent), all doors radio the central bouncer to ask "Is this person allowed in?" The bouncer (RADIUS server) has the master list and gives a thumbs up or down.
            </div>

            <div class="help-section">
                <h3>Why Use RADIUS?</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Without RADIUS</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">With RADIUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Each switch, router, WiFi AP has its own user database</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">One central RADIUS server for all devices</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">New employee = add to 50 different devices</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">New employee = add to RADIUS once</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Employee leaves = must remember to delete from all devices</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Employee leaves = delete from RADIUS, instantly blocked everywhere</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Password change = update on every device</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Password change = update RADIUS once</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">No centralized logging or auditing</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">All authentication attempts logged in one place</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Time-consuming, error-prone</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Efficient, consistent, secure</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>How RADIUS Works</h3>
                <p><strong>The Authentication Flow:</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
1. User connects to network device (switch/WiFi/VPN)
   User → "I'm alice, password: secret123"

2. Device (RADIUS Client) forwards credentials to RADIUS server
   Switch → RADIUS: "Access-Request: alice / secret123"

3. RADIUS server checks credentials against database
   RADIUS: *Looks up alice in database*
   RADIUS: *Compares password hash*

4. RADIUS responds with decision
   If valid:   RADIUS → Switch: "Access-Accept"
   If invalid: RADIUS → Switch: "Access-Reject"

5. Device grants/denies access based on response
   If Accept:  Switch → User: "You're connected! VLAN 10"
   If Reject:  Switch → User: "Access denied"
                </pre>
            </div>

            <div class="help-section">
                <h3>RADIUS Components</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Component</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Role</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>RADIUS Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Central authentication authority<br/>Stores user database<br/>Makes accept/reject decisions</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">FreeRADIUS, Microsoft NPS, Cisco ISE</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>RADIUS Client</strong><br/>(Network Access Server)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Network device that asks RADIUS server to authenticate users<br/>Enforces access control</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">WiFi Access Points, Switches, Routers, VPN Gateways, Firewalls</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Supplicant</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">End-user device requesting access<br/>Provides credentials</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Laptop, phone, tablet, IoT device</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Example: Corporate WiFi with RADIUS</strong>
                <p><strong>Scenario:</strong> 500-employee company with guest and employee WiFi</p>

                <p><strong>Setup:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>RADIUS Server:</strong> Windows Server with NPS, connected to Active Directory</li>
                    <li><strong>WiFi Access Points (RADIUS Clients):</strong> 20 APs throughout building</li>
                    <li><strong>SSIDs:</strong> "CompanySecure" (employees) and "CompanyGuest" (visitors)</li>
                </ul>

                <p style="margin-top:10px;"><strong>Employee Connection (Alice):</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li>Alice selects "CompanySecure" WiFi on her laptop</li>
                    <li>Laptop prompts for username/password (802.1X authentication)</li>
                    <li>Alice enters: alice@company.com / MyPassword123</li>
                    <li>WiFi AP receives credentials, forwards to RADIUS server</li>
                    <li>RADIUS checks Active Directory: ✅ Valid employee account</li>
                    <li>RADIUS replies: "Access-Accept, VLAN 10 (Employee VLAN)"</li>
                    <li>WiFi AP connects Alice to Employee VLAN with full network access</li>
                </ol>

                <p style="margin-top:10px;"><strong>Guest Connection (Bob):</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li>Bob selects "CompanyGuest" WiFi</li>
                    <li>Bob enters guest code: GUEST2025</li>
                    <li>WiFi AP forwards to RADIUS</li>
                    <li>RADIUS checks guest database: ✅ Valid temporary code</li>
                    <li>RADIUS replies: "Access-Accept, VLAN 99 (Guest VLAN)"</li>
                    <li>WiFi AP connects Bob to Guest VLAN (internet only, no internal access)</li>
                </ol>

                <p style="margin-top:10px;"><strong>Benefits:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>✅ Alice uses same domain credentials for WiFi, PC login, email</li>
                    <li>✅ When Alice's password changes in AD, WiFi automatically uses new password</li>
                    <li>✅ If Alice leaves company, deleting AD account instantly blocks all network access</li>
                    <li>✅ All 20 WiFi APs automatically enforce same user database</li>
                    <li>✅ IT can see logs: "Alice connected to WiFi at 9:02 AM from Building A"</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>RADIUS Message Types</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Message</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Direction</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Access-Request</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Client → Server</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"Please authenticate this user"</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Access-Accept</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server → Client</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"Credentials valid, grant access" (may include VLAN, bandwidth limits)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Access-Reject</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server → Client</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"Credentials invalid, deny access"</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Access-Challenge</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server → Client</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"Need more info" (e.g., prompt for token code in MFA)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Accounting-Request</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Client → Server</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"User connected/disconnected" or usage data</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>RADIUS Security Features</h3>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Shared Secret:</strong> Password between RADIUS client and server (encrypts communications)</li>
                    <li><strong>Challenge-Response:</strong> Passwords never sent in plaintext</li>
                    <li><strong>Centralized Auditing:</strong> All authentication attempts logged</li>
                    <li><strong>Granular Policies:</strong> Different access levels per user/group (VLANs, bandwidth, time restrictions)</li>
                    <li><strong>Integration:</strong> Can use Active Directory, LDAP, SQL databases for user storage</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Configure RADIUS server with user database and shared secret</li>
                    <li>Configure network devices as RADIUS clients (pointing to RADIUS server IP, using same shared secret)</li>
                    <li>Test authentication: device should query RADIUS before granting access</li>
                    <li>View RADIUS logs to see authentication attempts</li>
                    <li>Try invalid credentials to see Access-Reject response</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>RADIUS = Centralization</strong> - One database, many devices</li>
                    <li><strong>Shared secret must match</strong> - Client and server must have same password</li>
                    <li><strong>UDP ports 1812 (auth) and 1813 (accounting)</strong> - Firewall must allow these</li>
                    <li><strong>Redundancy is critical</strong> - If RADIUS is down, nobody can authenticate</li>
                    <li><strong>RADIUS can do more than WiFi</strong> - VPNs, switches, admin access to routers/firewalls</li>
                </ul>
            </div>
        `
    },

    // === 802.1X PORT SECURITY ===
    eight_oh_two_one_x: {
        title: "802.1X Port Security",
        icon: "🔒",
        content: `
            <div class="help-section">
                <h3>What is 802.1X?</h3>
                <p><strong>802.1X</strong> is a network security standard that prevents unauthorized devices from accessing your network by requiring authentication before allowing any network traffic. It's commonly used for both wired Ethernet ports and wireless (WiFi) networks.</p>
                <p><strong>Key Principle:</strong> "No authentication = No network access" - Even if you plug in a cable or connect to WiFi, you get nothing until you prove who you are.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Think of 802.1X like a secure office building with badge readers at every door. You can walk up to any door (plug into any network port), but until you scan your badge and it's verified (authentication), the door stays locked. No badge scan = no entry, even though the door is right there.
            </div>

            <div class="help-section">
                <h3>Why Use 802.1X?</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Without 802.1X</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">With 802.1X</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Plug in Ethernet cable → instant network access</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Plug in cable → must authenticate first → then access granted</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Visitor can plug into any conference room port</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Visitor blocked unless they have valid credentials</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Stolen laptop can access network if plugged in</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Stolen laptop blocked (user account disabled)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Rogue devices (raspberry pi, packet sniffers) can eavesdrop</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Rogue devices blocked at port level</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">WiFi password shared with everyone (easily leaked)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Each user has individual credentials (revoke per person)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Anyone with physical access = network access</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Physical access ≠ network access</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>How 802.1X Works</h3>
                <p><strong>Three Components (same as RADIUS architecture):</strong></p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Component</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">802.1X Term</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Supplicant</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Client device (laptop, phone)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Requests access, provides credentials</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Authenticator</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Network switch or WiFi AP</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Blocks port until authentication succeeds, forwards credentials to auth server</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Authentication Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">RADIUS server</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Verifies credentials, tells authenticator to allow/deny</td>
                        </tr>
                    </tbody>
                </table>

                <p style="margin-top:15px;"><strong>The Authentication Process:</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
1. Device connects to network port or WiFi
   Laptop → Switch port 24: "I want network access"

2. Switch blocks all traffic EXCEPT authentication packets
   Switch: "Port 24 is UNAUTHORIZED - only EAP allowed"

3. Switch sends EAP-Request Identity
   Switch → Laptop: "Who are you?"

4. Laptop responds with username
   Laptop → Switch: "I'm alice@company.com"

5. Switch forwards credentials to RADIUS server
   Switch → RADIUS: "Port 24 user says alice@company.com, here's her password"

6. RADIUS checks credentials
   RADIUS: *Looks up alice in Active Directory*
   RADIUS: *Verifies password*

7. RADIUS responds with success/failure
   RADIUS → Switch: "EAP-Success (or EAP-Failure)"

8. Switch unlocks/keeps locked the port
   If success: Switch: "Port 24 now AUTHORIZED - full network access"
   If failure: Switch: "Port 24 remains UNAUTHORIZED"
                </pre>
            </div>

            <div class="help-example">
                <strong>Example: University Campus Network</strong>
                <p><strong>Scenario:</strong> 10,000 students, 50 buildings, hundreds of switches</p>

                <p><strong>Setup:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Every switch port</strong> configured for 802.1X authentication</li>
                    <li><strong>Every WiFi access point</strong> requires 802.1X for "UniversitySecure" SSID</li>
                    <li><strong>RADIUS servers</strong> (redundant) connected to university Active Directory</li>
                    <li><strong>Student devices</strong> configured with 802.1X supplicant</li>
                </ul>

                <p style="margin-top:10px;"><strong>Student Alice's Experience:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li>Alice plugs laptop into Ethernet port in library</li>
                    <li>Windows detects 802.1X requirement, prompts for credentials</li>
                    <li>Alice enters: alice@university.edu / her password</li>
                    <li>Switch forwards credentials to RADIUS</li>
                    <li>RADIUS checks Active Directory: ✅ Valid student account, tuition paid</li>
                    <li>RADIUS tells switch: "Access-Accept, put her on Student VLAN 100"</li>
                    <li>Switch unlocks port 12, assigns VLAN 100</li>
                    <li>Alice gets IP address via DHCP, full internet + campus resources</li>
                </ol>

                <p style="margin-top:10px;"><strong>Guest Bob's Experience:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li>Bob (visitor) plugs into same Ethernet port</li>
                    <li>Bob has no university credentials</li>
                    <li>Port remains locked, Bob gets zero network access</li>
                    <li>Bob must connect to "UniversityGuest" WiFi (no 802.1X, web portal auth)</li>
                </ol>

                <p style="margin-top:10px;"><strong>Security Event - Alice Loses Laptop:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li>Alice reports stolen laptop to IT security</li>
                    <li>IT disables Alice's account in Active Directory</li>
                    <li>Even if thief knows Alice's password, next authentication attempt fails</li>
                    <li>Laptop immediately loses network access on all switches/WiFi</li>
                    <li>IT issues Alice new temporary credentials, she can use other devices</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>802.1X Port States</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">State</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">What's Allowed</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">When Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>UNAUTHORIZED</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Only EAP authentication packets (no DHCP, no internet, nothing)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Default state when device first connects</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>AUTHORIZED</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Full network access (all traffic allowed)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">After successful authentication</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>FORCE-AUTHORIZED</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Always authorized (802.1X disabled)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Legacy devices, printers, VoIP phones that don't support 802.1X</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>FORCE-UNAUTHORIZED</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Never authorized (port administratively disabled)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Unused ports, quarantined devices</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Common 802.1X Features</h3>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Dynamic VLAN Assignment:</strong> RADIUS tells switch which VLAN to use (students→VLAN 100, faculty→VLAN 200)</li>
                    <li><strong>Guest VLAN:</strong> If authentication fails, put device on restricted guest network instead of blocking completely</li>
                    <li><strong>MAC Authentication Bypass (MAB):</strong> For devices without 802.1X support (printers, cameras), authenticate based on MAC address</li>
                    <li><strong>Re-authentication Timer:</strong> Periodically re-check credentials (every 1 hour) to detect disabled accounts</li>
                    <li><strong>Single-Host / Multi-Host:</strong> Allow 1 device per port (strict) or multiple devices (IP phone + PC)</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Enable 802.1X on switch ports</li>
                    <li>Configure switch to point to RADIUS server for authentication</li>
                    <li>Configure host devices with 802.1X supplicant and credentials</li>
                    <li>Observe port staying in UNAUTHORIZED state until credentials verified</li>
                    <li>Test failed authentication (wrong password) - port remains blocked</li>
                    <li>View port status to see AUTHORIZED/UNAUTHORIZED states</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>802.1X = Port-Based Access Control</strong> - Authentication required per port/connection</li>
                    <li><strong>Works with RADIUS</strong> - 802.1X is the protocol, RADIUS is the backend</li>
                    <li><strong>EAP (Extensible Authentication Protocol)</strong> - Carries credentials securely</li>
                    <li><strong>Not just for switches</strong> - WiFi is the most common 802.1X use case (WPA2/WPA3-Enterprise)</li>
                    <li><strong>Plan for exceptions</strong> - Printers, cameras, legacy devices need workarounds (MAB or force-authorized ports)</li>
                </ul>
            </div>
        `
    },

    // === EAP METHODS ===
    eap_methods: {
        title: "EAP Methods",
        icon: "🔑",
        content: `
            <div class="help-section">
                <h3>What is EAP?</h3>
                <p><strong>EAP (Extensible Authentication Protocol)</strong> is a framework that defines how credentials are exchanged during 802.1X authentication. Think of EAP as the "language" that supplicants (devices) and authentication servers use to verify identities.</p>
                <p><strong>Key Point:</strong> EAP itself doesn't specify one authentication method - it's a framework that supports many different methods (username/password, certificates, tokens, etc.).</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                EAP is like a security checkpoint that can use different types of ID verification. The checkpoint (EAP framework) stays the same, but you might verify identity using a driver's license (password), a fingerprint scanner (certificate), or a security badge (token). Different situations call for different verification methods, but they all go through the same checkpoint process.
            </div>

            <div class="help-section">
                <h3>Common EAP Methods</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">EAP Method</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Authentication Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Security Level</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Common Uses</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>EAP-TLS</strong><br/>(Transport Layer Security)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Digital certificates on both client and server</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐⭐ Excellent (most secure)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">High-security environments, government, finance</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>PEAP</strong><br/>(Protected EAP)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server certificate + username/password</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐ Very Good</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Corporate WiFi (most common), universities</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>EAP-TTLS</strong><br/>(Tunneled TLS)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server certificate + various inner methods</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐ Very Good</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Similar to PEAP, more flexible</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>EAP-MSCHAPv2</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Username/password (Microsoft)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐ Good (when inside PEAP tunnel)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Windows environments, Active Directory</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>EAP-MD5</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Username/password (hashed)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐ Weak (vulnerable)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Not recommended (legacy only)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>EAP-TLS: Certificate-Based Authentication</h3>
                <p><strong>How it works:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Both sides have certificates:</strong>
                        <ul style="margin-left:20px;">
                            <li>Server has a certificate proving it's the real RADIUS server</li>
                            <li>Client (laptop/phone) has a certificate proving it's an authorized device</li>
                        </ul>
                    </li>
                    <li><strong>Mutual authentication:</strong> Both sides verify each other's certificates</li>
                    <li><strong>No passwords needed:</strong> Certificate = your identity proof</li>
                    <li><strong>Can't be phished:</strong> Fake WiFi networks can't steal what doesn't exist (no password)</li>
                </ol>

                <p style="margin-top:10px;"><strong>Requirements:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>PKI (Public Key Infrastructure) to issue and manage certificates</li>
                    <li>Certificate deployment to every client device</li>
                    <li>More complex setup, but highest security</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>PEAP: Protected EAP (Most Common)</h3>
                <p><strong>How it works:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Server has certificate:</strong> RADIUS server proves its identity</li>
                    <li><strong>Client verifies server:</strong> "Is this really my company's WiFi?"</li>
                    <li><strong>Encrypted tunnel established:</strong> TLS tunnel protects all further communication</li>
                    <li><strong>User sends credentials:</strong> Username/password sent through encrypted tunnel</li>
                    <li><strong>RADIUS checks credentials:</strong> Against Active Directory or database</li>
                </ol>

                <p style="margin-top:10px;"><strong>Why PEAP is Popular:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>✅ Users just need username/password (familiar)</li>
                    <li>✅ No client certificates needed (easier deployment)</li>
                    <li>✅ Server certificate prevents fake WiFi attacks</li>
                    <li>✅ Works with existing Active Directory infrastructure</li>
                    <li>✅ Good security vs. ease-of-use balance</li>
                </ul>
            </div>

            <div class="help-example">
                <strong>Example: PEAP Authentication Flow</strong>
                <p><strong>Scenario:</strong> Alice connecting to corporate WiFi "CompanySecure"</p>

                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
1. Alice selects "CompanySecure" SSID
   Laptop → WiFi AP: "I want to connect"

2. WiFi AP initiates 802.1X
   AP → Laptop: "Authentication required (EAP-Request Identity)"

3. Laptop responds with username
   Laptop → AP → RADIUS: "Identity: alice@company.com"

4. RADIUS sends server certificate
   RADIUS → Laptop: "Here's my certificate proving I'm the real company server"

5. Laptop verifies certificate
   Laptop: *Checks certificate is from trusted CA*
   Laptop: *Checks certificate name matches company domain*
   ✅ Certificate valid → Establish TLS tunnel

6. Laptop sends password (encrypted in tunnel)
   Laptop → RADIUS: [Encrypted] "Password: MySecret123"

7. RADIUS checks Active Directory
   RADIUS: *Looks up alice@company.com*
   RADIUS: *Verifies password*
   ✅ Valid credentials

8. RADIUS sends Access-Accept
   RADIUS → AP: "Alice is authorized, put her on VLAN 10"

9. WiFi AP grants access
   AP → Laptop: "Connected! VLAN 10, get DHCP address"

10. Alice gets IP and browses internet
   ✅ Full network access
                </pre>
            </div>

            <div class="help-section">
                <h3>EAP Method Comparison</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Feature</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">EAP-TLS</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">PEAP</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">EAP-MD5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Client Certificate</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Required</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Not needed</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Not needed</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Server Certificate</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Required</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Required</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ None</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Password</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Not needed</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Required</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Required</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Mutual Authentication</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Yes (both verify)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⚠️ One-way (server only)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ No</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Phishing Resistant</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Yes</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⚠️ If users verify cert</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ No</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Deployment Complexity</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">High (cert management)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Medium (server cert only)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Low (but insecure)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Recommendation</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Best for high security</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Best for most orgs</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Don't use</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Choosing the Right EAP Method</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Scenario</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Recommended Method</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Why</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Corporate WiFi (Windows/AD environment)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>PEAP-MSCHAPv2</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Works seamlessly with Active Directory, users use domain credentials</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Bank, government, high-security</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>EAP-TLS</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Highest security, certificate-based, no passwords to steal</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">University (mixed devices)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>PEAP or EAP-TTLS</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Works with Windows, Mac, Linux, phones - broad compatibility</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Managed corporate devices only</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>EAP-TLS</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Deploy certificates via GPO/MDM, enforce device compliance</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Quick testing/lab environment</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>PEAP</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Fast setup, just need server certificate</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Configure RADIUS server to support specific EAP methods</li>
                    <li>Select EAP method in 802.1X configuration (PEAP, EAP-TLS, etc.)</li>
                    <li>For PEAP: Configure server certificate and user database</li>
                    <li>For EAP-TLS: Configure both server and client certificates</li>
                    <li>Test authentication and observe EAP message exchange</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>EAP is a framework, not a method</strong> - Like "authentication" vs "password authentication"</li>
                    <li><strong>PEAP is most common</strong> - Good balance of security and usability</li>
                    <li><strong>EAP-TLS is most secure</strong> - But requires certificate management</li>
                    <li><strong>Never use EAP-MD5</strong> - Vulnerable to attacks, legacy only</li>
                    <li><strong>Certificate validation matters</strong> - Users should verify server certificates to prevent fake WiFi attacks</li>
                </ul>
            </div>
        `
    },

    // === CERTIFICATE-BASED AUTHENTICATION ===
    certificate_based_auth: {
        title: "Certificate-Based Authentication",
        icon: "📜",
        content: `
            <div class="help-section">
                <h3>What are Digital Certificates?</h3>
                <p><strong>Digital certificates</strong> are electronic credentials that prove identity, similar to a driver's license or passport in the physical world. They contain a public key and information about who owns it, digitally signed by a trusted Certificate Authority (CA).</p>
                <p><strong>Key Concept:</strong> Certificates replace passwords with cryptographic proof of identity - something much harder to steal or fake.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Think of a certificate like a passport. Your passport has your photo and info, but what makes it trustworthy is the government's official seal and signature. Similarly, a digital certificate has your identity and public key, but it's trustworthy because a Certificate Authority (the "government" of the digital world) has signed it. Just as a bouncer trusts government-issued passports, computers trust CA-signed certificates.
            </div>

            <div class="help-section">
                <h3>How Certificate Authentication Works</h3>

                <p><strong>The Process:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Device presents certificate:</strong> "Here's my certificate proving I'm Alice's laptop"</li>
                    <li><strong>Server verifies certificate:</strong>
                        <ul style="margin-left:20px;">
                            <li>Is it signed by a trusted CA?</li>
                            <li>Has it expired?</li>
                            <li>Has it been revoked?</li>
                            <li>Does the name match?</li>
                        </ul>
                    </li>
                    <li><strong>Cryptographic challenge:</strong> Server asks device to prove it owns the certificate's private key</li>
                    <li><strong>Device responds:</strong> Uses private key to sign a challenge (only real owner can do this)</li>
                    <li><strong>Authentication succeeds:</strong> Device proven to be authentic certificate owner</li>
                </ol>

                <p style="margin-top:15px;"><strong>Why This is Secure:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>✅ <strong>Can't be guessed:</strong> Not a password, it's a cryptographic key pair</li>
                    <li>✅ <strong>Can't be phished:</strong> No password to type into fake websites</li>
                    <li>✅ <strong>Hard to steal:</strong> Private key never leaves the device</li>
                    <li>✅ <strong>Revokable:</strong> Certificate can be instantly invalidated if device is lost</li>
                    <li>✅ <strong>Identifies device, not just user:</strong> Ensures authorized device + user combination</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Certificate Components</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Component</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Description</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Subject</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Who/what the certificate identifies</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">CN=Alice Laptop, OU=IT, O=Company</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Issuer</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Which Certificate Authority signed it</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">CN=Company Root CA</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Public Key</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">The cryptographic public key (shareable)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">RSA 2048-bit or ECC 256-bit</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Private Key</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Secret key (NOT in certificate, stored separately)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Stored on device, never transmitted</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Valid From/To</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Certificate expiration dates</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Jan 1, 2025 - Dec 31, 2026</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Serial Number</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Unique identifier for this certificate</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">4A:3F:2E:9B:... (hexadecimal)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Digital Signature</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">CA's signature proving authenticity</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">SHA-256 with RSA encryption</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Example: Corporate WiFi with Certificate Authentication</strong>
                <p><strong>Scenario:</strong> Company issues certificates to all managed laptops for WiFi access</p>

                <p><strong>Setup Phase:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Company sets up PKI:</strong>
                        <ul style="margin-left:20px;">
                            <li>Install Certificate Authority (CA) server</li>
                            <li>Create Root CA certificate (trusted by all company devices)</li>
                        </ul>
                    </li>
                    <li><strong>Deploy certificates to devices:</strong>
                        <ul style="margin-left:20px;">
                            <li>Each laptop gets unique certificate: "CN=LAPTOP-12345, OU=IT, O=Company"</li>
                            <li>Certificate includes laptop's public key</li>
                            <li>Private key stored securely on laptop (can't be copied)</li>
                        </ul>
                    </li>
                    <li><strong>Configure WiFi:</strong>
                        <ul style="margin-left:20px;">
                            <li>SSID "CompanySecure" requires 802.1X with EAP-TLS</li>
                            <li>RADIUS server trusts Company Root CA</li>
                        </ul>
                    </li>
                </ol>

                <p style="margin-top:15px;"><strong>Daily Usage (Alice's Experience):</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li>Alice opens her company laptop (already has certificate installed)</li>
                    <li>Laptop auto-connects to "CompanySecure" WiFi</li>
                    <li>Laptop presents its certificate to RADIUS server</li>
                    <li>RADIUS verifies:
                        <ul style="margin-left:20px;">
                            <li>✅ Certificate signed by trusted Company CA</li>
                            <li>✅ Not expired (valid until Dec 2026)</li>
                            <li>✅ Not on revocation list</li>
                            <li>✅ Laptop proves ownership via cryptographic challenge</li>
                        </ul>
                    </li>
                    <li>Access granted - Alice online in seconds, no password needed!</li>
                </ol>

                <p style="margin-top:15px;"><strong>Security Event - Laptop Stolen:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li>Alice reports stolen laptop to IT</li>
                    <li>IT adds certificate serial number to revocation list (CRL)</li>
                    <li>Next time laptop tries to connect, RADIUS checks CRL</li>
                    <li>Certificate marked as revoked → Access denied</li>
                    <li>Stolen laptop can't access WiFi even though it has valid certificate</li>
                    <li>Alice gets new laptop with new certificate, continues working</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>Public Key Infrastructure (PKI)</h3>
                <p><strong>Components needed for certificate authentication:</strong></p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Component</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Role</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Certificate Authority (CA)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Issues and signs certificates</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Microsoft CA, OpenSSL, Let's Encrypt</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Registration Authority (RA)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Verifies identity before issuing certs (optional)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">HR department verifies employee</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Certificate Revocation List (CRL)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">List of revoked (invalid) certificates</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Published by CA, checked before accepting cert</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>OCSP (Online Certificate Status Protocol)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Real-time certificate validity checking (faster than CRL)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Query: "Is cert XYZ still valid?" Response: "Yes/No"</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Certificate Store</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Secure storage for certificates and private keys</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Windows Certificate Manager, macOS Keychain, TPM chip</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Certificate Authentication vs Password Authentication</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Aspect</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Certificates</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Passwords</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>User Experience</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Automatic, no typing</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⚠️ Must remember and type password</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Phishing Resistance</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Yes (nothing to type/steal)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ No (easily phished)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Credential Theft</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Private key never leaves device</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Passwords transmitted, stored, logged</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Device Binding</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Yes (cert tied to specific device)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ No (password works from anywhere)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Revocation</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Instant (add to CRL)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⚠️ Must change password (user action required)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Deployment Complexity</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⚠️ High (PKI infrastructure needed)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Low (just user database)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Management Overhead</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⚠️ Higher (cert lifecycle, renewal, CRL)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Lower (password resets)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Overall Security</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅✅✅ Excellent</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐ Moderate</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Set up Certificate Authority to issue certificates</li>
                    <li>Generate client certificates for devices</li>
                    <li>Configure RADIUS server to trust CA-signed certificates</li>
                    <li>Configure 802.1X with EAP-TLS authentication method</li>
                    <li>Test certificate-based authentication (automatic login, no password prompt)</li>
                    <li>Try revoking a certificate and verify access is denied</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Certificates = Digital ID cards</strong> - Cryptographically proven identity</li>
                    <li><strong>Private key never leaves device</strong> - Can't be stolen like passwords</li>
                    <li><strong>Trust comes from CA signature</strong> - Like government seal on passport</li>
                    <li><strong>Revocation is powerful</strong> - Instantly invalidate lost/stolen device access</li>
                    <li><strong>PKI complexity is worth it</strong> - Much more secure than passwords for high-value assets</li>
                </ul>
            </div>
        `
    },

    // === NETWORK SEGMENTATION ===
    network_segmentation: {
        title: "Network Segmentation",
        icon: "🗂️",
        content: `
            <div class="help-section">
                <h3>What is Network Segmentation?</h3>
                <p><strong>Network segmentation</strong> is the practice of dividing a network into multiple smaller networks (segments or subnets), each acting as its own protected zone. Instead of having one big "flat" network where everything can talk to everything, you create separate zones with controlled access between them.</p>
                <p><strong>Core Principle:</strong> Limit damage from breaches - if one segment is compromised, the others remain protected.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Think of network segmentation like a ship with watertight compartments. If the ship hits an iceberg and one compartment floods (security breach), you seal the doors (firewalls) to prevent water spreading to other compartments. The ship stays afloat even with damage. Without compartments (flat network), one breach sinks the entire ship.
            </div>

            <div class="help-section">
                <h3>Why Segment Networks?</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Flat Network (No Segmentation)</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Segmented Network</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Everything on one network (192.168.1.0/24)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Separate subnets for different functions/users</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Guest laptop can access employee database directly</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Guest network isolated, can't reach internal resources</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IoT smart fridge can scan the entire network</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IoT devices quarantined, internet-only access</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Compromised PC can attack all servers</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Firewall blocks lateral movement between segments</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">One ransomware infection = entire company down</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Ransomware contained to one segment, servers safe</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ High risk, hard to monitor</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Reduced risk, easier monitoring</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Common Segmentation Strategies</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Segment</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Subnet Example</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">VLAN</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Employee Network</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">10.1.10.0/24</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">VLAN 10</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Employee workstations, full internal access</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Server Network</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">10.1.20.0/24</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">VLAN 20</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Databases, file servers, internal applications</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Guest WiFi</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">10.1.99.0/24</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">VLAN 99</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Internet access only, no internal access</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>IoT Devices</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">10.1.50.0/24</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">VLAN 50</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Smart devices, cameras, thermostats - isolated</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DMZ (Public Servers)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">10.1.100.0/24</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">VLAN 100</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Web servers, email servers accessible from internet</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Management Network</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">10.1.200.0/24</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">VLAN 200</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IT admin access to switches, routers, firewalls</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>VoIP Phones</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">10.1.30.0/24</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">VLAN 30</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">QoS priority for voice traffic, isolated from data</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Example: Corporate Network Segmentation</strong>
                <p><strong>Scenario:</strong> 200-employee company with servers, guests, and IoT devices</p>

                <p><strong>Network Architecture:</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
Internet
   ↓
[Perimeter Firewall]
   ↓
┌─────────────────────────────────────────┐
│          Core Router/Switch             │
└─────────────────────────────────────────┘
         ↓             ↓              ↓
    [FW Rules]    [FW Rules]     [FW Rules]
         ↓             ↓              ↓
   VLAN 10        VLAN 20        VLAN 99
   Employee       Servers        Guest WiFi
   10.1.10.0/24   10.1.20.0/24   10.1.99.0/24
   200 users      DB, Files      Internet only
                </pre>

                <p style="margin-top:15px;"><strong>Firewall Rules Between Segments:</strong></p>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">From</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">To</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Allowed Traffic</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Denied Traffic</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Employee VLAN 10</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server VLAN 20</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ SQL:1433, SMB:445, HTTP:80/443</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ SSH:22 (admins only), RDP:3389</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Guest VLAN 99</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Any Internal</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Internet only (DNS, HTTP, HTTPS)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ ALL internal networks (complete isolation)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server VLAN 20</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Employee VLAN 10</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Return traffic only (stateful FW)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Servers can't initiate connections to users</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IoT VLAN 50</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Any Internal</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Internet only (cloud services)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ No internal network scanning or access</td>
                        </tr>
                    </tbody>
                </table>

                <p style="margin-top:15px;"><strong>Security Event - Ransomware on Guest WiFi:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li>Visitor's laptop infected with ransomware connects to Guest WiFi</li>
                    <li>Ransomware tries to spread to network shares and encrypt files</li>
                    <li>Firewall blocks all attempts to reach Employee VLAN or Server VLAN</li>
                    <li>✅ Only guest laptop affected, company data completely safe</li>
                    <li>IT isolates infected device, rest of network continues operating normally</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>Segmentation Technologies</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Technology</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Layer</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Segments</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Best Use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>VLANs</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Layer 2</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Logically separate broadcast domains on same physical switch</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Departmental separation, device type separation</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Subnets</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Layer 3</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Different IP address ranges, routing between segments</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Geographic separation, logical grouping</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Firewalls</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Layer 3-7</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ACLs/rules control traffic between segments</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Enforce security policies between zones</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>ACLs</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Layer 3-4</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Permit/deny rules on routers and switches</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Simple traffic filtering, performance-sensitive environments</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>VRFs</strong><br/>(Virtual Routing)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Layer 3</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Completely separate routing tables on same physical router</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Multi-tenant environments, service providers</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Segmentation Best Practices</h3>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Start with business needs:</strong> Segment by function (users, servers, guests), not just randomly</li>
                    <li><strong>Least privilege:</strong> Only allow traffic that's absolutely necessary between segments</li>
                    <li><strong>Default deny:</strong> Block everything, then explicitly allow what's needed</li>
                    <li><strong>Micro-segmentation:</strong> More segments = better containment (but more complex management)</li>
                    <li><strong>Monitor inter-segment traffic:</strong> Log all firewall decisions to detect anomalies</li>
                    <li><strong>Regular audits:</strong> Review firewall rules quarterly, remove outdated exceptions</li>
                    <li><strong>Document everything:</strong> Maintain network diagrams showing all segments and rules</li>
                </ol>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Create multiple VLANs for different device types (users, servers, guests)</li>
                    <li>Assign different IP subnets to each VLAN (10.1.10.0/24, 10.1.20.0/24, etc.)</li>
                    <li>Configure router/firewall with ACLs between VLANs</li>
                    <li>Test isolation: Guest device should NOT be able to ping server VLAN</li>
                    <li>Allow specific traffic: Employee→Server for database access</li>
                    <li>Simulate attack: Try spreading malware across segments (should be blocked)</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Segmentation = Containment</strong> - Limit blast radius of security incidents</li>
                    <li><strong>Flat networks are dangerous</strong> - One compromised device = entire network at risk</li>
                    <li><strong>VLANs + ACLs = Segmentation</strong> - Layer 2 separation + Layer 3 enforcement</li>
                    <li><strong>Guest WiFi must be isolated</strong> - Untrusted devices should never reach internal resources</li>
                    <li><strong>More segments = more security</strong> - But also more management complexity (find balance)</li>
                </ul>
            </div>
        `
    },

    // === ROGUE DHCP DETECTION ===
    rogue_dhcp_detection: {
        title: "Rogue DHCP Detection",
        icon: "🚨",
        content: `
            <div class="help-section">
                <h3>What is a Rogue DHCP Server?</h3>
                <p><strong>A rogue DHCP server</strong> is an unauthorized DHCP server on your network that hands out IP addresses, gateways, and DNS settings to clients - often with malicious intent. This can redirect traffic, intercept communications, or cause network outages.</p>
                <p><strong>Attack Scenario:</strong> Attacker plugs in a laptop running a DHCP server. Your legitimate devices receive malicious network configuration, routing all traffic through the attacker's device.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Imagine an airport where a fake information desk is set up next to the real one. Travelers who ask the fake desk for directions get sent to the wrong terminals, miss flights, or worse - get directed into traps. A rogue DHCP server is that fake information desk, giving out wrong "directions" (network settings) to unsuspecting devices.
            </div>

            <div class="help-section">
                <h3>How Rogue DHCP Attacks Work</h3>

                <p><strong>Step-by-Step Attack:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Attacker connects rogue DHCP server</strong> to network (physically or via compromised device)</li>
                    <li><strong>Victim device requests IP address</strong> via DHCP Discover broadcast</li>
                    <li><strong>Race condition:</strong> Both legitimate and rogue DHCP servers respond</li>
                    <li><strong>First response wins:</strong> If rogue server responds faster, victim accepts malicious config</li>
                    <li><strong>Malicious configuration delivered:</strong>
                        <ul style="margin-left:20px;">
                            <li>Gateway: Attacker's IP (all traffic routed through attacker)</li>
                            <li>DNS: Attacker's DNS server (can redirect websites)</li>
                            <li>Valid IP address (keeps victim online, unaware of attack)</li>
                        </ul>
                    </li>
                    <li><strong>Traffic interception:</strong> Victim's traffic flows through attacker's device</li>
                </ol>
            </div>

            <div class="help-section">
                <h3>Impact of Rogue DHCP</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Attack Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">What Happens</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Man-in-the-Middle</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Rogue gateway intercepts all traffic</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Passwords stolen, data intercepted, sessions hijacked</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DNS Spoofing</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Rogue DNS redirects legitimate domains to phishing sites</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ bank.com → fake login page, credentials stolen</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Denial of Service</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Rogue server gives invalid gateway (dead IP)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Devices lose internet, can't access network resources</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>IP Conflicts</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Rogue and legitimate servers assign overlapping IP ranges</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Duplicate IPs, network instability, intermittent failures</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Example: Coffee Shop Attack</strong>
                <p><strong>Scenario:</strong> Attacker in coffee shop sets up rogue DHCP server on public WiFi</p>

                <p><strong>Normal DHCP Flow:</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
Laptop → DHCP Discover broadcast
Legitimate Server → DHCP Offer (IP: 10.0.1.50, Gateway: 10.0.1.1, DNS: 8.8.8.8)
Laptop → DHCP Request
Legitimate Server → DHCP Ack
✅ Laptop configured correctly, traffic flows normally
                </pre>

                <p style="margin-top:15px;"><strong>Rogue DHCP Attack:</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
Laptop → DHCP Discover broadcast
Legitimate Server → DHCP Offer (IP: 10.0.1.50, Gateway: 10.0.1.1, DNS: 8.8.8.8) [200ms delay]
Rogue Server → DHCP Offer (IP: 10.0.1.100, Gateway: 10.0.1.99, DNS: 10.0.1.99) [50ms delay - WINS!]
Laptop → DHCP Request (accepts rogue offer, it arrived first)
Rogue Server → DHCP Ack
❌ Laptop now routes ALL traffic through attacker (10.0.1.99)
                </pre>

                <p style="margin-top:15px;"><strong>What Attacker Can Do:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>See all unencrypted HTTP traffic (passwords, form data)</li>
                    <li>Intercept SSL/TLS with fake certificates (if user ignores warnings)</li>
                    <li>Redirect bank.com → attacker's phishing site via DNS</li>
                    <li>Inject malicious scripts into web pages</li>
                    <li>Block access to security update sites</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Detection Methods</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Method</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Works</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Effectiveness</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DHCP Snooping</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Switch monitors DHCP traffic, blocks offers from untrusted ports</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐⭐ Best (prevents at switch level)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Network Monitoring</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IDS/IPS detects multiple DHCP servers, alerts admin</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐ Very Good (detects after attack starts)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Client-side Detection</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Devices compare gateway MAC with known good value</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐ Good (requires configuration)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Manual Scanning</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Admin periodically sends DHCP Discover, checks responses</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐ Fair (reactive, not real-time)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>DHCP Snooping (Primary Defense)</h3>
                <p><strong>How It Works:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Configure trusted ports:</strong> Mark uplink to legitimate DHCP server as "trusted"</li>
                    <li><strong>All other ports untrusted:</strong> User-facing ports where rogue servers might connect</li>
                    <li><strong>Switch inspects DHCP packets:</strong>
                        <ul style="margin-left:20px;">
                            <li>✅ DHCP Discover/Request from any port → Allowed</li>
                            <li>✅ DHCP Offer/Ack from trusted port → Allowed (legitimate server)</li>
                            <li>❌ DHCP Offer/Ack from untrusted port → Blocked (rogue server)</li>
                        </ul>
                    </li>
                    <li><strong>Binding database:</strong> Switch maintains table of IP→MAC→Port mappings</li>
                    <li><strong>Additional protection:</strong> Enables Dynamic ARP Inspection, IP Source Guard</li>
                </ol>

                <p style="margin-top:15px;"><strong>Configuration Example (Cisco Switch):</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
! Enable DHCP snooping globally
Switch(config)# ip dhcp snooping

! Enable snooping for VLAN 10
Switch(config)# ip dhcp snooping vlan 10

! Mark uplink to DHCP server as trusted
Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# ip dhcp snooping trust

! All other ports are untrusted by default (user ports)
! Rogue DHCP offers will be blocked
                </pre>
            </div>

            <div class="help-section">
                <h3>Prevention Best Practices</h3>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Enable DHCP Snooping:</strong> On all access switches (most effective)</li>
                    <li><strong>Use 802.1X authentication:</strong> Prevent unauthorized devices from connecting</li>
                    <li><strong>Port security:</strong> Limit MAC addresses per port, disable unused ports</li>
                    <li><strong>Network segmentation:</strong> Isolate guest networks, restrict broadcast domains</li>
                    <li><strong>Monitor DHCP logs:</strong> Watch for unusual assignment patterns</li>
                    <li><strong>Static IP for critical systems:</strong> Servers and infrastructure devices shouldn't use DHCP</li>
                    <li><strong>Regular audits:</strong> Scan for unauthorized DHCP servers weekly</li>
                </ol>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Set up legitimate DHCP server on your network</li>
                    <li>Configure rogue DHCP server with malicious gateway/DNS settings</li>
                    <li>Observe race condition: which server's offer arrives first?</li>
                    <li>Enable DHCP snooping on switch with trusted port configuration</li>
                    <li>Test: Rogue DHCP offers should now be blocked</li>
                    <li>View DHCP snooping binding table to see legitimate assignments</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>DHCP is broadcast-based</strong> - Anyone on subnet can respond</li>
                    <li><strong>First response wins</strong> - Rogue servers often respond faster</li>
                    <li><strong>DHCP Snooping is critical</strong> - Should be enabled on all access switches</li>
                    <li><strong>Untrusted ports by default</strong> - Only uplinks to legitimate DHCP servers should be trusted</li>
                    <li><strong>Layer 2 attack</strong> - Happens before IP routing, must be stopped at switch level</li>
                </ul>
            </div>
        `
    },

    // === ROGUE ROUTER DETECTION ===
    rogue_router_detection: {
        title: "Rogue Router Detection",
        icon: "🛑",
        content: `
            <div class="help-section">
                <h3>What is a Rogue Router?</h3>
                <p><strong>A rogue router</strong> is an unauthorized router on your network that advertises itself as a gateway, intercepting traffic meant for the internet. Unlike rogue DHCP (which pushes configuration), rogue routers use ICMP Router Advertisements to trick devices into routing through them.</p>
                <p><strong>Attack Goal:</strong> Become the default gateway for devices, enabling man-in-the-middle attacks, traffic interception, and network disruption.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Think of a rogue router like a fake highway exit sign. Drivers (network packets) following the fake sign end up on a road controlled by the attacker instead of reaching their real destination. The attacker can now monitor where everyone is going, detour them to fake destinations, or create traffic jams.
            </div>

            <div class="help-section">
                <h3>How Rogue Router Attacks Work</h3>

                <p><strong>Attack Methods:</strong></p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Method</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Protocol</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Works</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>ICMP Redirect</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ICMP Type 5</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Attacker sends ICMP Redirect messages: "Use me as gateway instead"</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Router Advertisement</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ICMPv6 RA</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Broadcast unsolicited router ads: "I'm your gateway!" (IPv6 networks)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>ARP Spoofing</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ARP</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Claim to be gateway's MAC address, intercept traffic meant for real router</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Route Injection</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">RIP/OSPF</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Inject false routing updates if routing protocol authentication is weak</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Example: Corporate Office Attack</strong>
                <p><strong>Scenario:</strong> Employee plugs in personal router (accidentally or maliciously)</p>

                <p><strong>Normal Traffic Flow:</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
PC (10.1.1.50) wants to reach Google (8.8.8.8)
   ↓
PC sends packet to default gateway: 10.1.1.1 (legitimate router)
   ↓
Legitimate router forwards to internet
   ↓
✅ Traffic reaches Google normally
                </pre>

                <p style="margin-top:15px;"><strong>Rogue Router Attack:</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
Rogue router (10.1.1.99) sends ICMP Router Advertisement
   ↓
Advertisement claims: "I'm a better gateway! Higher priority! Use me!"
   ↓
PC updates routing table: Default gateway = 10.1.1.99 (rogue)
   ↓
PC (10.1.1.50) wants to reach Google (8.8.8.8)
   ↓
PC sends packet to NEW gateway: 10.1.1.99 (rogue router)
   ↓
Rogue router intercepts traffic:
   - Logs all unencrypted data
   - Can modify packets
   - Forwards to real gateway (victim unaware)
   ↓
❌ Traffic reaches Google, but attacker saw everything
                </pre>

                <p style="margin-top:15px;"><strong>What Gets Compromised:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>All HTTP traffic fully visible (passwords, form data)</li>
                    <li>TLS/SSL certificate validation bypassed if attacker performs MITM with fake certs</li>
                    <li>Internal traffic to other subnets visible</li>
                    <li>VPN connections potentially compromised</li>
                    <li>Real-time monitoring of user behavior and data access</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>Detection Techniques</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Detection Method</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Indicators</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Router Advertisement Monitoring</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Multiple sources sending RAs, unknown MAC addresses</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Wireshark, tcpdump, IDS/IPS</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Gateway MAC Verification</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Gateway IP resolves to wrong MAC address</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ARP table inspection, arpwatch</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Routing Table Anomalies</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Unexpected default route changes, strange next-hops</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">netstat -r, route print, ip route</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Traffic Flow Analysis</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Packets leaving via unexpected interface/device</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">NetFlow, sFlow, packet capture</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Network Scanning</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Unauthorized devices with routing enabled</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Nmap, Nessus, network inventory tools</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Prevention Strategies</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Defense</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Works</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Effectiveness</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>RA Guard</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Switch blocks Router Advertisements from untrusted ports (IPv6)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐⭐ Excellent</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Dynamic ARP Inspection (DAI)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Validates ARP packets against DHCP snooping binding table</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐⭐ Excellent</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Disable ICMP Redirects</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Configure hosts to ignore ICMP redirect messages</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐ Very Good</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Static Gateway Configuration</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Manually configure gateway (don't accept RAs)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐ Very Good (not scalable)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Routing Protocol Authentication</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Require MD5/SHA authentication for routing updates</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐ Very Good</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>802.1X Port Authentication</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Prevent unauthorized devices from connecting to network</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⭐⭐⭐⭐⭐ Excellent</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Configuration Example: RA Guard</h3>
                <p><strong>Cisco Switch Configuration:</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
! Create RA Guard policy
Switch(config)# ipv6 nd raguard policy BLOCK-ROGUE-RA
Switch(config-nd-raguard)# device-role host
Switch(config-nd-raguard)# exit

! Apply policy to user-facing ports (block RAs)
Switch(config)# interface range GigabitEthernet1/0/1 - 48
Switch(config-if-range)# ipv6 nd raguard attach-policy BLOCK-ROGUE-RA
Switch(config-if-range)# exit

! Create policy for trusted router ports (allow RAs)
Switch(config)# ipv6 nd raguard policy ALLOW-LEGITIMATE-RA
Switch(config-nd-raguard)# device-role router
Switch(config-nd-raguard)# exit

! Apply to uplink port connected to real router
Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# ipv6 nd raguard attach-policy ALLOW-LEGITIMATE-RA
                </pre>
            </div>

            <div class="help-section">
                <h3>Response Actions</h3>
                <p><strong>If rogue router detected:</strong></p>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Immediate isolation:</strong> Shut down switch port or block MAC address</li>
                    <li><strong>Identify source:</strong> Trace MAC to physical location, check DHCP/ARP logs</li>
                    <li><strong>Client remediation:</strong> Flush client routing tables, renew DHCP leases</li>
                    <li><strong>Forensics:</strong> Capture traffic logs, determine if data was intercepted</li>
                    <li><strong>Strengthen defenses:</strong> Enable RA Guard, DAI, 802.1X if not already active</li>
                    <li><strong>Security review:</strong> Assess how rogue device was connected, policy gaps</li>
                </ol>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Set up legitimate router as default gateway</li>
                    <li>Configure rogue router to send Router Advertisements</li>
                    <li>Observe client routing table changes when rogue RA received</li>
                    <li>Monitor traffic flow - packets now go through rogue router</li>
                    <li>Enable RA Guard on switch to block unauthorized RAs</li>
                    <li>Verify rogue RAs are now blocked, clients use legitimate gateway</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Router Advertisements are trusted by default</strong> - Devices accept them without question</li>
                    <li><strong>RA Guard is essential</strong> - Block RAs from all user-facing ports</li>
                    <li><strong>Layer 2 prevention</strong> - Must be stopped at switch, not router</li>
                    <li><strong>Affects both IPv4 and IPv6</strong> - Different attack vectors (ICMP Redirect vs RA)</li>
                    <li><strong>Combines with ARP spoofing</strong> - Rogue routers often use multiple techniques simultaneously</li>
                </ul>
            </div>
        `
    },

    // === MAN-IN-THE-MIDDLE ATTACKS ===
    mitm_attacks: {
        title: "Man-in-the-Middle Attacks",
        icon: "👤",
        content: `
            <div class="help-section">
                <h3>What is a Man-in-the-Middle (MITM) Attack?</h3>
                <p><strong>A Man-in-the-Middle (MITM) attack</strong> occurs when an attacker secretly intercepts and potentially modifies communications between two parties who believe they are directly communicating with each other. The attacker positions themselves "in the middle" of the conversation, eavesdropping or manipulating data without either party knowing.</p>
                <p><strong>Goal:</strong> Steal credentials, intercept sensitive data, inject malicious content, or impersonate one of the parties.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong>
                Imagine Alice and Bob passing notes in class through Charlie. Alice thinks Charlie is just delivering her notes to Bob, and Bob thinks the same. But Charlie is secretly reading every note, changing words, and sometimes writing fake notes pretending to be Alice or Bob. Neither Alice nor Bob realizes Charlie is doing this - that's a man-in-the-middle attack.
            </div>

            <div class="help-section">
                <h3>Common MITM Attack Techniques</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Technique</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Works</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">What Gets Compromised</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>ARP Spoofing</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Send fake ARP replies: "I'm the gateway/server" (wrong MAC)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">All local network traffic, passwords, session cookies</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DNS Spoofing</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Provide fake DNS responses: bank.com → attacker's IP</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Login credentials entered on phishing sites</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Rogue WiFi AP</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Set up fake "Starbucks WiFi" access point</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">All traffic from connected users</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>SSL Stripping</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Downgrade HTTPS → HTTP, intercept unencrypted traffic</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Passwords, credit cards sent over HTTP</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Session Hijacking</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Steal session cookies/tokens from intercepted traffic</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Active login sessions, account takeover</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Evil Twin Attack</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Create AP with same SSID as legitimate network</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Users auto-connect, send traffic through attacker</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>Example: ARP Spoofing MITM Attack</strong>
                <p><strong>Scenario:</strong> Alice (10.1.1.10) wants to browse internet through gateway (10.1.1.1), but attacker (10.1.1.99) intervenes</p>

                <p><strong>Normal Communication:</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
Alice needs gateway's MAC address
   ↓
Alice: "Who has 10.1.1.1?" (ARP Request broadcast)
   ↓
Gateway: "10.1.1.1 is at AA:BB:CC:DD:EE:FF" (ARP Reply)
   ↓
Alice's ARP cache: 10.1.1.1 → AA:BB:CC:DD:EE:FF
   ↓
Alice sends traffic to AA:BB:CC:DD:EE:FF (legitimate gateway)
   ↓
✅ Traffic flows normally through real gateway
                </pre>

                <p style="margin-top:15px;"><strong>ARP Spoofing Attack:</strong></p>
                <pre style="background:#16213e; padding:15px; border-radius:8px; border-left:3px solid #667eea; color:#e4e4e7; overflow-x:auto;">
Attacker continuously sends fake ARP replies
   ↓
Attacker → Alice: "10.1.1.1 is at 11:22:33:44:55:66" (attacker's MAC)
Attacker → Gateway: "10.1.1.10 is at 11:22:33:44:55:66" (attacker's MAC)
   ↓
Alice's ARP cache poisoned: 10.1.1.1 → 11:22:33:44:55:66 (attacker)
Gateway's ARP cache poisoned: 10.1.1.10 → 11:22:33:44:55:66 (attacker)
   ↓
Alice sends traffic to 11:22:33:44:55:66 (thinking it's gateway)
   ↓
Attacker receives Alice's traffic:
   - Logs/inspects all data
   - Can modify packets
   - Forwards to real gateway (to avoid detection)
   ↓
Gateway sends responses to 11:22:33:44:55:66 (thinking it's Alice)
   ↓
Attacker forwards responses to Alice
   ↓
❌ Communication still works, but attacker sees EVERYTHING
                </pre>

                <p style="margin-top:15px;"><strong>What Attacker Can Do:</strong></p>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>See all HTTP traffic (usernames, passwords, cookies)</li>
                    <li>Inject JavaScript into web pages (malware, keyloggers)</li>
                    <li>Redirect bank.com to phishing site</li>
                    <li>Downgrade HTTPS to HTTP (SSL stripping)</li>
                    <li>Steal session tokens for account takeover</li>
                    <li>Modify file downloads (inject backdoors)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>MITM Attack Indicators</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Warning Sign</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">What It Means</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How to Detect</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Certificate Warnings</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Browser warns about invalid/self-signed SSL certificate</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ NEVER click "Proceed Anyway" on banking/email sites</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Duplicate IP/MAC</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Two devices claim same IP or MAC address</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Check ARP table for multiple MACs for same IP</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Slow Performance</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Traffic being relayed through attacker adds latency</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Ping times suddenly increase, traceroute shows extra hops</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Unexpected Logouts</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Attacker stealing session cookies, using same session</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Check account activity logs for duplicate sessions</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>HTTPS Downgrade</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Sites that should be HTTPS showing as HTTP</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Look for 🔒 padlock in address bar - if missing, suspicious</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Defense Strategies</h3>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Defense Layer</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Technology</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">What It Protects Against</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Network Level</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Dynamic ARP Inspection (DAI), DHCP Snooping, RA Guard</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ARP spoofing, rogue DHCP/routers</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Encryption</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">HTTPS, VPN, TLS 1.3, HSTS</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Traffic interception, SSL stripping, eavesdropping</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Authentication</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Certificate pinning, mutual TLS, DNSSEC</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Fake certificates, DNS spoofing</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Access Control</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">802.1X, MAC filtering, network segmentation</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Unauthorized devices, rogue access points</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Monitoring</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IDS/IPS, traffic analysis, anomaly detection</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Active attacks, unusual traffic patterns</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>User Protection Best Practices</h3>
                <ol style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>Always use HTTPS:</strong> Look for 🔒 padlock, especially on login/payment pages</li>
                    <li><strong>Never ignore certificate warnings:</strong> If browser warns about certificate, DO NOT proceed</li>
                    <li><strong>Use VPN on public WiFi:</strong> Encrypts all traffic, prevents local MITM attacks</li>
                    <li><strong>Verify website URLs:</strong> Check for typos (bank.com vs. bankk.com)</li>
                    <li><strong>Enable HTTPS-Only mode:</strong> In browser settings, reject HTTP connections</li>
                    <li><strong>Use strong authentication:</strong> 2FA prevents session hijacking damage</li>
                    <li><strong>Keep software updated:</strong> Patches vulnerabilities attackers exploit</li>
                    <li><strong>Avoid auto-connect WiFi:</strong> Manually verify network before connecting</li>
                </ol>
            </div>

            <div class="help-tip">
                <strong>In the Simulator:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li>Set up normal communication: Client → Gateway → Server</li>
                    <li>Position attacker between client and gateway</li>
                    <li>Configure attacker to perform ARP spoofing (poisoning both sides)</li>
                    <li>Enable packet interception/logging on attacker</li>
                    <li>Observe: Traffic flows through attacker, appears normal to client</li>
                    <li>Enable Dynamic ARP Inspection to block the attack</li>
                    <li>Verify: ARP spoofing packets now blocked, traffic flows normally</li>
                </ul>
            </div>

            <div class="help-tip">
                <strong>💡 Remember:</strong>
                <ul style="margin-left:20px; color:#e4e4e7;">
                    <li><strong>MITM exploits trust</strong> - Victims don't know they're being intercepted</li>
                    <li><strong>Encryption is critical</strong> - HTTPS, VPNs make MITM attacks much harder</li>
                    <li><strong>Layer 2 attacks are most common</strong> - ARP spoofing on local networks</li>
                    <li><strong>Certificate validation matters</strong> - Ignoring warnings = giving attacker access</li>
                    <li><strong>Defense in depth</strong> - Network security (DAI) + encryption (HTTPS) + user awareness</li>
                </ul>
            </div>
        `
    },

    // ========================================
    // SERVICES
    // ========================================

    web_servers: {
        title: "Web Servers (HTTP)",
        icon: "🌐",
        content: `
            <div class="help-section">
                <h3>What is a Web Server?</h3>
                <p><strong>A web server</strong> is a computer that stores website files (HTML, CSS, images, JavaScript) and serves them to users when they visit a website. It listens for HTTP requests and sends back HTTP responses.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> A web server is like a restaurant kitchen - you place an order (HTTP request), the kitchen prepares your food (processes the request), and delivers it to your table (HTTP response).
            </div>

            <div class="help-section">
                <h3>How Web Servers Work</h3>
                <p><strong>The Request-Response Cycle:</strong></p>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
1. User types URL: http://www.example.com/page.html
2. Browser sends HTTP request to server's IP (port 80)
3. Web server receives request
4. Server locates the requested file
5. Server sends HTTP response with file content
6. Browser receives and displays the webpage
                </pre>
            </div>

            <div class="help-section">
                <h3>HTTP Request Format</h3>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
GET /page.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0)
Accept: text/html,application/xhtml+xml
Accept-Language: en-US,en;q=0.9
Connection: keep-alive

<span style="color:#9ca3af;">(Request body for POST requests)</span>
                </pre>
            </div>

            <div class="help-section">
                <h3>HTTP Response Format</h3>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
HTTP/1.1 200 OK
Date: Mon, 15 Jan 2024 10:30:00 GMT
Server: Apache/2.4.41
Content-Type: text/html; charset=UTF-8
Content-Length: 1234

&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;&lt;title&gt;Example Page&lt;/title&gt;&lt;/head&gt;
  &lt;body&gt;&lt;h1&gt;Hello World!&lt;/h1&gt;&lt;/body&gt;
&lt;/html&gt;
                </pre>
            </div>

            <div class="help-section">
                <h3>Common HTTP Status Codes</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Code</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Meaning</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;"><strong>200 OK</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Success - request completed</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Page found and sent</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#60a5fa !important;"><strong>301 Moved</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Permanent redirect</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">http → https redirect</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#fbbf24 !important;"><strong>404 Not Found</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Requested file doesn't exist</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Typo in URL</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;"><strong>500 Error</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server-side error</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">PHP script crashed</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;"><strong>503 Unavailable</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server overloaded/down</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Too much traffic</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>HTTP Request Methods</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Method</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>GET</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Retrieve data (read-only)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Load webpage, view image</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>POST</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Send data to server</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Submit form, upload file</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>PUT</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Update existing resource</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Edit profile data</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DELETE</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Remove resource</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Delete account</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-example">
                <strong>📱 Example: Loading a Webpage</strong>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
1. User clicks: http://www.news.com/article.html

2. Browser sends GET request:
   → To: www.news.com (192.168.1.100)
   → Port: 80 (HTTP)
   → Asks for: /article.html

3. Web server at 192.168.1.100:
   → Receives request on port 80
   → Finds /var/www/html/article.html
   → Reads file content
   → Sends HTTP 200 OK with HTML

4. Browser receives response:
   → Parses HTML
   → Requests CSS/images (more GET requests)
   → Renders complete page
                </pre>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Configure a web server:</strong></p>
                <ul>
                    <li>Add an <strong>HTTP Server application</strong> to a host</li>
                    <li>Set its IP address (e.g., 192.168.1.100)</li>
                    <li>HTTP uses <strong>port 80</strong> by default</li>
                    <li>Configure client hosts to access it</li>
                    <li>Watch HTTP requests/responses flow through the network</li>
                    <li>Test with <strong>ping</strong> first to verify connectivity</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>Port 80</strong> is standard for HTTP (unencrypted)</li>
                    <li><strong>HTTP is stateless</strong> - each request is independent</li>
                    <li><strong>Status codes</strong> tell you what happened (2xx = success, 4xx = client error, 5xx = server error)</li>
                    <li><strong>GET for reading</strong>, POST for writing/updating</li>
                    <li><strong>HTTP is not secure</strong> - data sent in plain text (use HTTPS for security)</li>
                </ul>
            </div>
        `
    },

    https_web: {
        title: "Secure Web (HTTPS)",
        icon: "🔒",
        content: `
            <div class="help-section">
                <h3>What is HTTPS?</h3>
                <p><strong>HTTPS (HTTP Secure)</strong> is the encrypted version of HTTP. It adds TLS/SSL encryption to protect data as it travels between your browser and the web server, preventing eavesdropping and tampering.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> HTTP is like sending a postcard - anyone can read it. HTTPS is like sending a letter in a sealed, tamper-proof envelope that only the recipient can open.
            </div>

            <div class="help-section">
                <h3>HTTP vs HTTPS Comparison</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Aspect</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">HTTP</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">HTTPS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Encryption</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">None - plain text</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">TLS/SSL encrypted</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Port</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">80</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">443</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Certificate</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">Not required</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">SSL certificate required</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Security</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">Vulnerable to MITM attacks</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">Protected against MITM</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Browser Indicator</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">"Not Secure" warning</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">🔒 Padlock icon</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Use Case</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Public info only</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Login, payments, private data</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>How HTTPS Works (TLS Handshake)</h3>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
1. Client Hello:
   Browser → Server: "I want to connect securely"
   Sends: Supported TLS versions, cipher suites

2. Server Hello:
   Server → Browser: "OK, here's my certificate"
   Sends: SSL certificate, chosen cipher suite

3. Certificate Verification:
   Browser checks:
   ✓ Is certificate signed by trusted CA?
   ✓ Is domain name correct?
   ✓ Is certificate not expired?
   ✓ Has it been revoked?

4. Key Exchange:
   Browser generates random session key
   Encrypts it with server's public key
   Sends encrypted key to server

5. Server Decrypts:
   Server uses private key to decrypt session key
   Both sides now have same session key

6. Encrypted Communication:
   All data encrypted with shared session key
   🔒 Data is unreadable to eavesdroppers
                </pre>
            </div>

            <div class="help-example">
                <strong>🏦 Example: Online Banking</strong>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
Scenario: User logs into bank account

<span style="color:#f87171;">❌ With HTTP (UNSAFE):</span>
User → http://bank.com/login
Username: alice
Password: secret123

Attacker on WiFi can see:
- Username: alice
- Password: secret123
- Account number, balance, transactions
→ <strong>ACCOUNT COMPROMISED!</strong>

<span style="color:#4ade80;">✅ With HTTPS (SAFE):</span>
User → https://bank.com/login
Browser: 🔒 Secure connection established
Data sent: 7f3a9b2c4e... (encrypted gibberish)

Attacker on WiFi sees:
- Encrypted data: %#@$&*!^@#
- Cannot decrypt without session key
- Cannot read username, password, or data
→ <strong>Data protected!</strong>
                </pre>
            </div>

            <div class="help-section">
                <h3>What HTTPS Protects Against</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Threat</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">HTTP</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">HTTPS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Eavesdropping</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">Vulnerable</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">Protected</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Data tampering</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">Possible</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">Detected</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>MITM attacks</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">Easy</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">Very difficult</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Password theft</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">High risk</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">Encrypted</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Identity verification</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">None</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">Certificate proves identity</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Certificate Warnings - What They Mean</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Warning</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Cause</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Expired certificate</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Certificate past expiration date</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">Don't trust - may be abandoned site</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Name mismatch</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Certificate for different domain</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">DANGER - possible MITM attack</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Untrusted CA</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Signed by unknown authority</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#fbbf24 !important;">Caution - self-signed or test cert</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Revoked certificate</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Certificate marked as invalid</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">Don't proceed - compromised</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Configure HTTPS:</strong></p>
                <ul>
                    <li>Add an <strong>HTTPS Server application</strong> to a host</li>
                    <li>HTTPS uses <strong>port 443</strong> (not 80)</li>
                    <li>In simulator, HTTPS traffic shows as <strong>encrypted</strong></li>
                    <li>Rogue routers cannot read HTTPS traffic content</li>
                    <li>Compare HTTP vs HTTPS in packet inspection - HTTP shows plain text, HTTPS shows encrypted data</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>Always use HTTPS</strong> for login pages, payments, and private data</li>
                    <li><strong>Look for the padlock 🔒</strong> in your browser's address bar</li>
                    <li><strong>Never ignore certificate warnings</strong> - they indicate security issues</li>
                    <li><strong>Port 443</strong> is standard for HTTPS</li>
                    <li><strong>HTTPS doesn't make a site trustworthy</strong> - it just encrypts the connection (scam sites can have HTTPS too!)</li>
                    <li><strong>Free certificates exist</strong> - Let's Encrypt provides free SSL certificates</li>
                </ul>
            </div>
        `
    },

    ssl_certificates: {
        title: "SSL/TLS Certificates",
        icon: "📜",
        content: `
            <div class="help-section">
                <h3>What is an SSL/TLS Certificate?</h3>
                <p><strong>An SSL/TLS certificate</strong> is a digital document that proves a website's identity and enables encrypted connections. It contains the website's public key and is digitally signed by a trusted Certificate Authority (CA).</p>
                <p style="margin-top:10px; font-size:12px; color:#9ca3af;"><em>Note: "SSL" is the old name, "TLS" is the current standard, but people still say "SSL certificate" out of habit.</em></p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> An SSL certificate is like a passport - it proves who you are (website identity), is issued by a trusted authority (government/CA), and has security features (digital signature) to prevent forgery.
            </div>

            <div class="help-section">
                <h3>What's Inside a Certificate?</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Field</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Subject</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Who the certificate is for</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">www.example.com</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Issuer</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Certificate Authority that signed it</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DigiCert, Let's Encrypt</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Public Key</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Used to encrypt data to server</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2048-bit RSA key</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Valid Dates</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">When certificate is active</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Jan 1 - Dec 31, 2024</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Serial Number</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Unique identifier</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">7F:3A:9B:2C:4E...</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Digital Signature</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">CA's signature proving authenticity</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Encrypted hash</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>How Certificate Verification Works</h3>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
1. Browser connects to https://www.example.com

2. Server sends its SSL certificate

3. Browser checks:
   ✓ Domain name matches? (www.example.com = certificate subject)
   ✓ Certificate not expired? (current date within valid range)
   ✓ Signed by trusted CA? (issuer in browser's trust store)
   ✓ Not revoked? (check CRL or OCSP)

4. Browser verifies CA signature:
   - Uses CA's public key (built into browser)
   - Decrypts certificate signature
   - Compares hash to certificate data
   - Match = certificate is authentic ✅

5. If all checks pass:
   🔒 Green padlock appears
   Encrypted connection established

6. If any check fails:
   ⚠️ Certificate warning shown
   User must decide whether to proceed (usually DON'T!)
                </pre>
            </div>

            <div class="help-section">
                <h3>Certificate Types</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Validation Level</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use Case</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DV (Domain Validated)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Basic - proves domain control</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Blogs, personal sites</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">Free (Let's Encrypt)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>OV (Organization Validated)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Medium - verifies organization</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Business websites</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#fbbf24 !important;">$50-200/year</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>EV (Extended Validation)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">High - thorough org verification</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Banks, e-commerce</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">$200-1000/year</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Wildcard</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Covers all subdomains</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">*.example.com</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#fbbf24 !important;">$100-300/year</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Self-Signed</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f87171 !important;">None - no CA verification</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Testing, internal systems</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">Free (DIY)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Certificate Chain of Trust</h3>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
┌─────────────────────────────┐
│   Root CA Certificate       │  ← Built into browsers/OS
│   (DigiCert Root)           │     Trusted by default
│   Self-signed               │     Lives 20+ years
└──────────┬──────────────────┘
           │ Signs
           ▼
┌─────────────────────────────┐
│   Intermediate CA           │  ← Issued by Root CA
│   (DigiCert SHA2 Secure)    │     Used for day-to-day signing
│   Signed by Root CA         │     Lives 5-10 years
└──────────┬──────────────────┘
           │ Signs
           ▼
┌─────────────────────────────┐
│   End-Entity Certificate    │  ← Your website's certificate
│   (www.example.com)         │     What users see
│   Signed by Intermediate    │     Lives 1-2 years (was 90 days)
└─────────────────────────────┘

Browser verifies entire chain:
1. Check end-entity cert signature (uses intermediate's public key)
2. Check intermediate cert signature (uses root's public key)
3. Verify root cert is in browser's trust store
✅ If all valid = connection trusted
                </pre>
            </div>

            <div class="help-example">
                <strong>🆓 Example: Let's Encrypt (Free Certificates)</strong>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
Let's Encrypt revolutionized SSL by offering:
- <strong>Free DV certificates</strong> for any domain
- <strong>Automated issuance</strong> using ACME protocol
- <strong>90-day validity</strong> (encourages automation)
- <strong>Wildcard support</strong> (*.example.com)

How it works:
1. Install certbot (ACME client)
2. Run: certbot --nginx -d www.example.com
3. Certbot proves domain ownership (HTTP challenge)
4. Let's Encrypt issues certificate
5. Auto-renews before expiration

Result: Free HTTPS for everyone! 🎉
Used by millions of websites.
                </pre>
            </div>

            <div class="help-section">
                <h3>Certificate Revocation</h3>
                <p><strong>Why revoke a certificate?</strong></p>
                <ul>
                    <li><strong>Private key compromised</strong> - Attacker got the server's private key</li>
                    <li><strong>Certificate misissued</strong> - CA made a mistake</li>
                    <li><strong>Organization change</strong> - Company sold, renamed, or closed</li>
                    <li><strong>Security vulnerability</strong> - Weak algorithm discovered</li>
                </ul>
                <p style="margin-top:15px;"><strong>Revocation methods:</strong></p>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Method</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Works</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>CRL (Certificate Revocation List)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Download list of revoked cert serial numbers</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#fbbf24 !important;">Slow, deprecated</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>OCSP (Online Certificate Status Protocol)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Real-time query to CA: "Is cert X valid?"</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">Current standard</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>OCSP Stapling</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Server provides pre-fetched OCSP response</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;">Best - fast & private</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Certificates in NetworkSimulator:</strong></p>
                <ul>
                    <li>HTTPS servers have <strong>simulated certificates</strong></li>
                    <li>Certificate verification shown in packet details</li>
                    <li>Can simulate <strong>certificate warnings</strong> (expired, name mismatch)</li>
                    <li>Compare encrypted (HTTPS) vs plain text (HTTP) traffic</li>
                    <li>Certificate icon appears on HTTPS connections</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>Certificates prove identity</strong> - like a digital passport for websites</li>
                    <li><strong>Public key in cert</strong>, private key stays on server (never shared!)</li>
                    <li><strong>Certificate ≠ encryption alone</strong> - it also verifies you're talking to the right server</li>
                    <li><strong>Free certificates are secure</strong> - Let's Encrypt uses same encryption as paid certs</li>
                    <li><strong>90-day expiration is good</strong> - forces automation and limits compromise window</li>
                    <li><strong>Never ignore cert warnings</strong> - they exist for your protection!</li>
                </ul>
            </div>
        `
    },

    dns_servers: {
        title: "DNS Servers",
        icon: "📇",
        content: `
            <div class="help-section">
                <h3>What is a DNS Server?</h3>
                <p><strong>A DNS server</strong> translates human-readable domain names (like www.example.com) into IP addresses (like 192.168.1.100) that computers use to communicate. It's the "phone book" of the internet.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> A DNS server is like a GPS address book - you type in "Bob's House" (domain name) and it gives you the street address "123 Main St" (IP address) so you can navigate there.
            </div>

            <div class="help-section">
                <h3>How DNS Resolution Works</h3>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
1. User types: www.example.com in browser

2. Computer checks DNS cache:
   - If cached → use cached IP ✅
   - If not → ask DNS server

3. Computer sends DNS query:
   → To: DNS Server (e.g., 8.8.8.8)
   → Question: "What's the IP for www.example.com?"

4. DNS server checks its records:
   - If it knows → responds with IP
   - If it doesn't → forwards to another DNS server

5. DNS response returns:
   ← Answer: "192.168.1.100"

6. Computer connects to 192.168.1.100

7. Result cached for future use (TTL period)
                </pre>
            </div>

            <div class="help-section">
                <h3>DNS Server Types</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Role</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Recursive Resolver</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Does the work for clients - queries other servers</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8.8.8.8 (Google DNS), ISP DNS</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Authoritative Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Holds official DNS records for a domain</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">example.com's nameserver</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Root Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Top of DNS hierarchy - knows TLD servers</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">13 root server clusters (a-m.root-servers.net)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>TLD Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Handles top-level domains (.com, .org, .net)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">.com TLD server</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Forwarding Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Passes queries to another DNS server</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Company DNS → ISP DNS</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>DNS Hierarchy Example</h3>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
Query: www.example.com

┌────────────────────────┐
│   Root Server (.)      │  1. "Who handles .com?"
│   13 clusters worldwide│     → Ask TLD server for .com
└────────┬───────────────┘
         │
         ▼
┌────────────────────────┐
│   TLD Server (.com)    │  2. "Who handles example.com?"
│   VeriSign runs .com   │     → Ask example.com's nameserver
└────────┬───────────────┘
         │
         ▼
┌────────────────────────┐
│ Authoritative Server   │  3. "What's IP for www.example.com?"
│ ns1.example.com        │     → Answer: 192.168.1.100
└────────────────────────┘

Total queries: 3
Time: ~20-100ms (usually cached after first lookup)
                </pre>
            </div>

            <div class="help-example">
                <strong>🏢 Example: Corporate Network DNS</strong>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
Setup:
- Internal DNS: 192.168.1.10 (company.local)
- External DNS: 8.8.8.8 (Google Public DNS)

Internal queries:
User → printer.company.local
Internal DNS: "I know this!"
→ Answer: 192.168.1.50 ✅

External queries:
User → www.google.com
Internal DNS: "Not my domain, forwarding..."
→ Forwards to 8.8.8.8
→ Google DNS responds: 142.250.185.78
→ Internal DNS caches and returns answer ✅

Benefits:
✓ Local names resolve quickly
✓ External queries still work
✓ Caching reduces internet traffic
✓ Control over company DNS records
                </pre>
            </div>

            <div class="help-section">
                <h3>DNS Caching</h3>
                <p><strong>Why caching matters:</strong></p>
                <ul>
                    <li><strong>Speed</strong> - Cached results = instant response (no server query needed)</li>
                    <li><strong>Reduced load</strong> - Fewer queries to DNS servers</li>
                    <li><strong>Offline resilience</strong> - Cached entries work even if DNS server is down</li>
                </ul>
                <p style="margin-top:15px;"><strong>TTL (Time To Live):</strong></p>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">TTL Value</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Cache Duration</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>60 seconds</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1 minute</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Frequently changing IPs (during migration)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>3600 seconds</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1 hour</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Balanced - common default</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>86400 seconds</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">24 hours</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Stable servers that rarely change</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Common DNS Issues</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Problem</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Symptom</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Solution</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DNS server down</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Can't resolve any domains</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Use secondary DNS (8.8.8.8, 1.1.1.1)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Stale cache</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Old IP after server change</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Flush DNS cache: ipconfig /flushdns</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Wrong DNS config</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Some sites work, others don't</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Check DNS server settings in network config</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DNS spoofing</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Site redirects to wrong IP</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Use DNSSEC, trusted DNS servers</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>Popular Public DNS Servers</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Provider</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Primary</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Secondary</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Features</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Google</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8.8.8.8</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8.8.4.4</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Fast, reliable</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Cloudflare</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1.1.1.1</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1.0.0.1</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Privacy-focused, fast</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Quad9</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">9.9.9.9</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">149.112.112.112</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Blocks malware domains</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>OpenDNS</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">208.67.222.222</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">208.67.220.220</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Content filtering options</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Configure DNS:</strong></p>
                <ul>
                    <li>Add a <strong>DNS Server application</strong> to a host</li>
                    <li>Create DNS records mapping domains to IPs</li>
                    <li>Configure clients to use the DNS server's IP</li>
                    <li>DNS uses <strong>port 53</strong> (UDP for queries, TCP for zone transfers)</li>
                    <li>Set up DNS forwarders for unknown domains</li>
                    <li>Watch DNS query/response messages flow through network</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>DNS = Domain Name System</strong> - translates names to IPs</li>
                    <li><strong>Port 53</strong> is standard for DNS (UDP for most queries)</li>
                    <li><strong>Always configure secondary DNS</strong> - redundancy is critical</li>
                    <li><strong>TTL controls caching</strong> - lower = more traffic, higher = slower updates</li>
                    <li><strong>Recursive resolvers do the work</strong>, authoritative servers hold the answers</li>
                    <li><strong>DNS isn't encrypted by default</strong> - DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) provide privacy</li>
                </ul>
            </div>
        `
    },

    dns_records: {
        title: "DNS Record Types",
        icon: "📋",
        content: `
            <div class="help-section">
                <h3>What are DNS Records?</h3>
                <p><strong>DNS records</strong> are entries in a DNS zone file that provide information about a domain. Each record type serves a specific purpose, from mapping domain names to IP addresses to handling email routing.</p>
            </div>

            <div class="help-tip">
                <strong>💡 Analogy:</strong> DNS records are like different types of contact information - A records are street addresses, MX records are mailing addresses, CNAME records are nicknames, and TXT records are notes about the person.
            </div>

            <div class="help-section">
                <h3>Common DNS Record Types</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Record</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;"><strong>A</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Maps domain to IPv4 address</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.100</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#4ade80 !important;"><strong>AAAA</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Maps domain to IPv6 address</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2001:0db8::1</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#60a5fa !important;"><strong>CNAME</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Alias - points to another domain</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">www.example.com</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#a78bfa !important;"><strong>MX</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Mail server for domain</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">10 mail.example.com</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#fbbf24 !important;"><strong>TXT</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Text data (SPF, DKIM, verification)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">"v=spf1 include:_spf.google.com ~all"</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#f472b6 !important;"><strong>NS</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Nameserver for domain</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">ns1.example.com</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#fb923c !important;"><strong>PTR</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Reverse lookup - IP to domain</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">mail.example.com</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#10b981 !important;"><strong>SRV</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Service location (port, priority)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">10 5 5060 sip.example.com</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>A Record (Address Record)</h3>
                <p><strong>Most common record type</strong> - maps a domain name to an IPv4 address.</p>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
Format:
domain.com.    3600    IN    A    192.168.1.100

Breakdown:
- domain.com.     → Domain name (trailing dot = fully qualified)
- 3600            → TTL (1 hour cache)
- IN              → Internet class
- A               → Record type
- 192.168.1.100   → IPv4 address

Example zone file:
example.com.           IN  A  192.168.1.100
www.example.com.       IN  A  192.168.1.100
blog.example.com.      IN  A  192.168.1.101
shop.example.com.      IN  A  192.168.1.102
                </pre>
            </div>

            <div class="help-section">
                <h3>CNAME Record (Canonical Name)</h3>
                <p><strong>Creates an alias</strong> - points one domain to another domain (not an IP).</p>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
Format:
alias.com.    3600    IN    CNAME    target.com.

Example:
www.example.com.       IN  CNAME  example.com.
ftp.example.com.       IN  CNAME  files.example.com.
mail.example.com.      IN  CNAME  mailserver.hosting.com.

⚠️ Important Rules:
✓ CNAME can point to A record
✓ CNAME can point to another CNAME (but avoid chains)
❌ CNAME cannot coexist with other records at same name
❌ Root domain (example.com) cannot be CNAME

Use case: Point multiple subdomains to same server
www, blog, shop → all CNAME to webserver.example.com.
Change webserver IP once, all aliases update automatically!
                </pre>
            </div>

            <div class="help-section">
                <h3>MX Record (Mail Exchange)</h3>
                <p><strong>Directs email</strong> - tells where to send email for a domain.</p>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
Format:
domain.com.    3600    IN    MX    priority mailserver.com.

Example:
example.com.    IN  MX  10  mail1.example.com.
example.com.    IN  MX  20  mail2.example.com.
example.com.    IN  MX  30  backup-mail.example.com.

Priority (lower = preferred):
- 10 = Primary mail server (try first)
- 20 = Secondary (try if primary fails)
- 30 = Backup (last resort)

Email flow:
1. Send to: user@example.com
2. Look up MX records for example.com
3. Try mail1.example.com (priority 10)
4. If down, try mail2.example.com (priority 20)
5. If down, try backup-mail.example.com (priority 30)
                </pre>
            </div>

            <div class="help-section">
                <h3>TXT Record (Text Record)</h3>
                <p><strong>Stores text data</strong> - used for verification, email security (SPF, DKIM), and configuration.</p>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
Common uses:

1. SPF (Sender Policy Framework) - prevent email spoofing:
example.com.  IN  TXT  "v=spf1 include:_spf.google.com ~all"
→ Only Google's servers can send email from @example.com

2. DKIM (DomainKeys Identified Mail) - email signing:
default._domainkey.example.com.  IN  TXT  "v=DKIM1; k=rsa; p=MIGfMA0..."
→ Public key for verifying email signatures

3. Domain verification (prove ownership):
example.com.  IN  TXT  "google-site-verification=abc123xyz..."
→ Google checks this to verify you own the domain

4. DMARC (email policy):
_dmarc.example.com.  IN  TXT  "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com"
→ What to do with emails that fail SPF/DKIM checks
                </pre>
            </div>

            <div class="help-example">
                <strong>🏢 Example: Complete DNS Zone File</strong>
                <pre style="background:#16213e; padding:15px; border-left:3px solid #667eea; overflow-x:auto; color:#e4e4e7;">
; Zone file for example.com
$TTL 3600
example.com.    IN  SOA  ns1.example.com. admin.example.com. (
                        2024011501  ; Serial
                        7200        ; Refresh
                        3600        ; Retry
                        1209600     ; Expire
                        3600 )      ; Minimum TTL

; Nameservers
example.com.           IN  NS   ns1.example.com.
example.com.           IN  NS   ns2.example.com.

; A Records (IPv4 addresses)
example.com.           IN  A    192.168.1.100
www.example.com.       IN  A    192.168.1.100
ns1.example.com.       IN  A    192.168.1.10
ns2.example.com.       IN  A    192.168.1.11

; CNAME Records (aliases)
ftp.example.com.       IN  CNAME  www.example.com.
blog.example.com.      IN  CNAME  www.example.com.

; MX Records (mail servers)
example.com.           IN  MX   10  mail1.example.com.
example.com.           IN  MX   20  mail2.example.com.
mail1.example.com.     IN  A    192.168.1.50
mail2.example.com.     IN  A    192.168.1.51

; TXT Records (SPF, verification)
example.com.           IN  TXT  "v=spf1 mx -all"
_dmarc.example.com.    IN  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"
                </pre>
            </div>

            <div class="help-section">
                <h3>Record Priority Summary</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Need</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use This Record</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Point domain to server</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>A</strong> or <strong>AAAA</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">example.com → 192.168.1.100</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Create subdomain alias</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>CNAME</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">www → example.com</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Receive email</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>MX</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Email → mail.example.com</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Verify domain ownership</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>TXT</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">google-site-verification=...</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Prevent email spoofing</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>TXT</strong> (SPF, DKIM, DMARC)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">v=spf1 mx -all</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Create DNS records:</strong></p>
                <ul>
                    <li>Add a DNS Server to your network</li>
                    <li>Create <strong>A records</strong> for web servers: www.example.com → 192.168.1.100</li>
                    <li>Create <strong>CNAME records</strong> for aliases: blog → www</li>
                    <li>Create <strong>MX records</strong> for mail servers with priorities</li>
                    <li>Test resolution by accessing domains from client hosts</li>
                    <li>Watch DNS queries/responses in packet inspector</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>A records point to IPs</strong>, CNAME records point to domains</li>
                    <li><strong>MX priority</strong> - lower number = higher priority (try first)</li>
                    <li><strong>CNAME limitations</strong> - can't be used at root domain, no other records allowed at same name</li>
                    <li><strong>TXT records are versatile</strong> - verification, email security, configuration</li>
                    <li><strong>TTL affects caching</strong> - longer TTL = slower updates but less DNS traffic</li>
                    <li><strong>Always have multiple MX/NS records</strong> - redundancy prevents downtime</li>
                </ul>
            </div>
        `
    },

    email_servers: {
        title: "Email Servers & Protocols",
        content: `
            <h3>📧 What is an Email Server?</h3>
            <p>An <strong>email server</strong> is a computer that handles sending, receiving, and storing email messages. It's like a post office for digital mail - it processes outgoing mail, receives incoming mail, and stores mail in mailboxes until you're ready to read it!</p>

            <h3>💡 The Post Office Analogy</h3>
            <div class="help-tip">
                <p><strong>Think of email servers like a post office system:</strong></p>
                <ul>
                    <li><strong>SMTP (Outgoing mail)</strong> = Mailman picking up your letters and delivering them to other post offices</li>
                    <li><strong>POP3/IMAP (Incoming mail)</strong> = Your mailbox where you check for new letters</li>
                    <li><strong>Mailbox storage</strong> = The physical mailbox that holds letters until you collect them</li>
                    <li><strong>Mail relay</strong> = Post offices forwarding mail to the correct destination post office</li>
                </ul>
            </div>

            <h3>📬 How Email Delivery Works</h3>
            <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                <div style="color:#10b981;">Step 1: Sending (SMTP)</div>
                <div style="margin-left:20px; color:#e4e4e7;">alice@company.com → Outgoing Mail Server (SMTP)</div>
                <div style="margin-left:20px; color:#9ca3af;">↓ Port 25/587</div>

                <div style="color:#3b82f6; margin-top:10px;">Step 2: DNS Lookup</div>
                <div style="margin-left:20px; color:#e4e4e7;">DNS query: "Where does email for @example.com go?"</div>
                <div style="margin-left:20px; color:#9ca3af;">↓ MX record: mail.example.com (priority 10)</div>

                <div style="color:#f59e0b; margin-top:10px;">Step 3: Relay & Delivery (SMTP)</div>
                <div style="margin-left:20px; color:#e4e4e7;">Company Mail Server → Internet → mail.example.com</div>
                <div style="margin-left:20px; color:#9ca3af;">↓ Spam filtering, virus scanning</div>

                <div style="color:#ef4444; margin-top:10px;">Step 4: Storage</div>
                <div style="margin-left:20px; color:#e4e4e7;">Email stored in bob@example.com's mailbox</div>

                <div style="color:#8b5cf6; margin-top:10px;">Step 5: Retrieval (POP3/IMAP)</div>
                <div style="margin-left:20px; color:#e4e4e7;">Bob's email client → mail.example.com (Port 110/143/993)</div>
                <div style="margin-left:20px; color:#9ca3af;">↓ Download or sync messages</div>
            </div>

            <div class="help-section">
                <h3>📨 Email Protocol Comparison</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Protocol</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Port</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Works</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>SMTP</strong> (Simple Mail Transfer Protocol)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">25, 587 (TLS)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Sending email</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Pushes messages from client to server and between servers</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>POP3</strong> (Post Office Protocol v3)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">110, 995 (SSL)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Receiving email</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Downloads and deletes from server (offline access)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>IMAP</strong> (Internet Message Access Protocol)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">143, 993 (SSL)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Receiving email</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Syncs with server (access from multiple devices)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🔄 POP3 vs IMAP - Key Differences</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Feature</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">POP3</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">IMAP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Email location</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Downloaded to computer, deleted from server</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Kept on server, synced across devices</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Multiple devices</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Each device sees different emails</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ All devices see same emails/folders</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Server storage</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Uses minimal space (emails deleted)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Can fill up server storage</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Offline access</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ All emails downloaded locally</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">⚠️ Only cached emails available offline</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Folder management</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">❌ Local folders only</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Server-side folders sync everywhere</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Best for</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Single device, limited server space, offline work</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Multiple devices, always online, shared access</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>⚙️ Mail Server Components</h3>
                <ul>
                    <li><strong>MTA (Mail Transfer Agent)</strong> - Sends/receives email between servers (SMTP)</li>
                    <li><strong>MDA (Mail Delivery Agent)</strong> - Delivers email to user mailboxes</li>
                    <li><strong>MUA (Mail User Agent)</strong> - Email client software (Outlook, Gmail app, Thunderbird)</li>
                    <li><strong>Mail Queue</strong> - Stores outgoing email waiting to be sent (retries if recipient server unavailable)</li>
                    <li><strong>Spam Filter</strong> - Checks incoming email for spam/viruses (SpamAssassin, ClamAV)</li>
                    <li><strong>Mailbox Storage</strong> - Where received email is stored (Maildir, mbox formats)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🔒 Email Security Features</h3>
                <ul>
                    <li><strong>TLS/SSL Encryption</strong> - Encrypts email in transit (STARTTLS on port 587/993)</li>
                    <li><strong>Authentication (SMTP AUTH)</strong> - Requires username/password to send email (prevents spam relay)</li>
                    <li><strong>SPF Records</strong> - Lists authorized mail servers for domain (prevents spoofing)</li>
                    <li><strong>DKIM Signatures</strong> - Cryptographic signatures proving email authenticity</li>
                    <li><strong>DMARC Policy</strong> - Tells receiving servers what to do with failed authentication</li>
                    <li><strong>Greylisting</strong> - Temporarily rejects email to filter spam (legitimate servers retry)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Set up an email system:</strong></p>
                <ul>
                    <li>Add a <strong>Mail Server</strong> to your network</li>
                    <li>Configure <strong>SMTP settings</strong> (port 25 for server-to-server, 587 for clients)</li>
                    <li>Set up <strong>POP3 (port 110)</strong> or <strong>IMAP (port 143)</strong> for retrieval</li>
                    <li>Create <strong>MX records</strong> in DNS pointing to your mail server</li>
                    <li>Add user mailboxes and configure authentication</li>
                    <li>Test sending email from one host to another</li>
                    <li>Monitor SMTP, POP3, IMAP traffic in packet inspector</li>
                    <li>Configure spam filtering and relay restrictions</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>SMTP is for sending</strong>, POP3/IMAP are for receiving</li>
                    <li><strong>Use IMAP for modern email</strong> - syncs across all your devices</li>
                    <li><strong>Port 25 is for server-to-server</strong>, port 587 for authenticated client sending</li>
                    <li><strong>MX records are critical</strong> - they tell the internet where to deliver email for your domain</li>
                    <li><strong>Always use TLS encryption</strong> - port 587 (SMTP), 993 (IMAP), 995 (POP3)</li>
                    <li><strong>Spam filters are essential</strong> - 80%+ of email is spam without filtering</li>
                    <li><strong>Queue management matters</strong> - mail servers retry delivery for days before giving up</li>
                </ul>
            </div>
        `
    },

    email_routing: {
        title: "Email Routing & Delivery",
        content: `
            <h3>🚚 What is Email Routing?</h3>
            <p><strong>Email routing</strong> is the process of directing email messages from sender to recipient across the internet. Unlike browsing a website where you connect directly to a server, email typically passes through multiple mail servers before reaching its destination - like a package being handed off between postal facilities!</p>

            <h3>💡 The Package Delivery Analogy</h3>
            <div class="help-tip">
                <p><strong>Email routing is like shipping a package:</strong></p>
                <ul>
                    <li><strong>You (sender)</strong> = Drop package at local post office</li>
                    <li><strong>Local post office (your mail server)</strong> = Processes and forwards to regional hub</li>
                    <li><strong>Regional hubs (relay servers)</strong> = Route package toward destination</li>
                    <li><strong>Destination post office (recipient's mail server)</strong> = Receives package and puts in recipient's mailbox</li>
                    <li><strong>Recipient</strong> = Checks mailbox and retrieves package</li>
                </ul>
                <p>The package doesn't go directly - it hops through multiple facilities that know how to get it closer to its destination!</p>
            </div>

            <h3>📬 Complete Email Routing Process</h3>
            <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                <div style="color:#10b981; font-weight:bold;">Scenario: alice@company.com → bob@customer.net</div>
                <div style="margin-top:10px; color:#e4e4e7;">
                    <div style="color:#3b82f6;">1. COMPOSITION</div>
                    <div style="margin-left:20px;">Alice writes email in Outlook/Gmail</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓</div>

                    <div style="color:#3b82f6; margin-top:10px;">2. SUBMISSION (SMTP Port 587)</div>
                    <div style="margin-left:20px;">Outlook → smtp.company.com (authenticated)</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓</div>

                    <div style="color:#3b82f6; margin-top:10px;">3. DNS MX LOOKUP</div>
                    <div style="margin-left:20px;">Query: "What mail server handles @customer.net?"</div>
                    <div style="margin-left:20px;">Response: mail.customer.net (priority 10)</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓</div>

                    <div style="color:#3b82f6; margin-top:10px;">4. RELAY (SMTP Port 25)</div>
                    <div style="margin-left:20px;">smtp.company.com → mail.customer.net</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓</div>

                    <div style="color:#3b82f6; margin-top:10px;">5. FILTERING & DELIVERY</div>
                    <div style="margin-left:20px;">Spam check → Virus scan → Deliver to bob's mailbox</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓</div>

                    <div style="color:#3b82f6; margin-top:10px;">6. RETRIEVAL (IMAP Port 993)</div>
                    <div style="margin-left:20px;">Bob's phone → mail.customer.net → Download email</div>
                </div>
            </div>

            <div class="help-section">
                <h3>📋 MX Records - The Routing Directory</h3>
                <p><strong>MX (Mail Exchange) records</strong> in DNS tell the internet which servers handle email for a domain. They're like a phone book for email servers!</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Domain</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Priority</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Mail Server</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">example.com</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>10</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">mail1.example.com</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Primary mail server (try first)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">example.com</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>20</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">mail2.example.com</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Backup (use if primary fails)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">example.com</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>30</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">mail3.example.com</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Secondary backup</td>
                        </tr>
                    </tbody>
                </table>

                <p><strong>How priority works:</strong> Lower number = higher priority. Try mail1 first (priority 10), if it's down try mail2 (priority 20), etc.</p>
            </div>

            <div class="help-section">
                <h3>🔄 Relay Servers</h3>
                <p>A <strong>relay server</strong> is an intermediate mail server that forwards email toward its destination. Think of it like transfer stations in a subway system!</p>

                <p><strong>Types of relays:</strong></p>
                <ul>
                    <li><strong>Smart Host</strong> - Company mail server that routes all outgoing email through ISP's mail server (helps with spam reputation)</li>
                    <li><strong>Gateway</strong> - Sits at network edge, scans email for viruses/spam before forwarding</li>
                    <li><strong>Backup MX</strong> - Accepts email when primary server is down, holds it until primary is available</li>
                    <li><strong>Open Relay</strong> - ⚠️ Misconfigured server that forwards email for anyone (exploited by spammers - always disable!)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🛡️ Spam Filtering in Email Routing</h3>
                <p>Mail servers check email at multiple points to catch spam before it reaches users:</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Check Point</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">What's Checked</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Action if Spam Detected</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Connection</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Sender IP in blacklists (RBL, DNSBL)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Reject connection immediately</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>SMTP Greeting</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Valid hostname, SPF records</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Reject or greylist</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Headers</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DKIM signature, sender reputation</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Add spam score or quarantine</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Content</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Spam keywords, suspicious links, attachments</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Mark as spam or block</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Attachments</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Virus scan, malware detection</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Quarantine or delete</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>⏱️ Greylisting - Temporary Rejection</h3>
                <p><strong>Greylisting</strong> is a spam filtering technique where the server temporarily rejects email on first attempt:</p>

                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                    <div style="color:#f59e0b;">First Attempt (from new sender):</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Spammer: "Here's my spam email!"</div>
                    <div style="margin-left:20px; color:#9ca3af;">Server: "450 Try again later" (temporary failure)</div>
                    <div style="margin-left:20px; color:#ef4444;">Spammer gives up (too slow, moves to next victim)</div>

                    <div style="color:#10b981; margin-top:15px;">Retry from Legitimate Server:</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Legit Server: "Here's the email" (retries in 5-15 minutes)</div>
                    <div style="margin-left:20px; color:#9ca3af;">Server: "250 OK, accepted" (sender now whitelisted)</div>
                    <div style="margin-left:20px; color:#10b981;">Future emails from this sender accepted immediately</div>
                </div>

                <p><strong>Why it works:</strong> Legitimate mail servers retry delivery according to SMTP standards. Spammers typically don't retry because it slows them down too much!</p>
            </div>

            <div class="help-section">
                <h3>🔍 Email Header Analysis</h3>
                <p>Email headers show the complete routing path - useful for troubleshooting delivery issues:</p>

                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:12px;">
                    <div style="color:#9ca3af;">Received: from mail.customer.net (1.2.3.4) by inbox.company.com</div>
                    <div style="color:#9ca3af;">  Tue, 13 Aug 2025 14:32:10 -0500</div>
                    <div style="color:#9ca3af;">Received: from smtp.sender.org (5.6.7.8) by mail.customer.net</div>
                    <div style="color:#9ca3af;">  Tue, 13 Aug 2025 14:32:05 -0500</div>
                    <div style="color:#10b981; margin-top:10px;">↑ Read from bottom to top - shows email's journey!</div>
                </div>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Set up email routing:</strong></p>
                <ul>
                    <li>Create <strong>multiple mail servers</strong> for different domains</li>
                    <li>Configure <strong>MX records</strong> with different priorities (10, 20, 30)</li>
                    <li>Set up a <strong>relay/smart host</strong> for outgoing mail</li>
                    <li>Enable <strong>spam filtering</strong> on receiving servers</li>
                    <li>Test <strong>MX failover</strong> - disable primary server, watch backup accept mail</li>
                    <li>Configure <strong>greylisting</strong> and observe retry behavior</li>
                    <li>Monitor email <strong>routing hops</strong> in packet inspector</li>
                    <li>Test <strong>SPF/DKIM</strong> authentication and rejection</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>MX priority: lower = better</strong> - priority 10 tried before priority 20</li>
                    <li><strong>Always have multiple MX records</strong> - redundancy prevents lost email during outages</li>
                    <li><strong>Never run an open relay</strong> - you'll become a spam source and get blacklisted</li>
                    <li><strong>Greylisting reduces spam by 70%+</strong> but delays first-time senders by 5-15 minutes</li>
                    <li><strong>SPF, DKIM, DMARC work together</strong> - SPF verifies server, DKIM proves authenticity, DMARC sets policy</li>
                    <li><strong>Mail servers queue and retry</strong> - delivery can take hours if recipient server is temporarily down</li>
                    <li><strong>Read email headers bottom-to-top</strong> - newest hops added at the top</li>
                </ul>
            </div>
        `
    },

    dhcp_servers: {
        title: "DHCP Servers",
        content: `
            <h3>🏠 What is a DHCP Server?</h3>
            <p>A <strong>DHCP (Dynamic Host Configuration Protocol) server</strong> automatically assigns IP addresses and network configuration to devices when they connect to a network. It's like an automatic receptionist that hands out name tags and building maps when you arrive at an office!</p>

            <h3>💡 The Hotel Check-In Analogy</h3>
            <div class="help-tip">
                <p><strong>DHCP is like checking into a hotel:</strong></p>
                <ul>
                    <li><strong>You arrive</strong> = Device connects to network</li>
                    <li><strong>Front desk (DHCP server)</strong> = Checks available rooms and assigns you one</li>
                    <li><strong>Room number (IP address)</strong> = Your unique location in the hotel</li>
                    <li><strong>WiFi password (DNS servers)</strong> = Information you need to access services</li>
                    <li><strong>Map to restaurant (default gateway)</strong> = How to get to other places (internet)</li>
                    <li><strong>Check-out time (lease duration)</strong> = How long you can keep the room before renewing</li>
                </ul>
                <p>When you check out, the hotel can give your room to the next guest - just like DHCP reclaims IP addresses!</p>
            </div>

            <h3>🔄 How DHCP Works - The DORA Process</h3>
            <p>DHCP uses a four-step process called <strong>DORA</strong>:</p>

            <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                <div style="color:#10b981; font-weight:bold;">1. DISCOVER (Broadcast)</div>
                <div style="margin-left:20px; color:#e4e4e7;">New Device: "Hello network! Can anyone give me an IP address?"</div>
                <div style="margin-left:20px; color:#9ca3af;">↓ Broadcast to 255.255.255.255 (everyone on network hears this)</div>

                <div style="color:#3b82f6; font-weight:bold; margin-top:10px;">2. OFFER (Unicast)</div>
                <div style="margin-left:20px; color:#e4e4e7;">DHCP Server: "Sure! You can have 192.168.1.105 for 24 hours"</div>
                <div style="margin-left:20px; color:#9ca3af;">↓ Also sends: gateway, DNS servers, subnet mask</div>

                <div style="color:#f59e0b; font-weight:bold; margin-top:10px;">3. REQUEST (Broadcast)</div>
                <div style="margin-left:20px; color:#e4e4e7;">Device: "Thanks! I accept 192.168.1.105 from Server1"</div>
                <div style="margin-left:20px; color:#9ca3af;">↓ Broadcast so other DHCP servers know to withdraw their offers</div>

                <div style="color:#8b5cf6; font-weight:bold; margin-top:10px;">4. ACKNOWLEDGE (Unicast)</div>
                <div style="margin-left:20px; color:#e4e4e7;">DHCP Server: "Confirmed! That IP is yours. Lease starts now."</div>
                <div style="margin-left:20px; color:#10b981;">Device now has full network configuration and can communicate!</div>
            </div>

            <div class="help-section">
                <h3>⚙️ DHCP Server Configuration</h3>
                <p>DHCP servers need to know what addresses to give out and what network settings to provide:</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Setting</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Scope/Pool</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.100 - 192.168.1.200</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Range of IP addresses available to assign</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Subnet Mask</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">255.255.255.0</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Defines network size (what's local vs remote)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Default Gateway</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.1</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Router address for internet access</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>DNS Servers</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8.8.8.8, 8.8.4.4</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Where to look up domain names</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Lease Duration</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">24 hours</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">How long before device must renew</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Domain Name</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">company.local</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DNS suffix for local network</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>📋 Lease Management</h3>
                <p>DHCP <strong>leases</strong> are temporary - devices don't own their IP address forever!</p>

                <p><strong>Lease Lifecycle:</strong></p>
                <ul>
                    <li><strong>Assignment (T=0)</strong> - Device receives IP address with 24-hour lease</li>
                    <li><strong>Renewal (T=50% = 12 hours)</strong> - Device asks server to extend lease</li>
                    <li><strong>Rebind (T=87.5% = 21 hours)</strong> - If renewal failed, broadcast request to any DHCP server</li>
                    <li><strong>Expiration (T=100% = 24 hours)</strong> - If no renewal, IP released and device loses network access</li>
                    <li><strong>Release (manual)</strong> - Device voluntarily gives up IP when disconnecting</li>
                </ul>

                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                    <div style="color:#10b981;">Monday 9am: Laptop connects → Gets 192.168.1.105 (lease: 24hrs)</div>
                    <div style="color:#3b82f6; margin-top:5px;">Monday 9pm (12hrs later): Laptop renews → Lease extended to Tuesday 9pm</div>
                    <div style="color:#f59e0b; margin-top:5px;">Tuesday 6:30pm (21hrs): Laptop renews again → Lease extended to Wednesday 6:30pm</div>
                    <div style="color:#9ca3af; margin-top:5px;">(Continues as long as laptop stays connected and server is available)</div>
                </div>
            </div>

            <div class="help-section">
                <h3>🎯 Reservations (Static DHCP)</h3>
                <p><strong>Reservations</strong> ensure specific devices always get the same IP address - best of both worlds!</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">MAC Address</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Reserved IP</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Device</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">00:11:22:33:44:55</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.10</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Web Server</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">AA:BB:CC:DD:EE:FF</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.20</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Printer</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">11:22:33:44:55:66</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.30</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Security Camera</td>
                        </tr>
                    </tbody>
                </table>

                <p><strong>Benefits:</strong></p>
                <ul>
                    <li>Servers/printers get consistent IPs without manual static configuration</li>
                    <li>Central management - change IP addresses from DHCP server instead of visiting each device</li>
                    <li>Devices still get DNS servers, gateway automatically</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🔍 DHCP Options</h3>
                <p>Beyond IP addresses, DHCP can configure many network settings:</p>

                <ul>
                    <li><strong>Option 3</strong> - Default Gateway (router IP)</li>
                    <li><strong>Option 6</strong> - DNS Servers (comma-separated list)</li>
                    <li><strong>Option 15</strong> - DNS Domain Name (e.g., company.local)</li>
                    <li><strong>Option 42</strong> - NTP Time Servers (for clock synchronization)</li>
                    <li><strong>Option 51</strong> - Lease Time (in seconds)</li>
                    <li><strong>Option 66</strong> - TFTP Server (for network booting/phone provisioning)</li>
                    <li><strong>Option 150</strong> - TFTP Server List (Cisco phones)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>⚠️ DHCP Security Concerns</h3>
                <p>DHCP servers trust anyone - watch out for these issues:</p>

                <ul>
                    <li><strong>Rogue DHCP Servers</strong> - Attacker sets up fake DHCP server to intercept traffic (DHCP snooping prevents this)</li>
                    <li><strong>DHCP Starvation</strong> - Attacker requests all available IPs, denying service to legitimate users</li>
                    <li><strong>No Authentication</strong> - DHCP doesn't verify identity, anyone can get an IP</li>
                    <li><strong>Race Conditions</strong> - If multiple DHCP servers exist, first response wins (rogue server can win if faster)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Set up a DHCP server:</strong></p>
                <ul>
                    <li>Add a <strong>DHCP Server</strong> to your network</li>
                    <li>Configure the <strong>scope</strong> (e.g., 192.168.1.100-200)</li>
                    <li>Set <strong>subnet mask, gateway, DNS servers</strong></li>
                    <li>Configure <strong>lease duration</strong> (shorter = more DHCP traffic)</li>
                    <li>Create <strong>reservations</strong> for servers/printers</li>
                    <li>Add client hosts and watch them <strong>get automatic IPs</strong></li>
                    <li>Monitor the <strong>DORA process</strong> in packet inspector</li>
                    <li>Test <strong>lease renewal</strong> and <strong>release</strong></li>
                    <li>Try adding a <strong>rogue DHCP server</strong> to see race conditions</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>DORA = Discover, Offer, Request, Acknowledge</strong> - the four-step handshake</li>
                    <li><strong>Discover and Request are broadcasts</strong> - all devices hear them</li>
                    <li><strong>Leases are temporary</strong> - devices must renew at 50% and 87.5% of lease time</li>
                    <li><strong>Reservations combine static + dynamic</strong> - predictable IPs with centralized management</li>
                    <li><strong>Scope must not overlap</strong> with manually configured static IPs (reserve 1-99 for static, 100-254 for DHCP)</li>
                    <li><strong>Shorter leases</strong> = more DHCP traffic but faster IP reclamation</li>
                    <li><strong>Always secure against rogue DHCP</strong> - use DHCP snooping on switches</li>
                </ul>
            </div>
        `
    },

    dhcp_scopes: {
        title: "DHCP Scopes & Options",
        content: `
            <h3>🎯 What is a DHCP Scope?</h3>
            <p>A <strong>DHCP scope</strong> is a pool of IP addresses that a DHCP server can assign to devices, along with the network configuration options those devices need. Think of it like a hotel reserving rooms 100-200 for walk-in guests - the front desk knows exactly which rooms are available and what amenities come with them!</p>

            <h3>💡 The Valet Parking Analogy</h3>
            <div class="help-tip">
                <p><strong>DHCP scopes are like valet parking zones:</strong></p>
                <ul>
                    <li><strong>Parking spaces (IP addresses)</strong> = Limited number of spots available (e.g., spots 100-200)</li>
                    <li><strong>Valet rules (scope options)</strong> = Where's the exit? (gateway), Where's the elevator? (DNS), How long can you park? (lease time)</li>
                    <li><strong>Reserved spots (DHCP reservations)</strong> = CEO always gets spot #10</li>
                    <li><strong>Exclusions</strong> = Spots 1-99 blocked off for executive parking (static IPs)</li>
                    <li><strong>Multiple zones (multiple scopes)</strong> = Level 1 uses spots 100-200, Level 2 uses spots 300-400</li>
                </ul>
            </div>

            <h3>📊 Scope Components</h3>
            <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                <div style="color:#10b981; font-weight:bold;">SCOPE: "Office Network"</div>
                <div style="margin-left:20px; color:#e4e4e7; margin-top:5px;">
                    <div style="color:#3b82f6;">IP Range (Pool):</div>
                    <div style="margin-left:20px;">Start: 192.168.1.100</div>
                    <div style="margin-left:20px;">End: 192.168.1.200</div>
                    <div style="margin-left:20px; color:#9ca3af;">(101 addresses available)</div>

                    <div style="color:#f59e0b; margin-top:10px;">Exclusions:</div>
                    <div style="margin-left:20px;">192.168.1.150-192.168.1.160 (reserved for servers)</div>
                    <div style="margin-left:20px; color:#9ca3af;">(Now only 90 addresses available for DHCP)</div>

                    <div style="color:#8b5cf6; margin-top:10px;">Reservations:</div>
                    <div style="margin-left:20px;">192.168.1.110 → MAC: AA:BB:CC:DD:EE:FF (Printer)</div>
                    <div style="margin-left:20px;">192.168.1.120 → MAC: 11:22:33:44:55:66 (Camera)</div>

                    <div style="color:#ef4444; margin-top:10px;">Scope Options:</div>
                    <div style="margin-left:20px;">Subnet Mask: 255.255.255.0</div>
                    <div style="margin-left:20px;">Gateway: 192.168.1.1</div>
                    <div style="margin-left:20px;">DNS Servers: 8.8.8.8, 8.8.4.4</div>
                    <div style="margin-left:20px;">Lease Duration: 8 hours</div>
                    <div style="margin-left:20px;">Domain Name: office.local</div>
                </div>
            </div>

            <div class="help-section">
                <h3>🔢 Scope Planning - Best Practices</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">IP Range</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Why</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.1</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Gateway/Router</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Convention - .1 is always the router</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.2-99</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Static IPs (servers, printers, network devices)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Devices that need fixed addresses</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.100-200</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DHCP scope (desktops, laptops, phones)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Dynamic devices that come and go</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.201-254</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Reserved for future expansion</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Room to grow without renumbering</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>⚙️ Common DHCP Options</h3>
                <p>DHCP options configure network settings beyond just IP addresses. These are standardized option codes defined by IETF:</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Option</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Name</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Purpose</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Example Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>1</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Subnet Mask</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Defines network size</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">255.255.255.0</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>3</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Default Gateway</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Router for internet access</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.1</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>6</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DNS Servers</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Domain name resolution</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">8.8.8.8, 8.8.4.4</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>15</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">DNS Domain Name</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Default search suffix</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">company.local</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>42</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">NTP Time Servers</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Clock synchronization</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">time.nist.gov</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>51</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Lease Time</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">How long IP is valid</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">86400 seconds (24 hrs)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>66</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TFTP Server Name</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Network booting (PXE)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">boot.company.local</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>67</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Boot File Name</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">PXE boot image path</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">pxelinux.0</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>150</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TFTP Server List</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Cisco IP phones</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">192.168.1.10</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🏢 Multiple Scopes - When and Why</h3>
                <p>You might create multiple DHCP scopes on the same server for different purposes:</p>

                <p><strong>Scenario 1: Multiple VLANs</strong></p>
                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                    <div style="color:#10b981;">Scope 1: "Office" - VLAN 10</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Range: 192.168.10.100-200</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Gateway: 192.168.10.1</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Lease: 8 hours (devices always on)</div>

                    <div style="color:#3b82f6; margin-top:10px;">Scope 2: "Guest WiFi" - VLAN 20</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Range: 192.168.20.100-254</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Gateway: 192.168.20.1</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Lease: 1 hour (high turnover)</div>
                    <div style="margin-left:20px; color:#9ca3af;">No DNS Domain (isolated network)</div>

                    <div style="color:#f59e0b; margin-top:10px;">Scope 3: "IoT Devices" - VLAN 30</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Range: 192.168.30.50-100</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Gateway: 192.168.30.1</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Lease: 7 days (devices rarely move)</div>
                </div>

                <p><strong>Scenario 2: Different Lease Times for Different Device Types</strong></p>
                <ul>
                    <li><strong>Short leases (1-4 hours)</strong> - Guest networks, conference rooms, high turnover areas</li>
                    <li><strong>Medium leases (8-24 hours)</strong> - Office computers, standard networks</li>
                    <li><strong>Long leases (7+ days)</strong> - IoT devices, printers, stable infrastructure</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>⚠️ Scope Exhaustion</h3>
                <p>What happens when your DHCP scope runs out of addresses?</p>

                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                    <div style="color:#ef4444; font-weight:bold;">Problem: Scope Exhaustion</div>
                    <div style="margin-left:20px; color:#e4e4e7; margin-top:5px;">
                        Scope: 192.168.1.100-150 (51 addresses)
                    </div>
                    <div style="margin-left:20px; color:#e4e4e7;">Lease time: 24 hours</div>
                    <div style="margin-left:20px; color:#ef4444; margin-top:5px;">52nd device arrives → No IP available!</div>
                    <div style="margin-left:20px; color:#9ca3af;">Device gets 169.254.x.x (APIPA) and can't reach network</div>

                    <div style="color:#10b981; font-weight:bold; margin-top:15px;">Solutions:</div>
                    <div style="margin-left:20px; color:#e4e4e7;">✅ Expand scope range (100-200 = 101 addresses)</div>
                    <div style="margin-left:20px; color:#e4e4e7;">✅ Reduce lease time (12 hours = faster reclamation)</div>
                    <div style="margin-left:20px; color:#e4e4e7;">✅ Add second DHCP server with 80/20 split</div>
                    <div style="margin-left:20px; color:#e4e4e7;">✅ Force lease releases for offline devices</div>
                </div>
            </div>

            <div class="help-section">
                <h3>🔐 Scope Options Hierarchy</h3>
                <p>DHCP options can be set at different levels - most specific wins:</p>

                <ol>
                    <li><strong>Server Options</strong> - Apply to all scopes on the server (least specific)</li>
                    <li><strong>Scope Options</strong> - Apply only to devices in this scope</li>
                    <li><strong>Reservation Options</strong> - Apply only to specific device (most specific, overrides all)</li>
                </ol>

                <p><strong>Example:</strong> DNS server configuration</p>
                <ul>
                    <li>Server level: 8.8.8.8 (Google DNS for all scopes)</li>
                    <li>Office scope: 192.168.1.10 (internal DNS server - overrides server option)</li>
                    <li>IT Director's laptop reservation: 1.1.1.1 (Cloudflare DNS - overrides scope option)</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Configure DHCP scopes:</strong></p>
                <ul>
                    <li>Create a DHCP server and define a <strong>scope range</strong> (e.g., 100-200)</li>
                    <li>Set <strong>scope options</strong>: subnet mask, gateway, DNS servers</li>
                    <li>Configure <strong>lease duration</strong> appropriate for network type</li>
                    <li>Add <strong>exclusions</strong> for static IP ranges (1-99)</li>
                    <li>Create <strong>reservations</strong> for specific devices by MAC address</li>
                    <li>Test <strong>scope exhaustion</strong> - add more devices than scope allows</li>
                    <li>Create <strong>multiple scopes</strong> for different VLANs/subnets</li>
                    <li>Monitor <strong>DHCP lease database</strong> to see active assignments</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>Scope = Pool + Options</strong> - both address range and configuration settings</li>
                    <li><strong>Plan your IP scheme</strong> - static IPs first (1-99), DHCP pool second (100-200), expansion room last</li>
                    <li><strong>Exclusions prevent conflicts</strong> - exclude ranges you manually assign</li>
                    <li><strong>Lease time is a balance</strong> - shorter = faster reclamation but more DHCP traffic</li>
                    <li><strong>Always leave headroom</strong> - don't make scope exactly the number of devices you have</li>
                    <li><strong>Monitor scope utilization</strong> - expand before exhaustion, not after</li>
                    <li><strong>Document reservations</strong> - you'll forget why MAC XX:XX:XX gets IP .110 in 6 months!</li>
                </ul>
            </div>
        `
    },

    file_servers: {
        title: "File Servers & Network Storage",
        content: `
            <h3>📁 What is a File Server?</h3>
            <p>A <strong>file server</strong> is a computer that stores files and makes them available to other computers on the network. It's like a central filing cabinet where everyone in the office can store, access, and share documents - much better than emailing files back and forth or using USB drives!</p>

            <h3>💡 The Library Analogy</h3>
            <div class="help-tip">
                <p><strong>File servers are like a library system:</strong></p>
                <ul>
                    <li><strong>Library building (server)</strong> = Centralized location where all books (files) are stored</li>
                    <li><strong>Sections/shelves (shares/folders)</strong> = Organized areas for different types of content</li>
                    <li><strong>Library card (authentication)</strong> = Prove who you are to check out books</li>
                    <li><strong>Access rules (permissions)</strong> = Some books anyone can read, some require special clearance</li>
                    <li><strong>Check-out system (file locking)</strong> = Only one person can edit a book at a time</li>
                    <li><strong>Librarian (file server software)</strong> = Manages requests, enforces rules, tracks who has what</li>
                </ul>
            </div>

            <h3>📂 How File Sharing Works</h3>
            <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                <div style="color:#10b981; font-weight:bold;">User Opens Shared File:</div>
                <div style="margin-left:20px; color:#e4e4e7; margin-top:5px;">
                    <div style="color:#3b82f6;">1. Connection Request</div>
                    <div style="margin-left:20px;">User: "I want to connect to \\\\FileServer\\Documents"</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓ SMB/CIFS protocol</div>

                    <div style="color:#3b82f6; margin-top:10px;">2. Authentication</div>
                    <div style="margin-left:20px;">Server: "Who are you? (username/password)"</div>
                    <div style="margin-left:20px;">User provides credentials</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓ Checks Active Directory or local accounts</div>

                    <div style="color:#3b82f6; margin-top:10px;">3. Authorization</div>
                    <div style="margin-left:20px;">Server checks: "Does this user have permission?"</div>
                    <div style="margin-left:20px; color:#10b981;">✅ Read: Yes, Write: Yes, Delete: No</div>

                    <div style="color:#3b82f6; margin-top:10px;">4. File Access</div>
                    <div style="margin-left:20px;">Server sends file data over network</div>
                    <div style="margin-left:20px;">User opens file in Word/Excel/etc.</div>

                    <div style="color:#3b82f6; margin-top:10px;">5. File Locking</div>
                    <div style="margin-left:20px;">Server locks file so others can't edit simultaneously</div>
                    <div style="margin-left:20px; color:#9ca3af;">Other users see "File in use by alice@company.com"</div>
                </div>
            </div>

            <div class="help-section">
                <h3>🔄 File Sharing Protocols</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Protocol</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Port</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Platform</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Best For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>SMB/CIFS</strong> (Server Message Block)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">445 (SMB), 139 (NetBIOS)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Windows (also Linux/Mac)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Windows file shares, active directory</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>NFS</strong> (Network File System)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">2049</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Linux/Unix (Mac support)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Unix environments, high performance</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>FTP</strong> (File Transfer Protocol)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">20, 21</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Cross-platform</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Public file downloads, web hosting</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>SFTP/SCP</strong> (SSH File Transfer)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">22</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Cross-platform</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Secure file transfer (encrypted)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>AFP</strong> (Apple Filing Protocol)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">548</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">macOS (legacy)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Mac-only networks (deprecated)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>🔒 File Server Permissions</h3>
                <p>Permissions control who can do what with files and folders:</p>

                <p><strong>Common Permission Levels:</strong></p>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Permission</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">What You Can Do</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Read</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">View files, open documents, see folder contents</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Public documents, policies, reference materials</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Write</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Edit files, create new files, modify existing</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Team collaboration folders</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Delete</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Remove files and folders</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Managers cleaning up old files</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Full Control</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Do anything + change permissions</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">IT admins, folder owners</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>List Folder Contents</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">See what's in folder but not open files</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Browse without access to contents</td>
                        </tr>
                    </tbody>
                </table>

                <p><strong>Example Permission Setup:</strong></p>
                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                    <div style="color:#10b981;">\\\\FileServer\\HR\\</div>
                    <div style="margin-left:20px; color:#e4e4e7;">HR Team → Full Control (read, write, delete)</div>
                    <div style="margin-left:20px; color:#e4e4e7;">All Employees → Read Only (can view policies)</div>
                    <div style="margin-left:20px; color:#ef4444;">Everyone Else → No Access</div>

                    <div style="color:#3b82f6; margin-top:10px;">\\\\FileServer\\Projects\\Marketing\\</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Marketing Team → Write (can add/edit files)</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Executives → Read (can review work)</div>
                    <div style="margin-left:20px; color:#ef4444;">Other Departments → No Access</div>
                </div>
            </div>

            <div class="help-section">
                <h3>💾 File Server Benefits</h3>
                <ul>
                    <li><strong>Centralized Storage</strong> - All files in one place, not scattered across laptops</li>
                    <li><strong>Backup & Recovery</strong> - IT backs up server nightly, recover deleted files</li>
                    <li><strong>Version Control</strong> - Some file servers keep previous versions of documents</li>
                    <li><strong>Collaboration</strong> - Multiple people can work on shared projects</li>
                    <li><strong>Security</strong> - Granular permissions, encryption, audit logs</li>
                    <li><strong>Access Anywhere</strong> - VPN to office network, access files from home</li>
                    <li><strong>No Emailing Files</strong> - Share links instead of sending attachments</li>
                    <li><strong>Disk Quotas</strong> - Limit how much space each user can consume</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>📊 File Locking - Preventing Conflicts</h3>
                <p><strong>File locking</strong> prevents two people from editing the same file simultaneously, which would cause conflicts:</p>

                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                    <div style="color:#10b981;">Scenario: Two users edit Budget.xlsx</div>
                    <div style="margin-top:10px; color:#e4e4e7;">
                        <div style="color:#3b82f6;">10:00 AM - Alice opens Budget.xlsx</div>
                        <div style="margin-left:20px;">Server: "File locked for editing by alice@company.com"</div>

                        <div style="color:#f59e0b; margin-top:10px;">10:05 AM - Bob tries to open Budget.xlsx</div>
                        <div style="margin-left:20px;">Server: "File is locked. Open as read-only or wait?"</div>
                        <div style="margin-left:20px; color:#9ca3af;">Bob chooses "Read-only" - can view but not edit</div>

                        <div style="color:#10b981; margin-top:10px;">10:30 AM - Alice saves and closes file</div>
                        <div style="margin-left:20px;">Server: "Lock released. File available for editing."</div>

                        <div style="color:#8b5cf6; margin-top:10px;">10:31 AM - Bob opens Budget.xlsx again</div>
                        <div style="margin-left:20px;">Server: "File locked for editing by bob@company.com"</div>
                        <div style="margin-left:20px; color:#10b981;">Bob can now edit Alice's changes</div>
                    </div>
                </div>
            </div>

            <div class="help-section">
                <h3>🗂️ Common File Server Shares</h3>
                <p>Typical shared folders you might find on a company file server:</p>

                <ul>
                    <li><strong>\\\\FileServer\\Public</strong> - Company-wide documents everyone can access</li>
                    <li><strong>\\\\FileServer\\Departments\\</strong> - Separate folders for HR, IT, Sales, etc.</li>
                    <li><strong>\\\\FileServer\\Users\\username</strong> - Personal drive for each employee</li>
                    <li><strong>\\\\FileServer\\Projects\\</strong> - Active project collaboration spaces</li>
                    <li><strong>\\\\FileServer\\Archives\\</strong> - Old files, read-only for compliance</li>
                    <li><strong>\\\\FileServer\\Software\\</strong> - Installers, drivers, IT tools</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Set up a file server:</strong></p>
                <ul>
                    <li>Add a <strong>File Server</strong> to your network</li>
                    <li>Configure <strong>SMB/CIFS service</strong> on port 445</li>
                    <li>Create <strong>shared folders</strong> with different names</li>
                    <li>Set <strong>permissions</strong> for users and groups</li>
                    <li>Add client computers and <strong>connect to shares</strong></li>
                    <li>Test <strong>file access</strong> - read, write, delete operations</li>
                    <li>Monitor <strong>SMB traffic</strong> in packet inspector</li>
                    <li>Simulate <strong>authentication failures</strong> with wrong credentials</li>
                    <li>Test <strong>file locking</strong> - multiple users accessing same file</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>SMB/CIFS for Windows</strong>, NFS for Linux - use the right protocol for your platform</li>
                    <li><strong>Permissions are cumulative</strong> - if you're in multiple groups, you get the most permissive access</li>
                    <li><strong>File locking prevents conflicts</strong> - first person to open gets edit rights</li>
                    <li><strong>UNC paths look like</strong> \\\\ServerName\\ShareName\\Folder\\File.txt</li>
                    <li><strong>Port 445 is SMB</strong>, port 139 is legacy NetBIOS (prefer 445)</li>
                    <li><strong>Always back up file servers</strong> - they're critical infrastructure</li>
                    <li><strong>Map network drives</strong> - assign \\\\FileServer\\Share to drive letter (like Z:)</li>
                </ul>
            </div>
        `
    },

    database_servers: {
        title: "Database Servers",
        content: `
            <h3>🗄️ What is a Database Server?</h3>
            <p>A <strong>database server</strong> is a computer that stores, manages, and provides access to databases - organized collections of data. Instead of files and folders like a file server, database servers store structured data in tables with rows and columns, making it easy to search, sort, and analyze information!</p>

            <h3>💡 The Bank Vault Analogy</h3>
            <div class="help-tip">
                <p><strong>Database servers are like a bank's vault system:</strong></p>
                <ul>
                    <li><strong>Vault (database server)</strong> = Secure location storing valuable information</li>
                    <li><strong>Safe deposit boxes (tables)</strong> = Organized containers for specific types of data</li>
                    <li><strong>Box contents (rows)</strong> = Individual records (customer accounts, transactions)</li>
                    <li><strong>Item labels (columns)</strong> = Properties of each record (name, balance, date)</li>
                    <li><strong>Vault teller (database software)</strong> = Controls access, processes requests, ensures security</li>
                    <li><strong>Query window (SQL)</strong> = How you ask for specific information ("Show me accounts > $10,000")</li>
                </ul>
            </div>

            <h3>📊 How Database Servers Work</h3>
            <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                <div style="color:#10b981; font-weight:bold;">Application Queries Database:</div>
                <div style="margin-left:20px; color:#e4e4e7; margin-top:5px;">
                    <div style="color:#3b82f6;">1. Connection Request</div>
                    <div style="margin-left:20px;">Web App: "Connect to database server on port 3306 (MySQL)"</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓ TCP connection established</div>

                    <div style="color:#3b82f6; margin-top:10px;">2. Authentication</div>
                    <div style="margin-left:20px;">Server: "Username and password?"</div>
                    <div style="margin-left:20px;">App provides credentials</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓ Verifies permissions for specific database</div>

                    <div style="color:#3b82f6; margin-top:10px;">3. SQL Query</div>
                    <div style="margin-left:20px;">App: "SELECT * FROM customers WHERE city = 'Boston'"</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓ Database processes query</div>

                    <div style="color:#3b82f6; margin-top:10px;">4. Query Execution</div>
                    <div style="margin-left:20px;">Server searches tables, applies filters</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓ Retrieves matching records</div>

                    <div style="color:#3b82f6; margin-top:10px;">5. Result Set</div>
                    <div style="margin-left:20px;">Server: "Found 47 customers in Boston"</div>
                    <div style="margin-left:20px; color:#10b981;">Returns data to application for display</div>
                </div>
            </div>

            <div class="help-section">
                <h3>🔧 Popular Database Systems</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Database</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Port</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Common Use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>MySQL</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">3306</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Relational (SQL)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Web apps, WordPress, general purpose</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>PostgreSQL</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">5432</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Relational (SQL)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Enterprise apps, complex queries, GIS</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Microsoft SQL Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1433</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Relational (SQL)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Windows environments, .NET apps</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Oracle Database</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">1521</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Relational (SQL)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Large enterprises, mission-critical apps</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>MongoDB</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">27017</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">NoSQL (Document)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Flexible schemas, JSON data, modern web</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Redis</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">6379</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">NoSQL (Key-Value)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Caching, sessions, real-time data</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>💻 Connection Pooling</h3>
                <p><strong>Connection pooling</strong> reuses database connections instead of creating new ones for each request - much faster and more efficient!</p>

                <p><strong>Without Connection Pooling:</strong></p>
                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                    <div style="color:#ef4444;">Slow & Wasteful:</div>
                    <div style="margin-left:20px; color:#e4e4e7; margin-top:5px;">
                        <div>User 1 request → Connect to DB (100ms) → Query (10ms) → Disconnect</div>
                        <div>User 2 request → Connect to DB (100ms) → Query (10ms) → Disconnect</div>
                        <div>User 3 request → Connect to DB (100ms) → Query (10ms) → Disconnect</div>
                        <div style="color:#ef4444; margin-top:5px;">Total: 330ms (most time wasted connecting!)</div>
                    </div>
                </div>

                <p><strong>With Connection Pooling:</strong></p>
                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                    <div style="color:#10b981;">Fast & Efficient:</div>
                    <div style="margin-left:20px; color:#e4e4e7; margin-top:5px;">
                        <div>Server startup → Create 10 connections → Keep them open</div>
                        <div style="margin-top:5px;">User 1 request → Borrow connection → Query (10ms) → Return to pool</div>
                        <div>User 2 request → Borrow connection → Query (10ms) → Return to pool</div>
                        <div>User 3 request → Borrow connection → Query (10ms) → Return to pool</div>
                        <div style="color:#10b981; margin-top:5px;">Total: 30ms (10x faster!)</div>
                    </div>
                </div>

                <p><strong>Pool Settings:</strong></p>
                <ul>
                    <li><strong>Min Pool Size</strong> - Always keep 5 connections open (even when idle)</li>
                    <li><strong>Max Pool Size</strong> - Never exceed 100 connections (prevents server overload)</li>
                    <li><strong>Connection Timeout</strong> - Wait 30 seconds for available connection before giving up</li>
                    <li><strong>Idle Timeout</strong> - Close connections idle for 10+ minutes to free resources</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🔄 Database Replication</h3>
                <p><strong>Replication</strong> copies data from one database server to others for backup and load distribution:</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Works</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Master-Slave</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Master handles writes, slaves copy data and handle reads</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Read-heavy workloads (1 write, 5 read servers)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Master-Master</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">All servers accept writes and sync with each other</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Geographic distribution (US and EU servers)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Cascading</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Master → Slave1 → Slave2 → Slave3 (chain)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Reduces load on master for many replicas</td>
                        </tr>
                    </tbody>
                </table>

                <p><strong>Benefits:</strong></p>
                <ul>
                    <li><strong>High Availability</strong> - If master fails, promote slave to master (automatic failover)</li>
                    <li><strong>Load Balancing</strong> - Distribute read queries across multiple servers</li>
                    <li><strong>Backup</strong> - Always have current copy of data on multiple machines</li>
                    <li><strong>Geographic Performance</strong> - Users in Asia query Asian server, faster than US server</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🔒 Database Security</h3>
                <ul>
                    <li><strong>Authentication</strong> - Username/password required to connect</li>
                    <li><strong>Authorization</strong> - Users only access specific databases/tables they need</li>
                    <li><strong>Encryption in Transit</strong> - SSL/TLS for connections (prevents eavesdropping)</li>
                    <li><strong>Encryption at Rest</strong> - Encrypt files on disk (protects if server stolen)</li>
                    <li><strong>Parameterized Queries</strong> - Prevents SQL injection attacks</li>
                    <li><strong>Audit Logging</strong> - Track who accessed what data and when</li>
                    <li><strong>Network Restrictions</strong> - Firewall allows only app servers to connect, not public internet</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>📈 Database Server Performance</h3>
                <p>What makes database servers fast or slow:</p>

                <p><strong>Fast Queries:</strong></p>
                <ul>
                    <li><strong>Indexes</strong> - Like a book index, quickly find data without scanning every row</li>
                    <li><strong>Optimized Queries</strong> - SELECT only columns you need, not SELECT *</li>
                    <li><strong>Connection Pooling</strong> - Reuse connections instead of reconnecting each time</li>
                    <li><strong>Caching</strong> - Store frequent queries in memory (Redis, Memcached)</li>
                    <li><strong>SSD Storage</strong> - Faster disk access than spinning hard drives</li>
                </ul>

                <p><strong>Slow Queries:</strong></p>
                <ul>
                    <li><strong>Full Table Scans</strong> - Reading every row to find data (add indexes!)</li>
                    <li><strong>Too Many Connections</strong> - Server overloaded with 500 simultaneous connections</li>
                    <li><strong>Large Joins</strong> - Combining multiple huge tables in one query</li>
                    <li><strong>No Connection Pooling</strong> - Opening new connection for every query</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Set up a database server:</strong></p>
                <ul>
                    <li>Add a <strong>Database Server</strong> to your network</li>
                    <li>Configure <strong>MySQL (port 3306)</strong> or <strong>PostgreSQL (port 5432)</strong></li>
                    <li>Create <strong>user accounts</strong> with different permissions</li>
                    <li>Set up <strong>connection pooling</strong> with min/max connections</li>
                    <li>Add application servers that <strong>connect to database</strong></li>
                    <li>Monitor <strong>query traffic</strong> in packet inspector</li>
                    <li>Test <strong>authentication failures</strong> with wrong credentials</li>
                    <li>Configure <strong>replication</strong> - master-slave setup</li>
                    <li>Simulate <strong>connection pool exhaustion</strong> - too many simultaneous queries</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>MySQL port 3306, PostgreSQL port 5432</strong> - know the defaults</li>
                    <li><strong>Connection pooling is essential</strong> - don't create new connections for every request</li>
                    <li><strong>Never expose database to internet</strong> - only allow app servers to connect</li>
                    <li><strong>Replication provides redundancy</strong> - master fails, slaves take over</li>
                    <li><strong>Indexes speed up SELECT</strong> but slow down INSERT/UPDATE (trade-off)</li>
                    <li><strong>Use least privilege</strong> - web app user shouldn't have DROP TABLE permissions</li>
                    <li><strong>Always use SSL/TLS</strong> - unencrypted database traffic exposes sensitive data</li>
                </ul>
            </div>
        `
    },

    game_servers: {
        title: "Game Servers",
        content: `
            <h3>🎮 What is a Game Server?</h3>
            <p>A <strong>game server</strong> is a specialized server that hosts multiplayer video games, managing game state, player connections, and real-time interactions between players. Unlike web servers that handle simple requests, game servers must process hundreds of updates per second with extremely low latency to keep gameplay smooth!</p>

            <h3>💡 The Sports Referee Analogy</h3>
            <div class="help-tip">
                <p><strong>Game servers are like referees in a sports match:</strong></p>
                <ul>
                    <li><strong>Referee (game server)</strong> = Authoritative controller of game state</li>
                    <li><strong>Players (game clients)</strong> = Send inputs (move, shoot, jump)</li>
                    <li><strong>Scoreboard (game state)</strong> = Current positions, scores, health, ammo</li>
                    <li><strong>Referee's whistle (tick rate)</strong> = Updates game state 60 times per second</li>
                    <li><strong>Instant replays (lag compensation)</strong> = Server adjusts for network delays</li>
                    <li><strong>Fair play rules (anti-cheat)</strong> = Server validates all actions to prevent cheating</li>
                </ul>
            </div>

            <h3>🔄 How Game Servers Work</h3>
            <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                <div style="color:#10b981; font-weight:bold;">Multiplayer Game Loop (60 times per second):</div>
                <div style="margin-left:20px; color:#e4e4e7; margin-top:5px;">
                    <div style="color:#3b82f6;">1. Receive Player Inputs</div>
                    <div style="margin-left:20px;">Player1: "Move forward, aim left"</div>
                    <div style="margin-left:20px;">Player2: "Fire weapon at (X,Y,Z)"</div>
                    <div style="margin-left:20px;">Player3: "Jump"</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓ UDP packets on game port (e.g., 27015)</div>

                    <div style="color:#3b82f6; margin-top:10px;">2. Validate Inputs</div>
                    <div style="margin-left:20px;">Server: "Is Player2's shot possible? Check range, ammo, line of sight"</div>
                    <div style="margin-left:20px; color:#10b981;">✅ Valid - player had ammo and clear shot</div>

                    <div style="color:#3b82f6; margin-top:10px;">3. Update Game State</div>
                    <div style="margin-left:20px;">Server calculates new positions, collisions, damage</div>
                    <div style="margin-left:20px;">Player1 hit! Health 100 → 75</div>

                    <div style="color:#3b82f6; margin-top:10px;">4. Broadcast Updates</div>
                    <div style="margin-left:20px;">Server → All Players: "Player1 at (10,5,2) health=75, Player2 fired weapon..."</div>
                    <div style="margin-left:20px; color:#9ca3af;">↓ UDP packets to all connected clients</div>

                    <div style="color:#3b82f6; margin-top:10px;">5. Client Rendering</div>
                    <div style="margin-left:20px;">Each player's game displays updated positions, effects, sounds</div>
                    <div style="color:#9ca3af; margin-top:10px;">Repeat 60 times per second (16.67ms per tick)</div>
                </div>
            </div>

            <div class="help-section">
                <h3>🎯 Game Server Types</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Type</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">How It Works</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Pros/Cons</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Dedicated Server</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Standalone server runs 24/7, players connect to it</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Fair (no host advantage) ❌ Requires server hosting</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Listen Server (Peer-to-Peer)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">One player hosts, others connect directly to them</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Free/easy ❌ Host has advantage (0ms ping)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Cloud/Matchmaking</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">Game company's servers, automatic matchmaking</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">✅ Convenient, balanced ❌ Game dies when servers shut down</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>📡 Common Game Ports</h3>
                <p>Game servers use specific ports - players need to forward these through firewalls/routers:</p>

                <table style="width:100%; border-collapse:collapse; margin:15px 0; background:transparent !important; color:#e4e4e7 !important;">
                    <thead>
                        <tr style="background:#2a2d3e !important;">
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Game/Engine</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Default Port(s)</th>
                            <th style="padding:8px; text-align:left; border:1px solid #3a3d4e; background:#2a2d3e !important; color:#9ca3af !important;">Protocol</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Minecraft</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">25565</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TCP</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Counter-Strike (Source)</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">27015</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">UDP</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Terraria</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">7777</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">TCP</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>ARK: Survival Evolved</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">7777 (game), 27015 (query)</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">UDP</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Rust</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">28015</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">UDP</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;"><strong>Unreal Tournament</strong></td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">7777</td>
                            <td style="padding:8px; border:1px solid #2a2d3e; background:transparent !important; color:#e4e4e7 !important;">UDP</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="help-section">
                <h3>⚡ Latency & Tick Rate</h3>
                <p>Two critical factors for smooth gameplay:</p>

                <p><strong>Latency (Ping):</strong> Time for data to travel from player to server and back</p>
                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                    <div style="color:#10b981;">Excellent: <20ms ping</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Feels instant, competitive gaming possible</div>

                    <div style="color:#3b82f6; margin-top:5px;">Good: 20-50ms ping</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Barely noticeable delay, still competitive</div>

                    <div style="color:#f59e0b; margin-top:5px;">Playable: 50-100ms ping</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Slight delay, casual play fine, competitive harder</div>

                    <div style="color:#ef4444; margin-top:5px;">Poor: >100ms ping</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Noticeable lag, frustrating gameplay, deaths feel unfair</div>

                    <div style="color:#dc2626; margin-top:5px;">Unplayable: >200ms ping</div>
                    <div style="margin-left:20px; color:#e4e4e7;">Major lag, actions delayed, rubber-banding movement</div>
                </div>

                <p><strong>Tick Rate:</strong> How often server updates game state per second</p>
                <ul>
                    <li><strong>64 tick (16ms)</strong> - Standard for competitive games (CS:GO, Valorant)</li>
                    <li><strong>30 tick (33ms)</strong> - Common for casual games, slower paced</li>
                    <li><strong>128 tick (8ms)</strong> - Professional/esports servers, ultra-smooth</li>
                    <li><strong>Higher tick rate</strong> = more responsive but requires more server power and bandwidth</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🛡️ Anti-Cheat & Server-Side Validation</h3>
                <p>Game servers must validate everything to prevent cheating:</p>

                <p><strong>What Servers Validate:</strong></p>
                <ul>
                    <li><strong>Movement Speed</strong> - Player claims to move 100 units/sec but max is 10 → Reject</li>
                    <li><strong>Shooting Through Walls</strong> - Raycast check: is there solid geometry between shooter and target? → Reject if blocked</li>
                    <li><strong>Ammo Count</strong> - Player fired 50 bullets but only had 30 ammo → Reject</li>
                    <li><strong>Teleportation</strong> - Player jumped from (0,0,0) to (1000,1000,1000) in one tick → Impossible, kick player</li>
                    <li><strong>Item Spawning</strong> - Only server can create items, client can't say "I have 999 rockets"</li>
                </ul>

                <p><strong>Why UDP for Games?</strong></p>
                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                    <div style="color:#10b981;">UDP (Preferred for Fast-Paced Games):</div>
                    <div style="margin-left:20px; color:#e4e4e7;">✅ No connection overhead - just send packets</div>
                    <div style="margin-left:20px; color:#e4e4e7;">✅ No retransmission - lost packets are ignored (old data is useless)</div>
                    <div style="margin-left:20px; color:#e4e4e7;">✅ Lower latency - no waiting for acknowledgments</div>
                    <div style="margin-left:20px; color:#ef4444;">❌ Packets can be lost or arrive out of order</div>

                    <div style="color:#3b82f6; margin-top:10px;">TCP (Used for Turn-Based/Slow Games):</div>
                    <div style="margin-left:20px; color:#e4e4e7;">✅ Guaranteed delivery - no lost data</div>
                    <div style="margin-left:20px; color:#e4e4e7;">✅ In-order packets - always arrive in correct sequence</div>
                    <div style="margin-left:20px; color:#ef4444;">❌ Higher latency - waiting for ACKs and retransmissions</div>
                    <div style="margin-left:20px; color:#ef4444;">❌ Head-of-line blocking - one lost packet delays all subsequent packets</div>
                </div>
            </div>

            <div class="help-section">
                <h3>🌍 Geographic Server Selection</h3>
                <p>Distance to server dramatically affects ping:</p>

                <div style="background:#16213e; padding:15px; border-radius:6px; margin:15px 0; font-family:monospace; font-size:13px;">
                    <div style="color:#e4e4e7;">Player in Boston connecting to game servers:</div>
                    <div style="margin-left:20px; margin-top:5px; color:#10b981;">US East (New York): 15ms ping - Excellent!</div>
                    <div style="margin-left:20px; color:#3b82f6;">US West (California): 65ms ping - Good</div>
                    <div style="margin-left:20px; color:#f59e0b;">Europe (London): 85ms ping - Playable</div>
                    <div style="margin-left:20px; color:#ef4444;">Asia (Tokyo): 180ms ping - Very laggy</div>
                    <div style="margin-left:20px; color:#dc2626;">Australia (Sydney): 250ms ping - Nearly unplayable</div>
                </div>

                <p><strong>Best Practice:</strong> Games offer regional servers (NA-East, NA-West, EU, Asia, OCE) so players connect to nearest server.</p>
            </div>

            <div class="help-section">
                <h3>🖥️ In the Simulator</h3>
                <p><strong>Set up a game server:</strong></p>
                <ul>
                    <li>Add a <strong>Game Server</strong> to your network</li>
                    <li>Configure <strong>game port</strong> (e.g., 27015 for Source games, 25565 for Minecraft)</li>
                    <li>Set <strong>UDP protocol</strong> for real-time games (or TCP for turn-based)</li>
                    <li>Configure <strong>tick rate</strong> (30, 64, or 128 ticks/second)</li>
                    <li>Add <strong>player clients</strong> connecting from different networks</li>
                    <li>Monitor <strong>UDP traffic</strong> - observe packet frequency</li>
                    <li>Test <strong>latency impact</strong> - add delay, watch gameplay suffer</li>
                    <li>Simulate <strong>packet loss</strong> - see how game handles missing updates</li>
                    <li>Set up <strong>port forwarding</strong> on router for external players</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>💡 Remember</h3>
                <ul>
                    <li><strong>UDP for fast-paced games</strong>, TCP for turn-based - real-time needs speed, not reliability</li>
                    <li><strong>Ping under 50ms is ideal</strong> - anything over 100ms feels laggy</li>
                    <li><strong>Server is authoritative</strong> - client can't be trusted, validate everything</li>
                    <li><strong>Higher tick rate = smoother</strong> but requires more CPU and bandwidth</li>
                    <li><strong>Port forwarding required</strong> for hosting from home (open game port on router)</li>
                    <li><strong>Geographic proximity matters</strong> - play on nearest regional server</li>
                    <li><strong>Lost UDP packets are okay</strong> - old position data is useless anyway, just send new update</li>
                </ul>
            </div>
        `
    }
};

// Help icon click handler
function showHelp(topic) {
    if (!helpContent[topic]) {
        console.error('Help topic not found:', topic);
        return;
    }

    createBkDiv();

    var content = helpContent[topic];
    var innerHTML = '<div style="padding:25px;background:#1a1a2e;color:#e4e4e7;">';
    innerHTML += '<h2 style="margin:0 0 20px 0; color:#667eea; font-weight:600;">' + content.title + '</h2>';
    innerHTML += content.content;
    innerHTML += '</div>';

    var controls = '<button onclick="closeHelp()" style="background:#667eea; color:white; padding:10px 20px; border:none; border-radius:6px; cursor:pointer;font-weight:500;">Close</button>';

    var w = new UIWindow('divhelp', '📚 Help: ' + content.title, 800, 600, true, 1.0);
    w.setContent(innerHTML);
    w.setControls(controls);
    w.render();
}

function closeHelp() {
    uimanager.getWindow("divhelp").dispose();
    removeBodyDiv('divbk');
}
