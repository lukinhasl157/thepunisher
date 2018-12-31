const Discord = require("discord.js");

module.exports = {
	run: async function(member) {

			if (!member.guild.me.hasPermission("MANAGE_CHANNELS")) {
				return;
			}

		try {

		let channel = member.guild.channels.find(ch => ch.name === "🎉bem-vindos");
		let category = member.guild.channels.find(c => c.name === "👾entrada/saida");

		let embed = new Discord.RichEmbed()
      	.setColor("#3fdb20")
      	.setThumbnail(member.user.avatarURL)
      	.setDescription(`${member}, bem vindo(a)! ao servidor :tada:`)
      	.addField('Você é o membro de número:', member.guild.memberCount)
      	.setTimestamp(new Date())
      	.setFooter(member.guild.name, member.guild.iconURL)
    	
			if (!channel || !category || category.type !== "category") {

				category = await member.guild.createChannel("👾entrada/saida", "category");
				channel = await member.guild.createChannel("🎉bem-vindos", "text" [{
					id: member.guild.id,
					deny: ["SEND_MESSAGES"],
					allow: ["ADD_REACTIONS", "VIEW_CHANNEL"]
				}])

				await channel.setParent(category.id);
				await member.send(embed)
				let carai = await channel.send(embed);
				await carai.react("🎉");
				await carai.react(":bemvindo:523560019841515520");

			} else {

				member.send(embed);
				channel.send(embed).then(async porra => {
				await porra.react("🎉");
				await porra.react(":bemvindo:523560019841515520");

				})
			}

		} catch(e) {

			let channel = this.channels.find(ch => ch.name === "❌logs-de-erros-the-punisher");
			
			channel.send(`Ocorreu um erro no evento **guildMemberAdd** | Servidor ${member.guild.name}. Erro: ${e}`)
		
		}	

	}
}