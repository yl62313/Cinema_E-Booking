const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const {User} = require("./models/User");
const cookieParser = require('cookie-parser')
const {auth} = require("../middleware/auth")
const usersRoutes = require("./routes/users-routes")
const addressRoutes = require("./routes/addresses-routes")
const adminRoutes = require("./routes/admins-routes")
const bookingRoutes = require("./routes/bookings-routes")
const movieRoutes = require("./routes/movies-routes")
const paymentCardRoutes = require("./routes/paymentCards-routes")
const promotionRoutes = require("./routes/promotions-routes")
const seatRoutes = require("./routes/seats-routes")
const showRoomRoutes = require("./routes/showRooms-routes")
const showRoutes = require("./routes/shows-routes")
const showTimeRoutes = require("./routes/showTimes-routes")
const ticketRoutes = require("./routes/tickets-routes")

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", usersRoutes);
app.use("/api/users", addressRoutes);
app.use("/api/users", adminRoutes);
app.use("/api/users", bookingRoutes);
app.use("/api/users", movieRoutes);
app.use("/api/users", paymentCardRoutes);
app.use("/api/users", promotionRoutes);
app.use("/api/users", seatRoutes);
app.use("/api/users", showRoomRoutes);
app.use("/api/users", showRoutes);
app.use("/api/users", showTimeRoutes);
app.use("/api/users", ticketRoutes);

mongoose.
connect("mongodb+srv://jelly:c37K1npHPMxYSX4t@cluster0.gku3fxy.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    app.listen(port);
    console.log("Server started");
})
