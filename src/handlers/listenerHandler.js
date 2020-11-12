/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const { resolve } = require('path');
const { readdirSync } = require('fs');

function loadListeners(path = resolve(__dirname, '..', 'listeners'), handler = () => null) {
  return readdirSync(path)
    .filter((i) => i.endsWith('.js'))
    .forEach((filename) => {
      const listener = require(resolve(path, filename));
      const listenerName = filename.replace('.js', '');
      handler(listener, listenerName);
    });
}

module.exports = { loadListeners };
