const Guilds = require("../utils/model.js");
module.exports.run = async function(message) {

    const server = await Guilds.findOne({ _id: message.guild.id });
    if (!server) {
        const prefixDefault = message.content.toLowerCase().startsWith(process.env.PREFIX);
        if (!prefixDefault) {
            return;
        } else {
            message.channel.send("O servidor foi adicionado na database. Digite o comando novamente.");
            const newConfig = new Guilds({
                _id: message.guild.id,
                prefix: process.env.PREFIX
            });
            return newConfig.save();
        }
    } else {
        if (!message.content.toLowerCase().startsWith(server.prefix)) {
            return;
        } else {
            const args = message.content.slice(server.prefix.length).split(' ');
            const nome = args.shift().toLowerCase();
            const command = this.commands.find((cmd, n) => (cmd.aliases && cmd.aliases.includes(nome)) || n === nome);
            if (command) {

                if (command.usersCooldown.has(message.author.id)) {
                    const m = await message.channel.send("Aguarde \`\`3s\`\` para usar outro comando novamente.");
                    return m.delete(60 * 1000);
                }           

                Object.defineProperty(message, 'command', { value: command });
                command.run({
                    bot: this,
                    message,
                    Guilds,
                    args,
                });
                command.usersCooldown.add(message.author.id);

                setTimeout(function() {
                    command.usersCooldown.delete(message.author.id);
                }, command.cooldown);
            }
        }
    }

    const botMention = message.guild ? message.guild.me.toString() : this.user.toString()
    if (!message.command && (message.content.startsWith(botMention))) {
      message.channel.send(`<a:caralho:531498188386074624> Olá, ${message.author} está afim de escutar alguma música? digite \`\`${process.env.PREFIX}play\`\` nome da música`)
       .then(m => m.delete(60000))
    } 
}
