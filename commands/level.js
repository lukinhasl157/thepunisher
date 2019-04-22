module.exports = {
    run: async function(bot, message, args, database) {

        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        const memberRef = database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`);
        memberRef.once("value").then(async function(level) {
            if (level.val == null) {
                memberRef.set({
                    xp: 0,
                    level: 1
                });
                await message.channel.send(`Nível atual: ${level.val().level}, xp: ${level.val().xp}`);
            } else {
                await message.channel.send(`Level atual: ${level.val().level}, xp: ${level.val().xp}`);
            }
        });
    }
}