const ytdl = require("ytdl-core-discord");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.google_api_key);
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
                        if (video) {
                            message.channel.send(new Discord.RichEmbed()
                                .addField("Nome da música:", video.title)
                                .addField("Canal:", video.channel.title)
                                .addField("Descrição do vídeo:", video.description)
                                .setImage(video[0].thumbnails.high.url)
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
            } else {
                message.member.voiceChannel.join().then(async function(connection) {
                    youtube.searchVideos(args.join(" ")).then(async function(search) {
                        if (search) {
                            const stream2 = connection.playOpusStream(await ytdl(search[0].url));
                            message.channel.send(new Discord.RichEmbed()
                                .addField("Nome da música:", search[0].title)
                                .addField("Canal:", search[0].channel.title)
                                .addField("Descrição do vídeo:", search[0].description)
                                .setImage(search[0].thumbnails.high.url)
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
            }
        }
    }
}
