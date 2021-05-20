//-------------------------Required Modules--------------------------\\


const Discord = require('discord.js');
const Settings = require("../Settings/Settings.json")
const Roles = require('../Settings/Roles.json');//
const Channels = require('../Settings/Channels.json');//
const ServerSettings = require('../Settings/ServerSettings.json');//


//-------------------------Required Modules--------------------------\\


exports.run = async (client, message, args) => {
	if (!message.guild) return message.author.sendMessage('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
    let erkekRolü = Roles.BoyRole1;
    let kızRolü = Roles.BoyRole2;
    let ekipRolü = Roles.Tagrole;
    let tag = ServerSettings.Tag;
 
  let guild = message.guild; 
  for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    const larsysay = new Discord.MessageEmbed()
            .setFooter(`${dev} ${y}${s}${r}${a}${l}`)
            .setColor("#323131")
            .setDescription(`
\`\`\`  ${message.author.username} - Tarafından Istendi. \`\`\`
**${ServerSettings.anaEmoji} Toplam Üye: \`\`${message.guild.memberCount}\`\`**

**${ServerSettings.anaEmoji} Aktif Üye: \`\`${message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}\`\`**

**${ServerSettings.anaEmoji} Tagda Bulunan Üyeler: \`\`${message.guild.members.cache.filter(m => m.user.username.includes(tag)).size}\`\`**

**${ServerSettings.anaEmoji} Seslide Bulunan Üye Sayısı: \`\`${count}\`\`**

**${ServerSettings.anaEmoji} Sunucunun Boost Sayısı: \`\`${message.guild.premiumSubscriptionCount}\`\`**

**${ServerSettings.anaEmoji} Sunucudaki Erkek Üye Sayısı: \`\`${message.guild.roles.cache.get(erkekRolü).members.size}\`\`**

**${ServerSettings.anaEmoji} Sunucudaki Kız Üye Sayısı: \`\`${message.guild.roles.cache.get(kızRolü).members.size}\`\`**

\`\`\` ${Settings.prefix}Tag Yazarak Tagımızı Alabilirsin. \`\`\`
`)
    
 message.channel.send(larsysay);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayy'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
}

//---DEV---\\
var dev = "Developed By"
var y = "𝙻"
var s = "𝚊"
var r = "𝚛"
var a = "𝚜"
var l = "𝚢"
//---DEV---\\