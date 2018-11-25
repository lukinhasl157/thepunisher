const Discord = require("discord.js");

module.exports = {
    run: (bot, message, args) => {

    let nickMember = message.mentions.members.first() || message.guild.members.get(args[0]);
    let nick = args.join(' ');

        if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

        if (!nickMember) return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, mencione o usuário que deseja alterar o nick.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

        if (nick.length >= 32) return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, o limite de 32 caractéres foi atingido, tente um nick menor.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

        if (!nick) return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, diga um novo nickname para que eu posso alterar o nick deste usuário`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

        if (nickMember.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para alterar o nick deste usuário`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    
    member(nickMember).setNickname(nick);
    message.channel.send(new Discord.RichEmbed().setDescription(`<a:sucessogif:499614074129350666> Nick alterado com sucesso. O novo nickname do usuário é **${nick}**`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#07ed66"));

},

    aliases: ["alterarnick", "changenickname", "editnickname"],
    category: "Utilidades",
    description: "Alterar o nome de um usuário."
}





