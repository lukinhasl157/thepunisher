const Discord = require('discord.js');

    module.exports = {
        run: async function (bot, message, args) {
        


    try {
    const invite = await message.channel.createInvite({maxAge: 0});
    message.channel.send(`:incoming_envelope: Convite criado com sucesso.\n ${invite}`);

        } catch (err) {
            message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para criar convites!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    }

    return this.name;

},

    aliases: ["criarconvite", "convite", "invite"],
    category: "Utilidades",
    description: "Cria um convite do servior no qual o comando foi executado."
  }
