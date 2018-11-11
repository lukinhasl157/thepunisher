
  const Discord = require("discord.js");

  module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS"))
          return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
          return message.channel.send(new Discord.RichEmbed().setDescription(`${message.author} Por favor, mencione o membro que deseja kickar.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
        if (!member.kickable) 
          return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem as permissões necessárias para expulsar este usuário`).setColor("#ff0000"));
  
        let reason = args.join(' ');
        if (!reason) reason = "Nenhuma motivo foi citado.";
        
        await member.kick(reason)
          .catch(error => message.channel.send(new Discord.RichEmbed().setDescription(`Desculpe ${message.author} não consegui expulsar esse este usuário devido o erro: ${error}`).setColor("#ff0000")));
        message.channel.send(new Discord.RichEmbed().setDescription(`O usuário ${member.user.tag} foi kickado  por ${message.author}`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setThumbnail(member.user.avatarURL).addField(`Id do usuário:` , `» ${member.user.id}`).addField(`Motivo:` , `» ${reason}`).setTimestamp().setColor("#ff0000"));
    
      }
      module.exports.help = {
        name: "kick"
      }
    
    