//-------------------------Required Modules--------------------------\\


const Discord = require("discord.js");
const db = require('quick.db');
const Settings = require("../Settings/Settings.json")
const Roles = require('../Settings/Roles.json');//
const Channels = require('../Settings/Channels.json');//
const ServerSettings = require('../Settings/ServerSettings.json');//


//-------------------------Required Modules--------------------------\\


exports.run = (client, message, args) => {
if(![(Roles.Registerer)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`**__Bu Komut İçin Yetkiniz Bulunmamaktadır.__**`) 


  
  let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
  if(!member) return message.channel.send("**__Bir Kişiyi Etiketlemelisin.__**")
  const larsy = message.guild.member(member)
  const isim = args[1];
  const yas = args[2];
  const chat = message.guild.channels.cache.find(r => r.id === (Channels.GeneralChat))
  const logg = message.guild.channels.cache.find(r => r.id === (Channels.RegisterChat))
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!isim) return message.channel.send("**__Bir Isim Belirtmelisin.__**")
  if(!yas) return message.channel.send("**__Bir Yaş Belirtmelisin__**")
  if (yas < 13) return message.channel.send("**__Discord Kurallarına Göre Bir Üyenin Yaşı 13'ten Küçük Olamaz.__**")
  
if (user.user.tag.includes(ServerSettings.Tag)) {
    user.setNickname(`${ServerSettings.Tag} ${isim} | ${yas}`)
  } else {
    user.setNickname(`${ServerSettings.UnTag} ${isim} | ${yas}`)
  }

  const embedd = new Discord.MessageEmbed()
  .setDescription(`${user} adlı Kullanıcının Kayıt işleminin tamamlanması için cinstiyetini Belirlemelisin.
Erkek ise ♂ Emojisine, Kadın ise ♀ Emojisine Basın.`)
  .setFooter(`${dev} ${y}${s}${r}${a}${l}`)
  .setColor("#323131")
  message.channel.send(embedd).then(async mesaj => {
    await mesaj.react('♂') 
    await mesaj.react('♀')
    
    const erkekemoji = (reaction, user) => reaction.emoji.name === '♂' && user.id === message.author.id;
    const kadinemoji = (reaction, user) => reaction.emoji.name === '♀' && user.id === message.author.id;
    
    const erkek = mesaj.createReactionCollector(erkekemoji, { time: 10000 });
    const kadin = mesaj.createReactionCollector(kadinemoji, { time: 10000 });
    
    erkek.on('collect', async larsy => {
      mesaj.reactions.removeAll()
      user.roles.add(Roles.BoyRole1)
      user.roles.add(Roles.BoyRole1)
      user.roles.add(Roles.BoyRole2)
      user.roles.add(Roles.BoyRole2)
      user.roles.add(Roles.BoyRole3)
      user.roles.add(Roles.BoyRole3)      
      user.roles.remove(Roles.Unregister)
      user.roles.remove(Roles.Unregister)
      user.roles.remove(Roles.Unregister)
      user.roles.remove(Roles.Unregister)      
      user.roles.remove(Roles.GirlRole1)
      user.roles.remove(Roles.GirlRole2)
      user.roles.remove(Roles.GirlRole3)
      user.roles.remove(Roles.GirlRole1)
      user.roles.remove(Roles.GirlRole2)
      user.roles.remove(Roles.GirlRole3)      

  await db.push(`isimler.${user.id}`, {
    Registerer: message.author.id,
    Name: isim,
    Age: yas,
    Rol : Roles.BoyRole1
  })

  db.add(`${message.author.id}.toplam`, +1)
  db.add(`${message.author.id}.erkek`, +1)
  db.add('case', 1)
  let toplam = await db.get(`${message.author.id}.toplam`)

  let x = await db.get(`isimler.${user.id}`)
  let isimler = x.length > 0 ? x.map((value, index) => `**${index + 1})** \`${value.Name} | ${value.Age}\` (${value.Rol})`).join(`\n`) : "**__Bu Kullanıcının Önceden Bulunan Bir İsmi Yok.__**";      


      const erkekEmbed = new Discord.MessageEmbed()
      .setColor("#323131")
      .setDescription(`${user}, <@${message.author.id}> **__Tarafından Başarı İle Kaydedildi.__**`)
      .setFooter(`${dev} ${y}${s}${r}${a}${l}`)
      mesaj.edit(erkekEmbed)
      await mesaj.react("🟩")

    const dmlogss = new Discord.MessageEmbed()
    .setDescription(`${user} **__Tebrikler,__** \`${message.guild.name}\` **__Sunucusunda__** \`${isim} | ${yas}\` **__Olarak Kaydedildin.__**
**__Eğer Kaydında Bir Yanlışlık Varsa Yetkililere Bildir Lütfen.__**`)
    .setColor("#323131")
    .setFooter(`${dev} ${y}${s}${r}${a}${l}`)
  user.send(dmlogss)

  const chatembed1 = new Discord.MessageEmbed()
    .setDescription(`${user} **__Aramıza Hoşgeldin Dostum, Keyifli Vakitler Geçirmeni Dileriz :)__**`)
    .setTimestamp()
    .setColor("#323131")
  chat.send(chatembed1)
      })

    kadin.on('collect', async larsy => {
      mesaj.reactions.removeAll()
      user.roles.add(Roles.GirlRole1)
      user.roles.add(Roles.GirlRole1)
      user.roles.add(Roles.GirlRole2)
      user.roles.add(Roles.GirlRole2)
      user.roles.add(Roles.GirlRole3)
      user.roles.add(Roles.GirlRole3)      
      user.roles.remove(Roles.Unregister)
      user.roles.remove(Roles.Unregister)
      user.roles.remove(Roles.Unregister)
      user.roles.remove(Roles.Unregister)      
      user.roles.remove(Roles.BoyRole1)
      user.roles.remove(Roles.BoyRole2)
      user.roles.remove(Roles.BoyRole3)
      user.roles.remove(Roles.BoyRole1)
      user.roles.remove(Roles.BoyRole2)
      user.roles.remove(Roles.BoyRole3)      

  await db.push(`isimler.${user.id}`, {
    Registerer: message.author.id,
    Name: isim,
    Age: yas,
    Rol : Roles.GirlRole1
  })

  db.add(`${message.author.id}.toplam`, +1)
  db.add(`${message.author.id}.kadın`, +1)
  db.add('case', 1)
  let toplam = await db.get(`${message.author.id}.toplam`)

  let x = await db.get(`isimler.${user.id}`)
  let isimler = x.length > 0 ? x.map((value, index) => `**${index + 1})** \`${value.Name} | ${value.Age}\` (${value.Rol})`).join(`\n`) : "**__Bu Kullanıcının Önceden Bulunan Bir İsmi Yok.__**";      

      const kadinEmbed = new Discord.MessageEmbed()
      .setColor("#323131")
      .setDescription(`${user}, <@${message.author.id}> **__Tarafından Başarı İle Kaydedildi.__**`)
      .setFooter(`${dev} ${y}${s}${r}${a}${l}`)
      mesaj.edit(kadinEmbed)
      await mesaj.react("🟩")

    const dmlog = new Discord.MessageEmbed()
    .setDescription(`${user} **__Tebrikler,__** \`${message.guild.name}\` **__Sunucusunda__** \`${isim} | ${yas}\` **__Olarak Kaydedildin.__**
**__Eğer Kaydında Bir Yanlışlık Varsa Yetkililere Bildir Lütfen.__**`)
    .setColor("#323131")
    .setFooter(`${dev} ${y}${s}${r}${a}${l}`)
  user.send(dmlog)

  const chatembed = new Discord.MessageEmbed()
    .setDescription(`${user} **__Aramıza Hoşgeldin, Keyifli Vakitler Geçirmeni Dileriz :)__**`)
    .setTimestamp()
    .setColor("#323131")
  chat.send(chatembed)
    })
  })

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["register", "kayıt"],
  permLevel: 0
};
exports.help = {
  name: "emojili-kayıt",
  description: "",
  usage: ""
};

//---DEV---\\
var dev = "Developed By"
var y = "𝙻"
var s = "𝚊"
var r = "𝚛"
var a = "𝚜"
var l = "𝚢"
//---DEV---\\
   