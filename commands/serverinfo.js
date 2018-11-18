
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
    let roles = message.guild.roles.map(a => a.name).join(", ").replace("@", "");
        let embed = new Discord.RichEmbed()
        .setAuthor(`Informações do servidor ${message.guild.name}`, message.guild.displayAvatarURL)
        .setColor("#FF0000")
        .addField('Dono', `<@${message.guild.owner.id}>`)
        .addField('Criado em:', moment(message.guild.createdAt).format('LLLL'))
        .addField("ID", message.guild.id)
        .addField(`Membros [${totalmembros}]`, `<:online:513046143572377601> Online: ${online}\n<:ausente:513046210672590848> Ausente: ${ausente}\n <:ocupado:513046183699283968> Ocupado: ${ocupado}\n <:offline:513046162731827203> Offline: ${offline}\n Bots: ${bots}`)
        .addField(`Canais [${canaistexto+canaisvoz}]`, `Texto: ${canaistexto}\n Voz: ${canaisvoz}`)
        .addField(`Cargos [${message.guild.roles.size}]`, roles)
        .setThumbnail(message.guild.iconURL)
        .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.avatarURL)
        message.channel.send(embed);
},

     aliases: ["si", "server", "servidor"],
     category: "Moderação",
     description: "Mostrar as informações do servidor."
  }

