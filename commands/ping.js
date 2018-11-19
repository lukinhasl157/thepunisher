const Discord = require("discord.js");

module.exports = {
	run: async function(bot, message, args) {

  let msg = await mesage.channel.send("Calculando a latência...");

   	setTimeout(() => {
  	msg.edit(`:ping_pong: Pong! **${message.author.username}**, a latência do bot é \`\`${msg.createdTimestamp - message.createdTimestamp}ms.\`\` A lantência da API é \`\`${Math.round(bot.ping)}ms.\`\` <:wifi2:501137858250145810>`);
	}, 2000).catch(e => message.channel.send(`Deu merda quando tentei executar o comando ping. Erro: ${e}`);

    
   	return this.name;

    },
	aliases: ["pg", "lantencia", "ms"],
	category: "Utilidades",
	description: "Mostrar a lantência do bot."
}
