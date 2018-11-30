const gifSearch = require("gif-search");

module.exports = {
	run: (bot, message, args) => {

	let pesq = args.join(" ")
		gifSearch.random(pesq).then(
    		gifUrl => message.channel.send({embed: {
        		title: `Resultado da pesquisa de gifs: ${pesq}`,
        		image: {url: gifUrl},
        		color: message.member.displayColor
      }})
);

},
	aliases: ["searchgif", "procurargif"],
	category: "Entreterimento",
	description: "Pesquisar um gif."
}