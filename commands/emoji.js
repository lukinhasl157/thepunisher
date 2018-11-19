const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = {
    run: (bot, message, args) => {

        var emoji = bot.emojis.get(args.join(' ')) || bot.emojis.find('name', args.join(' '))

   if (emoji) {
    let embed = new Discord.RichEmbed()
    .setTitle("» Informações do emoji")
    .addField("» Nome do emoji:", emoji.name)
    .addField("» ID do emoji:", emoji.id)
    .addField("» Unicode do emoji:", `+'```'+emoji+'```'+`)
    .addField("» Emoji animado:", emoji.animated.toString().replace('false', 'Nao').replace('true',"Sim"))
    .addField("» Emoji criado em:", moment(emoji.createdAt).format('LLL'))
    .addField("» Servidor:", emoji.guild.name)
    .addField("» Link de download:", [Download](emoji.url))
    .setColor('#ff0000')
    .setThumbnail(emoji.url)

    message.channel.send(embed)

  } else {
    message.channel.send(`**${message.author.username}**, o emoji ${args.join(" ")} não foi encontrado.`)
  }

    },
    aliases: ["emote", "emojiinfo", "emoteinfo"],
    category: "Utilidades",
    description: "Mostrar as informações do emoji."
    }



    