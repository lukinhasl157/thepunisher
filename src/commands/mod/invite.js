const { MessageEmbed } = require('discord.js');

module.exports = {
  run: async ({ bot, message, args }) => {
    const user = message.mentions.users.first() || message.author || bot.users.cache.get(args[0]);
    const invites = await message.guild.fetchInvites();
    const invitesUser = invites.find((i) => i.inviter.id === user.id);

    if (!invitesUser) {
      return message.replyError('Você não possui nenhuma URL de convite.');
    }

    return message.channel.send(new MessageEmbed()
      .setThumbnail(user.displayAvatarURL)
      .addField('» Membros recrutados: ', `\`\`\`js\n(${invitesUser.uses}) - Membros\`\`\``)
      .addField('» URL de convite:', invitesUser.url)
      .setColor(message.guild.members.cache.get(invitesUser.inviter.id).displayColor)
      .setFooter(user.tag, user.displayAvatarURL)
      .setTimestamp(new Date()));
  },
  botPermissions: ['MANAGE_GUILD'],
  name: 'invite',
  aliases: ['convite', 'div', 'convites'],
  category: 'Moderação',
  description: 'Mostrar quantos usuários o staffer convidou.',
};
