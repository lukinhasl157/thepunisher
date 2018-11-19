const Discord = require("discord.js");
const moment = require("moment");
moment.locale('pt-BR');

module.exports ={
    run: (bot, message, args) => {

    let role = message.guild.roles.find(r => r.name === `${args.join(" ")}`);

    if (!role) return message.channel.send(`**${message.author.username}** Por favor, digite o nome do cargo que deseja ver as informações.`);

    let embed = new Discord.RichEmbed()
    .setAuthor(`» Informações do cargo ${role.name}`)
    .setColor("RANDOM")
    .addField("» Nome do cargo:", role.name)
    .addField("» ID do cargo:", role.id)
    .addField("» Posição do cargo:", role.position)
    .addField("» Cor:", role.hexColor)
    .addField("» Cargo criado em:", `${moment(role.createdAt).format('LLL')}`)
    .addField('» Permissões:', `\`\`\`css\n${Object.entries(role.serialize()).filter(([,has]) => has).map(([perm]) => perm).join(", ")}\`\`\``, false)
    .setFooter(`Comando solicitado por ${message.author.tag}`, message.author.displayAvatarURL)
    
    message.channel.send(embed);
    
},
    aliases: ["ri", "cargoinfo"],
    category: "Moderação",
    description: "Mostar as informações do cargo."
}
    