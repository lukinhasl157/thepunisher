module.exports = {
  run: ({ bot, message, args }) => {
    const { devIDS, ownerID } = process.env;
    const dev = message.mentions.users.first();
    const devIDSArray = devIDS.split(',');

    if (!message.author.equals(bot.users.cache.get(ownerID.toString()))) {
      return message.replyError('Este comando só pode ser executando pelo dono do bot.');
    }

    if (args[0] === 'remove') {
      if (!dev) {
        return message.channel.send('Mencione o usuário que deseja setar como desenvolvedor.');
      }

      if (!bot.users.cache.find((i) => i.id === dev.id)) {
        return message.replyError('Não econtrei este usuário em meus servidores.');
      }

      if (!devIDSArray.includes(dev.id)) {
        return message.replyError('Este usuário não está na minha lista de desenvolvedores.');
      }

      return message.replyError(`O desenvolvedor \`${dev.tag}\` foi removido da lista com sucesso!`);
    }

    if (args[0] === 'list') {
      return message.reply(devIDSArray.map((i) => `\`${bot.users.cache.get(i).tag}\``).join(', '));
    }

    if (!dev) {
      return message.replyError('Mencione o usuário que deseja setar como desenvolvedor.');
    }

    if (devIDSArray.includes(dev.id)) {
      return message.replyError('Este usuário já está setado como desenvolvedor.');
    }

    process.env.devIDs += `, ${dev.id}`;
    return message.reply(`O usuário \`${dev.tag}\` foi setado como desenvolvedor.`);
  },
  name: 'dev',
  onlyDevs: true,
  aliases: [],
  category: 'Desenvolvedores',
  description: 'Adicionar um desenvolvedor',
};
