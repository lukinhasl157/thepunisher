const database = require("firebase").database()

class User {
    constructor (userID, guildID) {
        this.url = `Servidores/Levels/${guildID}/${userID}`
        this.ref = database.ref(this.url)
    }

    async get () {
        const snapshot = await this.ref.once('value')
        const user = snapshot.val()
        if (user) return user

        await this.ref.set({
            xp: 0,
            level: 1
        })

        const newSnapshot = await this.ref.once('value')

        return newSnapshot.val()
    }

    async addXp () {
        const user = await this.get()
        const xp = user.xp + (Math.floor(Math.random() * 7) + 8)
        const nextLevel = (user.level * 500) <= xp ? 1 : 0
        const level = user.level + nextLevel

        await this.ref.update({ xp, level })
        return (!!nextLevel && (await this.get()).level)
    }
}

class Database {
    static user (userID, guildID) {
        return new User(userID, guildID)
    }
}

module.exports = Database