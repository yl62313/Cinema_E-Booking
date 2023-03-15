const HttpError = require("../models/HTTP-Error");
const ShowRoom = require("../models/ShowRoom");

const addRoom = async (req, res, next) => {
    const {roomNumber, shows, seats} = req.body;
    const createdRoom = new ShowRoom({
        roomNumber,
        shows,
        seats
    });

    try{
       await createdRoom.save();
    } catch (err) {
        const error = new HttpError(
            'Creating room failed, please try again.', 
            500
          );
          console.log(err.message);
          return next(error);
        }
        res.status(201).json({room: createdRoom});
}

exports.addRoom = addRoom;