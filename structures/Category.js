const { Collection } = require('discord.js');

const fs = require('fs');

/**
 * Estrutura das categorias do bot
 * @prop {String} id abreviação do nome da categoria
 * @prop {ThePunisther} client client do bot
 * @prop {String} name nome da categoria
 * @prop {String} description descrição que será usado no comando help
 * @prop {String} emoji Emoji que será usado no comando help
 * @prop {Number} color Cor dos embeds da categoria
 * @prop {String} dir pasta dos comandos
 * @prop {String} directory diretório da pasta dos comandos
 * @prop {Collection<Command>} commands os comandos da categoria
 */
class Category {
    /**
     * @param {ThePunisther} client client do bot 
     * @param {String} id  abreviação do nome da categoria
     * @param {Object} data propriedades da categorias
     */
    constructor(client, id, data) {
        this.id = id;
        this.client = client;
         
        this.name = '';
        this.description = '';
        this.options = {};
        this.emoji = '';
        this.color = 0;
        this.dir = '';

        for (const key in data)
            if (!this[key]) this[key] = data[key];
        
        this.directory = `${__dirname}/../${this.dir}`;

        this.commands = new Collection();

        this.initialize();
    }

    // adiciona os comandos da pasta no this.commands
    initialize() {
        fs.readdirSync(this.directory).forEach((file) => {
            if (file.endsWith('.js')) {
                let Command = require(this.directory + '/' + file);
                let name = file.replace(/.js/g, '');
                let command = new Command(name, this);

                this.commands.set(name, command);
            }
        });
    }

}

module.exports = Category;