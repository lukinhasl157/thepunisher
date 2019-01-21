module.exports = {
	run: async function (bot, message, args) {

		const random = Math.floor(Math.random() * 100);
		message.channel.send(`Evento loteria iniciado! Um número aleátorio foi gerado entre 0 e 100. Para participar digite um "número". Boa sorte aos participantes!`);

		const filter = msg => msg.content.startsWith(random);
		const collected = await message.channel.awaitMessages(filter, { max: 1, time: 300000, erros: ["time"] })
		.then(collected => {
			message.channel.send(`${collected.first().author} venceu o evento loteria. O número correto era **${random}**.`);
		}).catch(() => {
			message.channel.send(`O evento loteria acabou, nenhum usuário venceu. O número correto era **${random}**.`);
		});
	},

	aliases: ["lotery"],
	category: "Entretenimento",
	description: "Inicia o evento loteria gerando um número aleátorio entre 0 e 50"
}