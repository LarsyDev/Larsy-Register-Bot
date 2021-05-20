//-------------------------Required Modules--------------------------\\


const { MessageEmbed, Client, Message } = require("discord.js");
const db = require("quick.db");
const Roles = require('../Settings/Roles.json');//
const moment = require("moment");


//-------------------------Required Modules--------------------------\\


module.exports.run = async (client, message, args) => {
  let yetkili = Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(yetkili)) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor("#323131")).then(x => x.delete({ timeout: 6500 }));

  let embed2 = new MessageEmbed().setFooter(`${dev} ${y}${s}${r}${a}${l}`).setTimestamp()
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send(embed2.setDescription("Bir üyeyi etiketlemelisin."))
  let check = await db.has(`${message.author.id}.toplam`)
  if (check === false) return message.channel.send(embed2.setDescription("Bu üyenin herhangi bir kayıt verisine ulaşamadım."))

  let kadınsayı = await db.get(`${message.author.id}.kadın`)
  let erkeksayı = await db.get(`${message.author.id}.erkek`)
  let toplam = await db.get(`${message.author.id}.toplam`)

  const regstats = new MessageEmbed()
   .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
  .setDescription(`
**Toplam Kaydettiği Kadın:** ${kadınsayı || "0"}
**Toplam Kaydettiği Erkek:** ${erkeksayı || "0"}
**Toplam Kaydettiği Kişi:** ${toplam || "0"}`)
  .setTimestamp()
  .setColor("#323131")
  .setFooter(`${dev} ${y}${s}${r}${a}${l}`)
  message.channel.send(regstats)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayitbilgi", "kayitlar", "kayit-sayi", "kayitsayi", "kayit-sayisi", "kayitsayisi", "stat", "stats", "regstats", "teyitbilgi", "teyitler", "teyit-sayi", "teyitsayi", "teyitsayisi",]
};

module.exports.help = {
  name: 'regstats'
};

//---DEV---\\
var dev = "Developed By"
var y = "𝙻"
var s = "𝚊"
var r = "𝚛"
var a = "𝚜"
var l = "𝚢"
//---DEV---\\