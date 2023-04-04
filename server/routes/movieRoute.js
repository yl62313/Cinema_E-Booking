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

router.get('/bring-movie-byid/:id',async(req,res)=>{
    try {
        const movie = await Movie.findById(req.params.id);
        res.send({
            success:true,
            message:"Movie fetched",
            data: movie,
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        })
        
    }
})


module.exports = router;