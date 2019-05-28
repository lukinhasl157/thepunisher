module.exports = {
    run: async function(_, message, args, queue, serverQueue) {
        if (!serverQueue) {
            return message.channel.send("Não há nenhuma música tocando no momento.")
        } else {
            message.channel.send(serverQueue.songs);
        }
    }
}