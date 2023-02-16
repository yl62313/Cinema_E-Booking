const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const config = require('./server/config/key')

const bodyParser = require('body-parser');
const {User} = require("./server/models/User");
const cookieParser = require('cookie-parser')
const {auth} = require("./middleware/auth")


app.use(bodyParser.urlencoded({ectended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.set('strictQuery',false);
mongoose.connect(config.mongoURI).then(()=>console.log('MongoDB connected'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Cinnema E-booking'))
app.get('/api/hi', (req,res)=>{
    res.send("Hi")
})
//bring register information from client and put database
app.post('/api/users/register', (req,res)=> {
    const user = new User(req.body)
    user.save((err,userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

//login
app.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email}, (err,user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "Incorrect email"
            })
        }
        user.cpPassword(req.body.password , (err,isMatch ) => {
            if(!isMatch)
            return res.json({ loginSuccess: false, message: "Incorrect password" })
            //match -> make token
            user.mkToken((err, user) =>{
                if(err) return res.status(400).send(err);
                //save sToken to cookie
                res.cookie("t_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
})

//auth (passed middleware -> true)
app.get('api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id:req.user._id,
        //role 0-> user, role !0-> admin
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        username: req.user.name,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

//logout
app.get('/api/users/logout', auth, (req,res)=> {
    User.findOneAndUpdate({_id: req.user._id},
        {token:""}
        ,(err, user) => {
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        })
})




app.listen(port, () => console.log(`Example app listening on port ${port}`))