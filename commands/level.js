module.exports = {
    run: async function(database, message, ref) {

        const memberRef = await database().ref(`${message.guild.id}/${message.author.id}`);
        const data = await ref.once('value');

        if (data.val() === null) {
            ref.set({
                xp: 0,
                level: 1
            });
            await message.channel.send("Nível atual: 1");
        } else {
            message.channel.send(`Nível atual: ${memberRef().level + 1}`);
        }
    }
}