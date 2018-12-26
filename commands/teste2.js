module.exports = {
    run: async function(bot, message, args) {

    let msg = await message.channel.send("reaction role");
    await msg.react('👦')
    await msg.react('👧')

    const filter = (reaction, user) => reaction.emoji.name === '👦' && user.id === message.author.id;
    const collector = msg.createReactionCollector(filter, { time: 60000 });

    const filter1 = (reaction, user) => reaction.emoji.name === '👧' && user.id === message.author.id;
    const collector1 = msg.createReactionCollector(filter1, { time: 60000 });

    
    collector.on('collect', r => {
    let role = message.guild.roles.find(r => r.name === "nome do cargo");
        message.member.addRole(role);
  });
   
       collector1.on('collect', r1 => {
    let role2 = message.guild.roles.find(r => r.name === "nome do cargo");
        message.member.addRole(role2);
  });
       
   }
}