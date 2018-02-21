const mongoose = require('mongoose')
const { Schema } = mongoose


const creativeArtSchema = new Schema({
    imageUrl:{type:String},
    model_name:{type:String, required:true},
    created_at: {type:Date,default:Date.now()}
})

var CreativeArt = mongoose.model('CreativeArt',creativeArtSchema)

module.exports = CreativeArt;
