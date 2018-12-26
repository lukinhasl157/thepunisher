module.exports = {
    run: async function(bot, message, args) {

    let msg = await message.channel.send("reaction role");
    await msg.react('👦')
    await msg.react('👧')

    const filter = (reaction) => reaction.emoji.name === ['👦', '👧'];
    const collector = msg.createReactionCollector(filter);
    
    collector.on('collect', r => {
    let role = message.guild.roles.find(r => r.name === "xupador de rola");
        message.member.addRole(role);
  });
   
       collector1.on('collect', r1 => {
    let role2 = message.guild.roles.find(r => r.name === "filmao lendario");
        message.member.addRole(role2);
  });
       
   }
}