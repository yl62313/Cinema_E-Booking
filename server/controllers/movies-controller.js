const HttpError = require("../models/HTTP-Error")
const Movie = require("../models/Movie")

const addMovie = async (req, res, next) => {
    const {duration, title, category, director, producer, cast, synopsis, reviews, rating, shows, trailer, poster} = req.body;
    const createdMovie = new Movie({
        duration,
        title,
        category,
        director,
        producer,
        cast,
        synopsis,
        reviews,
        rating,
        shows,
        trailer,
        poster
    });

    try {
        await createdMovie.save();
    } catch (err) {
        const error = new HttpError(
            'Creating movie failed, please try again.', 
            500
          );
          console.log(err.message);
          return next(error);
        }
        res.status(201).json({movie: createdMovie});
}

exports.addMovie = addMovie;