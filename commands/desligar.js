
    const Discord = require("discord.js");

    module.exports.run = async (bot, message, args) => {

    if (message.author.id !== '289209067963154433') return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Este comando é exclusivo do <@289209067963154433>`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    await message.channel.send(new Discord.RichEmbed().setTitle("<:power:501138002924535808> Desligando o sistema...").setFooter(`${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    process.exit(0);
  }
  module.exports.help = {
    name: "desligar"
  }
