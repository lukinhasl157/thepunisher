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
                const search = youtube.searchVideos(args.join(" "), 5);
                message.channel.send(`Você tem \`\`60s\`\` para escolher um número entre 1 a 5 para selecionar a música correspondente a pesquisa\n[1] - ${search[0].title}\n[2] - ${search[1].title}\n[3] - ${search[2].title}\n[4] - ${search[3].title}\n[5] - ${search[4].title}`).then(async (msg) => {
                    await msg.react("1⃣");
                    await msg.react("2⃣");
                    await msg.react("3⃣");
                    await msg.react("4⃣");
                    await msg.react("5⃣");
                    await msg.react("🇽");

                    const filter = (r, u) => r.me && u.id === message.author.id;
                    const collector = msg.createReactionCollector(filter, { max: 1, time: 60 * 1000 });

                    async function allfunc(bot, musics, serverQueue, search) {
                        const serverQueue = musics.get(message.guild.id) || {};

                        if (!serverQueue.connection) {
                            serverQueue.connection = await message.member.voiceChannel.join();
                        }
            
                        if (!serverQueue.songs) {
                            serverQueue.songs = [];
                            serverQueue.guildID = message.guild.id;
                        }
                        
                        serverQueue.songs.push({
                            title: search[0].title,
                            author: message.author,
                            channel: search[0].channel.title,
                            date: search[0].publishedAt.toLocaleDateString(),
                            textChannel: message.channel.id,
                            url: search[0].url
                        });

                        if (!serverQueue.dispatcher) {
                            play(bot, musics, serverQueue);
                        } else {
                            message.channel.send(`A música [${serverQueue.songs.slice(-1)[0].title}](${serverQueue.songs.slice(-1)[0].url}) foi adicionada a fila com sucesso!`);
                        }
                        musics.set(message.guild.id, serverQueue);

                        async function play(bot, musics, serverQueue) {
                            serverQueue.dispatcher = message.member.voiceChannel.join().playOpusStream(await ytdl(serverQueue.songs.url[0]));

                            serverQueue.dispatcher.on("start", () => {
                                serverQueue.dispatcher.player.streamingData.pausedTime = 0;
                            });

                            serverQueue.dispatcher.guildID = serverQueue.guildID;

                            dispatcher.on("end", (reason) => {
                                console.log(`A música ${serverQueue.songs[0].title} foi finalizada. Motivo: ${reason}`);
                                finish(bot, musics, this)
                            }).on("error", console.error);

                            if (serverQueue.dispatcher) {
                                fetchVideoInfo(serverQueue.songs[0].url).then(async function(videoInfo) {
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
                                    bot.channels.get(serverQueue.songs[0].textChannel).send(embed);
                                });
                            }
                        }

                        async function finish(bot, musics, dispatcher) {
                            const fetched = musics.get(dispatcher.guildID);

                            fetched.songs.shift();

                            if (fetched.songs.length > 0) {
                                musics.set(dispatcher.guildID, fetched);
                                console.log(`A música ${fetched.songs[0].title} foi pulada`);
                                play(bot, musics, fetched)
                            } else {
                                const textChannelMsg = bot.guilds.get(dispatcher.guildID).channels.get(fetched.songs[0].textChannel);
                                const voiceChannelLeave = bot.guilds.get(dispatcher.guildID).me.voiceChannel;
                                textChannelMsg.send(`As músicas acabaram e fila foi finalizada. Estou saindo do canal \`\`${textChannelMsg.name}...\`\``);
                                musics.delete(dispatcher.guildID);
                                if (voiceChannelLeave) {
                                    voiceChannelLeave.leave();
                                }

                            }
                        }
                    }

                    collector.on("collect", async (r) => {
                        msg.delete();
                        switch (r.emoji.name) {
                            case "1⃣":
                                allfunc(search[0]);
                            break;
                            case "2⃣":
                                allfunc(search[1]);
                            break;
                            case "3⃣":
                                allfunc(search[2]);
                            break;
                            case "4⃣":
                                allfunc(search[3]);
                            break;
                            case "5⃣":
                                allfunc(search[4]);
                            break;
                            case "🇽":
                                message.channel.send("A seleção de música foi cancelada com sucesso!");
                            break;
                        }
                    });
                });
            }
        }
    },
    aliases: ["tocar"],
    category: "Música",
    description: "Tocar uma música"
}