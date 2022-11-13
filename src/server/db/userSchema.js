const mongoose = require ("mongoose")
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['admin','host','user']
    }
},{timestamps:true})


userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12)
    }
    next()
})

const User = mongoose.model('users',userSchema)
module.exports = User
