const HttpError = require("../models/HTTP-Error");
const Show = require("../models/Show");

const addShow = async (req, res, next) => {
    const {showID, dateAndTime, seatsAvailable, duration, roomID, movieID} = req.body;
    const createdShow = new Show({
        showID,
        dateAndTime,
        seatsAvailable,
        duration,
        roomID,
        movieID
    });

    try{
       await createdShow.save();
    } catch (err) {
        const error = new HttpError(
            'Creating show failed, please try again.', 
            500
          );
          console.log(err.message);
          return next(error);
        }
        res.status(201).json({show: createdShow});
}

exports.addShow = addShow;