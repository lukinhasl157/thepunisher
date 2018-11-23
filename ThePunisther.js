const { Client } = require('discord.js');
const { Category } = require('./structures/');

class ThePunisther extends Client {
    constructor(config = {}, categories = {}, options = {}) {
        super(options);
         
        this.config = config;
        this.categories = new Collection();

        for (const name in categories)
            this.categories.set(name, new Category(name, categories[name]));
    }
    
}

module.exports = ThePunisther;