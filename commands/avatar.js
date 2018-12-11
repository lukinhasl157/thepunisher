const Discord = require("discord.js");

module.exports = {
  run: (bot, message, args) => {

    let mAvatar = message.mentions.members.first() || message.guild.members.get(args[0]) || message.author;

      let embed = new Discord.RichEmbed()
      .setColor(member.displayColor)
      .setAuthor(`» Avatar do usuário: ${member.user.tag}`, member.user.displayAvatarURL)
      .setDescription(`Clique [aqui](${mAvatar}) para fazer o download da imagem.`)
      .setImage(mAvatar)
      .setFooter(`${message.guild.name}`, message.guild.iconURL)
      .setTimestamp()
      message.channel.send(embed);
  
    },
      
      aliases: ["av"],
      category: "Utilidades",
      description: "Mostrar a foto de perfil do usuário."
    }
