module.exports = {
  name: 'toplevel',
  aliases: [],
  category: 'Utilidades',
  description: 'top levels',
  run: async ({ message, bot, server }) => {
    message.channel.send(
      await Promise.all(Array.from(server.members)
        .slice(0, 15)
        .sort((a, b) => b[1].level - a[1].level)
        .map(async ([userId, data], i) => {
          const user = await bot.users.fetch(userId).catch(() => null);
          return `${i + 1}º - ${user ? user.tag : userId}, level: ${data.level} xp: ${data.xp}`;
        })),
    );
  },
};
