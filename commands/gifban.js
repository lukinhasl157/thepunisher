

    const Discord = require("discord.js");

    module.exports.run = async (bot, message, args) => {

        const embed = new Discord.RichEmbed()
        .setImage("https://media.giphy.com/media/t76ogkWiBZxLTPvHMd/giphy.gif")
        .setTimestamp()
        .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
        .setColor('#ff9d00')
        message.channel.send(embed);
  
      }
      module.exports.help = {
        name: "gifban"
      }
    