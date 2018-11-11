const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

       let gifs = ['https://thumbs.gfycat.com/FilthyBrightAzurevase-size_restricted.gif'] //https://cdn.discordapp.com/attachments/425866183904854029/506976166675087363/png.png
       let random = Math.round(Math.random() * gifs.length);
    const embed = new Discord.RichEmbed()
    .setTitle("**É 17 PORRA**")
    .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
    .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send(embed);
  
  }

  module.exports.help = {
      name: "17" 
  }