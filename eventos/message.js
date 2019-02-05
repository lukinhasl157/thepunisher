const { RichEmbed } = require('discord.js');
const firebase = require("firebase");
const database = firebase.database();
module.exports.run = async function(message) {

    if (message.author.bot || message.channel.type === "dm")
        return;
        
    if (message.content.toLowerCase().startsWith(process.env.prefix)) {

        const args = message.content.slice(process.env.prefix.length).split(' ');
        const nome = args.shift().toLowerCase();
        const command = this.commands.find((cmd, n) => (cmd.aliases && cmd.aliases.includes(nome)) || n === nome);
        
        if (command) {

            if (command.usersCooldown.has(message.author.id)) {
                let m = await message.channel.send("Desse jeito você vai fuder meu processador, aguarde ``3s.``");
                return m.delete(60000);
            }           
            
            Object.defineProperty(message, 'command', { value: command });

            command.run(this, message, args, database);
            command.usersCooldown.add(message.author.id);

            setTimeout(function() {
                command.usersCooldown.delete(message.author.id);
            }, command.cooldown);
        }
    }

    if (!message.command) {
        if (message.content.includes(`<@${this.user.id}>`)) {
            message.channel.send(`<a:mention:500823853971537951> Olá, ${message.author} meu desenvolvedor tem demencia e ainda não fez essa parte.`)
            .then((msg) => {
                msg.delete(60 * 1000);
            });
        }
    } 
}