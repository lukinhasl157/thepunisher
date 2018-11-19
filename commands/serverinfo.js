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
    let canalAfk = message.guild.afkChannel;
    let tempoAfk = message.guild.afkTimeout;
    let inline = '1';
        
      let embed = new Discord.RichEmbed()
        .setAuthor(`» ${message.guild.name}`, `${message.guild.iconURL}`)
        .setColor("#FF0000")
        .addField(':crown: » Dono:', `<@${message.guild.ownerID}>`, inline)
        .addField("<:world:500147421641310229> » Região:", message.guild.region, inline)
        .addField(':calendar: » Servidor criado em:', moment(message.guild.createdAt).format('LLL'), inline)
        .addField(":file_cabinet: » ID do servidor:", message.guild.id, inline)
        .addField(`<:user:500109138953633792> » Membros: [${totalmembros}]`, `<:online:513046143572377601> Online: ${online}\n<:ausente:513046210672590848> Ausente: ${ausente}\n <:ocupado:513046183699283968> Ocupado: ${ocupado}\n <:offline:513046162731827203> Offline: ${offline}`, inline)
        .addField(":robot: » Bots:", `${bots}`, inline)
        .addField("» Canal AFK:", message.guild.afkChannel, inline)
        .addField("» Tempo para AFK:", `${tempoAfk} segundos`, inline)
        .addField(`<:pensenisso:513802114657419274> » Total de emojis:`, message.guild.emojis.size, inline)
        .addField(`» Total de canais: [${canaistexto+canaisvoz}]`, `Texto: ${canaistexto}\n Voz: ${canaisvoz}`, inline)
        .addField(`» Total de cargos: [${message.guild.roles.size}]`, `\`\`\`\n${roles}\`\`\``, inline)
        .setThumbnail(message.guild.iconURL)
        .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.avatarURL)
        message.channel.send(embed);
    
  },
     aliases: ["si", "server", "servidor"],
     category: "Moderação",
     description: "Mostrar as informações do servidor."
}
