# Network Simulator

An interactive network simulation tool for learning how computer networks work. Design networks with routers, switches, firewalls, and servers, then watch packets flow in real time.

Originally adapted from [NetworkSimulator](https://github.com/malkiah/NetworkSimulator) by Jorge Garcia Ochoa de Aspuru, this version has been significantly expanded with new device types, protocol simulations, security attack demonstrations, and a modern dark-themed UI.

## Features

### Network Devices
- **Computers** — Desktop, laptop, smartphone, gaming console, smart TV, IoT
- **Switches** — Multi-port with VLAN support (access and trunk modes)
- **Routers** — Gateway management, ACLs, NAT
- **Firewalls** — Zone-based packet filtering with configurable rules
- **Servers** — DHCP, DNS, HTTP/HTTPS, Email (SMTP), Game, RADIUS

### Protocol Simulations
- **DHCP** — Full discover/offer/request/ack cycle with lease management
- **DNS** — Domain resolution with forwarding and custom records
- **HTTP/HTTPS** — Request/response with virtual domains and files
- **TLS/SSL** — Handshake animation showing certificate exchange
- **Email (SMTP)** — Send/receive between mail servers
- **ARP** — Address resolution with table inspection
- **ICMP** — Ping between devices
- **802.1X** — Port-based network access control with RADIUS authentication

### Security Simulations
- **Rogue DHCP** — Race condition attacks with compromised host tracking
- **Rogue Router (MITM)** — Traffic interception showing HTTP vs HTTPS visibility
- **ARP Poisoning** — Cache poisoning demonstration
- **Packet Inspector** — Click any packet to inspect its layers (like Wireshark)

### UI Features
- Canvas zoom/pan (scroll wheel + space+drag)
- Device and link label toggles
- Network templates (pre-built scenarios)
- Template import/export (JSON)
- Dark-themed modern interface

## Data Format

Projects are saved as JSON containing network elements (devices with their configurations, IP addresses, MAC addresses, services) and links (connections between device ports).

## License

GPLv3 — see [LICENSE](LICENSE)
