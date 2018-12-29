module.exports = {
    run: async function (bot, message, args) {

        message.author.send("1º Passo: Qual o nome do usuário que deseja denunciar?\nExemplo: ``The Punisher#4581``").catch(e => message.channel.send(`${message.author.username} | Por favor, ative suas mensagens diretas para que possa enviar meus comandos.`));
        message.channel.send(`${message.author.username} | Verifique suas mensagens.`).then(msg => {
            msg.delete(60 * 1000)
        });

        const collector1 = channel.createMessageCollector({time: 300 * 1000});

        collector1.on("collect", m1 => {

            let msg1 = m.content.toLowerCase().includes();
            m1.stop();
            message.author.send(`2º Passo: Qual o motivo que deseja denunciar o usuário **${msg1}**`);

        });

        const collector2 = channel.createMessageCollector({time: 300 * 1000});

        collector2.on("collect", m2 => {

            let msg2 = m.content.toLowerCase().includes();
            m2.stop();
            message.author.send(`3º Passo: Tem certeza que deseja denunciar o usuário **${msg1}** pelo motivo \`\`${msg2} ?\`\`\nSe deseja enviar a denuncia digite **SIM**, caso não queira enviar a denuncia digite **NÃO**`);

        });

        const collector3 = channel.createMessageCollector({time: 300 * 1000});

        collector3.on("collect", async m3 => {

            let msgYes = m3.content.toLowerCase().includes("sim");
            let msgNo = m3.content.toLowerCase().includes("não" || "nao");

                if (msgYes) {
                    let channel = message.guild.channel.find(ch => ch.name === "Denuncias");

                    if (!channel) {
                        channel = await message.guild.createChannel("Denuncias", "text", [{

                            id: message.guild.id,
                            deny: ["SEND_MESSAGES"],
                            allow: ["ADD_REACTIONS", "VIEW_CHANNEL"]

                        }])

                        message.author.send("Sua denuncia foi enviada com sucesso. A nossa equipe irá analisar sua denuncia em breve.")
                        await channel.send(`teste\nUsuário: ${msg1}\nMotivo: ${msg2}`);

                    } else {

                        channel.send(`teste\nUsuário: ${msg1}\nMotivo: ${msg2}`);

                    }

                } else if (msgNo) {

                    message.author.send("Sua denuncia foi cancelada com sucesso.");

                } else {
                    message.author.send("Este argumento não é uma resposta válida, digite **SIM** para enviar a denuncia ou digite **NÃO** para cancelar a denuncia.")
                }

        });


},

    aliases: ["denunciar", "report", "repotar", "denuncia"],
    category: "Moderação",
    description: "Denunciar um usuário."
  }