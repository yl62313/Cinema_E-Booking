const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShowRoomSchema = Schema({
    roomNumber: {
        type: Number
    },

    seatsAvailable: {
        type: Boolean
    },

    shows: {
        type: [Schema.Types.ObjectId], ref: "Show"
    },

    seats: {
        type: [Schema.Types.ObjectId], ref: "Seat",
        required: true
    }
})

const ShowRoom = mongoose.model('ShowRoom', ShowRoomSchema)
module.exports = ShowRoom;
