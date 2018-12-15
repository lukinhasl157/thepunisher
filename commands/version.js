let package = require("./package.json");

module.exports = {
	run: (bot, message, args) => {

		message.channel.send(package.version);
	
	}, aliases: ["versão", "versao"],
	   category: "Utilidades",
	   description: "Mostra a versão atual do bot."
}