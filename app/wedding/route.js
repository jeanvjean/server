const express = require('express')
const path =require('path')
const multer =require('multer')
const route = require('express-promise-router')()

const storage = multer.diskStorage({
    destination: './public/uploads/weddings',
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
}).single('file')

function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|png|JPG/
    const extname = filetypes.test(path.extname(file.originalname))

    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null,true)
    }else {
        cb('error: images only')
    }
}

const weddingController = require('./weddingController')


route.post('/wedding/create',upload,weddingController.post)

route.get('/wedding/:page',weddingController.index)

route.get('/wedding/delete/:id',weddingController.delete)

module.exports = route
