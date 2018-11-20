const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = {
    run: (bot, message, args) => {

    try {

        var emoji = bot.emojis.get(args.join(' ')) || bot.emojis.find(e => e.name === `${args.join(' ')}`)

    if (emoji) {
        let inline = 2;
        let embed = new Discord.RichEmbed()
        .setAuthor("» Informações do emoji", message.guild.iconURL)
        .addField("» Servidor:", emoji.guild.name)
        .addField("» Nome do emoji:", emoji.name)
        .addField("» ID do emoji:", emoji.id)
        .addField("» Unicode do emoji:", `\`\`\`\n${emoji}\`\`\``)
        .addField("» Emoji animado:", emoji.animated.toString().replace('false', 'Nao').replace('true',"Sim"))
        .addField("» Emoji criado em:", moment(emoji.createdAt).format('LLLL'))
        .setColor('#ff0000')
        .setImage(emoji.url)

        message.channel.send(embed);

    } else {
    message.channel.send(`**${message.author.username}**, o emoji ${args.join(" ")} não foi encontrado.`);
    }

    } catch(e) {
        message.channel.send(`**${message.author.username}**, deu merda quando tentei executar o comando **Emoji**, ${e}`)
    }

},
    aliases: ["emote", "emojiinfo", "emoteinfo"],
    category: "Utilidades",
    description: "Mostrar as informações do emoji."
}



    