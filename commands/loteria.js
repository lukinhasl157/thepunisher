module.exports = {
	run: async function(bot, message, args) {

	function numbersRandom () {
		Math.floor(Math.random() * 50);
	}

		message.channel.send(`Evento loteria iniciado! Um número aleátorio foi gerado entre 0 e 50. Para participar digite t.loteria "número". Boa sorte aos participantes!`);
		const filter = msg => msg.content.includes(numbersRandom());
		const collected = await message.channel.awaitMessages(filter, { max: 1, time: 300000, erros: ["time"] }).then(collected => {
		message.channel.send(`${collected.first().author} venceu o evento loteria. O número correto era **${numbersRandom()}**.`)
		}).catch(e => {
			message.channel.send(`O evento loteria acabou, nenhum usuário venceu. O número correto era **${numbersRandom()}**.`)
		});

	},

	aliases: [],
	category: "Entreterimento",
	description: "Inicia o evento loteria gerando um número aleátorio entre 0 e 50"
}