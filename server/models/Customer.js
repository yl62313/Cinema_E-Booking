const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = Schema({
    customerID: {
        type: Schema.Types.ObjectId, ref: "Customer",
        unique: true
    },
    
    email: {
        type: String,
        trim: true,
        unique: [true, "That email is taken."]
    },

    password: {
        type: String,
    },

    firstName: {
        type: String,
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },

    phoneNumber: {
        type: String
    },

    paymentCards: {
        type: [Schema.Types.ObjectId], ref: "PaymentCard",
        unique: true,
        default: null
    },

    address: {
       type: Schema.Types.ObjectId, ref: "Address",
       unique: true,
       default: null
    },

    bookings: {
        type: [Schema.Types.ObjectId], ref: "Booking",
        unique: true,
        default: null
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