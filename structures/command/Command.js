const CommandError = require('./CommandError.js')
const CommandRequirements = require('./CommandRequirements.js')

class Command {
  constructor (data = {}) {
    this._data = data

    this.name = data.name
    this.aliases = data.aliases || []
    this.description = data.description || 'Sem descrição'
    this.category = data.category || 'general'
    this._run = data.run
  }

  run (bot, message, args) {
    try {
      const requirements = new CommandRequirements(this._data)
      await requirements.handle(bot, message, args)
      return this._run(bot, message, args)
    } catch (e) {
      if (e instanceof CommandError) {
        message.channel.send(e.message)
      } else {
        message.channel.send('deu erro')
        console.log(e)
      }
    }
  }
}

module.exports = Command
