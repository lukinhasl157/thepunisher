const { MessageEmbed } = require('discord.js');

module.exports = {
  run: async ({ message }) => {
    const invites = await message.guild.fetchInvites();
    if (invites.size === 0) {
      return message.replyError('Nenhum convite foi criado.');
    }

    const parsed = invites
      .array()
      .sort((a, b) => b.uses - a.uses)
      .map((i, _, arr) => `${arr.indexOf(i) + 1}º - ${i.code} ${i.inviter.tag} (${i.uses})`)
      .join('\n');

    return message.channel.send(new MessageEmbed()
      .setDescription(parsed)
      .setColor('RANDOM')
      .setThumbnail(message.guild.iconURL()));
  },
  name: 'topinvites',
  category: 'Utilidades',
  description: 'mostra um rank dos convites mais usados',
  aliases: [],
};
