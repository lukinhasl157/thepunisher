const ytdl = require("ytdl-core-discord");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.google_api_key);
let fetchVideoInfo = require("youtube-info");
const Discord = require("discord.js");
module.exports = {
    run: async function (bot, message, args) {
        const REGEX_URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i
        const checkUrl = (url) => REGEX_URL.test(url)

        if (!message.member.voiceChannel) {
            return message.channel.send("Por favor, entre em um canal de voz primeiro!");
        } else if (args.length === 0) {
            return message.channel.send("Insira uma URL do youtube!");
        } else {
            if (checkUrl(args[0])) {
                message.member.voiceChannel.join().then(async function(connection) {
                    const stream = connection.playOpusStream(await ytdl(args[0]));
                    youtube.getVideo(args[0]).then(async function(video) {
                        fetchVideoInfo(video.id).then(async function(videoInfo) {
                            if (video) {
                                message.channel.send(new Discord.RichEmbed()
                                    .addField("Nome da música:", videoInfo.title, true)
                                    .addField("Nome do canal:", videoInfo.owner, true)
                                    .addField("Duração da Música", videoInfo.duration)
                                    .addField("Visualizações", videoInfo.views, true)
                                    .addField("Comentários", videoInfo.commentCount, true)
                                    .addField("Likes", videoInfo.likeCount, true)
                                    .addField("Dislikes", videoInfo.dislikeCount, true)
                                    .addField("Gênero", videoInfo.genre)
                                    .setImage(videoInfo.thumbnailUrl)
                                    .setThumbnail(videoInfo.channelThumbnailUrl)
                                    .setTimestamp(new Date())
                                    .setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                    .setColor("RANDOM")
                                );
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
                        .setColor("RANDOM")
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
                                            message.channel.send(new Discord.RichEmbed()
                                                .addField("Nome da música:", videoInfo.title, true)
                                                .addField("Nome do canal:", videoInfo.owner, true)
                                                .addField("Duração da Música", videoInfo.duration)
                                                .addField("Visualizações", videoInfo.views, true)
                                                .addField("Comentários", videoInfo.commentCount, true)
                                                .addField("Likes", videoInfo.likeCount, true)
                                                .addField("Dislikes", videoInfo.dislikeCount, true)
                                                .addField("Gênero", videoInfo.genre)
                                                .setImage(videoInfo.thumbnailUrl)
                                                .setThumbnail(videoInfo.channelThumbnailUrl)
                                                .setTimestamp(new Date())
                                                .setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                                .setColor("RANDOM")
                                            );
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
                                            const stream2 = connection.playOpusStream(await ytdl(search[1].url));
                                            message.channel.send(new Discord.RichEmbed()
                                                .addField("Nome da música:", videoInfo.title, true)
                                                .addField("Nome do canal:", videoInfo.owner, true)
                                                .addField("Duração da Música", videoInfo.duration)
                                                .addField("Visualizações", videoInfo.views, true)
                                                .addField("Comentários", videoInfo.commentCount, true)
                                                .addField("Likes", videoInfo.likeCount, true)
                                                .addField("Dislikes", videoInfo.dislikeCount, true)
                                                .addField("Gênero", videoInfo.genre)
                                                .setImage(videoInfo.thumbnailUrl)
                                                .setThumbnail(videoInfo.channelThumbnailUrl)
                                                .setTimestamp(new Date())
                                                .setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                                .setColor("RANDOM")
                                            );
                                            stream2.on('end', async () => {
                                                await message.member.voiceChannel.leave();
                                                await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                            });
                                        });
                                    });
                                break;
                                case "3⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[2].id).then(async function(videoInfo) {
                                            const stream2 = connection.playOpusStream(await ytdl(search[2].url));
                                            message.channel.send(new Discord.RichEmbed()
                                                .addField("Nome da música:", videoInfo.title, true)
                                                .addField("Nome do canal:", videoInfo.owner, true)
                                                .addField("Duração da Música", videoInfo.duration)
                                                .addField("Visualizações", videoInfo.views, true)
                                                .addField("Comentários", videoInfo.commentCount, true)
                                                .addField("Dislikes", videoInfo.dislikeCount, true)
                                                .addField("Gênero", videoInfo.genre)
                                                .setImage(videoInfo.thumbnailUrl)
                                                .setThumbnail(videoInfo.channelThumbnailUrl)
                                                .setTimestamp(new Date())
                                                .setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                                .setColor("RANDOM")
                                            );
                                            stream2.on('end', async () => {
                                                await message.member.voiceChannel.leave();
                                                await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                            });
                                        });
                                    });
                                break;
                                case "4⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[3].id).then(async function(videoInfo) {
                                            const stream2 = connection.playOpusStream(await ytdl(search[3].url));
                                            message.channel.send(new Discord.RichEmbed()
                                                .addField("Nome da música:", videoInfo.title, true)
                                                .addField("Nome do canal:", videoInfo.owner, true)
                                                .addField("Duração da Música", videoInfo.duration)
                                                .addField("Visualizações", videoInfo.views, true)
                                                .addField("Comentários", videoInfo.commentCount, true)
                                                .addField("Dislikes", videoInfo.dislikeCount, true)
                                                .addField("Gênero", videoInfo.genre)
                                                .setImage(videoInfo.thumbnailUrl)
                                                .setThumbnail(videoInfo.channelThumbnailUrl)
                                                .setTimestamp(new Date())
                                                .setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                                .setColor("RANDOM")
                                            );
                                            stream2.on('end', async () => {
                                                await message.member.voiceChannel.leave();
                                                await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``);
                                            });
                                        });
                                    });
                                break;
                                case "5⃣":
                                    message.member.voiceChannel.join().then(async function(connection) {
                                        fetchVideoInfo(search[4].id).then(async function(videoInfo) {
                                            const stream2 = connection.playOpusStream(await ytdl(search[4].url));
                                            message.channel.send(new Discord.RichEmbed()
                                                .addField("Nome da música:", videoInfo.title, true)
                                                .addField("Nome do canal:", videoInfo.owner, true)
                                                .addField("Duração da Música", videoInfo.duration)
                                                .addField("Visualizações", videoInfo.views, true)
                                                .addField("Comentários", videoInfo.commentCount, true)
                                                .addField("Dislikes", videoInfo.dislikeCount, true)
                                                .addField("Gênero", videoInfo.genre)
                                                .setImage(videoInfo.thumbnailUrl)
                                                .setThumbnail(videoInfo.channelThumbnailUrl)
                                                .setTimestamp(new Date())
                                                .setFooter(`Musica solicitada por ${message.author.tag}`, message.author.displayAvatarURL)
                                                .setColor("RANDOM")
                                            );
                                            stream2.on('end', async () => {
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