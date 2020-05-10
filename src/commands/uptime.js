'use strict';
module.exports = {
  run: ({ message }) => {
    const uptime = process.uptime(),
      days = Math.floor((uptime % 31536000) / 86400),
      hours = Math.floor((uptime % 86400) / 3600),
      minutes = Math.floor((uptime % 3600) / 60),
      seconds = Math.round(uptime % 60);
    message.channel.send('Estou online há ' + (days > 0 ? days + ' dia(s), ':'') + (hours > 0 ? hours + ' hora(s), ':'') + (minutes > 0 ? minutes + ' minuto(s), ':'') + (seconds > 0 ? seconds + ' segundo(s)':''))
  },
  name: 'uptime',
  aliases: [],
};
