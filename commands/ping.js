const Discord = require("discord.js");

module.exports = {
	run: async function(bot, message, args) {

		try {

  let msg = await message.channel.send("Calculando a latência...");

   	setTimeout(() => {
  	msg.edit(new Discord.RichEmbed().setDescription(`:ping_pong: Pong! **${message.author.username}**, a latência do bot é \`\`${msg.createdTimestamp - message.createdTimestamp}ms.\`\` A lantência da API é \`\`${Math.round(bot.ping)}ms.\`\` <:wifi2:501137858250145810>`).setImage("https://cdn.discordapp.com/attachments/507638961447895050/510135398501187604/pingpong.gif").setColor("#ff0000").setTimestamp(new Date()).setFooter(message.author.tag, message.author.displayAvatarURL));
	}, 2000)

   } catch(e) {
   		message.channel.send(`**${message.author.username}**, deu merda quando tentei executar o comando **ping**. ${e}`)
   }

   	return this.name;

    },
	aliases: ["pg", "lantencia", "ms"],
	category: "Utilidades",
	description: "Mostrar a lantência do bot."
}
