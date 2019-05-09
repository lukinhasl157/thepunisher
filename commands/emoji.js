const Discord = require("discord.js");
module.exports = {
    run: (bot, message, args) => {

      function sendEmoji () {
        const emojiSlice = args[0].slice(-19, -1) || bot.emojis.find((e) => e.name === `${args[0]}`);
        message.channel.send(new Discord.RichEmbed()
          .setImage(`https://cdn.discordapp.com/emojis/${emojiSlice}.png?v=1`)
          .setColor("RANDOM")
        );
      }
      sendEmoji();
},
    aliases: ["emote", "emojiinfo", "emoteinfo"],
    category: "Utilidades",
    description: "Mostrar as informações do emoji."
}