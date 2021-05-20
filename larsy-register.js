//-------------------------Required Modules--------------------------\\


const Discord = require('discord.js');
const client = new Discord.Client();
const Settings = require('./Settings/Settings.json');
const Roles = require('./Settings/Roles.json');
const Channels = require('./Settings/Channels.json');
const ServerSettings = require('./Settings/ServerSettings.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./Util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');


//-------------------------Required Modules--------------------------\\


var prefix = Settings.prefix;//

const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./Commands/', (err, files) => {//
    if (err) console.error(err);//
    log("                          ")
    log("‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒")
    log(`   ${dev} ${y}${s}${r}${a}${l}`)
    log("‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒")
    log("                          ")
    log(`[ ${y}${s}${r}${a}${l} ] Komutlar Yükleniyor...`);//
    log("                          ")
    log("‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒")
    files.forEach(f => {//
        let cmds = require(`./Commands/${f}`);//
        log(`[COMMAND] ${cmds.help.name}     `);//
      
        client.commands.set(cmds.help.name, cmds);//
        cmds.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, cmds.help.name);//
        });
    });
});

fs.readdir("./Events/", (err, files) => {
if(err) return console.error(err);
log("‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒")
log("                          ")
log(`[ ${y}${s}${r}${a}${l} ] Eventler Yükleniyor...`);//
log("                          ")
log("‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒")
files.filter(rgevents => rgevents.endsWith(".js")).forEach(rgevents => {
let EventLoad = require(`./Events/${rgevents}`);
if(!EventLoad.configuration) return console.log(`[Event] ${rgevents}`)
client.on(EventLoad.configuration.name, EventLoad)})});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./Commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === Settings.Owner) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(Settings.token);


//---------------------------Messages Komutları------------------------------------\\


client.on("message", message => {
    if(message.content.toLowerCase() == "larsy") 
    return message.channel.send(`**Larsy Adamdır Gerisi Yalandır** :heart:`)
});

  const larsyinfo = new Discord.MessageEmbed()
  .setDescription(`
                    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
                   **Prefixim: \` ${Settings.prefix} \`**
                     **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
                   **Sahibim: <@${Settings.owner}>**
                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
                   **Durumum: \` ${Settings.botStatus} \`**
                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
                   **AltYapı Sahibi:** [Larsy](https://github.com/larsydev) ( <@833706558785060915> )
                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
  .setColor("#323131")
  .setTimestamp()

client.on("message", message => {
    if(message.content.toLowerCase() == `${Settings.prefix}botinfo`) 
    return message.channel.send(larsyinfo)
});

  const larsyhelp = new Discord.MessageEmbed()
  .setDescription(`
                    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**

                   **${Settings.prefix}erkek/kadın @Üye** İsim Yaş *Üye Kaydı Yapar.*

                     **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**

                   **${Settings.prefix}kayıt @Üye** İsim Yaş *Emojili Üye Kaydı Yapar.*

                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**

                   **${Settings.prefix}isimler @Üye** *Eski İsimleri Gösterir.*

                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**

                   **${Settings.prefix}teyitler @Üye** *Teyit Bilgilerini Gösterir.*

                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**

                   **${Settings.prefix}unreg @Üye** *Kullanıcıyı Kayıtsıza Atar.*

                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**

                   **${Settings.prefix}ping** *Botun Pingini Gösterir.*

                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**

                   **${Settings.prefix}say** *Sunucudaki Üyeleri Sayar.*

                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**

                   **${Settings.prefix}tagrolver @Üye** *Kullanıcıya Taglı Rolü Verir.*

                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**

                   **${Settings.prefix}seskatıl** *Bot Ayarladığınız Kanala Katılır.*

                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**

                   **${Settings.prefix}sesayrıl** *Bot Ayarladığınız Kanaldan Ayrılır.*

                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**

                   **${Settings.prefix}invites** *Sunucudaki Davetlerinizi Gösterir.*

                      **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
`)
  .setColor("#323131")
  .setFooter(`Developed By Larsy`)
  .setTimestamp()

client.on("message", message => {
    if(message.content.toLowerCase() == `${Settings.prefix}yardım`) 
    return message.channel.send(larsyhelp)
});

client.on("message", message => {
    if(message.content.toLowerCase() == `${Settings.prefix}tag`) 
    return message.channel.send(`\`${ServerSettings.Tag}\``)
});

client.on("message", message => {
    if(message.content.toLowerCase() == `tag`) 
    return message.channel.send(`\`${ServerSettings.Tag}\``)
});

