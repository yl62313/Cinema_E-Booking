const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = Schema({

    totalPrice: {
        type: String,
    },
    nameOnCard:{
        type: String,
    },

    cardNumber: {
        type: String, 
    },
    exp: {
        type: String, 
    },
    cvv: {
        type: String, 
    },
})

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking
