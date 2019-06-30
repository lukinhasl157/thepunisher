module.exports = {
	run: async function (bot, message, args) {

		const serverMap = bot.map.get(message.guild.id);

		if (!serverMap) {
			return message.channel.send("Não há nenhum evento loteria ocorrendo no momento, para iniciar o evento digite \`\`t.loteria\`\`");
		} else if (serverMap.lotery.ingame == true) {
			return message.channel.send("Desculpe, o evento loteria já começou");
		} else if (serverMap.lotery.participants.includes(message.author.id)) {
			return message.channel.send("Você já está participando do evento loteria.");
		} else {
			serverMap.lotery.participants.push(message.author.id);
			return message.channel.send(`» **${message.author.username}** | Entrou no evento loteria \`\`${serverMap.lotery.participants.length}/2\`\``);
		}
	},
	aliases: ["lotery"],
	category: "Entreterimento",
	description: "Inicia o evento loteria gerando um número aleátorio entre 0 e 50"
}