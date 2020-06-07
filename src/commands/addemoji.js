'use strict';
module.exports = {
  run: async ({ message, args }) => {
    const url = args.shift(),
      emojiName = args.join('-');

    if (!url) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira o link do emoji que deseja adicionar.`);
    } else if (!emojiName) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira um nome para este emoji.`);
    } else {
      const emoji = await message.guild.emojis.create(url, emojiName).catch(console.error);

      message.channel.send(`Emoji ${emoji.toString()} foi adicionado com sucesso!`);
    }
  },
  name: 'addemoji',
  aliases: ['adicionaremoji', 'emojiadd', 'emoji'],
  category: 'Utilidades',
  description: 'Adicionar um emoji ao servidor.',
};
