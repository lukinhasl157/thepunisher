const musics = require("../utils/queue.js");
module.exports = {
    run: async function(_, message, args) {

        if (!message.member.voiceChannel || message.member.voiceChannel !== message.guild.me.voiceChannel) {
            return message.channel.send("Você precisa estar no mesmo canal de voz que eu para poder ver música")
        } else if (musics.get(message.guild.id) == undefined || musics.get(message.guild.id).songs.length == 0) {
            return message.channel.send("Não há nenhuma música tocando no momento.")
        } else {
            return message.channel.send(musics.get(message.guild.id).songs[0]);
        }
    },
    aliases: ["np", "tocando"],
    category: "Música",
    description: "Mostrar as informações da música que está tocando"
}