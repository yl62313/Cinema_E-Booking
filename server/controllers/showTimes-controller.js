const HttpError = require("../models/HTTP-Error");
const ShowTime = require("../models/ShowTime");

const addTime = async (req, res, next) => {
    const {date, time, shows} = req.body;
    const createdTime = new ShowTime({
        date,
        time,
        shows
    });

    try{
       await createdTime.save();
    } catch (err) {
        const error = new HttpError(
            'Creating time failed, please try again.', 
            500
          );
          console.log(err.message);
          return next(error);
        }
        res.status(201).json({time: createdTime});
}

exports.addTime = addTime;