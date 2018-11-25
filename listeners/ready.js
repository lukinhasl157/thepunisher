function Ready() {
    Object.defineProperty(this, 'defaultChannels', {value: {}});

    for (const name in this.config.channelIDs)
        this.defaultChannels[name] = this.channels.get(this.config.channelIDs[name]) || null;

    if (this.defaultChannels.categoryStatus) this.editStatusChannels(this.defaultChannels.categoryStatus);
}

module.exports = Ready;