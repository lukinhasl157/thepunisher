const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    try {
        // criando um Object com todas categorias
        let categorias = Object.entries(bot.commands).reduce((o, [k, command]) => {
            if (!o[command.category]) o[command.category] = {};
            o[command.category][k] = command;
            return o;
        }, {});

        /*
            embed = simples RicheEmbed
            opcoes = JSON das opçoes das categorias
        */
        let embed = new Discord.RichEmbed()
            .setTitle('Categorias')
            .setThumbnail(bot.user.avatarURL);
        let opcoes = require('../categorias.json');
        console.log(opcoes);
        // adicionando todas categorias 
        embed.setDescription(Object.keys(categorias).map(nome => `${opcoes[nome].emoji} **${nome}** ${opcoes[nome].description}`));
    
        // enviando msg no privado
        let msg = await message.author.send(embed);
        for (const x in opcoes) 
        if (opcoes[x].emoji) await msg.react(opcoes[x].emoji);
    
         // msg avisando q foi enviado no pv
        await message.channel.send("Olhe seu privado! Mandei meus comandos lá! 📨");
    
        const filter = (r, u) => r.me && (u.id === message.author.id)
        const collect = message.createReactionCollector(filter, { time: 60000 });

        collect.on("collect", async ({emoji}) => {
            let categoria = Object.entries(opcoes).find(([nome, opt]) => opt.emoji === emoji.name);
            if (categoria) {
                let [nome, opcoes] = categoria;
                embed.setDescription(opcoes.description);
                embed.setTitle(nome);
                embed.addField(Object.entries(categorias[nome]).map(([name, command]) => name + (command.description ? ' ' + command.description : '').join('\n ')));
            } 
        });
    }catch(err){
        console.error(err);
    }
}