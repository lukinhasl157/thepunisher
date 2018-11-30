module.exports = {
    run: async function (bot, message, args) {

      try {

        let emoji = bot.emojis.find(e => e.name === `${args.join(" ")}`);

    if (emoji) {
      message.channel.send(emoji.url);

    } else {

      message.channel.send(`**${message.author.username}** | Erro: o emoji **${args.join(" ")}** não foi encontrado.`)
    }

    } catch(e) {
      message.channel.send(`**${message.author.username}**, deu merda quando tentei executar o comando **Emoji**, ${e}`)
    }

},
    aliases: ["emote", "emojiinfo", "emoteinfo"],
    category: "Utilidades",
    description: "Mostrar as informações do emoji."
}


    