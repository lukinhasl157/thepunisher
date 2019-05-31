const queue = require("../utils/queue");
module.exports = {
    run: (this, message, args) => {
        console.log(queue);
        message.channel.send("Enviando para o console...");
    }
}