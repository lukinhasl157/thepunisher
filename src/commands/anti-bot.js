'use strict';
module.exports = {
  run: ({ message, server, args }) => {
    const status = server.events.get('guildMemberAdd').antiBot.status,
      type = args[0];

    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, você precisa da permissão \`ADMINISTRATOR\` para executar este comando.`);
    } else if (args.length === 0) {
      return message.channel.send(`O modo **ANTI-BOT** está \`${status ? 'ativado' : 'desativado'}\``);
    } else if (message.author.id !== message.guild.ownerID) {
      return message.channel.send('Este comando só pode ser executado pelo dono do servidor.');
    } else {
      switch (type) {
        case 'on': {
          if (status) {
            return message.channel.send('O modo **ANTI-BOT** já está \`ativado\`');
          } else {
            message.channel.send('O modo **ANTI-BOT** foi \`ativado\` com sucesso.');
            server.events.get('guildMemberAdd').antiBot.status = true;
            server.save();
          }
          break;
        }
        case 'off': {
          if (!status) {
            return message.channel.send('O modo **ANTI-BOT** já está \`desativado\`');
          } else {
            message.channel.send('O modo **ANTI-BOT** foi \`desativado\` com sucesso.');
            server.events.get('guildMemberAdd').antiBot.status = false;
            server.save();
          }
          break;
        }
      }
    }
  },
  name: 'anti-bot',
  aliases: [],
};
