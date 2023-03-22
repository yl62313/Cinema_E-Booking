const mongoose = require("mongoose")

const PromotionSchema = mongoose.Schema({
    name: {
        type: String,
    },

    code: {
        type: String,
        unique: true,
    },

    discount: {
        type: Number,
    },

    startDate: {
        type: Date,
    },

    endDate: {
        type: Date,
    }
})

const Promotion = mongoose.model('Promotion', PromotionSchema)
module.exports = Promotion

