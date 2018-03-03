const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')

//passport serialize
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
//passport deserialize
passport.deserializeUser(async(id,done)=>{
    try {
        const user = await db.User.findById(id)
        done(null,user)
    } catch (e) {
        done(e,null)
    }
})


//passport authenticate
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: false
}, async(email,password,done)=>{
    try {
        const user = await db.User.findOne({'email':email})
        if (!user) {
            return done(null,false,{message: 'Unknown User'})
        }
        const isMatch = user.isvalid(password)
        if (!isMatch) {
            return done(null,false)
        }
        done(null,user)
    } catch (e) {
        console.log(e)
        done(e,false)
    }
}))
