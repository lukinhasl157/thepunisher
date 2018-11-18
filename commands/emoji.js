const moment = require("moment");
moment.locale("pt-BR");
const Discord = require("discord.js");

module.exports = {
    run: (bot, message, args) => {

        let emoji = message.guild.emojis.map(e => e === `${args.join(" ")}`);

           if (emoji.animated === true) animado = "Sim"
           if (emoji.animated === false) animado = "Não"

        let animado;
        let embed = new Discord.RichEmbed()
        .setAuthor(`Informações do emoji ${emoji.name}`)
        .setColor("#FF0000")
        .setImage(emoji.url)
        .addField("Animado:", animado)
        .addField("Criado em:", moment(emoji.createdAt).format("LLLL"))
        .addField("ID:", emoji.id)
        message.channel.send(embed);
    },

    aliases: ["emote", "emojiinfo", "emoteinfo"],
    category: "Utilidades",
    description: "Mostrar as informações do emoji."
    }


    