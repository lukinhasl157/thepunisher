module.exports = {
	run: ({ message, args }) => {

		function reverseStr(String) {
			return String.split("").reverse().join("");
		}

		if (args.lenght === 0) {
			return message.channel.send("Insira uma frase para ser revertido.");
		} else {
			return message.channel.send(reverseStr(args.join(" ")));
		}
	},
	aliases: ["reverter", "inverter"],
	category: "Entretenimento",
	description: "Reverter os argumentos."
}