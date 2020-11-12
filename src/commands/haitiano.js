const { createReadStream } = require('fs');
const path = require('path');

module.exports = {
  run: async ({ message }) => {
    const memberConnection = message.member.voice.channel;
    const botConnection = message.guild.me.voice.channel;

    if (!memberConnection) {
      return message.channel.send('Por favor, entre em um canal de voz primeiro!');
    }

    if (memberConnection.full) {
      return message.channel.send('Desculpe, este canal de voz está cheio.');
    }

    if (!memberConnection.joinable) {
      return message.channel.send('Desculpe, eu não posso entrar neste canal.');
    }

    if (!memberConnection.speakable) {
      return message.channel.send('Desculpe, eu não posso transmitir áudio neste canal');
    }

    if (botConnection && !botConnection.equals(memberConnection)) {
      return message.channel.send('Desculpe, eu já estou tocando uma música em outro canal de voz.');
    }

    if (!memberConnection.permissionsFor(message.guild.me).has('CONNECT')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho permissão para entrar neste canal! Permissão requirida: \`CONNECT\`.`);
    }

    if (!memberConnection.permissionsFor(message.guild.me).has('SPEAK')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho permissão para trasmitir áudio neste canal! Permissão requirida: \`SPEAK\`.`);
    }

    const connection = await memberConnection.join();
    const dispatcher = await connection.play(createReadStream(path.resolve('..', 'assets', 'Haitiano.wav')), { volume: 1.0 });

    dispatcher.on('finish', () => memberConnection.leave());
    return message.channel.send('Haitiano...');
  },
  name: 'haitiano',
  aliases: ['aitiano'],
};
