
  const Discord = require("discord.js");
  const moment = require("moment");
  moment.locale('pt-BR'); 
  
  module.exports.run = async (bot, message, args) => {
  

  let usuario = message.guild.member(message.mentions.users.first() || bot.users.get(args[0]) || message.author);
  let administrador;
if(usuario.hasPermission("ADMINISTRATOR") === true) administrador = "sim";
if(usuario.hasPermission("ADMINISTRATOR") === false) administrador = "não";
  let statusmebro;
if(usuario.presence.status === "dnd") statusmebro = "Não pertubar";
if(usuario.presence.status === "idle") statusmebro = "Ausente";
if(usuario.presence.status === "stream") statusmebro = "Transmitindo";
if(usuario.presence.status === "offline") statusmebro = "Invisível";
if(usuario.presence.status === "online") statusmebro = "Disponível";
  let userinfoembed = new Discord.RichEmbed()
  .setThumbnail(usuario.user.displayAvatarURL)
  .setTimestamp()
  .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
  .addField(`ℹ Informações principais:`, `:white_small_square:Usuário: ${usuario.user.tag}\n:white_small_square:Id: ${usuario.user.id}\n:white_small_square:Status: ${statusmebro}\n:white_small_square:Jogando: ${usuario.user.presence.game ? usuario.user.presence.game.name : 'O usuário não está jogando nada no momento.'}\n:white_small_square:Criada em: ${moment(usuario.user.createdAt).format("LLL")}`)
  .addField(`📑 Informações no servidor:`, `:white_small_square:Apelido: ${usuario.user.nickname || "Sem apelido."}\n:white_small_square:Entrou: ${moment(usuario.user.joinedAt).format('LLL')}\n:white_small_square:Cargos: ${usuario.roles.size || "Sem cargos."}\n:white_small_square:Administrador: ${administrador}`)
  .setAuthor(`Informações do usuário: ${usuario.user.username}`, usuario.user.displayAvatarURL)
  .setColor(usuario.displayColor)
    message.channel.send(userinfoembed);

  }
  module.exports.help = {
    name: "userinfo"
  }



  const Discord = require('discord.js');
const talkedRecently = new Set();


exports.run = (client, message, args) => {

  try {

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new Discord.RichEmbed()
        .setColor(0x0000)
        .setTimestamp()
        .setDescription(":cancel: | Sem permissão.")).then(m => m.delete(5000))
    if (talkedRecently.has(message.author.id)) return message.channel.send(`${message.author},Espere **5 segundos** para usar outro comando novamente.`);{
        talkedRecently.add(message.author.id);
        
        setTimeout(() => {
        talkedRecently.delete(message.author.id);
        }, 5000);
        }
    message.delete()
    
    avatar = message.author.avatarURL
    let say = args.join(" ")
    
    const embed = new Discord.RichEmbed()
    
    .setFooter(`Mensagem enviada por: ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setColor(0x0000)
    .setDescription(`ㅤㅤㅤㅤㅤㅤ:dc: | **MENSAGEM** | :dc: \n\n ${say}`)
    
    message.delete().catch(O_o=>{});  
    message.channel.send(embed);

      } catch(err) {
        console.log(err)
        message.channel.send("pqp deu erro, olha o console")
      }
    
}

module.exports.help = {
    name: "say"
    }