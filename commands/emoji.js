const Discord = require("discord.js");
module.exports = {
  run: (bot, message, args) => {

  function sendEmoji () {
    const emojiSlice = args[0].slice(-19, -1);
    let embed = new Discord.RichEmbed()

    if (!emojiSlice) {
      return message.channel.send("Insira um emoji");
    } else if (args[0].startsWith("<a")) {
      embed.setImage(`https://cdn.discordapp.com/emojis/${emoji}.gif`);
      embed.setColor("RANDOM")
      message.channel.send(embed);
    } else {
      embed.setImage(`https://cdn.discordapp.com/emojis/${emojiSlice}.png?v=1`)
      embed.setColor("RANDOM");
      message.channel.send(embed);
    }
  }
  sendEmoji();
},
    aliases: ["emote", "emojiinfo", "emoteinfo"],
    category: "Utilidades",
    description: "Mostrar as informações do emoji."
}