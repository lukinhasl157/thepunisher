module.exports = {
    run: async function (bot, message, args) {
        
        message.author.send("1º Passo: Qual o nome do usuário que deseja denunciar?\nExemplo: ``The Punisher#4581``")
            .catch(e => {
                message.channel.send(`${message.author.username} | Por favor, ative suas mensagens diretas para que possa enviar meus comandos.`);
                return;
            });
        
        message.channel.send(`${message.author.username} | Verifique as suas Mensagens Diretas.`)
            .then(msg => {
                msg.delete(60 * 1000)
            });

        const filter = m => m.author.id = message.author.id; 
        const collector = message.channel.createMessageCollector(filter, {time: 300 * 1000, max: 1});

        collector.on("collect", m => {
            let m = m.content;
            message.author.send(`2º Passo: Qual o motivo que deseja denunciar o usuário **${m.toLowerCase().includes()}**`);

        const filter2 = m2 => m2.author.id = message.author.id;
        const collector2 = message.channel.createMessageCollector(filter2, {time: 300 * 1000, max: 1});

        collector2.on("collect", m2 => {
            let m2 = m2.content;
            message.author.send(`3º Passo: Tem certeza que deseja denunciar o usuário **${m.toLowerCase().includes()}** pelo motivo \`${m2.toLowerCase().includes()}\`?\nSe deseja enviar a denuncia digite **sim**, caso não queira enviar a denuncia digite **não**`);

        const filter3 = m3 => m3.author.id = message.author.id;       
        const collector3 = message.channel.createMessageCollector(filter3, {time: 300 * 1000, max: 1});

        collector3.on("collect", async m3 => {

            let m3 = m3.content;
            if (m3.toLowerCase().includes("sim")) {
                let channel = message.guild.channel.find(ch => ch.name === "Denuncias");
                if (!channel) {
                    channel = await message.guild.createChannel("Denuncias", "text", [{
                        id: message.guild.id,
                        deny: ["SEND_MESSAGES"],
                        allow: ["ADD_REACTIONS", "VIEW_CHANNEL"]
                    }])
                    message.author.send("Sua denuncia foi enviada com sucesso. A nossa equipe irá analisar sua denuncia em breve.")
                    await channel.send(`teste\nUsuário: ${m.toLowerCase().includes()}\nMotivo: ${m2.toLowerCase().includes()}`);
                } else {
                    channel.send(`teste\nUsuário: ${m.toLowerCase().includes()}\nMotivo: ${m2.toLowerCase().includes()}`);
                };
            } else if (m3.toLowerCase().includes("não" || "nao")) {
                message.author.send("Sua denuncia foi cancelada com sucesso.");
            } else {
                message.author.send("Este argumento não é uma resposta válida, digite **SIM** para enviar a denuncia ou digite **NÃO** para cancelar a denuncia.");
            };

                });
            });            
        });
    },
    aliases: ["denunciar", "report", "repotar", "denuncia"],
    category: "Moderação",
    description: "Denunciar um usuário."
};
