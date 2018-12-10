const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	const Discord = require('discord.js');
const quiz = [
 { q: "Qual é a cor do céu?.", a: ["sem cor", "invisível"] },
  { q: "Nomeie uma marca de refrigerante.", a: ["pepsi", "coke", "doli", "sprite", "coca"] },
  { q: "Nomeie uma linguagem de programação.", a: ["actionscript", "coffeescript", "c", "c++", "basic", "python", "perl", "javascript", "dotnet", "lua", "crystal", "go", "d", "php", "ruby", "rust", "dart", "java", "javascript"] },
  { q: "Quem é um bom menino?", a: ["voce", "eu"] },
  { q: "Em que linguagem de programação eu sou feita?", a: ["javascript",] },
  { q: "Nomeie o sétimo planeta do sol.", a: ["urano"] },
  { q: "Nomeie a maior ilha do mundo.", a: ["gronelândia",] },
  { q: "Qual o maior rio do mundo?", a: ["amazona", "rio amazonas"] },
  { q: "Nomeie o maior oceano do mundo.", a: ["pacífico", "oceano pacifico"] },
  { q: "Nomeie uma das três cores primárias.", a: ["azul", "vermelho", "amarelo"] },
  { q: "Quantas cores existem em um arco-íris?", a: ["7", "sete"] },
  { q: "Como você chama um período de mil anos?", a: ["milênio"] },
  { q: "Quantas peças existem em um tabuleiro de xadrez?", a: ["64", "sessenta e quatro"] },
  { q: "Quantos graus são encontrados em um círculo?", a: ["360", "360 graus", "trezentos e sessenta"] },
  { q: "O sistema Decimal de Dewey é usado para categorizar o que?", a: ["livros"] },
  { q: "Quantos pontos tem uma bússola?", a: ["32", "trinta e dois"] },
  { q: "Quantas cordas tem um violoncelo?", a: ["4", "quatro"] },
  { q: "Quantas sinfonias Beethoven compôs?", a: ["9", "nove"] },
  { q: "Quantas linhas deve ter uma limerick?", a: ["5", "cinco"] },
  { q: "Qual é a linguagem mais básica que a Microsoft criou?", a: ["visual básico"] },
  { q: "Qual é a linguagem mais complicada?", a: ["binário"] },
  { q: "O que é, o que é? Feito para andar e não anda?", a: ["a rua"] },
  { q: "O que é, o que é? Que dá muitas voltas e não sai do lugar?", a: ["o relógio"] },
  { q: "O que é, o que é? Tem cabeça, tem dente, tem barba, não é bicho e nem é gente?", a: ["o alho"] },
  { q: "O que é, o que é? Que não se come, mas é bom para se comer?", a: ["o talher"] },
  { q: "O que é, o que é? Que anda com os pés na cabeça?", a: ["o piolho"] },
  { q: "O que é, o que é? Quanto mais se tira mais se aumenta?", a: ["o buraco"] },
  { q: "O que é, o que é? Quanto mais cresce, mais baixo fica?", a: ["o rabo do cavalo"] },
  { q: "O que há no meio do coração?", a: ["a letra a"] },
  { q: "O que tem no meio do ovo?", a: ["a letra v"] },
  { q: "O que é, o que é? Que está sempre no meio da rua e de pernas para o ar?", a: ["a letra u"] },
  { q: "O que o tomate foi fazer no banco?", a: ["tirar extrato"] },
  { q: "O que é, o que é? Anda com a barriga para trás?", a: ["a perna"] },
  { q: "Quando é que um tigre se parece com um velho?", a: ["quando é um tigre de bengala"] },
  { q: "O que é, o que é? Que enche uma casa, mas não enche uma mão?", a: ["um botão"] },
  { q: "Abreviação do computador 'SO' geralmente significa?", a: ["sistema operacional"] }
];
const options = {
  max: 1,
  time: 30050,
  errors: ["Tempo"],
};
  
  const item = quiz[Math.floor(Math.random() * quiz.length)];
  await message.channel.send(item.q);
  try {
    const collected = await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options);
    const winnerMessage = collected.first();
    return message.channel.send({embed: new Discord.RichEmbed()
                                 .setAuthor(`Vencedora: ${winnerMessage.author.tag}`, winnerMessage.author.displayAvatarURL)
                                 .setTitle(`Resposta correta: \`${winnerMessage.content}\``)
                                 .setFooter(`Questão: ${item.q}`)
                                 .setColor(message.guild.me.displayHexColor)
                                })
  } catch (_) {
    return message.channel.send({embed: new Discord.RichEmbed()
                                 .setAuthor('Ninguém conseguiu a resposta a tempo!')
                                 .setTitle(`Respostas corretas: \`${item.a}\``)
                                 .setFooter(`Questão: ${item.q}`)
                                })
  }
}