'use strict';

module.exports = {
  run: async ({ message, Users, bot }) => {
    const user = await Users.findOne({ _id: message.author.id });
    Users.find({}, (arr) => {
      const cu = arr.sort((a, b) => b.level - a.level),
        rank = cu.indexOf(user) + 1;
      message.channel.send(`${bot.users.get(user._id).tag} rank: ${rank} xp: ${user.xp}`);
    });
  },
  name: 'level',
  aliases: [],
};