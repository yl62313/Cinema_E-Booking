const HttpError = require("../models/HTTP-Error");
const Address = require("../models/Address");

const addAddress = async (req, res, next) => {
    const {street, city, state, zipCode} = req.body;
    const createdAddress = new Address({
        street,
        city,
        state,
        zipCode
    });

    try{
       await createdAddress.save();
    } catch (err) {
        const error = new HttpError(
            'Creating address failed, please try again.', 
            500
          );
          console.log(err.message);
          return next(error);
        }
        res.status(201).json({address: createdAddress});
}

exports.addAddress = addAddress;