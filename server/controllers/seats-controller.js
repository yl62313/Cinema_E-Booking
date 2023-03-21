const HttpError = require("../models/HTTP-Error");
const Seat = require("../models/Seat");

const addSeat = async (req, res, next) => {
    const {row, sectionNumber, showRoomID} = req.body;
    const createdSeat = new Seat({
        row,
        sectionNumber,
        showRoomID
    });

    try{
       await createdSeat.save();
    } catch (err) {
        const error = new HttpError(
            'Creating room failed, please try again.', 
            500
          );
          console.log(err.message);
          return next(error);
        }
        res.status(201).json({seat: createdSeat});
}

exports.addSeat = addSeat;