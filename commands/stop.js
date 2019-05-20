module.exports = {
    run: async function (bot, message, args) {

        if (!message.member.voiceChannel) {
            return message.channel.send("Desculpe, você precisa estar em um canal de voz.");
        } else if (message.member.voiceChannel !== message.guild.me.voiceChannel) {
            return message.channel.send("Desculpe, você precisa estar no mesmo canal de voz que eu.");
        } else {
            message.member.voiceChannel.leave();
        }
    },
    aliases: ["parar", "sair"],
    category: "Música",
    description: "Mostrar as informações da música que está tocando"
}