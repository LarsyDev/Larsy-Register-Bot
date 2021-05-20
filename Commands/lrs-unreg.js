//-------------------------Required Modules--------------------------\\


const { MessageEmbed } = require('discord.js');
const Settings = require("../Settings/Settings.json")
const Roles = require('../Settings/Roles.json');//
const Channels = require('../Settings/Channels.json');//
const ServerSettings = require('../Settings/ServerSettings.json');//


//-------------------------Required Modules--------------------------\\


exports.run = async (client, message, args) => {
  const unregister = message.guild.roles.cache.find(r => r.id === "Roles.Unregister")
  const ravi2 = new MessageEmbed().setFooter(`${dev} ${y}${s}${r}${a}${l}`).setColor("#323131").setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
  if(![("Roles.yetkili")].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(ravi2.setDescription("**__Bu Komut İçin Yetkiniz Bulunmamaktadır.__**"))

  let embedx = new MessageEmbed()
  let users = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!users)message.channel.send(embedx.setDescription(`**__Bir Üye Etiketlemelisin.**__`).setFooter(`${dev} ${y}${s}${r}${a}${l}`).setTimestamp().setColor("#323131"))

if (users.user.tag.includes(ServerSettings.Tag)) {
    users.setNickname(`${ServerSettings.Tag} ${ServerSettings.WelcomeName}`)
  } else {
    users.setNickname(`${ServerSettings.UnTag} ${ServerSettings.WelcomeName}`)
  }  
users.roles.add(Roles.Unregister);
users.roles.cache.forEach(r => {
users.roles.remove(r.id)
})
  let embed = new MessageEmbed()
  message.channel.send(embed.setDescription(`${users} **__Adlı Kullanıcı Başarıyla Kayıtsız'a Atıldı.__**`).setTimestamp().setColor("#323131").setFooter(`${dev} ${y}${s}${r}${a}${l}`))
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtsız", 'unreg', 'unregister']
};

module.exports.help = {
  name: 'unregister'
};

//---DEV---\\
var dev = "Developed By"
var y = "𝙻"
var s = "𝚊"
var r = "𝚛"
var a = "𝚜"
var l = "𝚢"
//---DEV---\\