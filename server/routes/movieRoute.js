const router = require("express").Router();
const Movie = require('../models/movieModel');

//later when AuthPage.js works, add auth 
router.post('/add-movie', async(req,res)=> {
    try{
        const newMovie =new Movie(req.body);
        await newMovie.save()
        res.send({
            success: true,
            message: "Movie added successful"
        })
    }catch(error){
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get('/bring-movie',async(req,res)=> {
    try{
        const movies = await Movie.find();
        res.send({
            success: true,
            message: "Movies fetched successful",
            data: movies,
        });
    } catch (error){
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.post('/edit-movie', async(req,res)=> {
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body)
        res.send({
            success: true,
            message: "Movie updated",
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        });
    }
});

router.post('/delete-movie', async(req,res)=> {
    try {
        await Movie.findByIdAndDelete(req.body.movieId)
        res.send({
            success: true,
            message: "Movie deleted"
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        })
    }
})

router.get("/get-movie-by-id/:id", async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.send({
        success: true,
        message: "Movie fetched successfully",
        data: movie,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
})
router.get("/", async(req,res) => {
    try {
      const search = req.query.title || "";
      const filter = req.query.filter || "";
      const genre = req.query.genre || "";
      const rating = req.query.rating || "";
  
      // Find all genres in the database
      const genres = await Movie.distinct("genre");
      const ratings = await Movie.distinct("rating");
  
      // Find movies matching the specified search term, genre, title, and rating
      const movies = await Movie.find({
        title: { $regex: search, $options: "i" },
        genre: { $regex: genre, $options: "i" },
        rating: { $regex: rating, $options: "i" }
      }).sort(filter);
  
      // Get the count of movies matching the specified search term, genre, title, and rating
      const total = await Movie.countDocuments({
        title: { $regex: search, $options: "i" },
        genre: { $regex: genre, $options: "i" },
        rating: { $regex: rating, $options: "i" }
      });
  
      const response = {
        error: false,
        total,
        movies,
      };
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Error" });
    }
});
router.post("/", async(req,res) => {
    try {
      const search = req.body.title || "";
      const filter = req.body.filter || "";
      const genre = req.body.genre || "";
      const rating = req.body.rating || "";
  
      // Find movies matching the specified search term, genre, title, and rating
      const movies = await Movie.find({
        title: { $regex: search, $options: "i" },
        genre: { $regex: genre, $options: "i" },
        rating: { $regex: rating, $options: "i" }
      }).sort(filter);
  
      // Get the count of movies matching the specified search term, genre, title, and rating
      const total = await Movie.countDocuments({
        title: { $regex: search, $options: "i" },
        genre: { $regex: genre, $options: "i" },
        rating: { $regex: rating, $options: "i" }
      });
  
      const response = {
        error: false,
        total,
        movies,
      };
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Error" });
    }
  });
  

module.exports = router;

