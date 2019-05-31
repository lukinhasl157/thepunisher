module.exports = {
  run: async function (bot, message, args) {

    const bans = await message.guild.fetchBans();
    const user = args[0];
    const reason = args.slice(1).join(" ");
      if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
        return message.channel.send(`**${message.author.username}** | Desculpe, eu não tenho permissão para executar este comando.`);
      } else if (!message.member.hasPermission("BAN_MEMBERS")) {
        return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando.`);
      } else if (!user) {
        return message.channel.send(`**${message.author.username}** | Por favor, insira o id do usuário que deseja desbanir.`);
      } else if (!reason) {
        return message.channel.send(`**${message.author.username}** | Por favor, insira um motivo para desbanir este usuário.`);
      } else if (!bans.has(user)) {
        return message.channel.send(`**${message.author.username}** | Desculpe, este usuário não está banido.`);
      } else {
        await message.guild.unban(user, reason);
        message.channel.send(`O usuário <@${user}> foi desbanido com sucesso! <a:sucessogif:499614074129350666>`);
      }
  }, 
    aliases: ["desbanir", "perdoar", "pardon"],
    category: "Moderação",
    description: "Desbanir um usuário."
}
