const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'host', 'user']
    },
    tokens:
        [
            {
                token: {
                    type: String,
                    required:true
                }
            }
        ]
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    try {
        //this refers to our document here
        let token = jwt.sign({ _id: this._id }, process.env.secret_key)
        this.tokens = (this.tokens).concat({token:token}) 
        await this.save()
        return token
    } catch (err) {
        console.log(err)
    }
}


const User = mongoose.model('users', userSchema)
module.exports = User
