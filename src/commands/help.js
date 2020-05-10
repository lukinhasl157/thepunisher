'use strict';
const { MessageEmbed } = require('discord.js');
module.exports = {
  run: async ({ bot, message, server }) => {
    const options = require('../utils/categories.json');

    try {
      const msg = await message.member.send(new MessageEmbed()
        .setTitle('Categorias de comandos')
        .setThumbnail(bot.user.avatarURL({ format: 'png', size: 1024 }))
        .setColor('RANDOM')
        .setDescription(options.map((i) => `${i.emoji ? i.emoji : ''} ${i.name} (${bot.commands.filter((cmd) => cmd.category === i.name).size})`))
      );
      message.channel.send(`» **${message.author.username}**, olhe seu privado! Mandei meus comandos lá! 📨`);
      message.react('604266535262879746');

      for (const x in options) {
        if (options[x].emoji) {
          msg.react(options[x].emoji);
        }
      }

      const filter = (r, u) => r.me && u.equals(message.author),
        collect = msg.createReactionCollector(filter, { time: 120000 });

      collect.on('collect', async ({ emoji }) => {
        const category = options.find((i) => i.emoji === emoji.name),
          commands = bot.commands.filter((cmd) => cmd.category === category.name);

        await msg.edit(new MessageEmbed()
          .setDescription(commands.map((i) => `[${commands.array().indexOf(i) + 1}] » **${!server.prefix ? '' : server.prefix}${i.name}** ${i.description} **Alternativas:** ${!i.aliases ? '*Nenhuma*' : `*${i.aliases.join(', ')}*`} `))
          .setTitle(`${category.emoji}${category.name} | (${commands.size}) comandos`)
          .setColor(category.color)
        );
      });
    } catch (_) {
      message.channel.send(`Erro: » **${message.author.username}**, ative sua **DM** para que eu possa enviar meus comandos.`);
      return message.react('604266617379225620');
    }
  },
  name: 'help',
  aliases: ['h', 'ajuda'],
  category: 'Informações',
  description: 'Informações do bot',
};

