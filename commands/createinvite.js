module.exports = {
    run: async function (bot, message, args) {

        if (!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) {
            return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão **CREATE_INSTANT_INVITE** para executar este comando.`)
        } else if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) {
            return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando. Permissão necessária: **CREATE_INSTANT_INVITE**.`)
        } else {
            const invite = await message.channel.createInvite({maxAge: 0});
            message.channel.send(`:incoming_envelope: Convite criado com sucesso.\n ${invite}`);
        }
    },
    aliases: ["criarconvite", "convite", "invite"],
    category: "Utilidades",
    description: "Cria um convite do servior no qual o comando foi executado."
}