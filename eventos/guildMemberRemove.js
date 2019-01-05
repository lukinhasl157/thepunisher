const Discord = require("discord.js");

module.exports = {
	run: async function(member) {

			if (!member.guild.me.hasPermission("MANAGE_CHANNELS")) {
				return;
			}

		try {

		let channel = member.guild.channels.find(ch => ch.name === "🎊saida");
		let category = member.guild.channels.find(ch => ch.name === "👾entrada/saida");

		const embed = new Discord.RichEmbed()
      	.setColor("#3fdb20")
      	.setThumbnail(member.user.avatarURL)
      	.setDescription(`${member}, saiu do servidor.`)
      	.addField('Atualmente temos:', member.guild.memberCount)
      	.setTimestamp(new Date())
      	.setFooter(member.guild.name, member.guild.iconURL)
    	
			if (!channel || !category || category.type !== "category" || category.name !== "👾entrada/saida") {
				category = await member.guild.createChannel("👾entrada/saida", "category");
				channel = await member.guild.createChannel("🎊saida", "text" [{
					id: member.guild.id,
					deny: ["SEND_MESSAGES"],
					allow: ["VIEW_CHANNEL", "ADD_REACTIONS"]
				}]);
				await channel.setParent(category.id);
				await member.send(embed);
				let msg = await channel.send(embed);
				await msg.react("🎉");
				await msg.react(":bemvindo:523560019841515520");
			} else {
				channel.setParent(category.id);
				channel.send(embed);
			}

		} catch(e) {
			const channel = this.channels.find(ch => ch.name === "❌logs-de-erros-the-punisher");
			channel.send(`Ocorreu um erro no evento **guildMemberAdd** | Servidor ${member.guild.name}. Erro: ${e}`)
		}	

	}
}