module.exports = {
	run: async function (bot, message, args) {

		let member = message.mentions.members.first() || message.guild.members.get(args[0]);

		if (!member)
			return message.channel.send(`**${message.author.username}**, | Por favor, insira o id ou mencione o usuário que deseja xingar.`);

			message.channel.send(`**${message.author.username}** | Como deseja xingar o usuário **${member.user.tag}** ? (Após \`\`30s\`\` esta mensagem será apagada.)`).then(msg => {
			msg.delete(30000);

			const filter = m => m.author.id === message.author.id;
			const collector = msg.channel.createMessageCollector(filter, {time: 30000});

				collector.on("collect", async m => {

					message.channel.send(`**${message.author.username}**, seu xingamento enviado com sucesso.`);
					await message.channel.send(`${member}, o usuário **${message.author.username}**, xingou você de: "${m.content}". Caso queira xingar o usuário de volta clique no emoji "<:velhodoinfarto:517877465750700033>"`);
					await message.react(":velhodoinfarto:517877465750700033")
					await msg.stop(message.author.id);

				})

			const filter2 = (r, u) => r.emoji.name === "velhodoinfarto" && u.id === message.author.id;
			const collector2 = msg.createReactionCollector(filter2, {time: 60000});

				collector2.on("collect", r => {

					r.remove(message.author.id);
					message.channel.send(`${member}, o usuário **${message.author.username}**, xingou você de: "${m.content}".`);

			})

		})

	}
}


