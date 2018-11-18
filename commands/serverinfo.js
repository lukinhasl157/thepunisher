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

        let embed = new Discord.RichEmbed()
        .setAuthor(message.guild.displayAvatarURL, `:bookmark_tabs: » Informações do servidor: \n${message.guild.name}`)
        .setColor("#FF0000")
        .addField(':crown: » Dono:', `<@${message.guild.owner.id}>`)
        .addField(':calendar: » Servidor criado em:', moment(message.guild.createdAt).format('LLLL'))
        .addField("<:world:500147421641310229> » Região:", message.guild.region)
        .addField(":file_cabinet: » ID do servidor:", message.guild.id)
        .addField(`<:user:500109138953633792> » Total de membros: [${totalmembros}]`, `<:online:513046143572377601> Online: ${online}\n<:ausente:513046210672590848> Ausente: ${ausente}\n <:ocupado:513046183699283968> Ocupado: ${ocupado}\n <:offline:513046162731827203> Offline: ${offline}`)
        .addField(":robot: » Bots:", `${bots}`)
        .addField(`» Total de canais: [${canaistexto+canaisvoz}]`, `Texto: ${canaistexto}\n Voz: ${canaisvoz}`)
        .addField(`» Total de cargos: [${message.guild.roles.size}]`, `\`\`\``\n${roles}`\`\`\``)
        .addField(`» Total de emojis:`, message.guild.emojis.size)
        .setThumbnail(message.guild.iconURL)
        .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.avatarURL)
        message.channel.send(embed);

  },
     aliases: ["si", "server", "servidor"],
     category: "Moderação",
     description: "Mostrar as informações do servidor."
}
