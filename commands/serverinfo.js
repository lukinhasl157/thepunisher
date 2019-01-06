const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = {
    run: async function (bot, message, args) {

    const online = message.guild.members.filter(a => a.presence.status == "online").size;
    const ocupado = message.guild.members.filter(a => a.presence.status == "dnd").size;
    const ausente = message.guild.members.filter(a => a.presence.status == "idle").size;
    const offline = message.guild.members.filter(a => a.presence.status == "offline").size;
    const bots = message.guild.members.filter(a => a.user.bot).size;
    const totalmembros = message.guild.memberCount;
    const canaistexto = message.guild.channels.filter(a => a.type === "text").size;
    const canaisvoz = message.guild.channels.filter(a => a.type === "voice").size;
    const roles = message.guild.roles.map(r => r).join("\n").replace("@everyone, ", "");
    const inline = '1';
        
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
        .addField(`<:user:500109138953633792> » Membros: [${totalmembros}]`, `<:online:529179015865434132> Online: ${online}\n<:ausente:513046210672590848> Ausente: ${ausente}\n <:ocupado:529178886647578626> Ocupado: ${ocupado}\n <:offline:529178943882788866> Offline: ${offline}\n <:bot:529180656090087424> Bots: ${bots}`, inline)
        .addField(`🛡 » Nivel de verificação:`, message.guild.verificationLevel.toString().replace("0", "Nenhum (sem restrições)").replace("1", "Baixo: Precisa tem um e-mail verificado em sua conta do Discord.").replace("2", "Médio: Também precisa ser registrado no Discord por pelo menos 5 minutos.").replace("3", "Alto: Também precisa ser um membro deste servidor por pelo menos 10 minutos.").replace("4", "Muito alto: Precisa ter um telefone verificado em sua conta do Discord."), inline)
        .addField(`:beginner: » Total de cargos: [${message.guild.roles.size}]`, `Para ver todos os cargos do servidor clique no emoji <a:arrowRight:531248395411521566>`)
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