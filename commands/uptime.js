module.exports = {
  run: (bot, message, args) => {
    function duration(ms) {
      const seg = Math.floor((ms / 1000) % 60).toString()
      const min = Math.floor((ms / (1000 * 60)) % 60).toString()
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
      const dias = Math.floor((ms / (1000 * 60 * 60 *24)) % 60).toString()
      return `${dias.padStart(1, `0`)} dias, ${hrs.padStart(2, `0`)} horas, ${min.padStart(2, `0`)} minutos e ${seg.padEnd(2, `0 `)} segundos.`
    }
    message.channel.send(`Estou online há ${duration(bot.uptime)}.`);
  }
}