const { User } = require("../server/models/Customer")

let auth = (req, res, next) => {

    //bring token from client cookie
    let token = req.cookies.t_auth;
    //find user
    User.fToken(token, (err,user)=> {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true })
        req.token = token;
        req.user = user;
        next();
    })
    //okay
    //no
}

 module.exports = {auth};