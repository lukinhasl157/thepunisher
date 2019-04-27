module.exports = {
	run: async function(member) {
		member.guild.channels.get(member.guild.channels.first().id).send("Bem-vindo" + member)
	}
}