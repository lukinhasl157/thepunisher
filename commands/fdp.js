const Discord = require("discord.js");

module.exports = {
	run: (bot, message, args) => {

		let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.startsWith(args.join(" ")));

		if (args.length === 0) {
			return message.channel.send(`» **${message.author.username}** | Por favor, insira o id, nome ou mencione o usuário que deseja xingar.`);
		}

		if (member) {
			const attachment = new Discord.Attachment()
			.setAttachment("https://media1.tenor.com/images/d1a859a5f30ffae77b2359aa10c8a76a/tenor.gif?itemid=11341089")
			message.channel.send(`${member}, o usuário **${message.author.username}** xingou você de:\n${attachment}`);
		} else {
			message.channel.send(`**${message.author.username}** | O usuário **${args.join(" ")}** não foi encontrado.`);
		}

	}, aliases: ["filho da puta", "filhodaputa"],
	   category: "Entreterimento",
	   description: "Xingar um usuário de filho da puta."
}
