const {cmd , commands} = require('../command')
const fg = requiere(`api-dylux`)
const yts = require(`yt-search`)

cmd({
    pattern: "song",
    desc: "download song",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  if(!q) return reply("Please give me a url 🗿")
  const search = await yts(q)
  const date = search.videos[o];
  const url = date.url

let desc = `
╭─「 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳 𝚂𝙾𝙽𝙶 & 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁 」
│◈ 𝚃𝚒𝚝𝚕𝚎 - ${date.title}
│◈ 𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗 - ${date.description}
│◈ 𝚃𝚒𝚖𝚎 - ${date.timestamp}
│◈ 𝙰𝚐𝚘 - ${date.ago}
│◈ 𝚆𝚒𝚠𝚜𝚎 - ${date.views}
╰──────────●●►
> © 𝗣𝗢𝗪𝗘𝗥𝗗 𝗕𝗬 𝗧𝗛𝗔𝗥𝗨𝗦𝗛𝗔 𝗦𝗔𝗡𝗗𝗜𝗣𝗔 𝗢𝗙𝗖 ||
`

    await conn.sendMessage(from,{image:{url:data.thumbnail},caption:desc},{quoted:mek});
    
    //download audio
    let down = await fg.yts(url)
    let downloadUrl = down.dl_url

    //audio Message send
    await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})



}catch(e){
  console.log(e)
  reply(`${e}`)
}
})
