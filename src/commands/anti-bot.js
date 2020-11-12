module.exports = {
  run: ({ message, server, args }) => {
    const { status } = server.events.get('guildMemberAdd').antiBot;
    const type = args[0];

    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, você precisa da permissão \`ADMINISTRATOR\` para executar este comando.`);
    }

    if (args.length === 0) {
      return message.channel.send(`O modo **ANTI-BOT** está \`${status ? 'ativado' : 'desativado'}\``);
    }

    if (message.author.id !== message.guild.ownerID) {
      return message.channel.send('Este comando só pode ser executado pelo dono do servidor.');
    }

    switch (type) {
      case 'on': {
        if (status) {
          return message.channel.send('O modo **ANTI-BOT** já está `ativado`');
        }

        server.events.get('guildMemberAdd').antiBot.status = true;
        server.save();

        return message.channel.send('O modo **ANTI-BOT** foi `ativado` com sucesso.');
      }

      case 'off': {
        if (!status) {
          return message.channel.send('O modo **ANTI-BOT** já está `desativado`');
        }

        server.events.get('guildMemberAdd').antiBot.status = false;
        server.save();

        return message.channel.send('O modo **ANTI-BOT** foi `desativado` com sucesso.');
      }

      default:
        return message.channel.send('opção invalida!');
    }
  },
  name: 'anti-bot',
  aliases: [],
};
