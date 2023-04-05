const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    phoneNumber: {
        type: String
    },

    address: {
        type: String,
    },

    city: {
        type: String,
     },

    state: {
        type: String,
     },

    zipCode: {
        type: String,
     },
    cardNumber: {
        type: String,
    },
    nameOnCard: {
        type: String,
    },
    EXP: {
        type: String,
    },

    confirmationCode: {
        type: String,
        unique: true,
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default: false,
    },
    isSubscribed:{
        type:String,
        
        default:"false"
    },
    userStatus: {
        type:String,
        enum:["INACTIVE","ACTIVE","SUSPENDED"],
        default:"INACTIVE",
    },
    
    token: {
        type: String,
        default: "a"
    }
});
module.exports = mongoose.model("users", userSchema);