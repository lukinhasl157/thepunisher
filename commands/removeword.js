module.exports = {
    run: async function({ message, Guilds, args }) {

        const db = await Guilds.findOne({ _id: message.guild.id });
        const words = db.events.get("filterWords").words;
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(`» **${message.author.username}** | Desculpe, você precisa da permissão \`ADMINISTRATOR\` para executar este comando.`);
        } else if (args.length === 0) {
            return message.channel.send("Insira uma palavra para ser removida.");
        } else if (args.length > 1) {
            return message.channel.send("Você só pode remover um item por vez do filtro.")
        } else if (db.events.get("filterWords").status) {
            return message.channel.send("Você precisa desativar o filtro **ANTI-PALAVRAS** antes de remover alguma palavra.");
        } else {
            const word = words.find((i) => i === args[0]);
            if (!word) {
                return message.channel.send("Esta palavra não foi encontrada no filtro, verifique se você digitou a palavra corretamente.");
            } else {
                const index = words.indexOf(args[0]);
                if (index > -1) {
                    words.splice(index, 1);
                    message.channel.send(`A(s) palavra(s) \`${args[0]}\` foi removida do filtro. Para ver todas as palavras digite \`${db.prefix}wordslist\``);
                    return db.save();
                }
            }
        }
    }
}