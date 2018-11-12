const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
 
    if (!message.member.hasPermission("BAN_MEMBERS")) 
      return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, mencione o membro que deseja banir.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    if(!member.bannable)
      return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem as permissões necessárias para banir este usuário!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    let reason = args.join(' ');
    if (!reason) return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, diga um motivo para banir este usuário.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    if(!reason) reason = "Nenhum motivo foi citado.";
     member.send("Voce foi banido");
    await member.ban(reason)
      .catch(error => message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel:500147323423424527> Desculpe ${message.author} não consegui banir este membro devido o : ${error}`).setColor("#ff0000")));
    message.channel.send(new Discord.RichEmbed().setDescription(`O usuário ${member.user.tag} foi banido por ${message.author}`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setImage("https://media.giphy.com/media/1Xe14KOTgtL86EGBXU/giphy.gif").setThumbnail(member.user.avatarURL).addField(`Id do usuário:` , `» ${member.user.id}`).addField(`Motivo:` , `» ${reason}`).setTimestamp().setColor("#ff0000"));
  }

  module.exports.help = {
    name: "ban"
  }
