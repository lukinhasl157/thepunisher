const ascii = require("ascii-art");

module.exports = {
    run: async (bot, message, args) => {
        let text = args.join(' ')

        if (!text) {
            return message.channel.send(`» **${message.author.username}** | Os argumentos não podem passar de  **15** caracteres.`)
        }

        ascii.font(text, 'Doom', function (rendered) {
            rendered = rendered.trimRight()

            if (text.length >= 15) {
                return message.channel.send(`» **${message.author.username}** | Os argumentos não podem passar de  **15** caracteres.`)
            }

            message.channel.send(rendered, {
                code: 'md'
            })
        })  
    },
    category: 'Entreterimento',
    description: 'Formatar um texto em ascii'
}