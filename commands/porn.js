const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
const cooldown = new Set();

module.exports.run = async (bot, message, args) => {

                if (message.channel.name != "teste") return message.reply("Você só pode usar este comando no canal #putaria").then(msg => msg.delete(20000)); 

    var subreddits = [
        'cock',
        'pussy',
        'porn',
        'nsfw',
        'boobs',
        'ass'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setImage(url);
            message.channel.send({
                embed
            });
        })
}

module.exports.help = {
    name: 'porn'
}
