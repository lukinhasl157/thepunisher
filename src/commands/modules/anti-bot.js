module.exports = {
  run: ({ message, server, args }) => {
    const { status } = server.events.get('guildMemberAdd').antiBot;
    const type = args[0];

    if (args.length === 0) {
      return message.reply(`O modo **ANTI-BOT** está \`${status ? 'ativado' : 'desativado'}\``);
    }

    if (message.author.id !== message.guild.ownerID) {
      return message.replyError('Este comando só pode ser executado pelo dono do servidor.');
    }

    switch (type) {
      case 'on': {
        if (status) {
          return message.reply('O modo **ANTI-BOT** já está `ativado`');
        }

        server.events.get('guildMemberAdd').antiBot.status = true;
        server.save();

        return message.reply('O modo **ANTI-BOT** foi `ativado` com sucesso.');
      }

      case 'off': {
        if (!status) {
          return message.reply('O modo **ANTI-BOT** já está `desativado`');
        }

        server.events.get('guildMemberAdd').antiBot.status = false;
        server.save();

        return message.reply('O modo **ANTI-BOT** foi `desativado` com sucesso.');
      }

      default:
        return message.replyError('opção invalida!');
    }
  },
  userPermissions: ['ADMINISTRATOR'],
  botPermissions: ['BAN_MEMBERS'],
  name: 'anti-bot',
  category: 'Moderação',
  description: 'Expulsa bots ao entrar no servidor.',
  aliases: [],
};
