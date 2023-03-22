const mongoose = require("mongoose");

const SeatSchema = mongoose.Schema({
    row: {
        type: String
    },

    sectionNumber: {
        type: Number
    },

    showRoomID: {
        type: Number
    },

    available: {
        type: Boolean
    }
})

const Seat = mongoose.model('Seat', SeatSchema)
module.exports = Seat