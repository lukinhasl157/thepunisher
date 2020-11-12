require('dotenv/config');
const { Client, Message, Collection } = require('discord.js');
const listenerHandler = require('./src/handlers/listenerHandler');
const commandHandler = require('./src/handlers/commandHandler');

async function start() {
  const bot = new Client({ fetchAllMembers: true, disabledEvents: ['TYPING_START'] });

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

Message.prototype.reply = function reply(content, ...args) {
  if (this.author) return this.channel.send(`» **${this.author.tag}** | ${content}`, ...args);
  return this.channel.send(content);
};

start();
