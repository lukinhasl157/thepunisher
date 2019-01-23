module.exports = {
	run: (bot, message, args) => {

	const reverse = args.join(" ").split("").reverse().join("");
	const string = "Tá troll? Coloca uma mensagem.";
	const stringReverse = string.split("").reverse().join("");
		if (args.lenght === 0) {
			return message.channel.send(stringReverse);
		} else {
			message.channel.send(reverse);
		}
	},
	aliases: ["reverter", "inverter"],
	category: "Entretenimento",
	description: "Reverter os argumentos."
}