const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
    ticketID: {
        type: Number,
        unique: true
    },

    ticketType: {
        type: String,
        enum: ["CHILD", "ADULT", "SENIOR"]
    },

    seatID: {
        type: Number
    },

    showID: {
        type: Number
    }
})

const Ticket = mongoose.model('Ticket', TicketSchema)
module.exports = Ticket