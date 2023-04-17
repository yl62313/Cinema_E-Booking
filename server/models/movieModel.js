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
    continents:{
      type: Number,
      default: 1
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