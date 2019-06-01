const musics = require("../utils/queue.js");
module.exports = {
    run: async function(_, message, args) {
        if (musics.get(message.guild.id).songs.length == 0) {
            return message.channel.send("Não há nenhuma música tocando no momento.")
        } else {
            message.channel.send(musics.get(message.guild.id).songs[0]);
        }
    },
    aliases: ["np", "tocando"],
    category: "Música",
    description: "Mostrar as informações da música que está tocando"
}