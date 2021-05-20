const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const Settings = require("../Settings/Settings.json");

var prefix = Settings.prefix;

module.exports = client => {

var botname = client.user.username;

  client.user.setStatus("dnd");
  client.user.setActivity(Settings.botStatus, { type: "PLAYING"}); //// TYPE - WATCHING , PLAYING , LISTENING

  console.log('‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒')
  console.log("                          ")
  console.log(`${botname} ( ${prefix} ) CONNECTED!`) 
};
