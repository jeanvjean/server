const mongoose = require('mongoose')

const { Schema } = mongoose

const categorySchema = new Schema({
    name: String,
    objects:[{
        type: Schema.ObjectId,
        ref: "Wedding"
    }]
})

const Category = mongoose.model('Category',categorySchema)

module.exports = Category
