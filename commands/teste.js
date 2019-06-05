const ytdl = require("ytdl-core-discord");
const Youtube = require("simple-youtube-api");
const yt = new Youtube(process.env.google_api_key);
const fetchVideoInfo = require("youtube-info");
const Discord = require("discord.js");
const musics = require("../utils/queue.js");

module.exports = {
    run: async function (bot, message, args) {
			const embed = new Discord.RichEmbed()

			if (!message.member.voiceChannel) {
				return message.channel.send("Por favor, entre em um canal de voz primeiro!");
			} else if (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel) {
				return message.channel.send("Desculpe, eu já estou tocando uma música em outro canal de voz.")
			} else if (!message.member.voiceChannel.permissionsFor(bot.user).has("CONNECT")) {
				return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho permissão para entrar neste canal! Permissão requirida: \`\`CONNECT\`\`.`);
			} else if (!message.member.voiceChannel.permissionsFor(bot.user).has("SPEAK")) {
				return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho permissão para trasmitir áudio neste canal! Permissão requirida: \`\`SPEAK\`\`.`);
			} else if (args.length === 0) {
				return message.channel.send("Insira uma URL do youtube, ou pesquisa uma musica pelo nome");
			} else {       
				try {
					const serverQueue = musics.get(message.guild.id) || {};

					if (!serverQueue.queue) {
						serverQueue.queue = [];
						serverQueue.guildID = message.guild.id;
					}
					const check = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;

					if (args[0].match(check)) {
						const playlist = await yt.getPlaylist(args[0]);
						const videos = await playlist.getVideos();

						for (let i = 0; i < videos.length; i++){
							serverQueue.queue.push({
								name: videos[i].title,
								id: videos[i].id,
								author: message.author,
								url: videos[i].url,
								resumed: null,
								votes: false,
								channelTitle: videos[i].channel.title,
								textChannel: message.channel.id
							});
						}

						if (!serverQueue.connection) {
							serverQueue.connection = await message.member.voiceChannel.join();
						}

						if (!serverQueue.dispatcher) {
							await play(bot, musics, serverQueue);
						} else {
							fetchVideoInfo(playlist.id).then(async function(PlaylistInfo) {
								embed.setDescription(`A música [${PlaylistInfo.title}](https://www.youtube.com/playlist?list=${PlaylistInfo.id}) foi adicionada a fila com sucesso!`)
								embed.setThumbnail(PlaylistInfo.thumbnailUrl)
								embed.setColor("#e83127")
								message.channel.send(embed);
							});
						}
					}

					if (!args[0].match(check)) {
						const search = await yt.searchVideos(args.join(" "), 5);
						let choose;
						message.channel.send(`Você tem \`\`60s\`\` para escolher um número entre 1 a 5 para selecionar a música correspondente a pesquisa\n[1] - ${search[0].title}\n[2] - ${search[1].title}\n[3] - ${search[2].title}\n[4] - ${search[3].title}\n[5] - ${search[4].title}`).then(async (msg) => {
							await msg.react("1⃣");
							await msg.react("2⃣");
							await msg.react("3⃣");
							await msg.react("4⃣");
							await msg.react("5⃣");
							await msg.react("❌");

							const filter = (r, u) => r.me && u.id === message.author.id;
							const collector = msg.createReactionCollector(filter, {max: 1, time: 60 * 1000 });

							collector.on('collect', async (r) => {
									msg.delete();
									
									switch (r.emoji.name) {
										case "1⃣":
											choose = search[0];
										break;
										case "2⃣":
											choose = search[1];
										break;
										case "3⃣":
											choose = search[2];
										break;
										case "4⃣":
											choose = search[3];
										break;
										case "5⃣":
											choose = search[4];
										break;
										case "❌":
											message.channel.send("A seleção da música foi cancelada com sucesso!");
										break;
									}
									
									serverQueue.queue.push({
										name: choose.title,
										author: message.author,
										id: choose.id,
										url: choose.url,
										resumed: null,
										channelTitle: choose.channel.title,
										votes: false,
										textChannel: message.channel.id
									});

									if (!serverQueue.connection) {
										serverQueue.connection = await message.member.voiceChannel.join();
									}
									if (!serverQueue.dispatcher) {
										await play(bot, musics, serverQueue);
									} else {
										fetchVideoInfo(serverQueue.queue.slice(-1)[0].id).then(async function (videoInfo) {
											embed.setDescription(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!`)
											embed.setThumbnail(videoInfo.thumbnailUrl)
											embed.setColor("#e83127")
											message.channel.send(embed);
										});
									}
							});
						});
					}
					musics.set(message.guild.id, serverQueue);
				} catch(e) {
					console.log(e);
					if (e.code && e.code == 403) {
						message.channel.send("O limite de requisições da API foi atingido.");
					}
				}
			}
			
			async function play(bot, musics, serverQueue){
				serverQueue.dispatcher = await serverQueue.connection.playOpusStream(await ytdl(serverQueue.queue[0].url));
				serverQueue.dispatcher.on('start', () => {
					serverQueue.dispatcher.player.streamingData.pausedTime = 0;
				});

				serverQueue.dispatcher.guildID = serverQueue.guildID;
				
				serverQueue.dispatcher.on('end', async (reason) => {
					console.log('Musica finalizada! razão = '+reason);
					finish(bot, musics, this);
						
				}).on('error', console.error);

				if (serverQueue.dispatcher) {
					fetchVideoInfo(serverQueue.queue[0].id).then(async function(videoInfo) {
						embed.addField("📀Música", `[${videoInfo.title}](${videoInfo.url})`)
						embed.addField("🎧Canal", `[${videoInfo.owner}](https://youtube.com/channel/${videoInfo.channelId})`)
						embed.addField("📈Visualizações", videoInfo.views, true)
						embed.addField("📝Comentários", videoInfo.commentCount, true)
						embed.addField("👍Likes", videoInfo.likeCount, true)
						embed.addField("👎Dislikes", videoInfo.dislikeCount, true)
						embed.addField("⏰Duração da música", videoInfo.duration, true)
						embed.addField("🎭Gênero", videoInfo.genre, true)
						embed.setThumbnail(videoInfo.thumbnailUrl)
						embed.setTimestamp(new Date())
						embed.setFooter(`Musica solicitada por ${serverQueue.queue[0].author.tag}`, serverQueue.queue[0].author.avatarURL)
						embed.setColor("#e83127")
						bot.channels.get(serverQueue.queue[0].textChannel).send(embed);
					});
				}
			}
			
			function finish(bot, musics, serverQueue) {
				try {
					const fetched = queue.get(serverQueue.dispatcher.guildID);
					fetched.queue.shift();

					if (fetched.queue.length > 0) {
						musics.set(serverQueue.dispatcher.guildID, fetched);
						console.log("Musica passada =>" + fetched.queue[0].name);
						play(bot, musics, fetched);
					} else {
						bot.channels.get(fetched.queue[0].textChannel).send("A músicas acabaram e a fila foi limpa.");
						musics.delete(message.guild.id);
						const voiceChannelLeave = bot.guilds.get(fetched.guildID).me.voiceChannel;
						if (voiceChannelLeave) {
							voiceChannelLeave.leave();
							console.log("Queue finalizada");
						}
					}
				} catch(e) {
					console.log(e);
				}
			}
    },
  aliases: ["tocar"],
  category: "Música",
  description: "Tocar uma música"
}