const reverseStr = (str) => str.split('').reverse().join('');

module.exports = {
  run: ({ message, args }) => {
    if (args.lenght === 0) {
      return message.replyError('Insira uma frase.');
    }
    return message.channel.send(reverseStr(args.join(' ')));
  },
  name: 'reverse',
  aliases: ['reverter', 'inverter'],
  category: 'Entretenimento',
  description: 'Reverter os argumentos.',
};
