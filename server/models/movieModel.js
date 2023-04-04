const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    cast: {
      type: [String],
      required: true,
  },

  reviews: {
    type: [String],
    required: true,
},

director: {
  type: String, 
  required: true,
},
producer: {
  type: String,
  required: true,
},
rating: {
    type: String,
    required: true,
},

trailer: {
    type: String,
    required: true,
},
    poster: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("movies", movieSchema);