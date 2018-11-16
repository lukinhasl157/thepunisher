
const flip = require("flip-text");

module.exports.run = (bot, message, args) => {

    if (!args[0]) return message.channel.send(flip("Ta troll? Coloca uma msg."));
 else{
     message.channel.send(flip(args.join(" ")));


    }
}


module.exports.help = {
    name: "flip"
}


const Discord = require("discord.js");
const db = require('quick.db');

exports.run = (client, msg, args) => {
    db.fetch(`guild_${msg.guild.id}`).then(i => {
        var embed = new Discord.RichEmbed()
            .setTitle('Opçoes do Servidor')
            .setDescription(`Prefix: \`${i.prefix}\``)
        if (!args[0]) return msg.channel.send(embed)
        if (args[0] == "prefix") {
            if (!args[1]) return msg.channel.send('Please include a value.')
            if (args[1].length >= 5) return msg.channel.send('Tente colocar uma prefix menor!')
            db.set(`guild_${msg.guild.id}`, args[1], {
                target: '.prefix'
            })
            msg.channel.send(`Minha prefix foi mudada para \`${args[1]}\``)
        } else {

        }
    }).catch(err => {
        console.error(err);
        msg.channel.send('Retry');
        db.set(`guild_${msg.guild.id}`, {
            prefix: "!"
        })
    })
}
module.exports.help = {
    name: 'prefix'
}