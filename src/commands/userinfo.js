'use strict';
const { MessageEmbed } = require('discord.js'),
  moment = require('moment');
moment.locale('pt-BR');

module.exports = {
  run: ({ message, args }) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member,
      status = {
        online: '<:online:535161741873643531> Disponível',
        offline: '<:offline:535161911956996104> Invisível',
        idle: '<:ausente:535161866415112192> Ausente',
        dnd: '<:ocupado:535161952075251742> Não perturbar',
      },
      gamePresence = {
        'Visual Studio Code': '<:vsc:536600505099616267> Visual Studio Code',
        Youtube: '<:Youtube:536605153759985665> Youtube',
        Spotify: '<:Spotify:536607195949694977> Spotify',
        'Sublime Text': '<:SublimeText:536606178323726387> Sublime Text',
        'Counter-Strike Global Offensive': '<:CSGO:536606981192941568> Counter-Strike: Global Offensive',
        Netflix: '<:Netflix:536605205916155904> Netflix',
        'Adobe Photoshop': '<:AdobePhotoshop:536607935909068800> Adobe Photoshop',
        'Adobe Illustrator': '<:Adobe_Illustrator:536607785581019163> Adobe Illustrator',
        'League of Legends': '<:LeagueOfLegends:536606575947808779> League of Legends',
        'World of Warcraft': '<:WoW:536608041056075786> World of Warcraft',
        Fortnite: '<:fortnite:537665269464825866> Fortnite',
        "PLAYERUNKNOWN'S BATTLEGROUNDS": "<:PUBG:537667392029982744> PLAYERUNKNOWN'S BATTLEGROUNDS",
      },
      roles = member.roles.cache.filter((r) => r.id !== message.guild.id)
        .sort((a, b) => b.position - a.position)
        .map((i) => i.toString());

    let rolesText;
    if (roles.length === 0) {
      rolesText = 'O usuário não possui nenhum cargo.';
    } else if (roles.length > 10) {
      rolesText = `${roles.slice(0, 10).join(', ')} e mais ${roles.length - 10} cargos...`;
    } else {
      rolesText = roles.join(', ');
    }

    message.channel.send(new MessageEmbed()
      .setAuthor(`» 📚 Informações do usuário: ${member.user.username}`, member.user.displayAvatarURL())
      .setThumbnail(member.user.displayAvatarURL().endsWith('.gif') ? member.user.displayAvatarURL({ size: 1024 }) : member.user.displayAvatarURL({ format: 'png', size: 1024 }))
      .addField('» 👤 Usuário:', member.user.tag, true)
      .addField('» 🗂 ID:', member.user.id, true)
      .addField('» 🚦 Status:', status[member.user.presence.status], true)
      .addField('» Dispositivo móvel:', member.user.presence.clientStatus.mobile ? 'Sim' : 'Não', true)
      .addField('» 📆 Entrou em:', moment(member.joinedAt).format('LL'), true)
      .addField('» 📆 Dias no Discord:', moment().diff(member.user.createdAt, 'days'), true)
      .addField('» 📆 Conta criada em:', moment(member.user.createdAt).format('LL'), true)
      .addField('» 📆 Dias no servidor:', moment().diff(member.joinedAt, 'days'), true)
      .addField('» 🛡 Administrador:', member.permissions.has('ADMINISTRATOR') ? 'Sim' : 'Não', true)
      .addField('» 🏷 Apelido:', !member.nickname ? 'Sem apelido' : member.nickname, true)
      .addField('» 🎮 Jogando:', !member.user.presence.activity || !member.user.presence.activity.name ? 'O usuário não está jogando nada no momento.' : gamePresence[member.user.presence.activity.name] || member.user.presence.activity.name.replace('Custom Status', 'Status personalizado.'), false)
      .addField('» Detalhes:', !member.user.presence.activity || !member.user.presence.activity.details ? 'Nenhum detalhe de jogo.' : member.user.presence.activity.details, true)
      .addField(!member.user.presence.activity ? '» Status do jogo:' : '» Mensagem de status:', !member.user.presence.activity || !member.user.presence.activity.state ? 'Nenhum status.' : member.user.presence.activity.state, true)
      .addField(`» Cargos [${roles.length}]`, rolesText, false)
      .setColor(member.displayColor)
      .setTimestamp(new Date())
      .setFooter(`» Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL())
    );
  },
  name: 'userinfo',
  aliases: ['perfil', 'info', 'ui'],
  category: 'Moderação',
  description: 'Mostrar as informações do usuário.',
};
