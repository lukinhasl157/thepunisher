'use strict';
module.exports = {
  run: async ({ message }) => {
    const msg = await message.channel.send('Clique no emoji 🎉 para participar do sorteio');
    msg.react('🎉');

    const filter = (r, u) => r.emoji.name === '🎉' && u.equals(message.author),
      collector = msg.createReactionCollector(filter, { max: 10, time: 10 * 1000 });

    collector.on('end', (collected) => {
      const winner = collected.size === 0 ? 'Ninguém ganhou o sorteio.' : collected.first().users.filter((user) => !user.bot).random().toString(),
        participants = collected.size === 0 ? 'Ninguém participou do sorteio' : collected.first().users.filter((user) => !user.bot).size;

      return msg.edit(`O sorteiro foi finalizado\nParticipantes: ${participants}\nGanhador: ${winner}`);
    });
  },
  name: 'sorteio',
  aliases: [],
};
