const Discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-BR');

module.exports.run = async (bot, message, args) => {
  var desenvolvedores = ["289209067963154433", "281561868844269569", "385132696135008259"]

  if(!desenvolvedores.includes(message.author.id)) 
    return message.reply("comando exclusivo para desenvolvedores.");

  if (message.content.includes('token')) 
      return message.reply('Ai eu tenho que rir kkkkkkk');

  var code = args.join(' ')
  var embed = new Discord.RichEmbed()
    .setTimestamp(new Date())
    .setFooter(message.author.username, message.author.displayAvatarURL);

  try {
    
    let evaled = eval(code);
    let evaledMsg = `${evaled}`.replace(process.env.token, '*'.repeat(process.env.token.length)).slice(0, 950);

    console.log('Resultado do Eval \n', evaled);

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

}

module.exports.help = {
    name: 'eval'
}




