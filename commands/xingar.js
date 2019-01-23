module.exports = {
	run: async function (bot, message, args) {

		const member = message.mentions.members.first() || message.guild.members.get(args[0]);
		if (!member) {
			return message.channel.send(`**${message.author.username}**, | Por favor, insira o id ou mencione o usuário que deseja xingar.`);
		} else {
			message.author.send(`**${message.author.username}** | Como deseja xingar o usuário **${member.user.tag}** ? (Após \`\`30s\`\` esta mensagem será apagada.)`)
			.then(msg => {
			msg.delete(30000)
			const filter = m => m.author.id === message.author.id;
			const collector = msg.channel.createMessageCollector(filter, {max: 1, time: 30000});
				collector.on("collect", async m => {
					message.author.send(`**${message.author.username}**, seu foi xingamento enviado com sucesso.`);
					const porra = await message.channel.send(`${member}, o usuário **${message.author.username}**, xingou você de: "${m.content}".`);
					await porra.react(":velhodoinfarto:517877465750700033");
				});
			});
		}
	},
	aliases: [],
	category: "Entretenimento",
	description: "Xingar um usuário."
}


