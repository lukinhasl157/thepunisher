module.exports = {
    run: async function(bot, message, args, database) {

        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        if (message.guild.id !== "515877819914518529") {
            return message.channel.send("Este comando se encontra em fase de testes e só está disponível para uso no servidor oficial do bot. Para receber o convite do servidor digite \`\`t.suporte\`\`")
        } else {
            const memberRef = database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`);
            memberRef.once("value").then(async function(db) {
                if (db.val() == null) {
                    memberRef.set({
                        xp: 0,
                        level: 1
                    });
                    await message.channel.send(`Perfil criado na database comn sucesso.\nNível atual: ${memberRef.val().level}, xp: ${memberRef.val().xp}`);
                } else {
                    await message.channel.send(`Level atual: ${db.val().level}, xp: ${db.val().xp}`);
                }
            });
        }
    }
}