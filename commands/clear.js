module.exports = {
  run: async function (bot, message, args) {

    const deleteCount = parseInt(args[0], 10);
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando! Permissão requirida: **MANAGE_MESSAGES**.`);
    } else if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
      return message.channel.send(`**${message.author.username}** |  Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas`);
    } else {
      message.channel.bulkDelete(fetched);
      message.channel.send(`**${message.author.username}** | O chat foi limpo com sucesso! <a:sucessogif:499614074129350666> | ${deleteCount} mensagens foram excluídas.`).then(msg => msg.delete(10000));
    }
  },
    aliases: ["limpar"],
    category: "Moderação",
    description: "Deletar mensagens."
}
