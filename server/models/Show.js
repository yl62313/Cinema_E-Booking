const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShowSchema = Schema({
    dateAndTime: {
        type: Schema.Types.ObjectId, ref: "ShowTime"
    },

    seatsAvailable: {
        type: Boolean,
        default: true
    },

    room: {
        type: Schema.Types.ObjectId, ref: "ShowRoom"
    },

    movie: {
        type: Schema.Types.ObjectId, ref: "Movie"
    }
})

const Show = mongoose.model('Show', ShowSchema)
module.exports = Show