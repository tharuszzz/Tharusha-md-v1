const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys');

const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions');
const fs = require('fs');
const P = require('pino');
const config = require('./config');
const qrcode = require('qrcode-terminal');
const util = require('util');
const { sms, downloadMediaMessage } = require('./lib/msg');
const axios = require('axios');
const { File } = require('megajs');

const ownerNumber = ['94740326138'];

//=================== SESSION-AUTH ============================
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
  if (!config.SESSION_ID) {
    console.log('Please add your session to SESSION_ID env !!');
    process.exit(1);
  }

  const sessdata = config.SESSION_ID;
  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);

  filer.download((err, data) => {
    if (err) {
      console.error("Session download failed ❌", err);
      return;
    }
    fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
      console.log("Session downloaded ✅");
    });
  });
}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//=================== CONNECT TO WHATSAPP ============================
async function connectToWA() {
  const connectDB = require('./lib/mongodb');
  await connectDB();

  const { readEnv } = require('./lib/database');
  const config = await readEnv();
  const prefix = config.PREFIX;

  console.log("Connecting WA bot 🧬...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');
  const { version } = await fetchLatestBaileysVersion();

  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version
  });

  conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) connectToWA();
    } else if (connection === 'open') {
      console.log('😼 Installing plugins... ');
      const path = require('path');
      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() === ".js") {
          require("./plugins/" + plugin);
        }
      });
      console.log('Plugins installed successfully ✅');
      console.log('Bot connected to WhatsApp ✅');

      let up = `*𝗧𝗛𝗔𝗥𝗨𝗦𝗛𝗔-𝗠𝗗 connected successfully ✅*\n\n*PREFIX*: ${prefix}`;
      conn.sendMessage(ownerNumber[0] + "@s.whatsapp.net", {
        image: { url: `https://i.ibb.co/1J9Xp6gJ/304909ee1ba2d9fa.jpg` },
        caption: up
      });
    }
  });

  conn.ev.on('creds.update', saveCreds);

  conn.ev.on('messages.upsert', async (mek) => {
    mek = mek.messages[0];
    if (!mek.message) return;
    mek.message = getContentType(mek.message) === 'ephemeralMessage' ? mek.message.ephemeralMessage.message : mek.message;
    
    const m = sms(conn, mek);
    const type = getContentType(mek.message);
    const from = mek.key.remoteJid;
    const body = m.message?.conversation || m.message?.extendedTextMessage?.text || '';
    const isCmd = body.startsWith(prefix);
    const command = isCmd ? body.slice(prefix.length).trim().split(' ')[0].toLowerCase() : '';
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(' ');
    const sender = mek.key.fromMe ? conn.user.id.split(':')[0] + '@s.whatsapp.net' : mek.key.participant || mek.key.remoteJid;
    const senderNumber = sender.split('@')[0];
    const botNumber = conn.user.id.split(':')[0];
    const isOwner = ownerNumber.includes(senderNumber);

    //=================== WORK-TYPE CHECK ============================
    if (!isOwner && config.MODE === "private") return;
    if (!isOwner && isCmd && config.MODE === "inbox") return;
    if (!isOwner && !isCmd && config.MODE === "groups") return;

    //=================== COMMAND HANDLING ============================
    const events = require('./command');
    const cmd = events.commands.find((cmd) => cmd.pattern === command) || 
                events.commands.find((cmd) => cmd.alias && cmd.alias.includes(command));

    if (cmd) {
      try {
        cmd.function(conn, mek, m, { from, quoted: mek, body, isCmd, command, args, q, sender, senderNumber, botNumber, isOwner });
      } catch (e) {
        console.error("[PLUGIN ERROR] " + e);
      }
    }
  });
}

//=================== EXPRESS SERVER ============================
app.get("/", (req, res) => {
  res.send("Hey, bot started ✅");
});

app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));

//=================== START BOT ============================
setTimeout(() => {
  connectToWA();
}, 4000);
