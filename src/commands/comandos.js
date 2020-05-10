'use strict';
module.exports = {
  run: ({ message, args, server }) => {
    const channels = server.events.get('message').commands.channels,
      type = args[0];

    if (!message.member) {
      return message.reply('Desculpe, você não tem permissão para executar este comando. Permissão necessária: \`ADMINISTRADOR\`');
    } else {
      switch (type) {
        case 'add': {
          const channel = message.mentions.channels.first();

          if (!channel) {
            return message.reply(`<:lista2:604934720475889664> Mencione o canal que deseja bloquear o uso de meus comandos, exemplo: ${server.prefix}comandos add #canal`);
          } else if (channels.includes(channel.id)) {
            return message.reply(`<:lista2:604934720475889664> Este canal já está setado em minha lista, para ver a lista de canais digite ${server.prefix}comandos list`);
          } else {
            channels.push(channel.id);
            message.reply(`<:lista:604934720383352832> O canal ${channel} foi setado em minha lista com sucesso.`);
            server.save();
          }
          break;
        }
        case 'reset': {
          server.events.get('message').commands.channels = [];
          message.reply('<:lista:604934720383352832> A lista de canais foi resetada com sucesso!');
          server.save();
          break;
        }
        case 'remove': {
          const channel2 = message.mentions.channels.first();

          if (!channel2) {
            return message.reply('<:lista2:604934720475889664> Mencione o canal que deseja remover da lista.');
          } else if (args.length > 2) {
            return message.reply('<:lista2:604934720475889664> Por favor, remova um canal de cada vez.');
          } else if (!channels.find((i) => i === channel2.id)) {
            return message.reply('<:lista2:604934720475889664> Não encontrei este canal na minha lista, verifique se você mencionou o canal correto.');
          } else {
            const index = channels.indexOf(channel2.id);
            channels.splice(index, 1);
            message.reply(`<:lista:604934720383352832> O canal ${channel2} foi removido da minha lista com sucesso!`);
            server.save();
          }
          break;
        }
        case 'list': {
          if (channels.length === 0) {
            return message.reply(`<:lista2:604934720475889664> Nenhum canal foi adicionado em minha lista, caso queira adicionar algum, digite ${server.prefix}comandos add #canal`);
          } else {
            message.reply(`<:lista1:604934720643399681> Lista de canais que eu não executarei comandos: \n${channels.map((i) => `<#${i}>`).join(', ')}`);
          }
          break;
        }
      }
    }
  },
  name: 'comandos',
  aliases: [],
};
