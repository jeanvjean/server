const express = require('express')
const path =require('path')
const multer =require('multer')
const route = express()
const passport = require('passport')
const pasConf = require('../auth/config/passport')

const storage = multer.diskStorage({
    destination: './public/uploads/lifestyles',
    filename: function(req,file,cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage,
    limits:{
    fileSize: 1024 * 1024 * 20
},
fileFilter: (req,file,cb)=>{
    checkFileType(file, cb);
}
}).single('imageUrl')

function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|JPG|png/
    const extname = filetypes.test(path.extname(file.originalname))

    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null,true)
    }else {
        cb('error: images only')
    }
}

const lifestyleController = require('./lifestyleController')


route.post('/lifestyle/create',upload,lifestyleController.post)

route.get('/lifestyle/:page',lifestyleController.index)

route.get('/lifestyle/delete/:id',lifestyleController.delete)

module.exports = route
