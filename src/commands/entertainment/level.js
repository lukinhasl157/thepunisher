/* eslint-disable no-underscore-dangle */
module.exports = {
  run: async ({ message, Users, bot }) => {
    const user = await Users.findOne({ _id: message.author.id });
    Users.find({}, (arr) => {
      const cu = arr.sort((a, b) => b.level - a.level);
      const rank = cu.indexOf(user) + 1;
      message.channel.send(`${bot.users.cache.get(user._id).tag} rank: ${rank} xp: ${user.xp}`);
    });
  },
  name: 'level',
  category: 'Entretenimento',
  description: 'Mostra seu Status',
  aliases: [],
};
