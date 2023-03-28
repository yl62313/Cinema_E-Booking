const mongoose = require("mongoose");

const ShowSchema = mongoose.Schema({
    showID: {
        type: Number,
        unique: true
    },

    dateAndTime: {
        type: mongoose.Schema.Types.Subdocument, ref: "ShowTime"
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