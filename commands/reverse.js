module.exports = {
	run: (bot, message, args) => {

		let stringReverse = args.join(" ").split(" ").reverse().join(" ");
		message.channel.send(stringReverse);
},
	aliases: ["reverter", "inverter"],
	category: "Entreterimento",
	description: "Reverter os argumentos."
}