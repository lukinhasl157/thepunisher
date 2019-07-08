module.exports = {
    run: async function({ message, Guilds, args }) {

        const db = await Guilds.findOne({ _id: message.guild.id });
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(`» **${message.author.username}** | Desculpe, você precisa da permissão \`ADMINISTRATOR\` para executar este comando.`);
        } else if (args.length === 0) {
            return message.channel.send(`O modo **ANTI-BOT** está \`${db.events.get("guildMemberAdd").antiBot.status ? "ativado" : "desativado"}\``);
        } else {
            if (args[0] === "on") {
                if (db.events.get("guildMemberAdd").antiBot.status) {
                    return message.channel.send("O modo **ANTI-BOT** já está \`ativado\`");
                } else {
                    message.channel.send("O modo **ANTI-BOT** foi \`ativado\` com sucesso.");
                    db.events.get("guildMemberAdd").antiBot.status = true;
                    return db.save();
                }
            } else {
                if (args[0] == "off") {
                    if (!db.events.get("guildMemberAdd").antiBot.status) {
                        return message.channel.send("O modo **ANTI-BOT** já está \`desativado\`");
                    } else {
                        message.channel.send("O modo **ANTI-BOT** foi \`desativado\` com sucesso.");
                        db.events.get("guildMemberAdd").antiBot.status = false;
                        return db.save();
                    }
                }
            }
        }
    }
}