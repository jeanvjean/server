const mongoose = require('mongoose')
const { Schema } = mongoose


const beautySchema = new Schema({
    imageUrl:{type:String},
    model_name:{type:String, required:true},
    created_at: {type:Date,default:Date.now()}
})

var Beauty = mongoose.model('Beauty',beautySchema)

module.exports = Beauty;
