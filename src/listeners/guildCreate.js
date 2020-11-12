const Guilds = require('../database/guild');

module.exports = {
  run: (guild) => {
    console.log(`Adicionando o servidor ${guild.name} (${guild.id}) na database...`);
    const newGuild = new Guilds({
      _id: guild.id,
      prefix: process.env.PREFIX,
    });
    return newGuild.save();
  },
};
