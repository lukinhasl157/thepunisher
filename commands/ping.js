

        const Discord = require("discord.js");

        module.exports.run = async (bot, message, args) => {

        const m = await message.channel.send("<:think:499596179290456074> Ping?"); 
        m.edit(new Discord.RichEmbed().setDescription(`:ping_pong: Pong! A latência do bot é **${m.createdTimestamp - message.createdTimestamp}ms.** A lantência da API é **${Math.round(bot.ping)}ms.** <:wifi2:501137858250145810>`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#07ed66"));
      } 
      
      module.exports.help = {
        name: "ping"
      }

    


      
