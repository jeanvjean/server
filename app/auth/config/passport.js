const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../User')

//passport serialize
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
//passport deserialize
passport.deserializeUser(async(id,done)=>{
    try {
        const user = await User.findById(id)
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
        const user = await User.findOne({'email':email})
        if (!user) {
            return done(null,false,{message: 'Unknown User'})
        }
        const isMatch = user.isvalid(password)
        if (!isMatch) {
            return done(null,false)
        }
        done(null,user)
    } catch (e) {
        done(e,false)
    }
}))
