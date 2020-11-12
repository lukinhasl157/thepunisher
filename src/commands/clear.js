/* eslint-disable consistent-return */
/* eslint-disable radix */
module.exports = {
  run: async ({ message, args }) => {
    const deleteCount = parseInt(args[0]);
    const fetched = await message.channel.messages.fetch({ limit: deleteCount + 1 });

    if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`MANAGE_MESSAGES\` para executar este comando.`);
    }

    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando! Permissão requirida: **MANAGE_MESSAGES**.`);
    }

    if (!deleteCount || deleteCount < 2 || deleteCount > 100 || Number.isNaN(deleteCount)) {
      return message.channel.send(`**${message.author.username}** |  Por favor, forneça um número entre 2 e 100 de mensagens a serem excluídas`);
    }
    message.delete();
    message.channel.bulkDelete(fetched, true);
    const msg = await message.channel.send(`**${message.author.username}** | O chat foi limpo com sucesso! \`${deleteCount}\` mensagens excluídas.`);
    msg.delete({ timeout: 30 * 1000 });
  },
  name: 'clear',
  aliases: ['limpar'],
  category: 'Moderação',
  description: 'Deletar mensagens.',
};
