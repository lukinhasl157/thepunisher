const { Command } = require("../../structures");
const { createCanvas, loadImage, Image } = require("canvas");
const pixelUtil = require('pixel-util');
const { MessageAttachment } = require('discord.js');
const fs = require("fs");

class Icon extends Command {
    constructor(name, category) {
        super(name, category);
        this.exemples = ['@bot -t', '', '@bot'];
        this.usage = '[@mention]';
    }

    async run(message) {
        let user = message.mentions.users.first() || message.author;

        let icone = this.icon(message.content.includes('-t'));
         
        let msg = await message.channel.send("<a:eitaporra:510231316214841355> Criando...");

        const canvas = new createCanvas(1024, 1024);
        const ctx = canvas.getContext('2d');
        
        let icon = await loadImage(icone.image);

        let avatar = await loadImage(user.avatarURL({size: 2048, format: 'png'}));

       await ctx.drawImage(avatar, 0, 0, 1024, 1024);

       ctx.save();
       ctx.globalAlpha = 0.5;

       await ctx.drawImage(icon, icone.y, icone.x, icone.sizey, icone.sizex);

       await message.channel.send(new MessageAttachment(canvas.toBuffer(), 'image.png'));
       await msg.delete();

    }

    icon(full = false) {
       return {
           image: full ? __dirname + '/logo-l-p.png' : this.bot.user.avatarURL({size: 2048, format: 'png'}),
           y: full ? 0 : 830,
           x: full ? 0 : 0,
           sizey: full ? 1024 : 200,
           sizex: full ? 1024 : 200
       }
    }

}

module.exports = Icon;