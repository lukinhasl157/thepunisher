const ytdl = require("ytdl-core-discord");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.google_api_key);
const fetchVideoInfo = require("youtube-info");
const Discord = require("discord.js");
const REGEX_URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i
const checkUrl = (url) => REGEX_URL.test(url)
const musics = require("../utils/queue.js");

module.exports = {
    run: async function (_, message, args) {
        const embed = new Discord.RichEmbed()

        if (!message.member.voiceChannel) {
            return message.channel.send("Por favor, entre em um canal de voz primeiro!");
        } else if (!message.member.voiceChannel.permissionsFor(message.client.user).has("CONNECT")) {
            return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho permissão para entrar neste canal! Permissão requirida: \`\`CONNECT\`\`.`);
        } else if (!message.member.voiceChannel.permissionsFor(message.client.user).has("SPEAK")) {
            return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho permissão para trasmitir áudio neste canal! Permissão requirida: \`\`SPEAK\`\`.`);
        } else if (args.length === 0) {
            return message.channel.send("Insira uma URL do youtube, ou pesquisa uma musica pelo nome");
        } else {
            if (checkUrl(args[0])) {
                message.member.voiceChannel.join().then(async function(connection) {
                    youtube.getVideo(args[0]).then(async function(video) {
                        fetchVideoInfo(video.id).then(async function(videoInfo) {
                            try {
                                const streammusics = connection.playOpusStream(await ytdl(musics.get(message.guild.id).songs[0]));
                                streammusics.setVolumeLogarithmic(musics.get(message.guild.id).volume / 5);
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
                                embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                embed.setColor("#e83127")
                                message.channel.send(embed);
                            } catch(e) {
                                message.channel.send("A URL que você inseriu está inválida.");
                                console.log(e);
                            }
                        });
                    });
                });
            } else {
                youtube.searchVideos(args.join(" "), 5).then(async function(search) {
                    message.channel.send(`Você tem \`\`60s\`\` para escolher um número entre 1 a 5 para selecionar a música correspondente a pesquisa\n[1] - ${search[0].title}\n[2] - ${search[1].title}\n[3] - ${search[2].title}\n[4] - ${search[3].title}\n[5] - ${search[4].title}`).then(async (msg) => {
                        await msg.react("1⃣");
                        await msg.react("2⃣");
                        await msg.react("3⃣");
                        await msg.react("4⃣");
                        await msg.react("5⃣");
                        await msg.react("🇽");

                        const filter = (r, u) => r.me && u.id === message.author.id;
                        const collector = msg.createReactionCollector(filter, { max: 1, time: 60 * 1000 });

                        collector.on("collect", async (r) => {
                            msg.delete();
                            switch (r.emoji.name) {
                                case "1⃣":
                                    fetchVideoInfo(search[0].id).then(async function(videoInfo) {
                                        if (!musics.get(message.guild.id) || musics.get(message.guild.id) == undefined) {
                                            const queueConstruct = {
                                                textChannel: message.channel,
                                                voiceChannel: message.member.voiceChannel,
                                                connection: null,
                                                songs: [],
                                                volume: 5,
                                                playing: true,
                                            };
                                            musics.set(message.guild.id, queueConstruct);
                                            musics.get(message.guild.id).songs.push(videoInfo.url);
        
                                            musics.get(message.guild.id).voiceChannel.playOpusStream(await ytdl(musics.get(message.guild.id).songs[0])).on("end", async (reason) => {
                                                if (reason !== null) {
                                                    musics.get(message.guild.id).songs.shift();
                                                } else {
                                                    musics.get(message.guild.id).voiceChannel.leave();
                                                    musics.delete(message.guild.id);
                                                    await message.channel.send(`A música acabou, saindo do canal \`\`${musics.get(message.guild.id).textChannel.name}...\`\``);
                                                }
                                            });
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
                                            embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                            embed.setColor("#e83127")
                                            musics.get(message.guild.id).textChannel.send(embed);
                                        } else {
                                            if (musics.get(message.guild.id).songs.length > 0) {
                                                musics.get(message.guild.id).songs.push(videoInfo.url);
                                                embed.setThumbnail(videoInfo.thumbnailUrl)
                                                embed.setDescription(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!`)
                                                embed.setColor("#e83127")
                                                musics.get(message.guild.id).textChannel.send(embed);
                                                console.log(musics.get(message.guild.id).songs);
                                            }
                                        }
                                    });
                                break;
                                case "2⃣":
                                    fetchVideoInfo(search[1].id).then(async function(videoInfo) {
                                        if (!musics.get(message.guild.id) || musics.get(message.guild.id) == undefined) {
                                            const queueConstruct = {
                                                textChannel: message.channel,
                                                voiceChannel: message.member.voiceChannel,
                                                connection: null,
                                                songs: [],
                                                volume: 5,
                                                playing: true,
                                            };
                                            musics.set(message.guild.id, queueConstruct);
                                            musics.get(message.guild.id).songs.push(videoInfo.url);
        
                                            musics.get(message.guild.id).voiceChannel.playOpusStream(await ytdl(musics.get(message.guild.id).songs[0])).on("end", async (reason) => {
                                                if (reason !== null) {
                                                    musics.get(message.guild.id).songs.shift();
                                                } else {
                                                    musics.get(message.guild.id).voiceChannel.leave();
                                                    musics.delete(message.guild.id);
                                                    await message.channel.send(`A música acabou, saindo do canal \`\`${musics.get(message.guild.id).textChannel.name}...\`\``);
                                                }
                                            });
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
                                            embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                            embed.setColor("#e83127")
                                            musics.get(message.guild.id).textChannel.send(embed);
                                        } else {
                                            if (musics.get(message.guild.id).songs.length > 0) {
                                                musics.get(message.guild.id).songs.push(videoInfo.url);
                                                embed.setThumbnail(videoInfo.thumbnailUrl)
                                                embed.setDescription(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!`)
                                                embed.setColor("#e83127")
                                                musics.get(message.guild.id).textChannel.send(embed);
                                                console.log(musics.get(message.guild.id).songs);
                                            }
                                        }
                                    });
                                break;
                                case "3⃣":
                                    fetchVideoInfo(search[2].id).then(async function(videoInfo) {
                                        if (!musics.get(message.guild.id) || musics.get(message.guild.id) == undefined) {
                                            const queueConstruct = {
                                                textChannel: message.channel,
                                                voiceChannel: message.member.voiceChannel,
                                                connection: null,
                                                songs: [],
                                                volume: 5,
                                                playing: true,
                                            };
                                            musics.set(message.guild.id, queueConstruct);
                                            musics.get(message.guild.id).songs.push(videoInfo.url);
        
                                            musics.get(message.guild.id).voiceChannel.playOpusStream(await ytdl(musics.get(message.guild.id).songs[0])).on("end", async (reason) => {
                                                if (reason !== null) {
                                                    musics.get(message.guild.id).songs.shift();
                                                } else {
                                                    musics.get(message.guild.id).voiceChannel.leave();
                                                    musics.delete(message.guild.id);
                                                    await message.channel.send(`A música acabou, saindo do canal \`\`${musics.get(message.guild.id).textChannel.name}...\`\``);
                                                }
                                            });
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
                                            embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                            embed.setColor("#e83127")
                                            musics.get(message.guild.id).textChannel.send(embed);
                                        } else {
                                            if (musics.get(message.guild.id).songs.length > 0) {
                                                musics.get(message.guild.id).songs.push(videoInfo.url);
                                                embed.setThumbnail(videoInfo.thumbnailUrl)
                                                embed.setDescription(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!`)
                                                embed.setColor("#e83127")
                                                musics.get(message.guild.id).textChannel.send(embed);
                                                console.log(musics.get(message.guild.id).songs);
                                            }
                                        }
                                    });
                                break;
                                case "4⃣":
                                    fetchVideoInfo(search[3].id).then(async function(videoInfo) {
                                        if (!musics.get(message.guild.id) || musics.get(message.guild.id) == undefined) {
                                            const queueConstruct = {
                                                textChannel: message.channel,
                                                voiceChannel: message.member.voiceChannel,
                                                connection: null,
                                                songs: [],
                                                volume: 5,
                                                playing: true,
                                            };
                                            musics.set(message.guild.id, queueConstruct);
                                            musics.get(message.guild.id).songs.push(videoInfo.url);
        
                                            musics.get(message.guild.id).voiceChannel.playOpusStream(await ytdl(musics.get(message.guild.id).songs[0])).on("end", async (reason) => {
                                                if (reason !== null) {
                                                    musics.get(message.guild.id).songs.shift();
                                                } else {
                                                    musics.get(message.guild.id).voiceChannel.leave();
                                                    musics.delete(message.guild.id);
                                                    await message.channel.send(`A música acabou, saindo do canal \`\`${musics.get(message.guild.id).textChannel.name}...\`\``);
                                                }
                                            });
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
                                            embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                            embed.setColor("#e83127")
                                            musics.get(message.guild.id).textChannel.send(embed);
                                        } else {
                                            if (musics.get(message.guild.id).songs.length > 0) {
                                                musics.get(message.guild.id).songs.push(videoInfo.url);
                                                embed.setThumbnail(videoInfo.thumbnailUrl)
                                                embed.setDescription(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!`)
                                                embed.setColor("#e83127")
                                                musics.get(message.guild.id).textChannel.send(embed);
                                                console.log(musics.get(message.guild.id).songs);
                                            }
                                        }
                                    });
                                break;
                                case "5⃣":
                                    fetchVideoInfo(search[4].id).then(async function(videoInfo) {
                                        if (!musics.get(message.guild.id) || musics.get(message.guild.id) == undefined) {
                                            const queueConstruct = {
                                                textChannel: message.channel,
                                                voiceChannel: message.member.voiceChannel,
                                                connection: null,
                                                songs: [],
                                                volume: 5,
                                                playing: true,
                                            };
                                            musics.set(message.guild.id, queueConstruct);
                                            musics.get(message.guild.id).songs.push(videoInfo.url);
        
                                            musics.get(message.guild.id).voiceChannel.playOpusStream(await ytdl(musics.get(message.guild.id).songs[0])).on("end", async (reason) => {
                                                if (reason !== null) {
                                                    musics.get(message.guild.id).songs.shift();
                                                } else {
                                                    musics.get(message.guild.id).voiceChannel.leave();
                                                    musics.delete(message.guild.id);
                                                    await message.channel.send(`A música acabou, saindo do canal \`\`${musics.get(message.guild.id).textChannel.name}...\`\``);
                                                }
                                            });
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
                                            embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                            embed.setColor("#e83127")
                                            musics.get(message.guild.id).textChannel.send(embed);
                                        } else {
                                            if (musics.get(message.guild.id).songs.length > 0) {
                                                musics.get(message.guild.id).songs.push(videoInfo.url);
                                                embed.setThumbnail(videoInfo.thumbnailUrl)
                                                embed.setDescription(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!`)
                                                embed.setColor("#e83127")
                                                musics.get(message.guild.id).textChannel.send(embed);
                                                console.log(musics.get(message.guild.id).songs);
                                            }
                                        }
                                    });
                                break;
                                case "🇽":
                                    message.channel.send("A seleção de música foi cancelada com sucesso!");
                                break;
                            } 
                        });
                    });
                });
            }
        }
    },
    aliases: ["tocar"],
    category: "Música",
    description: "Tocar uma música"
}