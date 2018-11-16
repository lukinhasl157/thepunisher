const { RichEmbed } = require('discord.js');
module.exports.run = function(message) {
    if (message.author.bot || message.channel.type === "dm") return;

    if (message.content.toLowerCase().startsWith(this.config.prefix)) {
        Object.defineProperty(message, 'prefix', { value: this.config.prefix });
        let args = message.content.split(' ');
        let nome = args[0].slice(this.config.prefix.length).toLowerCase();
        let command = this.commands.find((cmd, n) => (cmd.aliases && cmd.aliases.includes(nome)) || n === nome);
        
        if (command) {
            if (command.usersCooldown.has(message.author.id)) return message.channel.send("Desse jeito você vai fuder meu processador, aguarde ``3s.``").then(msg => msg.delete(60000));           
            Object.defineProperty(message, 'command', { value: command });    
            command.run(this, message, args.slice(1));
            command.usersCooldown.add(message.author.id);
            setTimeout(function() {
                command.usersCooldown.delete(message.author.id);
            }, command.cooldown);
        }
    }
const recadopraessesfdps = [
        `<a:mention:500823853971537951> Olá, ${message.author} meu desenvolvedor tem demencia e ainda não fez essa parte.`, 
    ];

    // açoes que não pode ser executadas junto com algum comando
    if (!message.command) {
        if (message.content.includes(`<@${this.user.id}>`)) {
            let msg = recadopraessesfdps[Math.floor(Math.random() * recadopraessesfdps.length)]
            message.channel.send(msg).then(fdp => fdp.delete(60000));
        }
    

    if (message.guild && !message.member.hasPermission("ADMINISTRATOR")) {
        if (message.content.includes('https://discord.gg/')) {
            message.delete();
            message.channel.send(new RichEmbed().setDescription(`${message.author} Você não pode divulgar link de servidores aqui! :blockcustom:`).setTimestamp().setFooter(`${message.author.tag}`, message.author.displayAvatarURL).setColor("#ff0000"));
        }
    }

}