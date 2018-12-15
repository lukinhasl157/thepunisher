const ytdl = require('ytdl-core');
module.exports.run = async (bot, message) => {
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection
                message.reply('I have successfully connected to the channel!')
                connection.playStream(ytdl(
                    'https://www.youtube.com/watch?v=ZlAU_w7-Xp8',
                    { filter: 'audioonly' }))
            })
            .catch(e => {
                message.reply(e.message)
                console.error(e)
            })
    } else {
        message.reply('You need to join a voice channel first!')
    }
}