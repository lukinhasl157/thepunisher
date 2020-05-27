'use strict';
module.exports = {
  run: ({ message, args, server }) => {
    const status = server.events.get('guildMemberAdd').welcome.status,
      type = args[0];

    if (args.length === 0) {
      return message.channel.send(`O welcome está ${status ? 'ativado' : 'desativado'}`);
    } else {
      switch (type) {
        case 'on': {
          if (status) {
            return message.channel.send('O welcome já está ativado.');
          } else {
            server.events.get('guildMemberAdd').welcome.status = true;
            server.save();
            message.channel.send('O welcome foi ativado com sucesso!');
          }
          break;
        }
        case 'off': {
          if (!status) {
            return message.channel.send('O welcome já está desativado.');
          } else {
            server.events.get('guildMemberAdd').welcome.status = false;
            server.save();
            message.channel.send('O welcome foi desativado com sucesso!');
          }
          break;
        }
        case 'canal': {
          const channel = message.mentions.channels.first(),
            channels = message.guild.channels.filter((ch) => ch.type === 'text').map((ch) => ch);

          if (!channel) {
            return message.channel.send(`Parametros inválidos insira um canal para enviar a mensagem de welcome, exemplo: welcome canal #canal`);
          } else if (!channels.includes(channel)) {
            return message.channel.send('Este canal não existe.');
          } else if (server.events.get('guildMemberAdd').welcome.message === 'None') {
            return message.channel.send('Antes de setar o canal coloque uma mensagem de welcome. Exemplo: welcome mensagem bem-vindo {member} ao servidor {server}');
          } else {
            server.events.get('guildMemberAdd').welcome.channel = channel.id;
            message.channel.send(`A mensagem de welcome foi setada no canal ${channel}`);
            server.save();
          }
          break;
        }
        case 'mensagem': {
          const msg = args.slice(1).join(' '),
            variables = ['{member}', '{server}'];

          if (!variables.some((m) => msg.includes(m)) || !msg) {
            return message.channel.send(`Parametros inválidos insira o nome do servidor e o nome do membro na mensagem. Exemplo: welcome mensagem bem-vindo {member} ao servidor {server}`);
          } else {
            server.events.get('guildMemberAdd').welcome.message = msg;
            message.channel.send('A mensagem de welcome foi setada com sucesso!');
            server.save();
          }
          break;
        }
        case 'reset': {
          server.events.get('guildMemberAdd').welcome.message = 'None';
          server.events.get('guildMemberAdd').welcome.channel = 'None';
          message.channel.send('As configurações do welcome foram resetadas com sucesso!');
          server.save();
          break;
        }
      }
    }
  },
  name: 'welcome',
  aliases: [],
};
