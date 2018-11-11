    const gifSearch = require("gif-search");

    module.exports.run = async (bot, message, args) => {

let pesq = args.join(" ")
gifSearch.random(pesq).then(
    gifUrl => message.channel.send({embed: {
        title: `Resultado da pesquisa de gifs: ${pesq}`,
        image: {url: gifUrl},
        color: message.member.displayColor
      }})
);

}
module.exports.help = {
    name: "gif"
  }
