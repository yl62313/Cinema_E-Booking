const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ShowTimeSchema = Schema({
    time: {
        type: Date
    },

    shows: {
        type: [Schema.Types.ObjectId], ref: "Show"
    }
})

const ShowTime = mongoose.model('ShowTime', ShowTimeSchema)
module.exports = ShowTime