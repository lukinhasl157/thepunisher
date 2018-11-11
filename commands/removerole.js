
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Îmi pare rău, nu poți face asta.");
  if(args[0] == "help"){
    message.reply("Foloseste: !removerole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Nu am putut găsi acel utilizator");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specificați un rol");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Nu am găsit acest rol.");

  if(!rMember.roles.has(gRole.id)) return message.reply("Ei nu au acel rol.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`Ai piedut gradul ${gRole.name}`)
  }catch(e){
    message.channel.send(`RIP to <@${rMember.id}>, Ai fost ${gRole.name} de la ei. Am încercat să le dăm, dar DM-urile lor sunt blocate.`)
  }
}

module.exports.help = {
  name: "removerole"
}