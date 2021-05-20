//-------------------------Required Modules--------------------------\\


const { MessageEmbed, Client, Message } = require("discord.js");
const Settings = require("../Settings/Settings.json")
const Roles = require('../Settings/Roles.json');//
const Channels = require('../Settings/Channels.json');//
const ServerSettings = require('../Settings/ServerSettings.json');//


//-------------------------Required Modules--------------------------\\


module.exports.run = async (client, message, args) => {

  let yetkili = Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(yetkili)) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**__Bu Komut İçin Yetkiniz Bulunmamaktadır.__**`).setColor("#323131")).then(x => x.delete({ timeout: 6500 }));

  let uyarıembed = new MessageEmbed().setFooter(`${dev} ${y}${s}${r}${a}${l}`).setTimestamp()
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  if (!user) return message.channel.send(uyarıembed.setDescription("**__Bir kişiyi etiketlemelisin.__**"))
  if (!isim) return message.channel.send(uyarıembed.setDescription("**__Bir isim belirmelisin.__**"))
  if (!yaş) return message.channel.send(uyarıembed.setDescription("**__Bir yaş belirtmelisin__**"))
  if (yaş < 13) return message.channel.send(uyarıembed.setDescription("**__Discord kurallarına göre bir üyenin yaşı 13'ten küçük olamaz.__**"))


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

  const embed = new MessageEmbed()
  .setDescription(`**__Başarıyla ${user} üyesinin ismi \`${isim} | ${yaş}\` olarak değiştirildi.__**`)
  .setColor("#323131")
  .setFooter(`${dev} ${y}${s}${r}${a}${l}`)
  .setTimestamp()
  message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim", "i", "isimdegistir", "isimdeğiştir", "isim-değiştir"]
};

module.exports.help = {
  name: 'isim'
};

//---DEV---\\
var dev = "Developed By"
var y = "𝙻"
var s = "𝚊"
var r = "𝚛"
var a = "𝚜"
var l = "𝚢"
//---DEV---\\