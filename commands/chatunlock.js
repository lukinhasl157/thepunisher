
module.exports = {
    run: (bot, message, args) => {

    	try {

if (!message.member.hasPermission("MANAGE_CHANNELS")) {
  return message.channel.send(`**${message.author.username}** | Desculpe, você não permissão para executar este comando! Permissão requirida: **MANAGE_CHANNELS**`);
}
  var everyone = message.guild.roles.find(r => r.name === "@everyone");
  message.channel.overwritePermissions(everyone, {
     SEND_MESSAGES: true  
});
   message.channel.send(`» O canal ${message.channel} foi **REATIVADO.** :unlock: por **${message.author.username}**`);

} catch (e) {
	message.channel.send(`**${message.author.usarname}** | Erro: Eu não tenho a permissão de **GERENCIAR_CANAIS**.`);
}
   
},
  aliases: ["chunlock", "unlock"],
  category: "Moderação",
  description: "Reativar o chat."
}
