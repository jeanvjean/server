const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const localStrategy = require('passport-local').Strategy
const { ExtractJwt } = require('passport-jwt')
const { jwt_SECRET } = require('./configJwt')
const db = require('./models')

passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: jwt_SECRET
},async(payload,done)=>{
    try {
        //find the user in the token
        const user = await db.User.findById(payload.sub)
        //if not handle
        if (!user) {
            return done(null,false)
        }else {
            //else return user
            done(null,user)
        }
    } catch (e) {
        done(e,false)
    }
}))
//local strategy
passport.use(new localStrategy({
    usernameField: 'email'
},async(email,password,done)=>{
    try {
        //find user with email
        const user = await db.User.findOne({email})
        //if not handle
        if (!user) {
            return done(null,false)
        }
        //correct pword
        const isMatch = await user.isvalid(password)
        if (!isMatch) {
            return done(null,false)
        }
        done(null,user)

    } catch (e) {
        done(e,false)
    }
}))
