const express = require('express')
const router = require('express-promise-router')()
const passport = require('passport')
const pasConf = require('../passport')

const authController = require('../controllers/authController')
const { validateBody, schemas } = require('../helpers/routeHelpers')

    router.route('/signup')
        .post(validateBody(schemas.authSchema),authController.signup)

    router.route('/signin')
        .post(authController.signin)

    router.route('/secret')
        .get(passport.authenticate('jwt',{session:false}),authController.secret)

module.exports = router
