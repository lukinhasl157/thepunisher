module.exports = {
	run: (bot, message, args) => {

		let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
		let numberRandom = numbers[Math.floor(Math.random() * numbers.length)];

		message.channel.send("Evento loteria iniciado!");

		try {

		const filter = msg => msg.content.startsWith(numberRandom);
		const collector = channel.awaitMessages(filter, { max: 1, time: 300 * 1000, errors: ["time"] });

			message.channel.send(`${collected.first()} venceu o evento loteria. O número correto era ${collected.first().content}`);

		} catch (e) {
			message.channel.send(`O evento loteria acabou, nenhum usuário venceu. O número correto era ${numberRandom}`);
		}

	}
}