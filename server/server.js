const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose')
const config = require('./config/key');
app.use(express.json());



const usersRoute = require("./routes/usersRoute");
const movieRoute = require("./routes/movieRoute");
const promotionRoute = require("./routes/promotions-routes");
const showRoute = require("./routes/showRoute")
const checkoutRoute = require("./routes/checkoutRoute");

app.use("/api/users", usersRoute);
app.use("/api/movies", movieRoute);
app.use("/api/promotions", promotionRoute);
app.use("/api/shows", showRoute);
app.use("/api/checkout", checkoutRoute);



mongoose.set('strictQuery', false);
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

const emailOptions = {
    auth: {
        user: "aobooking@outlook.com",
        pass: "teamteama1"
    },
    from: 'aobooking@outlook.com',
    subject: 'Promotions Alert',
    html: '<p>Check out our latest promotions!</p>',
    text: 'This is text version!',
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
};
app.listen(port, () =>
    console.log(`Server is running ${port}`))


