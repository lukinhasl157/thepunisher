
const reverse = require("reverse-text");

	module.exports = {
		run: (bot, message, args) => {

    if (!args[0]) {

    	return message.channel.send(reverse("Ta troll? Coloca uma msg."));

    } else {
        
     message.channel.send(reverse(args.join(" ")));

    }
},
	aliases: ["reverter", "inverter"],
	category: "Entreterimento",
	description: "Reverter os argumentos."
}