const router = require("express").Router();
const Show = require('../models/showModel')



router.post("/add-show",async (req, res) => {
    try {
      const newShow = new Show(req.body);
      await newShow.save();
      res.send({
        success: true,
        message: "Show added successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

  router.post("/get-all-shows", async (req, res) => {
    try {
      const shows = await Show.find({ movie: req.body.movieId })
        .sort({
          createdAt: -1,
        });
  
      res.send({
        success: true,
        message: "Shows fetched successfully",
        data: shows,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

  router.post("/delete-show", async (req, res) => {
    try {
      await Show.findByIdAndDelete(req.body.showId);
      res.send({
        success: true,
        message: "Show deleted successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

  router.post("/get-show-by-id", async (req, res) => {
    try {
      const show = await Show.findById(req.body.showId).populate("movie")
      res.send({
        success: true,
        message: "Show fetched successfully",
        data: show,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

module.exports = router;