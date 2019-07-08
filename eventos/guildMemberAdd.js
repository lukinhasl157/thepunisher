const Guilds = require("../utils/model.js");
module.exports = {
	run: async function(member) {
		const db = await Guilds.findOne({ _id: member.guild.id });
		if (db.events.get("guildMemberAdd").antiBot.status && member.user.bot) {
			return member.kick("O modo antiBots está ativado.");
		}
	}
}