module.exports = {
	run: (message, args) => {

		let number = args.join(" ");
		let number2 = (number >= 12) ? "Este número é maior" : "Este número é menor";

			message.channel.send(number2);
	}
}