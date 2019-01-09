const Discord = require("discord.js");

module.exports = {
  run: async function (bot, message, args) {

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando! Permissão requirida: **MANAGE_MESSAGES**.`);
    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send(`**${message.author.username}** |  Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas`);

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched);
    message.channel.send(`**${message.author.username}** | O chat foi limpo com sucesso <a:sucessogif:499614074129350666>`).then(msg => msg.delete(10000));

  },

    aliases: ["limpar"],
    category: "Moderação",
    description: "Deletar mensagens."
}
