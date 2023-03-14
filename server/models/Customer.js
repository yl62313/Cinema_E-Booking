const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const CustomerSchema = Schema({
    customerID: {
        type: Number,
        unique: true
    },

    username: {
        type: String,
        maxlength: 50,
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
        unique: true
    },

    address: {
       type: Schema.Types.ObjectId, ref: "Address",
       unique: true
    },

    bookings: {
        type: [Schema.Types.ObjectId], ref: "Booking",
        unique: true
    },

    staus: {
        type: String,
        enum: ['INACTIVE', 'ACTIVE', 'SUSPENDED'],
        default: 'INACTIVE'
    }

})

const Customer = mongoose.model('Customer', CustomerSchema)
module.exports = Customer