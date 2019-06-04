module.exports = {
	run: async function(member) {

		if (!["515877819914518529", "463182372259627018"].includes(member.guild.id)) {
			return false;
		}

		let roleCaptcha = member.guild.roles.find((r) => r.name === "Captcha");
		if (!roleCaptcha) {
			role = await member.guild.createRole({
				name: "Captcha",
				color: "RED",
				permissions: [
					"ADD_REACTIONS",
					"READ_MESSAGE_HISTORY",
					"VIEW_CHANNEL"
				]
			});
		}
		member.addRole(roleCaptcha);

		let channel = member.guild.channels.find((ch) => ch.name === `captcha-${member.id}`);
		if (!channel) {
			channel = await member.guild.createChannel(`captcha-${member.id}`, "text");
		}

		channel.overwritePermissions(roleCaptcha, {
			READ_MESSAGE_HISTORY: true,
			VIEW_CHANNEL: true,
			SEND_MESSAGES: false,
			ADD_REACTIONS: true
		});

		let msg = await channel.send(`» Olá **${member.user.username}** | Esta é uma mensagem para nós verificarmos se você é um rôbo, caso não seja um robô clique no emoji <:correto:505155063963058187>, ou se você quiser sair do servidor clique no emoji <:negado:505155029636874250>`);
		await msg.react(":correto:505155063963058187");
		await msg.react(":negado:505155029636874250");

		const filter = (r, m) => r.me && m.id === member.id;
		const collector = msg.createReactionCollector(filter, { max: 1 });
		const roleVerified = member.guild.roles.find((r) => r.name === "Verificado");

		async function forEachChannels() {
			member.guild.channels.forEach(async (channel) => {
				await channel.overwritePermissions(roleVerified, {
					ADD_REACTIONS: true,
					READ_MESSAGE_HISTORY: true,
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					EMBED_LINKS: true,
					ATTACH_FILES: true,
					EXTERNAL_EMOJIS: true,
					CONNECT: true,
					SPEAK: true,
				});
			});
			member.removeRole(roleCaptcha);
			channel.delete();
			member.addRole(roleVerified);
			member.send(`» **${member.user.username}** | Você foi verificado com sucesso, agora você pode interagir no servidor.😜`)
		}

		collector.on("collect", async (r) => {
			switch(r.emoji.id) {
				case "505155063963058187":
					if (!roleVerified) {
						roleVerified = await member.guild.createRole({
							name: "Verificado",
							color: "GREEN",
							permissions: [
								"ADD_REACTIONS",
								"READ_MESSAGE_HISTORY",
								"VIEW_CHANNEL",
								"SEND_MESSAGES",
								"EMBED_LINKS",
								"ATTACH_FILES",
								"EXTERNAL_EMOJIS",
								"CONNECT",
								"SPEAK",
								"CHANGE_NICKNAME"
							]
						});
						forEachChannels();
					} else {
						if (roleVerified) {
							forEachChannels();
						}
					}
				break;
				case "505155029636874250":
					member.send(`» **${member.user.username}** | Que pena que não quis se juntar ao nosso servidor, espero que um dia você volte.😜`);
					member.kick("O usuário não quis juntar-se ao nosso servidor.");
				break;
			}
		});
	}
}