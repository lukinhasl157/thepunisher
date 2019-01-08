
    const Discord = require("discord.js");

module.exports = {
    run: (bot, message, args) => {

    let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
                   let permissions = {
            "CREATE_INSTANT_INVITE": "Criar convite instantâneo",
            "KICK_MEMBERS": "Expulsar usuários",
            "BAN_MEMBERS": "Banir usuários",
            "ADMINISTRATOR": "Administrador",
            "MANAGE_CHANNELS": "Gerenciar canais",
            "MANAGE_GUILD": "Gerenciar servidor",
            "ADD_REACTIONS": "Adicionar reação",
            "VIEW_AUDIT_LOG": "Ver registro de auditoria",
            "VIEW_CHANNEL": "Ver canais",
            "READ_MESSAGES": "Ver mensagens",
            "SEND_MESSAGES": "Enviar mensagens",
            "SEND_TTS_MESSAGES": "Enviar mensagens com aúdio",
            "MANAGE_MESSAGES": "Gerenciar mensagens",
            "EMBED_LINKS": "Links em embed",
            "ATTACH_FILES": "Arquivos arquivados",
            "READ_MESSAGE_HISTORY": "Ver histórico de mensagens",
            "MENTION_EVERYONE": "Mencionar todos",
            "EXTERNAL_EMOJIS": "Emojis externos",
            "USE_EXTERNAL_EMOJIS": "Usar emojis externos",
            "CONNECT": "Conectar",
            "SPEAK": "Falar",
            "MUTE_MEMBERS": "Silenciar usuários",
            "DEAFEN_MEMBERS": "Perdoar usuários",
            "MOVE_MEMBERS": "Mover usuários",
            "USE_VAD": "Usar detecção de voz",
            "PRIORITY_SPEAKER": "Prioridade para falar",
            "CHANGE_NICKNAME": "Trocar apelido",
            "MANAGE_NICKNAMES": "Gerenciar apelidos",
            "MANAGE_ROLES": "Gerenciar cargos",
            "MANAGE_ROLES_OR_PERMISSIONS": "Gerenciar cargos e permissões",
            "MANAGE_WEBHOOKS": "Gerenciar webhooks",
            "MANAGE_EMOJIS": "Gerenciar emojis"
            }
    let embed = new Discord.RichEmbed()
    .setDescription(`Permissões de **${member.user.username}**`)
    .addField(`Lista de permissões:`, `\`\`\`js\n${permissions[message.channel.permissionsFor(member).toArray()]}\`\`\``)
    .setColor('#ff0000')
    .setTimestamp(new Date())
    .setFooter(member.user.tag, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    message.channel.send(embed);
},

    aliases: ["perms", "permi"],
    category: "Moderação",
    description: "Mostrar as permissões do usuário."
}