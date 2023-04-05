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



app.use("/api/users", usersRoute);
app.use("/api/movies", movieRoute);
app.use("/api/promotions", promotionRoute);
app.use("/api/shows", showRoute);



mongoose.set('strictQuery',false);
mongoose.connect(config.mongoURI).then(()=>console.log('MongoDB connected'))
.catch(err => console.log(err))
app.listen(port,()=>
console.log(`Server is running ${port}`))


