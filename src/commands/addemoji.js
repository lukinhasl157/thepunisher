module.exports = {
  run: async ({ message, args }) => {
    const url = args.shift();
    const emojiName = args.join('-');

    if (!url) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira o link do emoji que deseja adicionar.`);
    }

    if (!emojiName) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira um nome para este emoji.`);
    }

    try {
      const emoji = await message.guild.emojis.create(url, emojiName);
      return message.channel.send(`Emoji ${emoji.toString()} foi adicionado com sucesso!`);
    } catch (error) {
      console.error(error);
      return message.channel.send('Não consegui adicionar...');
    }
  },
  name: 'addemoji',
  aliases: ['adicionaremoji', 'emojiadd', 'emoji'],
  category: 'Utilidades',
  description: 'Adicionar um emoji ao servidor.',
};
