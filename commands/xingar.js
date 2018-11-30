module.exports = {
	run: async function (bot, message, args) {

		let member = message.mentions.members.first() || message.guild.members.get(args[0]);

		if (!member)
			return message.channel.send(`**${message.author.username}**, | Por favor, insira o id ou mencione o usuário que deseja xingar.`);

		message.channel.send(`**${message.author.username}** | Como deseja xingar o usuário **${member.user.tag}** ?`).then(msg => {
			msg.delete(30000);

			const filter = m => m.author.id === message.author.id;
			const collector = msg.channel.createMessageCollector(filter, {time: 30000});

				collector.on("collect", async m => {

					message.channel.send(`**${message.author.username}**, seu xingamento enviado com sucesso.`);
					await message.channel.send(`${member}, o usuário **${message.author.username}**, Xingou você de ${m.content}`);
					await msg.stop(message.author.id);

				})

		})

	}
}




