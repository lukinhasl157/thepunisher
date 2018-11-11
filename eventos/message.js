module.exports.run = function(message) {
    if (message.author.bot || message.channel.type === "dm") return;

    if (message.content.toLowerCase().startsWith(this.botconfig.prefix)) {
        let args = message.content.split(' ');
        let nome = args[0].slice(this.botconfig.prefix.length).toLowerCase();
        let command = this.commands.find((cmd, n) => cmd.aliases.includes(nome) || n === nome);

        if (command) {
            commandfile.run(bot, message, args);
        }
    }

    const recadopraessesfdps = [
        `<a:mention:500823853971537951> ${message.author}, ta me mencionando pq filho da puta?`, 
        `<a:mention:500823853971537951> ${message.author}, porra tava quase dormindo e você me menciona?`
    ];
    
    if (message.content.includes(`<@${bot.user.id}>`)) {
        let msg = recadopraessesfdps[Math.floor(Math.random() * recadopraessesfdps.length)]
        message.channel.send(msg).then(fdp => fdp.delete(60000));
    }


    if (message.content.toLowerCase().startsWith("flw")) {
        message.channel.send(`${message.author}, flw viado.`);
    }

    if (message.guild && !message.member.hasPermission("ADMINISTRATOR")) {
        if (message.content.includes('https://discord.gg/')) {
            message.delete();
            message.channel.send(new Discord.RichEmbed().setDescription(`${message.author} Você não pode divulgar link de servidores aqui! <:blockcustom:500306352695148546>`).setTimestamp().setFooter(`${message.author.tag}`, message.author.displayAvatarURL).setColor("#ff0000"));
        }
    }

}