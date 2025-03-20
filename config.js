const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "PLQXHCIS#NXYxCs0OaEKuyUS-mivTccn7O0WDJzxxpSX35INFMHQ",
MONGODB: process.env.MONGODB || "mongodb://mongo:BXIkWowtOhTgmCXYZeocahlfwBtSvTmx@nozomi.proxy.rlwy.net:55793",
};

