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

        this.errorMessages = {
            argsRequired: 'argumentos invalidos!'
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

        return false;
    }

    run() { }
}

module.exports = Command;