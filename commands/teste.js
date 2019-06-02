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
        } else if (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel) {
            return message.channel.send("Desculpe, eu já estou tocando uma música em outro canal de voz.")
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
                                const streammusics = connection.playOpusStream(await ytdl(data.songs[0]));
                                streammusics.setVolumeLogarithmic(data.volume / 5);
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
                                        const data = musics.get(message.guild.id) || {};
                                        if (!data || data == undefined) {
                                            const queueConstruct = {
                                                textChannel: [],
                                                voiceChannel: [],
                                                connection: await message.member.voiceChannel.join(),
                                                guildID: message.guild.id,
                                                songs: {
                                                    url: [],
                                                    title: [],
                                                    author: []
                                                },
                                                volume: 5,
                                                playing: true,
                                            };
                                            musics.set(message.guild.id, queueConstruct);
                                            data.songs.url.push(videoInfo.url);
                                            data.songs.title.push(videoInfo.title);
                                            data.songs.author.push(message.author.id);
                                            data.textChannel.push(message.channel.id);
                                            data.voiceChannel.push(message.member.voiceChannel.id);
        
                                            const dispatcher = data.connection.playOpusStream(await ytdl(data.songs.url[0]));
                                            dispatcher.on("start", () => {
                                                data.dispatcher.player.streamingData.pausedTime = 0;
                                            }).on("error", console.error);
    
                                            dispatcher.on("end", async () => {
                                                const fetched = musics.get(dispatcher.guildID);
                                                fetched.songs.url.shift();
                                                fetched.songs.title.shift();
                                                fetched.songs.author.shift();
                                                fetched.voiceChannel.shift();
                                                fetched.textChannel.shift();
    
                                                if (fetched.songs.url.length > 0) {
                                                    musics.set(dispatcher.guildID, fetched);
                                                    const textChannelEntry = client.guilds.get(dispatcher.guildID).channels.get(textChannel[0]);
                                                    embed.setDescription(`Tocando agora [${fetched.songs.title[0]}](${fetched.songs.url[0]}). A música foi adicionada por: ${message.gufetched.songs.author[0]}\nPara ver a fila de músicas digite ${process.env.prefix}queue`)
                                                    embed.setColor("#e83127")
                                                    textChannelEntry.send(embed);
                                                } else {
                                                    const textChannelLeave = client.guilds.get(dispatcher.guildID).channels.get(textChannel[0]);
                                                    textChannelLeave.send(`As músicas acabaram e fila foi finalizada. Saindo do canal \`\`${textChannelLeave.name}...\`\``);
                                                    musics.delete(dispatcher.guildID);
                                                    const voiceChannelLeave = client.guilds.get(dispatcher.guildID).me.voiceChannel;
                                                    if (voiceChannelLeave) {
                                                        voiceChannelLeave.leave();
                                                    }
                                                }
                                            }).on("error", console.error);
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
                                        } else {
                                            embed.setDescription(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!\nPara ver todas as músicas da fila digite: ${process.env.prefix}queue`);
                                            embed.setThumbnail(videoInfo.thumbnailUrl)
                                            embed.setColor("#e83127")
                                            message.channel.send(embed);
                                        }
                                    });
                                break;
                                case "2⃣":
                                    fetchVideoInfo(search[1].id).then(async function(videoInfo) {
                                        if (!data || data == undefined) {
                                            const queueConstruct = {
                                                textChannel: message.channel,
                                                voiceChannel: message.member.voiceChannel,
                                                connection: null,
                                                songs: [],
                                                volume: 5,
                                                playing: true,
                                            };
                                            musics.set(message.guild.id, queueConstruct);
                                            data.songs.url.push(videoInfo.url);
        
                                            data.voiceChannel.join().then(async function(connection) {
                                                connection.playOpusStream(await ytdl(data.songs[0])).on("end", async (reason) => {
                                                    if (reason !== null) {
                                                        data.songs.shift();
                                                    } else {
                                                        data.voiceChannel.leave();
                                                        musics.delete(message.guild.id);
                                                        await message.channel.send(`A música acabou, saindo do canal \`\`${data.textChannel.name}...\`\``);
                                                    }
                                                });
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
                                            data.textChannel.send(embed);
                                        } else {
                                            if (data.songs.length > 0) {
                                                data.songs.url.push(videoInfo.url);
                                                embed.setThumbnail(videoInfo.thumbnailUrl)
                                                embed.setDescription(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!`)
                                                embed.setColor("#e83127")
                                                data.textChannel.send(embed);
                                                console.log(data.songs);
                                            }
                                        }
                                    });
                                break;
                                case "3⃣":
                                    fetchVideoInfo(search[2].id).then(async function(videoInfo) {
                                        if (!data || data == undefined) {
                                            const queueConstruct = {
                                                textChannel: message.channel,
                                                voiceChannel: message.member.voiceChannel,
                                                connection: null,
                                                songs: [],
                                                volume: 5,
                                                playing: true,
                                            };
                                            musics.set(message.guild.id, queueConstruct);
                                            data.songs.url.push(videoInfo.url);
        
                                            data.voiceChannel.join().then(async function(connection) {
                                                connection.playOpusStream(await ytdl(data.songs[0])).on("end", async (reason) => {
                                                    if (reason !== null) {
                                                        data.songs.shift();
                                                    } else {
                                                        data.voiceChannel.leave();
                                                        musics.delete(message.guild.id);
                                                        await message.channel.send(`A música acabou, saindo do canal \`\`${data.textChannel.name}...\`\``);
                                                    }
                                                });
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
                                            data.textChannel.send(embed);
                                        } else {
                                            if (data.songs.length > 0) {
                                                data.songs.url.push(videoInfo.url);
                                                embed.setThumbnail(videoInfo.thumbnailUrl)
                                                embed.setDescription(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!`)
                                                embed.setColor("#e83127")
                                                data.textChannel.send(embed);
                                                console.log(data.songs);
                                            }
                                        }
                                    });
                                break;
                                case "4⃣":
                                    fetchVideoInfo(search[3].id).then(async function(videoInfo) {
                                        if (!data || data == undefined) {
                                            const queueConstruct = {
                                                textChannel: message.channel,
                                                voiceChannel: message.member.voiceChannel,
                                                connection: null,
                                                songs: [],
                                                volume: 5,
                                                playing: true,
                                            };
                                            musics.set(message.guild.id, queueConstruct);
                                            data.songs.url.push(videoInfo.url);
        
                                            data.voiceChannel.join().then(async function(connection) {
                                                connection.playOpusStream(await ytdl(data.songs[0])).on("end", async (reason) => {
                                                    if (reason !== null) {
                                                        data.songs.shift();
                                                    } else {
                                                        data.voiceChannel.leave();
                                                        musics.delete(message.guild.id);
                                                        await message.channel.send(`A música acabou, saindo do canal \`\`${data.textChannel.name}...\`\``);
                                                    }
                                                });
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
                                            data.textChannel.send(embed);
                                        } else {
                                            if (data.songs.length > 0) {
                                                data.songs.url.push(videoInfo.url);
                                                embed.setThumbnail(videoInfo.thumbnailUrl)
                                                embed.setDescription(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!`)
                                                embed.setColor("#e83127")
                                                data.textChannel.send(embed);
                                                console.log(data.songs);
                                            }
                                        }
                                    });
                                break;
                                case "5⃣":
                                    fetchVideoInfo(search[4].id).then(async function(videoInfo) {
                                        if (!data || data == undefined) {
                                            const queueConstruct = {
                                                textChannel: message.channel,
                                                voiceChannel: message.member.voiceChannel,
                                                connection: null,
                                                songs: [],
                                                volume: 5,
                                                playing: true,
                                            };
                                            musics.set(message.guild.id, queueConstruct);
                                            data.songs.url.push(videoInfo.url);
        
                                            data.voiceChannel.join().then(async function(connection) {
                                                connection.playOpusStream(await ytdl(data.songs[0])).on("end", async (reason) => {
                                                    if (reason !== null) {
                                                        data.songs.shift();
                                                    } else {
                                                        data.voiceChannel.leave();
                                                        musics.delete(message.guild.id);
                                                        await message.channel.send(`A música acabou, saindo do canal \`\`${data.textChannel.name}...\`\``);
                                                    }
                                                });
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
                                            data.textChannel.send(embed);
                                        } else {
                                            if (data.songs.length > 0) {
                                                data.songs.url.push(videoInfo.url);
                                                embed.setThumbnail(videoInfo.thumbnailUrl)
                                                embed.setDescription(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!`)
                                                embed.setColor("#e83127")
                                                data.textChannel.send(embed);
                                                console.log(data.songs);
                                            }
                                        }
                                    });
                                break;
                                case "🇽":
                                    message.channel.send("a seleção de música foi cancelada com sucesso!");
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