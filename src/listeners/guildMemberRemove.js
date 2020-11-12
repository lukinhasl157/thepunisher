const Guilds = require('../database/guild');

module.exports = {
  run: async (member) => {
    const guild = await Guilds.findOne({ _id: member.id });

    if (guild.members.has(member.id)) {
      guild.members.remove(member.id);
      return guild.save();
    }
  },
};
