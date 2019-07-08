const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    run: async function ({ bot, message, Guilds}) {
        
        // criando um Object com todas categorias
        const categorias = bot.commands.reduce((o, comando, nome) => {
            if (!o[comando.category]) o[comando.category] = {};
            o[comando.category][nome] = comando;
            return o;
        }, {});
        /*
            embed = simples RicheEmbed
            opcoes = JSON das opçoes das categorias
        */
        const embed = new Discord.RichEmbed()
            .setTitle('Categorias')
            .setThumbnail(bot.user.avatarURL)
            .setColor('RANDOM');
        const opcoes = require('../categorias.json');
        
        // adicionando todas categorias 
        embed.setDescription(Object.keys(categorias)
            .map((nome) =>
             opcoes[nome] ?
             (`${opcoes[nome].emoji ? opcoes[nome].emoji : ''} **${nome}** ${opcoes[nome].description ? opcoes[nome].description : ''}`) :
             nome));
    
        try {
            const msg = await message.author.send(embed);
            message.channel.send(`» **${message.author.username}**, olhe seu privado! Mandei meus comandos lá! 📨`);
            message.react(":correto:505155063963058187");

            for (const x in opcoes) {
                if (opcoes[x].emoji) {
                    await msg.react(opcoes[x].emoji);
                }
            }
    
            const filter = (r, u) => r.me && (u.id === message.author.id)
            const collect = msg.createReactionCollector(filter, { time: 120000 });

            collect.on("collect", async ({emoji}) => {
                const server = await Guilds.findOne({ _id: message.guild.id });
                let categoria = Object.entries(opcoes).find(([nome, opt]) => opt.emoji === emoji.name);
                if (categoria) {
                    let [nome, opcoes] = categoria;
                    await msg.edit(new Discord.RichEmbed()
                        .setDescription(opcoes.description)
                        .setTitle(nome)
                        .setColor(opcoes.color)
                        .addField('Comandos', Object.entries(categorias[nome]).map(([name, command]) => server.prefix + name + (command.description ? ' ' + command.description : '')).join('\n '))
                    );
                } 
            });
        } catch(_) {
            message.channel.send(`Erro: » **${message.author.username}**, ative sua **DM** para que eu possa enviar meus comandos.`);
            return message.react(":negado:505155029636874250");
        }
    },
    aliases: ['h', 'ajuda'],
    category: "Informações", 
    description: "Informações do bot"
}


