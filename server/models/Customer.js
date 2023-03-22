const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = Schema({
    
    email: {
        type: String,
        trim: true,
        unique: [true, "That email is taken."],
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        trim: true,
        required: true
    },

    lastName: {
        type: String,
        trim: true,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    paymentCards: {
        type: [Schema.Types.ObjectId], ref: "PaymentCard",
        unique: true,
    },

    address: {
       type: Schema.Types.ObjectId, ref: "Address",
       unique: true,
    },

    bookings: {
        type: [Schema.Types.ObjectId], ref: "Booking",
        unique: true,
    },

    status: {
        type: String,
        enum: ['INACTIVE', 'ACTIVE', 'SUSPENDED'],
        default: 'INACTIVE'
    },

    subscribed: {
        type: Boolean,
        default: false
    }

})

const Customer = mongoose.model('Customer', CustomerSchema)
module.exports = Customer