'use strict';
const { connection, connect } = require('mongoose');

const mongooseConnection = () => {
  connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  connection.on('error', () => console.error);
  connection.on('open', () => console.log('A conexão com a MongoDB foi realizada com sucesso!'));
};

module.exports = { mongooseConnection };
