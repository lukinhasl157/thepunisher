const Discord = require("discord.js");

module.exports = {
  run: (bot, message, args) => {

if (!message.member.hasPermission("MANAGE_CHANNELS")) {
  return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000")); 
}
  var lock = message.guild.roles.find(r => r.name === "@everyone");
 message.channel.overwritePermissions(lock, {
     SEND_MESSAGES: true
})
   message.channel.send(new Discord.RichEmbed().setDescription(`» O canal ${message.channel} foi **ATIVADO.** :unlock:`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
},
  aliases: ["chunlock", "unlock"],
  category: "Moderação",
  description: "Reativar o chat."
}
