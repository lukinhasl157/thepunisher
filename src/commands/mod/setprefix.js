module.exports = {
  run: ({ message, args, server }) => {
    if (args.length === 0) {
      return message.replyError('Insira um novo prefixo.');
    }

    if (args[0].length > 5) {
      return message.replyError('O prefixo não pode passar de 5 caracteres.');
    }

    if (!Number.isNaN(args[0])) {
      return message.replyError('O prefixo não pode conter números.');
    }

    const [prefix] = args;
    server.prefix = prefix;
    message.reply(`O novo prefixo do servidor é \`${args[0]}\``);
    return server.save();
  },
  userPermissions: ['MANAGE_GUILD'],
  name: 'setprefix',
  description: 'seta um prefix pro servidor',
  category: 'Moderação',
  aliases: ['changeprefix'],
};
