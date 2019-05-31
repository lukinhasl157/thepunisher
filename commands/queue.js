module.exports = {
    run: async function(_, message, args, queue) {
        if (queue.get(message.guild.id).songs.length == 0) {
            return message.channel.send("Não há nenhuma música tocando no momento.");
        } else {
            if (queue.get(message.guild.id).songs.length >= 1) {
                message.channel.send(queue.get(message.guild.id).songs);
            }
        }
    }
}