const queue = require("../utils/queue.js");
module.exports = {
  run: async function(bot, message, args) {

    const serverQueue = queue.get(message.guild.id);
    const count = message.member.voiceChannel.members.size -1;
    if (!serverQueue) {
      return message.channel.send("Desculpe, não há nenhuma música tocando.")
    } else if (!message.member.voiceChannel || message.member.voiceChannel !== message.guild.me.voiceChannel) {
      return message.channel.send("Você precisa estar no mesmo canal de voz que eu para poder pular de música.");
    } else {
        if (count > 1) {
            message.channel.send("Uma votação para pular de música foi iniciada, vocês tem \`\`60s\`\` para realizar a votação, caso ninguém vote, a votação será finalizada automaticamente. Para pular de música digite: \`\`skip\`\`");
            const filter = msg => msg.content.toLowerCase().startsWith("skip");
            const collector = message.channel.createMessageCollector(filter, { max: count, time: 60 * 1000});

            collector.on("collect", async (msg) => {
                if (message.member.voiceChannel !== message.guild.me.voiceChannel) {
                    return message.channel.send("Desculpe, você precisa no mesmo canal de voz que eu para poder participar da votação.");
                } else {
                    message.channel.send(`**${message.author.username}** | Votou para pular de música.`)
                }
            }).on("end", async (collected) => {
                if (collected.size == count) {
                    serverQueue.dispatcher.end();
                    message.channel.send(`A música \`\`${serverQueue.queue[0].name}\`\` foi pulada através da votação. Votos: \`\`${count}/${count}\`\``);
                } else {
                    message.channel.send(`O número de votos foi insuficiente para pular de música, votos: \`\`${collected.size}/${count}\`\``);
                }
            });
        } else {
            serverQueue.dispatcher.end();
            message.channel.send(`A música \`\`${serverQueue.queue[0].name}\`\` foi pulada com sucesso!`);
        }
    }
  }
}