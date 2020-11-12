module.exports = {
  run: ({ message, args, server }) => {
    const { status } = server.events.get('guildMemberAdd').welcome;
    const type = args[0];

    if (args.length === 0) {
      return message.channel.send(`O welcome está ${status ? 'ativado' : 'desativado'}`);
    }
    switch (type) {
      case 'on': {
        if (status) {
          return message.channel.send('O welcome já está ativado.');
        }
        server.events.get('guildMemberAdd').welcome.status = true;
        server.save();
        return message.channel.send('O welcome foi ativado com sucesso!');
      }

      case 'off': {
        if (!status) {
          return message.channel.send('O welcome já está desativado.');
        }
        server.events.get('guildMemberAdd').welcome.status = false;
        server.save();
        return message.channel.send('O welcome foi desativado com sucesso!');
      }
      case 'canal': {
        const channel = message.mentions.channels.first();
        const channels = message.guild.channels.filter((ch) => ch.type === 'text').map((ch) => ch);

        if (!channel) {
          return message.channel.send('Parametros inválidos insira um canal para enviar a mensagem de welcome, exemplo: welcome canal #canal');
        } if (!channels.includes(channel)) {
          return message.channel.send('Este canal não existe.');
        } if (server.events.get('guildMemberAdd').welcome.message === 'None') {
          return message.channel.send('Antes de setar o canal coloque uma mensagem de welcome. Exemplo: welcome mensagem bem-vindo {member} ao servidor {server}');
        }
        server.events.get('guildMemberAdd').welcome.channel = channel.id;
        server.save();

        return message.channel.send(`A mensagem de welcome foi setada no canal ${channel}`);
      }
      case 'mensagem': {
        const msg = args.slice(1).join(' ');
        const variables = ['{member}', '{server}'];

        if (!variables.some((m) => msg.includes(m)) || !msg) {
          return message.channel.send('Parametros inválidos insira o nome do servidor e o nome do membro na mensagem. Exemplo: welcome mensagem bem-vindo {member} ao servidor {server}');
        }
        server.events.get('guildMemberAdd').welcome.message = msg;
        server.save();
        return message.channel.send('A mensagem de welcome foi setada com sucesso!');
      }
      case 'reset': {
        server.events.get('guildMemberAdd').welcome.message = 'None';
        server.events.get('guildMemberAdd').welcome.channel = 'None';
        server.save();
        return message.reply('As configurações do welcome foram resetadas com sucesso!');
      }

      default:
        return message.replyError('Opção invalida.');
    }
  },
  name: 'welcome',
  category: 'Moderação',
  description: 'Administra o modulo Welcome.',
  aliases: [],
};
