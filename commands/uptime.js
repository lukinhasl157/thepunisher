const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

    module.exports.run = async (bot, message, args) => {

    let duration = moment.duration(bot.uptime).format('D [d], H [h], m [m], s [s]')
    message.channel.send(new Discord.RichEmbed().setDescription(`Estou online há: <:fast:500147391945768981> **${duration}**`).setFooter(`${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#07ed66"));
}

module.exports.help = {
    name: "uptime"
  }
