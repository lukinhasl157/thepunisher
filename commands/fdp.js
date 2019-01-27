const Discord = require("discord.js");
module.exports = {
	run: (bot, message, args) => {

		const member = message.mentions.members.first() || message.guild.members.get(args[0]);
		if (!member) {
			return message.channel.send(`» **${message.author.username}** | Por favor, insira o id, nome ou mencione o usuário que deseja xingar.`);
		} else {
			message.channel.send(`${member}, o usuário **${message.author.username}** xingou você de:`);
			const attachment = new Discord.Attachment()
			.setAttachment("./filhodaputa.gif")
			message.channel.send(attachment);
		}
	},
	aliases: ["filho da puta", "filhodaputa"],
	category: "Entretenimento",
	description: "Xingar um usuário de filho da puta."
}