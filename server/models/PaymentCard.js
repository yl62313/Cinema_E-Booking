const mongoose = require("mongoose")

const PaymentCardSchema = mongoose.Schema({
    cardNumber: {
        type: String,
        unique: true
    },

    expirationDate: {
        type: Date,
    }
})

const PaymentCard = mongoose.model('PaymentCard', PaymentCardSchema)
module.exports = PaymentCard