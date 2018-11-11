
    const Discord = require("discord.js");
  
    module.exports.run = async (bot, message, args) => {

    const embed = new Discord.RichEmbed()
    .setColor('#ff9d00')
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("**🤖 Informações do Bot**")
    .setDescription(" ")
    .addField("FILHO DA PUTA", "TO TESTANDO")
    .setThumbnail('https://cdn.discordapp.com/attachments/493959993184223273/496184772679434240/the_punisher.png')
    .setTimestamp()
    .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
    message.channel.send(embed);

  }
  module.exports.help = {
    name: "comandos"
  }
