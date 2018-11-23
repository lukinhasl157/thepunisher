require('dotenv').config();
const ThePunisther = require('./ThePunisther.js');
const config = require('./config.json');
const categories = require('./categories.json');
const punisther = new ThePunisther(config, categories);

punisther.login(process.env.token);