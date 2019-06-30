const flip = require("flip-text");
module.exports = {
	run: (bot, message, args) => {

    if (args.length === 0) {
    	return message.channel.send(flip("Ta troll? Coloca uma msg."));
    } else {
     	message.channel.send(flip(args.join(" ")));
    }
},
	aliases: ["girar"],
	category: "Entreterimento",
	description: "Girar os argumentos de ponta cabeça."
}
