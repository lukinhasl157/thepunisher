module.exports = {
    run: (bot, message, args, database) => {
        if (message.guild.id !== "445077312589791253") {
            return;
        } else {
            global.xp = "";
            global.nextLevel = "";
            const points = Math.floor(Math.random() * 7) + 8;
    
            database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
                .once("value").then(function(snap) {
                    if (snap.val == null) {
                        database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
                            .set({
                                xp: 0,
                                level: 1
                            });
                    } else {
                        xp = snap.val().xp + points;
                        nextLevel = snap.val().level * 500;
                        database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
                            .update({
                                xp: xp
                            });
                        if (nextLevel <= xp) {
                            nextLevel = snap.val().level + 1;
                            database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
                                .update({
                                    level: nextLevel
                                });
                            
                            await message.channel.send(`Parabéns **${message.author.tag}** você subiu de nível!`);
                        }
                    }
                });
        }
    }
}