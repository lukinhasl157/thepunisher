const { RichEmbed } = require('discord.js');
const botconfig = require("../botconfig.json");
module.exports.run = function() {
    // this é o atual Object Global
    // nesse caso seria o bot pq vc vai chama essa função no evento Ready
    let status = [
        `para ${this.users.size} usuários.`,
        `Está com dúvidas? Digite ${botconfig.prefix}help para receber todas as minhas informações!`,
        `Não sabe meus comandos? Digite ${botconfig.prefix}!comandos para receber minha lista de comandos!`
      ];
      
        function setStatus() {
            let randomStatus = status[Math.floor(Math.random() * status.length)];
            bothist.user.setPresence({game:  {name: randomStatus, type: 'STREAMING', url: 'http://twitch.tv/thedoomsday27'}});
        }
      
    setInterval(() => setStatus(), 15000);
      
    console.log("Bot iniciado com sucesso!");
    console.log('Status carregado com sucesso!');

    let embed = new RichEmbed()
        .setColor("#d80abd")
        .setTitle("Inicialização do bot...")
        .setThumbnail(this.user.displayAvatarURL)
        .addField(`Usuários:`, `» ${this.users.size}`)
        .addField(`Canais:`, `» ${this.channels.size}`)
        .addField(`Servidores:`, `» ${this.guilds.size}`)
        .setFooter(`${this.user.tag}`, this.user.displayAvatarURL)
        .setDescription(`Bot iniciado com sucesso!`)
        .setTimestamp();

    let channel = bot.channels.find("name", "modlog-the-punisher");
    if (channel) channel.send(embed);
      
}