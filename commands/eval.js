const Discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-BR');

module.exports.run = async (bot, message, args) => {
    
    var desenvolvedores = ["289209067963154433", "281561868844269569", "385132696135008259"]

    if(!desenvolvedores.includes(message.author.id)) return message.reply("Hmm, parece que algum garoto espertinho querendo usar o meu eval");
    if (message.content.includes('token')) return message.reply('Ai eu tenho que rir kkkkkkk')
    var code = await args.join(' ')
    try {
      let evaled = await eval(code)
  
      if (evaled === null) evaled = 'null'
      if (evaled === undefined) evaled = 'undefined'
  
      var embed = new Discord.RichEmbed()
        .setColor("#07ed66")
        .setTimestamp(new Date())
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .addField(':inbox_tray: Código:', `\`\`\`js\n${code}\`\`\``, false)
        .addField(':outbox_tray: Resultado:', `\`\`\`LDIF\n${evaled}\`\`\``, false)
  
       message.channel.send(embed);
    } catch (err) {
      var embed2 = new Discord.RichEmbed()
        .setColor("#e53030")
        .setTimestamp(new Date())
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .addField(':inbox_tray: Código:', `\`\`\`js\n${code}\`\`\``, false)
        .addField('<:cancel1:500150315304091649> Erro:', `\`\`\`LDIF\n${err}\`\`\``, false)
  
       message.channel.send(embed2);
    }
  }

module.exports.help = {
    name: 'eval'
}




