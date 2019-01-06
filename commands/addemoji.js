module.exports = {
    run: (bot, message, args) => {

    if (!args[0]) {
            return message.channel.send(`**${message.author.username}** | Desculpe o link deste emoji é inválido.`);
        } else if (!args[0].endsWith(".png" || ".png?v=1")) {
            return message.channel.send(`**${message.author.username}** | Desculpe o link deste emoji é inválido.`);
        } else if (!args[1]) {
        	return message.channel.send(`**${message.author.username}** | Por favor, insira um nome para este emoji.`);
        } else {
            const link = args[0];
       		const emojiName = args[1].join("-").split(" ");
            message.guild.emojis.create(link, emojiName);
            message.channel.send(`Emoji ${emojiName} criado com sucesso!`);
        }
    }
}