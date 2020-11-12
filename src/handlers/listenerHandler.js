/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const { resolve } = require('path');
const { readdirSync } = require('fs');

function loadListeners(handler = () => null, path = resolve(__dirname, '..', 'listeners')) {
  return readdirSync(path)
    .filter((i) => i.endsWith('.js'))
    .forEach((filename) => {
      const listener = require(resolve(path, filename));
      const listenerName = filename.replace('.js', '');
      handler(listenerName, listener.run);
    });
}

module.exports = { loadListeners };
