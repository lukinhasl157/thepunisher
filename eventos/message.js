const { RichEmbed } = require('discord.js');
module.exports.run = async function(message) {
    if (message.author.bot || message.channel.type === "dm")
        return;
        
    if (message.content.toLowerCase().startsWith(process.env.prefix)) {


        let args = message.content.slice(process.env.prefix.length).split(' ');
        let nome = args.shift().toLowerCase();
        let command = this.commands.find((cmd, n) => (cmd.aliases && cmd.aliases.includes(nome)) || n === nome);
        
        if (command) {

            if (command.usersCooldown.has(message.author.id)) {
                let m = await message.channel.send("Desse jeito você vai fuder meu processador, aguarde ``3s.``");
                return m.delete(60000);
            }           
            
            Object.defineProperty(message, 'command', { value: command });

            command.run(this, message, args);
            command.usersCooldown.add(message.author.id);

            setTimeout(function() {
                command.usersCooldown.delete(message.author.id);
            }, command.cooldown);

        }

    }

    const recadopraessesfdps = [
        `<a:mention:500823853971537951> Olá, ${message.author} meu desenvolvedor tem demencia e ainda não fez essa parte.`, 
    ];


    if (!message.command) {
        if (message.content.includes(`<@${this.user.id}>`)) {
            let msg = recadopraessesfdps[Math.floor(Math.random() * recadopraessesfdps.length)]
            message.channel.send(msg).then(fdp => fdp.delete(60000));
        }

    } 


}