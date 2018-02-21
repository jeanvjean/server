const mongoose = require('mongoose')
const { Schema } = mongoose


const lifestyleSchema = new Schema({
    imageUrl:{type:String},
    model_name:{type:String, required:true},
    created_at: {type:Date,default:Date.now()}
})

var Lifestyle = mongoose.model('Lifestyle',lifestyleSchema)

module.exports = Lifestyle;
