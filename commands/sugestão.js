const Discord = require("discord.js");
module.exports = {
    run: async function (bot, message, args) {

    const channel = message.guild.channels.find(c => c.name === 'sugestões');
        try {
            if (!channel) {
                channel = await message.guild.createChannel('sugestões', 'text', [{
                id: message.guild.id,
                deny: ["SEND_MESSAGES"],
                allow: ["ADD_REACTIONS", "VIEW_CHANNEL"]
                }]);
                await message.channel.send(`» **${message.author.username}** | Não encontrei o canal sugestões, então criei o canal automaticamente.`);
            } else if (args.length === 0) {
            message.react(":negado:505155029636874250");
            return message.channel.send(`» **${message.author.username}** | Por favor, insira uma sugestão!`)
            } else {
                const embed = new Discord.RichEmbed()
                .addField("**Sugestão**", args.join(" "))
                .setFooter(`Sugestão enviada por: ${message.author.tag}`, message.author.displayAvatarURL)
                .setTimestamp(new(Date))
                .setColor("#07ed66")
                .setThumbnail(message.author.displayAvatarURL)
                const msg = await channel.send(embed);

                await msg.react(":correto:505155063963058187");
                await msg.react(":negado:505155029636874250");
                await message.channel.send(`» **${message.author.username}** | Sua sugestao foi enviada com sucesso!`);
                message.react(":correto:505155063963058187");
            }
        } catch(error) {
        message.channel.send(`» **${message.author.username}** | Erro: Eu não tenho a permissão de criar canais.`)
        message.react(":negado:505155029636874250");
    }
},
    aliases: ["sugestao"],
    category: "Utilidades",
    description: "Enviar uma sugestão."
}





