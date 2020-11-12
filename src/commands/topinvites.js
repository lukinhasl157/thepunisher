const { MessageEmbed } = require('discord.js');

module.exports = {
  run: async ({ message }) => {
    const invites = await message.guild.fetchInvites();
    if (invites.size === 0) {
      return message.channel.send('Nenhum convite foi criado.');
    }
    const arr = invites.array();
    const newarr = arr.sort((a, b) => b.uses - a.uses);

    return message.channel.send(new MessageEmbed()
      .setDescription(newarr.map((i) => `${newarr.indexOf(i) + 1}º - ${i.inviter.tag} (${i.uses})`).join('\n'))
      .setColor('RANDOM')
      .setThumbnail(message.guild.iconURL()));
  },
  name: 'topinvites',
  category: 'Utilidades',
  description: 'mostra um rank dos convites mais usados',
  aliases: [],
};
