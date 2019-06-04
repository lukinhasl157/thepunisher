module.exports = {
	run: async function(member) {

		member.guild.createRole({
			name: "Captcha Teste",
			color: "RED",
			permissions: [
				"ADD_REACTIONS",
				"READ_MESSAGE_HISTORY",
				"VIEW_CHANNEL"
			]
		});
		
		const role = await member.guild.roles.find((r) => r.name === "Captcha Teste");
		member.addRole(role);


		let channel = member.guild.channels.find((ch) => ch.name === `captcha-${member.id}`);
		if (!channel) {
			channel = await member.guild.createChannel(`captcha-${member.id}`, "text");
		}

		channel.overwritePermissions(role, {
			READ_MESSAGE_HISTORY: true,
			VIEW_CHANNEL: true,
			SEND_MESSAGES: false,
			ADD_REACTIONS: true
		});

		let msg = await channel.send("Teste");
		await msg.react("😜");

		const filter = (r, u) => r.emoji.name === "😜" && u.id === member.id;
		const collector = msg.createReactionCollector(filter, { max: 1 });

		collector.on("collect", async (r) => {
			let roleVerified = member.guild.roles.find((r) => r.name === "Verificado");
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
			}
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

			member.remove(role)
			member.addRole(roleVerified);
			category.delete();
			member.send("Você foi verificado com sucesso! Agora você pode interagir no servidor.");		
		});
	}
}