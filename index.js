require('dotenv').config()
const ThePunisher = require('./ThePunisher.js')
const config = require('./config.json')
const categories = require('./categories.json')
const punisther = new ThePunisher(config, categories)

punisther.login(process.env.TOKEN)