client.on('message', message => {
  if(message.content.toLowerCase() ===`${Settings.prefix}seskatıl`) {
    if(message.author.id !== Settings.owner) return message.channel.send(`Bu Komutu Sadece Botun Sahibi Kullanabilir! ( <@${Settings.owner}> )`)
    message.channel.send(`<#${Settings.botVoiceChannelID}> **Kanalına Katıldım!** :green_square: `)
    client.channels.cache.get(Settings.botVoiceChannelID).join()
  }
})

client.on('message', async message => {
if (message.content === '!join') { 
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

client.on('message', message => {
  if(message.content.toLowerCase() ===`${Settings.prefix}sesayrıl`) {
    if(message.author.id !== Settings.owner) return message.channel.send(`Bu Komutu Sadece Botun Sahibi Kullanabilir! ( <@${Settings.owner}> )`)
    message.channel.send(`<#${Settings.botVoiceChannelID}> **Kanalından Ayrıldım!** :green_square: `)
    client.channels.cache.get(Settings.botVoiceChannelID).leave()
  }
})


client.on('message', message => {
    if(message.content === `${Settings.prefix}invites`){
        var user = message.author;

        message.guild.fetchInvites()
        .then

        (invites =>
            {
                const userInvites = invites.array().filter(o => o.inviter.id === user.id);
                var userInviteCount = 0;
                for(var i=0; i < userInvites.length; i++)
                {
                    var invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }
                     message.reply(`You have ${userInviteCount} invites.`);
            }
        )
    }
});

//---------------------------Messages Komutları------------------------------------\\


client.on("guildMemberAdd", async (member) => {
    member.roles.add(Roles.Unregister)
    member.roles.add(Roles.Unregister) 
    member.roles.add(Roles.Unregister)
    member.roles.add(Roles.Unregister)   
    if (member.user.tag.includes(ServerSettings.Tag)) {
    member.setNickname(`${ServerSettings.Tag} ${ServerSettings.WelcomeName}`)
  } else {
    member.setNickname(`${ServerSettings.UnTag} ${ServerSettings.WelcomeName}`)
  }
    if (member.user.tag.includes(ServerSettings.Tag)) {
    member.setNickname(`${ServerSettings.Tag} ${ServerSettings.WelcomeName}`)
  } else {
    member.setNickname(`${ServerSettings.UnTag} ${ServerSettings.WelcomeName}`)
  }
    if (member.user.tag.includes(ServerSettings.Tag)) {
    member.setNickname(`${ServerSettings.Tag} ${ServerSettings.WelcomeName}`)
  } else {
    member.setNickname(`${ServerSettings.UnTag} ${ServerSettings.WelcomeName}`)
  }
    });

 

//---------------------------BOTU SESE SOKMA---------------------------\\ 


    client.on("ready", async () => {
      let botVoiceChannel = client.channels.cache.get(Settings.botVoiceChannelID);
      if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot Ses Kanalına Bağlanamıyor, Lütfen Ses Kanal ID'sini Kontrol Et."));
    });
    

//---------------------------BOTU SESE SOKMA---------------------------\\      
    

//-------------------------GUVENILIRLIK KONTROL--------------------------\\    


    client.on("guildMemberAdd", member => {  
      let larsy4 = client.users.cache.get(member.id);
      require("moment-duration-format");
      const kurulus = new Date().getTime() - larsy4.createdAt.getTime();  
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `${ServerSettings.sifirEmoji}`,
            '1': `${ServerSettings.birEmoji}`,
            '2': `${ServerSettings.ikiEmoji}`,
            '3': `${ServerSettings.ucEmoji}`,
            '4': `${ServerSettings.dortEmoji}`, 
            '5': `${ServerSettings.besEmoji}`,
            '6': `${ServerSettings.altiEmoji}`,
            '7': `${ServerSettings.yediEmoji}`,
            '8': `${ServerSettings.sekizEmoji}`,
            '9': `${ServerSettings.sekizEmoji}`}[d];})}
       var kontrol;
    if (kurulus < 1296000000) kontrol = `Güvenilir Değil ${ServerSettings.carpi}`
    if (kurulus > 1296000000) kontrol = `Güvenilir Gibi ${ServerSettings.tik}`
      moment.locale("tr");
      const kanal = member.guild.channels.cache.get(Channels.WelcomeChat)     
      const kuruluss = new Date().getTime() - larsy4.createdAt.getTime();  
      const gecen = moment.duration(kuruluss).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
      const korumatarih = moment.duration(kuruluss).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 


//-------------------------GUVENILIRLIK KONTROL--------------------------\\


//---------------------------HOSGELDIN MESAJI-----------------------------\\  


kanal.send(`
${ServerSettings.welcomeEmoji}  **Sunucumuza Hoşgeldin ${larsy4}.

    ${ServerSettings.welcomeEmoji}  Sunucumuz Seninle Beraber ${üyesayısı} Kişiye Ulaştı.

             ${ServerSettings.welcomeEmoji}  Tagımızı Alarak Ailemize Katılabilirsin. (\`${ServerSettings.Tag}\`)

               ${ServerSettings.welcomeEmoji}  <@&${Roles.Registerer}> Rolündeki Arkadaşlar Senin Ile İlgilenicektir.

              ${ServerSettings.welcomeEmoji}  Hesabın \`${gecen}\` Önce Oluşturulmuş.

     ${ServerSettings.welcomeEmoji}  Bu Kullanıcı ${kontrol}.

${ServerSettings.welcomeEmoji}  Confirmed Odalarından Birine Geçerek Kaydolabilirsin.**`)

    })
  

  //---------------------------HOSGELDIN MESAJI-----------------------------\\


  //-----------------------------SUPHELI SISTEM------------------------------\\


  client.on("guildMemberAdd", member => {
    let larsyy = client.users.cache.get(member.id);
    const sphlogs = member.guild.channels.cache.get(Channels.SupheliLogss)
    const kanall = member.guild.channels.cache.get(Channels.WelcomeChat)     
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
     member.roles.remove(Roles.Unregister)
     member.roles.remove(Roles.Unregister)   
     member.roles.remove(Roles.Unregister)
     member.roles.remove(Roles.Unregister)      
     member.roles.add(Roles.Supheli)
     member.roles.add(Roles.Supheli)
     member.roles.add(Roles.Supheli)
     member.roles.add(Roles.Supheli)     
     member.roles.add(Roles.Jail)
     member.roles.add(Roles.Jail)
     member.roles.add(Roles.Jail)
     member.roles.add(Roles.Jail) 
     member.setNickname(ServerSettings.SupheliName)
     member.setNickname(ServerSettings.SupheliName)
     member.setNickname(ServerSettings.SupheliName)
     member.setNickname(ServerSettings.SupheliName)

  member.user.send('**Selam Hesabın Yeni Açıldığı İçin Şüpheli Hesap Katagorisine Giriyor Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.**')
  setTimeout(() => {

  kanall.send(`${larsyy} **Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Şüpheliye Atıldın.**`)

  const suphelilogs = new Discord.MessageEmbed()
  .setTitle(`Şüpheliye Atıldı`)
  .setDescription(`${larsyy} **Şüpheliye Atıldı**`)
  .setColor("#323131")
  .setTimestamp()

  sphlogs.send(suphelilogs)  
  
  }, 1000)
  
  
     }
          else {
  
          }
      });


  //-----------------------------SUPHELI SISTEM-------------------------------\\   


 //-----------------------------TAG ROL SISTEMI-------------------------------\\ 


