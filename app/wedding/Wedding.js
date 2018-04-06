const mongoose = require('mongoose')
const { Schema } = mongoose


const weddingSchema = new Schema({
    file:{type:String},
    event_name:{type:String, required:true},
    category: {type:Schema.ObjectId, ref:'Category'},
    created_at: {type:Date,default:Date.now()}
})
var Wedding = mongoose.model('Wedding',weddingSchema)

module.exports = Wedding;
