//-------------------------Required Modules--------------------------\\


const Discord = require("discord.js");


//-------------------------Required Modules--------------------------\\


exports.run = async (client, message, args) => {

const larsyregping = new Discord.MessageEmbed()

.addField(`${client.user.username} Botunun Pingi: ` ,`${client.ws.ping} ms`)
.setColor("#323131")
.setFooter(`${dev} ${y}${s}${r}${a}${l}`)
  
return message.channel.send(larsyregping)
  
  
}
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Sade Ping Komutu işte .d',
  usage: 'ping'
}; 

//---DEV---\\
var dev = "Developed By"
var y = "𝙻"
var s = "𝚊"
var r = "𝚛"
var a = "𝚜"
var l = "𝚢"
//---DEV---\\
