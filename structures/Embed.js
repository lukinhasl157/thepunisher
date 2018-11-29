const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale('pt-BR');

/**
 * @property {Message} _message mensagem de quem usou o comando
 * @property {Command} _command comando que está sendo usado
 * @property {ThePunisther} _bot cliente do bot
 */
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

    /**
     * seta o footer do embed com o nome e o avatar do usuario e a data atual
     * @returns {Embed}
     */
    footerUserUsed() {
        this.setFooter(`${this._message.author.tag} • ${moment().format('ll')}`, this._message.author.avatarURL());
        return this;
    }

    /** 
     * @param {Command} command comando que será colocado no footer
     * @returns {Embed}
    */
    footerHelp(command) {
        command = command || this._command;
        if (command) this.setFooter(`utilize ${process.env.PREFIX}help ${command.name} pra mais informações`);
        return this;
    }
}

module.exports = Embed;