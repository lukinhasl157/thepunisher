'use strict';
module.exports = {
  run: ({ message, args }) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      return message.channel.send(`» **${message.author.username}** | Por favor, insira o id, nome ou mencione o usuário que deseja xingar.`);
    } else {
      message.channel.send(`${member}, o usuário **${message.author.username}** xingou você de:`, {
        files: ['C:/Users/User/Documents/GitHub/thepunisher/filhodaputa.gif'],
      });
    }
  },
  name: 'fdp',
  aliases: ['filho da puta', 'filhodaputa'],
  category: 'Entretenimento',
  description: 'Xingar um usuário de filho da puta.',
};

