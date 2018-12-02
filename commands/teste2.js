const Discord = require("discord.js");
    module.exports.run = async (bot, message, args) => {

    var rolesEmbed = new Discord.RichEmbed()
    .setTitle("Escolha uma reação e pegue sua role!")
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription('Roxo : 💜\nAzul :💙 \nCreeper : 💥')
    let msg = await message.channel.send(rolesEmbed);
await msg.react('💜');
await msg.react('💙')
await msg.react('👽')

const filter = (reaction, user) => reaction.emoji.name === '💜' && user.id === message.author.id;
const collector = msg.createReactionCollector(filter);

  collector.on('collect', r1 => {
   let role = message.guild.roles.find(role => role.name === "roxo");
    message.member.addRole(role);
})
}