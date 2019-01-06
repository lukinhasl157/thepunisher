const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR"); 
  
module.exports = {
  run: (bot, message, args) => {
  
  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
  const administrator = member.hasPermission("ADMINISTRATOR")? "Sim" : "Não";
  const status = {
    "online": "Disponível",
    "offline": "Invisível",
    "idle": "Ausente",
    "dnd": "Não perturbar"
  }

  const embed = new Discord.RichEmbed()
  .setThumbnail(member.user.displayAvatarURL)
  .setTimestamp()
  .setFooter(`» Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
  .addField(`» ℹ Informações principais:`, `» Usuário: ${member.user.tag}\n» ID: ${member.user.id}\n» Status: ${status[member.user.presence.status]}\n» Jogando: ${member.user.presence.game ? member.user.presece.game : "O usuário não está jogando nada no momento."}\n» Conta criada em: ${moment(member.user.createdAt).format("LLL")}`)
  .addField(`» 📑 Informações no servidor:`, `» Apelido: ${member.user.nickname? member.user.nickname : "Sem apelido"}\n» Entrou em: ${moment(member.user.joinedAt).format("LLLL")}\n» Cargos: ${member.roles.size? member.roles.size : "Sem cargos."}\n» Administrador: ${administrator}`)
  .setAuthor(`» Informações do usuário: ${member.user.tag}`, member.user.displayAvatarURL)
  .setColor(member.hexColor)
  message.channel.send(embed);

  }
}