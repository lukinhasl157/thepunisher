module.exports = {
  run: async ({ message, args }) => {
    const bans = await message.guild.fetchBans();
    const user = args[0];
    const reason = args.slice(1).join(' ');

    if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
      return message.channel.send(`**${message.author.username}** | Desculpe, eu não tenho permissão para executar este comando.`);
    } if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando.`);
    } if (!user) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira o id do usuário que deseja desbanir.`);
    } if (!reason) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira um motivo para desbanir este usuário.`);
    } if (!bans.has(user)) {
      return message.channel.send(`**${message.author.username}** | Desculpe, este usuário não está banido.`);
    }
    await message.guild.members.unban(user, reason);
    message.channel.send(`O usuário <@${user}> foi desbanido com sucesso! <a:sucessogif:499614074129350666>`);
  },
  name: 'unban',
  aliases: ['desbanir', 'perdoar', 'pardon'],
  category: 'Moderação',
  description: 'Desbanir um usuário.',
};
