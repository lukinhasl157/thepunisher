const { Schema, model } = require('mongoose');

const Staff = new Schema({
  projectName: {
    type: String,
    default: 'The Punisher',
  },
  roles: {
    type: Map,
    default: {
      developers: ['289209067963154433', '385132696135008259', '281561868844269569'],
      bughunters: ['289209067963154433'],
      donators: {
        gold: [],
        platinum: [],
        diamond: [],
      },
    },
  },
});

module.exports = model('Staff', Staff);
