'use strict';
const { resolve } = require('path');
const { readdirSync } = require('fs');

const loadListeners = (path, bot) => {
  const jsFiles = readdirSync(path, { withFileTypes: true })
    .filter((i) => i.name.endsWith('.js'));

  for (const file of jsFiles) {
    const fullpath = resolve(path, file.name);
    const listenerName = file.name.replace('.js', '');
    const listener = require(fullpath);

    bot.on(listenerName, listener.run);
  }
  console.log(`Eventos carregados: ${jsFiles.length}`);
};

module.exports = { loadListeners };
