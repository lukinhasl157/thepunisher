'use strict';
module.exports = {
  run: async ({ message, args }) => {
    // Gif ban the punisher https://media.giphy.com/media/1Xe14KOTgtL86EGBXU/giphy.gif
    const member = message.mentions.members.first() || message.guild.members.get(args[0]),
      reason = args.slice(1).join(' ');

    if (!member) {
      return message.reply(`Por favor, insira o id ou mencione o usuário que deseja banir.`);
    } else if (!reason) {
      return message.reply(`Por favor, insira um motivo para banir este usuário.`);
    } else {
      const msg = await message.reply(`Você tem certeza de banir o usuário ${member} pelo motivo: \`${reason}\` ? Se **SIM**, clique no emoji <:correto:604266535262879746> para bani-lo. Se **NÃO** clique no emoji <:negado:604266617379225620> para cancelar esta ação.`),
        emojis = ['604266535262879746', '604266617379225620'];

      for (const i in emojis) {
        await msg.react(emojis[i]);
      }

      const filter = (r, u) => r.me && u.equals(message.author),
        collector = msg.createReactionCollector(filter, { max: 1, time: 60 * 1000 });

      collector.on('collect', async (r) => {
        msg.delete();
        switch (r.emoji.id) {
          case emojis[0]: {
            if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
              return message.reply(`Desculpe, eu preciso da permissão \`BAN_MEMBERS\` para executar este comando.`);
            } else if (!message.member.permissions.has('BAN_MEMBERS')) {
              return message.reply(`Desculpe, você precisa da permissão \`BAN_MEMBERS\` para executar este comando.`);
            } else if (message.member.user.equals(message.guild.owner)) {
              await member.send(`» **${member.user.username}** | Você foi banido por **${message.author.username}**. \n» Motivo: \`${reason}\`.`).catch(() => null);
              await member.ban(reason);
              return message.reply(`» O usuário **${member.user.tag} ID:** \`${member.user.id}\` | Foi banido com sucesso. <:correto:604266535262879746>`);
            } else if (member.user.equals(message.guild.ownerID)) {
              return message.reply(`Desculpe, você não pode banir o dono do servidor.`);
            } else if (message.guild.me.roles.highest.position <= member.roles.highest.position) {
              return message.reply(`Desculpe, o meu cargo é menor ou igual ao usuário a ser banido.`);
            } else if (member.roles.highest.position >= message.member.roles.highest.position) {
              return message.reply(`Desculpe, o cargo do usuário a ser banido é maior ou igual ao seu.`);
            } else {
              await member.send(`» **${member.user.username}** | Você foi banido por **${message.author.username}**. \n» Motivo: \`${reason}\`.`).catch(() => null);
              await member.ban(reason);
              message.reply(`» O usuário **${member.user.tag} ID:** \`${member.user.id}\` | Foi banido com sucesso. <:correto:604266535262879746>`);
            }
            break;
          }
          case emojis[1]: {
            message.reply(`» A acão de banimento do usuário **${member.user.tag}** ID: \`${member.user.id}\` | Foi cancelada. <:negado:604266617379225620>`);
            break;
          }
        }
      });
    }
  },
  name: 'ban',
  aliases: ['banir', 'punir'],
  category: 'Moderação',
  description: 'Banir um usuário.',
};
