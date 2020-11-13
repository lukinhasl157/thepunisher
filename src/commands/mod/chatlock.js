module.exports = {
  run: ({ message }) => {
    const everyone = message.guild.roles.find((r) => r.name === '@everyone');
    message.channel.overwritePermissions(everyone, {
      SEND_MESSAGES: false,
    });

    return message.reply(`O canal ${message.channel} foi **DESATIVADO.** :lock: por **${message.author.username}**. Para reativar o chat utilize t.unlock`);
  },
  botPermissions: ['MANAGE_CHANNELS'],
  userPermissions: ['MANAGE_CHANNELS'],
  name: 'chatlock',
  aliases: ['chlock', 'lock'],
  category: 'Moderação',
  description: 'Desativar o chat.',
};
