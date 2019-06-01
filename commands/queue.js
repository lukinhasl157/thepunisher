const musics = require("../utils/queue.js");
module.exports = {
    run: async function(_, message, args) {
        if (musics.get(message.guild.id).songs.length == 0) {
            return message.channel.send("Não há nenhuma música tocando no momento.");
        } else {
            if (musics.get(message.guild.id).songs.length > 0) {
                message.channel.send(musics.get(message.guild.id).songs);
            }
        }
    }
}