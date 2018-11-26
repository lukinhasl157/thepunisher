
  const Discord = require("discord.js");

  module.exports = {
    run: async function (bot, message, args) {
 
      if (!message.member.hasPermission("DEAFEN_MEMBERS")) 
      return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
      
      let bans = await message.guild.fetchBans();
      let user = args[0];
      let reason = args.slice(1).join(' ');
      
      if (!bans.has(user))
      return message.channel.send(new Discord.RichEmbed().setDescription("<:cancel1:500150315304091649> Este usuário não está banido!").setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
      
      if (!user)
      return message.channel.send(new Discord.RichEmbed().setDescription("<:cancel1:500150315304091649> Por favor, digite o id do usuário que deseja desbanir.").setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
      
      if(!reason)
        return message.channel.send(message.author.username + "| Por favor, diga um motivo para desbanir este usuário.")
      
      await message.guild.unban(user, reason);
      message.channel.send(new Discord.RichEmbed().setDescription(`O usuário <@${user}> foi desbanido com sucesso <a:sucessogif:499614074129350666>`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).addField(`Motivo:` , `» ${reason}`).setTimestamp().setColor("#07ed66"));
  
  }, 
    aliases: ["desbanir", "perdoar", "pardon"],
    categoy: "Moderação",
    description: "Desbanir um usuário."
  }
