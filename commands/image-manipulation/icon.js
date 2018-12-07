const { Command } = require('../../structures')
const { CanvasTemplates } = require('../../utils')
const { MessageAttachment } = require('discord.js')

class Icon extends Command {
    constructor (name, category) {
        super(name, category)
        this.exemples = ['@bot -t', '', '@bot']
        this.usage = '[@mention]'
    }

    async run (message) {
        message.channel.startTyping()

        let user = message.mentions.users.first() || message.author

        let buffer = await CanvasTemplates.Icon.render(
            user.avatarURL({ format: 'png', size: 2048 }),
            this.bot.user.avatarURL({ format: 'png', size: 2048 }),
            message.content.includes('-t'))

        await message.channel.send(new MessageAttachment(buffer, 'image.png'))

        message.channel.stopTyping()
    }
}

module.exports = Icon