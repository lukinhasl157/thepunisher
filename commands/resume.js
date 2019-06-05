const queue = require("../utils/queue.js");
module.exports = {
  run: async function(bot, message, args) {

    const serverQueue = queue.get(message.guild.id);
    if (!serverQueue) {
      return message.channel.send("Desculpe, não há nenhuma música tocando.")
    } else if (!message.member.voiceChannel || message.member.voiceChannel !== message.guild.me.voiceChannel) {
      return message.channel.send("Você precisa estar no mesmo canal de voz que eu para poder pausar a música");
    } else if (serverQueue.dispatcher.resumed) {
      return message.channel.send("Desculpe, a música já está tocando");
    } else {
      serverQueue.dispatcher.resume();
      message.channel.send(`A música \`\`${serverQueue.queue[0].name}\`\` foi retomada!`);
    }
  }
}