module.exports = {
  run: async ({ message, args }) => {
    const url = args.shift();
    const emojiName = args.join('-');

    if (!url) {
      return message.reply('Por favor, insira o link do emoji que deseja adicionar.');
    }

    if (!emojiName) {
      return message.reply('Por favor, insira um nome para este emoji.');
    }

    try {
      const emoji = await message.guild.emojis.create(url, emojiName);
      return message.reply(`Emoji ${emoji.toString()} foi adicionado com sucesso!`);
    } catch (error) {
      console.error(error);
      return message.replyError('Não consegui adicionar o emoji.');
    }
  },
  botPermissions: ['MANAGE_EMOJIS'],
  userPermissions: ['MANAGE_EMOJIS'],
  name: 'addemoji',
  aliases: ['adicionaremoji', 'emojiadd', 'emoji'],
  category: 'Utilidades',
  description: 'Adicionar um emoji ao servidor.',
};
