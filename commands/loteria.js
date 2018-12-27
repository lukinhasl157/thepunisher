module.exports = {
	run: async function(bot, message, args) {

		let numberRandom = Math.round(Math.random() * 50);

		message.channel.send("Evento loteria iniciado!");

			const filter = msg => msg.content.startsWith(numberRandom);
			const collected = await message.channel.awaitMessages(filter, { max: 1, time: 300000, erros: ["time"] }).then(collected => {

				message.channel.send(`${collected.first().author} venceu o evento loteria. O número correto era **${numberRandom}**.`);

			}).catch(collected => message.channel.send(`O evento loteria acabou, nenhum usuário venceu. O número correto era **${numberRandom}**.`));

	}
}