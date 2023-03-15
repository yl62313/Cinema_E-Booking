const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShowRoomSchema = Schema({
    roomNumber: {
        type: Number
    },

    shows: {
        type: [Schema.Types.ObjectId], ref: "Show"
    },

    seats: {
        type: [Schema.Types.ObjectId], ref: "Seat",
    }
})

const ShowRoom = mongoose.model('ShowRoom', ShowRoomSchema)
module.exports = ShowRoom;
