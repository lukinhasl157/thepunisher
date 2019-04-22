module.exports = {
    run: (bot, message, args, database) => {
        const eventRef = await database.ref(`Servidores/${message.guild.id}/Eventos/guildMemberAdd`);

        eventRef.once("value").then(async function(event) {
            if (event.val() == null) {
                const eventRefNull = await database.ref(`Servidores/${message.guild.id}/Eventos`);
                eventRefNull.once("value").then(async function(eventNull) {
                    eventNull.set({
                        guildMemberAdd: true,
                    });
                });
            } else if (event.val() == true) {
                message.channel.send("O evento de bem-vindo está ativado.");
            } else {
                if (event.val() == false) {
                    message.channel.send("O evento de bem-vindo está desativado.");
                }
            }
        });
    }
}