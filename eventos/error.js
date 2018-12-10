module.exports = {
	run: async function (error) {

		let channel = this.guilds.get("515877819914518529").find(ch => ch.name === "❌logs-de-erros-the-punisher");

		if (!channel) {
			channel = await this.guilds.get("515877819914518529").createChannel("❌logs-de-erros-the-punisher", "text");
		}

		if (channel) {
			channel.send(`Ocorreu um erro: ${error}.`);
		}

	}
}