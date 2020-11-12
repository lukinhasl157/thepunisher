const { MessageEmbed } = require('discord.js');

module.exports = {
  run: ({ message, server }) => {
    const blackListCommands = server.events.get('message').commands.channels;
    const antiBot = server.events.get('guildMemberAdd').antiBot.status;
    const inviteBlock = server.events.get('message').inviteBlock.status;
    const filterWords = server.events.get('message').filterWords.status;
    const welcome = server.events.get('guildMemberAdd').welcome.status;
    const count = server.events.get('guildMemberAdd').count.status;
    const autoRole = server.events.get('guildMemberAdd').autoRole.status;
    const status = { true: 'Ativado <:on:604934721914535946>', false: 'Desativado <:off:604934721088126986>' };

    message.channel.send(new MessageEmbed()
      .setAuthor(`Configurações do servidor ${message.guild.name}`, message.guild.iconURL())
      .addField('Auto-Role', status[autoRole], true)
      .addField('Anti-Bots', status[antiBot], true)
      .addField('Bem-vindo', status[welcome], true)
      .addField('Contador de membros', status[count], true)
      .addField('Filtro de palavras', status[filterWords], true)
      .addField('Bloqueador de convites', status[inviteBlock], true)
      .addField('Canais que eu não executarei comandos', blackListCommands.length === 0 ? 'Nenhum, executarei comandos em todos os canais.' : blackListCommands.map((i) => `<#${i}>`).join(', '))
      .setThumbnail('https://cdn.discordapp.com/attachments/534942836605452290/604937235808256003/base-de-dados_1.png'));
  },
  name: 'config',
  aliases: [],
};
