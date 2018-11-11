const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let replies = ["Você morreu!", "Você sobreviveu!", "Você levou um tiro de raspão!", "Você saiu ileso!"]
    
    let result = Math.floor((Math.random() * replies.length));
    
    let dadoembed = new Discord.RichEmbed()
    .setFooter(message.author.tag, message.author.displayAvatarURL)
    .setThumbnail(message.author.avatarURL)
    .setColor('RANDOM')
    .addField("O que será que aconteceu?", replies[result])
    
    message.channel.send(dadoembed); 
    }

    module.exports.help = {
        name: "roleta"
    }