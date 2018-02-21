const mongoose = require('mongoose')
const { Schema } = mongoose


const weddingSchema = new Schema({
    imageUrl:{type:String},
    event_name:{type:String, required:true},
    created_at: {type:Date,default:Date.now()}
})

var Wedding = mongoose.model('Wedding',weddingSchema)

module.exports = Wedding;
