const firebase = require("firebase");
const database = firebase.database();
module.exports = {
	run: async function(member) {

		const eventRef = await database.ref(`Servidores/${member.guild.id}/Eventos/guildMemberAdd`);
		eventRef.once("value").then(async function(event) {
			if (event.val() == true) {
				member.guild.channels.get(member.guild.channels.first().id).send("Bem-vindo" + member)
			} else {
				if (event.val() == false) {
					return;
				}
			}
		});
	}
}