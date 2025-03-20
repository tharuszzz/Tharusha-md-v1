const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "8UgS0QSa#2fZy4DzBxRkK0F1ft5lwCuQ531-YebWXGOjpKIek6uw",
ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/WpHbKD3Q/6ec6e0f072121856.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "╭─「 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳 𝙰𝙻𝙸𝚅𝙴 𝙼𝚂𝙶」\𝚗│◈ 𝙿𝚁𝙴𝙵𝙸𝚇 - "."\𝚗│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 - ${runtime(process.uptime())}\𝚗│◈ 𝙸'𝙼 𝙾𝙽𝙻𝙸𝙽𝙴..👤\𝚗╰──────────●●►",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
MODE: process.env.MODE || "public",
};

