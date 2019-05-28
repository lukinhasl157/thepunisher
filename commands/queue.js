module.exports = {
    run: async function(_, message, args, queue) {
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue) {
            return message.channel.send("Não há nenhuma música tocando no momento.")
        } else {
            message.channel.send(serverQueue.songs);
        }
    }
}