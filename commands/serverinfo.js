const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = {
    run: async function (bot, message, args) {

    const verificationGuild = {
        "0": "Nenhum (sem restrições)",
        "1": "Baixo: Precisa tem um e-mail verificado em sua conta do Discord.",
        "2": "Médio: Também precisa ser registrado no Discord por pelo menos 5 minutos.",
        "3": "Alto: Também precisa ser um membro deste servidor por pelo menos 10 minutos.",
        "4": "Muito alto: Precisa ter um telefone verificado em sua conta do Discord."
    }

    const online = message.guild.members.filter(m => m.presence.status == "online").size;
    const ocupado = message.guild.members.filter(m => m.presence.status == "dnd").size;
    const ausente = message.guild.members.filter(m => m.presence.status == "idle").size;
    const offline = message.guild.members.filter(m => m.presence.status == "offline").size;
    const bots = message.guild.members.filter(b => b.user.bot).size;
    const totalmembros = message.guild.memberCount;
    const canaistexto = message.guild.channels.filter(t => t.type === "text").size;
    const canaisvoz = message.guild.channels.filter(v => v.type === "voice").size;
    const roles = message.guild.roles.map(r => r).join("\n").replace("@everyone, ", "");
        
        const embed = new Discord.RichEmbed()
        .setAuthor(`» ${message.guild.name}`, `${message.guild.iconURL}`)
        .setColor("#FF0000")
        .addField(':crown: » Dono:', `<@${message.guild.ownerID}>`, true)
        .addField(":joy: » Total de Emojis:", `${message.guild.emojis.size}`, true)
        .addField(":file_cabinet: » ID do servidor:", message.guild.id, true)
        .addField(':calendar: » Criado em:', moment(message.guild.createdAt).format('LL'), true)
        .addField(`<:canal:513884866455273494> » Total de canais: [${canaistexto+canaisvoz}]`, `<:text:535162253604028417> Texto: ${canaistexto}\n<:voice:535162220057985033> Voz: ${canaisvoz}`, true)
        .addField(":zzz: » Canal afk", `${message.guild.afkChannel ? message.guild.afkChannel.name : "Nenhum canal afk."}`, true) 
        .addField("<:world:500147421641310229> » Região:", message.guild.region.toString().replace("brazil", ":flag_br: Brasil"), true)
        .addField("<:fast:500147391945768981> » Tempo afk", `${message.guild.afkTimeout} segundos`, true)
        .addField(`<:user:500109138953633792> » Membros: [${totalmembros}]`, `<:online:535161741873643531> Online: ${online}\n<:ausente:535161866415112192> Ausente: ${ausente}\n <:ocupado:535161952075251742> Ocupado: ${ocupado}\n <:offline:535161911956996104> Offline: ${offline}\n<:bots:535162824301740042> Bots: ${bots}`, false)
        .addField(`🛡 » Nivel de verificação:`, verificationGuild[message.guild.verificationLevel], false)
        .addField(`:beginner: » Total de cargos: [${message.guild.roles.size}]`, `Para ver todos os cargos do servidor clique no emoji <a:arrowRight:531248395411521566>`, false)
        .setThumbnail(message.guild.iconURL)
        .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.avatarURL)
        let msg = await message.channel.send(embed);
        await msg.react("a:arrowLeft:531247468260622353");
        await msg.react("a:arrowRight:531248395411521566");

        const filter = (reaction, user) => reaction.me && user.id === message.author.id;
        const collector = msg.createReactionCollector(filter, {time: 60 * 1000});

        collector.on("collect", reaction => {

        try {
            switch(reaction.emoji.id) {
                case "531248395411521566":
                    const embed2 = new Discord.RichEmbed()
                    .setAuthor(`» ${message.guild.name}`, `${message.guild.iconURL}`)
                    .addField(`:beginner: » Total de cargos: [${message.guild.roles.size}]`, roles)
                    .setThumbnail(message.guild.iconURL)
                    .setTimestamp(new Date())
                    .setColor("#FF0000")
                    .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.avatarURL)
                    msg.edit(embed2);
                break;

                case "531247468260622353":
                    msg.edit(embed);
                break;
            }
        } catch (e) {
            return message.channel.send("**ERRO**: A mensangem excedeu o limite de **2048** caracteres do Discord. Provavelmente o servidor possui muitos cargos.")
            .then(m => {
                m.delete(120 * 1000)
            });
        }

        });
    
  },
    aliases: ["si", "server", "servidor"],
    category: "Moderação",
    description: "Mostrar as informações do servidor."
}


        