const Discord = require("discord.js");

module.exports = {
    run: async function(bot, message, args) {

let embed = new Discord.RichEmbed()
.setDescription("Clique no emoji para criar o canal")
await message.channel.send(embed).then(async msg => {
await msg.react("✅");

const filter = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
const collector = msg.createReactionCollector(filter, {time: 30000});

collector.on("collect", async r => {

  let channel = message.guild.channels.find(ch => ch.name === "nomedocanal");
  let category = message.guild.channels.find(c => c.name === "nomedacategoria");

if (!category || category.type !== "category") {
category = await message.guild.createChannel("nomedacategoria", "category");
}

if (!channel) {
r.remove(message.author.id);
channel = await message.guild.createChannel("nome do canal", "text");
await msg.edit("Canal criado com sucesso");
}

})

})

}
}