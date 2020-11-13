module.exports = {
  run: async ({ message, args }) => {
    const bans = await message.guild.fetchBans();
    const user = args[0];
    const reason = args.slice(1).join(' ');
    if (!user) {
      return message.replyError('Por favor, insira o id do usuário que deseja desbanir.');
    }

    if (!reason) {
      return message.replyError('Por favor, insira um motivo para desbanir este usuário.');
    }

    if (!bans.has(user)) {
      return message.replyError('Desculpe, este usuário não está banido.');
    }

    await message.guild.members.unban(user, reason);
    return message.reply(`O usuário <@${user}> foi desbanido com sucesso! <a:sucessogif:499614074129350666>`);
  },
  userPermissions: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],
  name: 'unban',
  aliases: ['desbanir', 'perdoar', 'pardon'],
  category: 'Moderação',
  description: 'Desbanir um usuário.',
};
