'use strict';
module.exports = {
  name: 'toplevel',
  aliases: [],
  category: 'Utilidades',
  description: 'top levels',
  run: ({ message, server }) => {
    message.channel.send(Array.from(server.members).slice(0, 15).sort((a, b) => b[1].level - a[1].level).map(([memberID, member], i) => {
      const username = message.guild.members.cache.get(memberID).user.tag;
      return `${i + 1}º - ${username}, level: ${member.level} xp: ${member.xp}`;
    }));
  },
};
