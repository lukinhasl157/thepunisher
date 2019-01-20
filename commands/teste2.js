const Discord = require("discord.js");
module.exports = {
	run: async function(bot, message, args) {

		const embed = new Discord.RichEmbed()
		.setDescription("Categorias\n \nDiversao\nAdministração etc...")
		let msg = await message.author.send(embed);
    	await msg.react("👌");

			const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === 'someID'
			const collector = message.createReactionCollector(filter, { time: 60 * 1000 });
				collector.on('collect', async r => {
					const embed2 = new Discord.RichEmbed()
					.setDescription("Moderação\n \nban\nkick\nclear etc...")
					await msg.edit(embed2);
				});
	}
}