module.exports = {
  run: async ({ message }) => {
    const msg = await message.author.send("Deseja criar um ticket? Digite \`\`sim\`\` para criar e \`\`não\`\` para cancelar.");
    const filter = m => m.author.id == message.author.id;
    const collector = await msg.channel.createMessageCollector(filter, { max: 1 });
    
    collector.on("collect", async (msg) => {
      switch (msg.content.toLowerCase().split(' ')[0]) {
        case "não":
          message.author.send("Ticket cancelado.");
        break;
        case "sim":
          const msg2 =  await message.author.send("Você tem \`\`60s\`\` para enviar o ticket.").then(setTimeout(() => { message.author.send("Tempo esgotado.") }, 60 * 1000));
          const filter2 = m => m.author.id == message.author.id;
          const collector2 = await msg2.channel.createMessageCollector(filter2, { max: 1, time: 60 * 1000 });

          collector2.on("collect", (msg2) => {
            message.author.send("Ticket enviado com sucesso!"); 
            message.channel.send("coletado: \n" + msg2.content);
          });
        break;
      }    
    });
  }
}