const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    
    pattern: "system",
    react: "♠️",
    alias: ["uptime","status","runtime"],
    desc: "cheack uptime",
    category: "main",
    filename: __filename
    
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
let status = `┌──────────────────────────
├ *⏰ Uptime:* ${runtime(process.uptime())}
├ *📟 Ram usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
├ *⚙️ HostName:* ${os.hostname()}
├ *👨‍💻 Owners:* Tharusha Sandipa 👤
└──────────────────────────
> © 𝗣𝗢𝗪𝗘𝗥𝗗 𝗕𝗬 𝗧𝗛𝗔𝗥𝗨𝗦𝗛𝗔 𝗦𝗔𝗡𝗗𝗜𝗣𝗔 𝗢𝗙𝗖 || ||
`
await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:`${status}`},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
