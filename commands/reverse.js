module.exports = {
	run: (bot, message, args) => {

		let reverse = args.join(" ").split("").reverse().join("");
		let string = "Tá troll? Coloca uma mensagem.";
		let stringReverse = string.split("").reverse().join("");

		if (args.lenght === 0) {

			return message.channel.send(stringReverse);

		} else {

			message.channel.send(reverse);
			
		}

},
	aliases: ["reverter", "inverter"],
	category: "Entreterimento",
	description: "Reverter os argumentos."
}