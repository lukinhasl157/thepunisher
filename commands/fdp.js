const Discord = require("discord.js");

module.exports = {
	run: (bot, message, args) => {

		let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.startsWith(args.join(" ")));

		if (args.length === 0) {
			return message.channel.send(`» **${message.author.username}** | Por favor, insira o id, nome ou mencione o usuário que deseja xingar.`);
		}

		if (member) {
			message.channel.send(`${member}, o usuário **${message.author.username}** xingou você de:`);
			const attachment = new Discord.Attachment()
			.setAttachment("./filhodaputa.gif")
			message.channel.send(attachment);

		} else {
			message.channel.send(`**${message.author.username}** | O usuário **${args.join(" ")}** não foi encontrado.`);
		}

	}, aliases: ["filho da puta", "filhodaputa"],
	   category: "Entretenimento",
	   description: "Xingar um usuário de filho da puta."
}
