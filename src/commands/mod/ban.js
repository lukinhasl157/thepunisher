module.exports = {
  run: async ({ message, args }) => {
    // Gif ban the punisher https://media.giphy.com/media/1Xe14KOTgtL86EGBXU/giphy.gif
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    const reason = args.slice(1).join(' ');

    if (!member) {
      message.reply('Por favor, insira o id ou mencione o usuário que deseja banir.');
      return;
    }

    if (!reason) {
      message.reply('Por favor, insira um motivo para banir este usuário.');
      return;
    }

    const msg = await message.reply(`Você tem certeza de banir o usuário ${member} pelo motivo: \`${reason}\` ? Se **SIM**, clique no emoji <:correto:604266535262879746> para bani-lo. Se **NÃO** clique no emoji <:negado:604266617379225620> para cancelar esta ação.`);
    const ACCEPT_EMOJI_ID = '604266535262879746';
    const RECUSE_EMOJI_ID = '604266617379225620';

    (async () => {
      await msg.react(ACCEPT_EMOJI_ID);
      await msg.react(RECUSE_EMOJI_ID);
    })();

    const filter = (r, u) => r.me && u.equals(message.author);
    const collector = msg.createReactionCollector(filter, { max: 1, time: 60 * 1000 });

    collector.on('collect', async (r) => {
      msg.delete();
      if (r.emoji.id === ACCEPT_EMOJI_ID) {
        if (message.member.user.equals(message.guild.owner)) {
          await member.send(`» **${member.user.username}** | Você foi banido por **${message.author.username}**. \n» Motivo: \`${reason}\`.`).catch(() => null);
          await member.ban(reason);
          return message.reply(`» O usuário **${member.user.tag} ID:** \`${member.user.id}\` | Foi banido com sucesso. <:correto:604266535262879746>`);
        }

        if (member.user.equals(message.guild.ownerID)) {
          return message.reply('Desculpe, você não pode banir o dono do servidor.');
        }

        if (message.guild.me.roles.highest.position <= member.roles.highest.position) {
          return message.reply('Desculpe, o meu cargo é menor ou igual ao usuário a ser banido.');
        }

        if (member.roles.highest.position >= message.member.roles.highest.position) {
          return message.reply('Desculpe, o cargo do usuário a ser banido é maior ou igual ao seu.');
        }

        await member.send(`» **${member.user.username}** | Você foi banido por **${message.author.username}**. \n» Motivo: \`${reason}\`.`).catch(() => null);
        await member.ban(reason);
        return message.reply(`» O usuário **${member.user.tag} ID:** \`${member.user.id}\` | Foi banido com sucesso. <:correto:604266535262879746>`);
      }

      return message.reply(`» A acão de banimento do usuário **${member.user.tag}** ID: \`${member.user.id}\` | Foi cancelada. <:negado:604266617379225620>`);
    });
  },
  userPermissions: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],
  name: 'ban',
  aliases: ['banir', 'punir'],
  category: 'Moderação',
  description: 'Banir um usuário.',
};
