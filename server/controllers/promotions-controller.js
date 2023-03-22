const HttpError = require("../models/HTTP-Error");
const Promotion = require("../models/Promotion");

const addPromotion = async (req, res, next) => {
    const {name, code, discount, startDate, endDate} = req.body;
    const createdPromotion = new Promotion({
        name,
        code,
        discount,
        startDate,
        endDate
    });

    try{
       await createdPromotion.save();
    } catch (err) {
        const error = new HttpError(
            'Creating promotion failed, please try again.', 
            500
          );
          console.log(err.message);
          return next(error);
        }
        res.status(201).json({promotion: createdPromotion});
}

exports.addPromotion = addPromotion;