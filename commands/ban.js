
module.exports = {
	run: async function (bot, message, args) {

	try {

		//gif ban the punisher https://media.giphy.com/media/1Xe14KOTgtL86EGBXU/giphy.gif

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`» **${message.author.username}** | Por favor, insira o id ou mencione o usuário que deseja banir.`);

        let reason = args.slice(1).join(" ");
        if (!reason) 
            return message.channel.send(`» **${message.author.username}** | Por favor, insira um motivo para banir este usuário.`);

		let msg = await message.channel.send(`» **${message.author.username}** | Você tem certeza de banir o usuário ${member} pelo motivo: **${reason}** ? Se **SIM**, clique no emoji <:correto:505155063963058187> para bani-lo. Se **NÃO** clique no emoji <:negado:505155029636874250> para cancelar esta ação.`);
            await msg.react(":correto:505155063963058187");
			await msg.react(":negado:505155029636874250");

            	    const filter = (r, u) => r.me && u.id === message.author.id;
    				const collector = msg.createReactionCollector(filter, {time: 60000 });

            		collector.on("collect", r => {

                        r.remove(message.author.id);
                        msg.delete();

            			switch (r._emoji.name) {
            				case "correto":

                            if (!message.member.hasPermission("BAN_MEMBERS"))
                                return message.channel.send(`» **${message.author.username}** | Desculpe você não tem permissão para executar este comando! Permissão requirida: **BAN_MEMBERS**.`);

                            if (!member.bannable) 
                                return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho as permissões necessárias para banir este usuário!`);
            					member.send(`» **${member.user.username}** | Você foi banido por **${message.author.username}**. » Motivo: ${reason}.`);
                                
            					member.ban(reason);
            					msg.channel.send(`» O usuário **${member.user.username} ID:** \`\`${member.user.id}\`\` | Foi banido com sucesso. <:correto:505155063963058187>`);
            				break;

            				case "negado":
            					msg.channel.send(`» A acão de banimento do usuário **${member.user.username} ID:** \`\`${member.user.id}\`\` | Foi cancelada com sucesso. <:negado:505155029636874250>`);
            				break;

            			}

            		});         			

  } catch(e) {
        console.log(e);
    }

  },
    aliases: ["banir", "punir"],
    category: "Moderação",
    description: "Banir um usuário."
 }


