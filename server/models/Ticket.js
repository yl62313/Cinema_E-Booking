const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = Schema({
    

    ticketType: {
        type: String,
        enum: ["CHILD", "ADULT", "SENIOR"]
    },

    seat: {
        type: String,
    },

    showID: {
        type: String,
    }
})

const Ticket = mongoose.model('Ticket', TicketSchema)
module.exports = Ticket