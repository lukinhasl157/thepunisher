module.exports = {
  run: async function (bot, message, args) {
    
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    const reason = args.slice(1).join(" ");
      if (!member) {
        return message.channel.send(`» **${message.author.username}** | Por favor, insira o id ou mencione o usuário que deseja expulsar.`)
      } else if (!reason) {
        return message.channel.send(`» **${message.author.username}** | Por favor, insira um motivo para expulsar este usuário.`)
      } else {
        const msg = await message.channel.send(`» **${message.author.username}** | Você tem certeza de expulsar o usuário ${member} pelo motivo: \`\`${reason}\`\` ? Se **SIM**, clique no emoji <:correto:505155063963058187> para bani-lo. Se **NÃO** clique no emoji <:negado:505155029636874250> para cancelar esta ação.`)
        await msg.react(":correto:505155063963058187");
        await msg.react(":negado:505155029636874250");

        const filter = (r, u) => r.me && u.id === message.author.id;
        const collector = msg.createReactionCollector(filter, { time: 60 * 1000, max: 1 });

          collector.on("collect", (r) => {
            msg.delete();
            switch (r.emoji.id) {
              case "505155063963058187":
                if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
                  return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`\`BAN_MEMBERS\`\` para executar este comando.`);
                } else if (!message.member.hasPermission("KICK_MEMBERS")) {
                  return message.channel.send(`» **${message.author.username}** | Desculpe, você não tem permissão para executar este comando! Permissão necessária: \`\`BAN_MEMBERS\`\`.`);
                } else if (message.guild.me.highestRole.position <= member.highestRole.position) {
                  return message.channel.send(`» **${message.author.username}** | Desculpe, o meu cargo é menor ou igual ao usuário a ser expulso.`);
                } else if (member.highestRole.position >= message.member.highestRole.position) {
                  return message.channel.send(`» **${message.author.username}** | Desculpe, o cargo do usuário a ser expulso é maior ou igual ao seu.`);
                } else {
                  member.kick(reason);
                  member.send(`» **${member.user.username}** | Você foi expulso por **${message.author.username}**. \n» Motivo: \`\`${reason}\`\`.`);
                  message.channel.send(`» O usuário **${member.user.tag} ID:** \`\`${member.user.id}\`\` | Foi expulso com sucesso. <:correto:505155063963058187>`);
                }
              break;
              case "505155029636874250":
                message.channel.send(`» A acão para expulsar o usuário **${member.user.tag}** ID: \`\`${member.user.id}\`\` | Foi cancelada com sucesso. <:negado:505155029636874250>`);
              break;
            }
          });
      }
  }
}
    
    