const Guilds = require('../database/guild');

module.exports = async (guild) => {
  await Guilds.deleteOne({ _id: guild.id }).catch(console.error);
};
