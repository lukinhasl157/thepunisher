const ascii = require("ascii-art");
module.exports = {
    run: async (bot, message, args) => {

        if (args.length === 0) {
            return message.channel.send(`» **${message.author.username}** | Insira uma mensagem (15 caracteres)`);
        } else if (args.length > 15) {
            return message.channel.send(`» **${message.author.username}** | Os argumentos não podem passar de  **15** caracteres.`);
        } else {
            ascii.font(args.join(" "), 'Doom', function (rendered) {
                rendered = rendered.trimRight()
                message.channel.send(rendered, {
                    code: 'md'
                });
            });
        }
    },
    category: 'Entretenimento',
    description: 'Formatar um texto em ascii'
}