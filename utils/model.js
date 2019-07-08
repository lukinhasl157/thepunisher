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
                welcome: {
                    status: false, message: "None", channel: "none"
                },
                antiBot: {
                    status: false
                }
            },
            guildMemberRemove: {
                status: false, message: "None", channel: "None"
            },
            filterWords: {
                status: false,
                words: []
            }
        }
    }
});
module.exports = model("Guilds", Guild);