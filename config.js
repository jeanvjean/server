const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
const cors = require('cors');
const morgan = require('morgan');


require('./config/passport')

module.exports = (app)=>{

    mongoose.connect('mongodb://localhost:27017/uploads',(err,con)=>{
        if (err) {
            console.log(err)
        }
        console.log('connected to mongoDB...')
    })
    const db = mongoose.connection

    app.set('view engine', 'ejs')

    app.use(express.static(__dirname + '/public'))

    app.use(morgan('combined'))
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(cookieParser())
    app.use(session({
        secret:'secret',
        saveUninitialized:false,
        resave:false
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(flash())

    app.use((req,res,next)=>{
        res.locals.success_msg = req.flash('success')
        res.locals.error_msg = req.flash('error')
        res.locals.isAuthenticated = req.user ? true : false
        next()
    })

    require('./route')(app)
}
