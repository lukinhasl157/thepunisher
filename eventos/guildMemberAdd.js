const Discord = require("discord.js");

module.exports = {
	run: async function(member) {

		try {
		let channel = member.guild.channels.find(ch => ch.name === "🎉entrou");
		let category = member.guild.channels.find(ch => ch.name === "👾ENTRADA/SAIDA");
		const embed = new Discord.RichEmbed()
      	.setColor("#3fdb20")
      	.setThumbnail(member.user.avatarURL)
      	.setDescription(`${member}, bem vindo(a)! ao servidor :tada:`)
      	.addField('Você é o membro de número:', member.guild.memberCount)
      	.setTimestamp(new Date())
      	.setFooter(member.guild.name, member.guild.iconURL)

    		if (!member.guild.me.hasPermission("MANAGE_CHANNELS")) {
				return;
			} else if (!category && !channel) {
				category = await member.guild.createChannel("👾ENTRADA/SAIDA", "category");
				channel = await member.guild.createChannel("🎉entrou", "text" [{
					id: member.guild.id,
					deny: ["SEND_MESSAGES"],
					allow: ["ADD_REACTIONS", "VIEW_CHANNEL"]
				}]);
				await channel.setParent(category.id);
				await member.send(embed)
				.catch(() => {
					return;
				});
				const msg = await channel.send(embed);
				await msg.react("🎉");
				await msg.react(":bemvindo:523560019841515520");
			} else {
				if (channel && category) {
					const m = await channel.send(embed);
					await m.react("🎉");
					await m.react(":bemvindo:523560019841515520");
					member.send(embed)
					.catch(() => {
						return;
					});
				}
			}
		} catch(e) {
			const channel = this.channels.find(ch => ch.name === "❌logs-de-erros-the-punisher");
			console.log(e)
			channel.send(`Ocorreu um erro no evento **guildMemberAdd** | Servidor ${member.guild.name}. Erro: ${e}`)
		}
	}
}