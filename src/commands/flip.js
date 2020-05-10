'use strict';
const flip = require('flip-text');
module.exports = {
  run: ({ message, args }) => {
    if (args.length === 0) {
      return message.channel.send(flip('Ta troll? Coloca uma msg.'));
    } else {
      message.channel.send(flip(args.join(' ')));
    }
  },
  name: 'flip',
  aliases: ['girar'],
  category: 'Entretenimento',
  description: 'Girar os argumentos de ponta cabeça.',
};
