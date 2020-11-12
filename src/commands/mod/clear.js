/* eslint-disable radix */
module.exports = {
  run: async ({ message, args }) => {
    const deleteCount = parseInt(args[0]);
    const fetched = await message.channel.messages.fetch({ limit: deleteCount + 1 });

    if (!deleteCount || deleteCount < 2 || deleteCount > 100 || Number.isNaN(deleteCount)) {
      return message.channel.send(`**${message.author.username}** |  Por favor, forneça um número entre 2 e 100 de mensagens a serem excluídas`);
    }
    message.delete();
    message.channel.bulkDelete(fetched, true);
    return message.channel.send(`**${message.author.username}** | O chat foi limpo com sucesso! \`${deleteCount}\` mensagens excluídas.`)
      .then((msg) => msg.delete({ timeout: 30 * 1000 }));
  },
  botPermissions: ['MANAGE_MESSAGES'],
  userPermissions: ['MANAGE_MESSAGES'],
  name: 'clear',
  aliases: ['limpar'],
  category: 'Moderação',
  description: 'Deletar mensagens.',
};
