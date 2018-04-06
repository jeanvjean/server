const express = require('express')
const path =require('path')
const multer =require('multer')
const route = express()

const storage = multer.diskStorage({
    destination: './public/uploads/potrait',
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
    const filetypes = /JPG|jpeg|jpg|png/
    const extname = filetypes.test(path.extname(file.originalname))

    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null,true)
    }else {
        cb('error: images only')
    }
}

const potraitController = require('./potraitController')

route.post('/potrait/create',upload,potraitController.post)

route.get('/potrait/:page',potraitController.index)

route.get('/potrait/delete/:id',potraitController.delete)

module.exports = route
