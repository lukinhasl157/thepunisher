
    const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    let user = message.mentions.members.first() || message.member;
    let string = ''
    message.channel.permissionsFor(user).toArray().map(p => string += `${p.charAt(0) + p.toLowerCase().replace(/_/g, ' ').slice(1).replace(`vad`, `VAD`)}**,  **`)
    let finalStr = string 
    let embed = new Discord.RichEmbed()
    .setDescription(`Permissões de: **${message.author.username}** em ${message.guild.name}](${message.guild.iconURL})\n \nLista de permissões:`)
    .setColor('#81BEF7')
       .setTimestamp(new Date())
             .setFooter(message.author.tag, message.author.avatarURL)
           .setThumbnail(message.author.avatarURL)
    message.channel.send(embed);
}

module.exports.help = {
    name: "perms"
}