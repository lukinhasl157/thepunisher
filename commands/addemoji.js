module.exports = {
    run: (bot, message, args) => {

        try {

        const link = args.shift();
        const emojiName = args.join("-");

        if (!link) {
            return message.channel.send(`**${message.author.username}** | Por favor, insira o link do emoji que deseja adicionar.`);
        } else if (!emojiName) {
        	return message.channel.send(`**${message.author.username}** | Por favor, insira um nome para este emoji.`);
        } else {
            message.guild.createEmoji(link, emojiName);
            message.channel.send(`Emoji ${args.join("-")} foi adicionado com sucesso!`);
        }

        } catch(e) {
            console.log(e);
            return message.channel.send(`**ERRO**: O servidor excedeu o limite de **100** emojis do Discord.`);
        }
    },
    aliases: ["adicionaremoji", "emojiad"],
    category: "Utilidades",
    description: "Adicionar um emoji ao servidor."
}
