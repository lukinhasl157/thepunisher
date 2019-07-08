const Guilds = require("../utils/model.js");
module.exports.run = async function(message) {

    if (message.author.bot || message.channel.type == "DM") {
        return;
    }
    const server = await Guilds.findOne({ _id: message.guild.id });
    const prefixDefault = process.env.PREFIX;
    if (!server) {
        if (message.content.toLowerCase().startsWith(prefixDefault)) {
            console.log("Adicionado o servidor " + message.guild.name + " na database...");
            const newConfig = new Guilds({
                _id: message.guild.id,
                prefix: process.env.PREFIX
            });
           await newConfig.save();
        }
    }
    const prefix = (server && server.prefix) || prefixDefault;
    if (message.content.toLowerCase().startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(' ');
        const nome = args.shift().toLowerCase();
        const command = this.commands.find((cmd, n) => (cmd.aliases && cmd.aliases.includes(nome)) || n === nome);

        if (command) {
            if (command.usersCooldown.has(message.author.id)) {
                const m = await message.channel.send("Aguarde \`3s\` para usar outro comando novamente.");
                return m.delete(60 * 1000);
            }           
            Object.defineProperty(message, 'command', { value: command });
            command.run({
                bot: this,
                message,
                Guilds,
                server,
                args,
            });
            command.usersCooldown.add(message.author.id);
            setTimeout(function() {
                command.usersCooldown.delete(message.author.id);
            }, command.cooldown);
        }
    }
    const botMention = message.guild ? message.guild.me.toString() : this.user.toString();
    if (!message.command) {
        if (message.content.startsWith(botMention)) {
            const msg = await message.channel.send(`<a:caralho:531498188386074624> Olá, ${message.author} está com duvidas? digite \`${server.prefix}help\``);
            return msg.delete(60 * 1000);
        }
        if (server && server.events.get("filterWords").status) {
            if (server.events.get("filterWords").words.some((w) => message.content.toLowerCase().includes(w)) && !message.author.bot) {
                message.delete();
                const msg = await message.channel.send("Esta palavra foi bloqueada.");
                return msg.delete(30 * 1000);
            }
        }
    }
}