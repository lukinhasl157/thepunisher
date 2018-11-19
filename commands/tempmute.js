
  const Discord = require("discord.js");
  const ms = require("ms");

module.exports = {
  run: async function (bot, message, args) {

 if (!message.member.hasPermission("MUTE_MEMBERS")) 
      return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
  let tomute = message.guild.member(message.mentions.users.first() || bot.users.get(args[0]) || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, mencione o usuário que deseja mutar.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
  let reason = args[2];
  if (!reason) return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, diga um motivo para mutar este usuário.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
  let muterole = message.guild.roles.find(role => role.name === 'The punisher | Muted');
  

  if(!muterole) {
    try{
      muterole = await message.guild.createRole({
        name: "The Punisher | Muted",
        color: "#ff0000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          SPEAK: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, digite o tempo que deseja mutar este usuário.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));

  await (tomute.addRole(muterole));
  message.channel.send(new Discord.RichEmbed().setDescription(`O usuário <@${tomute.id}> foi mutado por **${ms(ms(mutetime))}.**\n \n**• Motivo:** » ${reason}\n \nApós o termino da punição o usuário será desmutado automaticamente.`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setThumbnail(tomute.user.displayAvatarURL).setTimestamp().setColor("#ff0000"));

  setTimeout(function() {
    tomute.removeRole(muterole);
    message.channel.send(new Discord.RichEmbed().setDescription(`O usuário <@${tomute.id}> que havia sido mutado por **${ms(ms(mutetime))}**, finalizou seu tempo de punição e foi desmutado.`).setAuthor(`Comando automático | DESMUTE`, bot.user.displayAvatarURL).setFooter(`${message.guild.name}`, message.guild.iconURL).setThumbnail(tomute.user.displayAvatarURL).setTimestamp().setColor("#07ed66"));
  }, ms(mutetime));

return this.name;

},
  category: "Moderação",
  description: "Mutar um usuário por tempo."
}
