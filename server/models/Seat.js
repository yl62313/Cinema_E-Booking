const mongoose = require("mongoose");

const SeatSchema = mongoose.Schema({
    row: {
        type: String
    },

    sectionNumber: {
        type: Number
    }
})

const Seat = mongoose.model('Seat', SeatSchema)
module.exports = Seat