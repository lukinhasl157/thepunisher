'use strict';
const { MessageEmbed } = require('discord.js');
module.exports = {
  run: ({ message, args, server }) => {
    const { roles, status } = server.events.get('guildMemberAdd').autoRole,
      type = args[0];

    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, você não tem permissão para executar este comando! Permissão requirida: \`ADMINISTRADOR\`.`);
    } else if (args.length === 0) {
      return message.channel.send(`O autoRole está ${status ? 'ativado' : 'desativado'}`);
    } else {
      switch (type) {
        case 'on': {
          if (status) {
            return message.channel.send('O autoRole já está ativado.');
          } else {
            message.channel.send('O autoRole foi ativado com sucesso!');
            server.events.get('guildMemberAdd').autoRole.status = true;
            server.save();
          }
          break;
        }
        case 'off': {
          if (!status) {
            return message.channel.send('O autoRole já está desativado.');
          } else {
            message.channel.send('O autoRole foi desativado com sucesso!');
            server.events.get('guildMemberAdd').autoRole.status = false;
            server.save();
          }
          break;
        }
        case 'list': {
          if (roles.length === 0) {
            return message.channel.send(`Nenhum cargo foi adicionado a lista, caso queira adicionar algum cargo a lista digite: \`${server.prefix}autorole add @cargo\``);
          } else {
            message.channel.send(new MessageEmbed()
              .addField('Lista de cargos do autoRole:', roles.map((i) => `<@&${i}>`).join(', '))
              .setColor('#ff0000')
              .setThumbnail(message.guild.iconURL())
            );
          }
          break;
        }
        case 'remove': {
          const role = message.mentions.roles.first();
          if (!role) {
            return message.reply('Por favor, mencione o cago que deseja remover da minha lista.');
          } else if (args.length > 2) {
            return message.reply('Por favor, remova um cargo de cada vez.');
          } else if (!roles.find((i) => i === role.id)) {
            return message.reply('Não encontrei este cargo na minha lista.');
          } else {
            const index = roles.indexOf(role.id);
            roles.splice(index, 1);
            message.reply(`O cargo ${role} foi removido da lista com sucesso! Para ver a lista de cargos digite: \`${server.prefix}autorole list\``);
            server.save();
          }
          break;
        }
        case 'reset': {
          message.channel.send('A lista de cargos foi resetada com sucesso!');
          server.events.get('guildMemberAdd').autoRole.roles = [];
          server.save();
          break;
        }
        case 'add': {
          let rolesList = [];
          for (const i in args) {
            if (/(?:<@&?)?([0-9]{16,19})(?:>)?/.test(args[i])) {
              const id = args[i].replace(/(<@&)?(>)?/g, '');
              if (message.guild.roles.get(id) && message.guild.id !== id) rolesList.push(id);
            }
          }

          const nonAddedRoles = [];
          for (const i in rolesList) {
            if (roles.includes(rolesList[i])) nonAddedRoles.push(rolesList[i]);
          }
          if (nonAddedRoles.length) {
            message.channel.send(`Os cargos seguites não foram adicionados pois já estavam incluídos: ${nonAddedRoles.map((r) => `\`${(message.guild.roles.get(r) && message.guild.roles.get(r).name) || 'desconhecido'}\``)}`);
            for (const i in nonAddedRoles) {
              const index = rolesList.indexOf(nonAddedRoles[i]);
              rolesList.splice(index, 1);
            }
          }

          if (!roles.length) {
            return message.channel.send('Insira o ID ou mencione um ou mais cargo.');
          } else {
            message.channel.send(`Os cargos seguintes foram adicionados: ${rolesList.map((r) => `\`${message.guild.roles.get(r).name}\``)}. Para ver todos os cargos digite \`${server.prefix}autorole list\``);
            roles.push(rolesList);
            server.save();
          }
          break;
        }
      }
    }
  },
  name: 'autorole',
  aliases: ['autocargo'],
};
