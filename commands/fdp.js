module.exports = {
	run: (bot, message, args) => {

		let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.get(args.join(" "));

		if (member) {
			message.channel.send(`${member}, o usuário **${message.author.username}** xingou você de:\n https://www.tenor.co/VKuX.gif`);
		} else {
			message.channel.send(`**${message.author.username}** | O usuário **${args.join(" ")}** não foi encontrado.`);
		}

	}, aliases: ["filho da puta", "filhodaputa"],
	   category: "Entreterimento",
	   description: "Xingar um usuário de filho da puta."
}
