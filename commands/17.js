const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let gifs = ['https://thumbs.gfycat.com/FilthyBrightAzurevase-size_restricted.gif']
    let random = Math.round(Math.random() * gifs.length);
    const embed = new Discord.RichEmbed()
        .setTitle("**É 17 PORRA**")
        .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
        .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
        .setTimestamp()
        .setColor("RANDOM");
    message.channel.send(embed);
  
}