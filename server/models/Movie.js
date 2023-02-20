const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    genre: {
        type: Number,
        required: true,
      },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    poster: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("movies", movieSchema);