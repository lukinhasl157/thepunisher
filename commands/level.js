module.exports = {
    run: async function(database, message, args) {

        const memberRef = await database.ref(`${message.guild.id}/${message.author.id}`);
        const data = await memberRef.once('value');
        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

        if (data.val() === null) {
            ref.set({
                xp: 0,
                level: 1
            });
            await message.channel.send("Nível atual: 1");
        } else {
            data.then(async function(DBlevel, DBxp) {
                const level = DBlevel.val().level;
                const xp = DBxp().xp;
                await message.channel.send(`Level atual: ${level}, xp: ${xp}`);
            });
        }
    }
}