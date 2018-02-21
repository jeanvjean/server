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
// const storage = multer.diskStorage({
//     destination: function(req,file,cb) {
//         cb(null, './public/uploads/potrait')
//     },
//     filename: function(req,file,cb) {
//         cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// const fileFilter = (req,file,cb)=>{
//     if (file.mimetype === 'image/jpg' || file.mimetype ==='image/png') {
//         cb(null,true)
//     }else {
//         cb(null,false)
//     }
// }

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

const potraitController = require('../controllers/potraitController')

route.get('/create',potraitController.getCreate)
route.post('/create',upload,potraitController.post)

route.get('/',potraitController.index)
route.get('/one/:id',potraitController.getOne)
route.get('/delete/:id',potraitController.delete)

module.exports = route
