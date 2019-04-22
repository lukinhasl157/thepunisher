module.exports = {
    run: async function(bot, message, args, database) {
        const eventRef = await database.ref(`Servidores/${message.guild.id}`);
        eventRef.once("value").then(async function(event) {
            if (event.val() == null) {
                eventRef.set({
                    guildMemberAdd: true,
                });
                await message.channel.send("Evento criado na database com sucesso.");
            } else {
                if (event.val() == true) {
                    message.channel.send("A mensagem de bem-vindo está ativada, para ativar digite: \`\`t.bemvindo off\`\`");
                } else {
                    if (event.val() == false) {
                        message.channel.send("A mensagem de bem-vindo está desativada, para ativar digite: \`\`t.bemvindo on\`\`")
                    }
                }
            }
        });
    }
}