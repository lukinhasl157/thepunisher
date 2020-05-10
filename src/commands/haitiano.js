'use strict';
const { createReadStream } = require('fs');

module.exports = {
  run: async ({ message }) => {
    const memberConnection = message.member.voice.channel,
      botConnection = message.guild.me.voice.channel;

    if (!memberConnection) {
      return message.channel.send('Por favor, entre em um canal de voz primeiro!');
    } else if (memberConnection.full) {
      return message.channel.send('Desculpe, este canal de voz está cheio.');
    } else if (!memberConnection.joinable) {
      return message.channel.send('Desculpe, eu não posso entrar neste canal.');
    } else if (!memberConnection.speakable) {
      return message.channel.send('Desculpe, eu não posso transmitir áudio neste canal');
    } else if (botConnection && !botConnection.equals(memberConnection)) {
      return message.channel.send('Desculpe, eu já estou tocando uma música em outro canal de voz.');
    } else if (!memberConnection.permissionsFor(message.guild.me).has('CONNECT')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho permissão para entrar neste canal! Permissão requirida: \`CONNECT\`.`);
    } else if (!memberConnection.permissionsFor(message.guild.me).has('SPEAK')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho permissão para trasmitir áudio neste canal! Permissão requirida: \`SPEAK\`.`);
    } else {
      const connection = await memberConnection.join(),
        dispatcher = await connection.play(createReadStream('../../Haitiano.wav'), { volume: 1.0 });

      dispatcher.on('finish', () => memberConnection.leave());
    }
  },
  name: 'haitiano',
  aliases: ['aitiano'],
};
