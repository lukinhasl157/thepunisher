const Discord = require("discord.js");

module.exports = {
  run: (bot, message, args) => {

    if (!message.member.hasPermission("MUTE_MEMBERS")) 
      return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
  
  let muteRole = message.guild.roles.find(r => r.name === "The Punisher | Muted");
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  let reason = args.join(" ");

    if (!member) 
      return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, mencione o usuário que deseja desmutar.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

    if (!reason) 
      return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, diga um motivo para desmutar este usuário.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    
    if (muteRole) 
      return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, este usuário não está mutado.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

     member.removeRole(muteRole);
     let embed = new Discord.RichEmbed()
     .setDescription(`O usuáro ${member} foi desmutado.\n• **Motivo**:\n» ${reason}`)
     .addBlankField()
     .setFooter(`Comando solicitado por ${message.author.tag}`, message.author.displayAvatarURL)
     .setTimestamp()
     .setThumbnail(member.user.displayAvatarURL)
     .setColor("#07ed66")
     message.channel.send(embed);

},
  aliases: ["desmute"],
  category: "Moderação",
  description: "Desmutar um usuário."
}