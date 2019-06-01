const ytdl = require("ytdl-core-discord");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.google_api_key);
const fetchVideoInfo = require("youtube-info");
const Discord = require("discord.js");
const REGEX_URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i
const checkUrl = (url) => REGEX_URL.test(url)
const queue = require("../utils/queue");
const serverQueue = queue.get(message.guild.id);

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
                                const streamQueue = connection.playOpusStream(await ytdl(serverQueue.songs[0]));
                                streamQueue.setVolumeLogarithmic(serverQueue.volume / 5);
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

                        async function play() {
                            message.member.voiceChannel.join().then(async function(connection) {
                                fetchVideoInfo(search[0].id).then(async function(videoInfo) {
                                    if (!serverQueue || serverQueue == undefined) {
                                        const queueConstruct = {
                                            textChannel: message.channel,
                                            voiceChannel: message.member.voiceChannel,
                                            connection: null,
                                            songs: [],
                                            volume: 5,
                                            playing: true,
                                        };
                                        queue.set(message.guild.id, queueConstruct);
                                        serverQueue.songs.push(videoInfo.url);

                                        connection.playOpusStream(await ytdl(serverQueue.songs[0])).on("end", async (reason) => {
                                            if (reason !== null) {
                                                serverQueue.songs.shift();
                                            } else {
                                                serverQueue.voiceChannel.leave();
                                                queue.delete(message.guild.id);
                                                await message.channel.send(`A música acabou, saindo do canal \`\`${serverQueue.textChannel.name}...\`\``);
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
                                        serverQueue.textChannel.send(embed);
                                    } else {
                                        if (serverQueue.songs.length > 0) {
                                            serverQueue.songs.push(videoInfo.url);
                                            message.channel.send(`A música [${videoInfo.title}](${videoInfo.url}) foi adicionada a fila com sucesso!`);
                                        }
                                    }
                                });
                            });
                        }

                        collector.on("collect", async (r) => {
                            msg.delete();
                            switch (r.emoji.name) {
                                case "1⃣":
                                    play(search[0]);
                                break;
                                case "2⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[1].id).then(async function(videoInfo) {
                                            if (!serverQueue || serverQueue == "") {
                                                queue.set(message.guild.id, queueConstruct);
                                                serverQueue.songs.push(videoInfo.url);
                                                console.log(serverQueue.songs);
                                                const stream3 = connection.playOpusStream(await ytdl(serverQueue.songs[0]));
                                                streamQueue.setVolumeLogarithmic(serverQueue.volume / 5);
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
                                                stream3.on("end", async (reason) => {
                                                    if (reason === "Stream is not generating quickly enough.") {
                                                        serverQueue.textChannel.leave();
                                                        queue.delete(message.guild.id);
                                                        await message.channel.send(`A música terminou, saindo do canal \`\`${serverQueue.textChannel.name}\`\``);
                                                    } else {
                                                        console.log(reason);
                                                    }
                                                    serverQueue.songs.shift();
                                                });
                                            } else {
                                                if (serverQueue) {
                                                    serverQueue.songs.push(videoInfo.url);
                                                    message.channel.send("A música foi adicionada a fila com sucesso!");
                                                    console.log(serverQueue.songs);
                                                }
                                            }
                                        });
                                    });
                                break;
                                case "3⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[2].id).then(async function(videoInfo) {
                                            if (!serverQueue || serverQueue == "") {
                                                queue.set(message.guild.id, queueConstruct);
                                                serverQueue.songs.push(videoInfo.url);
                                                console.log(serverQueue.songs);
                                                const stream4 = connection.playOpusStream(await ytdl(serverQueue.songs[0]));
                                                streamQueue.setVolumeLogarithmic(serverQueue.volume / 5);
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
                                                stream4.on("end", async (reason) => {
                                                    if (reason === "Stream is not generating quickly enough.") {
                                                        serverQueue.textChannel.leave();
                                                        queue.delete(message.guild.id);
                                                        await message.channel.send(`A música terminou, saindo do canal \`\`${serverQueue.textChannel.name}\`\``);
                                                    } else {
                                                        console.log(reason);
                                                    }
                                                    serverQueue.songs.shift();
                                                });
                                            } else {
                                                if (serverQueue) {
                                                    serverQueue.songs.push(videoInfo.url);
                                                    message.channel.send("A música foi adicionada a fila com sucesso!");
                                                    console.log(serverQueue.songs);
                                                }
                                            }
                                        });
                                    });
                                break;
                                case "4⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[3].id).then(async function(videoInfo) {
                                            if (!serverQueue || serverQueue == "") {
                                                queue.set(message.guild.id, queueConstruct);
                                                serverQueue.songs.push(videoInfo.url);
                                                console.log(serverQueue.songs);
                                                const stream5 = connection.playOpusStream(await ytdl(serverQueue.songs[0]));
                                                streamQueue.setVolumeLogarithmic(serverQueue.volume / 5);
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
                                                stream5.on("end", async (reason) => {
                                                    if (reason === "Stream is not generating quickly enough.") {
                                                        serverQueue.textChannel.leave();
                                                        queue.delete(message.guild.id);
                                                        await message.channel.send(`A música terminou, saindo do canal \`\`${serverQueue.textChannel.name}\`\``);
                                                    } else {
                                                        console.log(reason);
                                                    }
                                                    serverQueue.songs.shift();
                                                });
                                            } else {
                                                if (serverQueue) {
                                                    serverQueue.songs.push(videoInfo.url);
                                                    message.channel.send("A música foi adicionada a fila com sucesso!");
                                                    console.log(serverQueue.songs);
                                                }
                                            }
                                        });
                                    });
                                break;
                                case "5⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[4].id).then(async function(videoInfo) {
                                            if (!serverQueue || serverQueue == "") {
                                                queue.set(message.guild.id, queueConstruct);
                                                serverQueue.songs.push(videoInfo.url);
                                                console.log(serverQueue.songs);
                                                const stream6 = connection.playOpusStream(await ytdl(serverQueue.songs[0]));
                                                streamQueue.setVolumeLogarithmic(serverQueue.volume / 5);
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
                                                stream6.on("end", async (reason) => {
                                                    if (reason === "Stream is not generating quickly enough.") {
                                                        serverQueue.textChannel.leave();
                                                        queue.delete(message.guild.id);
                                                        await message.channel.send(`A música terminou, saindo do canal \`\`${serverQueue.textChannel.name}\`\``);
                                                    } else {
                                                        console.log(reason);
                                                    }
                                                    serverQueue.songs.shift();
                                                });
                                            } else {
                                                if (serverQueue) {
                                                    serverQueue.songs.push(videoInfo.url);
                                                    message.channel.send("A música foi adicionada a fila com sucesso!");
                                                    console.log(serverQueue.songs);
                                                }
                                            }
                                        });
                                    });
                                break;
                                case "🇽":
                                    message.channel.send("Seleção de músicas cancelada com sucesso!");
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