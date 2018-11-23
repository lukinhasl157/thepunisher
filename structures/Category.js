const { Collection } = require('discord.js');
const fs = require('fs');
class Category {
    constructor(client, id, data) {
        this.id = id;
        this.client = client;

        this.name = '';
        this.description = '';
        this.emoji = '';
        this.color = 0;
        this.dir = '';

        for (const key in data)
            if (!this[key]) this[key] = data[key];
            
        this.directory = `${__dirname}/../${this.dir}`;

        this.commands = new Collection();

        this.initialize();
    }

    initialize() {
        fs.readdirSync(this.directory).forEach((file) => {
            if (file.endsWith('.js')) {
                let Command = require(this.directory + '/' + file);
                let command = new Command(this.client);

                this.commands.set(file.replace('.js'), command);
            }
        });
    }

}

module.exports = Category;