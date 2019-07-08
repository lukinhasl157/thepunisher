module.exports = {
    run: async function({ message, args, Guilds }) {
        if (args.length == 0) {
            return message.channel.send("Insira um novo prefixo.");
        } else {
            const serverPrefix = await Guilds.findOne({ _id: message.guild.id });
            serverPrefix.prefix = args[0];
            message.channel.send(`O novo prefix do servidor é \`${args[0]}\``);
            return serverPrefix.save();
        }
    }
}