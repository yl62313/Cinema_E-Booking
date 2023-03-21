const HttpError = require("../models/HTTP-Error")
const Booking = require("../models/Booking");

const addBooking = async (req, res, next) => {
    const {numberOfTickets, movieID, show, tickets, promotion, bookingNumber, paymentCardNumber, customerID} = req.body;
    const createdBooking = new Booking({
        numberOfTickets,
        movieID,
        show,
        tickets,
        promotion,
        bookingNumber,
        paymentCardNumber,
        customerID
    });

    try {
        await createdBooking.save();
    } catch (err) {
        const error = new HttpError(
            'Creating booking failed, please try again.', 
            500
          );
          console.log(err.message);
          return next(error);
        }
        res.status(201).json({booking: createdBooking});
}

exports.addBooking = addBooking;