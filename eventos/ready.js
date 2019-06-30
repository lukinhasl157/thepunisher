module.exports.run = function() {
    const status = [
        `para ${this.users.size} usuários.`,
        `Está com dúvidas? Digite ${config.prefix}help para receber todas as minhas informações!`,
      ];
      
        const setStatus = () => {
            const randomStatus = status[Math.floor(Math.random() * status.length)];
            this.user.setPresence({game:  {name: randomStatus, type: 'STREAMING', url: 'http://twitch.tv/thedoomsday27'}});
        }
      
    setInterval(() => setStatus(), 60 * 1000);
    const db = require("../utils/mongoose")();
    console.log("Bot iniciado com sucesso!");
    console.log('Status carregado com sucesso!');    
}