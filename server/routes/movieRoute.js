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

module.exports = router;