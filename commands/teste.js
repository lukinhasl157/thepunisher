module.exports = {
	run: (bot, message, args) => {

		let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
		let numberRandom = numbers[Math.floor(Math.random() * numbers.length)];

		await message.channel.send("Evento loteria iniciado!");

		try {

		const filter = message.content.startsWith(numberRandom);
		const collector = await channel.awaitMessages(filter, { max: 1, time: 300000, errors: ["time"] });

			return message.channel.send(`${collector.first()} venceu o evento loteria. O número correto era ${numberRandom}`);

		} catch (time) {
			return message.channel.send(`O evento loteria acabou, nenhum usuário venceu. O número correto era ${numberRandom}`);
		}

	}
}