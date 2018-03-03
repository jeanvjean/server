const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose


const userSchema = new Schema({
    email:{type:String, required:true, unique:true, lowercase:true},
    password:{type:String, required:true}
})
userSchema.pre('save', async function(next){
    try {
        //gen salt
        const salt =  await bcrypt.genSalt(10)
        //gen hash
        const hash = await bcrypt.hash(this.password,salt)
        //hash password
        this.password = hash
        next()
    } catch (e) {
        next(e)
    }
})
userSchema.methods.isvalid = async function(newPassword){
    try {
        return await bcrypt.compare(newPassword,this.password)
    } catch (e) {
        throw e
    }
}
const User = mongoose.model('User',userSchema)

module.exports = User
