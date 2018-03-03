const db = require('../models')
const jwt = require('jsonwebtoken')
const { jwt_SECRET } = require('../configJwt')

signToken = user =>{
    return jwt.sign({
        iss:'brookmatrix',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, jwt_SECRET)
}

module.exports = {
    signup: async(req,res)=>{
        const {email, password} = req.value.body
        //user already exists
        const foundUser = await db.User.findOne({email})
        if (foundUser) {
            return res.status(403).send({error:'email already exists'})
        }
        const newUser = new db.User({email,password})
        await newUser.save()

        const token = signToken(newUser)

        // res.status(200).json({
        //     newUser,
        //     token
        // })
        res.redirect('/user/signin')
    },
    signin:async(req,res)=>{
        const token = signToken(req.user)
        res.redirect('/')
        // res.status(200).json({token})

    },
    signout:async(req,res)=>{
        req.logout()
        res.redirect('/')
    },
    secret:async(req,res)=>{
        res.send('you have access to this now')
    },
    getSignup: async(req,res)=>{
        res.render('home/signUp')
    },
    getSignin: async(req,res)=>{
        res.render('home/signIn')
    }
}
