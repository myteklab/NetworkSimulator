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

var MACMODE_SHARED = 0;
var MACMODE_UNIQUE = 1;

var IPMODE_SHARED = 0;
var IPMODE_UNIQUE = 1;
var IPMODE_NOIP = 2;

var IMAGE_SWITCH = 0;
var IMAGE_ROUTER = 1;
var IMAGE_COMPUTER = 2;
var IMAGE_SERVERWEB = 3;
var IMAGE_SERVERDNS = 4;
var IMAGE_SERVERDHCP = 5;
var IMAGE_ENVELOPEDHCP = 6;
var IMAGE_ENVELOPEDNS = 7;
var IMAGE_ENVELOPEHTTP = 8;
var IMAGE_ENVELOPEICMP = 9;
var IMAGE_ENVELOPEARP = 10;  // ARP message envelope
var IMAGE_FIREWALL = 11;  // Firewall device
var IMAGE_SERVERMAIL = 12;  // Email server
var IMAGE_ENVELOPEMAIL = 13;  // Email message envelope
var IMAGE_ENVELOPEGAME = 14;  // Game traffic envelope
var IMAGE_ENVELOPEGAMECONNECT = 15;  // Game connection request
var IMAGE_ENVELOPEGAMEDATA = 16;  // Game data packets
var IMAGE_ENVELOPEGAMEHB = 17;  // Game heartbeat/keepalive

var REFRESH_INTERVAL = 1000/60;
var LINE_SELECT_TOLERANCE = 2;

var ROUTER_WAN = 0;
var ROUTER_LAN = 1;

var DEBUG = false;

var network = null;
var images = null;
var uimanager = null;

var lastuseddinamycport = 49152; // Start of IANA ephemeral port range
var lastusedid = 0;

// IANA ephemeral port range: 49152-65535
// This simulates how real operating systems allocate dynamic/ephemeral ports
// for outbound connections (used in PAT - Port Address Translation)
function getDinamycPort()
{
  lastuseddinamycport++;
  // Wrap around if we exceed the ephemeral range
  if (lastuseddinamycport > 65535) {
    lastuseddinamycport = 49152;
  }
  return lastuseddinamycport;
}

function getNextID()
{
  return ++lastusedid;
}

var NetworkSimulator = {
  initialdata: null,
  verbose:false
};
