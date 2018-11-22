const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

    module.exports = {
        run: (bot, message, args) => {

                if (message.channel.name !== "nsfw" || message.channel.nsfw !== true) return message.channel.send(`**${message.author.username}** | Você só pode usar este comando em um canal **NSFW**`).then(msg => msg.delete(20000));

    var subreddits = [
        'cock',
        'pussy',
        'porn',
        'nsfw',
        'boobs',
        'ass'
    ];

    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setImage(url);
            message.channel.send(embed);
},

    aliases: ["porno", "putaria", "porn"],
    category: "Entreterimento",
    description: "Conteúdo NSFW **+18**"
}
