
  const Discord = require("discord.js");

  module.exports.run = async (bot, message, args) => {

  if (message.author.id !== '289209067963154433') return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Este comando é exclusivo para desenvolvedores.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000")).then(message.delete());
  let args = args.slice(0).join(' ');
  if (!args) return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, digite o nome do comando que deseja dar reload.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
  
    try {
      delete require.cache[require.resolve(`./${args[0]}.js`)];

    } catch (e) {
      return message.channel.send(`<:cancel1:500150315304091649> Desculpe, o comando **${args[0]}** não existe ou foi digitado incorretamente.`);
    }

  message.channel.send(`Comando **${args[0]}** foi reiniciado com sucesso! <a:sucessogif:499614074129350666>`);
}
module.exports.help = {
  name: "reload"
}
