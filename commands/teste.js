module.exports = {
	run: (bot, message, args) => {

		if (message.author.id !== "289209067963154433") {
			return message.channel.send("Comando em fase de teste.")
		} else if (args.length === 0) {
			return message.channel.send("Insira um link de musica.");
		} else {
			message.member.voiceChannel.join().then(m => {
				m.playStream(args.join(" "))
			});
		}
	}
}