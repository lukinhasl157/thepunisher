const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let imgBot = bot.user.avatarURL;
    let embedinicial = new Discord.RichEmbed()
        .setTitle("Embed inicial")
        .setDescription("teste2", "teste3")
        .setThumbnail(imgBot)
    let embedmoderation = new Discord.RichEmbed()
        .setTitle("teste moderação")
        .setDescription("teste2", "teste3")
        .setThumbnail(imgBot)
    let embedutilidades = new Discord.RichEmbed()
        .setTitle("teste utilidades")
        .setDescription("teste2", "teste3")
        .setThumbnail(imgBot)
    let embedentreteni = new Discord.RichEmbed()
        .setTitle("teste entretenimento")
        .setDescription("teste2", "teste3")
        .setThumbnail(imgBot)
    try {
        message.react(":correto:505155063963058187");
    let msg = await message.author.send(embedinicial)
    message.channel.send("Olhe seu privado! Mandei meus comandos lá! 📨");
        await msg.react("🕵")
        await msg.react("🎣")
        await msg.react("📜")
        await msg.react("🔙")

       const filter = (r, u) => (r.emoji.name === '📜', '🎣', '🔙', '🕵') && (u.id !== bot.user.id && u.id === message.author.id)
       const collect = message.createReactionCollector(filter, { time: 60000 });

        collect.on("collect", async r => {
            switch(r.emoji.name) {
                
                case '🕵':
                message.edit(embedmoderation)
                break;
                case '🎣':
                message.edit(embedentreteni)
                break;
                case '📜':
                message.edit(embedutilidades)
                break;
                case '🔙':
                message.edit(embedinicial)
                break;
                
            }
        })

    } catch(e) {
        message.channel.send(`Erro: ${message.author}, por favor ative sua DM para que eu possa enviar meus comandos.`)
        message.react(':negado:505155029636874250')
    }

}
module.exports.help = {
    name: "help"
}

