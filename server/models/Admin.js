const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    adminID: {
        type: mongoose.Schema.Types.ObjectId, ref: "Admin",
        unique: true,
    },

    password: {
        type: String
    }
})

const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin