const { mongooseConnection } = require('../database/mongoose');

module.exports = function run() {
  this.user.setActivity(`${this.users.size.toLocaleString()} usuários.`, { url: 'https://twitch.tv/alanzoka', type: 'STREAMING' });
  mongooseConnection();
  console.log('Bot iniciado com sucesso!\nStatus carregado com sucesso!');
};
