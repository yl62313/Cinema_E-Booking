const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = Schema({
    numberOfTickets: {
        type: Number
    },

    movieID: {
        type: Number
    },

    show: {
        type: Schema.Types.ObjectId, ref: "Show"
    },

    tickets: {
        type: [Schema.Types.ObjectId], ref: "Ticket",
        unique: true
    },

    promotion: {
        type: [Schema.Types.ObjectId], ref: "Promotion"
    },

    bookingNumber: {
        type: Number,
        unique: true
    },

    paymentCardNumber: {
        type: String,
        unique: true
    },

    customerID: {
        type: Number
    }
})

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking