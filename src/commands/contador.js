'use strict';
module.exports = {
  run: ({ bot, message, args, server }) => {
    const status = server.events.get('guildMemberAdd').count.status,
      type = args[0];

    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe você precisa da permissão \`ADMINISTRADOR\` para executar este comando.`);
    } else if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`GERENCIAR_CANAIS\` para executar este comando.`);
    } else if (args.length === 0) {
      return message.channel.send(`O contador está ${status ? 'ativado' : 'desativado'}`);
    } else {
      switch (type) {
        case 'on': {
          if (status) {
            return message.channel.send('O contador já está ativado.');
          } else {
            server.events.get('guildMemberAdd').count.status = true;
            server.save();
            message.channel.send('O contador foi ativado com sucesso!');
          }
          break;
        }
        case 'off': {
          if (!status) {
            return message.channel.send('O contador já está desativado.');
          } else {
            server.events.get('guildMemberAdd').count.status = false;
            server.save();
            message.channel.send('O contador foi desativado com sucesso!');
          }
          break;
        }
        case 'mensagem': {
          const msg = args.slice(1).join(' '),
            variables = ['{blue}', '{green}'];

          if (!variables.some((m) => msg.includes(m)) || !msg) {
            return message.channel.send(`Parametros inválidos insira uma cor para o contador, exemplo: contador mensagem bem-vindos | membros: {green}`);
          } else {
            server.events.get('guildMemberAdd').count.message = msg;
            message.channel.send(`A mensagem do contador foi setada para \`${msg}\``);
            server.save();
          }
        }
          break;
        case 'canal': {
          const channel = message.mentions.channels.first();

          if (!channel) {
            return message.channel.send('Parametros inválidos, utilize: contador canal #canal');
          } else if (server.events.get('guildMemberAdd').count.message === 'None') {
            return message.channel.send('Antes de setar o canal coloque uma mensagem para o contador. Exemplo: contador mensagem atualmente temos: {blue} membros.');
          } else {
            server.events.get('guildMemberAdd').count.channel = channel.id;
            server.events.get('guildMemberAdd').count.status = true;
            server.save();
            message.channel.send(`O contador foi setado no canal ${channel}`);
            bot.emit('guildMemberAdd', message.member);
          }
          break;
        }
        case 'reset': {
          server.events.get('guildMemberAdd').count.channel = 'None';
          server.events.get('guildMemberAdd').count.message = 'None';
          message.channel.send('O contador foi resetado com sucesso!');
          server.save();
          break;
        }
      }
    }
  },
  name: 'contador',
  aliases: ['count'],
};
