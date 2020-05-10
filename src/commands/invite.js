'use strict';
const { MessageEmbed } = require('discord.js');
module.exports = {
  run: async ({ bot, message, args }) => {
    const user = message.mentions.users.first() || message.author || bot.users.get(args[0]),
      invites = await message.guild.fetchInvites(),
      invitesUser = invites.find((i) => i.inviter.id === user.id);

    if (!message.guild.me.hasPermission('MANAGE_GUILD')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`\`MANAGE_GUILD\`\` para executar este comando.`);
    } else if (!invitesUser) {
      return message.channel.send('Você não possui nenhuma URL de convite.');
    } else {
      message.channel.send(new MessageEmbed()
        .setThumbnail(user.displayAvatarURL)
        .addField('» Membros recrutados: ', `\`\`\`js\n(${invitesUser.uses}) - Membros\`\`\``)
        .addField('» URL de convite:', invitesUser.url)
        .setColor(message.guild.members.get(invitesUser.inviter.id).displayColor)
        .setFooter(user.tag, user.displayAvatarURL)
        .setTimestamp(new Date())
      );
    }
  },
  name: 'invite',
  aliases: ['convite', 'div', 'convites'],
  category: 'Moderação',
  description: 'Mostrar quantos usuários o staffer convidou.',
};
