require('./utils/prototypes');

const { Client, Collection } = require('discord.js');
const listenerHandler = require('./handlers/listenerHandler');
const commandHandler = require('./handlers/commandHandler');
const { connectMongoose } = require('./database/mongoose');

async function start() {
  const bot = new Client({ disabledEvents: ['TYPING_START'] });

  bot.commands = new Collection(commandHandler.readCommands().map((cmd) => [cmd.name, cmd]));
  bot.aliases = commandHandler.loadAliases(bot.commands);

  listenerHandler.loadListeners((name, handler) => bot.on(name, handler));

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

  await connectMongoose();

  return bot.login(process.env.DISCORD_TOKEN).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

process
  .on('uncaughtException', (error) => {
    const msg = error.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception:', msg);
    process.exit(1);
  })
  .on('unhandledRejection', (error) => console.error('Uncaught Promise Error:', error));

start();
