module.exports = {
    run: async function({ message, Guilds, args }) {

        const db = await Guilds.findOne({ _id: message.guild.id });
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(`» **${message.author.username}** | Desculpe, você precisa da permissão \`ADMINISTRATOR\` para executar este comando.`);
        } else if (args.length === 0) {
            return message.channel.send(`O filtro **ANTI-PALAVRAS** está \`${db.events.get("filterWords").status ? "ativado" : "desativado"}\``);
        } else {
            if (args[0] === "on") {
                if (db.events.get("filterWords").status) {
                    return message.channel.send("O filtro **ANTI-PALAVRAS** já está \`ativado\`");
                } else {
                    message.channel.send(`O filtro **ANTI-PALAVRAS** foi \`ativado\` com sucesso. Para setar as palavras proibidas digite \`${db.prefix}setwords <palavra 1> <palavra2> etc...\``);
                    db.events.get("filterWords").status = true;
                    return db.save();
                }
            } else {
                if (args[0] == "off") {
                    if (!db.events.get("filterWords").status) {
                        return message.channel.send("O filtro **ANTI-PALAVRAS** já está \`desativado\`");
                    } else {
                        message.channel.send("O filtro **ANTI-PALAVRAS** foi \`desativado\` com sucesso.");
                        db.events.get("filterWords").status = false;
                        return db.save();
                    }
                }
            }
        }
    }
}