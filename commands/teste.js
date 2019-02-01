module.exports = {
    run: (bot, message, args) => {
        function msgDelay() {
            message.channel.send("5");
            message.channel.send("4");
            message.channel.send("3");
            message.channel.send("2");
            message.channel.send("1");
        }
        
        setInterval(msgDelay, 5 * 1000);
    }
}