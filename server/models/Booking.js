const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = Schema({
    

    movie: {
        type: String,
    },

    showID: {
        type: Schema.Types.ObjectId, ref: "Show"
    },

    seats: {
        type: [String], 
        required: true
      },

    totalPrice: {
        type: String,
    },

    promotion: {
        type: String,
    },

    bookingNumber: {
        type: Number,
        
    },

    paymentCardNumber: {
        type: String,
        
    },

    customerEmail: {
        type: String
    }
})

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking