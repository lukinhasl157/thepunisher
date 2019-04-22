module.exports = {
    run: async function(bot, message, args, database) {
        const eventRef = await database.ref(`Servidores/${message.guild.id}/Eventos/guildMemberAdd`);

        eventRef.once("value").then(async function() {
            eventRef.update({
                guildMemberAdd: true
            });
        });
    }
}