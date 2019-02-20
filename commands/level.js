module.exports = {
    run: async function(message, args, database) {

        const memberRef = await database.ref(`${message.guild.id}/${message.author.id}`);
        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

        if (memberRef.val() === null) {
            memberRef.set({
                xp: 0,
                level: 1
            });
            await message.channel.send(`Nível atual: ${memberRef.val().level}`);
        } else {
            memberRef().once("value").then(async function(DBlevel, DBxp) {
                const level = DBlevel.val().level;
                const xp = DBxp().val().xp;
                await message.channel.send(`Level atual: ${level}, xp: ${xp}`);
            });
        }
    }
}