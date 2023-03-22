const mongoose = require("mongoose");

const ShowSchema = mongoose.Schema({
    showID: {
        type: Number,
        unique: true
    },

    dateAndTime: {
        type: Date
    },

    seatsAvailable: {
        type: Boolean
    },

    duration: {
        type: String
    },

    roomID: {
        type: Number
    },

    movieID: {
        type: Number
    }
})

const Show = mongoose.model('Show', ShowSchema)
module.exports = Show