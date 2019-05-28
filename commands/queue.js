module.exports = {
    run: async function(_, message, args, queue) {
        const serverQueue = queue.get(message.guild.id);

        message.channel.send(`[1] - [${serverQueue.songs.title[0]}](${serverQueue.songs.url[0]})\n[2] - [${serverQueue.songs.title[1]}](${serverQueue.songs.url[1]})`);
    }
}