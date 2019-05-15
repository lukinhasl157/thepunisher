class CommandError extends Error {
  constructor (e, showUsage = false) {
    this.message = e
    this.showUsage = showUsage
  }
}

module.exports = CommandError
