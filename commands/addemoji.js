module.exports = {
	run: (bot, message, args) => {

		if (args[0].length === 0) {
			return message.channel.send(`**${message.author.username}** | Desculpe o link deste emoji é inválido.`);
		} else if (args.join(" ").length === 0) {
			return message.channel.send(`**${message.author.username}** | Por favor, insira um nome para este emoji.`);
		} else {
			message.guild.emojis.create(`${args[0]}`, `${args.join(" ")}`);
			message.channel.send(`Emoji **${args.join(" ")}** criado com sucesso!`);
		}
	}
}