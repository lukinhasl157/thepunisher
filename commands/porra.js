
module.exports.run = async (bot, message, args) => { 

    if (!args[0] === Number) {
        return message.channel.send("O argumento precisa ser um número.")
    }

    if (args[0] / 2 && parseInt(args[0])) {
        return message.channel.send("true")

    } else {
        return message.channel.send("false")
    }

    }

    module.exports.help = {
        name: "porra"
    }