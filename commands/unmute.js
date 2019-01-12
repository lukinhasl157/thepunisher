const Discord = require("discord.js");

module.exports = {
  run: (bot, message, args) => {
  
  const role = message.guild.roles.find(r => r.name === "The punisher | 🔇 Muted");
  const member = message.mentions.members.first() || message.guild.members.get(args[0]);

    if (!member) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira o id ou mencione que deseja desmutar.`);
    } else if (args.length === 0) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira um motivo para desmutar este usuário.`);
    } else if (!member.roles.has(role.id)) {
      return message.channel.send(`**${message.author.username}** | Desculpe, este usuário não está mutado.`);
    } else {
      member.removeRole(role).catch(e => {
        console.log(e);
      });
      const embed = new Discord.RichEmbed()
      .setDescription(`O usuáro ${member} foi desmutado.\n \n• **Motivo**:\n \n» ${args.slice(1).join(" ")}`)
      .setColor("#ff0000")
      .setTimestamp(new Date())
      .setThumbnail(member.user.displayAvatarURL)
      .setFooter(`Comando solicitado por ${message.author.tag}`, message.author.displayAvatarURL)
      message.channel.send(embed);
    }
},
  aliases: ["desmute", "desmutar"],
  category: "Moderação",
  description: "Desmutar um usuário."
}
