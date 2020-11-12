const { Message } = require('discord.js');

Message.prototype.reply = function reply(content, ...args) {
  if (this.author) return this.channel.send(`» **${this.author.tag}**, ${content}`, ...args);
  return this.channel.send(content, ...args);
};

Message.prototype.replyError = function replyError(content, ...args) {
  if (this.author) return this.channel.send(`Erro: » **${this.author.tag}**, ${content}`, ...args);
  return this.channel.send(content, ...args);
};
