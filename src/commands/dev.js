'use strict';

module.exports = {
  run: ({ bot, message, args }) => {
    const { devIDS, ownerID } = process.env,
      dev = message.mentions.users.first(),
      devIDSArray = devIDS.split(',');

    if (args[0] === 'remove') {
      if (!dev) {
        return message.channel.send('Mencione o usuário que deseja setar como desenvolvedor.');
      } else if (!message.author.equals(bot.users.get(ownerID.toString()))) {
        return message.channel.send('Este comando só pode ser executando pelo dono do bot.');
      } else if (!bot.users.find((i) => i.id === dev.id)) {
        return message.channel.send('Não econtrei este usuário em meus servidores.');
      } else if (!devIDSArray.includes(dev.id)) {
        return message.channel.send('Este usuário não está na minha lista de desenvolvedores.');
      } else {
        return message.channel.send(`O desenvolvedor \`${dev.tag}\` foi removido da lista com sucesso!`);
      }
    } else if (args[0] === 'list') {
      return message.channel.send(devIDSArray.map((i) => `\`${bot.users.get(i).tag}\``).join(', '));
    } else if (!dev) {
      return message.channel.send('Mencione o usuário que deseja setar como desenvolvedor.');
    } else if (!message.author.equals(bot.users.get(ownerID.toString()))) {
      return message.channel.send('Este comando só pode ser executando pelo dono do bot.');
    } else if (devIDSArray.includes(dev.id)) {
      return message.channel.send('Este usuário já está setado como desenvolvedor.');
    } else {
      process.env.devIDs += `, ${dev.id}`;
      return message.channel.send(`O usuário \`${dev.tag}\` foi setado como desenvolvedor.`);
    }
  },
  name: 'dev',
  aliases: [],
  category: 'Desenvolvedores',
  description: 'Adicionar um desenvolvedor',
};
