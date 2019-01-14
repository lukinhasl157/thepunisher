module.exports = {
    run: (bot, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    const nickName = args.slice(1).join(" ");

    	if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
    		return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando. Permissão necessária: **MANAGE_NICKNAMES**.`);
    	} else if (!member) {
    		return message.channel.send(`**${message.author.username}** | Por favor, insira o id ou mencione o usuário que deseja alterar o nick.`);
    	} else if (member.highestRole > message.member.highestRole) {
    		return message.channel.send(`**${message.author.username}** | Desculpe, o cargo deste usuário é maior que o seu.`);
    	} else if (!nickName) {
    		return message.channel.send(`**${message.author.username}** | Por favor, insira um novo nickname para este usuário.`);
    	} else if (nickName.length > 32) {
    		return message.channel.send(`**${message.author.username}** | Desculpe, o limite de 32 caractéres do Discord foi atingido, tente um nick menor.`)
    	} else {
    		member.setNickname(nickName).catch(e => {
    			return;
    		});
    			message.channel.send(`<a:sucessogif:499614074129350666> | Nick alterado com sucesso. O novo nickname do usuário é **${nickName}**`);
    	}
},

    aliases: ["alterarnick", "changenickname", "editnickname"],
    category: "Utilidades",
    description: "Alterar o nome de um usuário."
}





