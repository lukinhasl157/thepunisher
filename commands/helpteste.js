

module.exports.run = async (bot, message, args) => {

    try {
        await message.author.send("seu help");
        await message.channel.send("enviei meus comandos no seu pv");
    } catch (e) {
        await message.channel.send('Não consegui enviar a mensagem! Verifique se tem o privado ativo!');
    }
}

module.exports.help = {
    name: "helpteste"
}