const ytdl = require("ytdl-core-discord");
const { getInfo } = require("ytdl-getinfo");
module.exports = {
    run: async function (bot, message, args) {

        if (!message.member.voiceChannel) {
            return message.channel.send("Por-favor, entre em um canal de voz primeiro!");
        } else if (args.length === 0) {
            return message.channel.send("Insira uma URL do youtube!");
        } else {
            message.member.voiceChannel.join().then(async function(connection) {
                const stream = connection.playOpusStream(await ytdl(args.join(" ")));
                getInfo(args.join(" ")).then((info) => {
                    message.channel.send(`Tocando a música \`\`${info.items[0].title}\`\` no canal \`\`${message.member.voiceChannel.name}\`\`...`)
                    stream.on('end', async () => {
                        await message.member.voiceChannel.leave();
                        await message.channel.send(`A Música terminou, saindo do canal \`\`${message.guild.me.voiceChannel.name}\`\``)
                    });
                });
            });
        }
    }
}