
module.exports = {
    run: (bot, message, args) => {

if (!message.member.hasPermission("MANAGE_CHANNELS")) {
  return message.channel.sendmessage.channel.send(`**${message.author.username}** | Desculpe, você não permissão para executar este comando! Permissão requirida: **MANAGE_CHANNELS**`);
}
  var everyone = message.guild.roles.find(r => r.name === "@everyone");
  message.channel.overwritePermissions(everyone, {
     SEND_MESSAGES: false     
})
   message.channel.send(`» O canal ${message.channel} foi **DESATIVADO.** :lock: por **${message.author.username}**`);
   
},
    aliases: ["chlock", "lock"],
    category: "Moderação",
    description: "Desativar o chat."
}
