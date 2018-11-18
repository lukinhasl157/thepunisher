
    const Discord = require("discord.js");

module.exports = {
    run: (bot, message, args) => {

    let user = message.mentions.members.first() || message.member;
    let string = ''
    message.channel.permissionsFor(user).toArray().map(p => string += `${p.charAt(0) + p.toLowerCase().replace(/_/g, ' ').slice(1).replace(`vad`, `VAD`)}, `)
    let finalStr = string 
    let embed = new Discord.RichEmbed()
    .setDescription(`Permissões de **${message.author.username}**`)
    .addField(`Lista de permissões:`, `\`\`\`js\n${finalStr}\`\`\``)
    .setColor('#ff0000')
    .setTimestamp(new Date())
    .setFooter(message.author.tag, message.author.avatarURL)
    .setThumbnail(message.author.avatarURL)
    message.channel.send(embed);
},

    aliases: ["perms", "permi"],
    category: "Moderação",
    description: "Mostrar as permissões do usuário."
}