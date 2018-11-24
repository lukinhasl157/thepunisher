const { Client, Collection } = require('discord.js');
const { Category } = require('./structures/');

/**
 * Client princial do The Punisther
 * @extends Discord.Client
 * @prop {Object} config arquivo config.json
 * @prop {Collection<Category>} categories As categorias do bot
 */
class ThePunisther extends Client {
    /**
     *  Cria o Bot
     * @param {Object} config arquivo config.json
     * @param {Object} categories arquivo categories.json
     * @param {Object} options Opções requisita por Discord.js
     */
    constructor(config = {}, categories = {}, options = {}) {
        super(options);
         
        this.config = config;
        this.categories = new Collection();

        for (const key in categories)
            this.categories.set(key, new Category(this, key, categories[key]));
    }
    
}

module.exports = ThePunisther;