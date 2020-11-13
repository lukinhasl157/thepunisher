module.exports = {
  run: async ({ message, args }) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(' ');

    if (!member) {
      message.replyError('Por favor, insira o id ou mencione o usuário que deseja expulsar.');
      return;
    }

    if (!reason) {
      message.replyError('Por favor, insira um motivo para expulsar este usuário.');
      return;
    }

    const msg = await message.replyError(`Você tem certeza de expulsar o usuário ${member} pelo motivo: \`\`${reason}\`\` ? Se **SIM**, clique no emoji <:correto:604266535262879746> para bani-lo. Se **NÃO** clique no emoji <:negado:505155029636874250> para cancelar esta ação.`);

    (async () => {
      await msg.react(':correto:604266535262879746');
      await msg.react(':negado:604266617379225620');
    })();

    const filter = (r, u) => r.me && u.id === message.author.id;
    const collector = msg.createReactionCollector(filter, { time: 60 * 1000, max: 1 });

    collector.on('collect', async (r) => {
      msg.delete();
      if (r.emoji.id === '505155063963058187') {
        if (message.member.user.equals(message.guild.owner.user)) {
          await member.send(`» **${member.user.username}** | Você foi expulso por **${message.author.username}**. \n» Motivo: \`\`${reason}\`\`.`).catch(() => false);
          await member.kick(reason);
          return message.channel.send(`» O usuário **${member.user.tag} ID:** \`\`${member.user.id}\`\` | Foi expulso com sucesso. <:correto:604266535262879746>`);
        }

        if (member.user.equals(message.guild.owner.user)) {
          return message.replyError('Desculpe, você não pode expulsar o dono do servidor.');
        }

        if (message.guild.me.roles.highest.position <= member.roles.highest.positionn) {
          return message.replyError('Desculpe, o meu cargo é menor ou igual ao usuário a ser expulso.');
        }

        if (member.roles.highest.position >= message.member.roles.highest.position) {
          return message.replyError('Desculpe, o cargo do usuário a ser expulso é maior ou igual ao seu.');
        }

        await member.send(`» **${member.user.username}** | Você foi expulso por **${message.author.username}**. \n» Motivo: \`\`${reason}\`\`.`).catch(() => false);
        await member.kick(reason);
        return message.channel.send(`» O usuário **${member.user.tag} ID:** \`\`${member.user.id}\`\` | Foi expulso com sucesso. <:correto:604266535262879746>`);
      }

      return message.channel.send(`» A acão para expulsar o usuário **${member.user.tag}** ID: \`\`${member.user.id}\`\` | Foi cancelada com sucesso. <:negado:604266617379225620>`);
    });
  },
  userPermissions: ['KICK_MEMBERS'],
  botPermissions: ['KICK_MEMBERS'],
  name: 'kick',
  aliases: ['expulsar', 'kickar'],
  category: 'Moderação',
  description: 'Expulsar um usuário do servidor.',
};
