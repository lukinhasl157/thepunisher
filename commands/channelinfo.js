const moment = require("moment");
moment.locale('pt-BR');
const Discord = require("discord.js");

module.exports = {
  run: (bot, message, args) => {

  let channel = message.mentions.channels.first();
  if (!channel) 
  return message.channel.send(new Discord.RichEmbed().setDescription("Por favor, mencione o canal que deseja ver as informações.").setFooter(`Comando solicitado por ${message.author.tag}`, message.author.displayAvatarURL).setColor("#ff0000").setTimestamp());

  const embed = new Discord.RichEmbed()
  .setAuthor(`Informações do canal ${channel.name}`)
  .setColor("RANDOM")
  .setThumbnail("https://cdn.discordapp.com/attachments/497902484497498113/501913072404004864/hashtag.png")
  .addField("Nome:", `${channel.name}`)
  .addField("ID do canal:", `${channel.id}`)
  .addField("Canal criado em:", `${moment(channel.createdAt).format("LLLL")}`)
  .addField('Permissões:', `\`\`\`css\n${Object.entries(channel.serialize()).filter(([,has]) => has).map(([perm]) => perm).join(", ")}\`\`\``, false)
  .addField('Topico:', `\`\`\`css\n${channel.position}\`\`\``, false)
  message.channel.send(embed);

  },
    aliases: ["chinfo"],
    category: "Moderação",
    description: "Informações do canal"
}
