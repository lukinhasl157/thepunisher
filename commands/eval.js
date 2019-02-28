const Discord = require("discord.js");
const inspect = require('util');
module.exports = {
  run: (bot, message, args) => {
      const devs = ["289209067963154433", "385132696135008259", "281561868844269569"];
    if (!devs.includes(message.author.id)) {
        return message.channel.send(`**${message.author.username}** | Este comando é exclusivo para desenvolvedores`);
    } else if (args.length === 0) {
        return message.channel.send(`**${message.author.username}** | Insira um código.`);
    } else {
      let code = args.join(' ').replace(/^```(js|javascript ?\n)?|```$/g, '')
      let value = (l, c) => `\`\`\`${l}\n${String(c).slice(0, 1000) + (c.length >= 1000 ? '...' : '')}\n\`\`\``.replace(process.env.token, () => '*'.repeat(process.env.token.length))
      let embed = new Discord.RichEmbed()
        .setColor('#36393F')
      try {
        let resultEval = eval(code);
        let toEval = typeof resultEval === 'string' ? resultEval : inspect(resultEval, { depth: 1 });
          embed.addField('Resultado', value('js', toEval))
          embed.addField("Código", value('js', resultEval))
          embed.addField('Tipo', value('css', typeof resultEval))
          embed.setColor("GREEN")
      } catch (error) {
        embed.addField("Código", value('js', resultEval))
        embed.addField('Erro', value('js', error))
        embed.setColor("RED")
      } finally {
        message.channel.send(embed);
      }
    }
  },
  aliases: ["evaluate", "code"],
  category: "Desenvolvedores",
  description: "Executar um código"
}