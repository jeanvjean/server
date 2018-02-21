const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var cors = require('cors');
var morgan = require('morgan');

module.exports = (app)=>{

    mongoose.connect('mongodb://localhost:27017/uploads',(err,con)=>{
        if (err) {
            console.log(err)
        }
        console.log('connected to mongoDB...')
    })
    const db = mongoose.connection

    app.set('view engine', 'ejs')

    app.use(express.static('./public'))

    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(morgan('combined'))
    app.use(cors())

    require('./route')(app)
}
