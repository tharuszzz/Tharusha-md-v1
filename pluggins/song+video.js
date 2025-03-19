const {cmd , commands} = require('../command')
const fg = requiere(`api-dylux`)
const yts = require(`yt-search`)

cmd({
    pattern: "song",
    desc: "download sing",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  if(!q) return reply("Please give me a url 🗿")
  const search = await yts(q)
  const date = search.videos[o];
  const url = date.url

let desc = ``


}catch(e){
  console.log(e)
  reply(`${e}`)
}
})
