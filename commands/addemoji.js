module.exports = {
    run: (bot, message, args) => {

        const link = args[0].shift();
        const emojiName = args.join("-");

        if (!link) {
            return message.channel.send(`**${message.author.username}** | Por favor, insira o link do emoji que deseja adicionar.`);
        } else if (!link.endsWith(".png" || ".png?v=1")) {
            return message.channel.send(`**${message.author.username}** | Desculpe, o link deste emoji é inválido.`);
        } else if (!emojiName) {
        	return message.channel.send(`**${message.author.username}** | Por favor, insira um nome para este emoji.`);
        } else {
            message.guild.createEmoji(link, emojiName);
            message.channel.send(`Emoji ${emojiName} criado com sucesso!`);
        }
    }
}
