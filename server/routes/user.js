const express = require('express')
const router = express.Router()
const userSchemaCopy = require('../models/User')

router.post('/register',(request, response) => {
    const signedUpUser = new userSchemaCopy({

        Email: request.body.email,
        Name: request.body.name,
        Password: request.body.password

    })
    signedUpUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})



module.exports = router 