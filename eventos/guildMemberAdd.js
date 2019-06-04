module.exports = {
	run: async function(member) {

		const role = member.guild.roles.find((r) => r.name === "captchaTeste");
		member.addRole(role);

		const channel = member.guild.channels.find((r) => r.name === "captchateste");
		channel.send("teste").then(async function(msg) {
			await msg.react("😜");

			const filter = (r, u) => r.me && u.id === member.id;
			const collector = msg.createReactionCollector(filter, { max: 1 });

			collector.on("collect", async (r) => {
				switch (r.emoji.name) {
					case "😜":
						member.removeRole(role);
				}
			});
		});
	}
}