const Discord = require("discord.js");
module.exports = {
  run: async function (bot, message, args) {

    let channel = message.guild.channels.find(c => c.name === "🚨denuncias");
    if (args.length === 0) {
      return message.channel.send(`${message.author}, Por favor, insira uma sugestão.`)
    } else if (!channel) {//verificando se o canal 🚨denuncias existe, se o canal não existir ele cria um.
      channel = await message.guild.createChannel("🚨denuncias", "text", [{//criando o canal 🚨denuncias.
        id: message.guild.id,
        deny: ["SEND_MESSAGES"], //definindo as permissões do canal.
        allow: ["ADD_REACTIONS", "VIEW_CHANNEL"]
      }]);
      await message.channel.send(`${message.author}, não encontrei o canal 🚨denuncias, então criei o canal automaticamente.`);
      await message.channel.send(`${message.author}, sua denuncia foi enviado com sucesso.`)
      const embed = new Discord.RichEmbed()
        .addField("**Sugestão**", args.join(" "))
        .setFooter(`Sugestão enviada por: ${message.author.tag}`, message.author.displayAvatarURL)
        .setTimestamp(new(Date))
        .setColor("#07ed66")
        .setThumbnail(message.author.displayAvatarURL)
      const msg = await channel.send(embed);
      await msg.react(":correto:505155063963058187");//troque o emoji se não vai dar erro.
      await msg.react(":negado:505155029636874250");//troque o emoji se não vai dar erro.
    } else {
      if (channel) {// se tiver o canal ele manda a msg normal.
        const m = await message.channel.send(embed);
        await m.react(":correto:505155063963058187");//troque o emoji se não vai dar erro.
        await m.react(":negado:505155029636874250");//troque o emoji se não vai dar erro.
      }
    }
  }
}