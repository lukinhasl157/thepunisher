module.exports = {
	run: (bot, message, args) => {

		if (args.join(" ").slice(0).length === 0) {
			return message.channel.send(`**${message.author.username}** | Desculpe o link deste emoji é inválido.`);
		} else if (args.join(" ").slice(1).length === 0) {
			return message.channel.send(`**${message.author.username}** | Por favor, insira um nome para este emoji.`);
		} else {
			message.guild.emojis.create(args.join("").slice(0), args.join("").slice(1));
			const emoji = message.guild.emojis.find(e => e.name === args.join("").slice(1));
			message.channel.send(`${emoji.name} criado com sucesso!\n ${emoji.url}`);
		}
	}
}