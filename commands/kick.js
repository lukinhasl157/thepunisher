  const Discord = require("discord.js");

  module.exports = {
    run: async function (bot, message, args) {

      try {

    if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando! Permissão requirida: **KICK_MEMBERS**.`);
      
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
        return message.channel.send(new Discord.RichEmbed().setDescription(`${message.author} Por favor, mencione o membro que deseja kickar.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

    if (!member.kickable) 
        return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem as permissões necessárias para expulsar este usuário`).setColor("#ff0000"));
  
      let reason = args.join(' ');
    if (!reason)
      return message.channel.send(`**${message.author.username}** | Por favor, diga um motivo para expulsar este usuário.`);
        
      await member.kick(reason)
        message.channel.send(new Discord.RichEmbed().setDescription(`O usuário ${member.user.tag} foi kickado  por ${message.author}`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setThumbnail(member.user.avatarURL).addField(`Id do usuário:` , `» ${member.user.id}`).addField(`Motivo:` , `» ${reason}`).setTimestamp().setColor("#ff0000"));
    
      } catch(e) {
        message.channel.send(`**${message.author.usarname}** | Deu merda aqui: ${e}`)
      }

      },
        aliases: ["expulsar", "chutar"],
        category: "Moderação",
        description: "Expulsar um usuário."
      }
    
    