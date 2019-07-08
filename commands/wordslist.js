module.exports = {
    run: async function({ message, Guilds }) {

        const db = await Guilds.findOne({ _id: message.guild.id });
        const words = db.events.get("filterWords").words;
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(`» **${message.author.username}** | Desculpe, você precisa da permissão \`ADMINISTRATOR\` para executar este comando.`);
        } else if (words.length == 0) {
            return message.channel.send(`A lista de palavras está vazia. Caso queira setar alguma palavra, digite \`${db.prefix}setwords <palavra>\``);
        } else {
           return message.channel.send(`Palavras bloqueadas pelo filtro: ${words.join(", ")}`);
        }
    }
}