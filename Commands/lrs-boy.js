//-------------------------Required Modules--------------------------\\


const { dc, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const Settings = require('../Settings/Settings.json')
const Roles = require('../Settings/Roles.json');//
const Channels = require('../Settings/Channels.json');//
const ServerSettings = require('../Settings/ServerSettings.json');//


//-------------------------Required Modules--------------------------\\


exports.run = async (client, message, args) => {


const chat = message.guild.channels.cache.find(r => r.id === (Channels.GeneralChat)) 


  //-------------------------Uyarı Komutları--------------------------\\ 


  if (![(Roles.Registerer)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`**__Bu Komut İçin Yetkiniz Bulunmamaktadır.__**`)

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  let uyarıembed = new MessageEmbed().setColor("#323131").setFooter(`${dev} ${y}${s}${r}${a}${l}`).setTimestamp()
  if (!user) return message.channel.send(uyarıembed.setDescription("**__Bir kişiyi etiketlemelisin.__**"))
  if (!isim) return message.channel.send(uyarıembed.setDescription("**__Bir isim belirtmelisin.__**"))
  if (!yaş) return message.channel.send(uyarıembed.setDescription("**__Bir yaş belirtmelisin__**"))
  if (yaş < 13) return message.channel.send(uyarıembed.setDescription("**__Discord Kurallarına Göre Bir Üyenin Yaşı 13'ten Küçük Olamaz.__*"))

  //-------------------------Uyarı Komutları--------------------------\\ 


if (user.user.tag.includes(ServerSettings.Tag)) {
    user.setNickname(`${ServerSettings.Tag} ${isim} | ${yaş}`)
  } else {
    user.setNickname(`${ServerSettings.UnTag} ${isim} | ${yaş}`)
  }

if (user.user.tag.includes(ServerSettings.Tag)) {
    user.setNickname(`${ServerSettings.Tag} ${isim} | ${yaş}`)
  } else {
    user.setNickname(`${ServerSettings.UnTag} ${isim} | ${yaş}`)
  }  


  //-------------------------Verilen Roller--------------------------\\


  user.roles.add(Roles.BoyRole1) // Erkek Rolunu Verir
  user.roles.add(Roles.BoyRole1) // Erkek Rolunu Verir
  user.roles.add(Roles.BoyRole2) // Erkek Rolunu Verir
  user.roles.add(Roles.BoyRole2) // Erkek Rolunu Verir
  user.roles.add(Roles.BoyRole3) // Erkek Rolunu Verir
  user.roles.add(Roles.BoyRole3) // Erkek Rolunu Verir


  //-------------------------Verilen Roller--------------------------\\


  //-------------------------Alınan Roller--------------------------\\


  user.roles.remove(Roles.GirlRole1) // Kız Rolunu Alır
  user.roles.remove(Roles.GirlRole2) // Kız Rolunu Alır
  user.roles.remove(Roles.GirlRole3) // Kız Rolunu Alır 
  user.roles.remove(Roles.GirlRole1) // Kız Rolunu Alır
  user.roles.remove(Roles.GirlRole2) // Kız Rolunu Alır
  user.roles.remove(Roles.GirlRole3) // Kız Rolunu Alır 
  user.roles.remove(Roles.Unregister) // Kayıtsız Rolunu Alır
  user.roles.remove(Roles.Unregister) // Kayıtsız Rolunu Alır


  //-------------------------Alınan Roller--------------------------\\

  await db.push(`isimler.${user.id}`, {
    Registerer: message.author.id,
    Name: isim,
    Age: yaş,
    Rol: Roles.BoyRole1
  })

  db.add(`${message.author.id}.toplam`, +1)
  db.add(`${message.author.id}.erkek`, +1)
  db.add('case', 1)
  let toplam = await db.get(`${message.author.id}.toplam`)

  let x = await db.get(`isimler.${user.id}`)
  let isimler = x.length > 0 ? x.map((value, index) => `**${index + 1})** \`${value.Name} | ${value.Age}\` (${value.Rol})`).join(`\n`) : "**__Bu Kullanıcının Önceden Bulunan Bir İsmi Yok.__**";
  let embed = new MessageEmbed()
    .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
    .setColor("#323131")
    .setDescription(`${user}, <@${message.author.id}> **__Tarafından Başarı İle Kaydedildi.__**`)
    .setFooter(`${dev} ${y}${s}${r}${a}${l}`)
    .setTimestamp()
  message.channel.send(embed)
  message.react("🟩")

  const dmlog = new MessageEmbed()
    .setDescription(`${user} **__Tebrikler,__** \`${message.guild.name}\` **__Sunucusunda__** \`${isim} | ${yaş}\` **__Olarak Kaydedildin.__**
**__Eğer Kaydında Bir Yanlışlık Varsa Yetkililere Bildir Lütfen.__**`)
    .setColor("#323131")
    .setFooter(`${dev} ${y}${s}${r}${a}${l}`)
  user.send(dmlog)

  const chatembed = new MessageEmbed()
    .setDescription(`${user} **__Aramıza Hoşgeldin Dostum, Keyifli Vakitler Geçirmeni Dileriz :)__**`)
    .setTimestamp()
    .setColor("#323131")
  chat.send(chatembed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["erkek", "e", "man", "boy", "adam"],
  permLevel: 0
};

exports.help = {
  name: "boy"
}

//---DEV---\\
var dev = "Developed By"
var y = "𝙻"
var s = "𝚊"
var r = "𝚛"
var a = "𝚜"
var l = "𝚢"
//---DEV---\\