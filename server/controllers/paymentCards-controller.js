const HttpError = require("../models/HTTP-Error")
const PaymentCard = require("../models/PaymentCard")
const bcrypt = require("bcrypt")

const addCard = (req, res, next) => {
    const { cardNumber, expirationDate } = req.body;
    bcrypt.hash(cardNumber, 10, async (err, cardNumber) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const createdPaymentCard = new PaymentCard({
                cardNumber,
                expirationDate
            });

            try {
                await createdPaymentCard.save();
            } catch (err) {
                const error = new HttpError(
                    'Adding card failed, please try again.',
                    500
                );
                console.log(err.message);
                return next(error);
            }
            res.status(201).json({ PaymentCard: createdPaymentCard });
        }
    })
}


exports.addCard = addCard;