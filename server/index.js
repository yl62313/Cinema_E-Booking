const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const {User} = require("./models/User");
const cookieParser = require('cookie-parser')
const {auth} = require("../middleware/auth")
const usersRoutes = require("./routes/users-routes")


app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", usersRoutes);
mongoose.
connect("mongodb+srv://jelly:c37K1npHPMxYSX4t@cluster0.gku3fxy.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    app.listen(port);
    console.log("Server started");
})
