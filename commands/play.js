const Discord = require("discord.js");
const ytdl = require("ytdl-core-discord");
module.exports = {
    run: async function (bot, message, args) {

        if (!message.member.voiceChannel) {
            return message.channel.send("Por-favor, entre em um canal de voz primeiro!");
        } else if (message.guild.me.voiceChannel) {
            return message.channel.send("Desculpe, já estou em um canal de voz aqui!");
        } else if (args.length === 0) {
            return message.channel.send("Desculpe, coloque uma URL do youtube!");
        } else {
            message.member.voiceChannel.join().then(async function(connection) {
                const stream = connection.playOpusStream(await ytdl(args.join(" ")));
                const embed = new Discord.RichEmbed()
                    .setDescription(`Tocando no canal **${message.member.voiceChannel.name}**`)
                    .setColor('#ff4040')
                message.channel.send(embed);  
                stream.on('end', async () => {
                    await message.member.voiceChannel.leave();
                    const embed2 = new Discord.RichEmbed()
                        .setDescription(` A Música terminou, **saindo do canal ${message.guild.me.voiceChannel.name}**...`)
                        .setColor("RANDOM")
                    await message.channel.send(embed2);
                });
            });
        }
    }
}