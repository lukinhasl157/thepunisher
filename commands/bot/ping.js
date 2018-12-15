const { Command, Embed } = require('../../structures')
const { MessageAttachment } = require('discord.js')
const { Constants } = require('../../utils')

class Ping extends Command {
    constructor (name, client) {
        super(name, client)
        this.aliases = ['pong']
    }

    run (message, { c }) {
        message.channel.send({
            embed: new Embed(message)
                .setDescription(`${c.message} ${Math.round(this.bot.ws.ping)}ms`)
                .setImage(`attachment://image.gif`),
            files: [new MessageAttachment(Constants.PINGPONG_GIF, 'image.gif')] 
        }).catch(console.error)
    } 
}

module.exports = Ping