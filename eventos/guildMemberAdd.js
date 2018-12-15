const Discord = require("discord.js");

module.exports = {
	run: async function(member) {

		let channel = member.guild.channels.find(ch => ch.name === "🎉bem-vindos");
		let category = member.guild.channles.find(c => c.name === "👾entrada/saida");

		let embed = new Discord.RichEmbed()
      	.setColor("#3fdb20")
      	.setThumbnail(member.user.avatarURL)
      	.setDescription(`${member}, bem vindo(a)! ao servidor :tada:`)
      	.addField('Você é o membro de número:', member.guild.memberCount)
      	.setTimestamp(new Date())
      	.setFooter(member.guild.name, member.guild.iconURL)
    	
    	let embed2 = new Discord.RichEmbed()
    	.setColor("#3fdb20")
      	.setThumbnail(member.user.avatarURL)
      	.setDescription(`${member}, bem vindo(a)! ao servidor :tada:`)
      	.addField('Você é o membro de número:', member.guild.memberCount)
      	.setTimestamp(new Date())
      	.setFooter(member.guild.name, member.guild.iconURL)

			if (!channel || !category || category.type !== "category") {

				category = await member.guild.createChannel("👾entrada/saida", "category");
				channel = await member.guild.createChannel("🎉bem-vindos", "text");
				await channel.setParent(category.id);
				await member.send(embed2)
				let carai = await channel.send(embed);
				await carai.react("🎉");

			} else {

				member.send(embed2);
				let carai2 = channel.send(embed);
				carai2.react("🎉");
			}

	}
}