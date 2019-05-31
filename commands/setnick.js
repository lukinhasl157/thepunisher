module.exports = {
  run: async function (bot, message, args) {
  	
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    const nickName = args.slice(1).join(" ");
    
    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`\`MANAGE_NICKNAMES\`\` para executar este comando.`)
    } else if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
     	return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando. Permissão necessária: \`\`MANAGE_NICKNAMES.\`\``);
    } else if (!member) {
    	return message.channel.send(`**${message.author.username}** | Por favor, insira o id ou mencione o usuário que deseja alterar o nick.`);
    } else if (message.member.highestRole.position <= member.highestRole.position) {
    	return message.channel.send(`**${message.author.username}** | Desculpe, o cargo deste usuário é igual ou maior que o seu.`);
    } else if (!nickName) {
    	return message.channel.send(`**${message.author.username}** | Por favor, insira um novo nickname para este usuário.`);
    } else if (nickName.length > 32) {
    	return message.channel.send(`**${message.author.username}** | Desculpe, o limite de 32 caractéres do Discord foi atingido, tente um nick menor.`)
    } else {
      await member.setNickname(nickName);
    	message.channel.send(`<a:sucessogif:499614074129350666> | Nick alterado com sucesso. O novo nickname do usuário é **${nickName}**`);
      }
  },
  aliases: ["alterarnick", "changenickname", "editnickname"],
  category: "Utilidades",
  description: "Alterar o nome de um usuário."
}