const Discord = require("discord.js");

module.exports = {
	run: async function(member) {

			if (!member.guild.me.hasPermission("MANAGE_CHANNELS")) {
				return;
			}

		try {

		let channel = member.guild.channels.find(ch => ch.name === "🎉saiu");
		let category = member.guild.channels.find(ch => ch.name === "👾ENTRADA/SAIDA")

		const embed = new Discord.RichEmbed()
      	.setColor("#3fdb20")
      	.setThumbnail(member.user.avatarURL)
      	.setDescription(`${member}, saiu do servidor.`)
      	.addField('Atualmente temos:', member.guild.memberCount)
      	.setTimestamp(new Date())
      	.setFooter(member.guild.name, member.guild.iconURL)
    	
			if (!category || category.type !== "category" || category.name !== "👾ENTRADA/SAIDA") {
				category = await member.guild.createChannel("👾ENTRADA/SAIDA", "category");
			} else if (!channel || channel.name !== "🎉saiu") {
				channel = await member.guild.createChannel("🎉bem-vindos", "text" [{
					id: member.guild.id,
					deny: ["SEND_MESSAGES"],
					allow: ["ADD_REACTIONS", "VIEW_CHANNEL"]
				}]);
				await channel.setParent(category.id);
				await member.send(embed).catch(e => {
					if (e.code === "Cannot send messages to this user") {
						return;
					} else {
						console.log(e);
					}
				});
				let msg = await channel.send(embed);
				await msg.react("🎉");
				await msg.react(":bemvindo:523560019841515520");
			} else {
				channel.setParent(category.id);
				let m = await channel.send(embed);
				await m.react("🎉");
				await m.react(":bemvindo:523560019841515520");
				member.send(embed);
			}

		} catch(e) {
			const channel = this.channels.find(ch => ch.name === "❌logs-de-erros-the-punisher");
			channel.send(`Ocorreu um erro no evento **guildMemberAdd** | Servidor ${member.guild.name}. Erro: ${e}`)
		}	

	}
}