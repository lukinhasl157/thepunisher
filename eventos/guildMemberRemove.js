const Discord = require("discord.js");

module.exports = {
	run: async function(member) {

			if (!member.guild.me.hasPermission("MANAGE_CHANNELS")) {
				return;
			}

		try {

		let channel = member.guild.channels.find(ch => ch.name === "🎊saida");
		let category = member.guild.channels.find(c => c.name === "👾entrada/saida");

		let embed = new Discord.RichEmbed()
      	.setColor("#3fdb20")
      	.setThumbnail(member.user.avatarURL)
      	.setDescription(`${member}, saiu do servidor.`)
      	.addField('Atualmente temos:', member.guild.memberCount)
      	.setTimestamp(new Date())
      	.setFooter(member.guild.name, member.guild.iconURL)
    	
			if (!channel || !category || category.type !== "category") {

				category = await member.guild.createChannel("👾entrada/saida", "category");
				channel = await member.guild.createChannel("🎊saida", "text" [{
					id: member.guild.id,
					deny: ["SEND_MESSAGES"],
					allow: ["VIEW_CHANNEL", "ADD_REACTIONS"]
				}])
				await channel.setParent(category.id);
				await member.send(embed);
				let carai = await channel.send(embed);
				await carai.react("🎉");
				await carai.react(":bemvindo:523560019841515520");
			} else if (channel || category || category.type === "category" || category.name === "👾entrada/saida") {

				channel.setParent(category.id);
				channel.send(embed);
			} else {

				channel.send(embed);
			}

		} catch(e) {

			let channel = this.channels.find(ch => ch.name === "❌logs-de-erros-the-punisher");
			
			channel.send(`Ocorreu um erro no evento **guildMemberAdd** | Servidor ${member.guild.name}. Erro: ${e}`)
		
		}	

	}
}