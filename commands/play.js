const ytdl = require("ytdl-core-discord");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.google_api_key);
let fetchVideoInfo = require("youtube-info");
const Discord = require("discord.js");
module.exports = {
    run: async function (bot, message, args) {
        const REGEX_URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i
        const checkUrl = (url) => REGEX_URL.test(url)
        let embed = new Discord.RichEmbed()

        if (!message.member.voiceChannel) {
            return message.channel.send("Por favor, entre em um canal de voz primeiro!");
        /*} else if (!message.guild.me.hasPermission("CONNECT")) {
            return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho permissão para entrar neste canal! Permissão requirida: \`\`CONNECT\`\`.`);
        } else if (!message.guild.me.hasPermission("SPEAK")) {
            return message.channel.send(`» **${message.author.username}** | Desculpe, eu não tenho permissão para trasmitir áudio neste canal! Permissão requirida: \`\`SPEAK\`\`.`);*/
        } else if (args.length === 0) {
            return message.channel.send("Insira uma URL do youtube, ou pesquisa uma musica pelo nome");
        } else {
            if (checkUrl(args[0])) {
                message.member.voiceChannel.join().then(async function(connection) {
                    const stream = connection.playOpusStream(await ytdl(args[0]));
                    youtube.getVideo(args[0]).then(async function(video) {
                        fetchVideoInfo(video.id).then(async function(videoInfo) {
                            if (video) {
                                embed.addField("📀Música", `[${videoInfo.title}](${videoInfo.url})`)
                                embed.addField("🎧Canal", `[${videoInfo.owner}](https://youtube.com/channel/${videoInfo.channelId})`)
                                embed.addField("⏰Duração da música", videoInfo.duration)
                                embed.addField("📈Visualizações", videoInfo.views, true)
                                embed.addField("📝Comentários", videoInfo.commentCount, true)
                                embed.addField("👍Likes", videoInfo.likeCount, true)
                                embed.addField("👎Dislikes", videoInfo.dislikeCount, true)
                                embed.addField("🎭Gênero", videoInfo.genre)
                                embed.setThumbnail(videoInfo.thumbnailUrl)
                                embed.setTimestamp(new Date())
                                embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                embed.setColor("#e83127")
                                message.channel.send(embed);
                                stream.on('end', async () => {
                                    await message.member.voiceChannel.leave();
                                    await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                });
                            } else {
                                return message.channel.send("A URL que você inseriu está inválida.")
                            }
                        });
                    });
                });
            } else {
                youtube.searchVideos(args.join(" "), 5).then(async function(search) {
                    message.channel.send(new Discord.RichEmbed()
                        .addField("Resultados da pesquisa por", args.join(" "))
                        .addField("Você tem 60s para escolher um número entre 1 e 5 para selecionar a música correspondente a pesquisa", `1: ${search[0].title}\n2: ${search[1].title}\n3: ${search[2].title}\n4: ${search[3].title}\n5: ${search[4].title}`)
                        .setColor("#e83127")
                    ).then(async (msg) => {
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
                                            const stream2 = connection.playOpusStream(await ytdl(search[0].url));
                                            embed.addField("📀Música", `[${videoInfo.title}](${videoInfo.url})`)
                                            embed.addField("🎧Canal", `[${videoInfo.owner}](https://youtube.com/channel/${videoInfo.channelId})`)
                                            embed.addField("⏰Duração da música", videoInfo.duration)
                                            embed.addField("📈Visualizações", videoInfo.views, true)
                                            embed.addField("📝Comentários", videoInfo.commentCount, true)
                                            embed.addField("👍Likes", videoInfo.likeCount, true)
                                            embed.addField("👎Dislikes", videoInfo.dislikeCount, true)
                                            embed.addField("🎭Gênero", videoInfo.genre)
                                            embed.setThumbnail(videoInfo.thumbnailUrl)
                                            embed.setTimestamp(new Date())
                                            embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                            embed.setColor("#e83127")
                                            message.channel.send(embed);
                                            stream2.on('end', async () => {
                                                await message.member.voiceChannel.leave();
                                                await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                            });
                                        });
                                    });
                                break;
                                case "2⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[1].id).then(async function(videoInfo) {
                                            const stream3 = connection.playOpusStream(await ytdl(search[0].url));
                                            embed.addField("📀Música", `[${videoInfo.title}](${videoInfo.url})`)
                                            embed.addField("🎧Canal", `[${videoInfo.owner}](https://youtube.com/channel/${videoInfo.channelId})`)
                                            embed.addField("⏰Duração da música", videoInfo.duration)
                                            embed.addField("📈Visualizações", videoInfo.views, true)
                                            embed.addField("📝Comentários", videoInfo.commentCount, true)
                                            embed.addField("👍Likes", videoInfo.likeCount, true)
                                            embed.addField("👎Dislikes", videoInfo.dislikeCount, true)
                                            embed.addField("🎭Gênero", videoInfo.genre)
                                            embed.setThumbnail(videoInfo.thumbnailUrl)
                                            embed.setTimestamp(new Date())
                                            embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                            embed.setColor("#e83127")
                                            message.channel.send(embed);
                                            stream3.on('end', async () => {
                                                await message.member.voiceChannel.leave();
                                                await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                            });
                                        });
                                    });
                                break;
                                case "3⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[2].id).then(async function(videoInfo) {
                                            const stream4 = connection.playOpusStream(await ytdl(search[2].url));
                                            embed.addField("📀Música", `[${videoInfo.title}](${videoInfo.url})`)
                                            embed.addField("🎧Canal", `[${videoInfo.owner}](https://youtube.com/channel/${videoInfo.channelId})`)
                                            embed.addField("⏰Duração da música", videoInfo.duration)
                                            embed.addField("📈Visualizações", videoInfo.views, true)
                                            embed.addField("📝Comentários", videoInfo.commentCount, true)
                                            embed.addField("👍Likes", videoInfo.likeCount, true)
                                            embed.addField("👎Dislikes", videoInfo.dislikeCount, true)
                                            embed.addField("🎭Gênero", videoInfo.genre)
                                            embed.setThumbnail(videoInfo.thumbnailUrl)
                                            embed.setTimestamp(new Date())
                                            embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                            embed.setColor("#e83127")
                                            message.channel.send(embed);
                                            stream4.on('end', async () => {
                                                await message.member.voiceChannel.leave();
                                                await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                            });
                                        });
                                    });
                                break;
                                case "4⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[3].id).then(async function(videoInfo) {
                                            const stream5 = connection.playOpusStream(await ytdl(search[3].url));
                                            embed.addField("📀Música", `[${videoInfo.title}](${videoInfo.url})`)
                                            embed.addField("🎧Canal", `[${videoInfo.owner}](https://youtube.com/channel/${videoInfo.channelId})`)
                                            embed.addField("⏰Duração da música", videoInfo.duration)
                                            embed.addField("📈Visualizações", videoInfo.views, true)
                                            embed.addField("📝Comentários", videoInfo.commentCount, true)
                                            embed.addField("👍Likes", videoInfo.likeCount, true)
                                            embed.addField("👎Dislikes", videoInfo.dislikeCount, true)
                                            embed.addField("🎭Gênero", videoInfo.genre)
                                            embed.setThumbnail(videoInfo.thumbnailUrl)
                                            embed.setTimestamp(new Date())
                                            embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                            embed.setColor("#e83127")
                                            message.channel.send(embed);
                                            stream5.on('end', async () => {
                                                await message.member.voiceChannel.leave();
                                                await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                            });
                                        });
                                    });
                                break;
                                case "5⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[4].id).then(async function(videoInfo) {
                                            const stream6 = connection.playOpusStream(await ytdl(search[4].url));
                                            embed.addField("📀Música", `[${videoInfo.title}](${videoInfo.url})`)
                                            embed.addField("🎧Canal", `[${videoInfo.owner}](https://youtube.com/channel/${videoInfo.channelId})`)
                                            embed.addField("⏰Duração da música", videoInfo.duration)
                                            embed.addField("📈Visualizações", videoInfo.views, true)
                                            embed.addField("📝Comentários", videoInfo.commentCount, true)
                                            embed.addField("👍Likes", videoInfo.likeCount, true)
                                            embed.addField("👎Dislikes", videoInfo.dislikeCount, true)
                                            embed.addField("🎭Gênero", videoInfo.genre)
                                            embed.setThumbnail(videoInfo.thumbnailUrl)
                                            embed.setTimestamp(new Date())
                                            embed.setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                            embed.setColor("#e83127")
                                            message.channel.send(embed);;
                                            stream6.on('end', async () => {
                                                await message.member.voiceChannel.leave();
                                                await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                            });
                                        });
                                    });
                                break;
                            } 
                        });
                    });
                });
            }
        }
    }
}
