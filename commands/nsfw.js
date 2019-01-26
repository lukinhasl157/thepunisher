const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
module.exports = {
    run: (bot, message, args) => {

        const subreddits = [
            "cock",
            "pussy",
            "porn",
            "nsfw",
            "boobs",
            "ass"
        ];
        const sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        if (message.channel.name !== "nsfw" || message.channel.nsfw !== true) {
            return message.channel.send(`**${message.author.username}** | Você só pode usar este comando em um canal **NSFW**`)
            .then(msg => {
                msg.delete(20 * 1000);
            });
        } else {
            randomPuppy(sub)
            .then(url => {
                const embed = new Discord.RichEmbed()
                .setColor("#ff0000")
                .setImage(url);
                message.channel.send(embed);
            });
        }
    },
    aliases: ["porno", "putaria", "porn"],
    category: "Entretenimento",
    description: "Conteúdo NSFW **+18**"
}
