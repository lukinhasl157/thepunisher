module.exports = {
    run: async function({ guild, Guilds }) {
        const newConfig = new Guilds({
            _id: guild.id,
            prefix: process.env.PREFIX
        });
        return newConfig.save();
    }
}