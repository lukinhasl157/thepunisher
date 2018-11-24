const { Command, Embed } = require('../../structures/');
const Util = require('util');

class Eval extends Command {
    constructor(name, category) {
        super(name, category);

        this.aliases = ['ev'];
        this.argsRequired = true;

        this.errorMessages.argsRequired = 'Digite o codigo';
        
    }

    run(message, args) {

        let bot, client, c;
        bot = client = c = this.bot;

        let code = args.join(' ').replace(/^```(js|javascript ?\n)?|```$/g, '');
        let value = (l, c) => `\`\`\`${l}\n${String(c).slice(0, 1000) + (c.length >= 1000 ? '...' : '')}\n\`\`\``;
        let embed = new Embed(message)
            .setThumbnail('https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png');
        
        try {
            let resultEval = eval(code);
            let toEval = typeof resultEval == 'string' ? resultEval : Util.inspect(resultEval, true, false);  

            embed.addField('Resultado', value('js', toEval));
            embed.addField('Codigo', value('js', code));
            embed.addField('Tipo', value('css', typeof toEval));
        
        } catch (error) {
            
            embed.addField('Error', value('js', error));
            embed.addField('Codigo', value('js', code));
            
        } finally {
            message.channel.send(embed);
        }
    }
}

module.exports = Eval;