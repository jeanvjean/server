const express = require('express')
const route = express()



const homeController = require('../controllers/homeController');

route.get('/',homeController.get);
route.get('/about',homeController.getAbout);
route.get('/contact',homeController.getContact);
route.post('/contact',homeController.postContact);

module.exports = route
