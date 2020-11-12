module.exports = {
  run: ({
    bot, message, args, server,
  }) => {
    const { status } = server.events.get('guildMemberAdd').count;
    const type = args[0];

    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe você precisa da permissão \`ADMINISTRADOR\` para executar este comando.`);
    } if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`GERENCIAR_CANAIS\` para executar este comando.`);
    } if (args.length === 0) {
      return message.channel.send(`O contador está ${status ? 'ativado' : 'desativado'}`);
    }

    switch (type) {
      case 'on': {
        if (status) {
          return message.channel.send('O contador já está ativado.');
        }
        server.events.get('guildMemberAdd').count.status = true;
        server.save();
        return message.channel.send('O contador foi ativado com sucesso!');
      }

      case 'off': {
        if (!status) {
          return message.channel.send('O contador já está desativado.');
        }
        server.events.get('guildMemberAdd').count.status = false;
        server.save();
        return message.channel.send('O contador foi desativado com sucesso!');
      }

      case 'mensagem': {
        const msg = args.slice(1).join(' ');
        const variables = ['{blue}', '{green}'];

        if (!variables.some((m) => msg.includes(m)) || !msg) {
          return message.channel.send('Parametros inválidos insira uma cor para o contador, exemplo: contador mensagem bem-vindos | membros: {green}');
        }
        server.events.get('guildMemberAdd').count.message = msg;
        server.save();
        return message.channel.send(`A mensagem do contador foi setada para \`${msg}\``);
      }

      case 'canal': {
        const channel = message.mentions.channels.first();

        if (!channel) {
          return message.channel.send('Parametros inválidos, utilize: contador canal #canal');
        } if (server.events.get('guildMemberAdd').count.message === 'None') {
          return message.channel.send('Antes de setar o canal coloque uma mensagem para o contador. Exemplo: contador mensagem atualmente temos: {blue} membros.');
        }
        server.events.get('guildMemberAdd').count.channel = channel.id;
        server.events.get('guildMemberAdd').count.status = true;
        server.save();
        bot.emit('guildMemberAdd', message.member);
        return message.channel.send(`O contador foi setado no canal ${channel}`);
      }

      case 'reset': {
        server.events.get('guildMemberAdd').count.channel = 'None';
        server.events.get('guildMemberAdd').count.message = 'None';
        server.save();
        return message.channel.send('O contador foi resetado com sucesso!');
      }

      default:
        return message.channel.send('opção invalida.');
    }
  },
  name: 'contador',
  category: 'Moderação',
  description: 'Mostra um contador de membros no topico do canal',
  aliases: ['count'],
};
