const { Collection } = require("discord.js");
const Embed = require("./Embed.js");

class Command {
    constructor(name, category) {
        
        this.name = name;
        this.category = category;
        this.bot = category.client;
        
        this.aliases = [];
        this.exemples = [];
        this.subcommands = new Collection();

        this.usage = '';

        this.argsRequired = false;
        this.developerOnlys = false;

        for (const option in this.category.options)
            if (!this[option]) this[option] = this.category.options[option];

        this.errorMessages = {
            argsRequired: 'argumentos invalidos!',
            developerOnlys: 'Somente meus desenvolvedores tem acesso ao comando'
        };
    
    }

    process(message, args) {
        Object.defineProperty(message, 'command', { value: this });

        let embed = new Embed(message);
        let error = this.checkError(message, args);

        if (error) {
            embed.footerHelp()
                .setDescription(`${this.bot.config.emojis.failed} ${error}`);
            return message.channel.send(embed);
        }

        return this.run(message, args);
    }

    /**
     * verifica se há algum erro
     * @param {Message} message 
     * @param {Array} args 
     */
    checkError(message, args) {
        if (args.length === 0 && this.argsRequired)
            return this.errorMessages.argsRequired;

        if (this.developerOnlys && !this.bot.config.developerIDs.includes(message.author.id))
            return this.errorMessages.developerOnlys;

        return false;
    }

    run() { }
}

module.exports = Command;