const Discord = require("discord.js");
module.exports = {
    run: (bot, message, args) => {
    const rpl = { ":": "", "<": "", ">": "", "0": "", "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "", "9": "" }
    const emoji = bot.emojis.find((e) => e.name === `${rpl[args.join(" ")]}`);

    message.channel.send(new Discord.RichEmbed()
          .setImage(emoji.url)
          .setColor("RANDOM")
        );
},
    aliases: ["emote", "emojiinfo", "emoteinfo"],
    category: "Utilidades",
    description: "Mostrar as informações do emoji."
}