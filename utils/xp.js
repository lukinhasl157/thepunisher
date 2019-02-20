module.exports = class GiveXp {
    constructor(database, ref, message) {
        this.database = database
        this.ref = ref
        this.message = message
    }

    async giveXp() {
        let xp = ''
        let nextLevel = ''
        let points = Math.floor(Math.random() * 7) + 8

        const ref = await this.database.ref(this.ref);
        const data = await ref.once('value');

        if (data.val() === null) {
            ref.set({
                xp: 0,
                level: 1
            })
        } else {
            xp = data.val().xp + points
            nextLevel = data.val().level * 500
            ref.update({
                xp: xp
            })

            if (nextLevel <= xp) {
                nextLevel = data.val().level + 1
                ref.update({
                    level: nextLevel
                })

                await this.message.channel.send(`Parabéns **${this.message.author.tag}** você subiu de nível! Nível atual: ${data.val().level + 1}`);
            }
        }

    }
}