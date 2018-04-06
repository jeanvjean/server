const mongoose = require('mongoose')
const { Schema } = mongoose


const potraitSchema = new Schema({
    model_name:{type:String, required:true},
    created_at: {type:Date,default:Date.now()},
    imageUrl: {type:String}
})

var Potrait = mongoose.model('Potrait',potraitSchema)

module.exports = Potrait;
