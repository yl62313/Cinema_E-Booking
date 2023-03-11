const mongoose = require("mongoose")

const AddressSchema = mongoose.Schema({
    street: {
        type: String,
    },

    city: {
        type: String,
    },

    state: {
        type: String,
    },

    zipCode: {
        type: String,
    }
})

const Address = mongoose.model('Address', AddressSchema)
module.exports = Address