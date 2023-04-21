const HttpError = require("../models/HTTP-Error");
const Ticket = require("../models/Ticket");

const addTicket = async (req, res, next) => {
    const {ticketID, ticketType, seat, showID} = req.body;
    const createdTicket = new Ticket({
        ticketType,
        seat,
        showID
    });

    try{
       await createdTicket.save();
    } catch (err) {
        const error = new HttpError(
            'Creating ticket failed, please try again.', 
            500
          );
          console.log(err.message);
          return next(error);
        }
        res.status(201).json({ticket: createdTicket});
}

exports.addTicket = addTicket;