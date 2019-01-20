module.exports = {
	run: (bot, message, args) => {

		if (message.author.id !== "289209067963154433") {
			return message.channel.send("Comando em fase de teste.")
		} else {
			message.member.voiceChannel.join().then(m => {
				m.playFile(`C:/Users/Lucas/Desktop/Arquivos/Youtube/Alan_Walker_Faded.mp3`);
			});
		}
	}
}