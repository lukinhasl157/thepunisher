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

    const connection = await memberConnection.join();
    const dispatcher = await connection.play(createReadStream(path.resolve('..', 'assets', 'Haitiano.wav')), { volume: 1.0 });

    dispatcher.on('finish', () => memberConnection.leave());
    return message.channel.send('Haitiano...');
  },
  botPermissions: ['CONNECT', 'SPEAK'],
  name: 'haitiano',
  category: 'Entretenimento',
  description: 'Haitiano...',
  aliases: ['aitiano'],
};
