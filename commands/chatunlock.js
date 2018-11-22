
module.exports = {
    run: (bot, message, args) => {

if (!message.member.hasPermission("MANAGE_CHANNELS")) {
  return message.channel.sendmessage.channel.send(`**${message.author.username}** | Desculpe, você não permissão para executar este comando! Permissão requirida: **MANAGE_CHANNELS**`);
}
  var everyone = message.guild.roles.find(r => r.name === "@everyone");
  message.channel.overwritePermissions(everyone, {
     SEND_MESSAGES: true  
})
   message.channel.send(`» O canal ${message.channel} foi **REATIVADO.** :unlock: por **${message.author.username}**`);
},
  aliases: ["chunlock", "unlock"],
  category: "Moderação",
  description: "Reativar o chat."
}
