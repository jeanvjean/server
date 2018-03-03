const express = require('express')
const router = require('express-promise-router')()
const passport = require('passport')
const pasConf = require('../passport')
const passportSignin = passport.authenticate('local',{session:false})
const passportJwt = passport.authenticate('jwt',{session:false})

const authController = require('../controllers/authController')
const { validateBody, schemas } = require('../helpers/routeHelpers')

    router.route('/signup')
        .post(validateBody(schemas.authSchema),authController.signup)
        .get(authController.getSignup)

    router.route('/signin')
        .post(validateBody(schemas.authSchema),passportSignin,authController.signin)
        .get(authController.getSignin)

    router.route('/signout')
        .get(authController.signout)

    router.route('/secret')
        .get(passportJwt,authController.secret)

module.exports = router
