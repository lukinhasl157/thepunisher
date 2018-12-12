const Discord = require('discord.js')

module.exports = {
    run: (bot, message, [id]) => {
        let member = message.guild.member(message.mentions.users.first() || bot.users.get(id) || message.author)
        let mAvatar = member.user.displayAvatarURL || member.displayAvatarURL

        let embed = new Discord.RichEmbed()
            .setColor(member.displayColor)
            .setAuthor(`» Avatar do usuário: ${member.user.tag}`, member.user.displayAvatarURL)
            .setDescription(`Clique [aqui](${mAvatar}) para fazer o download da imagem.`)
            .setImage(mAvatar)
            .setFooter(`${message.guild.name}`, message.guild.iconURL)
            .setTimestamp()

        message.channel.send(embed)
    },
    aliases: ['av'],
    category: 'Utilidades',
    description: 'Mostrar a foto de perfil do usuário.'
}
