const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ShowTimeSchema = Schema({
    date: {
        type: Date
    },
    
    time: {
        type: Date
    }
})

const ShowTime = mongoose.model('ShowTime', ShowTimeSchema)
module.exports = ShowTime