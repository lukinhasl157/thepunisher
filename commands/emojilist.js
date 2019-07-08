const Discord = require("discord.js");
module.exports = {
	run: async ({ message }) => {
		const emojisAnimated = message.guild.emojis.filter((e) => e.animated).map((e) => e.toString()).join(" ");
		const emojis = message.guild.emojis.filter((e) => !e.animated).map((e) => e.toString()).join(" ")

		if (emojis.length > 2000) {
			const embed = new Discord.RichEmbed()
				.setDescription(emojis.slice(1024))
				.setColor("#e83127");
			const msg = await message.channel.send(embed);

			await msg.react("⬅");
			await msg.react("➡");
	
			const filter = (r, u) => r.me && u.id == message.author.id;
			const collector = msg.createReactionCollector(filter, { time: 60 * 1000 });
	
			collector.on("collect", async (r) => {
				switch(r.emoji.name) {
					case "⬅":
						const embed2 = new Discord.RichEmbed()
							.setDescription("Emojis animados:", emojisAnimated)
							.setColor("#e83127")
						msg.edit(embed2);
					break;
					case "➡":
						const embed3 = new Discord.RichEmbed()
							.setAuthor("Emojis normais " + message.guild.name)
							.setDescription(emojisAnimated)
							.setColor("#e83127")
						msg.edit(embed3);
					break;
					case "⬅":
						msg.edit(embed);
					break;
				}
			});
		} else {

		}
	},
	aliases: ["emojis", "emotes", "emotelist"],
	category: "Utilidades",
	description: "Mostar a lista de emojis do servidor."
}
    