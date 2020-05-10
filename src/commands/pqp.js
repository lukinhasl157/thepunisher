'use strict';
module.exports = {
  run: async ({ message }) => {
    const msg = await message.author.send('Deseja criar um ticket? Digite \`sim\` para criar e \`não\` para cancelar.');
    const filter = (m) => m.author.id === message.author.id;
    const collector = await msg.channel.createMessageCollector(filter, { max: 1 });
    /*tirar reação do autor msg.reactions.first().users.remove(message.author.id) */ 

    collector.on('collect', async (msg) => {
      switch (msg.content.toLowerCase().split(' ')[0]) {
        case 'não': {
          message.author.send('Ticket cancelado.');
          break;
        }
        case 'sim': {
          const msg2 = await message.author.send('Você tem \`60s\` para enviar o ticket.'),
            filter2 = (m) => m.author.id === message.author.id,
            collector2 = await msg2.channel.createMessageCollector(filter2, { max: 1, time: 60 * 1000 });

          collector2.on('collect', async (msg2) => {
            message.author.send('Ticket enviado com sucesso!');
            message.channel.send(`coletado1: \n${msg2.content}`);

            const msg3 = await message.author.send('Qual seu nome?');
            const filter3 = (m) => m.author.id === message.author.id;
            const collector3 = await msg3.channel.createMessageCollector(filter3, { max: 1, time: 60 * 1000 });

            collector3.on('collect', (msg3) => {
              message.author.send('Obrigado por completar o ticket');
              message.channel.send(`coletado2: \n${msg3.content}`);
            });
          });
          break;
        }
      }
    });
  },
  name: 'pqp',
  aliases: [],
};
