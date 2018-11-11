const moment = require("moment");
moment.locale("pt-BR");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

                if (emoji.animated === true) animado = "Sim"
                if (emoji.animated === false) animado = "Não"

                if (emoji.managed === true) gerenciadotwitch = "Sim"
                if (emoji.managed === false) gerenciadotwitch = "Não"

        let emoji = message.guild.emojis.find(emoji => emoji.name === `${args.join(" ")}`)
        let animado;
        let gerenciadotwitch;
        const embed = new Discord.RichEmbed()
        .setAuthor(`Informações do emoji ${emoji.name}`)
        .setColor("#FF0000")
        .setImage(emoji.url)
        .addField("Do servidor:", emoji.guild.name)
        .addField("Animado:", animado)
        .addField("Criado em:", moment(emoji.createdAt).format("LLLL"))
        .addField("ID:", emoji.id)
        .addField("Gerenciado pela Twitch:", gerenciadotwitch)
        message.channel.send(embed);
    }

    module.exports.help = {
        name: "emoji"
    }


    