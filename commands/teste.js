
module.exports = {
	run: async function (bot, message, args) {

		var member = message.mentions.members.first() || message.guild.members.get(args[0]);
		var reason = args.slice(1).join(" ");

		if (!message.member.hasPermission("BAN_MEMBERS")) {
			return message.channel.send(`» **${message.author.username}** | Desculpe você não tem permissão para executar este comando! Permissão requirida: **BAN_MEMBERS**.`);
		}
		
		if (!member) {
			return message.channel.send(`» **${message.author.username}** | Por favor, insira o id ou mencione o usuário que deseja banir.`);
		}

		if (!reason) {
			return message.channel.send(`» **${message.author.username}** | Por favor, insira um motivo para banir este usuário.`);
		}

		if (!member.bannable) {
      		return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho as permissões necessárias para banir este usuário!`);
      	}

		let msg = await message.channel.send(`» **${message.author.username}** | Você tem certeza de banir o usuário ${member} pelo motivo: **${reason}** ? Se **SIM**, clique no emoji ✅ para bani-lo. Se **NÃO** clique no emoji ❌ para cancelar esta ação.`);
			await msg.react("✅");
            await msg.react("❌");	

            	    const filter = (reaction) => reaction.emoji.name === `✅` && member.id === message.author.id;
    				const collector = msg.createReactionCollector(filter, {time: 60000 });

            		collector.on("collect", r => {
            			r.remove(message.author.id);
            			member.ban(reason);
            			msg.delete();
            			msg.channel.send(`» O usuário **${member.user.username}** ID: \`\`${member.user.id}\`\`| Foi banido com sucesso. :correto:505155063963058187`);
            		})

            	    const filter2 = (reaction) => reaction.emoji.name === `❌` && member.id === message.author.id;
    				const collector2 = msg.createReactionCollector(filter2, {time: 60000 });

            		collector2.on("collect", r => {
            			r.remove(message.author.id);
            			msg.delete();
            			msg.channel.send(`» A acão de banimento do usuário **${member.user.username}** ID: \`\`${member.user.id}\`\` | Foi cancelada com sucesso. :negado:505155029636874250`) 
            	})

	},
		aliases: [""],
		category: "Moderação",
		description: "teste"
	}