const musics = require("../utils/queue.js");
module.exports = {
  run: async function(bot, message, args) {

    const serverQueue = musics.get(message.guild.id);
    const count = message.member.voiceChannel.members.size -1;
    if (!serverQueue) {
      return message.channel.send("Desculpe, não há nenhuma música tocando.")
    } else if (!message.member.voiceChannel || message.member.voiceChannel !== message.guild.me.voiceChannel) {
      return message.channel.send("Você precisa estar no mesmo canal de voz que eu para poder pular de música.");
    } else if (serverQueue.queue[0].votes == true) {
        message.channel.send("Desculpe, uma votação para pular de música já foi iniciada, aguarde a votação atual terminar.")
    } else {   
        if (count > 1) {
            message.channel.send("Uma votação para pular de música foi iniciada, vocês tem \`\`60s\`\` para realizar a votação, caso ninguém vote, a votação será finalizada automaticamente. Para pular de música digite: \`\`pular\`\`");

            serverQueue.queue[0].votes = true;
            const filter = msg => msg.content.toLowerCase().startsWith("pular");
            msg.channel.awaitMessages(filter, { max: count, time: 60 * 1000}).then(function (collected) {
                message.channel.send(`**${message.author.username}** | Votou para pular.`);
            }).catch(function (collected) {
                if (collected.size == count) {
                    serverQueue.dispatcher.end();
                    message.channel.send(`A música \`\`${serverQueue.queue[0].name}\`\` foi pulada com sucesso!`);
                } else {
                    if (collected.size < count) {
                        message.channel.send(`O número de votos foi insuficiente para pular de música, votos: \`\`${collected.size}/${count}\`\``);
                        serverQueue.queue[0].votes = false
                    }
                }
            });
        } else {
            serverQueue.dispatcher.end();
            message.channel.send(`A música \`\`${serverQueue.queue[0].name}\`\` foi pulada com sucesso!`);
        }
    }
  }
}