
    const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    let user = message.mentions.members.first() || message.member;
    let string = ''
    message.channel.permissionsFor(user).toArray().map(p => string += `${p.charAt(0) + p.toLowerCase().replace(/_/g, ' ').slice(1).replace(`vad`, `VAD`)}**,  **`)
    let finalStr = string 
    let embed = new Discord.RichEmbed()
    .setDescription(`:pasta: [Permissões de ${message.author.username} em ${message.guild.name}](${message.guild.iconURL})\n\`\`Lista de Permissões:\`\`\n\n` + '**' + finalStr + '**')
    .setColor('#81BEF7')
       .setTimestamp(new Date())
             .setFooter(message.author.tag, message.author.avatarURL)
           .setThumbnail(message.author.avatarURL)
    message.channel.send(embed);
}

module.exports.help = {
    name: "perms"
}



exports.run = async (client, message, args, ) => {
    const Discord = require("discord.js");

           let member = message.mentions.members.first()
           let embed = new Discord.RichEmbed()
     .setDescription(`**■ Olá Membro**\n\nPara a segurança do nosso Discord, criamos esse sistema para evitar que sofremos ataque de bots. Para concluir sua entrada, clique no emoji desta mensagem para você ser registrado.`)
     .setColor('#ff3333')
           
        let msg = await message.channel.send(embed);
                await msg.react('✅');
                client.on('messageReactionAdd', (reaction, user) => {
                    if (reaction.emoji.name === '✅' && user.id !== client.user.id && user.id === msg.member.id) {
                        reaction.remove(user);
                        let role = client.guild.roles.find('name', 'Membros');
                        member.addRole(role);
                        let role2 = msg.member.guild.roles.find('name', 'registrar');
                        member.removeRole(role2);
                      
                    }
                })
        }