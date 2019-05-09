const Discord = require("discord.js");
module.exports = {
    run: (bot, message, args) => {

      function sendEmoji () {
        const emojiSlice = args[0].slice(-19, -1);

        if (!emojiSlice) {
          return message.channel.send("Insira um emoji");
        } else if (emojiSlice == null || emojiSlice == undefined) {
          return message.channel.send("Insira um emoji válido");
        } else {
          message.channel.send(new Discord.RichEmbed()
            .setImage(`https://cdn.discordapp.com/emojis/${emojiSlice}.png?v=1`)
            .setColor("RANDOM")
          );
        }
      }
      sendEmoji();
},
    aliases: ["emote", "emojiinfo", "emoteinfo"],
    category: "Utilidades",
    description: "Mostrar as informações do emoji."
}