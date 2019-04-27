module.exports = {
    run: async function(bot, message, args, database) {

        const eventRef = await database.ref(`Servidores/${message.guild.id}/Eventos`);
        eventRef.once("value").then(async function(event) {
            if (event.val() == null) {
                eventRef.set({
                    guildMemberAdd: true
                });
                await message.channel.send("Evento criado na database com sucesso. Digite o comando novamente.");
            }
        });
        database.ref(`Servidores/${message.guild.id}/Eventos/guildMemberAdd`).once("value").then(async function() {
            if (event.val() == true) {
                message.channel.send("O evento de bem-vindo está ativado.");
            } else {
                if (event.val() == false) {
                    message.channel.send("O evendo de bem-vindo está desativado.")
                }
            }
        });
    }
}