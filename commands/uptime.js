const moment = require("moment");
require("moment-duration-format");

	module.export.run = {
		run: async function (bot, message, args) {

    	let duration = moment.duration(bot.uptime).format('D [d], H [h], m [m], s [s]');
    	let msg = await message.channel.send("» Calculando tempo online...");

    setTimeout (() => {
    msg.edit(`» Estou online há: <:fast:500147391945768981> \`\`${duration}\`\``);
    }, 3000);

},
	aliases: ["online", "timeon"],
	category: "Utilidades",
	descripton: "Mostrar a quanto tempo o bot está online."
}
