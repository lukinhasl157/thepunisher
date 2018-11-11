
    const Discord = require("discord.js");

    module.exports.run = async (bot, message, args) => {

     if (!message.member.hasPermission("ADMINISTRATOR")) {
     return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000")); 
     }
 var da = message.guild.roles.find("name", "@everyone")
 message.channel.overwritePermissions(da, {
     SEND_MESSAGES: true
     
     
   })
   message.channel.send(new Discord.RichEmbed().setDescription(`» O canal ${message.channel} foi **ATIVADO.** :unlock:`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
 
 }
 module.exports.help = {
  name: "chatunlock"
}
