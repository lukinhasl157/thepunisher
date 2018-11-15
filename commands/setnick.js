const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => { 

    let nickMember = message.guild.member(message.mentions.users.first() || bot.users.get(args[0]) || message.guild.members.get(args[0]));
    let nick = args.slice(1).join(' ');


    if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

    if (!args[0]) return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, mencione o usuário que deseja alterar o nick.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

    if (nick.length >= 32) return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, o limite de 32 caractéres foi atingido, tente um nick menor.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

    if (!args[1]) return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, diga um novo nickname para que eu posso alterar o nick deste usuário`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

    if(!nickMember) return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, não consegui encontrar o usuário mencionado.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

    if (nickMember.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para alterar o nick deste usuário`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    message.guild.member(nickMember).setNickname(nick);
    message.channel.send(new Discord.RichEmbed().setDescription(`<a:sucessogif:499614074129350666> Nick alterado com sucesso. O novo nickname do usuário é **${nick}**`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#07ed66"));
}

module.exports.help = {
    name: "setnick"
}





