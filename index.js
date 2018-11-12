// MODULES
const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("./config.json");

// BOT 
const bot = new Discord.Client();
Object.defineProperty(bot, 'commands', { value: new Discord.Collection() });
Object.defineProperty(bot, 'botconfig', { value: botconfig });



// GET COMMANDS
fs.readdir("./commands", (err, files) => {
  try{
    if(err) console.log(err);
    // filtrando arquivos com final js
    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if (jsfile.length === 0) {
      return console.log("Não existe nenhum arquivo js na pasta commands");
    }

    jsfile.forEach((f, i) =>{
      let comando = require(`./commands/${f}`);
      if (!comando.category) comando.category = "general";
      console.log(`${f} carregado com sucesso!`);
      bot.commands.set(f.replace(/.js/g, ''), comando);
    });

    comando.usersCooldown = new Set();
    if (!comando.category) comando.category = "general";
    if (!comando.cooldown) comando.cooldown = 3000 // 3s

  } catch(Err) {
    console.error(Err);
  }
});

// GET EVENTOS
fs.readdir("./eventos", (err, files) => {
  try {
    if(err) console.log(err);
  // filtrando arquivos com final js
    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if (jsfile.length === 0) {
      return console.log("Não existe nenhum arquivo js na pasta eventos");
    }

    jsfile.forEach((f, i) =>{
      let evento = require(`./eventos/${f}`);
      console.log(`${f} carregado com sucesso!`);
      bot.on(f.replace(/.js/g, ''), evento.run);
    });
  } catch(Err) {
    console.error(Err);
  }
});

let token;
try {
const CANARY = require('./token.json');
token = CANARY.TOKEN;
} catch (Err) {
token = process.env.token;
} finally {
  bot.login(token);
}