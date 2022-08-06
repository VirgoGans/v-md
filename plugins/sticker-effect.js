const uploadImage = require('../lib/uploadImage')
const fetch = require('node-fetch')
let fs = require('fs')
let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Kirim/balas gambar dengan perintah ${usedPrefix + command}`
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Kirim/balas gambar dengan perintah ${usedPrefix + command}`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
    let img = await q.download()
    let url = await (uploadImage)(img)
    let res = `https://api-kimimaru.herokuapp.com/api/canvas/${command}?apikey=k1mimaru&url=${url}`
  conn.sendStimg(m.chat, res, m, { packname: global.packname, author: global.auhor })
  } catch(e){
    m.reply(`ERROR`)
  }
}
handler.help = ["lolice", "triggered", "horny", "simpcard", "comrade", "jail", "wasted", "passed"]
handler.tags = ['sticker']
handler.command = /^(lolice|triggered|horny|simpcard|comrade|jail|wasted|passed)$/i
handler.limit = true
//Creator : M.Jamil
module.exports = handler
