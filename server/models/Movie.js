const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = Schema({
    duration: {
        type: Date
    },

    title: {
        type: String
    },

    category: {
        type: String
    },

    director: {
        type: String
    },

    producer: {
        type: String
    },

    cast: {
        type: String
    },

    synopsis: {
        type: String
    },

    reviews: [{
        type: String
    }],

    rating: {
        type: String
    },

    shows: {
        type: [Schema.Types.ObjectId], ref: "Show"
    }

})

const Movie = mongoose.model('Movie', MovieSchema)
module.exports = Movie