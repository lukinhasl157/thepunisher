
const tokenfile = require("./.env");
const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let cooldown = new Set();
let cdTime = 3;

fs.readdir("./commands", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Não encontrei a pasta commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} carregado com sucesso!`);
    bot.commands.set(props.help.name, props);
  });

});


const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`)) 

bot.on("ready", () => {

  let status = [
    {name: `para ${bot.users.size} usuários.`, type: 'STREAMING', url: 'http://twitch.tv/thedoomsday27'},
    {name: `Está com dúvidas? Digite ${botconfig.prefix}help para receber todas as minhas informações!`, type: 'STREAMING', url: 'http://twitch.tv/thedoomsday27'},
    {name: 'Não sabe meus comandos? Digite j!comandos para receber minha lista de comandos!', type: 'STREAMING', url: 'http://twitch.tv/thedoomsday27'}, 

  ];
  
    function setStatus() {
        let randomStatus = status[Math.floor(Math.random() * status.length)];
        bot.user.setPresence({game: randomStatus});
    }
  
    setStatus();
    setInterval(() => setStatus(), 15000);
  
  console.log("Bot iniciado com sucesso!");
  console.log('Status carregado com sucesso!');
  let embed = new Discord.RichEmbed()
  .setColor("#d80abd")
  .setTitle("Inicialização do bot...")
  .setThumbnail(bot.user.displayAvatarURL)
  .addField(`Usuários:`, `» ${bot.users.size}`)
  .addField(`Canais:`, `» ${bot.channels.size}`)
  .addField(`Servidores:`, `» ${bot.guilds.size}`)
  .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL)
  .setDescription(`Bot iniciado com sucesso!`)
  .setTimestamp()
  bot.channels.find("name", "modlog-the-punisher").send(embed);
  
});


bot.on('guildMemberAdd', async member => {
  bot.guilds.get(member.guild.id).channels.get('463385203868565531').send(new Discord.RichEmbed().setDescription(`Olá ${member}, seja bem-vindo ao Discord da ${member.guild.name}.\nVocê é o usuário de número: ${member.guild.memberCount}\nPara se registar em nosso servidor clique no emoji <:correto:505155063963058187>`).setTimestamp(new Date()).setColor("#07ed66").setThumbnail(member.user.avatarURL).setFooter(member.guild.iconURL, member.guild.name))
      .then(async (msg) => {
          await msg.react(':correto:505155063963058187'); 
          bot.on('messageReactionAdd', (reaction, user) => {
              if (reaction.emoji.name === ':correto:505155063963058187' && user.id !== bot.user.id && user.id === member.id) {
                  reaction.remove(user);
                  let role = member.guild.roles.find('name', '🔥 Membros');
                  member.addRole(role.id);
              }
          });
      });
  });


bot.on("guildMemberRemove", member => {

  if (member.guild.id !== "463182372259627018") return;
  let avatar = member.user.avatarURL;
  let embed = new Discord.RichEmbed()
      .setColor("#f22929")
      .setThumbnail(avatar)
      .setDescription(`${member}, saiu do servidor!`)
      .addField('Atualmente temos:', `${member.guild.memberCount} usuários.`)
      .setFooter(member.guild.name, member.guild.iconURL)
      .setTimestamp(new Date())
    bot.channels.get("508047350615506979").send(embed);
});

bot.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!message.content.toLowerCase().startsWith(prefix)) return;
  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.channel.send(`${message.author}, aguarde \`\`3s\`\` para usar este comando novamente.`).then(msg => msg.delete(4000));
  }

  cooldown.add(message.author.id);
  
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdTime * 1000)
  
  
});

bot.on("message", message => {

  var msgs = [
    `<a:mention:500823853971537951> ${message.author}, ta me mencionando pq filho da puta?`, 
    `<a:mention:500823853971537951> ${message.author}, porra tava quase dormindo e você me menciona?`
            ];
  let msges = msgs[Math.floor(Math.random() * msgs.length)]

  if (message.content.includes(`<@${bot.user.id}>`))
  return message.channel.send(msges).then(fdp => fdp.delete(60000));

});


bot.on("message", async message => {

if (!message.author.bot && message.content.toLowerCase().startsWith("flw")) {
  return message.channel.send(`${message.author}, flw viado.`);
  
}

});

      bot.on("message", message => {
        if (message.guild && !message.member.hasPermission("ADMINISTRATOR")) {
      if (message.content.includes('https://discord.gg/')) {
          message.delete();
          return message.channel.send(new Discord.RichEmbed().setDescription(`${message.author} Você não pode divulgar link de servidores aqui! <:blockcustom:500306352695148546>`).setTimestamp().setFooter(`${message.author.tag}`, message.author.displayAvatarURL).setColor("#ff0000"));
  }
    }
});

bot.login(process.env.token);
