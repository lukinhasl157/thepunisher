
module.exports = {
    run: (bot, message, args) => {

    	try {

if (!message.member.hasPermission("MANAGE_CHANNELS")) {
  return message.channel.send(`**${message.author.username}** | Desculpe, você não permissão para executar este comando! Permissão requirida: **MANAGE_CHANNELS**`);
}
  var everyone = message.guild.roles.find(r => r.name === "@everyone");
  message.channel.overwritePermissions(everyone, {
     SEND_MESSAGES: false
});
   message.channel.send(`» O canal ${message.channel} foi **DESATIVADO.** :lock: por **${message.author.username}**. Para reativar o chat utilize t.unlock`);

} catch (e) {
	message.channel.send(`**${message.author.usarname}** | Erro: Eu não tenho a permissão de **GERENCIAR_CANAIS**.`)
}
   
},
    aliases: ["chlock", "lock"],
    category: "Moderação",
    description: "Desativar o chat."
}

