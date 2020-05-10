'use strict';
module.exports = {
  run: async ({ message, args }) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]),
      reason = args.slice(1).join(' ');
    if (!member) {
      return message.channel.send(`» **${message.author.username}** | Por favor, insira o id ou mencione o usuário que deseja expulsar.`);
    } else if (!reason) {
      return message.channel.send(`» **${message.author.username}** | Por favor, insira um motivo para expulsar este usuário.`);
    } else {
      const msg = await message.channel.send(`» **${message.author.username}** | Você tem certeza de expulsar o usuário ${member} pelo motivo: \`\`${reason}\`\` ? Se **SIM**, clique no emoji <:correto:604266535262879746> para bani-lo. Se **NÃO** clique no emoji <:negado:505155029636874250> para cancelar esta ação.`);
      await msg.react(':correto:604266535262879746');
      await msg.react(':negado:604266617379225620');

      const filter = (r, u) => r.me && u.id === message.author.id,
        collector = msg.createReactionCollector(filter, { time: 60 * 1000, max: 1 });

      collector.on('collect', async (r) => {
        msg.delete();
        switch (r.emoji.id) {
          case '505155063963058187':
            if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
              return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`\`KICK_MEMBERS\`\` para executar este comando.`);
            } else if (message.member.id === message.guild.ownerID) {
              await member.send(`» **${member.user.username}** | Você foi expulso por **${message.author.username}**. \n» Motivo: \`\`${reason}\`\`.`).catch(() => false);
              await member.kick(reason);
              message.channel.send(`» O usuário **${member.user.tag} ID:** \`\`${member.user.id}\`\` | Foi expulso com sucesso. <:correto:604266535262879746>`);
            } else if (!message.member.hasPermission('KICK_MEMBERS')) {
              return message.channel.send(`» **${message.author.username}** | Desculpe, você não tem permissão para executar este comando! Permissão necessária: \`\`BAN_MEMBERS\`\`.`);
            } else if (member.user.id === message.guild.ownerID) {
              return message.channel.send(`» **${message.author.username}** | Desculpe, você não pode expulsar o dono do servidor.`);
            } else if (message.guild.me.roles.highest.position <= member.roles.highest.positionn) {
              return message.channel.send(`» **${message.author.username}** | Desculpe, o meu cargo é menor ou igual ao usuário a ser expulso.`);
            } else if (member.roles.highest.position >= message.member.roles.highest.position) {
              return message.channel.send(`» **${message.author.username}** | Desculpe, o cargo do usuário a ser expulso é maior ou igual ao seu.`);
            } else {
              await member.send(`» **${member.user.username}** | Você foi expulso por **${message.author.username}**. \n» Motivo: \`\`${reason}\`\`.`).catch(() => false);
              await member.kick(reason);
              message.channel.send(`» O usuário **${member.user.tag} ID:** \`\`${member.user.id}\`\` | Foi expulso com sucesso. <:correto:604266535262879746>`);
            }
            break;
          case '505155029636874250':
            message.channel.send(`» A acão para expulsar o usuário **${member.user.tag}** ID: \`\`${member.user.id}\`\` | Foi cancelada com sucesso. <:negado:604266617379225620>`);
            break;
        }
      });
    }
  },
  name: 'kick',
  aliases: ['expulsar', 'kickar'],
  category: 'Moderação',
  description: 'Expulsar um usuário do servidor.',
};
