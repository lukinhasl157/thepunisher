module.exports = {
	run: (bot, message, args) => {

		let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
		let numberRandom = numbers[Math.floor(Math.random() * numbers.length)];

		message.channel.send("Evento loteria iniciado!");

		const filter = msg => msg.content.startsWith(numberRandom);
		const collector = message.channel.createMessageCollector(filter, { time: 300000 });

			collector.on("collect", msg => {

				message.channel.send(`${msg.content.first()} venceu o evento loteria. O número correto era ${numberRandom}`);

			});
			
			collector.on("end", collected => {

				message.channel.send(`O evento loteria acabou, nenhum usuário venceu. O número correto era ${numberRandom}`);
			})

	}
}