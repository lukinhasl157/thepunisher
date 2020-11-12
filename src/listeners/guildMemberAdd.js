const { EMOJIS: { blue } } = require('../utils/constants');
const Guilds = require('../database/guild');

module.exports = {
  run: async (member) => {
    const db = await Guilds.findOne({ _id: member.guild.id });
    if (!db) return;
    const events = db.events.get('guildMemberAdd');
    const { guild } = member;

    if (db && events.antiBot.status && member.user.bot && guild.me.permissions.has('KICK_MEMBERS')) {
      member.kick('O modo antiBots está ativado.').catch(() => null);
    }

    if (db && events.autoRole.status && !member.user.bot && guild.me.permissions.has('MANAGE_ROLES')) {
      member.roles.add(events.autoRole.roles).catch(() => null);
    }

    if (db && events.count.status && guild.me.permissions.has('MANAGE_CHANNELS')) {
      const channel = guild.channels.get(events.count.channel);
      let msg = events.count.message;
      if (channel && msg) {
        const members = guild.memberCount.toString().split('');
        const regex = /(\{blue|green\})+/;
        const type = msg.match(regex);

        if (type && type.length) {
          switch (type[0].replace(/(\{)?(\})?/g, '')) {
            case 'blue': {
              msg = msg.replace(/{blue}/g, members.map((i) => blue[i]).join(''));
              break;
            }
          }
        }
        channel.setTopic(msg);
      }
    }

    if (db && events.welcome.status && !member.user.bot) {
      const channel = guild.channels.get(events.welcome.channel);
      let msg = events.welcome.message;
      if (channel && msg) {
        msg = msg.replace(/{member}/g, member).replace(/{server}/g, guild.name);
        channel.send(msg);
      }
    }
  },
};