client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  try {

  if (newUser.username.includes(ServerSettings.Tag) && !client.guilds.cache.get(ServerSettings.ServerID).members.cache.get(newUser.id).roles.cache.has(Roles.TagRole)) {
  await client.channels.cache.get(Channels.TagLog).send(new Discord.MessageEmbed().setColor("#323131").setDescription(`**${newUser} Tagımızı ( ${ServerSettings.Tag} ) Aldığı İçin <@&${Roles.TagRole}> Rolünü Kazandı**`));
  await client.guilds.cache.get(ServerSettings.ServerID).members.cache.get(newUser.id).roles.add(Roles.TagRole);
  }
  if (!newUser.username.includes(ServerSettings.Tag) && client.guilds.cache.get(ServerSettings.ServerID).members.cache.get(newUser.id).roles.cache.has(Roles.TagRole)) {
  await client.channels.cache.get(Channels.TagLog).send(new Discord.MessageEmbed().setColor("#323131").setDescription(`**${newUser} Tagımızı ( ${ServerSettings.Tag} ) Çıkardığı İçin <@&${Roles.TagRole}> Rolünü Kaybetti**`));
  await client.guilds.cache.get(ServerSettings.ServerID).members.cache.get(newUser.id).roles.remove(Roles.TagRole);
}
} catch (e) {
console.log(`Tag Rol Sisteminde Bir Hata Olustu :/ ( 384-408`)
 }
}
});
 //-----------------------------TAG ROL SISTEMI-------------------------------\\ 


var dev = "Developed By"
var y = "𝙻"
var s = "𝚊"
var r = "𝚛"
var a = "𝚜"
var l = "𝚢"