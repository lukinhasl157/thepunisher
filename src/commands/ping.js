'use strict';
module.exports = {
  run: async ({ bot, message }) => {
    const msg = await message.channel.send('Calculando a latência...');
    setTimeout(() => {
      msg.edit(`🏓 Pong ! Latência de mensagens: \`${msg.createdTimestamp - message.createdTimestamp}ms\`, latência da API: \`${Math.ceil(bot.ws.ping)}ms\``);
    }, 2 * 1000);
  },
  name: 'ping',
  aliases: ['pg', 'lantencia', 'ms'],
  category: 'Utilidades',
  description: 'Mostrar a lantência do bot.',
};
