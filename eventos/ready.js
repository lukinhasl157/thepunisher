module.exports.run = function() {
    this.user.setPresence({game:  { name: `${this.users.size.toLocaleString()} usuários.`, type: 'WATCHING' } });
    const db = require("../utils/mongoose")();
    console.log("Bot iniciado com sucesso!");
    console.log('Status carregado com sucesso!');    
}