module.exports = {
	run: async function(bot, message, args) {

		let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
		let numberRandom = numbers[Math.floor(Math.random() * numbers.length)];

		message.channel.send("Evento loteria iniciado!");

			const filter = msg => msg.content.startsWith(numberRandom);
			const collected = await message.channel.awaitMessages(filter, { max: 1, time: 300000, erros: ["time"] }).then(collected => {

				message.channel.send(`${collected.first().author} venceu o evento loteria. O número correto era ${numberRandom}`);

			}).catch(e => message.channel.send(`O evento loteria acabou, nenhum usuário venceu. O número correto era ${numberRandom} ${e}`));

	}
}