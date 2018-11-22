const ascii = require("ascii-art");

module.exports = {
    run: async (bot, message, args) => {

        let texto = args.join(" ");

            ascii.font(texto, 'Doom', function(rendered){

            rendered = rendered.trimRight();

            if (texto.length >= 15) {
                return message.channel.send(`**${message.author.username}** | Os argumentos não podem passar de  **15** caracteres.`);
            }

            message.channel.send(rendered, {
                code: 'md'
            });
        });
            
    },
    category: "Entreterimento",
    description: "Formatar um texto em ascii"
}


