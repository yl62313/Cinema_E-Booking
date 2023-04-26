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

    street: {
        type: String,
        default:"",
    },

    city: {
        type: String,
        default: ""
     },

    state: {
        type: String,
        default: ""
     },

    zipCode: {
        type: String,
        default: ""
     },

    nameOnCard1: { type: String, default: "" },
        
    cardNumber1: { type: String, default: "" },
        
    exp1: { type: String, default: "" },

    cardType1: { type: String, default: "" },

    nameOnCard2: { type: String, default: "" },
        
    cardNumber2: { type: String, default: "" },
        
    exp2: { type: String, default: "" },

    cardType2: { type: String, default: "" },

    nameOnCard3: { type: String, default: "" },
        
    cardNumber3: { type: String, default: "" },
        
    exp3: { type: String, default: "" },
    
    cardType3: { type: String, default: "" },

    confirmationCode: {
        type: String,
        unique: true,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false,
    },
    isSubscribed:{
        type: Boolean,    
        default: false
    },
    userStatus: {
        type:String,
        enum:["INACTIVE","ACTIVE","SUSPENDED"],
        default:"INACTIVE",
    },
    
    token: {
        type: String,
        default: "a"
    },

});
module.exports = mongoose.model("users", userSchema);