const CommandError = require('./CommandError.js')

const RESPONSES = {
  voiceChannelOnly: 'Por favor, entre em um canal de voz primeiro!',
  argsRequired: 'Requisito de argumentos!',
  clientPermissions: {
    CONNECT: (_, m) => `» **${m.author.username}** | Desculpe, eu não tenho permissão para entrar neste canal! Permissão requirida: \`\`CONNECT\`\`.`,
    SPEAK: (_, m) => `» **${m.author.username}** | Desculpe, eu não tenho permissão para trasmitir áudio neste canal! Permissão requirida: \`\`SPEAK\`\`.`,
    OR: (p, m) => `» **${m.author.username}** | Desculpe, eu não tenho permissão de ${p}`
  }
}

const stringOrFunc = (d, ...args) => typeof d === 'string' ? d : typeof d === 'function' ? d(...args) : d

class CommandRequirements {
  constructor (data = {}) {
    this.voiceChannelOnly = !!data.voiceChannelOnly
    this.argsRequired = !!data.argsRequired
    this.clientPermissions = data.clientPermissions || null
    
    this.responses = Object.assign(RESPONSES, data.responses)
  }

  handle (bot, message, args) {
    if (message.guild && this.clientPermissions) {
      const permissions = Object.keys(this.clientPermissions)
      const permission = permissions.find(p => !message.guild.me.hasPermission(p))
      if (permission) {
        throw new CommandError(stringOrFunc(this.responses.clientPermissions[permission], permission, message, args, bot))
      }
    }

    if (this.voiceChannelOnly && message.member && message.member.voiceChannel) {
      throw new CommandError(stringOrFunc(this.responses.voiceChannelOnly, message, args, bot))
    }

    if (this.argsRequired && (args.length === 0)) {
        throw new CommandError(stringOrFunc(this.responses.argsRequired, message, args, bot))
    }
  }
}

module.exports = CommandRequirements
