// MODULES
const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

// BOT 
const bot = new Discord.Client();

// Definando variaveis dentro do bot
Object.defineProperties(bot, {
  "commands": {
    value: new Discord.Collection()
  },
  "config": {
    value: config
  },
  "categories": {
    get: function() {
      return this.commands.reduce((o, comando, nome) => {
        if (!o.get(comando.category)) o.set(comando.category, new Discord.Collection());
        o.get(comando.category).set(nome, comando);
        return o;
    }, new Discord.Collection());
    }
  }
});

// Zuando o Lukas
if (!config.path_commands) throw new Error("CARALHO LUKAS QUAL PASTA TA OS COMANDOS?");
if (!config.path_events) throw new Error("CARALHO LUKAS QUAL PASTA TA OS EVENTOS?");

// GET COMMANDS
fs.readdir(config.path_commands, (err, arquivos) => {
  try{
    if(err) console.log(err);

    let arquivosJS = arquivos.filter(arquivo => arquivo.split(".").pop() === "js");

    if (arquivosJS.length === 0) {
      return console.log("Não existe nenhum arquivo js na pasta commands");
    }

    arquivosJS.forEach((arquivo) =>{
      let comando = require(`${config.path_commands}/${arquivo}`);
      comando.usersCooldown = new Set();
      if (!comando.category) comando.category = "general";
      if (!comando.cooldown) comando.cooldown = 3000 // 3s

      bot.commands.set(arquivo.replace(/.js/g, ''), comando);
    });
    console.log('-'.repeat(80))
    console.log(bot.categories.map((c, i) => `Categoria ${i} com ${c.size} comandos`).join('\n'));
    console.log('-'.repeat(80));
  } catch(Err) {
    console.error(Err);
  }
});

// GET EVENTOS
fs.readdir(config.path_events, (err, arquivos) => {
  try {
    if(err) console.log(err);
  // filtrando arquivos com final js
    let arquivosJS = arquivos.filter(f => f.split(".").pop() === "js");

    if (arquivosJS.length === 0) {
      return console.log("Não existe nenhum arquivo js na pasta eventos");
    }

    arquivosJS.forEach((arquivo) =>{
      let evento = require(`${config.path_events}/${arquivo}`);
      console.log(`${arquivo} carregado com sucesso!`);
      bot.on(arquivo.replace(/.js/g, ''), evento.run);
    });
    console.log('-'.repeat(80))

  } catch(Err) {
    console.error(Err);
  }
});


// Login
let token;
try {
  const CANARY = require('./token.json');
  token = CANARY.TOKEN;
} catch (Err) {
  token = process.env.token;
} finally {
  bot.login(token);
}