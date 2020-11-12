const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');

const value = (l, c) => `\`\`\`${l}\n${String(c).slice(0, 1000) + (c.length >= 1000 ? '...' : '')}\n\`\`\``.replace(process.env.DISCORD_TOKEN, () => '*'.repeat(process.env.DISCRD_TOKEN.length));

module.exports = {
  run: ({
    // eslint-disable-next-line no-unused-vars
    message, bot, args, server, Guilds, staff, t,
  }) => {
    if (args.length === 0) {
      return message.channel.send(`**${message.author.username}** | Insira um código.`);
    }

    const code = args.join(' ').replace(/^```(js|javascript ?\n)?|```$/g, '');
    const embed = new MessageEmbed();
    try {
      // eslint-disable-next-line no-eval
      const resultEval = eval(code);
      const toEval = typeof resultEval === 'string' ? resultEval : inspect(resultEval, { depth: 0 });

      embed.addField('Resultado', value('js', toEval));
      embed.addField('Código', value('js', code));
      embed.addField('Tipo', value('css', typeof resultEval));
      embed.setColor('GREEN');
    } catch (error) {
      embed.addField('Erro', value('js', error));
      embed.addField('Código', value('js', code));
      embed.setColor('RED');
    }

    return message.channel.send(embed);
  },
  name: 'eval',
  onlyDevs: true,
  aliases: ['evaluate', 'code'],
  category: 'Desenvolvedores',
  description: 'Executar um código',
};
