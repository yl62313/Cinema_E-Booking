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
  });

//search and filter 
router.get("/", async(req,res) => {
    try {
        //const page = parseInt(req.query.page) - 1 || 0;
        //const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let filter = req.query.filter || "rating";
        let genre = req.query.genre || "Comedy";
        
        //pull genre from the database 
        const movie = await Movie.find({ genre: { $regex: req.query.genre, $options: "i" } });
        const genreOptions = [...new Set(movie.map(m => m.genre))]; 

        

        //if query is within the genre options
        if (genreOptions.includes(req.query.genre)) {
            genre = [req.query.genre];
          } else {
            genre = req.query.genre.split(","); //split into comma seperated array 
          }
          //check if filter query parameter is given 
          if (req.query.filter) {
            filter = req.query.filter.split(",");
          } else {
            filter = [filter];
          }

          //user defines how movies will be sorted
          let filterBy = {};
        if (filter[1]) {
            filterBy[filter[0]] = filter[1];
        } else {
            filterBy[filter[0]] = "ascending";
        }
        const movies = await Movie.find({ title: { $regex: search, $options: "i" } })
        .where("genre")
        .in([...genre])
        .sort(filterBy)
       // .skip(page * limit)
       // .limit(limit);

    const total = await Movie.countDocuments({
        genre: { $in: [...genre] },
        title: { $regex: search, $options: "i" },
    });

    const response = {
        error: false,
        total,
       // page: page + 1,
       // limit, 
       genres: genreOptions,
       movies: movies.map(movie => movie.title),
    };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:false, message: "Error"});    
    } 
}); 

module.exports = router;