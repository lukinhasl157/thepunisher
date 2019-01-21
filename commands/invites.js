const Discord = require("discord.js");
module.exports = {
    run: async function (bot, message, args) {

        const member = message.mentions.members.first() || message.member || message.guild.members.get(args[0]);
        const targetInvites = await message.guild.fetchInvites();
        let invitesUses = 0;

            targetInvites.forEach(invite => {
                if (invite.inviter.id === user.id) {
                    invitesUses += invite.uses;
                }
            });

            const embed = new Discord.RichEmbed()
            .setThumbnail(user.displayAvatarURL)
            .addField("**• Membros Recrutados •**", `\`\`\`js\n(${invitesUses}) - Membros\`\`\``)
            .setColor("RANDOM")
            .setFooter(member.user.tag, member.user.displayAvatarURL)
            .setTimestamp(new Date());
            message.channel.send(embed);
},
    aliases: ["convite", "div", "convites"],
    category: "Moderação",
    description: "Mostrar quantos usuários o staffer convidou."
}

