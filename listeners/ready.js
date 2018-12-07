function Ready () {
    Object.defineProperties(this, {
        'guild': {
            get: function () { return this.guilds.get(process.env.GUILD_ID) }
        },
        'logChannels': {
            get: function () {
                return Object.values(this.config.channelIDs)
                    .map((id) => this.channels.get(id) || null)
                    .filter(channel => channel)
            }
        } 
    })

    console.log('Hello')

    this.editStatusChannels()
}

module.exports = Ready