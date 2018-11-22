const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = {
    run: (bot, message, args) => {

    let online = message.guild.members.filter(a => a.presence.status == "online").size;
    let ocupado = message.guild.members.filter(a => a.presence.status == "dnd").size;
    let ausente = message.guild.members.filter(a => a.presence.status == "idle").size;
    let offline = message.guild.members.filter(a => a.presence.status == "offline").size;
    let bots = message.guild.members.filter(a => a.user.bot).size;
    let totalmembros = message.guild.memberCount;
    let canaistexto = message.guild.channels.filter(a => a.type === "text").size;
    let canaisvoz = message.guild.channels.filter(a => a.type === "voice").size;
    let roles = message.guild.roles.map(a => a.name).join(", ").replace('@everyone, ', '');
    let inline = '1';
        
      let embed = new Discord.RichEmbed()
        .setAuthor(`» ${message.guild.name}`, `${message.guild.iconURL}`)
        .setColor("#FF0000")
        .addField(':crown: » Dono:', `<@${message.guild.ownerID}>`, inline)
        .addField(":joy: » Total de Emojis:", `${message.guild.emojis.size}`, inline)
        .addField(":file_cabinet: » ID do servidor:", message.guild.id, inline)
        .addField(':calendar: » Criado em:', moment(message.guild.createdAt).format('LLL'), inline)
        .addField(`<:canal:513884866455273494> » Total de canais: [${canaistexto+canaisvoz}]`, `Texto: ${canaistexto}\n Voz: ${canaisvoz}`, inline)
        .addField(":zzz: » Canal afk", `${message.guild.afkChannel ? message.guild.afkChannel.name : "Nenhum canal afk."}`, inline) 
        .addField("<:world:500147421641310229> » Região:", message.guild.region.toString().replace("brazil", ":flag_br: Brasil"), inline)
        .addField("<:fast:500147391945768981> » Tempo afk", `${message.guild.afkTimeout} segundos`, inline)
        .addField(`<:user:500109138953633792> » Membros: [${totalmembros}]`, `<:online:513046143572377601> Online: ${online}\n<:ausente:513046210672590848> Ausente: ${ausente}\n <:ocupado:513046183699283968> Ocupado: ${ocupado}\n <:offline:513046162731827203> Offline: ${offline}\n :robot: Bots: ${bots}`, inline)
        .addField(`:beginner: » Total de cargos: [${message.guild.roles.size}]`, `\`\`\`\n${roles}\`\`\``, inline)
        .setThumbnail(message.guild.iconURL)
        .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.avatarURL)

        message.channel.send(embed);
    
  },
     aliases: ["si", "server", "servidor"],
     category: "Moderação",
     description: "Mostrar as informações do servidor."
}
