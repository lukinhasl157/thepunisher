module.exports = {
  run: async ({ message, args }) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
      message.replyError('Por favor, insira o id ou mencione o usuário que deseja xingar.');
      return;
    }
    try {
      message.author.send(`**${message.author.username}** | Como deseja xingar o usuário **${member.user.tag}** ? (Após \`30s\` esta mensagem será apagada.)`);
    } catch (e) {
      message.replyError('Desculpe, sua DM está desativada e não posso enviar mensagens.');
      return;
    }

    const msg = await message.reply('Por favor, olhe sua **DM**');
    msg.delete({ timeout: 30 * 1000 });
    const filter = (m) => m.author.equals(message.author);
    const collector = message.channel.createMessageCollector(filter, { max: 1, time: 30 * 1000 });

    collector.on('collect', (m) => {
      message.author.send(`**${message.author.username}**, seu foi xingamento enviado com sucesso.`);
      message.channel.send(`${member}, o usuário **${message.author.username}**, xingou você de: \`${m.content}.\``);
    });
  },
  name: 'xingar',
  aliases: [],
  category: 'Entretenimento',
  description: 'Xingar um usuário.',
};
