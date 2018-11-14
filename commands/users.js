
    const Discord = require("discord.js");

    module.exports.run = async (bot, message, args) => {

    let MembrosOnline = message.guild.members.filter(a => a.presence.status == "online").size;
    let MembrosOcupado = message.guild.members.filter(a => a.presence.status == "dnd").size;
    let MembrosAusente = message.guild.members.filter(a => a.presence.status == "idle").size;
    let MembrosOffline = message.guild.members.filter(a => a.presence.status == "offline").size;

    let statusembed = new Discord.RichEmbed()
    .addField('Membros', `**Online:** ${MembrosOnline} | **Ausente:** ${MembrosAusente} | **Ocupado:** ${MembrosOcupado} | **Offline:** ${MembrosOffline} `);
    message.channel.send(statusembed);
}
module.exports.help = {
    name: "users"
  }

  const Discord = require("discord.js");  
const client = new Discord.Client(); 
const config = require("./config.json");

client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
})

client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
})

client.on('message', async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return; 

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
  
    if(comando === "!apagar") { 

        const deleteCount = parseInt(args[0], 10);
      if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply(`Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas`);
      
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
  }
 if(comando === `!ping`){
  const y = await message.channel.send(`:offline: **|** Checando ping.`);
  y.edit(`:dnd: **|** Checando ping..`);
  const oi = await y.edit(`:stream: **|** Checando ping...`);
  oi.edit(`:online: **|** Meu ping é`)
  const embed = new Discord.RichEmbed()
  .setTitle(`Informações do meu ping`)
  .setColor("555")
  .addField(`:ping: Ping do BOT`, Math.round(client.ping) + "ms")
  .addField(`:ping: Ping da API`, oi.createdTimestamp - message.createdTimestamp + "ms")
  await oi.edit(embed)
}

});

client.login(config.token);