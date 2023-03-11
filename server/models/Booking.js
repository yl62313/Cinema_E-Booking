const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = Schema({
    numberOfTickets: {
        type: Number
    },

    movie: {
        type: Schema.Types.ObjectId, ref: "Movie"
    },

    show: {
        type: Schema.Types.ObjectId, ref: "Show"
    },

    showTime: {
        showTime: {
            type: Schema.Types.ObjectId, ref: "ShowTime"
        }
    },

    tickets: {
        type: [Schema.Types.ObjectId], ref: "Ticket",
        required: true
    },

    promotion: {
        type: [Schema.Types.ObjectId], ref: "Promotion"
    },

    bookingNumber: {
        type: Number,
        unique: true
    },

    numberOfSeats: {
        type: Number
    },

    creditCardNumber: {
        type: String
    }
})

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking