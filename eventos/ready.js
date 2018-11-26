module.exports.run = function() {
    let status = [
        `para ${this.users.size} usuários.`,
        `Está com dúvidas? Digite ${process.env.prefix}help para receber todas as minhas informações!`,
      ];
      
        let setStatus = () => {
            let randomStatus = status[Math.floor(Math.random() * status.length)];
            this.user.setPresence({game:  {name: randomStatus, type: 'STREAMING', url: 'http://twitch.tv/thedoomsday27'}});
        }
      
    setInterval(() => setStatus(), 15000);
      
    this.channels.get("515877820358983693").setName(`» :file_cabinet: Servidores: [${this.guilds.size}]`);
    this.channels.get("516051234168242179").setName(`» <:user:500109138953633792> Usuários: [${this.users.size}]`);
    this.channels.get("516051255014195201").setName(`» <:canal:513884866455273494> Canais: [${this.channels.size}]`);

    console.log("Bot iniciado com sucesso!");
    console.log('Status carregado com sucesso!');
      
}