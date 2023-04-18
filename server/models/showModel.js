const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    movie : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
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
    totalSeats : {
        type: Number,
        required: true
    },
    bookedSeats:{
        type:Array,
        default:[]
    },
    childPrice: {
        type: Number,
        default: 5,
    },
    adultPrice: {
        type: Number,
        default: 10,
    },
    seniorPrice: {
        type: Number,
        default: 5,
    },
} , { timestamps: true });

const Show = mongoose.model('shows', showSchema);

module.exports = Show;
