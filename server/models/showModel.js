const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    movie : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
        required: true
    },
    name : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    time : {
        type: String,
        required: true
    },
    aticketPrice : {
        type: Number,
        required: true
    },
    cticketPrice : {
        type: Number,
        required: true
    },
    totalSeats : {
        type: Number,
        required: true
    },
    bookedSeats : {
        type: Array,
        default: []
    },
} , { timestamps: true });

const Show = mongoose.model('shows', showSchema);

module.exports = Show;
