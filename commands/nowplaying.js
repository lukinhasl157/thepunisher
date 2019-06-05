const musics = require("../utils/queue.js");
const Discord = require("discord.js");
const fetchVideoInfo = require("youtube-info");
module.exports = {
	run: async function(_, message, args) {
		const serverQueue = musics.get(message.guild.id);

		if (!message.member.voiceChannel || message.member.voiceChannel !== message.guild.me.voiceChannel) {
			return message.channel.send("Você precisa estar no mesmo canal de voz que eu para poder ver a fila de músicas.");
		} else if (!serverQueue) {
			return message.channel.send("Não há nenhuma música tocando no momento.");
		} else {
			fetchVideoInfo(serverQueue.queue[0].id).then(function(videoInfo) {
				message.channel.send(new Discord.RichEmbed()
					.setDescription(`Tocando agora: [${videoInfo.title}](${videoInfo.url})\nMúsica adicionada por: ${serverQueue.queue[0].author.username}`)
					.setColor("#e83127")
					.setThumbnail(videoInfo.thumbnailUrl)
				);
			});
		}
	},
	aliases: ["np", "tocando"],
	category: "Música",
	description: "Mostrar as informações da música que está tocando"
}