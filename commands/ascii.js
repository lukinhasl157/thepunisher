const ascii = require("ascii-art");

module.exports = {
    run: async (bot, message, args) => {

        let texto = args.join(" ");

            ascii.font(texto, 'Doom', function(rendered){

            rendered = rendered.trimRight();

            if (texto.length >= 15) {
                return message.channel.send('Limite de 15 letras atingidas');
            }

            message.channel.send(rendered, {
                code: 'md'
            });
        });
    },
    category: "Entreterimento",
    descripton: "Formatar um texto em ascii"
}


if (comando === "registro") {

const a = new Discord.RichEmbed()
.setTitle("ReactRole")
.setDescription("Clique na reação :white_small_square:  para conseguir a role")
let msg = message.channel.send(a)
    msg.react(":white_small_square:")

    bot.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name == "nomedoemoji" && user.id !== bot.user.id){
    message.member.addRole("id")
    }
})
}

