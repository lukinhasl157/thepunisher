const { mongooseConnection } = require('../database/mongoose');

module.exports = {
  // eslint-disable-next-line func-names
  run() {
    this.user.setActivity(`${this.users.cache.size.toLocaleString()} usuários.`, { url: 'https://twitch.tv/alanzoka', type: 'STREAMING' });
    mongooseConnection();
    console.log('Bot iniciado com sucesso!\nStatus carregado com sucesso!');
  },
};
