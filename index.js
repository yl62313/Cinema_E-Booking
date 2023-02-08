const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')


mongoose.set('strictQuery',false);
mongoose.connect('mongodb+srv://jelly:gp123@cluster0.gku3fxy.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log('MongoDB connected'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Cinnema E-booking'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))