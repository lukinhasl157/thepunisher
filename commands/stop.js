module.exports = {
    run: async function (bot, message, args) {
        if (!message.member.voiceChannel) {
            return message.channel.send("Desculpe, você precisa estar em um canal de voz.")
        } else if (message.guild.me.voiceChannel !== message.member.voiceChannel) {
            return message.channel.send("Desculpe, você precisa estar no mesmo canal de voz que eu.")
        } else {
            message.guild.me.voiceChannel.leave();
        }
    },
    aliases: ["parar", "sair"],
    category: "Música",
    description: "Mostrar as informações da música que está tocando"
}