const mongoose = require("mongoose");

const ShowSchema = mongoose.Schema({
    showID: {
        type: Number,
        unique: true
    },

    dateAndTime: {
        type: Date
    },

    duration: {
        type: Date
    }
})

const Show = mongoose.model('Show', ShowSchema)
module.exports = Show