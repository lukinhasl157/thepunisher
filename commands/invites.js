const Discord = require('discord.js'),
arraySort = require('array-sort');
table = require('table'); 

module.exports.run = async (bot, message, args,) => {

    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send('Desculpe, eu não tenho as permissões adequadas para ver os convites!');
    })

    invites = invites.array();
    arraySort(invites, 'uses', { reverse: true });
    let possibleInvites = [['User', 'Uses']]; 
    invites.forEach(function(invite) {
        possibleInvites.push([invite.inviter.username, invite.uses]);
    })
    const embed = new Discord.RichEmbed()
        .setColor(0xCB5A5E)
        .addField('Entre os melhores', `\`\`\`${table.table(possibleInvites)}\`\`\``)
        .setImage('https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/trophy-128.png')
        message.channel.send(embed);
}
module.exports.help = {
  name:"invites"
}
