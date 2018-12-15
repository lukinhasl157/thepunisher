const { Command, Embed } = require('../../structures')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

class BotInfo extends Command {
    constructor (name, client) {
        super(name, client)
        this.aliases = ['bi', 'bot', 'info']
    }

    run (message, { c }) {
        let duration = moment.duration(this.bot.uptime).format('D [dias], H [horas], m [minutos], s [segundos]')

        let infos = [
            'Javascript',
            require('discord.js').version,
            process.version
        ]

        let statistics = [
            this.bot.guilds.size,
            this.bot.users.size,
            this.bot.channels.size,
            `${Math.floor((process.memoryUsage().heapUsed / 1024) / 1024)} MB`
        ]

        let embed = new Embed(message)
            .setThumbnail(this.bot.user.displayAvatarURL())
            .addField(c.fieldOne, c.infos.map((f, i) => `**• ${f}:** ${infos[i]}`).join('\n'))
            .addField(c.fieldTwo, c.statistics.map((s, i) => `**• ${s}:** ${statistics[i]}`).join('\n'))
            .addField(c.fieldTree, duration)

        message.channel.send(embed)
    }
}

module.exports = BotInfo
