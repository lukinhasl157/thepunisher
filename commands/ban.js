const Discord = require("discord.js");

module.exports = {
  run: async function (bot, message, args) {

    if (!message.member.hasPermission("BAN_MEMBERS")) 
      return message.channel.send(`**${message.author.username}** | Você não tem permissão para executar este comando! Permissão requirida: **BAN_MEMBERS**.`);

  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.channel.send(`**${message.author.username}** | Por favor, insira o ID ou mencione o usuário que deseja banir.`);

    if (!member.bannable)
      return message.channel.send(`**${message.author.username}** | Desculpe, eu não tem as permissões necessárias para banir este usuário!`);

  let reason = args.join(' ');
  
    if (!reason) 
      return message.channel.send(`**${message.author.username}** | Por favor, diga um motivo para banir este usuário.`);

     member.send(`» **${member.user.username}** | Você foi banido por **${message.author.username}**. » Motivo: ${reason}.`);
    await member.ban(reason)
      .catch(error => message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel:500147323423424527> Desculpe ${message.author} não consegui banir este membro devido o : ${error}`).setColor("#ff0000")));
    message.channel.send(new Discord.RichEmbed().setDescription(`O usuário ${member.user.tag} foi banido por ${message.author}`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setImage("https://media.giphy.com/media/1Xe14KOTgtL86EGBXU/giphy.gif").setThumbnail(member.user.avatarURL).addField(`Id do usuário:` , `» ${member.user.id}`).addField(`Motivo:` , `» ${reason}`).setTimestamp().setColor("#ff0000"));

    return this.name;

  },
    aliases: ["banir", "punir"],
    category: "Moderação",
    description: "Banir um usuário."
  }
