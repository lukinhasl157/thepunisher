const ytdl = require("ytdl-core-discord");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.google_api_key);
const fetchVideoInfo = require("youtube-info");
const Discord = require("discord.js");
const REGEX_URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i
const checkUrl = (url) => REGEX_URL.test(url)

module.exports = {
    run: async function (_, message, args, queue) {
        const queueConstruct = {
            songs: {
                url: [],
                title: [],
                id: [],
                author: []
            }
        };
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
                            if (!queue) {
                                queue.set(message.guild.id, queueConstruct);
                                queueConstruct.songs.url.push(videoInfo.url);
                                queueConstruct.songs.tile.push(videoInfo.title);
                                queueConstruct.songs.id.push(videoInfo.videoId);
                                queueConstruct.songs.author.push(videoInfo.url);
                            } else {
                                queueConstruct.songs.url.push(videoInfo.url);
                                queueConstruct.songs.tile.push(videoInfo.title);
                                queueConstruct.songs.id.push(videoInfo.videoId);
                                queueConstruct.songs.author.push(videoInfo.url);
                                try {
                                    const stream = connection.playOpusStream(await ytdl(queue.get(songs[0].url)));
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
                                    stream.on('end', async () => {
                                        await message.member.voiceChannel.leave();
                                        await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                        queue.songs.shift();
                                    });
                                } catch(e) {
                                    message.channel.send("A URL que você inseriu está inválida.");
                                    console.log(e);
                                }
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

                        const filter = (r, u) => r.me && u.id === message.author.id;
                        const collector = msg.createReactionCollector(filter, {max: 1, time: 60 * 1000 });

                        collector.on("collect", async (r) => {
                            msg.delete();
                            switch (r.emoji.name) {
                                case "1⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[0].id).then(async function(videoInfo) {
                                            if (!queue) {
                                                queue.set(message.guild.id, queueConstruct);
                                                queueConstruct.songs.url.push(videoInfo.url);
                                                queueConstruct.songs.title.push(videoInfo.title);
                                                queueConstruct.songs.id.push(videoInfo.videoId);
                                                queueConstruct.songs.author.push(videoInfo.url);
                                            } else {
                                                queueConstruct.songs.url.push(videoInfo.url);
                                                queueConstruct.songs.title.push(videoInfo.title);
                                                queueConstruct.songs.id.push(videoInfo.videoId);
                                                queueConstruct.songs.author.push(videoInfo.url);
                                                const stream2 = connection.playOpusStream(await ytdl(queueConstruct.songs.url[0]));
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
                                                stream2.on('end', async () => {
                                                    await message.member.voiceChannel.leave();
                                                    await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                                    queueConstruct.songs.url.shift();
                                                });
                                            }
                                        });
                                    });
                                break;
                                case "2⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[1].id).then(async function(videoInfo) {
                                            if (!queue) {
                                                queue.set(message.guild.id, queueConstruct);
                                                queueConstruct.songs.url.push(videoInfo.url);
                                                queueConstruct.songs.tile.push(videoInfo.title);
                                                queueConstruct.songs.id.push(videoInfo.videoId);
                                                queueConstruct.songs.author.push(videoInfo.url);
                                            } else {
                                                queue.songs.url.push(videoInfo.url);
                                                queue.songs.title.push(videoInfo.title);
                                                queue.songs.id.push(videoInfo.videoId);
                                                queue.songs.author.push(message.author.id);
                                                const stream3 = connection.playOpusStream(await ytdl(queue.get(songs[0].url)));
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
                                                stream3.on('end', async () => {
                                                    await message.member.voiceChannel.leave();
                                                    await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                                    queue.songs.shift();
                                                });
                                            }
                                        });
                                    });
                                break;
                                case "3⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[2].id).then(async function(videoInfo) {
                                            if (!queue) {
                                                queue.set(message.guild.id, queueConstruct);
                                                queueConstruct.songs.url.push(videoInfo.url);
                                                queueConstruct.songs.tile.push(videoInfo.title);
                                                queueConstruct.songs.id.push(videoInfo.videoId);
                                                queueConstruct.songs.author.push(videoInfo.url);
                                            } else {
                                                queue.songs.url.push(videoInfo.url);
                                                queue.songs.title.push(videoInfo.title);
                                                queue.songs.id.push(videoInfo.videoId);
                                                queue.songs.author.push(message.author.id);
                                                const stream4 = connection.playOpusStream(await ytdl(queue.get(songs[0].url)));
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
                                                stream4.on('end', async () => {
                                                    await message.member.voiceChannel.leave();
                                                    await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                                    queue.songs.shift();
                                                });
                                            }
                                        });
                                    });
                                break;
                                case "4⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[3].id).then(async function(videoInfo) {
                                            if (!queue) {
                                                queue.set(message.guild.id, queueConstruct);
                                                queueConstruct.songs.url.push(videoInfo.url);
                                                queueConstruct.songs.tile.push(videoInfo.title);
                                                queueConstruct.songs.id.push(videoInfo.videoId);
                                                queueConstruct.songs.author.push(videoInfo.url);
                                            } else {
                                                queue.songs.url.push(videoInfo.url);
                                                queue.songs.title.push(videoInfo.title);
                                                queue.songs.id.push(videoInfo.videoId);
                                                queue.songs.author.push(message.author.id);
                                                const stream5 = connection.playOpusStream(await ytdl(queue.get(songs[0].url)));
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
                                                stream5.on('end', async () => {
                                                    await message.member.voiceChannel.leave();
                                                    await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                                    queue.songs.shift();
                                                });
                                            }
                                        });
                                    });
                                break;
                                case "5⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[4].id).then(async function(videoInfo) {
                                            if (!queue) {
                                                queue.set(message.guild.id, queueConstruct);
                                                queueConstruct.songs.url.push(videoInfo.url);
                                                queueConstruct.songs.tile.push(videoInfo.title);
                                                queueConstruct.songs.id.push(videoInfo.videoId);
                                                queueConstruct.songs.author.push(videoInfo.url);
                                            } else {
                                                queue.songs.url.push(videoInfo.url);
                                                queue.songs.title.push(videoInfo.title);
                                                queue.songs.id.push(videoInfo.videoId);
                                                queue.songs.author.push(message.author.id);
                                                const stream6 = connection.playOpusStream(await ytdl(queue.get(songs[0].url)));
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
                                                message.channel.send(embed);;
                                                stream6.on('end', async () => {
                                                    await message.member.voiceChannel.leave();
                                                    await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                                    queue.songs.shift();
                                                });
                                            }
                                        });
                                    });
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