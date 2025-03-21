const fs = require('fs');
require('dotenv').config();  // Make sure dotenv is properly required

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "PLQXHCIS#NXYxCs0OaEKuyUS-mivTccn7O0WDJzxxpSX35INFMHQ",
    MONGODB: process.env.MONGODB || "mongo:BXIkWowtOhTgmCXYZeocahlfwBtSvTmx@nozomi.proxy.rlwy.net:55793"
