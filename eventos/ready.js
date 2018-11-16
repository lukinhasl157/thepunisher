const { RichEmbed } = require('discord.js');
module.exports.run = function() {
    let status = [
        `para ${this.users.size} usuários.`,
        `Está com dúvidas? Digite ${process.env.prefix}help para receber todas as minhas informações!`,
      ];
      
        let setStatus = () => {
            let randomStatus = status[Math.floor(Math.random() * status.length)];
            this.user.setPresence({game:  {name: randomStatus, type: 'STREAMING', url: 'http://twitch.tv/thedoomsday27'}});
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

    let channel = this.channels.find(c => c.name === "modlog-the-punisher");
    if (channel) channel.send(embed);
      
}