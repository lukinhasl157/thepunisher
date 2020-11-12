const { MessageEmbed } = require('discord.js');

module.exports = {
  run: ({ message, args }) => {
    const role = message.guild.roles.find((r) => r.name === 'The Punisher | 🔇 Muted');
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(' ');

    if (!member) {
      return message.replyError('Por favor, insira o id ou mencione que deseja desmutar.');
    }

    if (!reason) {
      return message.replyError('Por favor, insira um motivo para desmutar este usuário.');
    }

    if (!member.roles.has(role.id)) {
      return message.replyError('Desculpe, este usuário não está mutado.');
    }

    member.roles.remove(role)
      .catch(console.error);
    return message.channel.send(new MessageEmbed()
      .setTitle('**DESMUTE**')
      .setDescription(`O usuáro ${member} foi desmutado.\n \n• **• Motivo**: » ${reason}`)
      .setColor('#ff0000')
      .setTimestamp(new Date())
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter(`Comando solicitado por ${message.author.tag}`, message.author.displayAvatarURL()));
  },
  botPermissions: ['MUTE_MEMBERS'],
  userPermissions: ['MUTE_MEMBERS'],
  name: 'unmute',
  aliases: ['desmute', 'desmutar'],
  category: 'Moderação',
  description: 'Desmutar um usuário.',
};
