const { Command, Embed } = require('../../structures/')
const { Constants } = require('../../utils/')
const { MessageAttachment } = require('discord.js')

const Util = require('util')

class Eval extends Command {
    constructor (name, category) {
        super(name, category)

        this.aliases = ['ev']
        this.argsRequired = true
    }

    run (message, { args }) {
        let code = args.join(' ').replace(/^```(js|javascript ?\n)?|```$/g, '')
        let value = (l, c) => `\`\`\`${l}\n${String(c).slice(0, 1000) + (c.length >= 1000 ? '...' : '')}\n\`\`\``
        let embed = new Embed(message)
            .setThumbnail('attachment://nodejs.png')
        
        try {
            let resultEval = eval(code)
            let toEval = typeof resultEval === 'string' ? resultEval : Util.inspect(resultEval,  { depth: 1 })  

            embed.addField('Resultado', value('js', toEval))
            embed.addField('Codigo', value('js', code))
            embed.addField('Tipo', value('css', typeof toEval))
        } catch (error) {
            console.error('result eval:', error)
            embed.addField('Error', value('js', error))
            embed.addField('Codigo', value('js', code))       
        } finally {
            message.channel.send({
                embed: embed, 
                files: [new MessageAttachment(Constants.NODEJS_ICON_PNG, 'nodejs.png')]
            })
        }
    }
}

module.exports = Eval