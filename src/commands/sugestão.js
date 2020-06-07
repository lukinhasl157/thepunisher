'use strict';
const Discord = require('discord.js');
module.exports = {
  run: async ({ message, args }) => {
    let channel = message.guild.channels.find((c) => c.name === 'sugestões');

    if (!args.length) {
      return message.channel.send(`» **${message.author.username}** | Por favor, insira uma sugestão!`);
    } else if (!channel && !message.guild.me.permissions.has('MANAGE_CHANNELS')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`\`MANAGE_CHANNELS\`\` para executar este comando.`);
    } else if (!channel) {
      channel = await message.guild.channels.create('sugestões', {
        type: 'text',
        permissionOverwrites: [{
          id: message.guild.id,
          deny: ['SEND_MESSAGES'],
          allow: ['ADD_REACTIONS', 'VIEW_CHANNEL'],
        }],
      });
      await message.channel.send(`» **${message.author.username}** | Não encontrei um canal de \`\`sugestões\`\`, então criei um canal automaticamente.`);
    }

    if (channel) {
      const embed = new Discord.MessageEmbed()
        .addField('**Sugestão**', args.join(' '))
        .setFooter(`Sugestão enviada por: ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
        .setColor('#07ed66')
        .setThumbnail(message.author.displayAvatarURL());
      const m = await channel.send(embed);
      await m.react(':correto:604266535262879746');
      await m.react(':negado:604266617379225620');

      await message.channel.send(`» **${message.author.username}** | Sua sugestao foi enviada com sucesso!`);
    }
  },
  name: 'sugestão',
  aliases: ['sugestao'],
  category: 'Utilidades',
  description: 'Enviar uma sugestão.',
};
