module.exports = {
  run: ({ message }) => {
    const uptime = process.uptime();
    const days = Math.floor((uptime % 31536000) / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.round(uptime % 60);
    message.channel.send(`Estou online há ${days > 0 ? `${days} dia(s), ` : ''}${hours > 0 ? `${hours} hora(s), ` : ''}${minutes > 0 ? `${minutes} minuto(s), ` : ''}${seconds > 0 ? `${seconds} segundo(s)` : ''}`);
  },
  name: 'uptime',
  aliases: [],
};
