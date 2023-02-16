const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        maxlength: 50,
        unique: 1
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    firstname: {
        type: String,
        maxlength: 50
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    Image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//password bcrypt before save
userSchema.pre('save', function( next ){
    var user = this;
    if(user.inModified('password')) {
        bcrypt.genSalt(saltRounds,function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password,salt,function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }
})

userSchema.methods.cpPassword = function(plainPassword, cb){
    //check with painpassword and bcypt password
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err),
        cb(null, isMatch)
    })
}

userSchema.methods.mkToken = function(cb) {
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'sToken')
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.fToken = function(token, cb) {
    var user = this;
    //tokem decode
    jwt.verify(token,'sToken', function(err, decoded){
        user.findOne({"_id": decoded, "token": token}, function(err,user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)
module.exports = {User}