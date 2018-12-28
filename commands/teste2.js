const { RichEmbed } = require("discord.js");

module.exports = {
    run: async function(bot, message, args) {

    message.delete().catch(console.error);
    invites = await message.guild.fetchInvites();
    if (invites.size < 1) {
        message.reply("Nenhum convite no servidor");
        return 0;
    }
    var checkedUsers = new Map();
    invites.forEach(invite => {
        let user = checkedUsers.get(invite.inviter.id);
        if (!user) {
            user = invite.inviter;
            user.sum = 0;
            user.invites = 0;
            user.biggest = invite;
        } else {
            if (invite.uses > user.biggest.uses || (invite.uses === user.biggest.uses && invite.createdTimestamp > user.biggest.createdTimestamp)) {
                user.biggest = invite;
            }
        }
        user.sum += invite.uses;
        if (invite.uses > 0) user.invites += 1;
        checkedUsers.set(user.id, user);
        return;
    });
    var top = new Array();
    checkedUsers.forEach(user => {
        if (user.sum === 0) {
            checkedUsers.delete(user.id);
            return;
        }
        if (top.length === 0) {
            top[0] = user;
            checkedUsers.delete(user.id);
            return;
        }
for (let i = 0; i < top.length; ++i) {
            if (user.sum > top[i].sum || (user.sum === top[i].sum && user.biggest.createdTimestamp > top[i].biggest.createdTimestamp)) {
                top.splice(i, 0, user);
                if (top.length > 5) {
                    top.pop();
                }
                checkedUsers.delete(user.id);
                return;
            } else if (i === 4) {
                checkedUsers.delete(user.id);
                return;
            }
        }
        if (top.length < 5) top.push(user);
        checkedUsers.delete(user.id);
        return;
    });
    if (top.length < 1) {
        message.reply("Nenhum convite com mais que 0 usos");
        return 0;
    }
    var trofeu = bot.getEmoji("trofeu");
    let embed = new RichEmbed()
    .setTitle("Top 5 Divulgadores:")
    .setDescription(`**Os top 5 __Divulgadores__ do servidor __${message.guild.name}__.**`)
    .setThumbnail()
    .setColor("2E2EFE");
    var sum = 0;
    var numInvites = 0;
    top.forEach((user, index) => {
        sum += user.sum;
        numInvites += user.invites;
        var emoji;

switch (index) {
            case 0:
                emoji = ":first_place:";
                break;
            case 1:
                emoji = ":second_place:"
                break;
            case 2:
                emoji = ":third_place:";
                break;
            case 3:
                emoji = bot.getEmoji("fourth_place");
                break;
            case 4:
                emoji = bot.getEmoji("fifth_place");
                break;
            default:
                emoji = "Erro";
                break;
        }
        embed.addField(`${emoji} __${user.username}:__`, `\`\`\`js\nConvidou: ${user.sum}\`\`\``);
    });
    let expInvite = numInvites !== 1;
    let expSum = sum !== 1;
    embed.addField("Isso dá um total de:", ` \`💢\` \`${sum}\` usuário${expSum ? "s" : ""} recrutado${expSum ? "s" : ""}`, true)
    .addField(`Convites gerados`, `\`💢\` \`${numInvites}\` convite${expInvite ? "s" : ""} gerado${expInvite ? "s" : ""}`, true);
    message.channel.send(embed).then(msg => msg.react(trofeu));
    return 0;
}

}