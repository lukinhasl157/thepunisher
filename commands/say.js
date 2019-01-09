module.exports = {
	run: (bot, message, args) => {

    const sayMessage = args.join(" ");
    	message.delete().catch(O_o=>{});
    	message.channel.send(sayMessage);
  },
	aliases: ["falar", "dizer"],
	category: "Entretenimento",
	description: "Dizer uma mensagem pelo bot"
	}	
