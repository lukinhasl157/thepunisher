module.exports = {
  run: ({ message }) => {
    const everyone = message.guild.roles.find((r) => r.name === '@everyone');

    message.channel.overwritePermissions(everyone, {
      SEND_MESSAGES: true,
    });

    return message.channel.send(`» O canal ${message.channel} foi **ATIVADO.** :unlock: por **${message.author.username}**.`);
  },
  botPermissions: ['MANAGE_CHANNELS'],
  userPermissions: ['MANAGE_CHANNELS'],
  name: 'chatunlock',
  aliases: ['chunlock', 'unlock'],
  category: 'Moderação',
  description: 'Reativar o chat.',
};
