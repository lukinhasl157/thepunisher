const Discord = require("discord.js");
module.exports = {
    run: async function (bot, message, args) {

      const user = message.mentions.users.first() || message.author || bot.users.get(args[0]);

      if (!message.guild.me.hasPermission("MANAGE_GUILD")) {
        return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`\`MANAGE_GUILD\`\` para executar este comando.`);
      } else if (!invitesUser) {
        return message.channel.send("Você não possui nenhuma URL de convite.")
      } else {
        const invites = await message.guild.fetchInvites();
        const invitesUser = invites.find((invites) => invites.inviter.id == user.id);
        
        message.channel.send(new Discord.RichEmbed()
          .setThumbnail(user.displayAvatarURL)
          .addField("» Membros recrutados: ", `\`\`\`js\n(${invitesUser.uses}) - Membros\`\`\``)
          .addField("» URL de convite:", invitesUser.url)
          .setColor(message.guild.members.get(invitesUser.inviter.id).displayColor)
          .setFooter(user.tag, user.displayAvatarURL)
          .setTimestamp(new Date())
        );
      }
    },
  aliases: ["convite", "div", "convites"],
  category: "Moderação",
  description: "Mostrar quantos usuários o staffer convidou."
}