const { Command, Embed } = require('../../structures')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

class Uptime extends Command {
    constructor (name, client) {
        super(name, client)
        this.aliases =  ['online', 'timeon']
    }

    run (message, { c }) {
        let duration = moment.duration(this.bot.uptime).format('D [d], H [h], m [m], s [s]')
        message.channel.send(new Embed(message).setDescription(c.message + duration))
    }
}

module.exports = Uptime