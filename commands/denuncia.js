
    const Discord = require("discord.js");
    const cooldown = new Set();
    
    module.exports.run = async (bot, message, args) => {


        if (cooldown.has(message.author.id)) return message.channel.send(`${message.author}, aguarde **2m** para usar outro comando novamente.`).then(msg => msg.delete(7000));{
            cooldown.add(message.author.id);
             message.delete(120000);
        
                        setTimeout(() => {
                            cooldown.delete(message.author.id);
                        }, 120000);
                    }

    if (message.mentions.users.size  == 0) return message.channel.send(new Discord.RichEmbed().setDescription(`${message.author} Por favor, mencione o usuário que deseja denunciar.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
if (!args.slice(1).join(' ')) return message.channel.send(new Discord.RichEmbed().setDescription(`${message.author} Diga o motivo da denuncia, digite **j!denuncia (@usuário) (motivo)**`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
let member = message.guild.member(message.mentions.users.first() || bot.users.get(args[0]));

let perms = ["SEND_MESSAGES", "ADD_REACTIONS"];
let channel = message.guild.channels.find(c => c.name == 'denuncias');
try {
   if (!channel) {
       channel = await message.guild.createChannel('denuncias', 'text', [{
           id: message.guild.id,
           deny: perms,
           allow: []
}])
   await message.channel.send(`${message.author}, não encontrei o canal denuncias, então criei o canal automaticamente.`);
   }

let embed = new Discord.RichEmbed()
.setColor(message.member.displayColor)
.setTitle("<:notification:500453518918811659> Denuncias")
.setAuthor(`${bot.user.tag}`, bot.user.displayAvatarURL)
.setThumbnail(message.mentions.users.first().avatarURL)
.setDescription(`**• Usuário:** ${member.user.tag}\n**• ID:** ${member.user.id}`)
.addField(`:notepad_spiral: Motivo:`, args.slice(1).join(' '))
.setFooter(`Denuncia enviada por ${message.author.tag}`, message.author.displayAvatarURL)
.setTimestamp()
await channel.send(embed);
    await message.channel.send(new Discord.RichEmbed().setDescription(`${message.author} Obrigado por denunciar o usuário, sua denuncia foi enviada e um staff irá conferir em breve. (O uso incorreto deste comando resultará em **BAN.**)`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#07ed66"));
} catch(error) {
    console.log(error);

}

}

module.exports.help = {
    name: "denuncia"
  }