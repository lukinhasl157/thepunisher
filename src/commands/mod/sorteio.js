const ms = require('ms');

module.exports = {
  run: async ({
    message, args, server, MessageEmbed,
  }) => {
    const [time, winners, ...text] = args;
    const winn = Number(winners.replace('w', ''));

    if (args.length === 0) {
      message.replyError(`Utilize: \`${server.prefix}sorteio <tempo> <ganhadores> <item>\`, exemplo: \`${server.prefix}sorteio 24h 5w discord nitro\``);
      return;
    } if (ms(args[0]) > ms('1d')) {
      message.replyError('O tempo de sorteio não pode passar de 1 dia.');
      return;
    }
    const msg = await message.channel.send(new MessageEmbed()
      .setTitle(text.join(' '))
      .setDescription('Clique na reação para participar!')
      .setColor('RANDOM')
      .setFooter(`${winn} vencedor(es).`));

    msg.react('🎉');

    const filter = (r, u) => r.emoji.name === '🎉' && u.equals(message.author);
    const collector = msg.createReactionCollector(filter, { time: ms(time) });

    collector.on('end', (collected) => {
      const winnersRandom = collected.first().users.cache.filter((user) => !user.bot)
        .random(winn);
      const participants = collected.first().users.cache.filter((user) => !user.bot).size;

      if (participants < winn) {
        return msg.edit(new MessageEmbed()
          .setTitle(text.join(' '))
          .setDescription(`Sorteio finalizado\nNúmero de reações foi insuficiente. \`${collected.size}/${winn}\``)
          .setColor('RANDOM')
          .setFooter(winn > 1 ? `${winn} vencedores.` : `${winn} vencedor.`));
      }
      return msg.edit(new MessageEmbed()
        .setTitle(text.join(' '))
        .setDescription(`Sorteio finalizado\nParticipantes: ${participants}\n${winn > 1 ? 'Vencedores' : 'Vencedor'}: ${winnersRandom.map((i) => i.toString()).join('')}`)
        .setColor('RANDOM')
        .setFooter(winn > 1 ? `${winn} vencedores.` : `${winn} vencedor.`));
    });
  },
  name: 'sorteio',
  category: 'Moderação',
  description: 'faz um sorteio',
  aliases: [],
};
