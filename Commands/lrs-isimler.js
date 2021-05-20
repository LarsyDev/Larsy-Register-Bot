//-------------------------Required Modules--------------------------\\


const { MessageEmbed, Message, Client } = require("discord.js");
const db = require("quick.db")
const Settings = require("../Settings/Settings.json")
const Roles = require('../Settings/Roles.json');//
const Channels = require('../Settings/Channels.json');//
const ServerSettings = require('../Settings/ServerSettings.json');//
const moment = require("moment")

//-------------------------Required Modules--------------------------\\

module.exports.run = async (client, message, args) => {

  let cezarolu = Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(cezarolu)) {
    return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**__Bu Komut İçin Yetkiniz Bulunmamaktadır.__**.`).setColor("#323131")).then(x => x.delete({ timeout: 6500 }));
  }
 
  const embedx = new MessageEmbed().setColor("#323131").setFooter("Developed By Larsy").setTimestamp()
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send(embedx.setDescription("**__Bir Üye Etiketlemen Gerek.__**"))
  let check = await db.has(`isimler.${user.id}`)
  if (check === false) return message.channel.send(embedx.setDescription("**__Bu üyenin herhangi bir isim verisine ulaşılamadı..__**"))

  let fetch = await db.get(`isimler.${user.id}`)
  let isimler = fetch.length > 0 ? fetch.map((value, index) => `${index + 1}. \`${value.Name} | ${value.Age}\`( <@&${value.Rol}> ) ${ServerSettings.anaEmoji} `).join(`\n\n`) : "**__Bu üyenin geçmiş isimleri bulunamadı!__**";
  let sex = fetch.length > 0 ? fetch.map((value, index) => `${index + 1}. \`${value.Name} | ${value.Age}\`( <@&${value.Rol}> ) ${ServerSettings.anaEmoji} `).join(`\n\n`) : "**__Bu üyenin geçmiş isimleri bulunamadı!__**";

  const embed = new MessageEmbed()
  .setAuthor("Üyenin Isimleri")
  .setDescription(`${isimler}`)
  .setColor("#323131")
  .setFooter(`${dev} ${y}${s}${r}${a}${l}`)
  .setTimestamp()
  message.channel.send(embed)


}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isimler", "eski-isimler"]
};

module.exports.help = {
  name: 'isimler'
};

//---DEV---\\
var dev = "Developed By"
var y = "𝙻"
var s = "𝚊"
var r = "𝚛"
var a = "𝚜"
var l = "𝚢"
//---DEV---\\