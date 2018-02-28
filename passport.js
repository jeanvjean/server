const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
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
