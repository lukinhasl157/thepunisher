const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
moment.locale("pt-BR");
    
module.exports = {
    run: async function (bot, message, args) {

    let duration = moment.duration(bot.uptime).format('D [d], H [h], m [m], s [s]');
    const embed = new Discord.RichEmbed()
    .setColor('#ff9d00')
    .setAuthor("Desenvolvido por Lukinhas#6744")
    .setDescription("**The Punisher** é um bot para Discord inspirado na série The Punisher da Netflix junto com a Marvel. A função do bot é a focada na parte de Moderação/Administração e entretenimento, o bot possui varias funções, das mais básicas até as mais complexas.")
    .addField(`:pager: Sistema do bot`, `**• Lang:** JavaScript\n**• Lib:** Discord.js 11.4.2\n**• Node.js:** 8.11.4\n**• Version:** 1.0.0\n**• Uptime:** ${duration}`)
    .addField("<:barchart:499601352981479436> Estatísticas", `**• Servidores:** ${bot.guilds.size}\n**• Usuários:** ${bot.users.size}\n**• Canais:** ${bot.channels.size}\n**• Memoria:** ${Math.floor((process.memoryUsage().heapUsed / 1024)/1024)} MB\n**• Comandos:** 29`)
    .setThumbnail('https://cdn.discordapp.com/attachments/493959993184223273/496184772679434240/the_punisher.png')
    .setTimestamp()
    .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
    message.channel.send(embed);

        return this.name},

        category: "Informações",
        description: "Informações do bot"
    }
