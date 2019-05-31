module.exports = {
  run: (bot, message, args) => {
    const commands = args.slice(0).join(" ");

    if (message.author.id !== '289209067963154433') {
      return message.channel.send(`<:cancel1:500150315304091649> Este comando é exclusivo para desenvolvedores.`);
    } else if (!commands) {
      return message.channel.send(`Por favor, digite o nome do comando que deseja dar reload.`);
    } else {
      try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
      } catch (e) {
        return message.channel.send(`<:cancel1:500150315304091649> Desculpe, o comando **${args[0]}** não existe ou foi digitado incorretamente.`);
      }
      message.channel.send(`Comando **${args[0]}** foi reiniciado com sucesso! <a:sucessogif:499614074129350666>`);
    }
  },
  aliases: ["recarregar", "reiniciar"],
  category: "Desenvolvedor",
  description: "Reiniciar um comando."
}