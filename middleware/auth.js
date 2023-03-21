const Customer = require("../server/models/Customer")
const jwt = require("jsonwebtoken")

let auth = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        const verifyCustomer = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(verifyCustomer);

        const customer = Customer.findOne({_id: verifyCustomer._id});

        req.token = token;
        req.customer = customer;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Something went wrong. Could not verify customer."
        });
    }
}

 module.exports = auth;