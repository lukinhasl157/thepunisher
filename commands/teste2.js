const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {

  let replies = ["Sim.", "Não.", "Eu não sei.", "talvez."]
  
  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(1).join(" ");
  
  let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor('#5F04B4')
  .addField('Questão', question)
  .addField("Resposta", replies[result])
  message.channel.send(ballembed).then(msg => msg.delete(10000));
  
  }

  module.exports.help = {
      name: "teste2"
  }