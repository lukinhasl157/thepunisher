
    const Discord = require("discord.js");
    module.exports.run = async (bot, message, args) => {

    const emojis = message.guild.emojis.map(a => a).join(' ')
    let servernome = message.guild.name
    let servericone = message.guild.iconURL
    let cor = '#ff0000'
    
    let emojiembed = new Discord.RichEmbed()
    .setColor(cor)
    .setAuthor(`Lista de emojis ${servernome}`)
    .setThumbnail(servericone)
    .setDescription(`${emojis}`)
    .setFooter(`Comando soliticado por: ${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp()
    message.channel.send(emojiembed);
    }
    module.exports.help = {
        name: "emojilist"
      }
