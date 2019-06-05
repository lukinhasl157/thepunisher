const musics = require("../utils/queue.js");
module.exports = {
    run: async function(_, message, args) {
        const serverQueue = musics.get(message.guild.id);

        if (!message.member.voiceChannel || message.member.voiceChannel !== message.guild.me.voiceChannel) {
            return message.channel.send("Você precisa estar no mesmo canal de voz que eu para poder ver a fila de músicas.");
        } else if (!serverQueue) {
            return message.channel.send("Não há nenhuma música tocando no momento.");
        } else {
            return message.channel.send(serverQueue.queue.map((musics) => musics.name).join("\n"));
        }
    }
}