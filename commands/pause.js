const queue = require("../utils/queue.js");
const fetchVideoInfo = require("youtube-info");
module.exports = {
  run: async function(bot, message, args) {

    const serverQueue = queue.get(message.guild.id);
    if (!serverQueue) {
      return message.channel.send("Desculpe, não há nenhuma música tocando.")
    } else if (!message.member.voiceChannel || message.member.voiceChannel !== message.guild.me.voiceChannel) {
      return message.channel.send("Você precisa estar no mesmo canal de voz que eu para poder pausar a música");
    } else if (serverQueue.dispatcher.paused) {
      return message.channel.send("Desculpe, a música já esta pausada.");
    } else {
      if (serverQueue.queue[0].author.id == message.author.id) {
        fetchVideoInfo(serverQueue.queue[0].id).then(async function(videoInfo) {
          message.channel.send(new Discord.RichEmbed()
            .setDescription(`A música \`\`${serverQueue.queue[0].name}\`\` foi pausada com sucesso! Para retomar a musica digite digite ${process.env.prefix}resume`)
            .setColor("#e83127")
            .setThumbnail(videoInfo.thumbnailUrl)
          );
        });
      } else {
        return message.channel.send("Desculpe, a música só pode ser pausada pela pessoa que a requisitou.");
      }
    }
  }
}