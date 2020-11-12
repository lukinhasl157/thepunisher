module.exports = {
  run: ({ message, args, server }) => {
    const { status } = server.events.get('message').inviteBlock;

    if (args.length === 0) {
      return message.channel.send(`O invite block está ${status ? 'ativado' : 'desativado'}`);
    }
    if (args[0] === 'on') {
      if (status) {
        return message.channel.send('O invite block já está ativado.');
      }
      server.events.get('message').inviteBlock.status = true;
      message.channel.send('O invite block foi ativado com sucesso!');
      return server.save();
    }
    if (args[0] === 'off') {
      if (!status) {
        return message.channel.send('O invite block já está desativado.');
      }
      server.events.get('message').inviteBlock.status = false;
      message.channel.send('O invite block foi desativado com sucesso!');
      return server.save();
    }

    return message.channel.send('opcão invalida.');
  },
  name: 'inviteblock',
  description: 'Bloquea convites de outros servidores.',
  category: 'Moderação',
  aliases: [],
};
