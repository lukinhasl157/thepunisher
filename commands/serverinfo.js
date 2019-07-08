const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = {
    run: async function ({ message }) {

    const verificationGuild = {
        "0": "Nenhum (sem restrições)",
        "1": "Baixo: Precisa tem um e-mail verificado em sua conta do Discord.",
        "2": "Médio: Também precisa ser registrado no Discord por pelo menos 5 minutos.",
        "3": "Alto: Também precisa ser um membro deste servidor por pelo menos 10 minutos.",
        "4": "Muito alto: Precisa ter um telefone verificado em sua conta do Discord."
		}
    const online = message.guild.members.filter((m) => m.presence.status == "online").size;
    const ocupado = message.guild.members.filter((m) => m.presence.status == "dnd").size;
    const ausente = message.guild.members.filter((m) => m.presence.status == "idle").size;
    const offline = message.guild.members.filter((m) => m.presence.status == "offline").size;
    const bots = message.guild.members.filter((b) => b.user.bot).size;
    const allMembers = message.guild.memberCount;
		const roles = message.guild.roles.filter((r) => r.id !== message.guild.id);

    let embed = new Discord.RichEmbed()
			embed.setAuthor(`» ${message.guild.name}`, `${message.guild.iconURL}`)
			embed.setColor("#FF0000")
			embed.addField(':crown: » Dono:', `<@${message.guild.ownerID}>`, true)
			embed.addField(":joy: » Total de Emojis:", `${message.guild.emojis.size.toLocaleString()}`, true)
			embed.addField(":file_cabinet: » ID do servidor:", message.guild.id, true)
			embed.addField(`<:canal:513884866455273494> » Total de canais: [${message.guild.channels.size.toLocaleString()}]`, `<:text:535162253604028417> Texto: ${message.guild.channels.filter((ch) => ch.type == "text").size.toLocaleString()}\n<:voice:535162220057985033> Voz: ${message.guild.channels.filter((ch) => ch.type == "voice").size.toLocaleString()}`, true)
			embed.addField(":zzz: » Canal afk", `${message.guild.afkChannel ? message.guild.afkChannel.name : "Nenhum canal afk."}`, true) 
			embed.addField("<:world:500147421641310229> » Região:", message.guild.region.toString().replace("brazil", ":flag_br: Brasil"), true)
			embed.addField("<:fast:500147391945768981> » Tempo afk", `${message.guild.afkTimeout} segundos`, true)
			embed.addField(`<:user:500109138953633792> » Membros: [${allMembers.toLocaleString()}]`, `<:online:535161741873643531> Online: ${online.toLocaleString()}\n<:ausente:535161866415112192> Ausente: ${ausente.toLocaleString()}\n <:ocupado:535161952075251742> Ocupado: ${ocupado.toLocaleString()}\n <:offline:535161911956996104> Offline: ${offline.toLocaleString()}\n<:bots:535162824301740042> Bots: ${bots.toLocaleString()}`, false)
			embed.addField(`🛡 » Nivel de verificação:`, verificationGuild[message.guild.verificationLevel], false)

			if (embed.fields[10].value.length > 1024) {
				await msg.react("◀");
				await msg.react("▶");
				const filter = (reaction, user) => reaction.me && user.id === message.author.id;
				const collector = msg.createReactionCollector(filter, {time: 60 * 1000});
				collector.on("collect", (reaction) => {
					switch(reaction.emoji.name) {
						case "▶":
							const embed2 = new Discord.RichEmbed()
								.addField(`:beginner: » Total de cargos: [${roles.size}]`, roles.map((r) => r).join(", "))
								.setThumbnail(message.guild.iconURL)
								.setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.avatarURL)
							message.channel.send(embed2);
						break;
						case "◀":
							msg.edit(embed);
						break;
					}
				});
			} else {
				embed.addField(`:beginner: » Total de cargos: [${roles.size}]`, roles.map((r) => r).join(", "), false)
				embed.setThumbnail(message.guild.iconURL)
				embed.setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.avatarURL)
				message.channel.send(embed);
			}

  },
    aliases: ["si", "server", "servidor"],
    category: "Moderação",
    description: "Mostrar as informações do servidor."
}
        