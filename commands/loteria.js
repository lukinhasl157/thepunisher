module.exports = {
	run: async function (bot, message, args) {

		const serverMap = bot.map.get(message.guild.id);

		if (serverMap) {
			return message.channel.send("O evento loteria já começou");
		} else {
			const eventConstruct = { lotery: { participants: [], ingame: null } };
			bot.map.set(message.guild.id, eventConstruct);

			message.channel.send("O evento loteria irá começar em \`\`30s\`\`, para participar do evento digite \`\`t.loteriajoin\`\`");
			setTimeout(async function() {
				if (eventConstruct.lotery.participants.length < 2) {
					bot.map.delete(message.guild.id);
					return message.channel.send(`O evento loteria foi cancelado, número de participantes foi insuciente ${eventConstruct.lotery.participants.length}/2`);
				} else {
					message.channel.send(`Evento loteria iniciado com \`\`${eventConstruct.lotery.participants.length}\`\` participantes, um número aleátorio foi gerado entre \`\`0 e 50.\`\``);
					const numberGenerator = Math.floor(Math.random() * 50);
					eventConstruct.lotery.ingame = true;
					const filter = msg => msg.content == numberGenerator && eventConstruct.lotery.participants.includes(msg.author.id);
					await message.channel.awaitMessages(filter, { time: 5 * 60 * 1000, max: 1, errors: ["time"] }).then(async (collected) => {
						message.channel.send("O usuário " + collected.first().author + " venceu o evento loteria. O numero correto era " + numberGenerator);
						return bot.map.delete(message.guild.id);
					}).catch(() => {
						bot.map.delete(message.guild.id);
						return message.channel.send(`O evento loteria acabou, nenhum usuário venceu. O número correto era **${numberGenerator}**.`);
					});
				}
			}, 30 * 1000);
		}
		
	},
	aliases: ["lotery"],
	category: "Entretenimento",
	description: "Inicia o evento loteria gerando um número aleátorio entre 0 e 50"
}