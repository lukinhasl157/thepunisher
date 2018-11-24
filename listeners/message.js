/**
 * Evento Message do Discord.js
 * @event
 * @param {Message} message Emitido sempre que uma mensagem é criada.
 */
function Message(message) {
    if (message.author.bot || !message.content.startsWith(process.env.prefix))
        return;
    
    
    let args = message.content.slice(process.env.prefix.length).split(/ +/g);
    let command = this.fetchCommand(args.shift());

    if (command) {
        return command.process(message, args);
    }
    
}

module.exports = Message;