const Discord = require('discord.js');

module.exports = {
    run: async function (bot, message, args) {

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando. Permissão necessária: **ADMINISTRATOR**.`)
        }

        const invite = await message.channel.createInvite({maxAge: 0});
        message.channel.send(`:incoming_envelope: Convite criado com sucesso.\n ${invite}`);
},

    aliases: ["criarconvite", "convite", "invite"],
    category: "Utilidades",
    description: "Cria um convite do servior no qual o comando foi executado."
  }
