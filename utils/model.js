const { Schema, model } = require("mongoose");

const Guild = new Schema({
    _id: {
        type: String
    },
    prefix: {
        type: String,
        default: process.env.PREFIX
    },
    events: {
        type: Map,
        default: {
            guildMemberAdd: {
                status: false, message: "None", channel: "none"
            },
            guildMemberRemove: {
                status: false, message: "None", channel: "None"
            }
        }
    }
});
module.exports = model("Guilds", Guild);