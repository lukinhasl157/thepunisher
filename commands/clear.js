module.exports = {
  run: async function ({ message, args }) {

    const deleteCount = parseInt(args[0], 10);
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(`» **${messagemessage.author.username}** | Desculpe, eu preciso da permissão \`\`MANAGE_MESSAGES\`\` para executar este comando.`);
    } else if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando! Permissão requirida: **MANAGE_MESSAGES**.`);
    } else if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
      return message.channel.send(`**${message.author.username}** |  Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas`);
    } else {
      message.channel.bulkDelete(fetched);
      const msg = await message.channel.send(`**${message.author.username}** | O chat foi limpo com sucesso! <a:sucessogif:499614074129350666> | ${deleteCount} mensagens foram excluídas.`);
      msg.delete();
    }
  },
    aliases: ["limpar"],
    category: "Moderação",
    description: "Deletar mensagens."
}
