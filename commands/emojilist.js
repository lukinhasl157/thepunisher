const Discord = require("discord.js");
module.exports = {
    run: (bot, message, args) => {

        try {
            const emojis = message.guild.emojis.map(e => e).join("\n");
            const embed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setAuthor(`Lista de emojis ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL)
            .setDescription(emojis)
            .setFooter(`Comando soliticado por: ${message.author.tag}`, message.author.displayAvatarURL)
            .setTimestamp(new Date())
            message.channel.send(embed);
        } catch (e) {
            message.channel.send(`**${message.author.username}** | Erro: A lista de emojis excedeu o limite de **2000 caracteres** do Discord.`);
        }
    },
    aliases: ["emojis", "emotes", "emotelist"],
    category: "Utilidades",
    description: "Mostar a lista de emojis do servidor."
}