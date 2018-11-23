const { Client, Collection } = require('discord.js');
const { Category } = require('./structures/');

class ThePunisther extends Client {
    constructor(config = {}, categories = {}, options = {}) {
        super(options);
         
        this.config = config;
        this.categories = new Collection();

        for (const key in categories)
            this.categories.set(key, new Category(this, key, categories[key]));
    }
    
}

module.exports = ThePunisther;