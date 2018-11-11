
const reverse = require("reverse-text");

module.exports.run = (bot, message, args) => {

    if (!args[0]) return message.channel.send(reverse("Ta troll? Coloca uma msg."));

    else {
        
     message.channel.send(reverse(args.join(" ")));



    }
}


module.exports.help = {
    name: "reverse"
}