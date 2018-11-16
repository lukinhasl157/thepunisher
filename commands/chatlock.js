const Discord = require("discord.js");

module.exports = {
    run: (bot, message, args) => {


     if (!message.member.hasPermission("ADMINISTRATOR")) {
     return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
     
     }
  var lock1 = message.guild.roles.find(r => r.name === "@everyone");
  message.channel.overwritePermissions(lock1, {
     SEND_MESSAGES: false

     
   })
   message.channel.send(new Discord.RichEmbed().setDescription(`» O canal ${message.channel} foi **DESATIVADO.** :lock:`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));


},

    aliases: ["chlock", "lock"],
    category: "Moderação",
    description: "Desativar o chat."
}
