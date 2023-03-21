const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = Schema({
    ticketID: {
        type: Number,
        unique: true
    },

    ticketType: {
        type: String,
        enum: ["CHILD", "ADULT", "SENIOR"]
    },

    seat: {
        type: Schema.Types.ObjectId, ref: "Seat"
    },

    showID: {
        type: Number
    }
})

const Ticket = mongoose.model('Ticket', TicketSchema)
module.exports = Ticket