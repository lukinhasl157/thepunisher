const ytdl = require("ytdl-core-discord");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.google_api_key);
const ytb = require("youtube-info");
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
                        ytb.fetchVideoInfo(video.url).then(async function(videoInfo) {
                            if (video) {
                                message.channel.send(new Discord.RichEmbed()
                                    .addField("Nome da música:", videoInfo.title, true)
                                    .addField("Nome do canal:", videoInfo.owner, true)
                                    .addField("Descrição do vídeo:", videoInfo.description)
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
                message.member.voiceChannel.join().then(async function(connection) {
                    youtube.searchVideos(args[0]).then(async function(search) {
                        ytb.fetchVideoInfo(search[0].url).then(async function(videoInfo) {
                            if (search) {
                                const stream2 = connection.playOpusStream(await ytdl(search[0].url));
                                message.channel.send(new Discord.RichEmbed()
                                    .addField("Nome da música:", videoInfo.title, true)
                                    .addField("Nome do canal:", videoInfo.owner, true)
                                    .addField("Descrição do vídeo:", videoInfo.description)
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
                            } else {
                                return message.channel.send(`Nenhuma música foi encontrada com o argumento \`\`${args.join(" ")}\`\``);
                            }
                        });
                    }); 
                });
            }
        }
    }
}
