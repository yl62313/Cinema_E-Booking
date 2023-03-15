const HttpError = require("../models/HTTP-Error")
const PaymentCard = require("../models/PaymentCard")

const addCard = async (req, res, next) => {
    const {cardNumber, expirationDate} = req.body;
    const createdPaymentCard = new PaymentCard({
        cardNumber,
        expirationDate
    });

    try {
        await createdPaymentCard.save();
    } catch (err) {
        const error = new HttpError(
            'Creating card failed, please try again.', 
            500
          );
          console.log(err.message);
          return next(error);
        }
        res.status(201).json({PaymentCard: createdPaymentCard});
}

exports.addCard = addCard;