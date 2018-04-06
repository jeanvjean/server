const User = require('./User')
const Joi = require('joi')
const passport = require('passport')



//============================================= validation==========================================//
const userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,32}/).required()
})
//===============================================validation========================================//
module.exports = {
    //============================================registeration=======================================//
    getRegister: async(req,res)=>{
        res.render('home/signUp')
    },
    register: async(req,res,next)=>{
        const result = Joi.validate(req.body,userSchema)

        if (result.error) {
            req.flash('error', 'invalid registeration data')
            res.render('home/signUp')
            return
        }
        const user = await User.findOne({email:result.value.email})
        if (user) {
            req.flash('error', 'this user already exists')
            res.render('home/signUp')
            return
        }
        const newUser = new User(result.value)
        await newUser.save()

        req.flash('success', 'Registeration Successfull')
        res.redirect('/login')
    },
//============================================registeration=======================================//
//============================================Login==============================================//
    login:     passport.authenticate('local',{
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true
            }),
    getLogin: async(req,res)=>{
        res.render('home/signIn')
    },
    logout: (req,res)=>{
        req.logout()
        req.flash('success', 'You are Logged out')
        res.redirect('/')
    }
//============================================Login==============================================//
}
