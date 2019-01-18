module.exports = {
	run: (bot, message, args) => {

		const msg = args.join(" ");
		if (!msg) {
			return message.channel.send("Digite uma mensagem.");
		} else {
			message.delete();
    		message.channel.send(msg);
		}
 },
	aliases: ["falar", "dizer"],
	category: "Entretenimento",
	description: "Dizer uma mensagem pelo bot"
}
