const Discord = require("discord.js");

module.exports = {
  run: (bot, message, args) => {
  
  const member = message.mentions.members.first() || message.author || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.startsWith(args.join(" ")));
  const administrator = member.hasPermission("ADMINISTRATOR")? "Sim" : "Não";
  const status = {
    "online": "<:online:529179015865434132> Disponível",
    "offline": "<:offline:529178943882788866> Invisível",
    "idle": "<:ausente:529179085402931212> Ausente",
    "dnd": "<:ocupado:529178886647578626> Não perturbar"
  }

  const moment = require("moment");
  moment.locale("pt-BR"); 

  const embed = new Discord.RichEmbed()
  .setAuthor(`» 📚 Informações do usuário: ${member.user.tag}`, member.user.displayAvatarURL)
  .setThumbnail(member.user.displayAvatarURL)
  .addField(`» ℹ Informações principais:`, `» 👤 Usuário: ${member.user.tag}\n» 🗂 ID: ${member.user.id}\n» 🚦 Status: ${status[member.user.presence.status]}\n» 🎮 Jogando: ${member.user.presence.game ? member.user.presence.game : "O usuário não está jogando nada no momento."}\n» 📆 Conta criada em: ${moment(member.user.createdAt).format("LLL")}`)
  .addField(`» 📑 Informações no servidor:`, `» 🏷 Apelido: ${member.user.nickname? member.user.nickname : "Sem apelido"}\n» 📆 Entrou em: ${moment(member.user.joinedAt).format("LLLL")}\n» 👾 Total de Cargos: [${member.roles.size? member.roles.size : "Sem cargos."}]\n» 🛡 Administrador: ${administrator}`)
  .setColor(member.displayColor)
  .setTimestamp(new Date())
  .setFooter(`» Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
  message.channel.send(embed);

},
  aliases: ["perfil", "info"],
  category: "Moderação",
  description: "Mostrar as informações do usuário."
}