const express = require('express')
const path =require('path')
const multer =require('multer')
const route = express()

const storage = multer.diskStorage({
    destination: './public/uploads/beauty',
    filename: function(req,file,cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage,
    limits:{
    fileSize: 1024 * 1024 * 10
},
fileFilter: (req,file,cb)=>{
    checkFileType(file, cb);
}
}).single('imageUrl')

function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|png/
    const extname = filetypes.test(path.extname(file.originalname))

    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null,true)
    }else {
        cb('error: images only')
    }
}

const beautyController = require('../controllers/beautyController')

route.get('/create',beautyController.get)
route.post('/create',upload,beautyController.post)

route.get('/',beautyController.index)
route.get('/one/:id',beautyController.getOne)
route.get('/delete/:id',beautyController.delete)

module.exports = route
