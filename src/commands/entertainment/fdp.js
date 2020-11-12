const path = require('path');
const { Attachment } = require('discord.js');

module.exports = {
  run: ({ message, args }) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      return message.replyError('Por favor, insira o id, nome ou mencione o usuário que deseja xingar.');
    }
    const file = new Attachment(path.resolve(__dirname, '..', '..', 'assets', 'filhodaputa.gif'), 'filhodaputa.gif');
    return message.channel.send(`${member}, o usuário **${message.author.username}** xingou você de:`, file);
  },
  name: 'fdp',
  aliases: ['filho da puta', 'filhodaputa'],
  category: 'Entretenimento',
  description: 'Xingar um usuário de filho da puta.',
};
