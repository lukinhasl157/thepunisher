
  const Discord = require("discord.js");

  module.exports.run = async (bot, message, args) => {

  if (message.author.id !== '289209067963154433') return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Este comando é exclusivo do <@289209067963154433>`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000")).then(message.delete());
  let lucas = args.slice(0).join(' ');
  if (lucas.length < 1) return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, digite o nome do comando que deseja dar reload.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
  if (message.content === "j!reload reload") return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não pode reiniciar o comando **RELOAD.**`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
  
  try {
      delete require.cache[require.resolve(`./${args[0]}.js`)];
  } catch (e) {
    var embed2 = new Discord.RichEmbed()
    .setTimestamp()
    .setDescription(`<:cancel1:500150315304091649> Desculpe, o comando **${args[0]}** não existe ou foi digitado incorretamente.`)
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
    .setColor ("#ff0000")
      return message.channel.send(embed2)
  }
  var embed = new Discord.RichEmbed()
  .setTimestamp()
  .setTitle(`**Reload complete!**`)
  .setDescription(`Comando **${args[0]}** foi reiniciado com sucesso! <a:sucessogif:499614074129350666>`)
  .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
  .setColor("#07ed66")
  message.channel.send(embed);
}
module.exports.help = {
  name: "reload"
}
