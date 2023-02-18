const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Movie } = require("../models/Movie");


var storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (_req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    //save the imported image
    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})




router.post('/', (req, res) => {

    //It puts the information received from the front-end into the DB.
    const movie = new Movie(req.body)

    movie.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

})



router.post('/movies', (req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm


    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            console.log('key', key)

            if (key === "price") {
                findArgs[key] = {
                    //Greater than equal
                    $gte: req.body.filters[key][0],
                    //Less than equal
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }

        }
    }


    if (term) {
        Movie.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, movieInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, movieInfo,
                    postSize: movieInfo.length
                })
            })
    } else {
        Movie.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, movieInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, movieInfo,
                    postSize: movieInfo.length
                })
            })
    }

})


//id=123123123,324234234,324234234  type=array
router.get('/movies_by_id', (req, res) => {

    let type = req.query.type
    let movieIds = req.query.id

    if (type === "array") {
        //id=123123123,324234234,324234234 이거를 
        //movieIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
        let ids = req.query.id.split(',')
        movieIds = ids.map(item => {
            return item
        })

    }

    //Use movieId to get movie information such as movieId from DB.

    Movie.find({ _id: { $in: movieIds } })
        .populate('writer')
        .exec((err, movie) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(movie)
        })

})






module.exports = router;