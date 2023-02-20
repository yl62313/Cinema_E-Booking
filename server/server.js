const express = require("express")
const app = express()
const port = process.env.PORT || 3000;
require("dotenv").config();
const mongoose = require('mongoose')
const config = require('./config/key')
app.use(express.json())


const user = require("./routes/user");
const movie = require("./routes/movie");

app.use("/api/users", user);
app.use("/api/movies", movie);



mongoose.set('strictQuery',false);
mongoose.connect(config.mongoURI).then(()=>console.log('MongoDB connected'))
.catch(err => console.log(err))






app.listen(port, () => console.log(`server is running${port}`))

