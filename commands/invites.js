const Discord = require("discord.js");

    module.exports = {
        run: async function (bot, message, args) {

     let user = message.mentions.users.first();

    if (!user) user = message.author;

    var targetInvites = await message.guild.fetchInvites();

    var invitesUses = 0;

    targetInvites.forEach(invite => {
        if (invite.inviter.id === user.id) {
            invitesUses += invite.uses;
        }
    });

    var embed = new Discord.RichEmbed()
    .setThumbnail(user.displayAvatarURL)
    .addField("**• Membros Recrutados •**", `\`\`\`js\n(${invitesUses}) - Membros\`\`\``)
    .setColor("RANDOM")
    .setFooter(`${user.tag}`)
    .setTimestamp();

    message.channel.send(embed);

},
    aliases: ["convite", "div", "convites"],
    category: "Moderação",
    description: "Mostrar quantos usuários o staffer convidou."
}

