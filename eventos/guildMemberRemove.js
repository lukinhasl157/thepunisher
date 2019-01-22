const Discord = require("discord.js");

module.exports = {
	run: async function(member) {

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
    	
    		if (!member.guild.me.hasPermission("MANAGE_CHANNELS")) {
    			return;
			} else if (!category && !channel) {
				category = await member.guild.createChannel("👾ENTRADA/SAIDA", "category");
				channel = await member.guild.createChannel("🎉saiu", "text" [{
					id: member.guild.id,
					deny: ["SEND_MESSAGES"],
					allow: ["ADD_REACTIONS", "VIEW_CHANNEL"]
				}]);
				channel.setParent(category.id);
				await channel.send(embed);
				await member.send(embed)
				.catch(() => {
					return;
				});
			} else {
				channel.setParent(category.id);
				channel.send(embed);
				member.send(embed)
				.catch(() => {
					return;
				});
			}
		} catch(e) {
			const channel = this.channels.find(ch => ch.name === "❌logs-de-erros-the-punisher");
			channel.send(`Ocorreu um erro no evento **guildMemberAdd** | Servidor ${member.guild.name}. Erro: ${e}`)
		}	
	}
}