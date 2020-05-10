'use strict';
const Guilds = require('../database/guild');
module.exports = {
  run: async (member) => {
    await Guilds.deleteOne({ _id: member.guild.id }).catch(console.error);
  },
};
