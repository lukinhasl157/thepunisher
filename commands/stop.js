module.exports = {
    run: async function (bot, message, args) {
        const queue = new Map();
        const serverQueue = queue.get(message.guild.id);

        if (!message.member.voiceChannel) {
            return message.channel.send("Desculpe, você precisa estar em um canal de voz.");
        } else if (message.member.voiceChannel !== message.guild.me.voiceChannel) {
            return message.channel.send("Desculpe, você precisa estar no mesmo canal de voz que eu.");
        } else if (!serverQueue) {
            return message.channel.send("Não há nenhuma música tococando no momento.");
        } else {
            message.guild.me.voiceChannel.leave();
        }
    },
    aliases: ["parar", "sair"],
    category: "Música",
    description: "Mostrar as informações da música que está tocando"
}