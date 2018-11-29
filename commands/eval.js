const { RichEmbed } = require('discord.js');
const moment = require('moment');
moment.locale('pt-BR');

  module.exports = {
    run: async function (bot, message, args) {
    
    const code = args.join(' ');
    const DEV_IDS = ["289209067963154433", "281561868844269569", "385132696135008259"];
    const embed = new RichEmbed()
      .setTimestamp(new Date())
      .setColor('RANDOM')

    try {

      if (!DEV_IDS.includes(message.author.id) || message.content.toLowerCase().includes('token'))
        return message.react('🖕:skin-tone-1:');

      let evaled = eval(code);
      let evaledMsg = `${evaled}`.replace(process.env.token, '*'.repeat(process.env.token.length)).slice(0, 950);

      embed.setColor("#07ed66")
      .addField(':inbox_tray: Código:', `\`\`\`js\n${code}\`\`\``, false)
      .addField(':outbox_tray: Resultado:', `\`\`\`js\n${evaledMsg}\`\`\``, false); 

    } catch (err) {
        
      embed.setColor("#e53030")
        .addField(':inbox_tray: Código:', `\`\`\`js\n${code}\`\`\``, false)
        .addField('<:cancel1:500150315304091649> Erro:', `\`\`\`js\n${err}\`\`\``, false);
  
    } finally {
      await message.channel.send(embed);
    }

},
  category: "Desenvolvedor",
  description: "Executar um código."
}




