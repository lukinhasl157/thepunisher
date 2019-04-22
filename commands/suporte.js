module.exports = {
    run: (bot, message, args) => {
        message.author.send("Servidor de suporte oficial The Punisher\nhttps://discord.gg/NxE2rCX").catch(() => {
            message.channel.send("Não consegui enviar o convite porque sua **DM** está desativada.")
            message.react(":negado:505155029636874250");
        });
    }
}