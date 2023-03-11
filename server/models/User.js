const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    guestID: {
        type: Number,
        unique: true
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;