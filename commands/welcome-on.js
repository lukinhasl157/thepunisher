module.exports = {
    run: async function(bot, message, args, database) {
        const eventRef = await database.ref(`Servidores/${message.guild.id}/Eventos/guildMemberAdd`);

        eventRef.once("value").then(async function() {
            eventRef.update({
                guildMemberAdd: true
            });
            await message.channel.send("O evento \`\`bem-vindo\`\` foi ativado com sucesso.");
        });
    }
}