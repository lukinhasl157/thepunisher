module.exports = {
    run: async function({ message, Guilds, args }) {

        const db = await Guilds.findOne({ _id: message.guild.id });
        const words = db.events.get("filterWords").words;
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(`» **${message.author.username}** | Desculpe, você precisa da permissão \`ADMINISTRATOR\` para executar este comando.`);
        } else if (args.length === 0) {
            return message.channel.send(words);
        } else if (!db.events.get("filterWords").status) {
            return message.channel.send("Você precisa ativar o filtro **ANTI-PALAVRAS** antes de setar as palavras a serem proibidas.");
        } else if (words.includes(args.join(" "))) {
            return message.channel.send(`Está palavra já está no filtro. Para ver todas as palavras do filtro digite \`${db.prefix}wordslist\``);
        } else if (!isNaN(args[0])) {
            return message.channel.send("Desculpe, o filtro de palavras não pode conter números.");
        } else {
            message.channel.send(`A(s) palavra(s) \`${args.join(" ")}\` foram adicionadas ao filtro com sucesso. Para ver todas as palavras digite \`${db.prefix}wordslist\``);
            const words2 = args.join(" ").split(" ");
            for (const words3 of words2) {
                words.push(words3);
            }
            return db.save();
        }
    }
}