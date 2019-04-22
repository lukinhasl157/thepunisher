module.exports = {
    run: async function(bot, message, args, database) {
        const eventRef = await database.ref(`Servidores/${message.guild.id}/Eventos/guildMemberAdd`);

        eventRef.once("value").then(async function(event) {
            if (event.val() == false) {
                message.channel.send("Desculpe, o evento bem-vindo já está desativado.")
            } else {
                eventRef.update({
                    guildMemberAdd: false
                });
                await message.channel.send("O evento \`\`bem-vindo\`\` foi desativado com sucesso.");
            }
        });
    }
}