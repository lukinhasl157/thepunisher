module.exports = {
	run: (bot, message, args) => {

		if (args.length === 0) {
			return message.channel.send("Digite uma mensagem.");
		} else {
			message.delete();
    		message.channel.send(args.join(" "));
		}
	},
	aliases: ["falar", "dizer"],
	category: "Entreterimento",
	description: "Dizer uma mensagem pelo bot"
}
