'use strict';
module.exports = {
  run: ({ message, args, server }) => {
    if (!message.member.permissions.has('MANAGE_GUILD')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, você não tem permissão para executar este comando! Permissão necessária: \`\`MANAGE_GUILD\`\`.`);
    } else if (args.length === 0) {
      return message.channel.send('Insira um novo prefixo.');
    } else if (args[0].length > 5) {
      return message.channel.send('O prefixo não pode passar de 5 caracteres.');
    } else if (!isNaN(args[0])) {
      return message.channel.send('O prefixo não pode conter números.');
    } else {
      server.prefix = args[0];
      message.channel.send(`O novo prefixo do servidor é \`${args[0]}\``);
      return server.save();
    }
  },
  name: 'setprefix',
  aliases: ['changeprefix'],
};
