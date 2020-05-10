'use strict';
const { Schema, model } = require('mongoose');
const Guild = new Schema({
  _id: {
    type: String,
  },
  prefix: {
    type: String,
    default: process.env.PREFIX,
  },
  members: {
    type: Map,
    default: {
      '289209067963154433': {
        _id: '289209067963154433',
        level: 0,
        xp: 10,
        coins: 0,
      },
    },
  },
  events: {
    type: Map,
    default: {
      guildMemberAdd: {
        welcome: {
          status: false, message: 'None', channel: 'None',
        },
        antiBot: {
          status: false,
        },
        count: {
          status: false, message: 'None',
        },
        autoRole: {
          roles: [], status: false,
        },
      },
      message: {
        filterWords: {
          status: false,
          words: [],
        },
        inviteBlock: {
          status: false,
        },
        commands: {
          channels: [],
        },
      },
      guildMemberRemove: {
        status: false, message: 'None', channel: 'None',
      },
    },
  },
});
module.exports = model('Guilds', Guild);
