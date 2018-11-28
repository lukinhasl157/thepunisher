const Discord = require('discord.js');
const snek = require('snekfetch');
const twemoji = require('twemoji');
const fs = require('fs');

module.exports = {
    run: async function (bot, message, args) {

      try {

  let reason = args.slice(0).join(' ');

    if (!reason) {

        let emoji = bot.emojis.find(e => e.name === `${args.join(" ")}`);
        const emote = Discord.Util.parseEmoji(args[0]);

        if (emote.animated === true) {

          const URL = `https://cdn.Discordapp.com/emojis/${emote.id}.gif?size=2048`;
          const { body: buffer } = await snek.get(`${URL}`);
          const toSend = fs.writeFileSync('emote.gif', buffer);          
          message.channel.send({ file: 'emote.gif' });
        } else if (emote.id === null) {
          const twemote = twemoji.parse(args[0]);
          const regex = /src="(.+)"/g;
          const regTwemote = regex.exec(twemote)[1];
          const { body: buffer } = await snek.get(`${regTwemote}`);
          const toSend = fs.writeFileSync('emote.png', buffer);
          await message.channel.send({ file: 'emote.png' });
        } else {
          const URL = `https://cdn.Discordapp.com/emojis/${emote.id}.png?size=2048`;
          const { body: buffer } = await snek.get(`${URL}`);
          const toSend = fs.writeFileSync('emote.png', buffer);
          message.channel.send({ file: 'emote.png' });
        } 

            if (emoji) {
            let embed = new Discord.RichEmbed()
            .setImage(emoji.url)
            message.channel.send(embed);
        }

        } else {
      message.channel.send(`**${message.author.username}** | Por favor, insira um emoji válido.`)
    }

        } catch(e) {
        message.channel.send(`**${message.author.username}**, deu merda quando tentei executar o comando **Emoji**, ${e}`)
    }

},
    aliases: ["emote", "emojiinfo", "emoteinfo"],
    category: "Utilidades",
    description: "Mostrar as informações do emoji."
}


    