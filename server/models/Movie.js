const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = Schema({
    duration: {
        type: String
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
        type: [String]
    },

    cast: {
        type: [String]
    },

    synopsis: {
        type: String
    },

    reviews: {
        type: [String]
    },

    rating: {
        type: String
    },

    trailer: {
        type: String
    },

    poster: {
        type: String
    }

})

const Movie = mongoose.model('Movie', MovieSchema)
module.exports = Movie