module.exports = {
    run: (bot, message, args) => {
        message.member.voiceChannel.leave();
        await message.channel.send("Saindo do canal" + message.member.voiceChannel.name);
    }
}