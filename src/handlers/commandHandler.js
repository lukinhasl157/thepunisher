'use strict';
const { resolve } = require('path');
const { readdirSync } = require('fs');

const loadCommands = (path, bot) => {
  const jsFiles = readdirSync(path, { withFileTypes: true })
    .filter((i) => i.name.endsWith('.js'));

  for (const file of jsFiles) {
    const fullpath = resolve(path, file.name);
    const commandName = file.name.replace('.js', '');
    const command = require(fullpath);

    if (!command.name || command.name.length === 0) {
      console.log(`O comando ${commandName} não possui um nome.`);
    } else if (!command.aliases) {
      console.log(`O comando ${commandName} não possui aliases.`);
    }
    bot.commands.set(commandName, command);
  }
  console.log(`Comandos carregados: ${jsFiles.length}`);
};

module.exports = { loadCommands };

