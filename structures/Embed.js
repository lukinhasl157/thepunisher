const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale('pt-BR');

class Embed extends MessageEmbed {
    constructor(message, data) {
        super(data);

        this._message = message;
        this._command = message.command;
        this._bot = message.client;

        if (this._command)
            this.setColor(this._command.category.color);

        this.footerUserUsed();
    }

    footerUserUsed() {
        this.setFooter(`${this._message.author.tag} • ${moment().format('ll')}`, this._message.author.avatarURL());
        return this;
    }

    footerHelp(command) {
        command = command || this._command;
        if (command) this.setFooter(`utilize ${process.env.prefix}help ${command.name} pra mais informações`);
        return this;
    }
}

module.exports = Embed;