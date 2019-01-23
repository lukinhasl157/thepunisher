module.exports = {
  run: (bot, message, args) => {

    const everyone = message.guild.roles.find(r => r.name === "@everyone");
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão **MANAGE_CHANNELS** para executar este comando.`);
    } else if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send(`**${message.author.username}** | Desculpe, você não permissão para executar este comando! Permissão requirida: **MANAGE_CHANNELS**`);
    } else {
      message.channel.overwritePermissions(everyone, {
        SEND_MESSAGES: false
      });
      message.channel.send(`» O canal ${message.channel} foi **DESATIVADO.** :lock: por **${message.author.username}**. Para reativar o chat utilize t.unlock`);
    }
  },
    aliases: ["chlock", "lock"],
    category: "Moderação",
    description: "Desativar o chat."
}

