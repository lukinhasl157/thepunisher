const ascii = require("ascii-art");

module.exports = {
    run: async (bot, message, args) => {

        let texto = args.join(" ");

            ascii.font(texto, 'Doom', function(rendered){

            rendered = rendered.trimRight();

            if (texto.length >= 15) {
                return message.channel.send('O texto não pode passar de 15 caracteres.');
            }

            message.channel.send(rendered, {
                code: 'md'
            });
        });
    },
    aliases: [""],
    category: "Entreterimento",
    description: "Formatar um texto em ascii"
}


