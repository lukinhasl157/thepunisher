'use strict';
module.exports = {
  run: ({ message, args }) => {
    if (args.length === 0) {
      return message.channel.send('Digite uma mensagem.');
    } else {
      message.delete();
      message.channel.send(args.join(' '));
    }
  },
  name: 'say',
  aliases: ['falar', 'dizer'],
  category: 'Entretenimento',
  description: 'Dizer uma mensagem pelo bot',
};

