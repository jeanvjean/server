const express = require('express')

const router = require('express-promise-router')()

const categoryController = require('./categoryController')


    router.route('/category')
        .post(categoryController.post)


    router.route('/category/:categoryId')
        .get(categoryController.index)

        module.exports = router
