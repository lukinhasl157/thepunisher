const Discord = require("discord.js");
module.exports = {
    run: (bot, message, args) => {
    const emoji = bot.emojis.find((e) => e.name === `${args.join(" ")}`).replace(":", "");

    message.channel.send(new Discord.RichEmbed()
          .setImage(emoji.url)
          .setColor("RANDOM")
        );
},
    aliases: ["emote", "emojiinfo", "emoteinfo"],
    category: "Utilidades",
    description: "Mostrar as informações do emoji."
}