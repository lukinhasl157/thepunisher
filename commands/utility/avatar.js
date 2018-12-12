const { Command, Embed } = require('../../structures')

class Avatar extends Command {
    constructor (name, client) {
        super(name, client)
        this.aliases = ['av']
    }

    async run (message, { args: [id], c }) {
        let user = message.mentions.users.first() || (await this.bot.users.get(id)) || message.author
        let avatar = user.displayAvatarURL({ format: 'png', size: 2048 })
        let embed = new Embed(message)
            .setAuthor(c.author + user.username, avatar)
            .setDescription(c.message.replace(/url/g, avatar))
            .setImage(avatar)

        message.channel.send(embed)
    }
}

module.exports = Avatar