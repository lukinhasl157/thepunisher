const ytdl = require("ytdl-core");
module.exports = {
    run: async function (bot, message, args) {

        const validator = await ytdl.validateURL(args.join(" "));
        const info = await ytdl.getInfo(args.join(" "));
        const connection = await message.member.voiceChannel.join();
        const dispatcher = await connection.playStream(ytdl(args.join(" "), { filter: 'audioonly' }));

        if (!message.member.voiceChannel) {
            return message.channel.send("Por-favor, entre em um canal de voz primeiro!");
        } else if (message.guild.me.voiceChannel) {
            return message.channel.send("Desculpe, já estou em um canal de voz aqui!");
        } else if (args.length === 0) {
            return message.channel.send("Desculpe, coloque uma URL do youtube!");
        } else if (!validator) {
            return message.channel.send("Coloque uma url **valida** do Youtube!");
        } else {
            const embed = new Discord.RichEmbed()
                .setDescription(`:Labfm: Tocando: **${info.title}** no canal **${message.member.voiceChannel.name}**`)
                .setColor('#ff4040')
            message.channel.send(embed);
            dispatcher.on('end', async () => {
                await message.member.voiceChannel.leave();
                const embed2 = new Discord.RichEmbed()
                    .setDescription(`:musicStopped: A Música terminou, **saindo de ${message.guild.me.voiceChannel.name}**...`)
                    .setColor('#ff4040')
                await message.channel.send(embed2);
            });
        }
    }
}