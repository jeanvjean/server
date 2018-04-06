const express = require('express')
const router = require('express-promise-router')()

const usersController = require('./usersController')

const isNotAuthenticated = (req,res,next)=>{
    if (req.isAuthenticated()) {
        req.flash('error','Sorry!!!You are already logged in')
        res.redirect('/')
    }else {
        return next()
    }
}
const isAuthenticated = (req,res,next)=>{
    if (req.isAuthenticated()) {
        return next()
    }else {
        req.flash('error','Sorry!!! You have to be registered')
        res.redirect('/')
    }
}
    router.route('/register')
        .get(isNotAuthenticated,usersController.getRegister)
        .post(usersController.register)

    router.route('/login')
        .get(isNotAuthenticated,usersController.getLogin)
        .post(usersController.login)

    router.route('/logout')
        .get(isAuthenticated,usersController.logout)

        module.exports = router
