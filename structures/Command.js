const { Collection } = require('discord.js')
const Embed = require('./Embed.js')
const { Constants } = require('../utils')
const lang = require('../languages/pt-br.json')

class Command {
    constructor (name, category) {
        this.name = name
        this.category = category
        this.bot = category.client
        
        this.aliases = []
        this.exemples = []
        this.subcommands = new Collection()
        
        this.argsRequired = this.category.options.argsRequired || false
        this.developerOnlys = this.category.options.developerOnlys || false
    }

    tag (lang) {
        return `${process.env.PREFIX + this.name} ${lang.commands[this.name].usage}`
    } 

    process (message, args) {
        Object.defineProperty(message, 'command', { value: this })

        let embed = new Embed(message)
        let error = this.checkError(message, args)

        if (error) {
            if (typeof error !== 'string')
                return

            embed.footerHelp()
                .setDescription(`${Constants.EMOJI_FAILED} ${error}`)
            return message.channel.send(embed)
        }

        let l = lang
        let c = lang.commands[this.name]
        return this.run(message, { args, l, c })
    }

    /**
     * verifica se há algum erro
     * @param {Message} message 
     * @param {Array} args 
     * @returns {String|Boolean} 
     */
    checkError (message, args) {
        if (this.developerOnlys && !this.bot.guild.roles.get(process.env.ROLE_DEV_ID).members.has(message.author.id))
            return true

        if (args.length === 0 && this.argsRequired)
            return lang.commands[this.name].argsRequired || this.argsRequired

        return false
    }

    run () { }
}

module.exports = Command