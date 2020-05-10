'use strict';
require('dotenv').config();
const { Client, Message, Collection } = require('discord.js');
const { loadListeners } = require('./src/handlers/listenerHandler');
const { loadCommands } = require('./src/handlers/commandHandler');
const bot = new Client({ fetchAllMembers: true, disabledEvents: ['TYPING_START'] });

bot.commands = new Collection();
bot.map = new Map();

bot.login().catch((e) => {
  console.error(e);
  process.exit(1);
});

bot
  .on('shardReconnecting', () => console.log('Client is reconnecting...'))
  .on('warn', (warn) => console.log(warn))
  .on('shardDisconnected', () => {
    console.log('Client is disconnecting...');
    process.exit(1);
  })
  .on('invalidated', () => {
    console.log('The client\'s session is now invalidated.');
    process.exit(1);
  });

process
  .on('uncaughtException', (error) => {
    const msg = error.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception:', msg);
    process.exit(1);
  })
  .on('unhandledRejection', (error) => console.error('Uncaught Promise Error:', error));

// eslint-disable-next-line func-names
Message.prototype.reply = function(content) {
  if (this.author) return this.channel.send(`» **${this.author.tag}** | ${content}`);
  return this.channel.send(content);
};

loadCommands('./src/commands', bot);
loadListeners('./src/listeners', bot);
