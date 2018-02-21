const express = require('express')
const route = express()



const homeController = require('../controllers/homeController');

route.get('/',homeController.get);
route.get('/contact',homeController.getContact);
route.get('/about',homeController.getAbout);

module.exports = route
