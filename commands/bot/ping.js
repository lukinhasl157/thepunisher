const { Command, Embed } = require('../../structures')

class Ping extends Command {
    constructor (name, client) {
        super(name, client)
        this.aliases = ['pong']
    }

    run (message, { c }) {
        message.channel.send(new Embed(message).setDescription(`${c.message} ${Math.round(this.bot.ws.ping)}ms`))
            .catch(console.error)
    } 
}

module.exports = Ping