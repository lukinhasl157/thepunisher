module.exports = {
	run: async function (message) {

		let channel = this.channels.find(ch => ch.name === "❌logs-de-erros-the-punisher");

		if (!channel) {
			channel = await message.guild.createChannel("❌logs-de-erros-the-punisher", "text");
		}

		if (channel) {
			channel.send(`Ocorreu um erro ao executar um comando. Servidor: ${message.guild.name}. Executor: **${message.author.username}**. Erro: ${e}.`);
		}

	}
}