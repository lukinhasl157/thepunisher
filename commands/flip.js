
const flip = require("flip-text");

module.exports.run = (bot, message, args) => {

    if (!args[0]) return message.channel.send(flip("Ta troll? Coloca uma msg."));
 else{
     message.channel.send(flip(args.join(" ")));


    }
}
