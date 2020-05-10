'use strict';
module.exports = {
  run: ({ message, args }) => {
    if (args.lenght === 0) {
      return message.channel.send('Insira uma frase.');
    } else {
      return message.channel.send(reverseStr(args.join(' ')));
    }
  },
  name: 'reverse',
  aliases: ['reverter', 'inverter'],
  category: 'Entretenimento',
  description: 'Reverter os argumentos.',
};

const reverseStr = (str) => str.split('').reverse().join('');
