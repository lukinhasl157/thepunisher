const Discord = require("discord.js");
module.exports = {
    run: async function (bot, message, args) {

        let channel = message.guild.channels.find(c => c.name === "✅❌sugestões");
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
            message.react(":negado:505155029636874250");
            return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`\`MANAGE_CHANNELS\`\` para executar este comando.`);
        } else if (args.length === 0) {
            message.react(":negado:505155029636874250");
            return message.channel.send(`» **${message.author.username}** | Por favor, insira uma sugestão!`);
        } else if (!channel) {
            channel = await message.guild.createChannel("✅❌sugestões", "text", [{
            id: message.guild.id,
            deny: ["SEND_MESSAGES"],
            allow: ["ADD_REACTIONS", "VIEW_CHANNEL"]
            }]);

            await channel.send(new Discord.RichEmbed()
                .addField("**Sugestão**", args.join(" "))
                .setFooter(`Sugestão enviada por: ${message.author.tag}`, message.author.displayAvatarURL)
                .setTimestamp(new(Date))
                .setColor("#07ed66")
                .setThumbnail(message.author.displayAvatarURL)
            ).then(async (msg) => {
                await msg.react(":correto:505155063963058187");
                await msg.react(":negado:505155029636874250");
            });
            message.react(":correto:505155063963058187");
            await message.channel.send(`» **${message.author.username}** | Não encontrei o canal \`\`✅❌sugestões\`\`, então criei o canal automaticamente.`);
            await message.channel.send(`» **${message.author.username}** | Sua sugestao foi enviada com sucesso!`);
        } else {
            if (channel) {
                channel.send(new Discord.RichEmbed()
                    .addField("**Sugestão**", args.join(" "))
                    .setFooter(`Sugestão enviada por: ${message.author.tag}`, message.author.displayAvatarURL)
                    .setTimestamp(new(Date))
                    .setColor("#07ed66")
                    .setThumbnail(message.author.displayAvatarURL)
                ).then(async (m) => {
                    await m.react(":correto:505155063963058187");
                    await m.react(":negado:505155029636874250");
                });
                message.react(":correto:505155063963058187");
                message.channel.send(`» **${message.author.username}** | Sua sugestao foi enviada com sucesso!`);
            }
        }
    },
    aliases: ["sugestao"],
    category: "Utilidades",
    description: "Enviar uma sugestão."
}