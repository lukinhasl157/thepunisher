/* eslint-disable radix */
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
  run: async ({ message, args }) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const time = Number(ms(args[1]));
    const reason = args.slice(2).join(' ');
    let role = message.guild.roles.find((r) => r.name === 'The Punisher | 🔇 Muted');

    const embed = new MessageEmbed()
      .setAuthor('**MUTE**')
      .setDescription(`O usuário ${member} foi mutado por **${time}.**\n \n**• Motivo:** » ${reason}\n \nApós o termino da punição o usuário será desmutado automaticamente.`)
      .setThumbnail(member.user.displayAvatarURL)
      .setColor('#ff0000')
      .setTimestamp(new Date())
      .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL);

    if (!member) {
      message.replyError('Por favor insira o id ou mencione o usuário que deseja mutar.');
      return;
    }

    if (!time) {
      message.replyError('Por favor insira um tempo para mutar este usuário. Exemplo: t.tempute @usuário 30s motivo');
      return;
    }

    if (
      Number.isNaN(parseInt(time))
      || parseInt(time) === 0 || parseInt(time) >= 86400000 || parseInt(time) < 300000) {
      message.replyError('O tempo está errado.');
      return;
    }

    if (!reason || !args || !args.length) {
      message.replyError('Por favor insira um motivo para mutar este usuário.');
      return;
    }

    if (!role) {
      // eslint-disable-next-line require-atomic-updates
      role = await message.guild.createRole({
        name: 'The Punisher | 🔇 Muted',
        color: '#ff0000',
      });
      message.guild.channels.forEach(async (channel) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          SPEAK: false,
          CONNECT: true,
        });
      });
      await member.addRole(role);
      await member.setDeaf(true, reason).catch(() => false);
      await member.setMute(true, reason).catch(() => false);
      await message.channel.send(embed);
    }
    if (role) {
      await member.addRole(role);
      await member.setDeaf(true, reason).catch(() => false);
      await member.setMute(true, reason).catch(() => false);
      await message.channel.send(embed);

      setTimeout(() => {
        member.removeRole(role);
        member.setDeaf(false).catch(() => false);
        member.setMute(false).catch(() => false);
        message.channel.send(new MessageEmbed()
          .setAuthor('**DESMUTE**')
          .setDescription(`O usuário ${member} que havia sido mutado por **${time}**, finalizou seu tempo de punição e foi desmutado.`)
          .setThumbnail(member.user.displayAvatarURL)
          .setColor('#ff0000')
          .setTimestamp(new Date())
          .setFooter(message.guild.name, message.guild.iconURL));
      }, time);
    }
  },
  botPermissions: ['MUTE_MEMBERS'],
  userPermissions: ['MUTE_MEMBERS'],
  name: 'tempmute',
  aliases: ['mute', 'mutar', 'silenciar'],
  category: 'Moderação',
  description: 'Mutar um usuário por um determinado tempo.',
};
