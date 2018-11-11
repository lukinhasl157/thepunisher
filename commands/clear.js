
    const Discord = require("discord.js");

    module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send(new Discord.RichEmbed().setDescription(`${message.author} Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas`).setColor("#ff0000"));

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched);
  
      return message.channel.send(new Discord.RichEmbed().setDescription(`${message.author} O chat foi limpo com sucesso <a:sucessogif:499614074129350666>`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#07ed66")).then(msg => msg.delete(10000));
  }
  module.exports.help = {
    name: "clear"
  }