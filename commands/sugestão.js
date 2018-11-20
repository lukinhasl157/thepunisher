const Discord = require("discord.js");

    module.exports = {
      run: async (bot, message, args) => {

    try {

     let denyPerms = ["SEND_MESSAGES"];
     let allowPerms = ["ADD_REACTIONS"];
     let channel = message.guild.channels.find(c => c.name === 'sugestões');

        if (!channel) {
          channel = await message.guild.createChannel('sugestões', 'text', [{
          id: message.guild.id,
          deny: denyPerms,
          allow: allowPerms
    }])
        }
          await message.channel.send(`${message.author}, não encontrei o canal sugestões, então criei o canal automaticamente.`);
          
     let sMsg = args.join(' ');
        if (!sMsg) {
         message.react(":negado:505155029636874250");
         return message.reply("por favor, insira sua sugestão!")
       }
     
     let embed = new Discord.RichEmbed()
      .addField("Sugestão:", `${sMsg}`)
      .setFooter(`Sugestão enviada por: ${message.author.tag}`, message.author.displayAvatarURL)
      .setTimestamp(new(Date))
      .setColor("#07ed66")
      .setThumbnail(message.author.avatarURL)
     let msg = await channel.send(embed);
      await msg.react(":correto:505155063963058187");
      await msg.react(":negado:505155029636874250");
      await message.channel.send('Sua sugestao foi enviada com sucesso');
      message.react(":correto:505155063963058187");
    
} catch(error) {
    message.channel.send(`Erro: Eu não tenho a permissão de criar canais.`)
    console.log(error);
    }

},
  category: "Moderação",
  description: "Enviar uma sugestão."
}





