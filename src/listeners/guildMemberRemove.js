const Guilds = require('../database/guild');

module.exports = async (member) => {
  const guild = await Guilds.findOne({ _id: member.id });

  if (guild.members.has(member.id)) {
    guild.members.remove(member.id);
    guild.save();
  }
};
