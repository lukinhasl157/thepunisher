'use strict';
module.exports = {
  run: async ({ bot, message, args, Guilds }) => {
    const serverMap = bot.map.get(message.guild.id),
      server = await Guilds.findOne({ _id: message.guild.id });

    if (args[0] === 'join') {
      if (!serverMap) {
        return message.channel.send(`Não há nenhum evento loteria ocorrendo no momento, para iniciar o evento digite \`${server.prefix}loteria\``);
      } else if (serverMap.lotery.participants.includes(message.author.id)) {
        return message.channel.send('Você já está participando do evento loteria.');
      } else if (serverMap.lotery.ingame) {
        return message.channel.send('Desculpe, o evento loteria já começou');
      } else {
        serverMap.lotery.participants.push(message.author.id);
        return message.channel.send(`» **${message.author.username}** | Entrou no evento loteria \`${serverMap.lotery.participants.length}/2\``);
      }
    } else if (serverMap) {
      return message.channel.send('O evento loteria já começou');
    } else {
      const eventConstruct = { lotery: { participants: [], ingame: null } },
        maxNumber = 10;
      bot.map.set(message.guild.id, eventConstruct);

      message.channel.send(`O evento loteria irá começar em \`30s\`, para participar do evento digite \`${server.prefix}loteria join\``);
      setTimeout(async () => {
        if (eventConstruct.lotery.participants.length < 2) {
          bot.map.delete(message.guild.id);
          return message.channel.send(`O evento loteria foi cancelado, número de participantes foi insuciente \`${eventConstruct.lotery.participants.length}/2\``);
        } else {
          message.channel.send(`Evento loteria iniciado com \`${eventConstruct.lotery.participants.length}\` participantes, um número aleátorio foi gerado entre \`0 e ${maxNumber}.\``);
          const numberGenerator = Math.floor(Math.random() * maxNumber);
          eventConstruct.lotery.ingame = true;
          const filter = (msg) => Number(msg.content) === numberGenerator && eventConstruct.lotery.participants.includes(msg.author.id);
          await message.channel.awaitMessages(filter, { time: 5 * 60 * 1000, max: 1, errors: ['time'] }).then((collected) => {
            message.channel.send(`O usuário ${collected.first().author} venceu o evento loteria. O numero correto era \`${numberGenerator}\``);
            return bot.map.delete(message.guild.id);
          }).catch(() => {
            bot.map.delete(message.guild.id);
            return message.channel.send(`O evento loteria acabou, nenhum usuário venceu. O número correto era **${numberGenerator}**.`);
          });
        }
      }, 30 * 1000);
    }
  },
  name: 'loteria',
  aliases: ['lotery'],
  category: 'Entretenimento',
  description: 'Inicia o evento loteria gerando um número aleátorio.',
};
