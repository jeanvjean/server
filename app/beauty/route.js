const express = require('express')
const path =require('path')
const multer =require('multer')
const route = express()

// const isAuthenticated = (req,res,next)=>{
//     if (req.isAuthenticated()) {
//         return next()
//     }else {
//         req.flash('error','Sorry!!! this is a restricted zone')
//         res.redirect('/')
//     }
// }

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

const beautyController = require('./beautyController')


route.post('/beauty/create',upload,beautyController.post)

route.get('/beauty/:page',beautyController.index)

route.get('/beauty/delete/:id',beautyController.delete)

module.exports = route
