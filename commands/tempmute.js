const Discord = require("discord.js");
const ms = require("ms");
module.exports = {
  run: async function (bot, message, args) {

    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let role = message.guild.roles.find(r => r.name === "The Punisher | 🔇 Muted");
    const time = args[1];
    const reason = args.slice(2).join(" ");

    const embed = new Discord.RichEmbed()
      .setAuthor("**MUTE**")
      .setDescription(`O usuário ${member} foi mutado por **${ms(ms(time))}.**\n \n**• Motivo:** » ${reason}\n \nApós o termino da punição o usuário será desmutado automaticamente.`)
      .setThumbnail(member.user.displayAvatarURL)
      .setColor("#ff0000")
      .setTimestamp(new Date())
      .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)

    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`\`MUTE_MEMBERS\`\` para executar este comando.`)
    } else if (!message.member.hasPermission("MUTE_MEMBERS")) {
      return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando. Permissão necessária: \`\`MUTE_MEMBERS\`\``)
    } else if (!member) {
      return message.channel.send(`**${message.author.username}** | Por favor insira o id ou mencione o usuário que deseja mutar.`);
    } else if (!time) {
      return message.channel.send(`**${message.author.username}** | Por favor insira um tempo para mutar este usuário. Exemplo: t.tempute @usuário 30s motivo`)
    } else if (!reason) {
      return message.channel.send(`**${message.author.username}** | Por favor insira um motivo para mutar este usuário.`);
    } else if (!role) {
      try {
        role = await message.guild.createRole({
        name: "The Punisher | 🔇 Muted",
        color: "#ff0000",
        permissions:[]
        });
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            SPEAK: false,
            CONNECT: true
          });
        });
        await member.addRole(role);
        await member.setDeaf(true, reason).catch(() => {
          return false;
        });
        await member.setMute(true, reason).catch(() => {
          return false;
        });
        await message.channel.send(embed);
      } catch(e) {
        console.log(e);
      }
    } else {
      if (role) {
        await member.addRole(role);
        await member.setDeaf(true, reason).catch(() => {
          return false;
        });
        await member.setMute(true, reason).catch(() => {
          return false;
        });
        await message.channel.send(embed);

        setTimeout((bot) => {
          member.removeRole(role);
          member.setDeaf(false);
          member.setMute(false);
          message.channel.send(new Discord.RichEmbed()
            .setAuthor("**DESMUTE**", bot.user.avatarURL)
            .setDescription(`O usuário ${member} que havia sido mutado por **${ms(ms(time))}**, finalizou seu tempo de punição e foi desmutado.`)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor("#ff0000")
            .setTimestamp(new Date())
            .setFooter(message.guild.name, message.guild.iconURL)
          );
        }, ms(time));
      }
    }
},
  aliases: ["mute", "mutar", "silenciar"],
  category: "Moderação",
  description: "Mutar um usuário por um determinado tempo."
}
