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
                message.channel.send(new Discord.RichEmbed()
                    .addField("Resultados da pesquisa por", args.jon(""))
                    .addField("Você tem 60s para escolher um número entre 1 e 5 para selecionar a música correspondente a pesquisa", `1: ${result[0].title}\n2: ${result[1].title}\n3: ${result[2].title}\n4: ${result[3].title}\n5: ${result[4].title}`)
                ).then(async (msg) => {
                    await msg.react(":one:");
                    await msg.react(":two:");
                    await msg.react(":three:");
                    await msg.react(":four:");
                    await msg.react(":five:");
                });
                const filter = (r, u) => r.me && u.id === message.author.id;
                const collector = msg.createReactionCollector(filter, {max: 1, time: 60 * 1000 });

                collector.on("collect", async (r) => {
                    msg.delete();
                    switch (r._emoji.name) {
                        case "one":
                            message.member.voiceChannel.join().then(async function(connect) {
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
                        case "two":
                            message.member.voiceChannel.join().then(async function(connect) {
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
                        case "three":
                            message.member.voiceChannel.join().then(async function(connect) {
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
                        case "four":
                            message.member.voiceChannel.join().then(async function(connect) {
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
                        case "five":
                            message.member.voiceChannel.join().then(async function(connect) {
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
            }
        }
    }
}
