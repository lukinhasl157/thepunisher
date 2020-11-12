module.exports = {
  run: ({ message, server, args }) => {
    const type = args[0];
    const filterStatus = server.events.get('message').filterWords.status;
    const filterWords = server.events.get('message').filterWords.words;

    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, você precisa da permissão \`ADMINISTRATOR\` para executar este comando.`);
    }

    if (args.length === 0) {
      return message.channel.send(`O filtro está \`${filterStatus ? 'ativado' : 'desativado'}\``);
    }

    switch (type) {
      case 'on': {
        if (filterStatus) {
          return message.channel.send('O filtro já está `ativado`');
        }
        server.events.get('message').filterWords.status = true;
        server.save();
        return message.channel.send(`O filtro foi \`ativado\` com sucesso. Para setar as palavras proibidas digite \`${server.prefix}filtro add <palavra 1> <palavra2> etc...\``);
      }

      case 'off': {
        if (!filterStatus) {
          return message.channel.send('O filtro já está `desativado`');
        }
        server.events.get('message').filterWords.status = false;
        server.save();
        return message.channel.send('O filtro foi `desativado` com sucesso.');
      }

      case 'add': {
        if (filterStatus) {
          return message.channel.send('Você precisa desativar o filtro antes de setar as palavras a serem proibidas.');
        }

        const palavrasNaoAdicionadas = args.reduce((p, v, i) => {
          if (filterWords.includes(v)) {
            p.push(v);
            args.splice(i, 1);
          }
          return p;
        }, []);

        if (palavrasNaoAdicionadas.length) {
          message.channel.send(`As seguintes palavras não foram adicionas pois já estão incluídas no filtro: ${palavrasNaoAdicionadas.map((w) => `\`${w}\``).join(', ')}`);
        }

        if (/[0-9]/g.test(args.slice(1).join(' '))) {
          return message.channel.send('Desculpe, o filtro de palavras não pode conter números.');
        }

        if (!args.length) {
          return message.channel.send('nenhuma palavra foi adicionada');
        }

        args.forEach((v) => filterWords.push(v));
        server.save();
        return message.channel.send(`A(s) palavra(s) ${args.map((w) => `\`${w}\``).join(', ')} foram adicionadas ao filtro com sucesso. Para ver todas as palavras digite \`${server.prefix}filtro list\``);
      }

      case 'reset': {
        server.events.get('message').filterWords.words = [];
        server.events.get('message').filterWords.status = false;
        server.save();
        return message.channel.send('O filtro foi resetado com sucesso!');
      }

      case 'list': {
        if (filterWords.length === 0) {
          return message.channel.send('O filtro está vazio.');
        }
        return message.channel.send(filterWords.join(', '));
      }

      case 'remove': {
        if (args.length > 2) {
          return message.channel.send('Você só pode remover um item por vez do filtro.');
        }

        if (filterStatus) {
          return message.channel.send('Você precisa desativar o filtro antes de remover alguma palavra.');
        }

        const index = filterWords.indexOf(type);
        if (index === -1) {
          return message.channel.send('Esta palavra não foi encontrada no filtro, verifique se você digitou a palavra corretamente.');
        }

        filterWords.splice(index, 1);
        server.save();

        return message.channel.send(`A(s) palavra(s) \`${args.slice(1).join(' ')}\` foi removida do filtro. Para ver todas as palavras digite \`${server.prefix}wordslist\``);
      }

      default:
        return message.channel.send('Opção invalida.');
    }
  },
  name: 'filtro',
  aliases: ['filter'],
};
