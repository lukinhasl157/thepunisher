module.exports = {
    run: async function (bot, message, args) {
        if (!message.member.voiceChannel) {
            return message.channel.send("Desculpe, você precisa estar em um canal de voz.")
        } else if (message.guild.me.voiceChannel) {
            return message.channel.send("Desculpe, eu já estou em um canal de voz.")
        } else {
            message.member.voiceChannel.join();
            message.channel.send(`Entrando no canal de voz \`\`${message.member.voiceChannel.name}\`\`...`);
        }
    },
    aliases: ["entrar"],
    category: "Música",
    description: "Fazer o bot entrar no canal de voz"
}