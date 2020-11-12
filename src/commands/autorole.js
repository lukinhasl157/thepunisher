const { MessageEmbed } = require('discord.js');

const isId = (id) => /(?:<@&?)?([0-9]{16,19})(?:>)?/.test(id);

module.exports = {
  run: ({ message, args, server }) => {
    const { roles, status } = server.events.get('guildMemberAdd').autoRole;
    const type = args[0];

    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, você não tem permissão para executar este comando! Permissão requirida: \`ADMINISTRADOR\`.`);
    }

    if (args.length === 0) {
      return message.channel.send(`O autoRole está ${status ? 'ativado' : 'desativado'}`);
    }

    switch (type) {
      case 'on': {
        if (status) {
          return message.channel.send('O autoRole já está ativado.');
        }
        server.events.get('guildMemberAdd').autoRole.status = true;
        server.save();
        return message.channel.send('O autoRole foi ativado com sucesso!');
      }

      case 'off': {
        if (!status) {
          return message.channel.send('O autoRole já está desativado.');
        }
        server.events.get('guildMemberAdd').autoRole.status = false;
        server.save();
        return message.channel.send('O autoRole foi desativado com sucesso!');
      }

      case 'list': {
        if (roles.length === 0) {
          return message.channel.send(`Nenhum cargo foi adicionado a lista, caso queira adicionar algum cargo a lista digite: \`${server.prefix}autorole add @cargo\``);
        }

        return message.channel.send(new MessageEmbed()
          .addField('Lista de cargos do autoRole:', roles.map((i) => `<@&${i}>`).join(', '))
          .setColor('#ff0000')
          .setThumbnail(message.guild.iconURL()));
      }

      case 'remove': {
        const role = message.mentions.roles.first();
        if (!role) {
          return message.reply('Por favor, mencione o cago que deseja remover da minha lista.');
        }
        if (args.length > 2) {
          return message.reply('Por favor, remova um cargo de cada vez.');
        }
        if (!roles.find((i) => i === role.id)) {
          return message.reply('Não encontrei este cargo na minha lista.');
        }
        const index = roles.indexOf(role.id);
        if (index !== -1) {
          roles.splice(index, 1);
          server.save();
        }
        return message.reply(`O cargo ${role} foi removido da lista com sucesso! Para ver a lista de cargos digite: \`${server.prefix}autorole list\``);
      }

      case 'reset': {
        server.events.get('guildMemberAdd').autoRole.roles = [];
        server.save();
        return message.channel.send('A lista de cargos foi resetada com sucesso!');
      }

      case 'add': {
        const [rolesList, nonAddedRoles] = args.reduce((p, v) => {
          if (isId(v) && message.guild.roles.has(v) && message.guild.id !== v) {
            p[roles.includes(v) ? 1 : 0].push(v);
          }
          return p;
        }, [[], []]);

        if (nonAddedRoles.length) {
          message.channel.send(`Os cargos seguites não foram adicionados pois já estavam incluídos: ${nonAddedRoles.map((r) => `\`${(message.guild.roles.get(r) && message.guild.roles.get(r).name) || 'desconhecido'}\``)}`);
        }

        if (!roles.length) {
          return message.channel.send('Insira o ID ou mencione um ou mais cargo.');
        }

        roles.push(rolesList);
        server.save();
        return message.channel.send(`Os cargos seguintes foram adicionados: ${rolesList.map((r) => `\`${message.guild.roles.get(r).name}\``)}. Para ver todos os cargos digite \`${server.prefix}autorole list\``);
      }

      default:
        return message.channel.send('Opção invalida!');
    }
  },
  name: 'autorole',
  aliases: ['autocargo'],
};
