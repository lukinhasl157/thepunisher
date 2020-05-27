'use strict';
module.exports = {
  run: ({ message, server, args }) => {
    const type = args[0],
      filterStatus = server.events.get('message').filterWords.status,
      filterWords = server.events.get('message').filterWords.words;

    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, você precisa da permissão \`ADMINISTRATOR\` para executar este comando.`);
    } else if (args.length === 0) {
      return message.channel.send(`O filtro está \`${filterStatus ? 'ativado' : 'desativado'}\``);
    } else {
      switch (type) {
        case 'on': {
          if (filterStatus) {
            return message.channel.send('O filtro já está \`ativado\`');
          } else {
            message.channel.send(`O filtro foi \`ativado\` com sucesso. Para setar as palavras proibidas digite \`${server.prefix}filtro add <palavra 1> <palavra2> etc...\``);
            server.events.get('message').filterWords.status = true;
            server.save();
          }
          break;
        }
        case 'off': {
          if (!filterStatus) {
            return message.channel.send('O filtro já está \`desativado\`');
          } else {
            message.channel.send('O filtro foi \`desativado\` com sucesso.');
            server.events.get('message').filterWords.status = false;
            server.save();
          }
          break;
        }
        case 'add': {
          if (filterStatus) {
            return message.channel.send('Você precisa desativar o filtro antes de setar as palavras a serem proibidas.');
          } else {
            const palavrasNaoAdicionadas = [];
            for (const i in args) {
              if (filterWords.includes(args[i])) {
                palavrasNaoAdicionadas.push(args[i]);
              }
            }

            if (palavrasNaoAdicionadas.length) {
              message.channel.send(`As seguintes palavras não foram adicionas pois já estão incluídas no filtro: ${palavrasNaoAdicionadas.map((w) => `\`${w}\``).join(', ')}`);
              for (const i in palavrasNaoAdicionadas) {
                const index = args.indexOf(palavrasNaoAdicionadas[i]);
                args.splice(index, 1);
              }
            }
            args = [...new Set(args)];
            if (/[0-9]/.test(args.slice(1).join(' '))) {
              return message.channel.send('Desculpe, o filtro de palavras não pode conter números.');
            } else if (args.length) {
              message.channel.send(`A(s) palavra(s) ${args.map((w) => `\`${w}\``).join(', ')} foram adicionadas ao filtro com sucesso. Para ver todas as palavras digite \`${server.prefix}filtro list\``);
              const words2 = args.join(' ').split(' ');
              for (const words3 of words2) {
                filterWords.push(words3);
              }
              return server.save();
            }
          }
          break;
        }
        case 'reset': {
          message.channel.send('O filtro foi resetado com sucesso!');
          server.events.get('message').filterWords.words = [];
          server.events.get('message').filterWords.status = false;
          server.save();
          break;
        }
        case 'list': {
          if (filterWords.length === 0) {
            return message.channel.send('O filtro está vazio.');
          } else {
            message.channel.send(filterWords.join(', '));
          }
          break;
        }
        case 'remove': {
          if (args.length > 2) {
            return message.channel.send('Você só pode remover um item por vez do filtro.');
          } else if (filterStatus) {
            return message.channel.send('Você precisa desativar o filtro antes de remover alguma palavra.');
          } else if (!filterWords.find((i) => i === type)) {
            return message.channel.send('Esta palavra não foi encontrada no filtro, verifique se você digitou a palavra corretamente.');
          } else {
            const index = filterWords.indexOf(type);
            filterWords.splice(index, 1);
            message.channel.send(`A(s) palavra(s) \`${args.slice(1).join(' ')}\` foi removida do filtro. Para ver todas as palavras digite \`${server.prefix}wordslist\``);
            server.save();
          }
          break;
        }
      }
    }
  },
  name: 'filtro',
  aliases: ['filter'],
};
