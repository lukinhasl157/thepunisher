class Category {
    constructor(name, data) {
        this.name = name;

        this.description = '';
        this.emoji = '';
        this.color = 0;
        this.dir = '';

        for (const key in data)
            if (!this[key]) this[key] = data[key]; 
    }
}

module.exports = Category;