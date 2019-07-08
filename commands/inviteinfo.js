const Discord = require("discord.js");
module.exports = {
    run: async function ({ message, args}) {

      if (!message.guild.me.hasPermission("MANAGE_GUILD")) {
        return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`\`MANAGE_GUILD\`\` para executar este comando.`);
      } else if (args.length == 0) {
        return message.channel.send("Insira o código de invite, caso não saiba o seu código de convite ou queira saber quantos membros você recrutou, digite \`\`t.invite\`\`");
      } else {
        const invites = await message.guild.fetchInvites();
        const inviteArgs = args[0].startsWith("https://discord.gg/") ? args[0].replace("https://discord.gg/", "") : args[0];
        const invite = invites.get(inviteArgs);
        
        if (!invite) {
          return message.channel.send(`O convite \`\`${inviteArgs}\`\` é inválido ou inexistente.`)
        } else {
          message.channel.send(new Discord.RichEmbed()
            .addField("» <:user:500109138953633792> Nome:", invite.inviter.tag, true)
            .addField("» 🗒 ID", invite.inviter.id, true)
            .addField("» 📨 Convite temporário: ", invite.temporary ? "Sim" : "Não", true)
            .addField("» 🤖 Bot:", invite.inviter.bot ? "Sim" : "Não", true)
            .addField("» <:canal:513884866455273494> Canal:", invite.channel.name ? invite.channel.name : "O convite não foi criado em um canal.", true)
            .addField("» 🔊 Tipo:", invite.channel.type ? invite.channel.type.toString().replace("voice", "Voz").replace("text", "Texto") : "O convite não foi criado em nenhum tipo de canal.", true)
            .addField("» 📨 URL do convite:", invite.url, true)
            .addField("» 📩 Usos:", invite.maxUses ? `${invite.uses}/${invite.maxUses}` : "Sem limite de usos.", true)
            .setColor(message.guild.members.get(invite.inviter.id).displayColor)
            .setThumbnail(invite.inviter.avatarURL)
            .setTimestamp(new Date())
          );
        }
      }
    },
  aliases: ["convite", "div", "convites"],
  category: "Moderação",
  description: "Mostrar as informações sobre o invite"
}