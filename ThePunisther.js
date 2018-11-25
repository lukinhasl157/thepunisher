const { Client, Collection } = require('discord.js');
const { Category } = require('./structures/');
const fs = require("fs");

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
     * @param {Object} options Opções requisitas do Discord.js
     */
    constructor(config = {}, categories = {}, options = {}) {
        super(options);
         
        this.config = config;
        this.categories = new Collection();

        for (const key in categories)
            this.categories.set(key, new Category(this, key, categories[key]));

        this.initializeListeners();
    }
    
    /**
     * Inicializa os eventos
     */
    initializeListeners() {
        let path = this.config.folders.listeners;
        fs.readdirSync(path).forEach((file) => {
            if (file.endsWith('.js')) {
                const Listener = require(path + '/' + file);
                this.on(file.replace(/.js/g, ''), Listener);
            }
        });
    }

    /**
     * Todos comandos do bot
     * @returns {Collection<Command>} 
     */
    get commands() {
        return this.categories.reduce((commands, category) => {
            category.commands.forEach((c) => commands.set(c.name, c));
            return commands;
        }, new Collection());
    }

    /**
     * procura um comando
     * @param {String} name nome ou alias do comando 
     * @returns {Command} 
     */
    fetchCommand(name) {
        name = name.toLowerCase();
        return this.commands.find(command => command.name.toLowerCase() === name || command.aliases.includes(name));
    }

    /**
     * Renomea os nomes dos canais da categoria pelas estatísticas do bot  
     * @param {Discord.CategoryChannel} category 
     */
    editStatusChannels(category) {
        let keys = ['commands', 'guilds', 'users'];
        let names = ['Comandos', 'Servidores' , 'Usúarios'];

        category.edit({ name: `STATUS ${this.user.username}` })
        category.children.array().slice(0, keys.length).forEach((channel, i) => {
            let key = this[keys[i]];
            if (key) channel.edit({name: `${names[i]}: ${key.size}` });
        })
    }

}

module.exports = ThePunisther;