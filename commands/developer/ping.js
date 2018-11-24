const { Command, Embed } = require('../../structures/');

class Ping extends Command {
    constructor(name, client) {
        super(name, client);
        this.aliases = ['pong'];
        this.argsRequired = true;
    }

    run(message) {
        return message.channel.send(new Embed(message).setDescription("Pong!"));
    } 
}

module.exports = Ping;