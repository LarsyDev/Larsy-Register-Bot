//-------------------------Required Modules--------------------------\\


const Discord = require("discord.js");
const Settings = require("../Settings/Settings.json")
const Roles = require('../Settings/Roles.json');//
const Channels = require('../Settings/Channels.json');//
const ServerSettings = require('../Settings/ServerSettings.json');//


//-------------------------Required Modules--------------------------\\


module.exports.run = async (client, message, args) => {
  let yetkili = Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(yetkili)) return message.channel.send(new Discord.MessageEmbed()().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor("#323131")).then(x => x.delete({ timeout: 6500 }));

const larsy = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!larsy) return message.channel.send(`*Tag Rolü Vermek Için Bir Kişi Etiketlemelisin!**`)

const lrstagrol = new Discord.MessageEmbed()
.setColor("#323131")
.setFooter(`${dev} ${y}${s}${r}${a}${l}`)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

if(larsy.roles.cache.has(Roles.TagRole)) return message.channel.send(lrstagrol.setDescription(`Kullanıcıdan Başarıyla Taglı ( <@&${Roles.TagRole}> ) Rolü Alındı!`)).then(larsy.roles.remove(Roles.TagRole))

larsy.roles.add(Roles.TagRole)

message.channel.send(lrstagrol.setDescription(`Kullanıcıya Başarıyla Taglı ( <@&${Roles.TagRole}> ) Rolü Verildi!`))
  
}
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tagrol", "taglırol", "taglirol", "taglirolver", "taglırol"]
};

exports.help = {
  name: 'tagges',
  description: 'Tag Rolü Verir',
}; 

//---DEV---\\
var dev = "Developed By"
var y = "𝙻"
var s = "𝚊"
var r = "𝚛"
var a = "𝚜"
var l = "𝚢"
//---DEV---\\
