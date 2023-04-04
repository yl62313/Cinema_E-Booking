const express = require("express");
const movieController = require("../controllers/movies-controller");
const router = express.Router();

router.post("/addMovie", async (req, res) => {
    const { duration, title, category, director, producer, cast, synopsis, reviews, rating, trailer, poster } = req.body;
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
      trailer,
      poster
    });
  
    try {
      await createdMovie.save();
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({message: "You fool"});
    }
    
    const showTime = new Date(req.body.date);
    const date = showTime.toLocaleDateString();
    const time = req.body.time;
  
    const createdShowTime = new ShowTime({
      date,
      time
    });
  
    try {
      await createdShowTime.save();
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({message: "You utter fool"});
    }
  
    const dateAndTime = createdShowTime._id;
    const movie = createdMovie._id;
    const room = null;
    const createdShow = new Show({
      dateAndTime,
      movie,
      room
    });
  
    try {
      await createdShow.save();
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({message: "You absolute fool"});
    }
  
    return res.status(201).json({message: "Created movie, show time, and show."});
  })

module.exports = router;