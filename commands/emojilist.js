    const Discord = require("discord.js");

    module.exports = {
        run: (bot, message, args) => {

    let emojis = message.guild.emojis.map(a => a).join(' ');
    
    let emojiembed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setAuthor(`Lista de emojis ${message.guild.name}`)
    .setThumbnail(message.guild.iconURL)
    .setDescription(emojis)
    .setFooter(`Comando soliticado por: ${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp(new Date())
    message.channel.send(emojiembed);

    },
        aliases: ["emojis", "emotes", "emotelist"],
        category: "Utilidades",
        description: "Mostar a lista de emojis do servidor."
    }
