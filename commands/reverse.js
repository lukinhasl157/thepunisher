module.exports = {
	run: (bot, message, args) => {

		let string = args.join(" ");
		let stringReverse = string.split(" ").reverse().join(" ");
		message.channel.send(stringReverse);
},
	aliases: ["reverter", "inverter"],
	category: "Entreterimento",
	description: "Reverter os argumentos."
}