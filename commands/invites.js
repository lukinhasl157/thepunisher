const Discord = require("discord.js");
module.exports = {
    run: async function (bot, message, args) {

        const user = message.mentions.users.first() || message.author || bot.users.get(args[0]);
        const targetInvites = await message.guild.fetchInvites();
        let invitesUses = 0;

            targetInvites.forEach(invite => {
                if (invite.inviter.id === user.id) {
                    invitesUses += invite.uses;
                }
            });
            message.channel.send(new Discord.RichEmbed()
                .setThumbnail(user.displayAvatarURL)
                .addField("**• Membros Recrutados •**", `\`\`\`js\n(${invitesUses}) - Membros\`\`\``)
                .setColor("RANDOM")
                .setFooter(user.tag, user.displayAvatarURL)
                .setTimestamp(new Date())
            );
},
    aliases: ["convite", "div", "convites"],
    category: "Moderação",
    description: "Mostrar quantos usuários o staffer convidou."
}

